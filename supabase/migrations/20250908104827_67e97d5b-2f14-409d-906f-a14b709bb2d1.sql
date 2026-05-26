-- Harden quotes SELECT policy for anonymous quotes by email match only
CREATE POLICY IF NOT EXISTS "Quotes select anonymous by email"
ON public.quotes
FOR SELECT
USING (
  user_id IS NULL
  AND ((current_setting('request.jwt.claims', true))::json ->> 'email') IS NOT NULL
  AND email = ((current_setting('request.jwt.claims', true))::json ->> 'email')
);

-- Optional performance index for frequent email lookups
CREATE INDEX IF NOT EXISTS idx_quotes_email ON public.quotes(email);