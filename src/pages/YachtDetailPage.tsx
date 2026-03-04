import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Anchor, Users, MapPin, Clock, Ship, DoorOpen, Sparkles } from 'lucide-react';
import { openWhatsAppConcierge } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { YachtImageCarousel } from '@/components/YachtImageCarousel';

interface YachtPageData {
  title: string;
  subtitle: string;
  size: string;
  capacity: string;
  location: string;
  manufacturer: string;
  cabins: number | null;
  minHours: number;
  price: number;
  currency: string;
  pricingUnit: string;
  inclusions: string[];
  images: { url: string; alt_text: string | null }[];
  description: string;
}

const YACHT_PAGES: Record<string, YachtPageData> = {
  'elite-4': {
    title: 'Elite 4',
    subtitle: '48FT Majesty',
    size: '48FT',
    capacity: '15 PAX',
    location: 'Dubai Marina',
    manufacturer: 'Majesty',
    cabins: 2,
    minHours: 2,
    price: 600,
    currency: 'AED',
    pricingUnit: 'per hour',
    inclusions: [
      'Fuel cost within Dubai',
      'Professional Captain and Crew',
      'Welcome drink',
      'Bottle of water',
      'Surround speaker system (AUX/Bluetooth)',
      'Safety Equipment',
      'Amenities (Fridge, Microwave, Utensils)',
      'Towels for swimming & bathing',
    ],
    images: [
      { url: '/yachts/elite-4-48ft.jpg', alt_text: 'Elite 4 exterior' },
      { url: '/yachts/elite-4-1.jpg', alt_text: 'Elite 4 interior' },
      { url: '/yachts/elite-4-2.jpg', alt_text: 'Elite 4 deck' },
      { url: '/yachts/elite-4-3.jpg', alt_text: 'Elite 4 lounge' },
      { url: '/yachts/elite-4-4.jpg', alt_text: 'Elite 4 cabin' },
    ],
    description: 'Classic 48ft Majesty yacht for up to 15 guests. Minimum 2 hours reservation.',
  },
  'elite-5': {
    title: 'Elite 5',
    subtitle: '36FT Oryx (Mini Sports)',
    size: '36FT',
    capacity: '10 PAX',
    location: 'Dubai Marina',
    manufacturer: 'Oryx',
    cabins: 2,
    minHours: 2,
    price: 600,
    currency: 'AED',
    pricingUnit: 'per hour',
    inclusions: [
      'Fuel cost within Dubai',
      'Professional Captain and Crew',
      'Welcome drink',
      'Bottle of water',
      'Surround speaker system (AUX/Bluetooth)',
      'Safety Equipment',
      'Amenities (Fridge, Microwave, Utensils)',
      'Towels for swimming & bathing',
    ],
    images: [
      { url: '/yachts/elite-5-main.jpg', alt_text: 'Elite 5 exterior and interior collage' },
    ],
    description: 'Sporty 36ft Oryx mini sports yacht for up to 10 guests. Minimum 2 hours reservation.',
  },
  'elite-12': {
    title: 'Elite 12',
    subtitle: '56FT Majesty',
    size: '56FT',
    capacity: '25 PAX',
    location: 'Dubai Marina',
    manufacturer: 'Majesty',
    cabins: 3,
    minHours: 2,
    price: 1200,
    currency: 'AED',
    pricingUnit: 'per hour',
    inclusions: [
      'Fuel cost within Dubai',
      'Professional Captain and Crew',
      'Welcome drink',
      'Bottle of water',
      'Surround speaker system (AUX/Bluetooth)',
      'Safety Equipment',
      'Amenities (Fridge, Microwave, Utensils)',
      'Towels for swimming & bathing',
    ],
    images: [
      { url: '/yachts/elite-12-56ft.jpg', alt_text: 'Elite 12 exterior' },
      { url: '/yachts/elite-12-1.jpg', alt_text: 'Elite 12 interior' },
      { url: '/yachts/elite-12-2.jpg', alt_text: 'Elite 12 deck' },
      { url: '/yachts/elite-12-3.jpg', alt_text: 'Elite 12 lounge' },
      { url: '/yachts/elite-12-4.jpg', alt_text: 'Elite 12 cabin' },
    ],
    description: 'Spacious 56ft Majesty yacht for up to 25 guests. Minimum 2 hours reservation.',
  },
  'elite-14': {
    title: 'Elite 14',
    subtitle: '44FT Majesty',
    size: '44FT',
    capacity: '10 PAX',
    location: 'Dubai Marina',
    manufacturer: 'Majesty',
    cabins: 3,
    minHours: 2,
    price: 700,
    currency: 'AED',
    pricingUnit: 'per hour',
    inclusions: [
      'Fuel cost within Dubai',
      'Professional Captain and Crew',
      'Welcome drink',
      'Bottle of water',
      'Surround speaker system (AUX/Bluetooth)',
      'Safety Equipment',
      'Amenities (Fridge, Microwave, Utensils)',
      'Towels for swimming & bathing',
    ],
    images: [
      { url: '/yachts/elite-14-44ft.jpg', alt_text: 'Elite 14 exterior' },
      { url: '/yachts/elite-14-1.jpg', alt_text: 'Elite 14 interior' },
      { url: '/yachts/elite-14-2.jpg', alt_text: 'Elite 14 deck' },
      { url: '/yachts/elite-14-3.jpg', alt_text: 'Elite 14 lounge' },
      { url: '/yachts/elite-14-4.jpg', alt_text: 'Elite 14 cabin' },
    ],
    description: 'Compact 44ft Majesty yacht for up to 10 guests. Minimum 2 hours reservation.',
  },
  'elite-16': {
    title: 'Elite 16',
    subtitle: '70FT Sunseeker',
    size: '70FT',
    capacity: '22 PAX',
    location: 'Dubai Marina',
    manufacturer: 'Sunseeker',
    cabins: 3,
    minHours: 2,
    price: 1700,
    currency: 'AED',
    pricingUnit: 'per hour',
    inclusions: [
      'Fuel cost within Dubai',
      'Professional Captain and Crew',
      'Welcome drink',
      'Bottle of water',
      'Surround speaker system (AUX/Bluetooth)',
      'Safety Equipment',
      'Amenities (Fridge, Microwave, Utensils)',
      'Towels for swimming & bathing',
    ],
    images: [
      { url: '/yachts/elite-16-70ft.jpg', alt_text: 'Elite 16 exterior' },
      { url: '/yachts/elite-16-1.jpg', alt_text: 'Elite 16 interior' },
      { url: '/yachts/elite-16-2.jpg', alt_text: 'Elite 16 deck' },
      { url: '/yachts/elite-16-3.jpg', alt_text: 'Elite 16 lounge' },
      { url: '/yachts/elite-16-4.jpg', alt_text: 'Elite 16 cabin' },
      { url: '/yachts/elite-16-5.jpg', alt_text: 'Elite 16 flybridge' },
    ],
    description: 'Elegant 70ft Sunseeker yacht for up to 22 guests. Minimum 2 hours reservation.',
  },
  'elite-100': {
    title: 'Elite 100',
    subtitle: '100FT Modern Yacht',
    size: '100FT',
    capacity: '50 PAX',
    location: 'Dubai Marina',
    manufacturer: 'OLAS',
    cabins: 2,
    minHours: 2,
    price: 3500,
    currency: 'AED',
    pricingUnit: 'per hour',
    inclusions: [
      'Fuel cost within Dubai',
      'Professional Captain and Crew',
      'Welcome drink',
      'Bottle of water',
      'Surround speaker system (AUX/Bluetooth)',
      'Safety Equipment',
      'Amenities (Fridge, Microwave, Utensils)',
      'Towels for swimming & bathing',
    ],
    images: [
      { url: '/yachts/elite-100ft.jpg', alt_text: 'Elite 100 exterior' },
      { url: '/yachts/elite-100-1.jpg', alt_text: 'Elite 100 interior' },
      { url: '/yachts/elite-100-2.jpg', alt_text: 'Elite 100 deck' },
      { url: '/yachts/elite-100-3.jpg', alt_text: 'Elite 100 lounge' },
      { url: '/yachts/elite-100-4.jpg', alt_text: 'Elite 100 cabin' },
      { url: '/yachts/elite-100-5.jpg', alt_text: 'Elite 100 flybridge' },
    ],
    description: 'Premium 100ft modern yacht with full luxury amenities. Minimum 2 hours reservation.',
  },
};

