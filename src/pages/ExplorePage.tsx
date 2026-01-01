import { useEffect, useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { UtensilsCrossed, Wine, Car, Ship, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LargePageHeader, LuxuryCard, GoldParticles } from '@/components/LuxuryElements';

const categoryIcons: Record<string, React.ElementType> = {
  restaurant: UtensilsCrossed,
  nightlife: Wine,
  transport: Car,
  yacht: Ship,
  event: Calendar,
};

const categoryLabels: Record<string, string> = {
  restaurant: 'Dining',
  nightlife: 'Nightlife',
  transport: 'Transport',
  yacht: 'Yachts',
  event: 'Events',
};

interface Supplier {
  id: string;
  name: string;
  category: string;
  description: string | null;
  location: string | null;
  min_spend: number | null;
  price_range: string | null;
  image_url: string | null;
  tags: string[] | null;
}

export default function ExplorePage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSuppliers() {
      const { data } = await supabase
        .from('suppliers')
        .select('id, name, category, description, location, min_spend, price_range, image_url, tags')
        .eq('is_active', true)
        .order('name');
      
      setSuppliers(data || []);
      setLoading(false);
    }
    fetchSuppliers();
  }, []);

  const categories = Object.keys(categoryLabels);
  const filteredSuppliers = selectedCategory 
    ? suppliers.filter(s => s.category === selectedCategory)
    : suppliers;

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <GoldParticles count={10} />
      
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
        ) : filteredSuppliers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-6">
              {selectedCategory 
                ? `No ${categoryLabels[selectedCategory]} available.`
                : 'No experiences available.'}
            </p>
            <Button 
              onClick={() => navigate('/concierge')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6"
            >
              Ask Concierge
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredSuppliers.map(supplier => {
              const Icon = categoryIcons[supplier.category] || Calendar;
              return (
                <LuxuryCard key={supplier.id} className="overflow-hidden">
                  {supplier.image_url && (
                    <div className="h-44 overflow-hidden">
                      <img 
                        src={supplier.image_url} 
                        alt={supplier.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-foreground text-lg">{supplier.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-primary/80 mt-1">
                          <Icon className="w-4 h-4" strokeWidth={1.5} />
                          <span>{categoryLabels[supplier.category]}</span>
                        </div>
                      </div>
                      {supplier.price_range && (
                        <Badge className="bg-primary/10 text-primary border border-primary/20 text-xs">
                          {supplier.price_range}
                        </Badge>
                      )}
                    </div>

                    {supplier.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {supplier.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {supplier.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {supplier.location}
                        </span>
                      )}
                      {supplier.min_spend && supplier.min_spend > 0 && (
                        <span className="text-primary/80">From ${supplier.min_spend.toLocaleString()}</span>
                      )}
                    </div>

                    {supplier.tags && supplier.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {supplier.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-[10px] px-2.5 py-1 bg-secondary/50">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Button 
                      variant="outline"
                      className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 rounded-xl h-11"
                      onClick={() => navigate(`/concierge?supplier=${encodeURIComponent(supplier.name)}`)}
                    >
                      Book with Concierge
                    </Button>
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
