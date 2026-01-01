import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useConciergeChat } from '@/hooks/useConciergeChat';
import { Send, User, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';

export function ConciergeChat() {
  const { messages, isLoading, error, sendMessage, clearMessages } = useConciergeChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
    <div className="flex flex-col h-full bg-background">
      {/* Messages Area */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12 space-y-8">
              <div className="inline-flex items-center justify-center w-20 h-20">
                <img src={logo} alt="AI My Dubai" className="w-20 h-20 object-contain" />
              </div>
              <div className="space-y-3">
                <p className="text-lg text-foreground font-medium">
                  How can I handle Dubai for you today?
                </p>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Dining, nightlife, yachts, transport, events — tell me what you need.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto pt-4">
                {quickPrompts.map((prompt, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="text-sm h-auto py-3 px-4 text-left justify-start border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-luxury"
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
                <div className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden">
                  <img src={logo} alt="AI" className="w-8 h-8 object-contain" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-xl px-4 py-3",
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border/50'
                )}
              >
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.content}
                </p>
              </div>
              {msg.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden">
                <img src={logo} alt="AI" className="w-8 h-8 object-contain opacity-70" />
              </div>
              <div className="bg-card border border-border/50 rounded-xl px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse" />
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-sm text-center border border-destructive/20">
              {error}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border/50 p-4 bg-card/50 backdrop-blur">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            {messages.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearMessages}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground"
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
              className="flex-1 bg-background border-border/50 focus:border-primary/50"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
