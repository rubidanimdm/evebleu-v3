import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useConciergeChat } from '@/hooks/useConciergeChat';
import { Send, User, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';
import { GoldParticles, GoldDivider } from '@/components/LuxuryElements';

interface ConciergeChatProps {
  initialMessage?: string;
}

export function ConciergeChat({ initialMessage }: ConciergeChatProps) {
  const { messages, isLoading, error, sendMessage, clearMessages } = useConciergeChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasAutoSent, setHasAutoSent] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-send initial message when coming from Home buttons
  useEffect(() => {
    if (initialMessage && !hasAutoSent && messages.length === 0) {
      setHasAutoSent(true);
      sendMessage(initialMessage);
    }
  }, [initialMessage, hasAutoSent, messages.length, sendMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput('');
  };

  const quickPrompts = [
    "Private dinner for two tonight",
    "VIP table at the best nightclub",
    "Yacht for a sunset cruise",
    "Luxury transport to an event",
  ];

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Messages Area */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="relative text-center py-16 space-y-8">
              <GoldParticles count={15} />
              
              {/* Logo with glow */}
              <div className="relative inline-block">
                <div className="absolute inset-0 blur-2xl bg-primary/15 rounded-full scale-150" />
                <img src={logo} alt="AI My Dubai" className="relative w-24 h-24 object-contain" />
              </div>
              
              <div className="space-y-4">
                <p className="text-xl text-primary font-medium">
                  How can I handle Dubai for you?
                </p>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Dining. Nightlife. Yachts. Transport. Experiences.
                  <br />
                  Tell me what you need.
                </p>
              </div>

              <GoldDivider />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto pt-2">
                {quickPrompts.map((prompt, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="text-sm h-auto py-4 px-5 text-left justify-start border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 rounded-xl"
                    onClick={() => {
                      setInput(prompt);
                      inputRef.current?.focus();
                    }}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-3",
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 w-9 h-9 rounded-xl overflow-hidden border border-primary/20 bg-card/50">
                  <img src={logo} alt="AI" className="w-9 h-9 object-contain p-1" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-xl px-4 py-3",
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card/80 border border-primary/10'
                )}
              >
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.content}
                </p>
              </div>
              {msg.role === 'user' && (
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl overflow-hidden border border-primary/20 bg-card/50">
                <img src={logo} alt="AI" className="w-9 h-9 object-contain p-1 opacity-70" />
              </div>
              <div className="bg-card/80 border border-primary/10 rounded-xl px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 text-destructive rounded-xl p-4 text-sm text-center border border-destructive/20">
              {error}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area with luxury styling */}
      <div className="relative border-t border-primary/10 p-4 bg-card/50 backdrop-blur">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3">
            {messages.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearMessages}
                className="flex-shrink-0 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl"
                title="Start new conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell me what you need..."
              className="flex-1 h-12 bg-background/50 border-primary/20 focus:border-primary/50 rounded-xl"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 h-12 px-5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
