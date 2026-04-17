import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { openWhatsAppConcierge } from '@/lib/whatsapp';
import { DubaiInfoStrip } from '@/components/DubaiInfoStrip';
import { BlogSection, BLOG_ARTICLES } from '@/components/BlogSection';
import heroVideo from '@/assets/hero-video.mp4';
import yachtVideo from '@/assets/yacht-marina-video.mp4';
import nightlifeVideo from '@/assets/nightlife-video.mp4';
import attractionsVideo from '@/assets/attractions-video.mp4';
import strip4Video from '@/assets/strip4-video.mp4';
import strip5Video from '@/assets/strip5-video.mp4';
import vipDriverIcon from '@/assets/vip-driver-icon-new.jpeg';
import flightsIcon from '@/assets/flights-icon.jpeg';
import hotelIcon from '@/assets/icon-hotel.jpeg';
import desertIcon from '@/assets/icon-desert.jpeg';
import yachtIcon from '@/assets/yacht-icon-new.jpeg';
import luxuryCarIcon from '@/assets/icon-luxury-car.jpeg';
import diningIcon from '@/assets/dining-icon-new.jpeg';
import airportIcon from '@/assets/airport-pickup-icon.jpeg';
import eveLogoWhite from '@/assets/eve-blue-logo-white.gif';
import { FlightSearchForm } from '@/components/FlightSearchForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useParallax } from '@/hooks/useParallax';

