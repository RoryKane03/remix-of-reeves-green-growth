-- Enhance security logging and enforce server-side protections via triggers
-- 1) Update log_security_event to persist ip_address and user_agent if provided in metadata
-- 2) Add/ensure triggers for rate limiting and audit logging

-- 1) Enhance the log_security_event function
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type_param text,
  severity_param text DEFAULT 'medium'::text,
  user_id_param uuid DEFAULT NULL::uuid,
  metadata_param jsonb DEFAULT NULL::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  ip inet;
  ua text;
BEGIN
  -- Extract structured fields when present in metadata
  IF metadata_param ? 'ipAddress' THEN
    BEGIN
      ip := (metadata_param->>'ipAddress')::inet;
    EXCEPTION WHEN others THEN
      ip := NULL; -- ignore parse errors
    END;
  END IF;
  IF metadata_param ? 'userAgent' THEN
    ua := metadata_param->>'userAgent';
  END IF;

  INSERT INTO public.security_events(event_type, severity, user_id, metadata, ip_address, user_agent)
  VALUES (event_type_param, severity_param, user_id_param, metadata_param, ip, ua);
END;
$function$;

-- 2) Create idempotent triggers for rate limiting and audit logging
-- Quotes: enforce rate limit BEFORE INSERT using v2 function
DROP TRIGGER IF EXISTS trg_enforce_quote_rate_limit_v2 ON public.quotes;
CREATE TRIGGER trg_enforce_quote_rate_limit_v2
BEFORE INSERT ON public.quotes
FOR EACH ROW
EXECUTE FUNCTION public.enforce_quote_rate_limit_v2();

-- Quotes: audit logging AFTER INSERT
DROP TRIGGER IF EXISTS trg_log_quote_insert ON public.quotes;
CREATE TRIGGER trg_log_quote_insert
AFTER INSERT ON public.quotes
FOR EACH ROW
EXECUTE FUNCTION public.log_quote_insert();

-- Quote files: audit logging AFTER INSERT
DROP TRIGGER IF EXISTS trg_log_quote_file_insert ON public.quote_files;
CREATE TRIGGER trg_log_quote_file_insert
AFTER INSERT ON public.quote_files
FOR EACH ROW
EXECUTE FUNCTION public.log_quote_file_insert();

-- User roles: security audit on role changes
DROP TRIGGER IF EXISTS trg_log_admin_security_events ON public.user_roles;
CREATE TRIGGER trg_log_admin_security_events
AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.log_admin_security_events();