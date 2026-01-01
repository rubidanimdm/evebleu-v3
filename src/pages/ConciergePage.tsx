import { ConciergeChat } from '@/components/ConciergeChat';
import { BottomNav } from '@/components/BottomNav';
import logo from '@/assets/logo.png';

export default function ConciergePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur border-b border-border/50 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <img 
            src={logo} 
            alt="AI My Dubai" 
            className="w-10 h-10 rounded-lg object-contain"
          />
          <div>
            <h1 className="text-base font-medium text-foreground tracking-tight">AI My Dubai</h1>
            <p className="text-xs text-muted-foreground">Concierge. It. Done.</p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 pb-20">
        <ConciergeChat />
      </main>

      <BottomNav />
    </div>
  );
}
