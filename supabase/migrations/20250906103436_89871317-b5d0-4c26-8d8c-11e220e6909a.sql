-- Tighten RLS for chat_sessions and clean up

-- 1) Replace INSERT policy to require authenticated users (or admin)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'chat_sessions' AND policyname = 'Users can insert own chat sessions'
  ) THEN
    DROP POLICY "Users can insert own chat sessions" ON public.chat_sessions;
  END IF;
END;
$$;

CREATE POLICY "Users can insert own chat sessions"
ON public.chat_sessions
FOR INSERT
TO public
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR (user_id = auth.uid())
);

-- 2) One-time cleanup: remove anonymous/orphaned sessions older than 30 days
DELETE FROM public.chat_sessions
WHERE user_id IS NULL
  AND created_at < now() - interval '30 days';

-- 3) Deduplicate chat_sessions by session_id, then enforce uniqueness
WITH dup AS (
  SELECT session_id, MIN(id) AS keep_id
  FROM public.chat_sessions
  GROUP BY session_id
  HAVING COUNT(*) > 1
)
DELETE FROM public.chat_sessions cs
USING dup
WHERE cs.session_id = dup.session_id
  AND cs.id <> dup.keep_id;

-- Enforce unique session_id to prevent collisions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname='public' AND tablename='chat_sessions' AND indexname='chat_sessions_session_id_unique'
  ) THEN
    CREATE UNIQUE INDEX chat_sessions_session_id_unique ON public.chat_sessions (session_id);
  END IF;
END; 
$$;