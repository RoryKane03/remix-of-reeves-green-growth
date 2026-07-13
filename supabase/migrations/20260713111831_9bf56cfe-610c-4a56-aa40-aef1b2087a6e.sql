
CREATE TABLE public.phone_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.phone_clicks TO anon, authenticated;
GRANT SELECT ON public.phone_clicks TO authenticated;
GRANT ALL ON public.phone_clicks TO service_role;

ALTER TABLE public.phone_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log a phone click"
  ON public.phone_clicks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read phone clicks"
  ON public.phone_clicks FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX phone_clicks_created_at_idx ON public.phone_clicks (created_at DESC);
