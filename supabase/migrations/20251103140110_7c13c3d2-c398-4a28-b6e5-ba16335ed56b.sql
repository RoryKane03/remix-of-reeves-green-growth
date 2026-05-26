-- Allow anonymous users to upload files to storage for recent quotes
-- This matches the time window and validation logic used in quote_files RLS policies

-- Drop existing restrictive policy if it exists
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can upload to own quote folders" ON storage.objects;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Create new policy that handles both authenticated and anonymous users
CREATE POLICY "Allow uploads to recent quote folders"
ON storage.objects
FOR INSERT
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
    -- Allow anonymous users for recent quotes (within 1 hour, matching quote_files policy)
    (auth.uid() IS NULL AND EXISTS (
      SELECT 1 FROM public.quotes q
      WHERE q.id::text = (storage.foldername(name))[1]
      AND q.created_at > (NOW() - INTERVAL '1 hour')
      AND q.email IS NOT NULL
    ))
  )
);