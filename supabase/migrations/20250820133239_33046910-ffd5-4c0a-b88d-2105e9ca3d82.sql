
-- Fix the customer photo privacy breach by removing public access
DROP POLICY IF EXISTS "Anyone can view quote photos" ON storage.objects;

-- Remove duplicate storage INSERT policies to clean up conflicts
DROP POLICY IF EXISTS "Anyone can upload quote photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload quote photos" ON storage.objects;

-- Create a single, secure upload policy for quote photos
CREATE POLICY "Authenticated users can upload to quote-photos bucket"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'quote-photos' AND
  auth.uid() IS NOT NULL
);

-- Ensure only admins can view uploaded customer photos
CREATE POLICY "Admins can view all quote photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'quote-photos' AND
  has_role(auth.uid(), 'admin'::app_role)
);

-- Enhance the bootstrap_admin function to return proper response format
CREATE OR REPLACE FUNCTION public.bootstrap_admin()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  admin_count integer;
BEGIN
  -- Check if any admin exists
  SELECT COUNT(*) INTO admin_count
  FROM public.user_roles
  WHERE role = 'admin';

  -- Only allow if no admin exists
  IF admin_count > 0 THEN
    -- Log the blocked attempt
    INSERT INTO public.audit_logs(event, entity, entity_id, actor_user_id, details)
    VALUES (
      'bootstrap_admin_blocked',
      'user_roles',
      NULL,
      auth.uid(),
      jsonb_build_object(
        'reason', 'admin_already_exists',
        'existing_admin_count', admin_count,
        'ip_address', current_setting('request.headers', true)::jsonb->>'x-forwarded-for'
      )
    );
    
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Admin user already exists in the system'
    );
  END IF;

  -- Must be signed in
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Must be authenticated to bootstrap admin access'
    );
  END IF;

  -- Grant admin to the caller
  INSERT INTO public.user_roles(user_id, role)
  VALUES (auth.uid(), 'admin');

  -- Log the successful bootstrap
  INSERT INTO public.audit_logs(event, entity, entity_id, actor_user_id, details)
  VALUES (
    'admin_bootstrapped',
    'user_roles',
    NULL,
    auth.uid(),
    jsonb_build_object(
      'new_admin_user_id', auth.uid(),
      'ip_address', current_setting('request.headers', true)::jsonb->>'x-forwarded-for'
    )
  );

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Admin access granted successfully'
  );
END;
$function$;

-- Add admin deletion audit logging trigger
CREATE OR REPLACE FUNCTION public.log_quote_delete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  INSERT INTO public.audit_logs(event, entity, entity_id, actor_user_id, details)
  VALUES (
    'quote_deleted',
    'quotes',
    OLD.id,
    auth.uid(),
    jsonb_build_object(
      'deleted_quote_name', OLD.name,
      'deleted_quote_email', OLD.email,
      'deleted_quote_phone', OLD.phone,
      'deleted_quote_service', OLD.service,
      'ip_address', current_setting('request.headers', true)::jsonb->>'x-forwarded-for'
    )
  );
  RETURN OLD;
END;
$function$;

-- Create the trigger for quote deletion logging
DROP TRIGGER IF EXISTS on_quote_delete ON public.quotes;
CREATE TRIGGER on_quote_delete
  BEFORE DELETE ON public.quotes
  FOR EACH ROW EXECUTE FUNCTION public.log_quote_delete();

-- Add RLS policy to allow admins to delete quotes (currently missing)
CREATE POLICY "Admins can delete quotes"
ON public.quotes
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
