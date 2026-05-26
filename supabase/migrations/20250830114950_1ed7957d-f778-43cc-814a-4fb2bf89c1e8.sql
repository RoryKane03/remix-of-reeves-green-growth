-- Tighten RLS for chat tables: restrict access to owners and admins

-- 1) Drop existing overly permissive policies
DROP POLICY IF EXISTS "Users can create chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can view chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can create their own chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can view their own chat sessions" ON public.chat_sessions;

-- 2) Create secure policies for chat_sessions
-- Allow users to view only their own sessions; admins can view all
CREATE POLICY "Users can view own chat sessions or admins all"
ON public.chat_sessions
FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin') OR user_id = auth.uid()
);

-- Allow users to create sessions for themselves (or anonymous sessions); admins allowed
CREATE POLICY "Users can insert own chat sessions"
ON public.chat_sessions
FOR INSERT
WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR user_id = auth.uid() OR user_id IS NULL
);

-- 3) Create secure policies for chat_messages
-- Users can view messages only for sessions they own; admins can view all
CREATE POLICY "Users can view own chat messages or admins all"
ON public.chat_messages
FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin') OR EXISTS (
    SELECT 1 FROM public.chat_sessions s
    WHERE s.id = chat_messages.session_id AND s.user_id = auth.uid()
  )
);

-- Users can insert messages only for sessions they own; admins can insert any
CREATE POLICY "Users can insert messages for their sessions"
ON public.chat_messages
FOR INSERT
WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR EXISTS (
    SELECT 1 FROM public.chat_sessions s
    WHERE s.id = chat_messages.session_id AND s.user_id = auth.uid()
  )
);

-- Note: UPDATE/DELETE remain restricted (no policies) which is safer by default.
