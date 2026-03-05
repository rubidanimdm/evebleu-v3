import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, MapPin, Calendar, Users, Star, Wifi, Car, Utensils, 
  Waves, Dumbbell, ArrowLeft, ChevronDown, X, Check, Heart, Loader2
} from 'lucide-react';
import { openWhatsAppConcierge } from '@/lib/whatsapp';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/eve-blue-logo-white.gif';

import imgAtlantisRoyal from '@/assets/blog-atlantis-royal.jpg';
import imgAtlantisPalm from '@/assets/blog-atlantis-palm.jpg';
import imgArmaniBurj from '@/assets/blog-armani-burj.jpg';
import imgFivePalm from '@/assets/blog-five-palm.jpg';
import imgJwMarriott from '@/assets/blog-jw-marriott.jpg';
import imgParkHyatt from '@/assets/blog-park-hyatt.jpg';
import imgRixos from '@/assets/blog-rixos.jpg';
import imgShangrila from '@/assets/blog-shangrila.jpg';
import imgSofitel from '@/assets/blog-sofitel.jpg';
import imgMarinaGate from '@/assets/blog-marina-gate.jpg';

interface Hotel {
  id: string;
  name: string;
  nameAr?: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  reviewLabel: string;
  pricePerNight: number;
  originalPrice?: number;
  stars: number;
  amenities: string[];
  description: string;
  distanceFromCenter: string;
  freeCancel?: boolean;
  breakfastIncluded?: boolean;
  tags?: string[];
}

