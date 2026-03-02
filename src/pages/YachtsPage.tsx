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

export default function YachtsPage() {
  const [items, setItems] = useState<YachtItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();

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

      setItems(yachtItems);
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
        title="Yacht Charters"
        subtitle="Sail Dubai's stunning coastline in style"
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
            {/* Yachts Section */}
            {yachts.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Anchor className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  <h2 className="text-lg font-semibold text-foreground tracking-wide">Luxury Yachts</h2>
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
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Fishing Boats Section */}
            {fishingBoats.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Fish className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  <h2 className="text-lg font-semibold text-foreground tracking-wide">Fishing Boats</h2>
                </div>
                <div className="grid gap-4">
                  {fishingBoats.map(boat => (
                    <YachtCard
                      key={boat.id}
                      item={boat}
                      expanded={expandedId === boat.id}
                      onToggle={() => setExpandedId(expandedId === boat.id ? null : boat.id)}
                      onBook={() => openWhatsAppConcierge('YACHT', `Boat: ${boat.title}`)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground mb-3">Need a custom arrangement?</p>
              <Button
                onClick={() => openWhatsAppConcierge('YACHT')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8"
              >
                Talk to Concierge
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
}: {
  item: YachtItem;
  expanded: boolean;
  onToggle: () => void;
  onBook: () => void;
  onNavigateDetail?: () => void;
}) {
  const { details } = item;

  return (
    <LuxuryCard className="overflow-hidden transition-all duration-300">
      {/* Image Carousel */}
      <YachtImageCarousel images={item.gallery} title={item.title} />
      {/* Header - always visible */}
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
                  Up to {item.max_people} guests
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                Min {details.min_hours}h
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
                  {details.cabins} cabins
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
          <span>{onNavigateDetail ? 'View full details' : (expanded ? 'Hide details' : 'View inclusions')}</span>
        </div>
      </div>

      {/* Expandable details */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-primary/10 pt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {details.inclusions.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-primary/80 uppercase tracking-wider mb-2">
                What's Included
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
            Book This {details.type === 'fishing' ? 'Boat' : 'Yacht'}
          </Button>
        </div>
      )}
    </LuxuryCard>
  );
}
