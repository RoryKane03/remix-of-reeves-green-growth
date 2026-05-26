
-- 1. Fix storage SELECT: remove anonymous-by-recent-quote branch
DROP POLICY IF EXISTS "Allow reading quote photos" ON storage.objects;

CREATE POLICY "Allow reading quote photos"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'quote-photos'
  AND (
    has_role(auth.uid(), 'admin'::app_role)
    OR (
      auth.uid() IS NOT NULL
      AND (storage.foldername(name))[1] IN (
        SELECT (quotes.id)::text FROM quotes WHERE quotes.user_id = auth.uid()
      )
    )
    OR (
      auth.uid() IS NOT NULL
      AND ((current_setting('request.jwt.claims', true))::json ->> 'email') IS NOT NULL
      AND (storage.foldername(name))[1] IN (
        SELECT (quotes.id)::text FROM quotes
        WHERE quotes.email = ((current_setting('request.jwt.claims', true))::json ->> 'email')
      )
    )
  )
);

-- 2. Fix storage INSERT: require email JWT match for anonymous-recent uploads, or auth user matches
DROP POLICY IF EXISTS "Enable anonymous photo uploads for recent quotes" ON storage.objects;

CREATE POLICY "Restricted photo uploads for recent quotes"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'quote-photos'
  AND (
    has_role(auth.uid(), 'admin'::app_role)
    OR (
      auth.uid() IS NOT NULL
      AND (storage.foldername(name))[1] IN (
        SELECT (quotes.id)::text FROM quotes
        WHERE quotes.created_at > now() - interval '2 hours'
          AND quotes.user_id = auth.uid()
      )
    )
    OR (
      auth.uid() IS NOT NULL
      AND ((current_setting('request.jwt.claims', true))::json ->> 'email') IS NOT NULL
      AND (storage.foldername(name))[1] IN (
        SELECT (quotes.id)::text FROM quotes
        WHERE quotes.created_at > now() - interval '2 hours'
          AND quotes.email = ((current_setting('request.jwt.claims', true))::json ->> 'email')
      )
    )
  )
);

-- 3. Fix quote_files INSERT: require ownership / email JWT match
DROP POLICY IF EXISTS "Restricted quote file upload" ON public.quote_files;

CREATE POLICY "Restricted quote file upload"
ON public.quote_files
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM quotes q
    WHERE q.id = quote_files.quote_id
      AND q.created_at > (now() - interval '1 hour')
      AND (
        (auth.uid() IS NOT NULL AND q.user_id = auth.uid())
        OR (
          auth.uid() IS NOT NULL
          AND ((current_setting('request.jwt.claims', true))::json ->> 'email') IS NOT NULL
          AND q.email = ((current_setting('request.jwt.claims', true))::json ->> 'email')
        )
      )
  )
);

-- 4. Revoke EXECUTE from anon/authenticated on sensitive SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.bootstrap_admin() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.check_submission_rate_limit(text, text) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.log_security_event(text, text, uuid, jsonb) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
-- has_role still needed for authenticated callers via RLS evaluation (RLS uses definer privileges, so revoking from callers is safe);
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
