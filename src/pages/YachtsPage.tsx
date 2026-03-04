import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { openWhatsAppConcierge } from '@/lib/whatsapp';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Anchor, Fish, Users, Clock, MapPin, ChevronRight, Sparkles, Ship, DoorOpen } from 'lucide-react';
import { LargePageHeader, LuxuryCard, GoldParticles } from '@/components/LuxuryElements';
import { YachtImageCarousel } from '@/components/YachtImageCarousel';
import { CODE_TO_SLUG } from '@/pages/YachtDetailPage';
import { useLanguage } from '@/lib/i18n';
import type { Json } from '@/integrations/supabase/types';

interface YachtDetails {
  length: string;
  code: string;
  type: 'yacht' | 'fishing';
  min_hours: number;
  inclusions: string[];
  manufacturer?: string;
  cabins?: number;
}

interface MediaItem {
  url: string;
  alt_text: string | null;
  sort_order: number;
}

interface YachtItem {
  id: string;
  title: string;
  price: number;
  currency: string;
  pricing_unit: string;
  short_description: string | null;
  location: string | null;
  max_people: number | null;
  duration_minutes: number | null;
  image_url: string | null;
  details: YachtDetails;
  gallery: MediaItem[];
}

function parseDetails(d: Json | null): YachtDetails {
  if (d && typeof d === 'object' && !Array.isArray(d)) {
    return d as unknown as YachtDetails;
  }
  return { length: '', code: '', type: 'yacht', min_hours: 2, inclusions: [] };
}

