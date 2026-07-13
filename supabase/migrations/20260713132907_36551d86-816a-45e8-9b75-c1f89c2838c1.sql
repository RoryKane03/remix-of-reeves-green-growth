CREATE TABLE public.email_clicks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email_address text,
  page_path text,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.email_clicks TO anon, authenticated;
GRANT SELECT ON public.email_clicks TO authenticated;
GRANT ALL ON public.email_clicks TO service_role;

ALTER TABLE public.email_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log an email click"
  ON public.email_clicks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read email clicks"
  ON public.email_clicks FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));