-- Phase 1 Critical Security Fixes

-- 1. Restore storage upload policy for quote-photos bucket
-- This allows anonymous users to upload files with UUID-prefixed paths
CREATE POLICY "Anyone can upload to quote-photos with UUID prefix"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'quote-photos' 
  AND name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/.+$'
);

-- 2. Restrict quote_files INSERT policy to prevent unauthorized file record creation
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can upload quote files" ON public.quote_files;

-- Create restricted policy: only allow insertions for recent quotes within 1 hour
CREATE POLICY "Restricted quote file upload"
ON public.quote_files
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.quotes q
    WHERE q.id = quote_id
    AND q.created_at > NOW() - INTERVAL '1 hour'
    AND (
      (auth.uid() IS NOT NULL AND q.user_id = auth.uid())
      OR (auth.uid() IS NULL AND q.email IS NOT NULL)
    )
  )
);