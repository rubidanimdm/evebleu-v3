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
import yachtVideo from '@/assets/yacht-marina-video.mp4';
import nightlifeVideo from '@/assets/nightlife-video.mp4';
import attractionsVideo from '@/assets/attractions-video.mp4';
import strip4Video from '@/assets/strip4-video.mp4';
import strip5Video from '@/assets/strip5-video.mp4';
import birthdayIcon from '@/assets/birthday-icon.jpeg';

/* ── 6 category tiles — luxury outlined icons ── */
const getCategoryIcon = (key: string) => {
  const cls = "w-10 h-10 sm:w-12 sm:h-12";
  const icons: Record<string, JSX.Element> = {
    attractions: (
      <svg viewBox="0 0 48 48" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Burj-style landmark tower */}
        <path d="M24 4L24 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M24 6C24 6 20 14 20 22V42H28V22C28 14 24 6 24 6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M20 42H14V30C14 28 16 26 20 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28 42H34V30C34 28 32 26 28 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 42H10V34C10 32 11 31 14 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M34 42H38V34C38 32 37 31 34 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="8" y1="42" x2="40" y2="42" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="24" cy="16" r="1.5" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
    luxuryCars: (
      <svg viewBox="0 0 48 48" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sports car silhouette */}
        <path d="M8 30L12 22C13 20 15 19 17 19H31C33 19 35 20 36 22L40 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 30H42C43.1 30 44 30.9 44 32V34C44 35.1 43.1 36 42 36H6C4.9 36 4 35.1 4 34V32C4 30.9 4.9 30 6 30Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <circle cx="14" cy="36" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="14" cy="36" r="1.5" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
        <circle cx="34" cy="36" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="34" cy="36" r="1.5" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
        <path d="M16 24H32" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>
        <path d="M18 22L20 19" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
        <path d="M30 22L28 19" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
        <line x1="7" y1="33" x2="10" y2="33" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="38" y1="33" x2="41" y2="33" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    diningNightlife: (
      <svg viewBox="0 0 48 48" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cocktail glass + fork */}
        <path d="M14 8L24 24V36" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M34 8L24 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="8" x2="36" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M18 36H30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <ellipse cx="24" cy="38" rx="6" ry="2" stroke="currentColor" strokeWidth="1.2"/>
        {/* Bubbles */}
        <circle cx="20" cy="12" r="1" fill="currentColor" opacity="0.3"/>
        <circle cx="26" cy="14" r="0.8" fill="currentColor" opacity="0.25"/>
        <circle cx="22" cy="17" r="1.2" fill="currentColor" opacity="0.2"/>
        {/* Star accent */}
        <path d="M38 12L39 14L41 14.5L39.5 16L40 18L38 17L36 18L36.5 16L35 14.5L37 14Z" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
    yachtCharters: (
      <svg viewBox="0 0 48 48" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Yacht with sail */}
        <path d="M24 8V34" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M24 10L38 30H24" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M24 14L14 30H24" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        {/* Hull */}
        <path d="M10 34H38L36 40H12Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        {/* Waves */}
        <path d="M4 44C8 42 12 42 16 44C20 46 24 46 28 44C32 42 36 42 40 44C42 45 44 45 44 44" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
        {/* Flag */}
        <path d="M24 8L28 10L24 12" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
    desertAction: (
      <svg viewBox="0 0 48 48" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sun */}
        <circle cx="38" cy="12" r="4" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M38 5V6.5M38 17.5V19M31 12H32.5M43.5 12H45M32.8 6.8L33.8 7.8M42.2 16.2L43.2 17.2M32.8 17.2L33.8 16.2M42.2 6.8L43.2 7.8" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
        {/* Dunes */}
        <path d="M2 40C10 28 18 22 26 28C30 31 34 30 38 26C42 22 46 24 48 28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 40C8 34 14 32 20 36C26 40 32 38 38 34C42 32 46 34 48 36" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
        <line x1="2" y1="40" x2="48" y2="40" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        {/* Camel silhouette hint */}
        <path d="M12 34V30L14 28L15 30L16 28L18 30V34" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      </svg>
    ),
    extremeFlights: (
      <svg viewBox="0 0 48 48" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Helicopter / skydive */}
        <ellipse cx="24" cy="22" rx="8" ry="5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M24 17V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="14" y1="10" x2="34" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M32 22L38 28H34" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M38 28L40 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <path d="M16 22L10 28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Landing skids */}
        <path d="M18 27V32" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M30 27V32" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="14" y1="32" x2="34" y2="32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        {/* Speed lines */}
        <line x1="6" y1="18" x2="12" y2="20" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
        <line x1="4" y1="22" x2="10" y2="22" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
        <line x1="6" y1="26" x2="12" y2="24" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
      </svg>
    ),
    birthdays: (
      <img src={birthdayIcon} alt="Birthday" className="w-30 h-30 sm:w-36 sm:h-36 rounded-full object-cover" />
    ),
    airportPickup: (
      <svg viewBox="0 0 48 48" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Airplane */}
        <path d="M24 6L24 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M24 14L38 20L24 18L10 20Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M24 26L30 30L24 28L18 30Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.7"/>
        {/* Arrow down to car */}
        <path d="M24 30V36" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M21 34L24 37L27 34" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Car base */}
        <path d="M14 40H34" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="18" cy="40" r="2" stroke="currentColor" strokeWidth="1"/>
        <circle cx="30" cy="40" r="2" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    vipDriver: (
      <svg viewBox="0 0 48 48" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Driver figure */}
        <circle cx="24" cy="12" r="4" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M20 10L24 6L28 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
        <path d="M18 24C18 20 20 18 24 18C28 18 30 20 30 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        {/* Steering wheel */}
        <circle cx="24" cy="34" r="6" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="24" cy="34" r="2" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
        <line x1="24" y1="28" x2="24" y2="32" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
        <line x1="18" y1="34" x2="22" y2="34" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
        <line x1="26" y1="34" x2="30" y2="34" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
        {/* VIP star */}
        <path d="M38 8L39.2 10.5L42 11L40 13L40.5 16L38 14.8L35.5 16L36 13L34 11L36.8 10.5Z" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
    helicopterTour: (
      <svg viewBox="0 0 48 48" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Rotor */}
        <line x1="8" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="24" y1="10" x2="24" y2="16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        {/* Body */}
        <ellipse cx="24" cy="22" rx="10" ry="6" stroke="currentColor" strokeWidth="1.2"/>
        {/* Tail */}
        <path d="M34 22L42 18V24L34 22Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.7"/>
        {/* Skids */}
        <path d="M16 28V32" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M32 28V32" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="12" y1="32" x2="36" y2="32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        {/* Dubai skyline hint */}
        <path d="M10 44V38L12 36L14 38V44" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
        <path d="M20 44V36L22 34L24 32L26 34L28 36V44" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
        <path d="M34 44V40L36 38L38 40V44" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
      </svg>
    ),
  };
  return icons[key];
};