/* ── 8 category tiles — luxury outlined icons ── */
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
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [flightFormOpen, setFlightFormOpen] = useState(false);
  const [hotelCheckIn, setHotelCheckIn] = useState('');
  const [hotelCheckOut, setHotelCheckOut] = useState('');
  const [hotelGuests, setHotelGuests] = useState(2);
  const [hotelRooms, setHotelRooms] = useState(1);

  // Scroll-reveal refs
  const gridReveal = useScrollReveal<HTMLDivElement>();
  const yachtStripReveal = useScrollReveal<HTMLElement>();
  const nightlifeStripReveal = useScrollReveal<HTMLElement>();
  const attractionsStripReveal = useScrollReveal<HTMLElement>();
  const carsStripReveal = useScrollReveal<HTMLElement>();
  const desertStripReveal = useScrollReveal<HTMLElement>();
  const ctaReveal = useScrollReveal<HTMLElement>();

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
      navigate('/hotels');
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
    <div className="flex flex-col bg-background">

      {/* ═══════════════════════════════════════════════
          INFO STRIP — Time, Weather, Exchange Rate
      ═══════════════════════════════════════════════ */}
      <DubaiInfoStrip />

      {/* ═══════════════════════════════════════════════
          HERO — Full-screen cinematic video + category tiles
      ═══════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[500px] overflow-hidden">
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

        {/* Hero content — centered */}
        <div className="relative z-20 flex flex-col items-center px-6 text-center pt-16 pb-10">
          {/* Tagline */}
          <p className="text-foreground/60 text-sm sm:text-base tracking-[0.25em] uppercase mb-10 animate-[fadeIn_1.2s_ease-out]">
            {t('mainScreen.tagline')}
          </p>

          {/* CTA */}
          <div className="animate-[fadeIn_2.2s_ease-out] mb-12">
            <Button
              onClick={() => openWhatsAppConcierge()}
              className="h-14 sm:h-16 px-10 sm:px-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base sm:text-lg font-semibold shadow-xl shadow-primary/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 gap-3"
            >
              {t('mainScreen.talkToConcierge')}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Category tiles — merged into hero */}
          <div ref={gridReveal.ref} className={`grid grid-cols-3 gap-3 sm:gap-4 max-w-[520px] w-full reveal-stagger ${gridReveal.isVisible ? 'revealed' : ''}`}>
            {categoryKeys.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryClick(cat.route)}
                className="group relative overflow-hidden flex flex-col items-center justify-center aspect-square rounded-xl sm:rounded-2xl bg-black/30 backdrop-blur border border-white/10 hover:border-primary hover:shadow-[0_12px_40px_hsl(var(--primary)/0.2)] transition-all duration-300 hover:-translate-y-1 p-0"
              >
                {getCategoryIcon(cat.key)}
                <span className="absolute bottom-2 left-0 right-0 text-[10px] sm:text-xs font-semibold text-center leading-tight tracking-wide text-primary drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] z-10">
                  {t(`mainScreen.${cat.key}`)}
                </span>
              </button>
            ))}
          </div>

          {/* EVE BLUE logo */}
          <div className="my-8 flex justify-center">
            <img src={eveLogoWhite} alt="EVE BLUE" className="h-16 sm:h-20 opacity-90" />
          </div>

          {/* Hotel & Flight Quick Search */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[520px] w-full">
            {/* Hotel Quick Search Card */}
            <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3">{t('hero.findPerfectHotel')}</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1">{t('hero.checkIn')}</label>
                    <input
                      type="date"
                      value={hotelCheckIn}
                      onChange={(e) => setHotelCheckIn(e.target.value)}
                      className="bg-white/10 border border-white/15 rounded-lg text-white text-xs h-9 px-3 w-full focus:border-[#E6B800]/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1">{t('hero.checkOut')}</label>
                    <input
                      type="date"
                      value={hotelCheckOut}
                      onChange={(e) => setHotelCheckOut(e.target.value)}
                      className="bg-white/10 border border-white/15 rounded-lg text-white text-xs h-9 px-3 w-full focus:border-[#E6B800]/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1">{t('hero.guests')}</label>
                    <select
                      value={hotelGuests}
                      onChange={(e) => setHotelGuests(Number(e.target.value))}
                      className="bg-white/10 border border-white/15 rounded-lg text-white text-xs h-9 px-3 w-full focus:border-[#E6B800]/50 focus:outline-none appearance-none"
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n} className="bg-[#0A0A0A] text-white">{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1">{t('hero.rooms')}</label>
                    <select
                      value={hotelRooms}
                      onChange={(e) => setHotelRooms(Number(e.target.value))}
                      className="bg-white/10 border border-white/15 rounded-lg text-white text-xs h-9 px-3 w-full focus:border-[#E6B800]/50 focus:outline-none appearance-none"
                    >
                      {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n} className="bg-[#0A0A0A] text-white">{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/hotels?checkIn=${hotelCheckIn}&checkOut=${hotelCheckOut}&guests=${hotelGuests}&rooms=${hotelRooms}`)}
                  className="bg-[#E6B800] hover:bg-[#E6B800]/90 text-black font-semibold rounded-full h-10 w-full text-sm transition-colors"
                >
                  {t('hero.searchHotels')}
                </button>
              </div>
            </div>

            {/* Flight Quick Request Card */}
            <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col">
              <h3 className="text-sm font-semibold text-white mb-2">{t('hero.flightsAnywhere')}</h3>
              <p className="text-xs text-white/50 mb-auto leading-relaxed">{t('hero.flightsCta')}</p>
              <button
                onClick={() => setFlightFormOpen(true)}
                className="bg-[#E6B800] hover:bg-[#E6B800]/90 text-black font-semibold rounded-full h-10 w-full text-sm transition-colors mt-4"
              >
                {t('hero.requestFlight')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          RECOMMENDED HOTELS STRIP
      ═══════════════════════════════════════════════ */}
      {(() => {
        const hotelOrder = ['atlantis-the-royal', 'five-palm-jumeirah', 'atlantis-the-palm', 'armani-hotel-burj-khalifa', 'address-dubai-marina'];
        const hotelArticles = hotelOrder.map(id => BLOG_ARTICLES.find(a => a.id === id)).filter(Boolean) as typeof BLOG_ARTICLES;
        const hotelStripTitle: Record<string, string> = {
          he: '🏨 המלונות המומלצים שלנו',
          en: '🏨 Our Recommended Hotels',
          ar: '🏨 فنادقنا الموصى بها',
          fr: '🏨 Nos hôtels recommandés',
          ru: '🏨 Наши рекомендуемые отели',
        };
        return (
          <section className="px-4 sm:px-6 py-6 sm:py-8 max-w-[720px] mx-auto w-full">
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
          ['hot-air-balloon-dubai', 'helicopter-tour-dubai', 'skydiving-dubai', 'desert-safari-dubai', 'ain-dubai-guide'].includes(a.id)
        );
        const attractionStripTitle: Record<string, string> = {
          he: '🌟 האטרקציות הפופולריות שלנו',
          en: '🌟 Our Top Attractions',
          ar: '🌟 أفضل معالمنا السياحية',
          fr: '🌟 Nos attractions incontournables',
          ru: '🌟 Наши лучшие достопримечательности',
        };
        return (
          <section className="px-4 sm:px-6 py-6 sm:py-8 max-w-[720px] mx-auto w-full">
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
          VIDEO STRIPS — cinematic bands at the bottom
      ═══════════════════════════════════════════════ */}
      <section ref={yachtStripReveal.ref} className={`relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden mt-1 cursor-pointer video-strip-zoom reveal-scale ${yachtStripReveal.isVisible ? 'revealed' : ''}`} onClick={() => navigate('/explore?category=TRANSPORT')} role="link" aria-label="Luxury Cars">
        <video src={yachtVideo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(var(--background)) 0%, transparent 20%, transparent 80%, hsl(var(--background)) 100%)' }} />
      </section>
      <section ref={nightlifeStripReveal.ref} className={`relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden mt-1 cursor-pointer video-strip-zoom reveal-scale ${nightlifeStripReveal.isVisible ? 'revealed' : ''}`} onClick={() => navigate('/yachts')} role="link" aria-label="Yacht Charters">
        <video src={nightlifeVideo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(var(--background)) 0%, transparent 20%, transparent 80%, hsl(var(--background)) 100%)' }} />
      </section>
      <section ref={attractionsStripReveal.ref} className={`relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden mt-1 cursor-pointer video-strip-zoom reveal-scale ${attractionsStripReveal.isVisible ? 'revealed' : ''}`} onClick={() => navigate('/dining')} role="link" aria-label="Dining & Nightlife">
        <video src={attractionsVideo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(var(--background)) 0%, transparent 20%, transparent 80%, hsl(var(--background)) 100%)' }} />
      </section>
      <section ref={carsStripReveal.ref} className={`relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden mt-1 cursor-pointer video-strip-zoom reveal-scale ${carsStripReveal.isVisible ? 'revealed' : ''}`} onClick={() => navigate('/explore?category=EXPERIENCE')} role="link" aria-label="Attractions">
        <video src={strip4Video} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(var(--background)) 0%, transparent 20%, transparent 80%, hsl(var(--background)) 100%)' }} />
      </section>
      <section ref={desertStripReveal.ref} className={`relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden mt-1 cursor-pointer video-strip-zoom reveal-scale ${desertStripReveal.isVisible ? 'revealed' : ''}`} onClick={() => navigate('/explore?category=EXPERIENCE')} role="link" aria-label="Desert">
        <video src={strip5Video} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-contain sm:object-cover" />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(var(--background)) 0%, transparent 20%, transparent 80%, hsl(var(--background)) 100%)' }} />
      </section>

      {/* ═══════════════════════════════════════════════
          CTA — READY FOR SOMETHING SPECIAL (last section)
      ═══════════════════════════════════════════════ */}
      <section ref={ctaReveal.ref} className={`px-4 sm:px-6 py-8 max-w-[720px] mx-auto w-full transition-all duration-1000 ease-out ${ctaReveal.isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
        <div className={`relative rounded-2xl overflow-hidden border border-primary/15 bg-card/60 backdrop-blur p-8 sm:p-12 text-center transition-all duration-700 delay-300 ${ctaReveal.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/8 blur-3xl rounded-full transition-all duration-1000 delay-500 ${ctaReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
          <div className={`absolute -bottom-8 -right-8 w-48 h-48 bg-primary/5 blur-3xl rounded-full transition-all duration-1200 delay-700 ${ctaReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
          <div className={`absolute -bottom-8 -left-8 w-40 h-40 bg-accent/5 blur-3xl rounded-full transition-all duration-1200 delay-800 ${ctaReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
          <div className={`absolute inset-0 rounded-2xl transition-opacity duration-1000 delay-600 ${ctaReveal.isVisible ? 'opacity-100' : 'opacity-0'}`} style={{
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15) 0%, transparent 40%, transparent 60%, hsl(var(--primary) / 0.1) 100%)',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }} />
          <h3 className={`relative text-xl sm:text-2xl font-semibold text-foreground mb-3 transition-all duration-700 delay-400 ${ctaReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {t('mainScreen.readyForSomethingSpecial')}
          </h3>
          <p className={`relative text-muted-foreground text-sm mb-8 max-w-sm mx-auto transition-all duration-700 delay-500 ${ctaReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {t('mainScreen.conciergeAvailable')}
          </p>
          <Button
            onClick={() => openWhatsAppConcierge()}
            className={`relative h-13 px-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base font-semibold shadow-lg shadow-primary/15 gap-2 transition-all duration-700 delay-600 ${ctaReveal.isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}
          >
            {t('mainScreen.chatNow')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

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
