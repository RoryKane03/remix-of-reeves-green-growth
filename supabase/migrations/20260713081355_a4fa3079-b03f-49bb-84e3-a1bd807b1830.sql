CREATE POLICY "Only admins can update quote-photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'));