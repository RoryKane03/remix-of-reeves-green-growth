
-- Allow anonymous quote submitters to attach file metadata to their just-created quote
DROP POLICY IF EXISTS "Restricted quote file upload" ON public.quote_files;

CREATE POLICY "Anonymous quote file upload for recent quotes"
ON public.quote_files
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM quotes q
    WHERE q.id = quote_files.quote_id
      AND q.created_at > (now() - interval '1 hour')
      AND q.email IS NOT NULL
  )
);

-- Allow anonymous quote submitters to upload to storage for their just-created quote
DROP POLICY IF EXISTS "Restricted photo uploads for recent quotes" ON storage.objects;

CREATE POLICY "Anonymous photo uploads for recent quotes"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'quote-photos'
  AND (storage.foldername(name))[1] IN (
    SELECT (quotes.id)::text FROM quotes
    WHERE quotes.created_at > (now() - interval '2 hours')
  )
);
