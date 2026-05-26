import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.55.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// HTML-escape user-supplied values to prevent HTML injection in admin emails
const he = (s: unknown): string => {
  if (s === null || s === undefined) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

interface QuoteEmailRequest {
  quoteId: string;
  name: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postcode?: string;
  country?: string;
  discountCode?: string;
  files?: Array<{
    name: string;
    size: number;
    type: string;
    base64: string;
    path?: string;
  }>;
}

type QuoteEmailFile = NonNullable<QuoteEmailRequest['files']>[number];

const normaliseBase64 = (value: string) => value.includes(',') ? value.split(',').pop() || '' : value;

const getSafeAttachmentName = (name: string, type: string) => {
  const cleaned = (name || 'quote-photo.jpg').replace(/[^a-zA-Z0-9._-]/g, '_');
  if (type === 'image/jpeg' && !/\.jpe?g$/i.test(cleaned)) {
    return cleaned.replace(/\.[^.]+$/, '') + '.jpg';
  }
  return cleaned;
};

const buildAttachment = (file: QuoteEmailFile) => {
  const base64 = normaliseBase64(file.base64 || '').replace(/\s/g, '');
  if (!base64) return null;

  const contentType = file.type || 'image/jpeg';
  const filename = getSafeAttachmentName(file.name, contentType);

  return {
    filename,
    content: base64,
    contentType,
  };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[send-quote-email] Processing request");
    
    const payload: QuoteEmailRequest = await req.json();
    console.log("[send-quote-email] Received payload:", {
      quoteId: payload.quoteId,
      name: payload.name,
      email: payload.email,
      filesCount: payload.files?.length ?? 0
    });

    // Security Check 1: Verify quote exists and was created recently (within last 10 minutes)
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .select('created_at, email')
      .eq('id', payload.quoteId)
      .single();

    if (quoteError || !quote) {
      console.error("[send-quote-email] Quote not found:", quoteError);
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Quote not found or expired'
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Check if quote is recent (within 10 minutes)
    const quoteAge = Date.now() - new Date(quote.created_at).getTime();
    const TEN_MINUTES = 10 * 60 * 1000;
    if (quoteAge > TEN_MINUTES) {
      console.error("[send-quote-email] Quote too old:", { quoteAge, maxAge: TEN_MINUTES });
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Quote submission window expired'
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Security Check 2: Verify email matches the quote
    if (quote.email !== payload.email) {
      console.error("[send-quote-email] Email mismatch");
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Email verification failed'
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Security Check 3a: IP-based rate limiting (logged via security_events)
    const fwd = req.headers.get("x-forwarded-for") || "";
    const clientIp = fwd.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
    if (clientIp !== "unknown") {
      const { count: recentIpHits } = await supabase
        .from('security_events')
        .select('id', { count: 'exact', head: true })
        .eq('event_type', 'QUOTE_EMAIL_DISPATCHED')
        .gte('created_at', new Date(Date.now() - 60 * 1000).toISOString())
        .filter('ip_address', 'eq', clientIp);
      if ((recentIpHits ?? 0) >= 5) {
        console.warn("[send-quote-email] IP rate limit exceeded:", clientIp);
        return new Response(
          JSON.stringify({ success: false, error: 'Too many requests from this network. Please try again shortly.' }),
          { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      // Record dispatch attempt for IP throttling
      await supabase.rpc('log_security_event', {
        event_type_param: 'QUOTE_EMAIL_DISPATCHED',
        severity_param: 'low',
        metadata_param: { ipAddress: clientIp, quoteId: payload.quoteId }
      });
    }

    // Security Check 3b: Email-based rate limiting
    const { data: recentEmails } = await supabase
      .from('quotes')
      .select('id')
      .eq('email', payload.email)
      .gte('created_at', new Date(Date.now() - 60 * 1000).toISOString());

    if (recentEmails && recentEmails.length > 3) {
      console.error("[send-quote-email] Rate limit exceeded for email:", payload.email);
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Too many requests. Please wait a minute before submitting again.'
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Build address section if provided
    let addressSection = "";
    if (payload.addressLine1 || payload.city || payload.postcode) {
      const addressParts = [
        payload.addressLine1,
        payload.addressLine2,
        payload.city,
        payload.postcode,
        payload.country
      ].filter(Boolean);
      
      addressSection = `
<h3 style="color: #333; margin-top: 20px;">Address:</h3>
<p style="color: #666; line-height: 1.6;">
  ${addressParts.map(he).join("<br>")}
</p>`;
    }

    // Build files section if provided
    let filesSection = "";
    if (payload.files && payload.files.length > 0) {
      const filesList = payload.files
        .map(f => {
          const sizeMB = (f.size / (1024 * 1024)).toFixed(2);
          const isImage = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'].includes(f.type?.toLowerCase() || '');
          
          return `
            <li style="color: #666; margin: 10px 0; padding: 12px; background: #f5f5f5; border-radius: 4px;">
              <strong style="color: #333;">${isImage ? '📸' : '📄'} ${he(f.name)}</strong> 
              <span style="color: #999;">(${sizeMB} MB - attached to this email)</span>
            </li>
          `;
        })
        .join("");
      
      filesSection = `
<h3 style="color: #333; margin-top: 20px;">Attached Files:</h3>
<p style="color: #666; margin-bottom: 10px;">
  📎 ${payload.files.length} file${payload.files.length !== 1 ? 's' : ''} attached to this email
</p>
<ul style="list-style-type: none; padding-left: 0;">
  ${filesList}
</ul>`;
    }

    // Build the email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #2D5016 0%, #3d6b1f 100%); padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Quote Request</h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 30px;">
      
      <!-- Service Badge -->
      ${payload.service ? `
      <div style="background-color: #e8f5e9; border-left: 4px solid #2D5016; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px;">
        <strong style="color: #2D5016; font-size: 16px;">Service: ${he(payload.service)}</strong>
      </div>
      ` : ''}
      
      <!-- Discount Code -->
      ${payload.discountCode ? `
      <div style="background-color: #fff8e1; border-left: 4px solid #f59e0b; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px;">
        <strong style="color: #92400e; font-size: 16px;">🏷️ Discount Code: ${he(payload.discountCode)}</strong>
      </div>
      ` : ''}
      <!-- Customer Details -->
      <h2 style="color: #333; margin-top: 0; font-size: 20px; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">Customer Details</h2>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #666; font-weight: 600; width: 100px;">Name:</td>
          <td style="padding: 10px 0; color: #333;">${he(payload.name)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #666; font-weight: 600;">Email:</td>
          <td style="padding: 10px 0;"><a href="mailto:${he(payload.email)}" style="color: #2D5016; text-decoration: none;">${he(payload.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #666; font-weight: 600;">Phone:</td>
          <td style="padding: 10px 0;"><a href="tel:${he(payload.phone)}" style="color: #2D5016; text-decoration: none;">${he(payload.phone)}</a></td>
        </tr>
      </table>
      
      <!-- Message -->
      ${payload.message ? `
      <h3 style="color: #333; margin-top: 20px;">Message:</h3>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 3px solid #2D5016;">
        <p style="color: #666; line-height: 1.6; margin: 0; white-space: pre-wrap;">${he(payload.message)}</p>
      </div>
      ` : ''}
      
      ${addressSection}
      ${filesSection}
      
      <!-- Quote Reference -->
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="color: #999; font-size: 12px; margin: 5px 0;">
          <strong>Quote ID:</strong> ${he(payload.quoteId)}
        </p>
        <p style="color: #999; font-size: 12px; margin: 5px 0;">
          <strong>Submitted:</strong> ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}
        </p>
      </div>
      
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
      <p style="color: #999; font-size: 12px; margin: 0;">
        This quote request was submitted via the Reeves Tree Surgeons website contact form.
      </p>
    </div>
    
  </div>
</body>
</html>
    `;

    // Prepare attachments from base64 data
    const attachments = payload.files && payload.files.length > 0
      ? payload.files
          .map(buildAttachment)
          .filter((attachment): attachment is NonNullable<typeof attachment> => Boolean(attachment))
      : undefined;

    // Send the email
    console.log("[send-quote-email] Sending email to rory.kane07@outlook.com", {
      attachmentCount: attachments?.length || 0,
      attachmentBytes: payload.files?.map(file => ({ name: file.name, size: file.size, base64Length: file.base64?.length ?? 0 })) ?? []
    });
    
    const fileCountText = payload.files && payload.files.length > 0 
      ? ` [${payload.files.length} photo${payload.files.length !== 1 ? 's' : ''}]` 
      : '';
    
    const emailResponse = await resend.emails.send({
      from: "Reeves Tree Surgeons <onboarding@resend.dev>",
      to: ["rory.kane07@outlook.com"],
      subject: `New Quote Request${payload.service ? ` - ${payload.service}` : ''}${fileCountText}`,
      html: emailHtml,
      replyTo: payload.email,
      attachments: attachments,
    });

    console.log("[send-quote-email] Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: emailResponse.data?.id 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: unknown) {
    console.error("[send-quote-email] Error:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email"
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
