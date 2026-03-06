import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { FloatingHomeButton } from '@/components/FloatingHomeButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoldParticles } from '@/components/LuxuryElements';
import { VenueBookingForm } from '@/components/VenueBookingForm';
import { useLanguage } from '@/lib/i18n';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { MessageCircle, Search, UtensilsCrossed, X } from 'lucide-react';

type Venue = {
  name: string;
  domain?: string;
  logo?: string;
};

const VENUES: Venue[] = [
  { name: 'Adaline', logo: '/logos/adaline.jpeg' },
  { name: 'African Queen', logo: '/logos/african-queen.png' },
  { name: 'Alaya', logo: '/logos/alaya.png' },
  { name: 'Amazonico', domain: 'amazonicorestaurant.com' },
  { name: 'Amelia', logo: '/logos/amelia.jpeg' },
  { name: 'Aretha', logo: '/logos/aretha.jpeg' },
  { name: 'Arrogante', logo: '/logos/arrogante.png' },
  { name: 'Avenue', logo: '/logos/avenue.jpeg' },
  { name: 'Baoli', logo: '/logos/baoli.jpeg' },
  { name: 'Bar De Pres', logo: '/logos/bar-de-pres.jpeg' },
  { name: 'BCH:CLB', logo: '/logos/bch-clb.png' },
  { name: 'Beach by FIVE', logo: '/logos/beach-by-five.png' },
  { name: 'Billionaire', logo: '/logos/billionaire.jpeg' },
  { name: 'Blume', logo: '/logos/blume.jpg' },
  { name: 'Bohemia', logo: '/logos/bohemia.jpeg' },
  { name: 'Carnival', logo: '/logos/carnival.jpeg' },
  { name: 'Casa Amor', logo: '/logos/casa-amor.png' },
  { name: 'Ce La Vi', logo: '/logos/ce-la-vi.webp' },
  { name: 'Chic Nonna' },
  { name: 'Cinque', domain: 'cinquedubai.com' },
  { name: 'CoveBeach', domain: 'cfrgroup.com' },
  { name: 'Cou Cou' },
  { name: 'Coya', domain: 'coyarestaurant.com' },
  { name: 'Dream', domain: 'dreamdubai.com' },
  { name: 'Eva' },
  { name: 'FIVE Venues', domain: 'fivehotelsandresorts.com' },
  { name: 'GAL' },
  { name: 'Gatsby', domain: 'gatsbydubai.com' },
  { name: 'Gigi', domain: 'gigidubai.com' },
  { name: 'Gitano', domain: 'gitanodubai.com' },
  { name: 'Hanu' },
  { name: "Il'Gatto Pardo" },
  { name: 'Iliana' },
  { name: 'Kaspia', domain: 'kaspia.com' },
  { name: 'Kinugawa', domain: 'kinugawa.fr' },
  { name: 'Krasota', domain: 'krasota.ae' },
  { name: "L'amo Bistro" },
  { name: 'La Nina', domain: 'laninadubai.com' },
  { name: 'La Cantine', domain: 'lacantine.ae' },
  { name: 'Ly-La' },
  { name: 'Maiden Shanghai', domain: 'maidenshanghai.com' },
  { name: 'Maison De Curry' },
  { name: 'Maison De La Page' },
  { name: 'Maison Revka' },
  { name: 'Mamabella' },
  { name: 'Mimi Kakushi', domain: 'mimikakushi.com' },
  { name: 'Mott 32', domain: 'mott32.com' },
  { name: 'Nahate' },
  { name: 'Nammos', domain: 'nammosdubai.com' },
  { name: 'Nazcaa' },
  { name: 'Nikki Beach', domain: 'nikkibeach.com' },
  { name: 'Ninive beach' },
  { name: 'Nobu', domain: 'noburestaurants.com' },
  { name: 'O Beach', domain: 'obeachdubai.com' },
  { name: 'Opa', domain: 'opadubai.com' },
  { name: 'Ora' },
  { name: 'Pacha Icons', domain: 'pacha.com' },
  { name: 'Paris Paradis' },
  { name: 'Playa Pacha' },
  { name: 'Pool by FIVE', domain: 'fivehotelsandresorts.com' },
  { name: 'Ram & Roll' },
  { name: 'Raspoutine', domain: 'raspoutine.com' },
  { name: 'Revelry' },
  { name: 'Rialto' },
  { name: 'Sakhalin' },
  { name: 'Salvaje', domain: 'salvajedubai.com' },
  { name: 'Sana' },
  { name: 'Sexy Fish', domain: 'sexyfish.com' },
  { name: 'Signor Sassi', domain: 'signorsassi.com' },
  { name: 'Surf Club' },
  { name: 'Sushi Samba', domain: 'sushisamba.com' },
  { name: 'Tang' },
  { name: 'Tattu', domain: 'tattu.co.uk' },
  { name: 'Terra Solis', domain: 'terrasolis.com' },
  { name: 'Theater' },
  { name: 'Trésind', domain: 'tresind.com' },
  { name: 'Urla', domain: 'urladubai.com' },
  { name: 'Verde Beach' },
  { name: 'Verde Restaurant' },
  { name: 'Villa Coconut' },
  { name: 'Woohoo' },
  { name: 'Zenon' },
];

