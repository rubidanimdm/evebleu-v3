import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { User, ArrowRight, Phone, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n';
import { openExternalUrl } from '@/lib/openExternalUrl';
import { openWhatsAppConcierge } from '@/lib/whatsapp';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { DubaiInfoStrip } from '@/components/DubaiInfoStrip';
import { BlogSection, BLOG_ARTICLES } from '@/components/BlogSection';
import logo from '@/assets/eve-blue-logo-white.gif';
import heroVideo from '@/assets/hero-video.mp4';
import yachtVideo from '@/assets/yacht-marina-video.mp4';
import nightlifeVideo from '@/assets/nightlife-video.mp4';
import attractionsVideo from '@/assets/attractions-video.mp4';
import strip4Video from '@/assets/strip4-video.mp4';
import strip5Video from '@/assets/strip5-video.mp4';
import birthdayIcon from '@/assets/icon-birthday.jpeg';
import vipDriverIcon from '@/assets/vip-driver-icon-new.jpeg';
import flightsIcon from '@/assets/flights-icon.jpeg';
import hotelIcon from '@/assets/icon-hotel.jpeg';
import desertIcon from '@/assets/icon-desert.jpeg';
import yachtIcon from '@/assets/yacht-icon-new.jpeg';
import luxuryCarIcon from '@/assets/icon-luxury-car.jpeg';
import helicopterIcon from '@/assets/icon-helicopter.jpeg';
import diningIcon from '@/assets/dining-icon-new.jpeg';
import airportIcon from '@/assets/airport-pickup-icon.jpeg';
import attractionsIcon from '@/assets/icon-attractions.jpeg';
import { FlightSearchForm } from '@/components/FlightSearchForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useParallax } from '@/hooks/useParallax';

/* ── 6 category tiles — luxury outlined icons ── */
const getCategoryIcon = (key: string) => {
  const imgCls = "w-full h-full object-cover absolute inset-0 rounded-xl sm:rounded-2xl";
  const icons: Record<string, JSX.Element> = {
    attractions: <img src={hotelIcon} alt="Search Hotel" className={imgCls} />,
    luxuryCars: <img src={luxuryCarIcon} alt="Luxury Cars" className={imgCls} />,
    diningNightlife: <img src={diningIcon} alt="Dining & Nightlife" className="w-[105%] h-[105%] object-cover absolute top-[-2.5%] left-[-2.5%] rounded-xl sm:rounded-2xl" />,
    yachtCharters: <img src={yachtIcon} alt="Yacht" className={imgCls} />,
    desertAction: <img src={desertIcon} alt="Desert" className={imgCls} />,
    extremeFlights: <img src={flightsIcon} alt="Flights" className={imgCls} />,
    
    airportPickup: <img src={airportIcon} alt="Airport Pickup" className={imgCls} />,
    vipDriver: <img src={vipDriverIcon} alt="VIP Driver" className={imgCls} />,
    
  };
  return icons[key];
};

const categoryKeys = [
  { key: 'yachtCharters', route: '/yachts' },
  { key: 'extremeFlights', route: '#flights' },
  { key: 'diningNightlife', route: '/dining' },
  { key: 'attractions', route: '#hotel-booking' },
  { key: 'desertAction', route: 'whatsapp:DESERT' },
  { key: 'luxuryCars', route: 'whatsapp:CAR' },
  
  { key: 'airportPickup', route: 'whatsapp:AIRPORT_PICKUP' },
  { key: 'vipDriver', route: 'whatsapp:VIP_DRIVER' },
  
];

export default function MainScreen() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const isLoggedIn = !!user;
  const [flightFormOpen, setFlightFormOpen] = useState(false);

  // Scroll-reveal refs
  const introReveal = useScrollReveal<HTMLElement>();
  const servicesReveal = useScrollReveal<HTMLElement>();
  const gridReveal = useScrollReveal<HTMLDivElement>();
  const yachtStripReveal = useScrollReveal<HTMLElement>();
  const nightlifeStripReveal = useScrollReveal<HTMLElement>();
  const attractionsStripReveal = useScrollReveal<HTMLElement>();
  const carsStripReveal = useScrollReveal<HTMLElement>();
  const desertStripReveal = useScrollReveal<HTMLElement>();
  const ctaReveal = useScrollReveal<HTMLElement>();
  const footerReveal = useScrollReveal<HTMLElement>();

  // Parallax refs for video strips
  useParallax(yachtStripReveal.ref);
  useParallax(nightlifeStripReveal.ref);
  useParallax(attractionsStripReveal.ref);
  useParallax(carsStripReveal.ref);
  useParallax(desertStripReveal.ref);

  const handleCategoryClick = (route: string) => {
    if (route === '#flights') {
      setFlightFormOpen(true);
      return;
    }
    if (route === '#hotel-booking') {
      openExternalUrl('https://www.booking.com/?aid=304142');
      return;
    }
    if (route.startsWith('whatsapp:')) {
      const intent = route.replace('whatsapp:', '');
      openWhatsAppConcierge(intent);
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
          INFO STRIP — Time, Weather, Exchange Rate
      ═══════════════════════════════════════════════ */}
      <DubaiInfoStrip />

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

        {/* Profile button — top right (only if logged in) */}
        {isLoggedIn && (
          <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}
              className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md text-foreground hover:bg-black/50 border border-white/10">
              <User className="w-4 h-4" />
            </Button>
          </div>
        )}

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
              onClick={() => openWhatsAppConcierge()}
              className="h-14 sm:h-16 px-10 sm:px-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base sm:text-lg font-semibold shadow-xl shadow-primary/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 gap-3"
            >
              {t('mainScreen.talkToConcierge')}
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
          INTRO TEXT — Elegant welcome copy
      ═══════════════════════════════════════════════ */}
      <section ref={introReveal.ref} className={`px-6 sm:px-8 pt-14 sm:pt-20 pb-6 max-w-[680px] mx-auto w-full text-center reveal-base ${introReveal.isVisible ? 'revealed' : ''}`}>
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6 leading-relaxed">
          {t('mainScreen.introTitle')}
        </h2>
        <div className="space-y-5 text-sm sm:text-base text-foreground/70 leading-[1.85]">
          <p>{t('mainScreen.introP1')}</p>
          <p>{t('mainScreen.introP2')}</p>
          <p>{t('mainScreen.introP3')}</p>
          <p className="text-foreground/50 italic">{t('mainScreen.introTip')}</p>
          <p className="text-foreground/80 font-medium">{t('mainScreen.introClosing')}</p>
        </div>
        <div className="w-20 h-px shimmer-line mx-auto mt-8" />
      </section>

      {/* ═══════════════════════════════════════════════
          SERVICES — Category grid
      ═══════════════════════════════════════════════ */}
      <section ref={servicesReveal.ref} className={`px-4 sm:px-6 py-10 sm:py-14 max-w-[720px] mx-auto w-full reveal-base ${servicesReveal.isVisible ? 'revealed' : ''}`}>
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">{t('mainScreen.premiumServices')}</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
            {t('mainScreen.everythingYouNeed')}
          </h2>
          <div className="w-16 h-px shimmer-line mx-auto mt-4" />
        </div>

        <div ref={gridReveal.ref} className={`grid grid-cols-3 gap-3 sm:gap-4 reveal-stagger ${gridReveal.isVisible ? 'revealed' : ''}`}>
          {categoryKeys.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryClick(cat.route)}
              className="group relative overflow-hidden flex flex-col items-center justify-center aspect-square rounded-xl sm:rounded-2xl border border-primary/40 hover:border-primary hover:shadow-[0_12px_40px_hsl(var(--primary)/0.2)] transition-all duration-300 hover:-translate-y-1 p-0"
            >
              {getCategoryIcon(cat.key)}
              <span className="absolute bottom-2 left-0 right-0 text-[10px] sm:text-xs font-semibold text-center leading-tight tracking-wide text-primary drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] z-10">
                {t(`mainScreen.${cat.key}`)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          YACHT VIDEO STRIP — full-width cinematic band
      ═══════════════════════════════════════════════ */}
      <section ref={yachtStripReveal.ref} className={`relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden mt-8 cursor-pointer video-strip-zoom reveal-scale ${yachtStripReveal.isVisible ? 'revealed' : ''}`} onClick={() => navigate('/yachts')} role="link" aria-label="Yacht Charters">
        <video
          src={yachtVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
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
      <section ref={nightlifeStripReveal.ref} id="strip-dining" className={`relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden mt-8 cursor-pointer video-strip-zoom reveal-scale ${nightlifeStripReveal.isVisible ? 'revealed' : ''}`} onClick={() => navigate('/dining')} role="link" aria-label="Dining & Nightlife">
        <video
          src={nightlifeVideo}
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
          CTA — READY FOR SOMETHING SPECIAL
      ═══════════════════════════════════════════════ */}
      <section ref={ctaReveal.ref} className={`px-4 sm:px-6 py-14 max-w-[720px] mx-auto w-full reveal-scale ${ctaReveal.isVisible ? 'revealed' : ''}`}>
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
            onClick={() => openWhatsAppConcierge()}
            className="relative h-13 px-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base font-semibold shadow-lg shadow-primary/15 gap-2"
          >
            {t('mainScreen.chatNow')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ATTRACTIONS VIDEO STRIP
      ═══════════════════════════════════════════════ */}
      <section ref={attractionsStripReveal.ref} className={`relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden mt-8 cursor-pointer video-strip-zoom reveal-scale ${attractionsStripReveal.isVisible ? 'revealed' : ''}`} onClick={() => openWhatsAppConcierge('DESERT')} role="link" aria-label="Attractions">
        <video
          src={attractionsVideo}
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
      <section ref={carsStripReveal.ref} className={`relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden mt-8 cursor-pointer video-strip-zoom reveal-scale ${carsStripReveal.isVisible ? 'revealed' : ''}`} onClick={() => openWhatsAppConcierge('CAR')} role="link" aria-label="Luxury Cars">
        <video
          src={strip4Video}
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
          STRIP 5 VIDEO
      ═══════════════════════════════════════════════ */}
      <section ref={desertStripReveal.ref} className={`relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden mt-8 cursor-pointer video-strip-zoom reveal-scale ${desertStripReveal.isVisible ? 'revealed' : ''}`} onClick={() => openWhatsAppConcierge('DESERT')} role="link" aria-label="Attractions - Desert">
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
          RECOMMENDED HOTELS STRIP
      ═══════════════════════════════════════════════ */}
      {(() => {
        const hotelArticles = BLOG_ARTICLES.filter(a => 
          ['jw-marriott-marquis-dubai', 'shangri-la-dubai', 'sofitel-dubai-jumeirah-beach', 'park-hyatt-dubai', 'rixos-premium-dubai-jbr'].includes(a.id)
        );
        const hotelStripTitle: Record<string, string> = {
          he: '🏨 המלונות המומלצים שלנו',
          en: '🏨 Our Recommended Hotels',
          ar: '🏨 فنادقنا الموصى بها',
          fr: '🏨 Nos hôtels recommandés',
          ru: '🏨 Наши рекомендуемые отели',
        };
        return (
          <section className="px-4 sm:px-6 py-10 sm:py-14 max-w-[720px] mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-primary">
                {hotelStripTitle[language] || hotelStripTitle.en}
              </h2>
              <div className="w-16 h-px shimmer-line mx-auto mt-4" />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {hotelArticles.map((hotel) => (
                <button
                  key={hotel.id}
                  onClick={() => navigate(`/blog/${hotel.id}`)}
                  className="group flex-shrink-0 w-[200px] sm:w-[220px] rounded-xl overflow-hidden bg-card/40 border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_hsl(var(--primary)/0.15)] text-start snap-start"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.title[language] || hotel.title.en}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  </div>
                  <div className="p-3 space-y-1">
                    <h3 className="text-xs sm:text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {hotel.title[language] || hotel.title.en}
                    </h3>
                    <div className="flex items-center gap-1 text-primary text-[10px] font-medium pt-0.5">
                      <span>{language === 'he' ? 'קרא עוד' : language === 'ar' ? 'اقرأ المزيد' : 'Read more'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        );
      })()}

      {/* ═══════════════════════════════════════════════
          TOP ATTRACTIONS STRIP
      ═══════════════════════════════════════════════ */}
      {(() => {
        const attractionArticles = BLOG_ARTICLES.filter(a => 
          ['burj-khalifa-guide', 'dubai-mall-guide', 'desert-safari-dubai', 'palm-jumeirah-atlantis', 'ain-dubai-guide'].includes(a.id)
        );
        const attractionStripTitle: Record<string, string> = {
          he: '🌟 האטרקציות הפופולריות שלנו',
          en: '🌟 Our Top Attractions',
          ar: '🌟 أفضل معالمنا السياحية',
          fr: '🌟 Nos attractions incontournables',
          ru: '🌟 Наши лучшие достопримечательности',
        };
        return (
          <section className="px-4 sm:px-6 py-10 sm:py-14 max-w-[720px] mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-primary">
                {attractionStripTitle[language] || attractionStripTitle.en}
              </h2>
              <div className="w-16 h-px shimmer-line mx-auto mt-4" />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {attractionArticles.map((attraction) => (
                <button
                  key={attraction.id}
                  onClick={() => navigate(`/blog/${attraction.id}`)}
                  className="group flex-shrink-0 w-[200px] sm:w-[220px] rounded-xl overflow-hidden bg-card/40 border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_hsl(var(--primary)/0.15)] text-start snap-start"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={attraction.image}
                      alt={attraction.title[language] || attraction.title.en}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  </div>
                  <div className="p-3 space-y-1">
                    <h3 className="text-xs sm:text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {attraction.title[language] || attraction.title.en}
                    </h3>
                    <div className="flex items-center gap-1 text-primary text-[10px] font-medium pt-0.5">
                      <span>{language === 'he' ? 'קרא עוד' : language === 'ar' ? 'اقرأ المزيد' : 'Read more'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        );
      })()}

      {/* ═══════════════════════════════════════════════
          BLOG SECTION
      ═══════════════════════════════════════════════ */}
      <BlogSection />

      {/* ═══════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════ */}
      <footer ref={footerReveal.ref} className={`mt-auto border-t border-primary/10 bg-card/30 py-10 px-4 reveal-base ${footerReveal.isVisible ? 'revealed' : ''}`}>
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
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-muted-foreground/50">
            <Link to="/privacy" className="hover:text-primary transition-colors">{t('mainScreen.footerPrivacy')}</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-primary transition-colors">{t('mainScreen.footerTerms')}</Link>
            <span>·</span>
            <Link to="/cookies" className="hover:text-primary transition-colors">{t('mainScreen.footerCookies')}</Link>
          </div>
          <p className="text-[10px] text-muted-foreground/40 tracking-[0.15em] uppercase">
            © {new Date().getFullYear()} EVE BLUE · Concierge. It. Done.
          </p>
        </div>
      </footer>

      {isLoggedIn && <BottomNav />}

      <FlightSearchForm open={flightFormOpen} onOpenChange={setFlightFormOpen} />

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
