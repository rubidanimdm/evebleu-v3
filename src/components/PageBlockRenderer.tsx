import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PageBlock {
  id: string;
  type: string;
  content: Record<string, any>;
  order: number;
}

interface PageBlockRendererProps {
  block: PageBlock;
}

function TextBlock({ content }: { content: Record<string, any> }) {
  const text = content.text || '';
  const paragraphs = text.split('\n\n');

  return (
    <div className="space-y-4">
      {paragraphs.map((p: string, i: number) => {
        // Detect headings
        if (p.startsWith('### ')) {
          return <h3 key={i} className="text-xl font-semibold text-foreground mt-6 mb-2">{parseInline(p.slice(4))}</h3>;
        }
        if (p.startsWith('## ')) {
          return <h2 key={i} className="text-2xl font-semibold text-foreground mt-8 mb-3">{parseInline(p.slice(3))}</h2>;
        }
        if (p.startsWith('# ')) {
          return <h1 key={i} className="text-3xl font-bold text-foreground mt-8 mb-4">{parseInline(p.slice(2))}</h1>;
        }
        return <p key={i} className="text-muted-foreground leading-relaxed">{parseInline(p)}</p>;
      })}
    </div>
  );
}

function parseInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Italic
    const italicMatch = remaining.match(/\*(.+?)\*/);

    const firstMatch = [boldMatch, italicMatch]
      .filter(Boolean)
      .sort((a, b) => (a!.index ?? 0) - (b!.index ?? 0))[0];

    if (!firstMatch || firstMatch.index === undefined) {
      parts.push(remaining);
      break;
    }

    if (firstMatch.index > 0) {
      parts.push(remaining.slice(0, firstMatch.index));
    }

    if (firstMatch[0].startsWith('**')) {
      parts.push(<strong key={key++} className="text-foreground font-semibold">{firstMatch[1]}</strong>);
    } else {
      parts.push(<em key={key++}>{firstMatch[1]}</em>);
    }

    remaining = remaining.slice(firstMatch.index + firstMatch[0].length);
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

function ImageBlock({ content }: { content: Record<string, any> }) {
  return (
    <figure className="flex flex-col items-center my-6">
      <img
        src={content.url}
        alt={content.alt || ''}
        className="max-w-full rounded-xl shadow-lg"
        loading="lazy"
      />
      {content.caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground italic">{content.caption}</figcaption>
      )}
    </figure>
  );
}

function VideoBlock({ content }: { content: Record<string, any> }) {
  return (
    <div className="my-6 flex justify-center">
      <video
        src={content.url}
        autoPlay={content.autoplay || false}
        muted
        loop
        playsInline
        controls
        className="max-w-full rounded-xl shadow-lg"
      />
    </div>
  );
}

function CtaBlock({ content }: { content: Record<string, any> }) {
  const styleMap: Record<string, string> = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-primary text-primary hover:bg-primary/10',
    ghost: 'text-primary hover:bg-primary/10',
  };
  const style = styleMap[content.style || 'primary'] || styleMap.primary;

  return (
    <div className="flex justify-center my-8">
      <a
        href={content.url || '#'}
        className={`inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium transition-colors ${style}`}
      >
        {content.text || 'Learn More'}
      </a>
    </div>
  );
}

function DividerBlock({ content }: { content: Record<string, any> }) {
  if (content.label) {
    return (
      <div className="relative my-8">
        <hr className="border-primary/15" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-sm text-muted-foreground">
          {content.label}
        </span>
      </div>
    );
  }
  return <hr className="my-8 border-primary/15" />;
}

interface CatalogItem {
  id: string;
  title: string;
  category: string;
  price: number | null;
  image_url: string | null;
  logo_path: string | null;
  location: string | null;
  short_description: string | null;
  is_active: boolean;
  pricing_unit: string | null;
  currency: string | null;
}

