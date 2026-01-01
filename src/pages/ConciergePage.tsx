import { ConciergeChat } from '@/components/ConciergeChat';
import { BottomNav } from '@/components/BottomNav';

export default function ConciergePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">L</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">LUXE</h1>
            <p className="text-xs text-muted-foreground">Your Personal Concierge</p>
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
