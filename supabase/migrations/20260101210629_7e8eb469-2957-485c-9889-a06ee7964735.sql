-- Add conversation type and status fields
ALTER TABLE public.conversations 
ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'AI',
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'OPEN';

-- Add sender_type and sender_id to chat_messages
ALTER TABLE public.chat_messages 
ADD COLUMN IF NOT EXISTS sender_type TEXT NOT NULL DEFAULT 'USER',
ADD COLUMN IF NOT EXISTS sender_id UUID;

-- Add last_seen to profiles for activity tracking
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS last_seen TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create admin notes table for per-customer notes
CREATE TABLE IF NOT EXISTS public.customer_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  admin_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on customer_notes
ALTER TABLE public.customer_notes ENABLE ROW LEVEL SECURITY;

-- Only admins can access customer notes
CREATE POLICY "Admins can manage customer notes" 
ON public.customer_notes 
FOR ALL 
USING (is_admin_user(auth.uid()));

-- Update conversations RLS to allow admins to view all HUMAN conversations
CREATE POLICY "Admins can view all human conversations" 
ON public.conversations 
FOR SELECT 
USING (is_admin_user(auth.uid()) AND type = 'HUMAN');

-- Update chat_messages RLS to allow admins to manage messages in human conversations
CREATE POLICY "Admins can view messages in human conversations" 
ON public.chat_messages 
FOR SELECT 
USING (
  is_admin_user(auth.uid()) AND 
  EXISTS (
    SELECT 1 FROM conversations c 
    WHERE c.id = conversation_id AND c.type = 'HUMAN'
  )
);

CREATE POLICY "Admins can insert messages in human conversations" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (
  is_admin_user(auth.uid()) AND 
  sender_type = 'ADMIN'
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_conversations_type ON public.conversations(type);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON public.conversations(status);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sender ON public.chat_messages(sender_type);
CREATE INDEX IF NOT EXISTS idx_customer_notes_customer ON public.customer_notes(customer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_last_seen ON public.profiles(last_seen);

-- Trigger for customer_notes updated_at
CREATE TRIGGER update_customer_notes_updated_at
BEFORE UPDATE ON public.customer_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();