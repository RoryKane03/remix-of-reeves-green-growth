
import { supabase } from '@/integrations/supabase/client';

// Enhanced security utilities for monitoring and logging

export interface SecurityLogData {
  userId?: string;
  action: string;
  resource?: string;
  resourceId?: string;
  timestamp: string;
  metadata?: Record<string, any>;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  ipAddress?: string;
  userAgent?: string;
}

// Persist security event to Supabase via RPC (SECURITY DEFINER)
const persistSecurityEvent = async (data: SecurityLogData) => {
  // Attempt to enrich with current session user if not provided
  const { data: sessionData } = await supabase.auth.getSession();
  const sessionUserId = sessionData?.session?.user?.id;

  const payload = {
    event_type_param: data.action,
    severity_param: data.severity || 'low',
    user_id_param: data.userId || sessionUserId || null,
    metadata_param: {
      resource: data.resource,
      resourceId: data.resourceId,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent || navigator.userAgent,
      timestamp: data.timestamp,
      ...(data.metadata || {}),
    },
  };

  return supabase.rpc('log_security_event', payload);
};

export const logSecurityEvent = (data: Omit<SecurityLogData, 'timestamp'>) => {
  const logData: SecurityLogData = {
    ...data,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  };
  
  // Enhanced console logging with security prefix
  console.log('[SECURITY]', logData);

  // Persist to Supabase in the background; do not block or throw
  persistSecurityEvent(logData)
    .then(({ error }) => {
      if (error) {
        console.warn('[SECURITY] Failed to persist security event', { error, logData });
      }
    })
    .catch((err) => {
      console.warn('[SECURITY] Unexpected error while persisting security event', err);
    });
  
  // In production, this could also send to a SIEM or security monitoring service
  // Example: await sendToSecurityMonitoring(logData);
};

export const logAdminAction = (
  userId: string, 
  action: string, 
  resource?: string, 
  resourceId?: string,
  metadata?: Record<string, any>
) => {
  logSecurityEvent({
    userId,
    action: `ADMIN_${action}`,
    resource,
    resourceId,
    metadata,
    severity: 'high'
  });
};

export const logAuthEvent = (
  action: string,
  userId?: string,
  metadata?: Record<string, any>
) => {
  logSecurityEvent({
    userId,
    action: `AUTH_${action}`,
    metadata,
    severity: action.includes('FAILED') ? 'medium' : 'low'
  });
};

export const logSuspiciousActivity = (
  action: string,
  userId?: string,
  metadata?: Record<string, any>
) => {
  logSecurityEvent({
    userId,
    action: `SUSPICIOUS_${action}`,
    metadata,
    severity: 'critical'
  });
};

// Rate limiting utilities
export class RateLimiter {
  private attempts = new Map<string, { count: number; resetTime: number }>();
  
  constructor(private maxAttempts: number = 5, private windowMs: number = 15 * 60 * 1000) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);
    
    if (!record || now > record.resetTime) {
      this.attempts.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return true;
    }
    
    if (record.count >= this.maxAttempts) {
      logSuspiciousActivity('RATE_LIMIT_EXCEEDED', undefined, { identifier });
      return false;
    }
    
    record.count++;
    return true;
  }
  
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// Magic byte signatures for common image formats
const IMAGE_SIGNATURES = {
  'image/jpeg': [
    [0xFF, 0xD8, 0xFF], // JPEG
  ],
  'image/png': [
    [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A], // PNG
  ],
  'image/gif': [
    [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], // GIF87a
    [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], // GIF89a
  ],
  'image/webp': [
    [0x52, 0x49, 0x46, 0x46], // RIFF (WebP starts with RIFF)
  ],
};

/**
 * Validates file content by checking magic bytes (file signature)
 * This prevents attackers from uploading malicious files with fake extensions
 */
export const validateFileContent = async (file: File): Promise<{ valid: boolean; error?: string }> => {
  try {
    const buffer = await file.slice(0, 12).arrayBuffer();
    const bytes = new Uint8Array(buffer);
    
    const signatures = IMAGE_SIGNATURES[file.type as keyof typeof IMAGE_SIGNATURES];
    if (!signatures) {
      return { valid: false, error: `Unsupported file type: ${file.type}` };
    }

    // Check if file matches any of the signatures for its claimed type
    const matches = signatures.some(signature => {
      return signature.every((byte, index) => bytes[index] === byte);
    });

    if (!matches) {
      logSuspiciousActivity('FILE_SIGNATURE_MISMATCH', undefined, {
        fileName: file.name,
        claimedType: file.type,
        actualBytes: Array.from(bytes.slice(0, 8))
      });
      return { valid: false, error: `File ${file.name} does not match its claimed type` };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, error: `Failed to validate file content: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
};

// File upload security validation
export const validateFileUpload = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 8 * 1024 * 1024; // 8MB (matches submitQuote validation)
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const suspiciousExtensions = ['.exe', '.bat', '.cmd', '.scr', '.pif', '.com'];
  
  // Size validation
  if (file.size > maxSize) {
    return { valid: false, error: `File ${file.name} exceeds maximum size of 8MB` };
  }
  
  // Type validation
  if (!allowedTypes.includes(file.type)) {
    logSuspiciousActivity('INVALID_FILE_TYPE', undefined, { 
      fileName: file.name, 
      fileType: file.type 
    });
    return { valid: false, error: `File ${file.name} has invalid type: ${file.type}` };
  }
  
  // Extension validation
  const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  if (suspiciousExtensions.some(ext => extension.includes(ext))) {
    logSuspiciousActivity('SUSPICIOUS_FILE_EXTENSION', undefined, { 
      fileName: file.name, 
      extension 
    });
    return { valid: false, error: `File ${file.name} has suspicious extension` };
  }
  
  return { valid: true };
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
};

// Detect potential automated submissions
export const detectAutomatedSubmission = (formData: any): boolean => {
  const suspiciousPatterns = [
    // Honeypot field filled
    formData.website && formData.website.length > 0,
    // Form submitted too quickly (less than 3 seconds)
    formData.submitTime && (Date.now() - formData.startTime) < 3000,
    // Repeated identical submissions
    formData.fingerprint && sessionStorage.getItem('lastSubmissionFingerprint') === formData.fingerprint
  ];
  
  return suspiciousPatterns.some(pattern => pattern);
};