// Hardcoded fallback when DB has no yacht catalog items
const FALLBACK_YACHTS: YachtItem[] = [
  {
    id: 'fallback-e4', title: 'Elite 4', price: 600, currency: 'AED', pricing_unit: 'per hour',
    short_description: 'Classic 48ft Majesty yacht for up to 15 guests.', location: 'Dubai Marina',
    max_people: 15, duration_minutes: 120, image_url: '/yachts/elite-4-48ft.jpg',
    details: { length: '48FT', code: 'E4', type: 'yacht', min_hours: 2, inclusions: ['Fuel cost within Dubai', 'Professional Captain and Crew', 'Welcome drink', 'Bottle of water', 'Surround speaker system (AUX/Bluetooth)', 'Safety Equipment', 'Amenities (Fridge, Microwave, Utensils)', 'Towels for swimming & bathing'], manufacturer: 'Majesty', cabins: 2 },
    gallery: [{ url: '/yachts/elite-4-48ft.jpg', alt_text: 'Elite 4 exterior', sort_order: 0 }, { url: '/yachts/elite-4-1.jpg', alt_text: 'Elite 4 interior', sort_order: 1 }, { url: '/yachts/elite-4-2.jpg', alt_text: 'Elite 4 deck', sort_order: 2 }, { url: '/yachts/elite-4-3.jpg', alt_text: 'Elite 4 lounge', sort_order: 3 }, { url: '/yachts/elite-4-4.jpg', alt_text: 'Elite 4 cabin', sort_order: 4 }],
  },
  {
    id: 'fallback-e5', title: 'Elite 5', price: 600, currency: 'AED', pricing_unit: 'per hour',
    short_description: 'Sporty 36ft Oryx mini sports yacht for up to 10 guests.', location: 'Dubai Marina',
    max_people: 10, duration_minutes: 120, image_url: '/yachts/elite-5-36ft.jpg',
    details: { length: '36FT', code: 'E5', type: 'yacht', min_hours: 2, inclusions: ['Fuel cost within Dubai', 'Professional Captain and Crew', 'Welcome drink', 'Bottle of water', 'Surround speaker system (AUX/Bluetooth)', 'Safety Equipment', 'Amenities (Fridge, Microwave, Utensils)', 'Towels for swimming & bathing'], manufacturer: 'Oryx', cabins: 2 },
    gallery: [{ url: '/yachts/elite-5-36ft.jpg', alt_text: 'Elite 5 exterior', sort_order: 0 }, { url: '/yachts/elite-5-1.jpg', alt_text: 'Elite 5 interior', sort_order: 1 }, { url: '/yachts/elite-5-2.jpg', alt_text: 'Elite 5 deck', sort_order: 2 }, { url: '/yachts/elite-5-3.jpg', alt_text: 'Elite 5 seating', sort_order: 3 }, { url: '/yachts/elite-5-4.jpg', alt_text: 'Elite 5 cabin', sort_order: 4 }],
  },
  {
    id: 'fallback-e14', title: 'Elite 14', price: 700, currency: 'AED', pricing_unit: 'per hour',
    short_description: 'Compact 44ft Majesty yacht for up to 10 guests.', location: 'Dubai Marina',
    max_people: 10, duration_minutes: 120, image_url: '/yachts/elite-14-44ft.jpg',
    details: { length: '44FT', code: 'E14', type: 'yacht', min_hours: 2, inclusions: ['Fuel cost within Dubai', 'Professional Captain and Crew', 'Welcome drink', 'Bottle of water', 'Surround speaker system (AUX/Bluetooth)', 'Safety Equipment', 'Amenities (Fridge, Microwave, Utensils)', 'Towels for swimming & bathing'], manufacturer: 'Majesty', cabins: 3 },
    gallery: [{ url: '/yachts/elite-14-44ft.jpg', alt_text: 'Elite 14 exterior', sort_order: 0 }, { url: '/yachts/elite-14-1.jpg', alt_text: 'Elite 14 interior', sort_order: 1 }, { url: '/yachts/elite-14-2.jpg', alt_text: 'Elite 14 deck', sort_order: 2 }, { url: '/yachts/elite-14-3.jpg', alt_text: 'Elite 14 lounge', sort_order: 3 }, { url: '/yachts/elite-14-4.jpg', alt_text: 'Elite 14 cabin', sort_order: 4 }],
  },
  {
    id: 'fallback-e12', title: 'Elite 12', price: 1200, currency: 'AED', pricing_unit: 'per hour',
    short_description: 'Spacious 56ft Majesty yacht for up to 25 guests.', location: 'Dubai Marina',
    max_people: 25, duration_minutes: 120, image_url: '/yachts/elite-12-56ft.jpg',
    details: { length: '56FT', code: 'E12', type: 'yacht', min_hours: 2, inclusions: ['Fuel cost within Dubai', 'Professional Captain and Crew', 'Welcome drink', 'Bottle of water', 'Surround speaker system (AUX/Bluetooth)', 'Safety Equipment', 'Amenities (Fridge, Microwave, Utensils)', 'Towels for swimming & bathing'], manufacturer: 'Majesty', cabins: 3 },
    gallery: [{ url: '/yachts/elite-12-56ft.jpg', alt_text: 'Elite 12 exterior', sort_order: 0 }, { url: '/yachts/elite-12-1.jpg', alt_text: 'Elite 12 interior', sort_order: 1 }, { url: '/yachts/elite-12-2.jpg', alt_text: 'Elite 12 deck', sort_order: 2 }, { url: '/yachts/elite-12-3.jpg', alt_text: 'Elite 12 lounge', sort_order: 3 }, { url: '/yachts/elite-12-4.jpg', alt_text: 'Elite 12 cabin', sort_order: 4 }],
  },
  {
    id: 'fallback-e16', title: 'Elite 16', price: 1700, currency: 'AED', pricing_unit: 'per hour',
    short_description: 'Elegant 70ft Sunseeker yacht for up to 22 guests.', location: 'Dubai Marina',
    max_people: 22, duration_minutes: 120, image_url: '/yachts/elite-16-70ft.jpg',
    details: { length: '70FT', code: 'E16', type: 'yacht', min_hours: 2, inclusions: ['Fuel cost within Dubai', 'Professional Captain and Crew', 'Welcome drink', 'Bottle of water', 'Surround speaker system (AUX/Bluetooth)', 'Safety Equipment', 'Amenities (Fridge, Microwave, Utensils)', 'Towels for swimming & bathing'], manufacturer: 'Sunseeker', cabins: 3 },
    gallery: [{ url: '/yachts/elite-16-70ft.jpg', alt_text: 'Elite 16 exterior', sort_order: 0 }, { url: '/yachts/elite-16-1.jpg', alt_text: 'Elite 16 interior', sort_order: 1 }, { url: '/yachts/elite-16-2.jpg', alt_text: 'Elite 16 deck', sort_order: 2 }, { url: '/yachts/elite-16-3.jpg', alt_text: 'Elite 16 lounge', sort_order: 3 }, { url: '/yachts/elite-16-4.jpg', alt_text: 'Elite 16 cabin', sort_order: 4 }, { url: '/yachts/elite-16-5.jpg', alt_text: 'Elite 16 flybridge', sort_order: 5 }],
  },
  {
    id: 'fallback-e100', title: 'Elite 100', price: 3500, currency: 'AED', pricing_unit: 'per hour',
    short_description: 'Premium 100ft modern yacht with full luxury amenities.', location: 'Dubai Marina',
    max_people: 50, duration_minutes: 120, image_url: '/yachts/elite-100ft.jpg',
    details: { length: '100FT', code: '100FT', type: 'yacht', min_hours: 2, inclusions: ['Fuel cost within Dubai', 'Professional Captain and Crew', 'Welcome drink', 'Bottle of water', 'Surround speaker system (AUX/Bluetooth)', 'Safety Equipment', 'Amenities (Fridge, Microwave, Utensils)', 'Towels for swimming & bathing'], manufacturer: 'OLAS', cabins: 2 },
    gallery: [{ url: '/yachts/elite-100ft.jpg', alt_text: 'Elite 100 exterior', sort_order: 0 }, { url: '/yachts/elite-100-1.jpg', alt_text: 'Elite 100 interior', sort_order: 1 }, { url: '/yachts/elite-100-2.jpg', alt_text: 'Elite 100 deck', sort_order: 2 }, { url: '/yachts/elite-100-3.jpg', alt_text: 'Elite 100 lounge', sort_order: 3 }, { url: '/yachts/elite-100-4.jpg', alt_text: 'Elite 100 cabin', sort_order: 4 }, { url: '/yachts/elite-100-5.jpg', alt_text: 'Elite 100 flybridge', sort_order: 5 }],
  },
];

