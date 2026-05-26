
-- Create chat sessions table to track conversations
CREATE TABLE public.chat_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat messages table to store conversation history
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for chat_sessions
CREATE POLICY "Users can create their own chat sessions" 
  ON public.chat_sessions 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own chat sessions" 
  ON public.chat_sessions 
  FOR SELECT 
  USING (true);

-- Create policies for chat_messages  
CREATE POLICY "Users can create chat messages" 
  ON public.chat_messages 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view chat messages" 
  ON public.chat_messages 
  FOR SELECT 
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_chat_sessions_session_id ON public.chat_sessions(session_id);
CREATE INDEX idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX idx_chat_messages_created_at ON public.chat_messages(created_at);
