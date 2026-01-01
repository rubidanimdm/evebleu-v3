import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, User, X, CheckCircle, Search } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Conversation {
  id: string;
  user_id: string;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
  customer?: {
    full_name: string;
    email: string;
  };
  unread_count?: number;
  last_message?: string;
}

interface Message {
  id: string;
  conversation_id: string;
  user_id: string;
  role: string;
  sender_type: string;
  sender_id: string | null;
  content: string;
  created_at: string;
}

export function AdminInbox() {
  const { user } = useAuth();
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadConversations();
    
    // Set up realtime subscription for new messages
    const channel = supabase
      .channel('admin-inbox')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
      }, () => {
        loadConversations();
        if (selectedConv) loadMessages(selectedConv.id);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadConversations = async () => {
    setIsLoading(true);
    try {
      // Fetch HUMAN conversations
      const { data: convData, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('type', 'HUMAN')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Enrich with customer info and last message
      const enrichedConvs = await Promise.all(
        (convData || []).map(async (conv) => {
          // Get customer profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', conv.user_id)
            .single();

          // Get last message
          const { data: lastMsg } = await supabase
            .from('chat_messages')
            .select('content, sender_type')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          return {
            ...conv,
            customer: profile || { full_name: 'Unknown', email: '' },
            last_message: lastMsg?.content?.slice(0, 50) + (lastMsg?.content?.length > 50 ? '...' : '') || '',
          };
        })
      );

      setConversations(enrichedConvs);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      return;
    }

    setMessages(data || []);
  };

  const handleSelectConversation = async (conv: Conversation) => {
    setSelectedConv(conv);
    await loadMessages(conv.id);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConv || !user) return;
    setIsSending(true);

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: selectedConv.id,
          user_id: selectedConv.user_id, // Link to customer's user_id
          role: 'assistant', // Show as assistant in user's chat
          sender_type: 'ADMIN',
          sender_id: user.id,
          content: newMessage.trim(),
        });

      if (error) throw error;

      // Update conversation updated_at
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', selectedConv.id);

      setNewMessage('');
      await loadMessages(selectedConv.id);
      await loadConversations();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({ title: 'Failed to send message', variant: 'destructive' });
    } finally {
      setIsSending(false);
    }
  };

  const handleCloseConversation = async () => {
    if (!selectedConv) return;

    try {
      await supabase
        .from('conversations')
        .update({ status: 'CLOSED' })
        .eq('id', selectedConv.id);

      toast({ title: 'Conversation closed' });
      setSelectedConv(null);
      await loadConversations();
    } catch (error) {
      toast({ title: 'Failed to close conversation', variant: 'destructive' });
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.customer?.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.customer?.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openConversations = filteredConversations.filter(c => c.status === 'OPEN');
  const closedConversations = filteredConversations.filter(c => c.status === 'CLOSED');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
      {/* Conversations List */}
      <Card className="bg-card/50 border-primary/10 flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Human Chats
            {openConversations.length > 0 && (
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                {openConversations.length}
              </Badge>
            )}
          </CardTitle>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-background/50 border-primary/20"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-2">
          <ScrollArea className="h-full">
            <div className="space-y-1">
              {openConversations.length > 0 && (
                <>
                  <p className="text-xs text-muted-foreground px-2 py-1">Open</p>
                  {openConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => handleSelectConversation(conv)}
                      className={cn(
                        "w-full p-3 rounded-lg text-left transition-colors",
                        selectedConv?.id === conv.id 
                          ? "bg-primary/10 border border-primary/30" 
                          : "hover:bg-card border border-transparent"
                      )}
                    >
                      <p className="font-medium text-sm truncate">{conv.customer?.full_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{conv.last_message || 'No messages'}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(conv.updated_at), 'MMM d, h:mm a')}
                      </p>
                    </button>
                  ))}
                </>
              )}
              {closedConversations.length > 0 && (
                <>
                  <p className="text-xs text-muted-foreground px-2 py-1 mt-4">Closed</p>
                  {closedConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => handleSelectConversation(conv)}
                      className={cn(
                        "w-full p-3 rounded-lg text-left transition-colors opacity-60",
                        selectedConv?.id === conv.id 
                          ? "bg-primary/10 border border-primary/30" 
                          : "hover:bg-card border border-transparent"
                      )}
                    >
                      <p className="font-medium text-sm truncate">{conv.customer?.full_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{conv.last_message || 'No messages'}</p>
                    </button>
                  ))}
                </>
              )}
              {filteredConversations.length === 0 && (
                <p className="text-center text-muted-foreground py-8 text-sm">
                  No human conversations yet
                </p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat View */}
      <Card className="md:col-span-2 bg-card/50 border-primary/10 flex flex-col">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <CardHeader className="border-b border-primary/10 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-primary text-sm">{selectedConv.customer?.full_name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{selectedConv.customer?.email}</p>
                </div>
                <div className="flex gap-2">
                  {selectedConv.status === 'OPEN' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCloseConversation}
                      className="border-primary/20"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Close
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedConv(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea ref={scrollRef} className="h-[400px] p-4">
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex gap-2",
                        msg.sender_type === 'ADMIN' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {msg.sender_type !== 'ADMIN' && (
                        <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[70%] rounded-xl px-3 py-2",
                          msg.sender_type === 'ADMIN'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card border border-primary/10'
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        <p className={cn(
                          "text-xs mt-1",
                          msg.sender_type === 'ADMIN' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        )}>
                          {format(new Date(msg.created_at), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Input */}
            {selectedConv.status === 'OPEN' && (
              <div className="p-3 border-t border-primary/10">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your reply..."
                    className="bg-background/50 border-primary/20"
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!newMessage.trim() || isSending}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Select a conversation to start chatting</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
