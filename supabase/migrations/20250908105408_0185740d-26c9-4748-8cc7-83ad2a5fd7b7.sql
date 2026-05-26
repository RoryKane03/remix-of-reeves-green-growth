-- Secure Supabase Storage access for quote-photos bucket (retry without IF NOT EXISTS)

-- 1) Admins full access
DROP POLICY IF EXISTS "Admins full access to quote-photos" ON storage.objects;
CREATE POLICY "Admins full access to quote-photos"
ON storage.objects
FOR ALL
USING (
  bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role)
)
WITH CHECK (
  bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- 2) Owners read access
DROP POLICY IF EXISTS "Owners read access to quote files" ON storage.objects;
CREATE POLICY "Owners read access to quote files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'quote-photos'
  AND EXISTS (
    SELECT 1
    FROM public.quote_files qf
    JOIN public.quotes q ON q.id = qf.quote_id
    WHERE qf.file_path = storage.objects.name
      AND (
        (q.user_id IS NOT NULL AND q.user_id = auth.uid())
        OR (
          q.user_id IS NULL
          AND ((current_setting('request.jwt.claims', true))::json ->> 'email') IS NOT NULL
          AND q.email = ((current_setting('request.jwt.claims', true))::json ->> 'email')
        )
      )
  )
);

-- 3) Users can upload to their own quote folders
DROP POLICY IF EXISTS "Users can upload to own quote folders" ON storage.objects;
CREATE POLICY "Users can upload to own quote folders"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'quote-photos'
  AND auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM public.quotes q
    WHERE q.id::text = (storage.foldername(name))[1]
      AND (q.user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role))
  )
);

-- 4) Only admins can modify or delete
DROP POLICY IF EXISTS "Only admins can modify or delete quote files" ON storage.objects;
CREATE POLICY "Only admins can modify or delete quote files"
ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Only admins can delete quote files" ON storage.objects;
CREATE POLICY "Only admins can delete quote files"
ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role));