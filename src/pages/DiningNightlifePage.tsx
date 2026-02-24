import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoldParticles } from '@/components/LuxuryElements';
import { useLanguage } from '@/lib/i18n';
import { MessageCircle, Search, UtensilsCrossed, X } from 'lucide-react';

const VENUES = [
  'Adaline', 'African Queen', 'Alaya', 'Amazonico', 'Amelia', 'Aretha',
  'Arrogante', 'Avenue', 'Baoli', 'Bar De Pres', 'BCH:CLB', 'Beach by FIVE',
  'Billionaire', 'Blume', 'Bohemia', 'Carnival', 'Casa Amor', 'Ce La Vi',
  'Chic Nonna', 'Cinque', 'CoveBeach', 'Cou Cou', 'Coya', 'Dream', 'Eva',
  'FIVE Venues', 'GAL', 'Gatsby', 'Gigi', 'Gitano', 'Hanu', "Il'Gatto Pardo",
  'Iliana', 'Kaspia', 'Kinugawa', 'Krasota', "L'amo Bistro", 'La Nina',
  'La Cantine', 'Ly-La', 'Maiden Shanghai', 'Maison De Curry',
  'Maison De La Page', 'Maison Revka', 'Mamabella', 'Mimi Kakushi', 'Mott 32',
  'Nahate', 'Nammos', 'Nazcaa', 'Nikki Beach', 'Ninive beach', 'Nobu',
  'O Beach', 'Opa', 'Ora', 'Pacha Icons', 'Paris Paradis', 'Playa Pacha',
  'Pool by FIVE', 'Ram & Roll', 'Raspoutine', 'Revelry', 'Rialto', 'Sakhalin',
  'Salvaje', 'Sana', 'Sexy Fish', 'Signor Sassi', 'Surf Club', 'Sushi Samba',
  'Tang', 'Tattu', 'Terra Solis', 'Theater', 'Trésind', 'Urla', 'Verde Beach',
  'Verde Restaurant', 'Villa Coconut', 'Woohoo', 'Zenon',
];

export default function DiningNightlifePage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const filtered = search
    ? VENUES.filter(v => v.toLowerCase().includes(search.toLowerCase()))
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
            82 exclusive venues · Tables & VIP bookings through your concierge
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

      {/* Venue Grid */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map(venue => (
              <div
                key={venue}
                className="group flex items-center justify-between gap-3 p-4 rounded-2xl bg-card/60 border border-primary/10 hover:border-primary/25 backdrop-blur-sm transition-all duration-200"
              >
                {/* Venue initial + name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold text-sm">
                      {venue.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-foreground truncate text-sm">
                    {venue}
                  </span>
                </div>

                {/* Contact button */}
                <Button
                  size="sm"
                  onClick={() => handleContact(venue)}
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
