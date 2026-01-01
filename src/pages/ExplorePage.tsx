import { useEffect, useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Utensils, Wine, Car, Sailboat, PartyPopper, MapPin, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categoryIcons: Record<string, React.ElementType> = {
  restaurant: Utensils,
  nightlife: Wine,
  transport: Car,
  yacht: Sailboat,
  event: PartyPopper,
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
        .select('*')
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
      <header className="bg-card/80 backdrop-blur border-b border-border px-4 py-4 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-semibold text-foreground">Explore</h1>
          <p className="text-sm text-muted-foreground">Discover luxury experiences</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="flex-shrink-0"
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
                className="flex-shrink-0 gap-2"
              >
                <Icon className="w-4 h-4" />
                {categoryLabels[cat]}
              </Button>
            );
          })}
        </div>

        {/* Suppliers Grid */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading experiences...
          </div>
        ) : filteredSuppliers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {selectedCategory 
                ? `No ${categoryLabels[selectedCategory]} experiences available yet.`
                : 'No experiences available yet.'}
            </p>
            <Button variant="outline" onClick={() => navigate('/')}>
              Ask Concierge
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredSuppliers.map(supplier => {
              const Icon = categoryIcons[supplier.category] || PartyPopper;
              return (
                <Card key={supplier.id} className="overflow-hidden">
                  {supplier.image_url && (
                    <div 
                      className="h-40 bg-cover bg-center"
                      style={{ backgroundImage: `url(${supplier.image_url})` }}
                    />
                  )}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{supplier.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon className="w-4 h-4" />
                          <span>{categoryLabels[supplier.category]}</span>
                        </div>
                      </div>
                      {supplier.price_range && (
                        <Badge variant="secondary" className="flex-shrink-0">
                          {supplier.price_range}
                        </Badge>
                      )}
                    </div>

                    {supplier.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {supplier.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 text-xs">
                      {supplier.location && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {supplier.location}
                        </span>
                      )}
                      {supplier.min_spend && supplier.min_spend > 0 && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="w-3 h-3" />
                          Min ${supplier.min_spend}
                        </span>
                      )}
                    </div>

                    {supplier.tags && supplier.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {supplier.tags.slice(0, 4).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Button 
                      className="w-full"
                      onClick={() => navigate(`/?supplier=${supplier.name}`)}
                    >
                      Inquire with Concierge
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
