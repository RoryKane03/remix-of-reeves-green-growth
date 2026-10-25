import { quoteTrackingMetadata } from '@/utils/marketingTracking';
import { supabase } from "@/integrations/supabase/client";
import { logSecurityEvent, validateFileUpload, validateFileContent, sanitizeInput, detectAutomatedSubmission, RateLimiter } from "@/utils/security";
import { z } from "zod";

// Zod schema for comprehensive input validation
const QuoteFormSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[\p{L}\s\-'.,]+$/u, "Name can only contain letters, spaces, hyphens, apostrophes, periods, and commas"),
  
  email: z.string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .refine((email) => !Array.from(email).some((char) => char.charCodeAt(0) < 32), {
      message: "Invalid email format"
    }),
  
  phone: z.string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be less than 20 characters")
    .transform((val) => {
      const hasPlus = val.startsWith("+");
      const digits = val.replace(/\D/g, "");
      return hasPlus ? `+${digits}` : digits;
    }),
  
  service: z.string().trim().max(100).optional(),
  message: z.string().trim().max(2000, "Message must be less than 2000 characters").optional(),
  
  address_line_1: z.string()
    .trim()
    .min(1, "Address line 1 is required")
    .max(255, "Address must be less than 255 characters"),
  address_line_2: z.string().trim().max(255).optional(),
  city: z.string()
    .trim()
    .min(1, "Town/City is required")
    .max(100, "Town/City must be less than 100 characters"),
  postcode: z.string()
    .trim()
    .min(1, "Postcode is required")
    .max(20, "Postcode must be less than 20 characters"),
  country: z.string().trim().max(100).optional().default("United Kingdom"),
  discount_code: z.string().trim().max(50).optional()
    .refine((val) => !val || val.toUpperCase() === 'MARCH20', {
      message: "Invalid discount code"
    }),
});

export type QuoteFormData = z.infer<typeof QuoteFormSchema>;

type UploadSuccess = { success: true; file: File; path: string };
type UploadFailure = { success: false; file: File; path: string; error: string };
export type UploadResult = UploadSuccess | UploadFailure;

// Rate limiter for quote submissions
const quoteLimiter = new RateLimiter(3, 5 * 60 * 1000); // 3 attempts per 5 minutes

// Helpers to normalize inputs so server-side policies (like rate limits) work consistently
function normalizeEmail(email: string) {
  return email?.trim().toLowerCase();
}

function normalizePhone(phone: string) {
  const trimmed = phone?.trim() ?? "";
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, ""); // keep digits only
  return hasPlus ? `+${digits}` : digits;
}

function trimOrUndefined(v?: string) {
  const t = v?.trim();
  return t && t.length > 0 ? t : undefined;
}

async function fileToBase64Content(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = '';
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  const base64Content = btoa(binary);
  if (!base64Content) {
    throw new Error(`Photo ${file.name} could not be read. Please choose the photo again.`);
  }

  return base64Content;
}

type QuoteFormMetadata = { website?: string; [key: string]: unknown };

