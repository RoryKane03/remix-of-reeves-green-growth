-- Drop potentially conflicting storage policies
DROP POLICY IF EXISTS "Allow anonymous quote photo uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow uploads to recent quote folders" ON storage.objects;
DROP POLICY IF EXISTS "Restricted quote file upload" ON storage.objects;

-- Create ONE clear, robust policy for anonymous uploads
CREATE POLICY "Enable anonymous photo uploads for recent quotes"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'quote-photos'
  AND 
  -- Extract quote ID from path (format: {quoteId}/{filename})
  (storage.foldername(name))[1] IN (
    SELECT id::text 
    FROM public.quotes 
    WHERE created_at > (NOW() - INTERVAL '2 hours')
  )
);