import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ConciergeChat } from '@/components/ConciergeChat';
import { BottomNav } from '@/components/BottomNav';
import logo from '@/assets/eve-blue-logo-white.gif';
import { GoldWaveAccent } from '@/components/LuxuryElements';
import { INTENT_MESSAGES } from '@/lib/constants';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Plus, ChevronLeft } from 'lucide-react';
import { format } from 'date-fns';

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export default function ConciergePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const intentParam = searchParams.get('intent');
  const supplierParam = searchParams.get('supplier');
  const conversationParam = searchParams.get('conversation');
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(conversationParam);
  
  // Determine initial message based on params
  const getInitialMessage = (): string | undefined => {
    if (intentParam && INTENT_MESSAGES[intentParam]) {
      return INTENT_MESSAGES[intentParam];
    }
    if (supplierParam) {
      return `I'd like to book at ${supplierParam}.`;
    }
    return undefined;
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const { data } = await supabase
      .from('conversations')
      .select('id, title, created_at, updated_at')
      .eq('user_id', session.user.id)
      .order('updated_at', { ascending: false });
    
    if (data) setConversations(data);
  };

  const handleSelectConversation = (convId: string) => {
    setSelectedConversation(convId);
    setShowHistory(false);
  };

  const handleNewChat = () => {
    setSelectedConversation(null);
    setShowHistory(false);
    // Clear URL params
    navigate('/concierge', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with luxury styling */}
      <header className="relative bg-card/80 backdrop-blur border-b border-primary/10 px-4 py-4">
        <GoldWaveAccent position="bottom" />
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          {showHistory ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowHistory(false)}
              className="text-muted-foreground hover:text-primary"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          ) : (
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-primary/10 rounded-full" />
              <img 
                src={logo} 
                alt="EVE BLUE" 
                className="relative w-24 h-auto rounded object-contain"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-base font-medium text-primary tracking-tight">
              {showHistory ? 'Chat History' : 'EVE BLUE'}
            </h1>
            <p className="text-xs text-muted-foreground">
              {showHistory ? 'View past conversations' : 'Concierge. It. Done.'}
            </p>
          </div>
          {!showHistory && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHistory(true)}
                className="text-muted-foreground hover:text-primary"
                title="Chat History"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNewChat}
                className="text-muted-foreground hover:text-primary"
                title="New Chat"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {showHistory ? (
          <ScrollArea className="h-full">
            <div className="max-w-2xl mx-auto p-4 space-y-2">
              <Button
                onClick={handleNewChat}
                className="w-full mb-4 bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Start New Chat
              </Button>
              
              {conversations.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No conversations yet</p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv.id)}
                    className="w-full p-4 rounded-xl border border-primary/10 bg-card/50 hover:bg-card hover:border-primary/20 transition-all flex items-center gap-3 group text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{conv.title || 'Untitled Chat'}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(conv.updated_at), 'MMM d, yyyy · h:mm a')}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        ) : (
          <ConciergeChat 
            initialMessage={getInitialMessage()} 
            conversationId={selectedConversation || undefined}
          />
        )}
      </main>

      <BottomNav />
    </div>
  );
}