// Map catalog item code to slug
export const CODE_TO_SLUG: Record<string, string> = {
  E4: 'elite-4',
  E5: 'elite-5',
  E12: 'elite-12',
  E14: 'elite-14',
  E16: 'elite-16',
  '100FT': 'elite-100',
};

export default function YachtDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const yacht = slug ? YACHT_PAGES[slug] : undefined;

  if (!yacht) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Yacht not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-primary/10 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate('/yachts')}
          className="p-1.5 rounded-full hover:bg-muted transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground truncate">
          {yacht.title} – {yacht.subtitle}
        </h1>
      </div>

      <main className="max-w-2xl mx-auto">
        {/* Hero Image Carousel */}
        <YachtImageCarousel images={yacht.images} title={yacht.title} />

        {/* Specs bar */}
        <div className="bg-card border-b border-primary/10 px-4 py-4">
          <h2 className="text-2xl font-bold text-foreground mb-3">{yacht.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Anchor className="w-4 h-4 text-primary/70" strokeWidth={1.5} />
              <span>{yacht.size}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 text-primary/70" strokeWidth={1.5} />
              <span>{yacht.capacity}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary/70" strokeWidth={1.5} />
              <span>{yacht.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Ship className="w-4 h-4 text-primary/70" strokeWidth={1.5} />
              <span>{yacht.manufacturer}</span>
            </div>
            {yacht.cabins && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <DoorOpen className="w-4 h-4 text-primary/70" strokeWidth={1.5} />
                <span>{yacht.cabins} cabins</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary/70" strokeWidth={1.5} />
              <span>Min {yacht.minHours}h</span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              {yacht.price.toLocaleString()} {yacht.currency}
            </span>
            <span className="text-sm text-muted-foreground">{yacht.pricingUnit}</span>
          </div>

          <p className="text-sm text-muted-foreground mt-2">{yacht.description}</p>
        </div>

        {/* Inclusions */}
        <div className="px-4 py-5">
          <h3 className="text-xs font-medium text-primary/80 uppercase tracking-wider mb-3">
            What's Included
          </h3>
          <ul className="space-y-2">
            {yacht.inclusions.map((inc, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-3.5 h-3.5 text-primary/50 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                {inc}
              </li>
            ))}
          </ul>
        </div>

        {/* Book CTA */}
        <div className="p-4">
          <Button
            onClick={() => openWhatsAppConcierge('YACHT', `Yacht: ${yacht.title} - ${yacht.subtitle}`)}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-12 text-base"
          >
            Book This Yacht
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
