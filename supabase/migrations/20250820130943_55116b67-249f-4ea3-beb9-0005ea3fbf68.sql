
-- 1. Remove the public SELECT policy on storage.objects for quote-photos bucket
DROP POLICY IF EXISTS "Give users access to own folder 1oj01fe_0" ON storage.objects;

-- 2. Add foreign key constraint to quote_files table referencing quotes
ALTER TABLE public.quote_files 
ADD CONSTRAINT fk_quote_files_quote_id 
FOREIGN KEY (quote_id) REFERENCES public.quotes(id) ON DELETE CASCADE;

-- 3. Tighten the storage INSERT policy with proper validation
DROP POLICY IF EXISTS "Give users access to own folder 1oj01fe_1" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload quote photos 1oj01fe_1" ON storage.objects;

CREATE POLICY "Validated quote photo uploads only" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'quote-photos' AND
  -- Ensure the quote_id (first part of path) exists and was created recently
  EXISTS (
    SELECT 1 FROM public.quotes 
    WHERE id = (string_to_array(name, '/'))[1]::uuid
    AND created_at > now() - interval '1 hour'
  )
);

-- 4. Create trigger to limit files per quote (max 10 files)
CREATE OR REPLACE FUNCTION public.enforce_quote_file_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = 'public', 'pg_temp'
AS $$
DECLARE
  file_count int;
BEGIN
  SELECT COUNT(*) INTO file_count
  FROM public.quote_files
  WHERE quote_id = NEW.quote_id;
  
  IF file_count >= 10 THEN
    RAISE EXCEPTION 'Maximum of 10 files allowed per quote';
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_quote_file_limit_trigger
  BEFORE INSERT ON public.quote_files
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_quote_file_limit();

-- 5. Revoke public execute on bootstrap_admin function
REVOKE EXECUTE ON FUNCTION public.bootstrap_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.bootstrap_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.bootstrap_admin() TO authenticated;

-- 6. Update bootstrap_admin function to be more secure
CREATE OR REPLACE FUNCTION public.bootstrap_admin()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
DECLARE
  admin_count int;
  result json;
BEGIN
  -- Check if any admin exists
  SELECT COUNT(*) INTO admin_count
  FROM public.user_roles 
  WHERE role = 'admin';

  IF admin_count > 0 THEN
    result := json_build_object(
      'success', false,
      'message', 'Admin user already exists'
    );
    RETURN result;
  END IF;

  -- Must be authenticated
  IF auth.uid() IS NULL THEN
    result := json_build_object(
      'success', false,
      'message', 'Authentication required'
    );
    RETURN result;
  END IF;

  -- Grant admin role to current user
  INSERT INTO public.user_roles(user_id, role)
  VALUES (auth.uid(), 'admin');

  result := json_build_object(
    'success', true,
    'message', 'Admin role granted successfully'
  );
  
  RETURN result;
END;
$$;
