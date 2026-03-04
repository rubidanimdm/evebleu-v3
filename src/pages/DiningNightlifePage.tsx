import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoldParticles } from '@/components/LuxuryElements';
import { VenueBookingForm } from '@/components/VenueBookingForm';
import { useLanguage } from '@/lib/i18n';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, Search, UtensilsCrossed, X } from 'lucide-react';

type Venue = {
  id: string;
  title: string;
  category: string;
  logo_path?: string | null;
  website_url?: string | null;
  location?: string | null;
  google_maps_url?: string | null;
  contact_name?: string | null;
  contact_phone?: string | null;
  contact_email?: string | null;
  instagram_url?: string | null;
  image_url?: string | null;
  short_description?: string | null;
};

type CategoryFilter = 'ALL' | 'DINING' | 'CLUB';

function VenueLogo({ venue }: { venue: Venue }) {
  const [imgError, setImgError] = useState(false);

  // Priority 1: Local logo
  if (venue.logo_path && !imgError) {
    return (
      <img
        src={venue.logo_path}
        alt={venue.title}
        className="h-[72px] w-[72px] rounded-xl object-contain"
        onError={() => setImgError(true)}
        loading="lazy"
      />
    );
  }

  // Priority 2: Google favicon from website_url
  if (venue.website_url && !imgError) {
    const domain = venue.website_url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    return (
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        alt={venue.title}
        className="h-[72px] w-[72px] rounded-xl object-contain"
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
  const colorIndex = venue.title.charCodeAt(0) % colors.length;

  return (
    <div className={`h-[72px] w-[72px] rounded-xl flex items-center justify-center flex-shrink-0 ${colors[colorIndex]}`}>
      <span className="font-bold text-sm">{venue.title.charAt(0)}</span>
    </div>
  );
}

function VenueSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-card/50 border border-border/40 animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="h-[72px] w-[72px] rounded-xl bg-muted/30" />
            <div className="h-4 w-28 rounded bg-muted/30" />
          </div>
          <div className="h-9 w-20 rounded-xl bg-muted/30" />
        </div>
      ))}
    </div>
  );
}

export default function DiningNightlifePage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('ALL');
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [bookingVenue, setBookingVenue] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('catalog_items')
        .select('*')
        .in('category', ['DINING', 'CLUB'])
        .eq('is_active', true)
        .order('title');

      if (!error && data) {
        setVenues(data as Venue[]);
      }
      setLoading(false);
    };
    fetchVenues();
  }, []);

  const FEATURED_NAMES = ['Baoli', 'Amelia', 'Billionaire', 'Cou Cou', 'Amazonico', 'Gigi', 'Raspoutine', 'Verde Beach', 'O Beach', 'Opa'];

  const featured = FEATURED_NAMES
    .map(name => venues.find(v => v.title === name))
    .filter(Boolean) as Venue[];

  const filtered = venues
    .filter(v => categoryFilter === 'ALL' || v.category === categoryFilter)
    .filter(v => !search || v.title.toLowerCase().includes(search.toLowerCase()));

  const handleContact = (venue: string) => {
    setBookingVenue(venue);
  };

  const categoryTabs: { key: CategoryFilter; label: string }[] = [
    { key: 'ALL', label: 'All' },
    { key: 'DINING', label: 'Restaurants' },
    { key: 'CLUB', label: 'Clubs' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <GoldParticles count={8} />

      {/* Hero */}
      <header className="relative overflow-hidden">
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
            {venues.length} {t('diningPage.subtitle')}
          </p>
          <div className="w-12 h-px bg-primary/30 mx-auto mt-3" />
        </div>
      </header>

      {/* Search + Category Tabs */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-primary/10">
        <div className="max-w-2xl mx-auto px-4 py-3 space-y-3">
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
          <div className="flex gap-2">
            {categoryTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setCategoryFilter(tab.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  categoryFilter === tab.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card/60 text-muted-foreground border border-primary/15 hover:border-primary/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Venue List */}
      <main className="max-w-2xl mx-auto px-4 pt-4">
        {/* Featured Section - only when not searching */}
        {!search && !loading && featured.length > 0 && categoryFilter === 'ALL' && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">⭐ {t('diningPage.topRecommended') || 'Our Top 10 Recommended'}</span>
              <div className="flex-1 h-px bg-primary/15" />
            </div>
            <div className="space-y-2">
              {featured.map(venue => (
                <div
                  key={venue.id}
                  className="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/20 hover:border-primary/40 hover:bg-primary/10 backdrop-blur-sm transition-all duration-200"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <VenueLogo venue={venue} />
                    <div className="min-w-0">
                      <span className="font-medium text-foreground truncate block">
                        {venue.title}
                      </span>
                      <span className="text-[10px] text-primary font-medium">{t('diningPage.recommended') || 'Recommended'}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleContact(venue.title)}
                    className="flex-shrink-0 h-9 px-4 gap-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    {t('diningPage.book')}
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-6 mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('diningPage.allVenues') || 'All Venues'}</span>
              <div className="flex-1 h-px bg-border/40" />
            </div>
          </div>
        )}

        {loading ? (
          <VenueSkeleton />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <p className="text-muted-foreground">{t('diningPage.noResults')} "{search}"</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setSearch(''); setCategoryFilter('ALL'); }}
              className="border-primary/20 text-primary"
            >
              {t('diningPage.clearSearch')}
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(venue => (
              <div
                key={venue.id}
                className="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-card/50 border border-border/40 hover:border-primary/25 hover:bg-card/80 backdrop-blur-sm transition-all duration-200"
              >
                {/* Logo + name */}
                <div className="flex items-center gap-4 min-w-0">
                  <VenueLogo venue={venue} />
                  <span className="font-medium text-foreground truncate">
                    {venue.title}
                  </span>
                </div>

                {/* Contact button */}
                <Button
                  size="sm"
                  onClick={() => handleContact(venue.title)}
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
    </div>
  );
}
