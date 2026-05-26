-- Security hardening for quotes and quote_files
-- 1) Helpful indexes for rate limiting and lookups
CREATE INDEX IF NOT EXISTS idx_quotes_email_created_at ON public.quotes (email, created_at);
CREATE INDEX IF NOT EXISTS idx_quotes_phone_created_at ON public.quotes (phone, created_at);
CREATE INDEX IF NOT EXISTS idx_quote_files_quote_id ON public.quote_files (quote_id);

-- 2) Attach rate limiting trigger to quotes (uses existing function enforce_quote_rate_limit_v2)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_enforce_quote_rate_limit_v2'
  ) THEN
    CREATE TRIGGER trg_enforce_quote_rate_limit_v2
    BEFORE INSERT ON public.quotes
    FOR EACH ROW
    EXECUTE FUNCTION public.enforce_quote_rate_limit_v2();
  END IF;
END;
$$;

-- 3) Attach auditing trigger for quote inserts (uses existing function log_quote_insert)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_log_quote_insert'
  ) THEN
    CREATE TRIGGER trg_log_quote_insert
    AFTER INSERT ON public.quotes
    FOR EACH ROW
    EXECUTE FUNCTION public.log_quote_insert();
  END IF;
END;
$$;

-- 4) Attach auditing trigger for quote file inserts (uses existing function log_quote_file_insert)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_log_quote_file_insert'
  ) THEN
    CREATE TRIGGER trg_log_quote_file_insert
    AFTER INSERT ON public.quote_files
    FOR EACH ROW
    EXECUTE FUNCTION public.log_quote_file_insert();
  END IF;
END;
$$;