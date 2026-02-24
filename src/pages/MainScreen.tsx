import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { User, LogOut, ArrowRight, Phone, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import logo from '@/assets/eve-blue-logo-white.gif';
import heroVideo from '@/assets/hero-video.mp4';

/* ── 6 category tiles ── */
const getCategoryIcon = (key: string) => {
  const icons: Record<string, JSX.Element> = {
    attractions: (
      <svg viewBox="0 0 64 64" className="w-9 h-9 sm:w-11 sm:h-11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="22" /><circle cx="32" cy="32" r="8" />
        <path d="M32 10v6M32 48v6M10 32h6M48 32h6" />
        <line x1="16" y1="16" x2="20" y2="20" /><line x1="44" y1="16" x2="40" y2="20" />
        <line x1="16" y1="48" x2="20" y2="44" /><line x1="44" y1="48" x2="40" y2="44" />
      </svg>
    ),
    luxuryCars: (
      <svg viewBox="0 0 64 64" className="w-9 h-9 sm:w-11 sm:h-11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="24" width="48" height="18" rx="4" /><path d="M14 24l4-10h28l4 10" />
        <circle cx="18" cy="42" r="4" /><circle cx="46" cy="42" r="4" />
        <rect x="24" y="28" width="16" height="8" rx="2" />
      </svg>
    ),
    diningNightlife: (
      <svg viewBox="0 0 64 64" className="w-9 h-9 sm:w-11 sm:h-11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 44l-4 10M44 44l4 10" /><path d="M12 44h40" />
        <path d="M18 44c0-8 6-14 14-14s14 6 14 14" />
        <line x1="32" y1="14" x2="32" y2="20" /><path d="M28 14c0-4 8-4 8 0" />
      </svg>
    ),
    yachtCharters: (
      <svg viewBox="0 0 64 64" className="w-9 h-9 sm:w-11 sm:h-11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 50V14" /><path d="M32 14l-18 20h36z" />
        <path d="M6 54c6-4 12-4 18 0s12 4 18 0 12-4 18 0" />
        <line x1="32" y1="50" x2="32" y2="54" />
      </svg>
    ),
    desertAction: (
      <svg viewBox="0 0 64 64" className="w-9 h-9 sm:w-11 sm:h-11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 50c8-12 16-24 28-24 8 0 14 6 16 10" />
        <path d="M20 50c6-8 12-16 22-16 6 0 10 4 14 8" />
        <circle cx="50" cy="16" r="6" />
        <line x1="50" y1="6" x2="50" y2="8" /><line x1="50" y1="24" x2="50" y2="26" />
        <line x1="40" y1="16" x2="42" y2="16" /><line x1="58" y1="16" x2="60" y2="16" />
        <path d="M4 50h56" />
      </svg>
    ),
    extremeFlights: (
      <svg viewBox="0 0 64 64" className="w-9 h-9 sm:w-11 sm:h-11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="32" cy="28" rx="6" ry="4" />
        <path d="M38 28l18-6-4 8h-14" /><path d="M26 28l-18-6 4 8h14" />
        <path d="M32 32v14" /><path d="M26 46h12" />
        <path d="M36 32l10 8" /><path d="M28 32l-10 8" />
        <line x1="32" y1="24" x2="32" y2="16" /><circle cx="32" cy="14" r="2" />
      </svg>
    ),
  };
  return icons[key];
};

const categoryKeys = [
  { key: 'attractions', route: '/concierge?intent=ATTRACTION' },
  { key: 'luxuryCars', route: '/concierge?intent=CAR' },
  { key: 'diningNightlife', route: '/dining' },
  { key: 'yachtCharters', route: '/concierge?intent=YACHT' },
  { key: 'desertAction', route: '/concierge?intent=DESERT' },
  { key: 'extremeFlights', route: '/concierge?intent=EXTREME' },
];

export default function MainScreen() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const isLoggedIn = !!user;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: t('common.signedOut') });
  };

  const handleCategoryClick = (route: string) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    navigate(route);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">

      {/* ═══════════════════════════════════════════════
          HERO — Full-screen cinematic video
      ═══════════════════════════════════════════════ */}
      <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        {/* Video background */}
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(180deg,
              rgba(7,20,35,0.70) 0%,
              rgba(7,20,35,0.30) 30%,
              rgba(7,20,35,0.25) 50%,
              rgba(7,20,35,0.60) 75%,
              rgba(7,20,35,0.98) 100%
            )
          `,
        }} />

        {/* Subtle vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(7,20,35,0.5) 100%)',
        }} />

        {/* Language switcher — top left */}
        <div className="absolute top-4 left-4 z-30">
          <LanguageSwitcher variant="full" className="[&_button]:bg-black/40 [&_button]:backdrop-blur-md [&_button]:border-white/10 [&_button]:text-foreground [&_button]:hover:bg-black/50" />
        </div>

        {/* Auth buttons — top right */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}
                className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md text-foreground hover:bg-black/50 border border-white/10">
                <User className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}
                className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md text-foreground hover:bg-black/50 border border-white/10">
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate('/login')}
              className="h-10 px-6 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary text-xs font-semibold backdrop-blur-md shadow-lg border border-primary/30">
              {t('auth.signIn')}
            </Button>
          )}
        </div>

        {/* Hero content — centered */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
          {/* Logo */}
          <div className="mb-8 animate-[fadeIn_1.2s_ease-out]">
            <img
              src={logo}
              alt="EVE BLUE — Concierge. It. Done."
              className="w-[min(320px,70vw)] h-auto rounded-lg shadow-2xl shadow-black/40"
            />
          </div>

          {/* Tagline */}
          <p className="text-foreground/60 text-sm sm:text-base tracking-[0.25em] uppercase mb-10 animate-[fadeIn_1.8s_ease-out]">
            {t('mainScreen.tagline')}
          </p>

          {/* CTA */}
          <div className="animate-[fadeIn_2.2s_ease-out]">
            <Button
              onClick={() => isLoggedIn ? navigate('/concierge') : navigate('/login')}
              className="h-14 sm:h-16 px-10 sm:px-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base sm:text-lg font-semibold shadow-xl shadow-primary/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 gap-3"
            >
              {isLoggedIn ? t('mainScreen.talkToConcierge') : t('mainScreen.getStarted')}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
              <div className="w-1 h-2.5 rounded-full bg-primary/50 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SERVICES — Category grid
      ═══════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 py-14 sm:py-20 max-w-[720px] mx-auto w-full">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">{t('mainScreen.premiumServices')}</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
            {t('mainScreen.everythingYouNeed')}
          </h2>
          <div className="w-16 h-px bg-primary/40 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {categoryKeys.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryClick(cat.route)}
              className="group flex flex-col items-center justify-center gap-2 sm:gap-3 aspect-square rounded-xl sm:rounded-2xl border border-primary/30 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-card/80 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(216,179,90,0.12)] p-3 sm:p-4"
            >
              <div className="text-primary transition-transform duration-300 group-hover:scale-110">
                {getCategoryIcon(cat.key)}
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-primary/80 text-center leading-tight tracking-wide group-hover:text-primary transition-colors">
                {t(`mainScreen.${cat.key}`)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECOND CTA
      ═══════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 pb-14 max-w-[720px] mx-auto w-full">
        <div className="relative rounded-2xl overflow-hidden border border-primary/15 bg-card/60 backdrop-blur p-8 sm:p-12 text-center">
          {/* Decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/5 blur-3xl rounded-full" />
          
          <h3 className="relative text-xl sm:text-2xl font-semibold text-foreground mb-3">
            {t('mainScreen.readyForSomethingSpecial')}
          </h3>
          <p className="relative text-muted-foreground text-sm mb-8 max-w-sm mx-auto">
            {t('mainScreen.conciergeAvailable')}
          </p>
          <Button
            onClick={() => isLoggedIn ? navigate('/concierge') : navigate('/login')}
            className="relative h-13 px-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base font-semibold shadow-lg shadow-primary/15 gap-2"
          >
            {isLoggedIn ? t('mainScreen.chatNow') : t('mainScreen.joinUs')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════ */}
      <footer className="mt-auto border-t border-primary/10 bg-card/30 py-10 px-4">
        <div className="max-w-[720px] mx-auto flex flex-col items-center space-y-5">
          <img
            src={logo}
            alt="EVE BLUE"
            className="w-32 h-auto rounded-lg opacity-90"
          />
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="tel:+971551523121" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4 text-primary/60" />
              +971 55 152 3121
            </a>
            <a href="mailto:dekel@evebleu.vip" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4 text-primary/60" />
              dekel@evebleu.vip
            </a>
          </div>
          <div className="w-24 h-px bg-primary/15" />
          <p className="text-[10px] text-muted-foreground/40 tracking-[0.15em] uppercase">
            © {new Date().getFullYear()} EVE BLUE · Concierge. It. Done.
          </p>
        </div>
      </footer>

      {isLoggedIn && <BottomNav />}

      {/* Fade-in keyframe */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
