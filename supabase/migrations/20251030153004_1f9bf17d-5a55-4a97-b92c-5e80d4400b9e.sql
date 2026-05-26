-- Allow unauthenticated users to insert quote files
DROP POLICY IF EXISTS "Authenticated users can upload quote files" ON public.quote_files;

CREATE POLICY "Anyone can upload quote files"
ON public.quote_files
FOR INSERT
WITH CHECK (true);