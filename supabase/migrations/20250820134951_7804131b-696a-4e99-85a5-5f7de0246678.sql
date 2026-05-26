
-- Allow public (including anon) uploads to the quote-photos bucket
DROP POLICY IF EXISTS "Authenticated users can upload to quote-photos bucket" ON storage.objects;

CREATE POLICY "Public can upload to quote-photos with UUID prefix"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'quote-photos'
  AND name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/.+$'
);
