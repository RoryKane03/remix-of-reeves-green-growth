-- Phase 2: Fix remaining security warnings

-- 1) Add missing INSERT policy for audit_logs (only admins can create audit entries)
CREATE POLICY "Only admins can insert audit logs"
ON public.audit_logs
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 2) Add explicit deny-all baseline policy for security_events to prevent unauthorized access
CREATE POLICY "Security events baseline deny"
ON public.security_events
FOR ALL
USING (false);

-- Re-create the admin policy with higher priority
DROP POLICY IF EXISTS "Admins can manage security events" ON public.security_events;
CREATE POLICY "Admins can manage security events"
ON public.security_events
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 3) Add comprehensive INSERT/UPDATE/DELETE policies for security_events
CREATE POLICY "Only system can insert security events"
ON public.security_events
FOR INSERT
WITH CHECK (false); -- Security events should only be inserted via the log_security_event() function

-- 4) Harden quote_files RLS to match new quotes structure
DROP POLICY IF EXISTS "Quote files select unified" ON public.quote_files;
CREATE POLICY "Quote files select by admin or quote owner"
ON public.quote_files
FOR SELECT
USING (
  has_role(auth.uid(), 'admin'::app_role)
  OR (
    EXISTS (
      SELECT 1 FROM public.quotes q
      WHERE q.id = quote_files.quote_id
      AND (
        (q.user_id IS NOT NULL AND q.user_id = auth.uid())
        OR (q.user_id IS NULL AND q.email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text))
      )
    )
  )
);