export default function YachtsPage() {
  const [items, setItems] = useState<YachtItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchYachts() {
      const [{ data }, { data: mediaData }] = await Promise.all([
        supabase
          .from('catalog_items')
          .select('id, title, price, currency, pricing_unit, short_description, location, max_people, duration_minutes, image_url, details')
          .eq('is_active', true)
          .eq('category', 'EXPERIENCE')
          .order('sort_order'),
        supabase
          .from('service_media')
          .select('catalog_item_id, url, alt_text, sort_order')
          .order('sort_order'),
      ]);

      const mediaMap = new Map<string, MediaItem[]>();
      (mediaData || []).forEach(m => {
        const list = mediaMap.get(m.catalog_item_id) || [];
        list.push({ url: m.url, alt_text: m.alt_text, sort_order: m.sort_order });
        mediaMap.set(m.catalog_item_id, list);
      });

      const yachtItems = (data || [])
        .filter(item => {
          const d = parseDetails(item.details);
          return d.type === 'yacht' || d.type === 'fishing';
        })
        .map(item => ({
          ...item,
          details: parseDetails(item.details),
          gallery: mediaMap.get(item.id) || (item.image_url ? [{ url: item.image_url, alt_text: item.title, sort_order: 0 }] : []),
        }));

      // Use fallback data if DB has no yacht items
      setItems(yachtItems.length > 0 ? yachtItems : FALLBACK_YACHTS);
      setLoading(false);
    }
    fetchYachts();
  }, []);

  const yachts = items.filter(i => i.details.type === 'yacht').sort((a, b) => a.price - b.price);
  const fishingBoats = items.filter(i => i.details.type === 'fishing').sort((a, b) => a.price - b.price);

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <GoldParticles count={12} />

      <LargePageHeader
        title={t('yachtsPage.title')}
        subtitle={t('yachtsPage.subtitle')}
      />

      <main className="max-w-2xl mx-auto p-4 space-y-8">
        {loading ? (
          <div className="text-center py-16">
            <div className="flex gap-1.5 justify-center">
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        ) : (
          <>
            {yachts.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Anchor className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  <h2 className="text-lg font-semibold text-foreground tracking-wide">{t('yachtsPage.luxuryYachts')}</h2>
                </div>
                <div className="grid gap-4">
                  {yachts.map(yacht => (
                    <YachtCard
                      key={yacht.id}
                      item={yacht}
                      expanded={expandedId === yacht.id}
                      onToggle={() => setExpandedId(expandedId === yacht.id ? null : yacht.id)}
                      onBook={() => openWhatsAppConcierge('YACHT', `Yacht: ${yacht.title}`)}
                      onNavigateDetail={
                        CODE_TO_SLUG[yacht.details.code]
                          ? () => navigate(`/yachts/${CODE_TO_SLUG[yacht.details.code]}`)
                          : undefined
                      }
                      t={t}
                    />
                  ))}
                </div>
              </section>
            )}

            {fishingBoats.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Fish className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  <h2 className="text-lg font-semibold text-foreground tracking-wide">{t('yachtsPage.fishingBoats')}</h2>
                </div>
                <div className="grid gap-4">
                  {fishingBoats.map(boat => (
                    <YachtCard
                      key={boat.id}
                      item={boat}
                      expanded={expandedId === boat.id}
                      onToggle={() => setExpandedId(expandedId === boat.id ? null : boat.id)}
                      onBook={() => openWhatsAppConcierge('YACHT', `Boat: ${boat.title}`)}
                      t={t}
                    />
                  ))}
                </div>
              </section>
            )}

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground mb-3">{t('yachtsPage.customArrangement')}</p>
              <Button
                onClick={() => openWhatsAppConcierge('YACHT')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8"
              >
                {t('yachtsPage.talkToConcierge')}
              </Button>
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

function YachtCard({
  item,
  expanded,
  onToggle,
  onBook,
  onNavigateDetail,
  t,
}: {
  item: YachtItem;
  expanded: boolean;
  onToggle: () => void;
  onBook: () => void;
  onNavigateDetail?: () => void;
  t: (key: string) => string;
}) {
  const { details } = item;

  return (
    <LuxuryCard className="overflow-hidden transition-all duration-300">
      <YachtImageCarousel images={item.gallery} title={item.title} />
      <div
        className="p-5 cursor-pointer"
        onClick={onNavigateDetail || onToggle}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-base leading-tight">{item.title}</h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Anchor className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                {details.length}
              </span>
              {item.max_people && (
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                  {t('yachtsPage.upToGuests').replace('{n}', String(item.max_people))}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                {t('yachtsPage.minHours').replace('{n}', String(details.min_hours))}
              </span>
              {item.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                  {item.location}
                </span>
              )}
              {details.manufacturer && (
                <span className="flex items-center gap-1">
                  <Ship className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                  {details.manufacturer}
                </span>
              )}
              {details.cabins && (
                <span className="flex items-center gap-1">
                  <DoorOpen className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                  {t('yachtsPage.cabins').replace('{n}', String(details.cabins))}
                </span>
              )}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <Badge className="bg-primary/10 text-primary border border-primary/20 text-sm font-semibold whitespace-nowrap">
              {item.price.toLocaleString()} {item.currency}
            </Badge>
            <p className="text-[10px] text-muted-foreground mt-1">{item.pricing_unit}</p>
          </div>
        </div>

        {item.short_description && (
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{item.short_description}</p>
        )}

        <div className="flex items-center gap-1 mt-3 text-xs text-primary/60">
          <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${!onNavigateDetail && expanded ? 'rotate-90' : ''}`} />
          <span>
            {onNavigateDetail
              ? t('yachtsPage.viewFullDetails')
              : (expanded ? t('yachtsPage.hideDetails') : t('yachtsPage.viewInclusions'))}
          </span>
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 border-t border-primary/10 pt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {details.inclusions.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-primary/80 uppercase tracking-wider mb-2">
                {t('yachtsPage.whatsIncluded')}
              </h4>
              <ul className="space-y-1.5">
                {details.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-3.5 h-3.5 text-primary/50 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button
            onClick={(e) => {
              e.stopPropagation();
              onBook();
            }}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-11"
          >
            {details.type === 'fishing' ? t('yachtsPage.bookThisBoat') : t('yachtsPage.bookThisYacht')}
          </Button>
        </div>
      )}
    </LuxuryCard>
  );
}
