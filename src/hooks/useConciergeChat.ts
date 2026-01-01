import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Message = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/concierge-chat`;

export function useConciergeChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Load or create conversation on mount
  useEffect(() => {
    const loadOrCreateConversation = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      // Check for existing active conversation from today
      const today = new Date().toISOString().split('T')[0];
      const { data: existingConvs } = await supabase
        .from('conversations')
        .select('id, created_at')
        .eq('user_id', session.user.id)
        .eq('is_archived', false)
        .gte('created_at', `${today}T00:00:00`)
        .order('created_at', { ascending: false })
        .limit(1);

      if (existingConvs && existingConvs.length > 0) {
        setConversationId(existingConvs[0].id);
        // Load existing messages
        const { data: existingMsgs } = await supabase
          .from('chat_messages')
          .select('role, content')
          .eq('conversation_id', existingConvs[0].id)
          .order('created_at', { ascending: true });
        
        if (existingMsgs) {
          setMessages(existingMsgs.map(m => ({ 
            role: m.role as 'user' | 'assistant', 
            content: m.content 
          })));
        }
      }
    };

    loadOrCreateConversation();
  }, []);

  const createConversation = async (userId: string): Promise<string> => {
    const { data, error } = await supabase
      .from('conversations')
      .insert({ user_id: userId, title: 'New Chat' })
      .select('id')
      .single();
    
    if (error) throw error;
    return data.id;
  };

  const saveMessage = async (convId: string, userId: string, role: string, content: string) => {
    await supabase.from('chat_messages').insert({
      conversation_id: convId,
      user_id: userId,
      role,
      content
    });
  };

  const sendMessage = useCallback(async (input: string) => {
    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    let assistantSoFar = '';
    
    const upsertAssistant = (nextChunk: string) => {
      assistantSoFar += nextChunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: 'assistant', content: assistantSoFar }];
      });
    };

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Please sign in to use the concierge');
      
      // Create conversation if needed
      let convId = conversationId;
      if (!convId) {
        convId = await createConversation(session.user.id);
        setConversationId(convId);
      }

      // Save user message
      await saveMessage(convId, session.user.id, 'user', input);
      
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ 
          messages: [...messages, userMsg],
          userId: session.user.id,
          conversationId: convId
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to connect to concierge');
      }

      if (!resp.body) throw new Error('No response stream');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch { /* ignore */ }
        }
      }

      // Save assistant response
      if (assistantSoFar && convId) {
        await saveMessage(convId, session.user.id, 'assistant', assistantSoFar);
        
        // Update conversation title if first message
        if (messages.length === 0) {
          const title = input.length > 50 ? input.slice(0, 50) + '...' : input;
          await supabase
            .from('conversations')
            .update({ title })
            .eq('id', convId);
        }
      }
    } catch (e) {
      console.error('Chat error:', e);
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [messages, conversationId]);

  const clearMessages = useCallback(async () => {
    // Archive current conversation
    if (conversationId) {
      await supabase
        .from('conversations')
        .update({ is_archived: true })
        .eq('id', conversationId);
    }
    setMessages([]);
    setConversationId(null);
    setError(null);
  }, [conversationId]);

  const loadConversation = useCallback(async (convId: string) => {
    const { data: msgs } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true });
    
    if (msgs) {
      setMessages(msgs.map(m => ({ 
        role: m.role as 'user' | 'assistant', 
        content: m.content 
      })));
      setConversationId(convId);
    }
  }, []);

  return { messages, isLoading, error, sendMessage, clearMessages, conversationId, loadConversation };
}
