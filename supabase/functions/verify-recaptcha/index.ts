import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RecaptchaRequest {
  token: string;
}

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token }: RecaptchaRequest = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'reCAPTCHA token is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const recaptchaSecretKey = Deno.env.get('RECAPTCHA_SECRET_KEY');
    if (!recaptchaSecretKey) {
      console.error('RECAPTCHA_SECRET_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'reCAPTCHA not configured' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Verify token with Google reCAPTCHA API
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const verifyResponse = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${recaptchaSecretKey}&response=${token}`,
    });

    const recaptchaResult: RecaptchaResponse = await verifyResponse.json();

    console.log('reCAPTCHA verification result:', {
      success: recaptchaResult.success,
      score: recaptchaResult.score,
      action: recaptchaResult.action,
      errors: recaptchaResult['error-codes'],
    });

    // For reCAPTCHA v3, check the score (0.0 - 1.0, where 1.0 is very likely a good interaction)
    const MIN_SCORE = 0.5;
    if (!recaptchaResult.success) {
      return new Response(
        JSON.stringify({ 
          error: 'reCAPTCHA verification failed',
          success: false,
          errors: recaptchaResult['error-codes']
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    if (recaptchaResult.score !== undefined && recaptchaResult.score < MIN_SCORE) {
      return new Response(
        JSON.stringify({ 
          error: 'reCAPTCHA score too low',
          success: false,
          score: recaptchaResult.score 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        score: recaptchaResult.score,
        action: recaptchaResult.action
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in verify-recaptcha function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
