
-- Phase 1: Critical Security Fixes

-- 1. Add RLS policy to allow customers to view their own quotes via email verification
CREATE POLICY "Users can view quotes with email verification" 
ON public.quotes 
FOR SELECT 
USING (
  -- Allow if user provides matching email (for customer quote viewing)
  email = current_setting('request.jwt.claims', true)::json->>'email'
  OR 
  -- Allow admin access (existing policy)
  has_role(auth.uid(), 'admin'::app_role)
);

-- 2. Add authentication requirement for file uploads
DROP POLICY IF EXISTS "Anyone can upload quote files" ON public.quote_files;
CREATE POLICY "Authenticated users can upload quote files" 
ON public.quote_files 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- 3. Add RLS policy for file access control
CREATE POLICY "Users can view files for their quotes" 
ON public.quote_files 
FOR SELECT 
USING (
  -- Allow if the file belongs to a quote with matching email
  EXISTS (
    SELECT 1 FROM public.quotes 
    WHERE quotes.id = quote_files.quote_id 
    AND quotes.email = current_setting('request.jwt.claims', true)::json->>'email'
  )
  OR 
  -- Allow admin access (existing policy)
  has_role(auth.uid(), 'admin'::app_role)
);

-- 4. Add server-side rate limiting function
CREATE OR REPLACE FUNCTION public.check_submission_rate_limit(
  email_param TEXT,
  phone_param TEXT DEFAULT NULL
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Check email-based rate limiting (1 submission per 5 minutes)
  SELECT COUNT(*) INTO recent_count
  FROM public.quotes
  WHERE email = email_param
    AND created_at > NOW() - INTERVAL '5 minutes';
    
  IF recent_count >= 1 THEN
    -- Log the rate limit violation
    INSERT INTO public.audit_logs(event, entity, details)
    VALUES (
      'rate_limit_exceeded',
      'quotes',
      jsonb_build_object(
        'email', email_param,
        'limit_type', 'email_frequency',
        'attempts', recent_count + 1
      )
    );
    RETURN FALSE;
  END IF;
  
  -- Check phone-based rate limiting if phone provided
  IF phone_param IS NOT NULL THEN
    SELECT COUNT(*) INTO recent_count
    FROM public.quotes
    WHERE phone = phone_param
      AND created_at > NOW() - INTERVAL '5 minutes';
      
    IF recent_count >= 1 THEN
      INSERT INTO public.audit_logs(event, entity, details)
      VALUES (
        'rate_limit_exceeded',
        'quotes',
        jsonb_build_object(
          'phone', phone_param,
          'limit_type', 'phone_frequency',
          'attempts', recent_count + 1
        )
      );
      RETURN FALSE;
    END IF;
  END IF;
  
  RETURN TRUE;
END;
$$;

-- 5. Update the quote submission trigger to use the rate limiting function
DROP TRIGGER IF EXISTS enforce_quote_rate_limit_trigger ON public.quotes;
CREATE OR REPLACE FUNCTION public.enforce_quote_rate_limit_v2()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Use the new rate limiting function
  IF NOT public.check_submission_rate_limit(NEW.email, NEW.phone) THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please wait 5 minutes before submitting another quote.';
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_quote_rate_limit_trigger_v2
  BEFORE INSERT ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_quote_rate_limit_v2();

-- 6. Add security monitoring table for suspicious activities
CREATE TABLE IF NOT EXISTS public.security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  user_id UUID REFERENCES auth.users(id),
  ip_address INET,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on security events (admin only)
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage security events" 
ON public.security_events 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- 7. Add function to log security events from database triggers
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type_param TEXT,
  severity_param TEXT DEFAULT 'medium',
  user_id_param UUID DEFAULT NULL,
  metadata_param JSONB DEFAULT NULL
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.security_events(event_type, severity, user_id, metadata)
  VALUES (event_type_param, severity_param, user_id_param, metadata_param);
END;
$$;
