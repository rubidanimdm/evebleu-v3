import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { openWhatsAppConcierge } from '@/lib/whatsapp';

export function FloatingChatButton() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    openWhatsAppConcierge();
  };
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
    </>
  );
}
