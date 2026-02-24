import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoldParticles } from '@/components/LuxuryElements';
import { useLanguage } from '@/lib/i18n';
import { MessageCircle, Search, UtensilsCrossed, X } from 'lucide-react';

type Venue = {
  name: string;
  domain?: string;
  logo?: string;
};

const VENUES: Venue[] = [
  { name: 'Adaline', logo: '/logos/adaline.jpeg' },
  { name: 'African Queen', logo: '/logos/african-queen.png' },
  { name: 'Alaya' },
  { name: 'Amazonico', domain: 'amazonicorestaurant.com' },
  { name: 'Amelia' },
  { name: 'Aretha' },
  { name: 'Arrogante' },
  { name: 'Avenue', domain: 'avenuedubai.com' },
  { name: 'Baoli', domain: 'bfrgroup.com' },
  { name: 'Bar De Pres' },
  { name: 'BCH:CLB' },
  { name: 'Beach by FIVE', domain: 'fivehotelsandresorts.com' },
  { name: 'Billionaire', domain: 'billionairelife.com' },
  { name: 'Blume' },
  { name: 'Bohemia' },
  { name: 'Carnival' },
  { name: 'Casa Amor' },
  { name: 'Ce La Vi', domain: 'celavi.com' },
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

  // Priority 1: Local logo
  if (venue.logo && !imgError) {
    return (
      <img
        src={venue.logo}
        alt={venue.name}
        className="w-10 h-10 rounded-xl object-contain bg-white p-1"
        onError={() => setImgError(true)}
        loading="lazy"
      />
    );
  }

  // Priority 2: Google favicon
  if (venue.domain && !imgError) {
    return (
      <img
        src={`https://www.google.com/s2/favicons?domain=${venue.domain}&sz=128`}
        alt={venue.name}
        className="w-10 h-10 rounded-xl object-contain bg-white p-1"
        onError={() => setImgError(true)}
        loading="lazy"
      />
    );
  }

  // Fallback: styled initial
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
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors[colorIndex]}`}>
      <span className="font-bold text-sm">{venue.name.charAt(0)}</span>
    </div>
  );
}

export default function DiningNightlifePage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const filtered = search
    ? VENUES.filter(v => v.name.toLowerCase().includes(search.toLowerCase()))
    : VENUES;

  const handleContact = (venue: string) => {
    navigate(`/concierge?intent=TABLE&supplier=${encodeURIComponent(venue)}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <GoldParticles count={8} />

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-primary/3 to-transparent" />
        <div className="relative max-w-2xl mx-auto px-4 pt-14 pb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <UtensilsCrossed className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary tracking-wide uppercase">
              Our Partners
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 font-display">
            {t('mainScreen.diningNightlife')}
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            {VENUES.length} exclusive venues · Tables & VIP bookings through your concierge
          </p>
          <div className="w-16 h-px bg-primary/30 mx-auto mt-5" />
        </div>
      </header>

      {/* Search */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-primary/10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search venues..."
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

      {/* Venue List */}
      <main className="max-w-2xl mx-auto px-4 pt-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <p className="text-muted-foreground">No venues found for "{search}"</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearch('')}
              className="border-primary/20 text-primary"
            >
              Clear search
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(venue => (
              <div
                key={venue.name}
                className="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-card/50 border border-border/40 hover:border-primary/25 hover:bg-card/80 backdrop-blur-sm transition-all duration-200"
              >
                {/* Logo + name */}
                <div className="flex items-center gap-4 min-w-0">
                  <VenueLogo venue={venue} />
                  <span className="font-medium text-foreground truncate">
                    {venue.name}
                  </span>
                </div>

                {/* Contact button */}
                <Button
                  size="sm"
                  onClick={() => handleContact(venue.name)}
                  className="flex-shrink-0 h-9 px-4 gap-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Book
                </Button>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-8 mb-4">
          Can't find what you're looking for?{' '}
          <button
            onClick={() => navigate('/concierge?intent=TABLE')}
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            Ask your concierge
          </button>
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