function VenueLogo({ venue }: { venue: Venue }) {
  const [imgError, setImgError] = useState(false);

  if (venue.logo && !imgError) {
    return (
      <img
        src={venue.logo}
        alt={venue.name}
        className="h-[72px] w-[72px] rounded-xl object-contain"
        onError={() => setImgError(true)}
        loading="lazy"
      />
    );
  }

  if (venue.domain && !imgError) {
    return (
      <img
        src={`https://www.google.com/s2/favicons?domain=${venue.domain}&sz=128`}
        alt={venue.name}
        className="h-[72px] w-[72px] rounded-xl object-contain"
        onError={() => setImgError(true)}
        loading="lazy"
      />
    );
  }

  const colors = [
    'bg-rose-500/15 text-rose-400',
    'bg-amber-500/15 text-amber-400',
    'bg-emerald-500/15 text-emerald-400',
    'bg-sky-500/15 text-sky-400',
    'bg-violet-500/15 text-violet-400',
    'bg-pink-500/15 text-pink-400',
    'bg-teal-500/15 text-teal-400',
    'bg-orange-500/15 text-orange-400',
  ];
  const colorIndex = venue.name.charCodeAt(0) % colors.length;

  return (
    <div className={`h-[72px] w-[72px] rounded-xl flex items-center justify-center flex-shrink-0 ${colors[colorIndex]}`}>
      <span className="font-bold text-sm">{venue.name.charAt(0)}</span>
    </div>
  );
}

export default function DiningNightlifePage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [bookingVenue, setBookingVenue] = useState<string | null>(null);

  const heroReveal = useScrollReveal<HTMLElement>();
  const featuredReveal = useScrollReveal<HTMLDivElement>();
  const venuesReveal = useScrollReveal<HTMLDivElement>();

  const FEATURED_NAMES = ['Baoli', 'Amelia', 'Billionaire', 'Cou Cou', 'Amazonico', 'Gigi', 'Raspoutine', 'Verde Beach', 'O Beach', 'Opa'];

  const featured = FEATURED_NAMES
    .map(name => VENUES.find(v => v.name === name))
    .filter(Boolean) as Venue[];

  const filtered = search
    ? VENUES.filter(v => v.name.toLowerCase().includes(search.toLowerCase()))
    : VENUES;

  const handleContact = (venue: string) => {
    setBookingVenue(venue);
  };

  return (
    <div className="min-h-screen bg-background pb-24 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <GlobalLanguageSwitcher />
      <FloatingHomeButton />
      <GoldParticles count={8} />

      {/* Hero */}
      <header ref={heroReveal.ref} className={`relative overflow-hidden reveal-base ${heroReveal.isVisible ? 'revealed' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-primary/3 to-transparent" />
        <div className="relative max-w-2xl mx-auto px-4 pt-8 pb-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
            <UtensilsCrossed className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-medium text-primary tracking-wide uppercase">
              {t('diningPage.ourPartners')}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1 font-display">
            {t('mainScreen.diningNightlife')}
          </h1>
          <p className="text-muted-foreground text-xs max-w-md mx-auto">
            {VENUES.length} {t('diningPage.subtitle')}
          </p>
          <div className="w-12 h-px shimmer-line mx-auto mt-3" />
        </div>
      </header>

      {/* Search */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-primary/10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t('diningPage.searchPlaceholder')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-10 h-11 rounded-xl bg-card/60 border-primary/15 focus:border-primary/40"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 pt-4">
        {/* Featured Section */}
        {!search && (
          <div ref={featuredReveal.ref} className={`mb-6 reveal-base ${featuredReveal.isVisible ? 'revealed' : ''}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">{t('diningExtra.topRecommended')}</span>
              <div className="flex-1 h-px bg-primary/15" />
            </div>
            <div className="space-y-2">
              {featured.map((venue, index) => (
                <div
                  key={venue.name}
                  className="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/20 hover:border-primary/40 hover:bg-primary/10 backdrop-blur-sm transition-all duration-200 animate-[fadeIn_0.4s_ease-out]"
                  style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <VenueLogo venue={venue} />
                    <div className="min-w-0">
                      <span className="font-medium text-foreground truncate block">
                        {venue.name}
                      </span>
                      <span className="text-[10px] text-primary font-medium">{t('diningExtra.recommended')}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleContact(venue.name)}
                    className="flex-shrink-0 h-9 px-4 gap-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    {t('diningPage.book')}
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-6 mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('diningExtra.allVenues')}</span>
              <div className="flex-1 h-px bg-border/40" />
            </div>
          </div>
        )}

        {/* Venue List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <p className="text-muted-foreground">{t('diningPage.noResults')} "{search}"</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearch('')}
              className="border-primary/20 text-primary"
            >
              {t('diningPage.clearSearch')}
            </Button>
          </div>
        ) : (
          <div ref={venuesReveal.ref} className={`space-y-2 reveal-base ${venuesReveal.isVisible ? 'revealed' : ''}`}>
            {filtered.map(venue => (
              <div
                key={venue.name}
                className="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-card/50 border border-border/40 hover:border-primary/25 hover:bg-card/80 backdrop-blur-sm transition-all duration-200"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <VenueLogo venue={venue} />
                  <span className="font-medium text-foreground truncate">
                    {venue.name}
                  </span>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleContact(venue.name)}
                  className="flex-shrink-0 h-9 px-4 gap-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  {t('diningPage.book')}
                </Button>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-8 mb-4">
          {t('diningPage.cantFind')}{' '}
          <button
            onClick={() => navigate('/concierge?intent=TABLE')}
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            {t('diningPage.askConcierge')}
          </button>
        </p>
      </main>

      <VenueBookingForm
        open={!!bookingVenue}
        onOpenChange={(open) => !open && setBookingVenue(null)}
        venueName={bookingVenue || ''}
      />

      <BottomNav />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
