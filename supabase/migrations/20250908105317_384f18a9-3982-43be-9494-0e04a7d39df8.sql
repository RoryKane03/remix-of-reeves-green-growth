-- Secure Supabase Storage access for quote-photos bucket
-- Admins: full access; Owners: read access to their files; Uploads: only to own quote folders

-- 1) Admins can fully manage objects in quote-photos
CREATE POLICY IF NOT EXISTS "Admins full access to quote-photos"
ON storage.objects
FOR ALL
USING (
  bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role)
)
WITH CHECK (
  bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- 2) Owners can READ files that belong to quotes they own (by user_id) or by matching JWT email for anonymous quotes
CREATE POLICY IF NOT EXISTS "Owners read access to quote files"
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

-- 3) Authenticated users can UPLOAD only into folders named after a quote they own (first path segment = quoteId)
CREATE POLICY IF NOT EXISTS "Users can upload to own quote folders"
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

-- 4) Prevent updates/deletes by non-admins
CREATE POLICY IF NOT EXISTS "Only admins can modify or delete quote files"
ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY IF NOT EXISTS "Only admins can delete quote files"
ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role));