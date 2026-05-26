-- Recreate quotes anonymous-by-email policy safely
DROP POLICY IF EXISTS "Quotes select anonymous by email" ON public.quotes;
CREATE POLICY "Quotes select anonymous by email"
ON public.quotes
FOR SELECT
USING (
  user_id IS NULL
  AND ((current_setting('request.jwt.claims', true))::json ->> 'email') IS NOT NULL
  AND email = ((current_setting('request.jwt.claims', true))::json ->> 'email')
);

-- Ensure email index exists for performance
CREATE INDEX IF NOT EXISTS idx_quotes_email ON public.quotes(email);