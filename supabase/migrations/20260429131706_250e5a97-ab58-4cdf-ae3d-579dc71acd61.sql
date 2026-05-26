CREATE OR REPLACE FUNCTION public.check_submission_rate_limit(email_param text, phone_param text DEFAULT NULL::text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Email rate limit: 1 submission per 30 seconds
  SELECT COUNT(*) INTO recent_count
  FROM public.quotes
  WHERE email = email_param
    AND created_at > NOW() - INTERVAL '30 seconds';

  IF recent_count >= 1 THEN
    INSERT INTO public.audit_logs(event, entity, details)
    VALUES (
      'rate_limit_exceeded',
      'quotes',
      jsonb_build_object('email', email_param, 'limit_type', 'email_frequency', 'attempts', recent_count + 1)
    );
    RETURN FALSE;
  END IF;

  -- Phone rate limit: 1 submission per 30 seconds
  IF phone_param IS NOT NULL THEN
    SELECT COUNT(*) INTO recent_count
    FROM public.quotes
    WHERE phone = phone_param
      AND created_at > NOW() - INTERVAL '30 seconds';

    IF recent_count >= 1 THEN
      INSERT INTO public.audit_logs(event, entity, details)
      VALUES (
        'rate_limit_exceeded',
        'quotes',
        jsonb_build_object('phone', phone_param, 'limit_type', 'phone_frequency', 'attempts', recent_count + 1)
      );
      RETURN FALSE;
    END IF;
  END IF;

  RETURN TRUE;
END;
$function$;