const categoryKeys = [
  { key: 'attractions', route: '/concierge?intent=ATTRACTION' },
  { key: 'extremeFlights', route: '/concierge?intent=EXTREME' },
  { key: 'diningNightlife', route: '#strip-dining' },
  { key: 'yachtCharters', route: '/concierge?intent=YACHT' },
  { key: 'desertAction', route: '/concierge?intent=DESERT' },
  { key: 'luxuryCars', route: '/concierge?intent=CAR' },
  { key: 'birthdays', route: '/concierge?intent=BIRTHDAY' },
  { key: 'airportPickup', route: '/concierge?intent=AIRPORT_PICKUP' },
  { key: 'vipDriver', route: '/concierge?intent=VIP_DRIVER' },
  { key: 'helicopterTour', route: '/concierge?intent=HELICOPTER' },
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
    if (route.startsWith('#')) {
      const el = document.getElementById(route.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(route);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">

      {/* ═══════════════════════════════════════════════
          HERO — Full-screen cinematic video
      ═══════════════════════════════════════════════ */}
      <section className="relative w-full h-screen min-h-[500px] max-h-[750px] overflow-hidden">
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
              className={`group flex flex-col items-center justify-center gap-2 sm:gap-3 aspect-square rounded-xl sm:rounded-2xl border transition-all duration-300 hover:-translate-y-1 p-3 sm:p-4 ${
                cat.key === 'birthdays'
                  ? 'border-[#1a1a5e]/50 bg-[#0a0a2e] hover:border-[#d4af37] hover:shadow-[0_12px_40px_rgba(10,10,46,0.4)]'
                  : 'border-primary/30 bg-card/50 backdrop-blur-sm hover:border-primary hover:bg-card/80 hover:shadow-[0_12px_40px_rgba(216,179,90,0.12)]'
              }`}
            >
              <div className={`transition-transform duration-300 group-hover:scale-110 ${cat.key === 'birthdays' ? '' : 'text-primary'}`}>
                {getCategoryIcon(cat.key)}
              </div>
              <span className={`text-[10px] sm:text-xs font-semibold text-center leading-tight tracking-wide transition-colors ${
                cat.key === 'birthdays'
                  ? 'text-[#d4af37] group-hover:text-[#e5c54a]'
                  : 'text-primary/80 group-hover:text-primary'
              }`}>
                {t(`mainScreen.${cat.key}`)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          YACHT VIDEO STRIP — full-width cinematic band
      ═══════════════════════════════════════════════ */}
      <section className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden mt-8">
        <video
          src={nightlifeVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-contain sm:object-cover"
        />
        {/* Dark overlay at 50% + top/bottom fade */}
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(180deg,
              hsl(var(--background)) 0%,
              transparent 20%,
              transparent 80%,
              hsl(var(--background)) 100%
            )
          `,
        }} />
      </section>

      {/* ═══════════════════════════════════════════════
          NIGHTLIFE VIDEO STRIP
      ═══════════════════════════════════════════════ */}
      <section id="strip-dining" className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden mt-8 cursor-pointer" onClick={() => navigate('/dining')} role="link" aria-label="Dining & Nightlife">
        <video
          src={attractionsVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-contain sm:object-cover"
        />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(180deg,
              hsl(var(--background)) 0%,
              transparent 20%,
              transparent 80%,
              hsl(var(--background)) 100%
            )
          `,
        }} />
      </section>

      {/* ═══════════════════════════════════════════════
          ATTRACTIONS VIDEO STRIP
      ═══════════════════════════════════════════════ */}
      <section className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] overflow-hidden mt-8">
        <video
          src={yachtVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(180deg,
              hsl(var(--background)) 0%,
              transparent 20%,
              transparent 80%,
              hsl(var(--background)) 100%
            )
          `,
        }} />
      </section>

      {/* ═══════════════════════════════════════════════
          STRIP 4 VIDEO
      ═══════════════════════════════════════════════ */}
      <section className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden mt-8">
        <video
          src={strip4Video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-contain sm:object-cover"
        />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(180deg,
              hsl(var(--background)) 0%,
              transparent 20%,
              transparent 80%,
              hsl(var(--background)) 100%
            )
          `,
        }} />
      </section>

      {/* ═══════════════════════════════════════════════
          STRIP 5 VIDEO
      ═══════════════════════════════════════════════ */}
      <section className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden mt-8">
        <video
          src={strip5Video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-contain sm:object-cover"
        />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(180deg,
              hsl(var(--background)) 0%,
              transparent 20%,
              transparent 80%,
              hsl(var(--background)) 100%
            )
          `,
        }} />
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
