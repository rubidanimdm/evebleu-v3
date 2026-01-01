import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { LargePageHeader, GoldParticles } from '@/components/LuxuryElements';

interface CatalogItem {
  id: string;
  category: string;
  title: string;
  image_url: string | null;
  price: number;
  currency: string;
  pricing_unit: string;
  short_description: string | null;
  details: Record<string, string>;
}

export default function ItemDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<CatalogItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      if (!id) return;
      
      const { data, error } = await supabase
        .from('catalog_items')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (!error && data) {
        setItem({
          ...data,
          details: (data.details as Record<string, string>) || {},
        });
      }
      setLoading(false);
    }
    fetchItem();
  }, [id]);

  const handleRequestConcierge = () => {
    if (!item) return;
    const message = `I'm interested in: ${item.title} (${item.price.toLocaleString()} ${item.currency} ${item.pricing_unit})`;
    navigate(`/concierge?intent=CUSTOM_REQUEST&context=${encodeURIComponent(message)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
          <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background pb-24 relative">
        <GoldParticles count={10} />
        <LargePageHeader title="Not Found" subtitle="This item is no longer available" />
        <main className="max-w-2xl mx-auto p-4 text-center">
          <Button onClick={() => navigate('/explore')} className="bg-primary text-primary-foreground rounded-xl">
            Browse Catalog
          </Button>
        </main>
        <BottomNav />
      </div>
    );
  }

  const detailEntries = Object.entries(item.details).filter(([_, v]) => v);

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <GoldParticles count={10} />
      
      {/* Back Button */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-primary/10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2 text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      {item.image_url && (
        <div className="w-full h-64 md:h-80 overflow-hidden">
          <img 
            src={item.image_url} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Title & Price */}
        <div className="space-y-3">
          <Badge className="bg-primary/10 text-primary border border-primary/20">{item.category}</Badge>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground">{item.title}</h1>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">
              {item.price.toLocaleString()} {item.currency}
            </span>
            <span className="text-muted-foreground">/ {item.pricing_unit.replace('per ', '')}</span>
          </div>
        </div>

        {/* Description */}
        {item.short_description && (
          <div className="space-y-2">
            <p className="text-muted-foreground leading-relaxed">{item.short_description}</p>
          </div>
        )}

        {/* Details */}
        {detailEntries.length > 0 && (
          <div className="bg-card/50 border border-primary/10 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-medium text-primary uppercase tracking-wider">Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {detailEntries.map(([key, value]) => (
                <div key={key}>
                  <p className="text-xs text-muted-foreground capitalize">{key.replace('_', ' ')}</p>
                  <p className="text-foreground font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="pt-4">
          <Button
            onClick={handleRequestConcierge}
            size="lg"
            className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-base gap-3"
          >
            <MessageCircle className="w-5 h-5" />
            Request via Concierge
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Our concierge will assist with booking and special requests
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
