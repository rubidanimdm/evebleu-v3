import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { UtensilsCrossed, Music, ArrowRight, Sparkles } from 'lucide-react';
import { LuxuryCard, GoldParticles } from '@/components/LuxuryElements';
import { useLanguage } from '@/lib/i18n';

const subcategories = [
  { key: 'ALL', label: 'All', icon: Sparkles },
  { key: 'DINING', label: 'Dining', icon: UtensilsCrossed },
  { key: 'CLUB', label: 'Nightlife', icon: Music },
];

interface CatalogItem {
  id: string;
  category: string;
  title: string;
  image_url: string | null;
  price: number;
  currency: string;
  pricing_unit: string;
  short_description: string | null;
}

export default function DiningNightlifePage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchItems() {
      const { data } = await supabase
        .from('catalog_items')
        .select('id, category, title, image_url, price, currency, pricing_unit, short_description')
        .eq('is_active', true)
        .in('category', ['DINING', 'CLUB'])
        .order('sort_order');

      setItems(data || []);
      setLoading(false);
    }
    fetchItems();
  }, []);

  const filteredItems = activeFilter === 'ALL'
    ? items
    : items.filter(i => i.category === activeFilter);

  const categoryIcons: Record<string, React.ElementType> = {
    DINING: UtensilsCrossed,
    CLUB: Music,
  };

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <GoldParticles count={10} />

      {/* Hero header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-primary/3 to-transparent" />
        <div className="relative max-w-2xl mx-auto px-4 pt-16 pb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <UtensilsCrossed className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary tracking-wide uppercase">
              {t('mainScreen.diningNightlife')}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {t('mainScreen.diningNightlife')}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            {t('dining.subtitle') !== 'dining.subtitle' ? t('dining.subtitle') : 'Discover Dubai\'s finest restaurants, lounges & nightlife venues'}
          </p>
          <div className="w-16 h-px bg-primary/30 mx-auto mt-6" />
        </div>
      </header>

      {/* Filter tabs */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-primary/10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex gap-2">
            {subcategories.map(sub => {
              const isActive = activeFilter === sub.key;
              return (
                <Button
                  key={sub.key}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter(sub.key)}
                  className={`flex-shrink-0 h-10 px-5 gap-2 rounded-xl ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'border-primary/20 hover:border-primary/40 hover:bg-primary/5'
                  }`}
                >
                  <sub.icon className="w-4 h-4" strokeWidth={1.5} />
                  {sub.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Items grid */}
      <main className="max-w-2xl mx-auto p-4">
        {loading ? (
          <div className="text-center py-16">
            <div className="flex gap-1.5 justify-center">
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <UtensilsCrossed className="w-7 h-7 text-primary/50" />
            </div>
            <p className="text-muted-foreground">
              No venues available yet in this category.
            </p>
            <Button
              onClick={() => navigate('/concierge?intent=TABLE')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 gap-2"
            >
              Ask Concierge
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredItems.map(item => {
              const Icon = categoryIcons[item.category] || Sparkles;
              return (
                <LuxuryCard
                  key={item.id}
                  className="overflow-hidden cursor-pointer hover:border-primary/30 transition-colors"
                  onClick={() => navigate(`/item/${item.id}`)}
                >
                  {item.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-foreground text-lg">{item.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-primary/80 mt-1">
                          <Icon className="w-4 h-4" strokeWidth={1.5} />
                          <span>{item.category === 'DINING' ? 'Restaurant' : 'Nightlife'}</span>
                        </div>
                      </div>
                      <Badge className="bg-primary/10 text-primary border border-primary/20 text-xs whitespace-nowrap">
                        {item.price.toLocaleString()} {item.currency}
                      </Badge>
                    </div>

                    {item.short_description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {item.short_description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-muted-foreground">{item.pricing_unit}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 rounded-lg h-8 px-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/item/${item.id}`);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </LuxuryCard>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