// Photo upload handler - synced 2025-11-03 14:52
export async function submitQuote(data: QuoteFormData, files: File[], formMetadata?: QuoteFormMetadata) {
  const startTime = Date.now();
  const quoteFiles = files || [];
  
  // Security: Log quote submission attempt
  logSecurityEvent({
    action: 'QUOTE_SUBMISSION_ATTEMPT',
    resource: 'quotes',
    metadata: { 
      filesCount: quoteFiles.length,
      hasService: !!data.service,
      hasMessage: !!data.message
    }
  });

  // Security: Rate limiting check (3 attempts per 5 minutes per email)
  const identifier = `${normalizeEmail(data.email)}_${Date.now().toString().slice(0, -5)}`;
  if (!quoteLimiter.isAllowed(identifier)) {
    logSecurityEvent({
      action: 'QUOTE_RATE_LIMIT_EXCEEDED',
      metadata: { email: normalizeEmail(data.email) },
      severity: 'medium'
    });
    throw new Error("Too many quote submissions. Please wait a few minutes before trying again.");
  }

  // Security: Detect automated submissions
  if (formMetadata && detectAutomatedSubmission(formMetadata)) {
    logSecurityEvent({
      action: 'AUTOMATED_SUBMISSION_DETECTED',
      metadata: { email: normalizeEmail(data.email) },
      severity: 'high'
    });
    throw new Error("Submission appears to be automated. Please try again.");
  }

  // Check for honeypot field (should always be empty)
  if (formMetadata?.website && formMetadata.website.trim() !== '') {
    logSecurityEvent({
      action: 'BOT_DETECTED_HONEYPOT',
      metadata: { 
        honeypot: formMetadata.website,
        email: normalizeEmail(data.email) 
      },
      severity: 'high'
    });
    
    throw new Error('Invalid submission detected.');
  }

  // Get session if available (for user_id linking)
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session || null;

  console.log("[submitQuote] === STARTING SUBMISSION ===");
  console.log("[submitQuote] Files received:", { 
    count: quoteFiles.length,
    files: quoteFiles.map(f => ({ 
      name: f.name, 
      size: f.size, 
      type: f.type, 
      isFile: f instanceof File,
      constructor: f.constructor.name 
    })) ?? []
  });
  
  if (quoteFiles.length === 0) {
    console.warn("[submitQuote] WARNING: No files provided to submitQuote!");
    console.warn("[submitQuote] This might indicate files were lost before reaching this function");
  }

  // Client-side guard to align with server-side trigger (max 10 files per quote)
  if (quoteFiles.length > 10) {
    throw new Error("You can upload a maximum of 10 files per quote.");
  }

  // Security: Validate all files before processing (both metadata and content)
  if (quoteFiles.length > 0) {
    for (const file of quoteFiles) {
      // Step 1: Basic validation (size, type, extension)
      const validation = validateFileUpload(file);
      if (!validation.valid) {
        logSecurityEvent({
          action: 'INVALID_FILE_UPLOAD',
          metadata: { fileName: file.name, fileType: file.type, error: validation.error },
          severity: 'medium'
        });
        throw new Error(validation.error);
      }

      // Step 2: Deep content validation (magic bytes) — log only, don't block.
      // Phone-camera HEIC→JPEG conversions can produce valid JPEGs whose
      // first bytes don't match our strict signature list, so we keep this
      // as monitoring rather than enforcement.
      const contentValidation = await validateFileContent(file);
      if (!contentValidation.valid) {
        console.warn('[submitQuote] file content validation soft-fail:', contentValidation.error);
        logSecurityEvent({
          action: 'FILE_CONTENT_VALIDATION_SOFT_FAIL',
          metadata: { fileName: file.name, fileType: file.type, error: contentValidation.error },
          severity: 'low'
        });
      }
    }
  }

  // Validate and sanitize inputs using Zod schema
  let validated;
  try {
    validated = QuoteFormSchema.parse({
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      message: data.message,
      address_line_1: data.address_line_1,
      address_line_2: data.address_line_2,
      city: data.city,
      postcode: data.postcode,
      country: data.country,
      discount_code: data.discount_code,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      logSecurityEvent({
        action: 'VALIDATION_FAILED',
        metadata: { 
          field: firstError.path.join('.'),
          error: firstError.message 
        },
        severity: 'low'
      });
      throw new Error(firstError.message);
    }
    throw error;
  }

  // Apply additional sanitization after Zod validation
  const normalized = {
    name: sanitizeInput(validated.name),
    email: validated.email,
    phone: validated.phone,
    service: validated.service ? sanitizeInput(validated.service) : undefined,
    message: validated.message ? sanitizeInput(validated.message) : undefined,
    address_line_1: validated.address_line_1 ? sanitizeInput(validated.address_line_1) : undefined,
    address_line_2: validated.address_line_2 ? sanitizeInput(validated.address_line_2) : undefined,
    city: validated.city ? sanitizeInput(validated.city) : undefined,
    postcode: validated.postcode ? sanitizeInput(validated.postcode) : undefined,
    country: validated.country,
    discount_code: validated.discount_code ? sanitizeInput(validated.discount_code) : undefined,
  };

  console.log("[submitQuote] inputs validated and sanitized");

  // File validation - increased limits to accommodate modern phone cameras
  const maxFileSize = 8 * 1024 * 1024; // 8MB per file (accommodates modern phone cameras)
  const maxTotalSize = 15 * 1024 * 1024; // 15MB total
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  if (quoteFiles.length > 0) {
    console.log("[submitQuote] Validating files:", quoteFiles.map(f => ({
      name: f.name,
      size: f.size,
      type: f.type,
      isFile: f instanceof File
    })));
    
    // Check if files are actually File objects
    const invalidFiles = quoteFiles.filter(f => !(f instanceof File));
    if (invalidFiles.length > 0) {
      console.error("[submitQuote] Invalid file objects detected:", invalidFiles);
      throw new Error("Invalid file objects detected. Please re-select your photos.");
    }
    
    const totalSize = quoteFiles.reduce((sum, file) => sum + file.size, 0);
    console.log("[submitQuote] Total file size:", totalSize, "max:", maxTotalSize);

    if (totalSize > maxTotalSize) {
      throw new Error("Total file size cannot exceed 15MB. Please reduce image sizes or upload fewer files.");
    }

    for (const file of quoteFiles) {
      if (file.size > maxFileSize) {
        throw new Error(`File ${file.name} is too large. Maximum size is 8MB per file.`);
      }

      if (!allowedTypes.includes(file.type)) {
        console.error("[submitQuote] Invalid file type:", file.type, "for file:", file.name);
        throw new Error(`File ${file.name} is not a supported image format. Please use JPEG, PNG, GIF, or WebP.`);
      }
    }
    
    console.log("[submitQuote] All files validated successfully");
  }

  // Generate the quote id client-side so we can use it for file paths and metadata
  const quoteId = crypto.randomUUID();

  try {
    // Optional measurement must never prevent a saved enquiry.
    const trackingMetadata = await quoteTrackingMetadata().catch(() => ({ marketing_attribution: null, tracking_consent: null }));
    // 1) Insert the quote (using normalized values)
    const { error: quoteError } = await supabase.from("quotes").insert({
      id: quoteId,
      ...trackingMetadata,
      name: normalized.name,
      email: normalized.email,
      phone: normalized.phone,
      service: normalized.service ?? null,
      message: normalized.message ?? null,
      // Address fields into DB
      address_line_1: normalized.address_line_1 ?? null,
      address_line_2: normalized.address_line_2 ?? null,
      city: normalized.city ?? null,
      postcode: normalized.postcode ?? null,
      country: normalized.country ?? 'United Kingdom',
      discount_code: normalized.discount_code ?? null,
      // Security fix: Link quote to authenticated user if available
      user_id: session?.user?.id ?? null,
    });

    if (quoteError) {
      console.error("[submitQuote] quote insert failed");
      logSecurityEvent({
        action: 'QUOTE_INSERT_FAILED',
        metadata: { error: quoteError.message },
        severity: 'medium'
      });
      throw new Error(quoteError.message);
    }
    
    console.log("[submitQuote] quote inserted", { quoteId });
    
    // Security: Log successful quote creation
    logSecurityEvent({
      action: 'QUOTE_CREATED',
      resource: 'quotes',
      resourceId: quoteId,
      metadata: {
        hasFiles: quoteFiles.length > 0,
        fileCount: quoteFiles.length,
        service: normalized.service || 'general'
      }
    });

    // 2) Convert files to base64 for direct email attachment
    console.log("[submitQuote] Converting files to base64", {
      fileCount: quoteFiles.length,
      quoteId,
      files: quoteFiles.map(f => ({ name: f.name, size: f.size, type: f.type }))
    });
    
    const filesData = await Promise.all(
      quoteFiles.map(async (file) => {
        // Step 1: Convert to base64 — REQUIRED for the email attachment.
        // If this fails, we surface the real error so the user knows what went wrong.
        let base64Content: string;
        try {
          base64Content = await fileToBase64Content(file);
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'unknown read error';
          console.error("[submitQuote] base64 conversion failed for", file.name, err);
          throw new Error(`Could not read photo "${file.name}". Please try a different photo. (${msg})`);
        }

        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filePath = `${quoteId}/${crypto.randomUUID()}-${safeName}`;

        // Step 2: Storage upload — best-effort. If it fails, we still send the
        // email with the attachment so the customer's submission isn't lost.
        try {
          const { error: uploadError } = await supabase.storage
            .from('quote-photos')
            .upload(filePath, file, {
              contentType: file.type || 'image/jpeg',
              upsert: false,
            });

          if (uploadError) {
            console.warn("[submitQuote] storage upload failed (continuing with email-only):", uploadError);
          } else {
            // Only insert metadata if storage upload actually succeeded
            const { error: metaError } = await supabase.from("quote_files").insert({
              quote_id: quoteId,
              file_name: file.name,
              file_path: filePath,
              file_size: file.size,
              mime_type: file.type || null,
            });
            if (metaError) {
              console.warn("[submitQuote] file metadata insert failed (continuing):", metaError);
            }
          }
        } catch (storageErr) {
          console.warn("[submitQuote] storage step threw (continuing with email-only):", storageErr);
        }

        logSecurityEvent({
          action: 'FILE_PROCESSED',
          resource: 'quote_files',
          resourceId: quoteId,
          metadata: { fileName: file.name, fileSize: file.size, mimeType: file.type }
        });

        return {
          name: file.name,
          size: file.size,
          type: file.type || 'image/jpeg',
          base64: base64Content,
          path: filePath,
        };
      })
    );

    console.log("[submitQuote] Files converted successfully:", {
      count: filesData.length,
      totalBase64Size: filesData.reduce((sum, f) => sum + f.base64.length, 0)
    });

    // 3) Send notification email with attachments
    try {
      console.log("[submitQuote] Invoking send-quote-email edge function");
      await supabase.functions.invoke('send-quote-email', {
        body: {
          quoteId,
          name: normalized.name,
          email: normalized.email,
          phone: normalized.phone,
          service: normalized.service || 'General inquiry',
          message: normalized.message || 'No message provided',
          addressLine1: normalized.address_line_1,
          addressLine2: normalized.address_line_2,
          city: normalized.city,
          postcode: normalized.postcode,
          country: normalized.country || 'United Kingdom',
          discountCode: normalized.discount_code || undefined,
          files: filesData // Send base64 files directly
        }
      });
      
      logSecurityEvent({
        action: 'QUOTE_EMAIL_SENT',
        resourceId: quoteId,
        metadata: { emailSent: true }
      });
    } catch (emailError) {
      console.error("[submitQuote] email notification failed:", emailError);
      logSecurityEvent({
        action: 'QUOTE_EMAIL_FAILED',
        resourceId: quoteId,
        metadata: { emailError: emailError instanceof Error ? emailError.message : 'Unknown error' },
        severity: 'low'
      });
      // Don't throw - email failure shouldn't block quote submission
    }

    // Security: Log successful submission completion
    const duration = Date.now() - startTime;
    logSecurityEvent({
      action: 'QUOTE_SUBMISSION_COMPLETED',
      resourceId: quoteId,
      metadata: { 
        duration,
        filesProcessed: filesData.length
      }
    });

    return { 
      quoteId, 
      trackingAllowed: trackingMetadata.tracking_consent?.tracking_allowed === true,
      uploads: filesData.map(f => ({ 
        success: true, 
        file: { name: f.name, size: f.size, type: f.type } as File, 
        path: f.path 
      })) as UploadResult[], 
      succeeded: filesData.length, 
      failed: 0 
    };

  } catch (error) {
    // Security: Log submission failure
    logSecurityEvent({
      action: 'QUOTE_SUBMISSION_FAILED',
      metadata: { 
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      },
      severity: 'medium'
    });
    throw error;
  }
}
