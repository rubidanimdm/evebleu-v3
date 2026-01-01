import { useSearchParams } from 'react-router-dom';
import { ConciergeChat } from '@/components/ConciergeChat';
import { BottomNav } from '@/components/BottomNav';
import logo from '@/assets/logo.png';
import { GoldWaveAccent } from '@/components/LuxuryElements';
import { INTENT_MESSAGES } from '@/lib/constants';

export default function ConciergePage() {
  const [searchParams] = useSearchParams();
  const intentParam = searchParams.get('intent');
  const supplierParam = searchParams.get('supplier');
  
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with luxury styling */}
      <header className="relative bg-card/80 backdrop-blur border-b border-primary/10 px-4 py-4">
        <GoldWaveAccent position="bottom" />
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 blur-xl bg-primary/10 rounded-full" />
            <img 
              src={logo} 
              alt="AI My Dubai" 
              className="relative w-11 h-11 rounded-lg object-contain"
            />
          </div>
          <div>
            <h1 className="text-base font-medium text-primary tracking-tight">AI MY DUBAI</h1>
            <p className="text-xs text-muted-foreground">Concierge. It. Done.</p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 pb-20">
        <ConciergeChat initialMessage={getInitialMessage()} />
      </main>

      <BottomNav />
    </div>
  );
}