const HOTELS: Hotel[] = [
  {
    id: 'atlantis-royal',
    name: 'Atlantis The Royal',
    location: 'Palm Jumeirah, Dubai',
    image: imgAtlantisRoyal,
    rating: 9.4,
    reviewCount: 3842,
    reviewLabel: 'Superb',
    pricePerNight: 2850,
    originalPrice: 3400,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Beach'],
    description: 'Ultra-luxury resort with stunning skyline views, rooftop infinity pool, and world-class dining by celebrity chefs.',
    distanceFromCenter: '25 km from center',
    freeCancel: true,
    breakfastIncluded: true,
    tags: ['New', 'Top Pick'],
  },
  {
    id: 'five-palm',
    name: 'FIVE Palm Jumeirah',
    location: 'Palm Jumeirah, Dubai',
    image: imgFivePalm,
    rating: 9.1,
    reviewCount: 5120,
    reviewLabel: 'Superb',
    pricePerNight: 1950,
    originalPrice: 2400,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Beach', 'Nightclub'],
    description: 'Iconic beachfront resort with vibrant nightlife, luxury suites, private beach, and multiple infinity pools.',
    distanceFromCenter: '24 km from center',
    freeCancel: true,
    breakfastIncluded: false,
    tags: ['Popular'],
  },
  {
    id: 'armani-burj',
    name: 'Armani Hotel Dubai',
    location: 'Burj Khalifa, Downtown Dubai',
    image: imgArmaniBurj,
    rating: 9.3,
    reviewCount: 2956,
    reviewLabel: 'Superb',
    pricePerNight: 2200,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym'],
    description: 'Designed by Giorgio Armani, located in the iconic Burj Khalifa with breathtaking views of the Dubai Fountain.',
    distanceFromCenter: '1 km from center',
    freeCancel: true,
    breakfastIncluded: true,
    tags: ['Luxury'],
  },
  {
    id: 'atlantis-palm',
    name: 'Atlantis, The Palm',
    location: 'Palm Jumeirah, Dubai',
    image: imgAtlantisPalm,
    rating: 8.7,
    reviewCount: 12480,
    reviewLabel: 'Excellent',
    pricePerNight: 1650,
    originalPrice: 1900,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Waterpark', 'Aquarium'],
    description: 'Legendary resort featuring Aquaventure Waterpark, The Lost Chambers Aquarium, and celebrity restaurants.',
    distanceFromCenter: '26 km from center',
    freeCancel: true,
    breakfastIncluded: false,
    tags: ['Family Friendly'],
  },
  {
    id: 'jw-marriott',
    name: 'JW Marriott Marquis Dubai',
    location: 'Business Bay, Dubai',
    image: imgJwMarriott,
    rating: 8.9,
    reviewCount: 6780,
    reviewLabel: 'Excellent',
    pricePerNight: 980,
    originalPrice: 1200,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym'],
    description: 'One of the tallest hotels in the world, offering premium rooms with panoramic city views and 9 dining venues.',
    distanceFromCenter: '3 km from center',
    freeCancel: true,
    breakfastIncluded: true,
  },
  {
    id: 'park-hyatt',
    name: 'Park Hyatt Dubai',
    location: 'Dubai Creek, Dubai',
    image: imgParkHyatt,
    rating: 9.0,
    reviewCount: 3210,
    reviewLabel: 'Superb',
    pricePerNight: 1450,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Golf'],
    description: 'Elegant waterfront resort on Dubai Creek with lagoon-style pools, marina, and championship golf course.',
    distanceFromCenter: '8 km from center',
    freeCancel: true,
    breakfastIncluded: true,
    tags: ['Quiet Retreat'],
  },
  {
    id: 'rixos-palm',
    name: 'Rixos Premium Dubai JBR',
    location: 'JBR, Dubai',
    image: imgRixos,
    rating: 8.6,
    reviewCount: 4560,
    reviewLabel: 'Excellent',
    pricePerNight: 1350,
    originalPrice: 1600,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Beach', 'All-Inclusive'],
    description: 'All-inclusive beachfront resort with private beach, kids club, and panoramic views of the Arabian Gulf.',
    distanceFromCenter: '30 km from center',
    freeCancel: true,
    breakfastIncluded: true,
    tags: ['All-Inclusive'],
  },
  {
    id: 'shangri-la',
    name: 'Shangri-La Dubai',
    location: 'Sheikh Zayed Road, Dubai',
    image: imgShangrila,
    rating: 8.8,
    reviewCount: 5890,
    reviewLabel: 'Excellent',
    pricePerNight: 890,
    originalPrice: 1100,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym'],
    description: 'Premium hotel on Sheikh Zayed Road with direct Burj Khalifa views, CHI The Spa, and 4 restaurants.',
    distanceFromCenter: '2 km from center',
    freeCancel: true,
    breakfastIncluded: false,
  },
  {
    id: 'sofitel-downtown',
    name: 'Sofitel Dubai Downtown',
    location: 'Downtown Dubai',
    image: imgSofitel,
    rating: 8.5,
    reviewCount: 4120,
    reviewLabel: 'Very Good',
    pricePerNight: 750,
    originalPrice: 950,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym'],
    description: 'French elegance in the heart of Downtown, steps from Dubai Mall and Dubai Fountain with rooftop pool.',
    distanceFromCenter: '1.5 km from center',
    freeCancel: true,
    breakfastIncluded: true,
  },
  {
    id: 'address-marina',
    name: 'Address Dubai Marina',
    location: 'Dubai Marina',
    image: imgMarinaGate,
    rating: 8.9,
    reviewCount: 3640,
    reviewLabel: 'Excellent',
    pricePerNight: 1100,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym'],
    description: 'Modern luxury in Dubai Marina with infinity pool, spa, and stunning marina and sea views.',
    distanceFromCenter: '28 km from center',
    freeCancel: true,
    breakfastIncluded: false,
    tags: ['Marina Views'],
  },
];

function getRatingColor(rating: number) {
  if (rating >= 9) return 'bg-[hsl(215,55%,30%)]';
  if (rating >= 8) return 'bg-[hsl(215,45%,35%)]';
  return 'bg-[hsl(215,40%,40%)]';
}

