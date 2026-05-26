-- Drop the broken policy that incorrectly references q.name (customer name) instead of storage.objects.name (file path)
DROP POLICY IF EXISTS "Allow uploads to recent quote folders" ON storage.objects;

-- Create corrected policy with EXPLICIT storage.objects.name qualification
-- This ensures we extract the quote ID from the FILE PATH, not from the customer's name
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
      WHERE q.id::text = (storage.foldername(storage.objects.name))[1]
      AND (q.user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::app_role))
    ))
    OR
    -- Allow anonymous users for recent quotes (within 1 hour)
    (auth.uid() IS NULL AND EXISTS (
      SELECT 1 FROM public.quotes q
      WHERE q.id::text = (storage.foldername(storage.objects.name))[1]
      AND q.created_at > (NOW() - INTERVAL '1 hour')
      AND q.email IS NOT NULL
    ))
  )
);