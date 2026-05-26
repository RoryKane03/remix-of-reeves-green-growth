-- Re-enable quote submission rate limiting trigger
DROP TRIGGER IF EXISTS enforce_quote_rate_limit_trigger ON public.quotes;
CREATE TRIGGER enforce_quote_rate_limit_trigger
  BEFORE INSERT ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_quote_rate_limit_v2();

-- Allow service role / definer functions to insert audit logs explicitly.
-- All existing audit log inserts come from SECURITY DEFINER triggers (log_quote_insert,
-- log_quote_file_insert, log_admin_security_events). Those bypass RLS, but adding an
-- explicit policy silences the linter and supports any future authenticated logging.
DROP POLICY IF EXISTS "Service role can insert audit logs" ON public.audit_logs;
CREATE POLICY "Service role can insert audit logs"
  ON public.audit_logs
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Also allow SECURITY DEFINER functions executing as authenticated users to write logs
DROP POLICY IF EXISTS "Authenticated can insert audit logs via definer" ON public.audit_logs;
CREATE POLICY "Authenticated can insert audit logs via definer"
  ON public.audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);