
-- Fix database function search_path settings for security
-- This prevents potential privilege escalation by ensuring functions only access expected schemas

-- Update check_submission_rate_limit function
CREATE OR REPLACE FUNCTION public.check_submission_rate_limit(email_param text, phone_param text DEFAULT NULL::text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
$function$;

-- Update log_security_event function
CREATE OR REPLACE FUNCTION public.log_security_event(event_type_param text, severity_param text DEFAULT 'medium'::text, user_id_param uuid DEFAULT NULL::uuid, metadata_param jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  INSERT INTO public.security_events(event_type, severity, user_id, metadata)
  VALUES (event_type_param, severity_param, user_id_param, metadata_param);
END;
$function$;

-- Update enforce_quote_rate_limit_v2 function
CREATE OR REPLACE FUNCTION public.enforce_quote_rate_limit_v2()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  -- Use the new rate limiting function
  IF NOT public.check_submission_rate_limit(NEW.email, NEW.phone) THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please wait 5 minutes before submitting another quote.';
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Update enforce_quote_rate_limit function 
CREATE OR REPLACE FUNCTION public.enforce_quote_rate_limit()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public', 'pg_temp'
AS $function$
declare
  recent_count int;
begin
  -- Block very frequent repeats by email within 2 minutes
  select count(*) into recent_count
  from public.quotes
  where email = new.email
    and created_at > now() - interval '2 minutes';

  if recent_count >= 1 then
    raise exception 'Rate limit: Please wait a couple of minutes before submitting another quote with this email.';
  end if;

  -- Also throttle by phone within 2 minutes (if provided)
  if new.phone is not null and length(trim(new.phone)) > 0 then
    select count(*) into recent_count
    from public.quotes
    where phone = new.phone
      and created_at > now() - interval '2 minutes';

    if recent_count >= 1 then
      raise exception 'Rate limit: Please wait a couple of minutes before submitting another quote with this phone number.';
    end if;
  end if;

  return new;
end;
$function$;

-- Create enhanced triggers for quote rate limiting and security logging
DROP TRIGGER IF EXISTS trigger_enforce_quote_rate_limit ON public.quotes;
DROP TRIGGER IF EXISTS trigger_enforce_quote_rate_limit_v2 ON public.quotes;

-- Use the more secure v2 function with proper search_path
CREATE TRIGGER trigger_enforce_quote_rate_limit_v2
  BEFORE INSERT ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_quote_rate_limit_v2();

-- Add enhanced security logging for admin actions
CREATE OR REPLACE FUNCTION public.log_admin_security_events()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  -- Log admin role changes
  IF TG_TABLE_NAME = 'user_roles' THEN
    INSERT INTO public.audit_logs(event, entity, entity_id, actor_user_id, details)
    VALUES (
      CASE 
        WHEN TG_OP = 'INSERT' THEN 'admin_role_granted'
        WHEN TG_OP = 'DELETE' THEN 'admin_role_revoked'
        ELSE 'admin_role_modified'
      END,
      'user_roles',
      COALESCE(NEW.id, OLD.id),
      auth.uid(),
      jsonb_build_object(
        'target_user_id', COALESCE(NEW.user_id, OLD.user_id),
        'role', COALESCE(NEW.role, OLD.role),
        'operation', TG_OP,
        'timestamp', NOW()
      )
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- Create trigger for admin security logging
CREATE TRIGGER trigger_log_admin_security_events
  AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.log_admin_security_events();
