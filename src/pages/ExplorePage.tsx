import { useEffect, useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { UtensilsCrossed, Wine, Car, Ship, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur border-b border-border/50 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-lg font-medium text-foreground">Explore</h1>
          <p className="text-sm text-muted-foreground">Curated experiences in Dubai</p>
        </div>
      </header>

      {/* Category Filter */}
      <div className="sticky top-[57px] z-30 bg-background/95 backdrop-blur border-b border-border/30">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="flex-shrink-0 h-9 px-4 border-border/50"
            >
              All
            </Button>
            {categories.map(cat => {
              const Icon = categoryIcons[cat];
              return (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="flex-shrink-0 h-9 px-4 gap-2 border-border/50"
                >
                  <Icon className="w-4 h-4" />
                  {categoryLabels[cat]}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto p-4">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading...
          </div>
        ) : filteredSuppliers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {selectedCategory 
                ? `No ${categoryLabels[selectedCategory]} available.`
                : 'No options available.'}
            </p>
            <Button onClick={() => navigate('/')}>
              Ask Concierge
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredSuppliers.map(supplier => {
              const Icon = categoryIcons[supplier.category] || Calendar;
              return (
                <Card key={supplier.id} className="overflow-hidden border-border/50 bg-card">
                  {supplier.image_url && (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={supplier.image_url} 
                        alt={supplier.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-foreground">{supplier.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Icon className="w-3.5 h-3.5" />
                          <span>{categoryLabels[supplier.category]}</span>
                        </div>
                      </div>
                      {supplier.price_range && (
                        <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                          {supplier.price_range}
                        </Badge>
                      )}
                    </div>

                    {supplier.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {supplier.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {supplier.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {supplier.location}
                        </span>
                      )}
                      {supplier.min_spend && supplier.min_spend > 0 && (
                        <span>From ${supplier.min_spend.toLocaleString()}</span>
                      )}
                    </div>

                    {supplier.tags && supplier.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {supplier.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Button 
                      variant="outline"
                      size="sm"
                      className="w-full border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50"
                      onClick={() => navigate(`/?supplier=${encodeURIComponent(supplier.name)}`)}
                    >
                      Book with Concierge
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
