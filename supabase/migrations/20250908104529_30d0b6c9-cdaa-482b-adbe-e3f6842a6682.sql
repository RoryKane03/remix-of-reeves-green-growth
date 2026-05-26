-- Phase 1: Critical Data Protection
-- 1) Add user_id to quotes (nullable), FK to auth.users, and index
ALTER TABLE public.quotes
  ADD COLUMN IF NOT EXISTS user_id uuid;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'quotes_user_id_fkey'
  ) THEN
    ALTER TABLE public.quotes
      ADD CONSTRAINT quotes_user_id_fkey
      FOREIGN KEY (user_id)
      REFERENCES auth.users(id)
      ON DELETE SET NULL;
  END IF;
END$$;

CREATE INDEX IF NOT EXISTS idx_quotes_user_id ON public.quotes(user_id);

-- 2) Harden RLS policies on quotes: remove email-claim based policy and use user_id or admin
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Quotes select unified" ON public.quotes;

CREATE POLICY "Quotes select by admin or owner"
ON public.quotes
FOR SELECT
USING (
  has_role(auth.uid(), 'admin'::app_role)
  OR (auth.uid() IS NOT NULL AND user_id = auth.uid())
);

-- Keep existing insert openness for public submissions
DROP POLICY IF EXISTS "Anyone can submit quotes" ON public.quotes;
CREATE POLICY "Anyone can submit quotes"
ON public.quotes
FOR INSERT
WITH CHECK (true);

-- 3) Enable rate limit enforcement via trigger (use v2 function)
DROP TRIGGER IF EXISTS trg_enforce_quote_rate_limit ON public.quotes;
CREATE TRIGGER trg_enforce_quote_rate_limit
BEFORE INSERT ON public.quotes
FOR EACH ROW
EXECUTE FUNCTION public.enforce_quote_rate_limit_v2();

-- 4) Ensure audit logging triggers exist for quotes and quote_files
DROP TRIGGER IF EXISTS trg_quotes_insert_audit ON public.quotes;
CREATE TRIGGER trg_quotes_insert_audit
AFTER INSERT ON public.quotes
FOR EACH ROW EXECUTE FUNCTION public.log_quote_insert();

DROP TRIGGER IF EXISTS trg_quote_files_insert_audit ON public.quote_files;
CREATE TRIGGER trg_quote_files_insert_audit
AFTER INSERT ON public.quote_files
FOR EACH ROW EXECUTE FUNCTION public.log_quote_file_insert();