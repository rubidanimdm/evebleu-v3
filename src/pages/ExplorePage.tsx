import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { UtensilsCrossed, Plane, Car, Hotel, Music, Sparkles } from 'lucide-react';
import { LargePageHeader, LuxuryCard, GoldParticles } from '@/components/LuxuryElements';
import { openWhatsAppConcierge } from '@/lib/whatsapp';

const categoryIcons: Record<string, React.ElementType> = {
  DINING: UtensilsCrossed,
  TRANSPORT: Car,
  HOTEL: Hotel,
  FLIGHT: Plane,
  CLUB: Music,
  EXPERIENCE: Sparkles,
};

const categoryLabels: Record<string, string> = {
  DINING: 'Dining',
  TRANSPORT: 'Transport',
  HOTEL: 'Hotels',
  FLIGHT: 'Flights',
  CLUB: 'Nightlife',
  EXPERIENCE: 'Experiences',
};

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

export default function ExplorePage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Read category from URL params on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryLabels[categoryParam]) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchItems() {
      const { data } = await supabase
        .from('catalog_items')
        .select('id, category, title, image_url, price, currency, pricing_unit, short_description')
        .eq('is_active', true)
        .order('category')
        .order('sort_order');
      
      setItems(data || []);
      setLoading(false);
    }
    fetchItems();
  }, []);

  const categories = Object.keys(categoryLabels);
  const filteredItems = selectedCategory 
    ? items.filter(i => i.category === selectedCategory)
    : items;

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <GoldParticles count={10} />

      {/* Car Video Strip */}


      
      <LargePageHeader 
        title="Explore"
        subtitle="Curated access to Dubai's most exclusive experiences"
      />

      {/* Category Filter */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-primary/10">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={`flex-shrink-0 h-10 px-5 rounded-xl ${
                selectedCategory === null 
                  ? 'bg-primary text-primary-foreground' 
                  : 'border-primary/20 hover:border-primary/40 hover:bg-primary/5'
              }`}
            >
              All
            </Button>
            {categories.map(cat => {
              const Icon = categoryIcons[cat];
              const isActive = selectedCategory === cat;
              return (
                <Button
                  key={cat}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 h-10 px-5 gap-2 rounded-xl ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'border-primary/20 hover:border-primary/40 hover:bg-primary/5'
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  {categoryLabels[cat]}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

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
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-6">
              {selectedCategory 
                ? `No ${categoryLabels[selectedCategory]} available yet.`
                : 'No items available yet.'}
            </p>
            <Button 
              onClick={() => openWhatsAppConcierge()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6"
            >
              Ask Concierge
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
                    <div className="h-44 overflow-hidden">
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
                          <span>{categoryLabels[item.category]}</span>
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
