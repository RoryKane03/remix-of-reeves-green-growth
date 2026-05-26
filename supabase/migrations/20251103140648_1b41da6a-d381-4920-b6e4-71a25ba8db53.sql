-- Fix storage policy: use objects.name (file path) instead of q.name (customer name)
DROP POLICY IF EXISTS "Allow uploads to recent quote folders" ON storage.objects;

CREATE POLICY "Allow uploads to recent quote folders"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'quote-photos' 
  AND (
    -- Allow authenticated users with matching user_id or admin role
    (auth.uid() IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.quotes q
      WHERE q.id::text = (storage.foldername(name))[1]
      AND (q.user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::app_role))
    ))
    OR
    -- Allow anonymous users for recent quotes (within 1 hour)
    (auth.uid() IS NULL AND EXISTS (
      SELECT 1 FROM public.quotes q
      WHERE q.id::text = (storage.foldername(name))[1]
      AND q.created_at > (NOW() - INTERVAL '1 hour')
      AND q.email IS NOT NULL
    ))
  )
);