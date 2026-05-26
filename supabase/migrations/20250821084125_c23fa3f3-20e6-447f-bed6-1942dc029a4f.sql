
-- 1) Index housekeeping: drop potentially unused indexes (safe no-ops if missing)
DROP INDEX IF EXISTS public.audit_logs_entity_idx;
DROP INDEX IF EXISTS public.quotes_email_created_at_idx;
DROP INDEX IF EXISTS public.quotes_phone_created_at_idx;

-- 2) Create performance-critical indexes (safe if already present)
CREATE INDEX IF NOT EXISTS idx_quote_files_quote_id ON public.quote_files(quote_id);
CREATE INDEX IF NOT EXISTS idx_security_events_user_id ON public.security_events(user_id);

-- 3) RLS policy consolidation (quotes): unify admin and email-based access into a single policy
--    Existing policies (will be replaced):
--      "Admins can select all quotes" (SELECT)
--      "Users can view quotes with email verification" (SELECT)
DROP POLICY IF EXISTS "Admins can select all quotes" ON public.quotes;
DROP POLICY IF EXISTS "Users can view quotes with email verification" ON public.quotes;

CREATE POLICY "Quotes select unified"
ON public.quotes
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::public.app_role)
  OR email = ((current_setting('request.jwt.claims', true))::json ->> 'email')
);

-- 4) RLS policy consolidation (quote_files): unify admin and owner-by-email into a single policy
--    Existing policies (will be replaced):
--      "Admins can select all quote files" (SELECT)
--      "Users can view files for their quotes" (SELECT)
DROP POLICY IF EXISTS "Admins can select all quote files" ON public.quote_files;
DROP POLICY IF EXISTS "Users can view files for their quotes" ON public.quote_files;

CREATE POLICY "Quote files select unified"
ON public.quote_files
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::public.app_role)
  OR EXISTS (
    SELECT 1
    FROM public.quotes q
    WHERE q.id = quote_files.quote_id
      AND q.email = ((current_setting('request.jwt.claims', true))::json ->> 'email')
  )
);

-- NOTE:
-- - Other policies (e.g., quotes INSERT open to all, quote_files INSERT for authenticated, audit_logs and user_roles policies)
--   are left as-is because they are already minimal and secure.
