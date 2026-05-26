-- Safer approach: First check what policies exist and drop/recreate all chat policies

-- Drop all existing chat policies by name
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    -- Drop all policies on chat_sessions
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'chat_sessions' AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.chat_sessions', policy_record.policyname);
    END LOOP;
    
    -- Drop all policies on chat_messages
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'chat_messages' AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.chat_messages', policy_record.policyname);
    END LOOP;
END $$;

-- Create secure policies for chat_sessions
CREATE POLICY "Users can view own chat sessions or admins all"
ON public.chat_sessions
FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin') OR user_id = auth.uid()
);

CREATE POLICY "Users can insert own chat sessions"
ON public.chat_sessions
FOR INSERT
WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR user_id = auth.uid() OR user_id IS NULL
);

-- Create secure policies for chat_messages  
CREATE POLICY "Users can view own chat messages or admins all"
ON public.chat_messages
FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin') OR EXISTS (
    SELECT 1 FROM public.chat_sessions s
    WHERE s.id = chat_messages.session_id AND s.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert messages for their sessions"
ON public.chat_messages
FOR INSERT
WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR EXISTS (
    SELECT 1 FROM public.chat_sessions s
    WHERE s.id = chat_messages.session_id AND s.user_id = auth.uid()
  )
);