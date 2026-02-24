import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ConciergeChat } from '@/components/ConciergeChat';
import logo from '@/assets/eve-blue-logo.jpeg';
import { useAuth } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={handleClick}
        className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
        size="icon"
      >
        <div className="relative">
          <div className="absolute inset-0 blur-lg bg-primary/50 rounded-full" />
          <MessageCircle className="relative w-6 h-6" />
        </div>
      </Button>

      {/* Chat Sheet/Drawer */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
          side="right" 
          className="w-full sm:w-[440px] p-0 flex flex-col bg-background border-l border-primary/10"
        >
          <SheetHeader className="relative px-4 py-4 border-b border-primary/10 bg-card/80 backdrop-blur">
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-primary/10 rounded-full" />
                <img 
                  src={logo} 
                  alt="EVE BLUE" 
                  className="relative w-24 h-auto rounded object-contain"
                />
              </div>
              <div className="flex-1">
                <SheetTitle className="text-primary text-sm font-medium tracking-tight">
                  EVE BLUE
                </SheetTitle>
                <p className="text-xs text-muted-foreground">Concierge. It. Done.</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-primary"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </SheetHeader>
          
          <div className="flex-1 overflow-hidden">
            <ConciergeChat />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
