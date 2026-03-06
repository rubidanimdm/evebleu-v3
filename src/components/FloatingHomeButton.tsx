import { useNavigate, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function FloatingHomeButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
      {/* Home button — hidden on home page */}
      {!isHome && (
        <button
          onClick={() => navigate('/')}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            "bg-card/90 backdrop-blur-xl border border-primary/20",
            "text-muted-foreground hover:text-primary hover:border-primary/40",
            "shadow-lg transition-all duration-300 hover:scale-105"
          )}
          aria-label="Home"
        >
          <Home className="w-4 h-4" strokeWidth={1.5} />
        </button>
      )}
      {/* Language switcher — always visible on every page */}
      <LanguageSwitcher />
    </div>
  );
}