function VenueGridBlock({ content }: { content: Record<string, any> }) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      let query = supabase
        .from('catalog_items')
        .select('id, title, category, price, image_url, logo_path, location, short_description, is_active, pricing_unit, currency')
        .eq('is_active', true);

      if (content.categories && content.categories.length > 0) {
        query = query.in('category', content.categories);
      }

      const limit = content.maxItems || 6;
      query = query.limit(limit);

      const { data } = await query;
      setItems((data as CatalogItem[]) || []);
      setLoading(false);
    }
    fetchItems();
  }, [content.categories, content.maxItems]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
        {Array.from({ length: content.maxItems || 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-primary/15 bg-card/40 h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  const isList = content.layout === 'list';

  if (isList) {
    return (
      <div className="space-y-4 my-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 rounded-xl border border-primary/15 bg-card/40 p-4">
            {item.image_url && (
              <img src={item.image_url} alt={item.title} className="w-24 h-24 object-cover rounded-lg shrink-0" loading="lazy" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
              {item.location && <p className="text-sm text-muted-foreground">{item.location}</p>}
              {item.short_description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.short_description}</p>}
              {item.price != null && (
                <p className="text-primary font-medium mt-2">
                  {item.currency || 'AED'} {item.price}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
      {items.map((item) => (
        <div key={item.id} className="rounded-xl border border-primary/15 bg-card/40 overflow-hidden">
          {item.image_url && (
            <img src={item.image_url} alt={item.title} className="w-full h-40 object-cover" loading="lazy" />
          )}
          <div className="p-3">
            <h3 className="font-semibold text-foreground text-sm truncate">{item.title}</h3>
            {item.location && <p className="text-xs text-muted-foreground mt-1">{item.location}</p>}
            {item.short_description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.short_description}</p>}
            {item.price != null && (
              <p className="text-primary font-medium text-sm mt-2">
                {item.currency || 'AED'} {item.price}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function YachtCarouselBlock({ content }: { content: Record<string, any> }) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchYachts() {
      const limit = content.maxItems || 4;
      const { data } = await supabase
        .from('catalog_items')
        .select('id, title, category, price, image_url, logo_path, location, short_description, is_active, pricing_unit, currency')
        .eq('category', 'YACHT')
        .eq('is_active', true)
        .limit(limit);

      setItems((data as CatalogItem[]) || []);
      setLoading(false);
    }
    fetchYachts();
  }, [content.maxItems]);

  if (loading) {
    return (
      <div className="flex gap-4 overflow-hidden my-6">
        {Array.from({ length: content.maxItems || 4 }).map((_, i) => (
          <div key={i} className="w-72 shrink-0 rounded-xl bg-card/40 h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="my-6 -mx-4 px-4">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
        {items.map((item) => (
          <div key={item.id} className="w-72 shrink-0 snap-start rounded-xl border border-primary/15 bg-card/40 overflow-hidden">
            {item.image_url && (
              <img src={item.image_url} alt={item.title} className="w-full h-44 object-cover" loading="lazy" />
            )}
            <div className="p-3">
              <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
              {content.showPrice && item.price != null && (
                <p className="text-primary font-medium text-sm mt-1">
                  {item.currency || 'AED'} {item.price}
                  {item.pricing_unit && <span className="text-muted-foreground font-normal"> / {item.pricing_unit}</span>}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageBlockRenderer({ block }: PageBlockRendererProps) {
  switch (block.type) {
    case 'text':
      return <TextBlock content={block.content} />;
    case 'image':
      return <ImageBlock content={block.content} />;
    case 'video':
      return <VideoBlock content={block.content} />;
    case 'cta':
      return <CtaBlock content={block.content} />;
    case 'divider':
      return <DividerBlock content={block.content} />;
    case 'venue_grid':
      return <VenueGridBlock content={block.content} />;
    case 'yacht_carousel':
      return <YachtCarouselBlock content={block.content} />;
    default:
      return null;
  }
}
