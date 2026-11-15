CREATE OR REPLACE FUNCTION public.quote_accepts_files(_quote_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.quotes WHERE id = _quote_id AND created_at > now() - interval '1 hour')
$$;

DROP POLICY IF EXISTS "Anyone submit quote" ON public.quotes;
CREATE POLICY "Anyone submit quote" ON public.quotes FOR INSERT TO anon, authenticated
WITH CHECK (
  (user_id IS NULL OR user_id = auth.uid())
  AND length(btrim(name)) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 320 AND email LIKE '%@%'
  AND length(btrim(phone)) BETWEEN 5 AND 40
  AND coalesce(length(message), 0) <= 5000
  AND coalesce(length(service), 0) <= 200
  AND coalesce(length(address_line_1), 0) <= 300
  AND coalesce(length(address_line_2), 0) <= 300
  AND coalesce(length(city), 0) <= 120
  AND coalesce(length(postcode), 0) <= 20
  AND coalesce(length(country), 0) <= 100
  AND coalesce(length(discount_code), 0) <= 50
);

DROP POLICY IF EXISTS "Anyone attach files" ON public.quote_files;
CREATE POLICY "Anyone attach files" ON public.quote_files FOR INSERT TO anon, authenticated
WITH CHECK (
  public.quote_accepts_files(quote_id)
  AND file_path LIKE quote_id::text || '/%'
  AND length(file_path) <= 500
  AND length(file_name) BETWEEN 1 AND 255
  AND file_size > 0 AND file_size <= 52428800
);

DROP POLICY IF EXISTS "Anyone can log an email click" ON public.email_clicks;
CREATE POLICY "Anyone can log an email click" ON public.email_clicks FOR INSERT TO anon, authenticated
WITH CHECK (
  coalesce(length(email_address), 0) <= 320
  AND coalesce(length(page_path), 0) <= 500
  AND coalesce(length(user_agent), 0) <= 1000
);

DROP POLICY IF EXISTS "Anyone can log a phone click" ON public.phone_clicks;
CREATE POLICY "Anyone can log a phone click" ON public.phone_clicks FOR INSERT TO anon, authenticated
WITH CHECK (
  coalesce(length(page_path), 0) <= 500
  AND coalesce(length(user_agent), 0) <= 1000
);