
DROP POLICY IF EXISTS "Anyone upload quote photos" ON storage.objects;
CREATE POLICY "Anyone upload quote photos" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'quote-photos');

DROP POLICY IF EXISTS "Admins read quote photos" ON storage.objects;
CREATE POLICY "Admins read quote photos" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins delete quote photos" ON storage.objects;
CREATE POLICY "Admins delete quote photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'));
