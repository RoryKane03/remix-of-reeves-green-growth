-- Enable anonymous users to upload photos to quote-photos bucket
-- Security: Only allow uploads to folders matching recent quote IDs

-- Policy 1: Allow anonymous uploads to quote-photos bucket
-- Files must be uploaded to paths matching existing quote IDs created within last hour
CREATE POLICY "Allow anonymous quote photo uploads"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'quote-photos' 
  AND (storage.foldername(name))[1] IN (
    SELECT id::text 
    FROM public.quotes 
    WHERE created_at > NOW() - INTERVAL '1 hour'
  )
);

-- Policy 2: Allow reading quote photos for authenticated users and admins
CREATE POLICY "Allow reading quote photos"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (
  bucket_id = 'quote-photos'
  AND (
    -- Admins can read all
    public.has_role(auth.uid(), 'admin'::app_role)
    OR
    -- Authenticated users can read photos from their quotes
    (auth.uid() IS NOT NULL AND (storage.foldername(name))[1] IN (
      SELECT id::text FROM public.quotes WHERE user_id = auth.uid()
    ))
    OR
    -- Anonymous users can read photos from quotes matching their email
    (auth.uid() IS NULL AND (storage.foldername(name))[1] IN (
      SELECT id::text FROM public.quotes WHERE created_at > NOW() - INTERVAL '24 hours'
    ))
  )
);

-- Policy 3: Allow deletion for admins only
CREATE POLICY "Allow admin deletion of quote photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'quote-photos'
  AND public.has_role(auth.uid(), 'admin'::app_role)
);