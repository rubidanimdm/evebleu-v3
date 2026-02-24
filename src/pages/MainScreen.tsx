import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/eve-blue-logo.jpeg';
import heroImg from '@/assets/dubai-skyline.jpg';

/* ── 6 category tiles matching the poster reference ── */
const categories = [
  {
    label: 'אטרקציות',
    route: '/concierge?intent=ATTRACTION',
    icon: (
      <svg viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="22" />
        <circle cx="32" cy="32" r="8" />
        <path d="M32 10v6M32 48v6M10 32h6M48 32h6" />
        <line x1="16" y1="16" x2="20" y2="20" />
        <line x1="44" y1="16" x2="40" y2="20" />
        <line x1="16" y1="48" x2="20" y2="44" />
        <line x1="44" y1="48" x2="40" y2="44" />
      </svg>
    ),
  },
  {
    label: 'השכרת רכבי יוקרה',
    route: '/concierge?intent=CAR',
    icon: (
      <svg viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="24" width="48" height="18" rx="4" />
        <path d="M14 24l4-10h28l4 10" />
        <circle cx="18" cy="42" r="4" />
        <circle cx="46" cy="42" r="4" />
        <rect x="24" y="28" width="16" height="8" rx="2" />
      </svg>
    ),
  },
  {
    label: 'מסעדות וחיי לילה',
    route: '/concierge?intent=TABLE',
    icon: (
      <svg viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 44l-4 10M44 44l4 10" />
        <path d="M12 44h40" />
        <path d="M18 44c0-8 6-14 14-14s14 6 14 14" />
        <line x1="32" y1="14" x2="32" y2="20" />
        <path d="M28 14c0-4 8-4 8 0" />
      </svg>
    ),
  },
  {
    label: 'השכרות יאכטות',
    route: '/concierge?intent=YACHT',
    icon: (
      <svg viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 50V14" />
        <path d="M32 14l-18 20h36z" />
        <path d="M6 54c6-4 12-4 18 0s12 4 18 0 12-4 18 0" />
        <line x1="32" y1="50" x2="32" y2="54" />
      </svg>
    ),
  },
  {
    label: 'מדבר ואקשן',
    route: '/concierge?intent=DESERT',
    icon: (
      <svg viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 50c8-12 16-24 28-24 8 0 14 6 16 10" />
        <path d="M20 50c6-8 12-16 22-16 6 0 10 4 14 8" />
        <circle cx="50" cy="16" r="6" />
        <line x1="50" y1="6" x2="50" y2="8" />
        <line x1="50" y1="24" x2="50" y2="26" />
        <line x1="40" y1="16" x2="42" y2="16" />
        <line x1="58" y1="16" x2="60" y2="16" />
        <path d="M4 50h56" />
      </svg>
    ),
  },
  {
    label: 'אקסטרים וטיסות',
    route: '/concierge?intent=EXTREME',
    icon: (
      <svg viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="32" cy="28" rx="6" ry="4" />
        <path d="M38 28l18-6-4 8h-14" />
        <path d="M26 28l-18-6 4 8h14" />
        <path d="M32 32v14" />
        <path d="M26 46h12" />
        <path d="M36 32l10 8" />
        <path d="M28 32l-10 8" />
        <line x1="32" y1="24" x2="32" y2="16" />
        <circle cx="32" cy="14" r="2" />
      </svg>
    ),
  },
];

export default function MainScreen() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isLoggedIn = !!user;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: 'Signed out' });
  };

  const handleCategoryClick = (route: string) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    navigate(route);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `
          radial-gradient(ellipse 900px 500px at 50% 0%, hsl(43 62% 60% / 0.07), transparent 70%),
          linear-gradient(180deg, hsl(214 55% 8%) 0%, hsl(214 60% 5%) 100%)
        `,
      }}
    >
      {/* ─── Auth floating buttons ─── */}
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}
              className="h-9 w-9 rounded-full bg-black/50 backdrop-blur-md text-foreground hover:bg-black/60 border border-primary/20">
              <User className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}
              className="h-9 w-9 rounded-full bg-black/50 backdrop-blur-md text-foreground hover:bg-black/60 border border-primary/20">
              <LogOut className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <Button onClick={() => navigate('/login')}
            className="h-9 px-5 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary text-xs font-semibold backdrop-blur-md shadow-lg">
            Sign In
          </Button>
        )}
      </div>

      {/* ═══════════ HEADER — Logo ═══════════ */}
      <header className="pt-8 pb-5 flex flex-col items-center border-b border-primary/[0.18] bg-black/10">
        <img
          src={logo}
          alt="EVE BLUE — Concierge. It. Done."
          className="w-[min(340px,75vw)] h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
        />
      </header>

      {/* ═══════════ HERO — Full-width image with overlay title ═══════════ */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: 'min(620px, 75vw)' }}>
        <img
          src={heroImg}
          alt="Dubai skyline at sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(180deg, rgba(7,20,35,0.40) 0%, rgba(7,20,35,0.20) 30%, rgba(7,20,35,0.60) 70%, rgba(7,20,35,0.95) 100%),
            linear-gradient(90deg, rgba(7,20,35,0.50) 0%, transparent 40%)
          `,
        }} />

        {/* Gold sparkle dots */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/40"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
                animationName: 'pulse',
                animationDuration: `${2 + Math.random() * 3}s`,
                animationIterationCount: 'infinite',
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Title overlay */}
        <div className="relative z-10 flex items-end h-full px-6 sm:px-10 pb-12 sm:pb-16" style={{ minHeight: 'min(620px, 75vw)' }}>
          <h1 className="text-[clamp(32px,7vw,64px)] font-bold leading-[1.05] tracking-[0.06em] uppercase text-primary drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
            ELEVATE
            <br />
            YOUR DUBAI
            <br />
            EXPERIENCE
          </h1>
        </div>
      </section>

      {/* ═══════════ CATEGORY GRID — 3×2 gold-bordered tiles ═══════════ */}
      <section className="px-4 sm:px-6 py-8 sm:py-10 max-w-[720px] mx-auto w-full">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryClick(cat.route)}
              className="group flex flex-col items-center justify-center gap-2 sm:gap-3 aspect-square rounded-xl sm:rounded-2xl border border-primary/50 bg-gradient-to-b from-white/[0.03] to-white/[0.01] transition-all duration-300 hover:border-primary hover:bg-white/[0.06] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(216,179,90,0.15)] p-3 sm:p-4"
            >
              <div className="text-primary transition-transform duration-300 group-hover:scale-110">
                {cat.icon}
              </div>
              <span className="text-[11px] sm:text-sm font-semibold text-primary/90 text-center leading-tight tracking-wide group-hover:text-primary transition-colors">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="mt-auto border-t border-primary/[0.18] bg-black/[0.12] py-7 px-4">
        <div className="max-w-[720px] mx-auto text-center space-y-2">
          <p className="text-muted-foreground text-sm">
            Contact Dekel:{' '}
            <a href="tel:+971551523121" className="text-primary font-semibold hover:underline">+971 55 152 3121</a>
          </p>
          <p className="text-muted-foreground text-sm">
            Email:{' '}
            <a href="mailto:dekel@evebleu.vip" className="text-primary font-semibold hover:underline">dekel@evebleu.vip</a>
          </p>
          <p className="text-xs text-muted-foreground/50 pt-3 tracking-[0.12em] uppercase">
            © {new Date().getFullYear()} EVE BLUE · Concierge. It. Done.
          </p>
        </div>
      </footer>

      {/* Bottom Navigation for logged-in users */}
      {isLoggedIn && <BottomNav />}
    </div>
  );
}