export default function HotelSearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('Dubai');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [bookingStep, setBookingStep] = useState<'search' | 'details' | 'confirm' | 'done'>('search');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [hasSearched, setHasSearched] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [liveHotels, setLiveHotels] = useState<Hotel[]>([]);
  const [useApi, setUseApi] = useState(false);
  
  // Booking form
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const searchHotelsApi = useCallback(async () => {
    setIsSearching(true);
    try {
      const { data, error } = await supabase.functions.invoke('search-hotels', {
        body: {
          destination: searchQuery || 'Dubai',
          checkIn,
          checkOut,
          guests,
          rooms,
        },
      });

      if (error) throw error;

      if (data?.hotels && data.hotels.length > 0) {
        setLiveHotels(data.hotels);
        setUseApi(true);
      } else {
        // Fallback to static data
        setUseApi(false);
      }
    } catch (err) {
      console.error('Hotel search API error, using static data:', err);
      setUseApi(false);
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  }, [searchQuery, checkIn, checkOut, guests, rooms]);

  const hotelsSource = useApi ? liveHotels : HOTELS;

  const filteredHotels = useMemo(() => {
    let result = [...hotelsSource];
    if (!useApi && searchQuery && searchQuery.toLowerCase() !== 'dubai') {
      result = result.filter(h => 
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.pricePerNight - b.pricePerNight); break;
      case 'price-high': result.sort((a, b) => b.pricePerNight - a.pricePerNight); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [hotelsSource, searchQuery, sortBy, useApi]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setBookingStep('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSubmit = () => {
    if (!selectedHotel || !guestName || !guestPhone) return;
    
    const nights = checkIn && checkOut 
      ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
      : 1;
    const total = selectedHotel.pricePerNight * nights;

    const message = `🏨 Hotel Booking Request\n\n` +
      `Hotel: ${selectedHotel.name}\n` +
      `Location: ${selectedHotel.location}\n` +
      `Check-in: ${checkIn || 'Not specified'}\n` +
      `Check-out: ${checkOut || 'Not specified'}\n` +
      `Nights: ${nights}\n` +
      `Guests: ${guests} | Rooms: ${rooms}\n` +
      `Est. Total: AED ${total.toLocaleString()}\n\n` +
      `Guest: ${guestName}\n` +
      `Phone: ${guestPhone}\n` +
      `Email: ${guestEmail || 'N/A'}\n` +
      (specialRequests ? `Special Requests: ${specialRequests}\n` : '');

    // Send to WhatsApp silently
    const whatsappUrl = `https://wa.me/971551523121?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in background (hidden from user)
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = whatsappUrl;
    document.body.appendChild(iframe);
    setTimeout(() => iframe.remove(), 3000);

    setBookingStep('done');
  };

  // ═══ CONFIRMATION SCREEN ═══
  if (bookingStep === 'done') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-[hsl(var(--success))] flex items-center justify-center mb-6 animate-[fadeIn_0.5s_ease-out]">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Booking Request Received!</h1>
          <p className="text-muted-foreground max-w-sm mb-2">
            Thank you, {guestName}! Your reservation request for <span className="text-foreground font-semibold">{selectedHotel?.name}</span> has been received.
          </p>
          <p className="text-muted-foreground max-w-sm mb-8">
            Our concierge team will contact you shortly to confirm availability and finalize your booking.
          </p>
          <div className="space-y-3 w-full max-w-xs">
            <Button onClick={() => { setBookingStep('search'); setSelectedHotel(null); }} className="w-full h-12 rounded-full bg-primary text-primary-foreground">
              Search More Hotels
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full h-12 rounded-full">
              Back to Home
            </Button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ═══ BOOKING DETAILS FORM ═══
  if (bookingStep === 'details' && selectedHotel) {
    const nights = checkIn && checkOut 
      ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
      : 1;
    const total = selectedHotel.pricePerNight * nights;

    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => setBookingStep('search')} className="p-1">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Complete Your Booking</h1>
        </div>

        <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full space-y-6">
          {/* Hotel summary card */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="flex gap-3 p-3">
              <img src={selectedHotel.image} alt={selectedHotel.name} className="w-24 h-24 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: selectedHotel.stars }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[hsl(var(--warning))] text-[hsl(var(--warning))]" />
                  ))}
                </div>
                <h3 className="font-semibold text-foreground text-sm truncate">{selectedHotel.name}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />{selectedHotel.location}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className={`${getRatingColor(selectedHotel.rating)} text-white text-xs font-bold px-1.5 py-0.5 rounded`}>
                    {selectedHotel.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">{selectedHotel.reviewLabel}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-border px-3 py-2 bg-secondary/30 flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">{nights} night{nights > 1 ? 's' : ''} · {guests} guest{guests > 1 ? 's' : ''}</p>
                <p className="text-xs text-muted-foreground">{checkIn || 'Flexible dates'} → {checkOut || ''}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">AED {total.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">incl. taxes & fees</p>
              </div>
            </div>
          </div>

          {/* Guest details form */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-foreground">Your Details</h2>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Full Name *</label>
                <Input value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Enter your full name" className="h-11 bg-secondary/50 border-border" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Phone Number *</label>
                <Input value={guestPhone} onChange={e => setGuestPhone(e.target.value)} placeholder="+971 XX XXX XXXX" className="h-11 bg-secondary/50 border-border" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Email Address</label>
                <Input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} placeholder="your@email.com" className="h-11 bg-secondary/50 border-border" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Special Requests</label>
                <textarea 
                  value={specialRequests} 
                  onChange={e => setSpecialRequests(e.target.value)} 
                  placeholder="Late check-in, high floor, etc."
                  className="w-full h-20 rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                />
              </div>
            </div>
          </div>

          {/* Price breakdown */}
          <div className="bg-card rounded-xl border border-border p-4 space-y-2">
            <h3 className="text-sm font-semibold text-foreground mb-3">Price Summary</h3>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">AED {selectedHotel.pricePerNight.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</span>
              <span className="text-foreground">AED {(selectedHotel.pricePerNight * nights).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Taxes & fees</span>
              <span className="text-foreground">Included</span>
            </div>
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-foreground text-lg">AED {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Submit */}
          <Button 
            onClick={handleBookingSubmit} 
            disabled={!guestName || !guestPhone}
            className="w-full h-14 rounded-xl bg-[hsl(var(--info))] hover:bg-[hsl(199,85%,45%)] text-white text-base font-bold shadow-lg"
          >
            Complete Reservation
          </Button>
          <p className="text-[10px] text-center text-muted-foreground">By completing this reservation, you agree to our terms of service.</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ═══ MAIN SEARCH VIEW ═══
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero search header */}
      <div className="relative bg-card pt-4 pb-6 px-4 border-b border-border">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/')} className="p-1">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <img src={logo} alt="EVE BLUE" className="h-8 rounded" />
          <div className="w-5" />
        </div>

        {/* Search title */}
        <h1 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-1">Find Your Perfect Hotel</h1>
        <p className="text-sm text-muted-foreground text-center mb-5">Luxury stays in Dubai, curated for you</p>

        {/* Search form — Booking.com style */}
        <div className="bg-[hsl(var(--warning))] p-1 rounded-xl space-y-1">
          {/* Destination */}
          <div className="bg-background rounded-lg flex items-center gap-2 px-3 h-12">
            <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
            <input 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Where are you going?"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}><X className="w-4 h-4 text-muted-foreground" /></button>
            )}
          </div>
          
          {/* Dates row */}
          <div className="flex gap-1">
            <div className="flex-1 bg-background rounded-lg flex items-center gap-2 px-3 h-12">
              <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
              <input 
                type="date" 
                value={checkIn} 
                min={new Date().toISOString().split('T')[0]}
                onChange={e => {
                  setCheckIn(e.target.value);
                  // If checkout is before new check-in, reset it
                  if (checkOut && e.target.value && checkOut <= e.target.value) {
                    setCheckOut('');
                  }
                }}
                placeholder="Check-in"
                className="flex-1 bg-transparent text-sm text-foreground outline-none [color-scheme:dark]"
              />
            </div>
            <div className="flex-1 bg-background rounded-lg flex items-center gap-2 px-3 h-12">
              <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
              <input 
                type="date" 
                value={checkOut} 
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={e => setCheckOut(e.target.value)}
                placeholder="Check-out"
                className="flex-1 bg-transparent text-sm text-foreground outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Guests row */}
          <div className="flex gap-1">
            <div className="flex-1 bg-background rounded-lg flex items-center gap-2 px-3 h-12">
              <Users className="w-4 h-4 text-muted-foreground shrink-0" />
              <select 
                value={guests} 
                onChange={e => setGuests(Number(e.target.value))}
                className="flex-1 bg-transparent text-sm text-foreground outline-none"
              >
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <div className="flex-1 bg-background rounded-lg flex items-center gap-2 px-3 h-12">
              <select 
                value={rooms} 
                onChange={e => setRooms(Number(e.target.value))}
                className="flex-1 bg-transparent text-sm text-foreground outline-none"
              >
                {[1,2,3,4].map(n => <option key={n} value={n}>{n} Room{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
          </div>

          {/* Search button */}
          <Button 
            onClick={() => {
              searchHotelsApi();
              setTimeout(() => {
                document.getElementById('hotel-results')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            disabled={isSearching}
            className="w-full h-12 rounded-lg bg-[hsl(var(--info))] hover:bg-[hsl(199,85%,45%)] text-white font-bold text-base"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Search
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Sort bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-border bg-card/50">
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-semibold">{filteredHotels.length}</span> properties found
        </p>
        <select 
          value={sortBy} 
          onChange={e => setSortBy(e.target.value as typeof sortBy)}
          className="text-xs bg-secondary/50 border border-border text-foreground rounded-md px-2 py-1.5 outline-none"
        >
          <option value="recommended">Recommended</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Hotel listings */}
      <div id="hotel-results" className="flex-1 px-4 py-4 space-y-4 max-w-lg mx-auto w-full">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-colors">
            {/* Image */}
            <div className="relative h-48 sm:h-56">
              <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
              {/* Favorite button */}
              <button 
                onClick={(e) => { e.stopPropagation(); toggleFavorite(hotel.id); }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
              >
                <Heart className={`w-4 h-4 ${favorites.has(hotel.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </button>
              {/* Tags */}
              {hotel.tags && (
                <div className="absolute top-3 left-3 flex gap-1">
                  {hotel.tags.map(tag => (
                    <span key={tag} className="bg-[hsl(var(--info))] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4">
              {/* Stars + Name */}
              <div className="flex items-center gap-1 mb-0.5">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[hsl(var(--warning))] text-[hsl(var(--warning))]" />
                ))}
              </div>
              <h3 className="font-bold text-foreground text-base mb-0.5">{hotel.name}</h3>
              <p className="text-xs text-[hsl(var(--info))] flex items-center gap-1 mb-2">
                <MapPin className="w-3 h-3" />{hotel.location} · {hotel.distanceFromCenter}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`${getRatingColor(hotel.rating)} text-white text-xs font-bold px-2 py-1 rounded`}>
                  {hotel.rating}
                </span>
                <span className="text-sm font-medium text-foreground">{hotel.reviewLabel}</span>
                <span className="text-xs text-muted-foreground">· {hotel.reviewCount.toLocaleString()} reviews</span>
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{hotel.description}</p>

              {/* Amenities */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {hotel.amenities.slice(0, 5).map(a => (
                  <span key={a} className="text-[10px] bg-secondary/60 text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                    {a}
                  </span>
                ))}
                {hotel.amenities.length > 5 && (
                  <span className="text-[10px] text-muted-foreground">+{hotel.amenities.length - 5} more</span>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {hotel.freeCancel && (
                  <span className="text-[10px] text-[hsl(var(--success))] font-medium">✓ Free cancellation</span>
                )}
                {hotel.breakfastIncluded && (
                  <span className="text-[10px] text-[hsl(var(--success))] font-medium">✓ Breakfast included</span>
                )}
              </div>

              {/* Price + Book button */}
              <div className="flex items-end justify-between border-t border-border pt-3">
                <div>
                  <p className="text-[10px] text-muted-foreground">Per night</p>
                  {hotel.originalPrice && (
                    <p className="text-xs text-muted-foreground line-through">AED {hotel.originalPrice.toLocaleString()}</p>
                  )}
                  <p className="text-xl font-bold text-foreground">AED {hotel.pricePerNight.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">incl. taxes & fees</p>
                </div>
                <Button 
                  onClick={() => handleSelectHotel(hotel)}
                  className="h-10 px-5 rounded-lg bg-[hsl(var(--info))] hover:bg-[hsl(199,85%,45%)] text-white font-semibold text-sm"
                >
                  See availability
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
