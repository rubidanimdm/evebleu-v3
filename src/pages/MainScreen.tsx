import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/eve-blue-logo.jpeg';
import heroImg from '@/assets/hero-background.jpeg';

const categories = [
  {
    label: 'אטרקציות',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20" />
        <path d="M2 12h20" />
      </svg>
    ),
    route: '/concierge?intent=ATTRACTION',
  },
  {
    label: 'השכרת רכבי יוקרה',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]">
        <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2" />
        <circle cx="7.5" cy="17" r="2" />
        <circle cx="16.5" cy="17" r="2" />
        <path d="M3 9l2-4h14l2 4" />
      </svg>
    ),
    route: '/concierge?intent=CAR',
  },
  {
    label: 'מסעדות וחיי לילה',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]">
        <path d="M3 11h18M5 11V6a7 7 0 0 1 14 0v5" />
        <path d="M12 11v6" />
        <circle cx="12" cy="19" r="2" />
      </svg>
    ),
    route: '/concierge?intent=TABLE',
  },
  {
    label: 'השכרת יאכטות',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]">
        <path d="M2 20s3-1 5-1 4 1 7 1 5-2 5-2" />
        <path d="M12 18V4l7 8H5" />
        <path d="M12 4l-7 8" />
      </svg>
    ),
    route: '/concierge?intent=YACHT',
  },
  {
    label: 'מדבר ואקשן',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]">
        <path d="M12 3v18" />
        <path d="M5 21c2-3 4-6 7-6s5 3 7 6" />
      </svg>
    ),
    route: '/concierge?intent=DESERT',
  },
  {
    label: 'אקסטרים וטיסות',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
      </svg>
    ),
    route: '/concierge?intent=EXTREME',
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
    <div className="min-h-screen" style={{
      background: `radial-gradient(1200px 700px at 20% -10%, hsl(43 62% 60% / 0.12), transparent 60%),
                    radial-gradient(900px 600px at 120% 30%, hsl(43 62% 60% / 0.10), transparent 55%),
                    linear-gradient(180deg, hsl(214 55% 8%), hsl(214 60% 6%))`
    }}>
      {/* Header */}
      <header className="py-7 px-4 flex items-center justify-center bg-black/10 border-b border-primary/[0.18] relative">
        {/* Auth buttons */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/profile')}
                className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-md text-foreground hover:bg-black/40 border border-primary/20"
              >
                <User className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-md text-foreground hover:bg-black/40 border border-primary/20"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate('/login')}
              className="h-10 px-5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold"
            >
              Sign In
            </Button>
          )}
        </div>

        <img
          src={logo}
          alt="EVE BLUE - Concierge. It. Done."
          className="w-[min(360px,78vw)] h-auto drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
        />
      </header>

      {/* Hero Image */}
      <section className="px-4 pt-[18px] max-w-[1100px] mx-auto">
        <div className="relative rounded-[18px] overflow-hidden border border-primary/[0.22] bg-white/[0.02] shadow-[0_18px_55px_rgba(0,0,0,0.45)] min-h-[240px]">
          <img
            src={heroImg}
            alt="Dubai luxury skyline"
            className="w-full h-[min(520px,58vw)] object-cover block scale-[1.01]"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(7,20,35,0.30) 0%, rgba(7,20,35,0.45) 40%, rgba(7,20,35,0.88) 100%)',
            }}
          />
        </div>
      </section>

      {/* Title */}
      <div className="text-center py-6 px-3 max-w-[1100px] mx-auto">
        <h1 className="m-0 font-bold tracking-[0.10em] uppercase text-primary text-[clamp(18px,3.2vw,34px)] drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]">
          ELEVATE YOUR DUBAI EXPERIENCE
        </h1>
      </div>

      {/* Category Grid */}
      <section className="max-w-[1100px] mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryClick(cat.route)}
              className="no-underline text-foreground bg-gradient-to-b from-white/[0.03] to-white/[0.05] border border-primary/[0.65] rounded-2xl p-[18px_16px] flex gap-[14px] items-center min-h-[92px] transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:border-primary/95 hover:from-white/[0.05] hover:to-white/[0.07] text-left"
            >
              <div className="w-11 h-11 flex-shrink-0 grid place-items-center rounded-xl border border-primary/[0.35] bg-black/10 text-primary">
                {cat.icon}
              </div>
              <span className="text-base leading-tight font-semibold tracking-wide">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/[0.18] bg-black/[0.12] py-6 px-4">
        <div className="max-w-[1100px] mx-auto text-center text-muted-foreground text-sm leading-relaxed">
          <div>
            Contact Dekel:{' '}
            <span className="text-primary font-semibold">+971 55 152 3121</span>
          </div>
          <div>
            Email:{' '}
            <span className="text-primary font-semibold">dekel@evebleu.vip</span>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation */}
      {isLoggedIn && <BottomNav />}
    </div>
  );
}
