import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Message = { role: 'user' | 'assistant'; content: string };

export function useHumanChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Load existing human conversation on mount
  useEffect(() => {
    const loadExistingConversation = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      // Check for existing open human conversation
      const { data: existingConvs } = await supabase
        .from('conversations')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('type', 'HUMAN')
        .eq('status', 'OPEN')
        .order('created_at', { ascending: false })
        .limit(1);

      if (existingConvs && existingConvs.length > 0) {
        setConversationId(existingConvs[0].id);
        // Load existing messages
        const { data: existingMsgs } = await supabase
          .from('chat_messages')
          .select('role, content, sender_type')
          .eq('conversation_id', existingConvs[0].id)
          .order('created_at', { ascending: true });
        
        if (existingMsgs) {
          setMessages(existingMsgs.map(m => ({ 
            role: m.sender_type === 'USER' ? 'user' as const : 'assistant' as const, 
            content: m.content 
          })));
        }
      }
    };

    loadExistingConversation();
  }, []);

  // Set up realtime subscription for new messages
  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`human-chat-${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${conversationId}`,
      }, (payload) => {
        const newMsg = payload.new as any;
        // Only add if it's an admin message (we already add user messages locally)
        if (newMsg.sender_type === 'ADMIN') {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: newMsg.content,
          }]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  const createConversation = async (userId: string): Promise<string> => {
    const { data, error } = await supabase
      .from('conversations')
      .insert({ user_id: userId, title: 'Human Chat', type: 'HUMAN', status: 'OPEN' })
      .select('id')
      .single();
    
    if (error) throw error;
    return data.id;
  };

  const saveMessage = async (convId: string, userId: string, content: string, senderType: string) => {
    await supabase.from('chat_messages').insert({
      conversation_id: convId,
      user_id: userId,
      role: senderType === 'USER' ? 'user' : 'assistant',
      sender_type: senderType,
      content
    });
  };

  const sendMessage = useCallback(async (input: string) => {
    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Please sign in to chat');
      
      // Create conversation if needed
      let convId = conversationId;
      if (!convId) {
        convId = await createConversation(session.user.id);
        setConversationId(convId);
      }

      // Save user message
      await saveMessage(convId, session.user.id, input, 'USER');
      
      // Update conversation timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', convId);

      // Add a waiting message for human chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Thanks for your message! Our concierge team has been notified and will respond shortly. In the meantime, our AI concierge is available if you need immediate assistance." 
      }]);

    } catch (e) {
      console.error('Human chat error:', e);
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  const clearMessages = useCallback(async () => {
    // Close current conversation
    if (conversationId) {
      await supabase
        .from('conversations')
        .update({ status: 'CLOSED' })
        .eq('id', conversationId);
    }
    setMessages([]);
    setConversationId(null);
    setError(null);
  }, [conversationId]);

  const loadConversation = useCallback(async (convId: string) => {
    const { data: msgs } = await supabase
      .from('chat_messages')
      .select('role, content, sender_type')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true });
    
    if (msgs) {
      setMessages(msgs.map(m => ({ 
        role: m.sender_type === 'USER' ? 'user' as const : 'assistant' as const, 
        content: m.content 
      })));
      setConversationId(convId);
    }
  }, []);

  return { messages, isLoading, error, sendMessage, clearMessages, conversationId, loadConversation };
}
