import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, MapPin, Calendar, Users, Star, Wifi, Car, Utensils, 
  Waves, Dumbbell, ArrowLeft, ChevronDown, X, Check, Heart, Loader2, SlidersHorizontal, Map
} from 'lucide-react';
import { openWhatsAppConcierge } from '@/lib/whatsapp';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/lib/i18n';
import logo from '@/assets/eve-blue-logo-white.gif';
import HotelFilterSidebar, { type HotelFilters, type MapHotel } from '@/components/HotelFilterSidebar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import HotelMapView from '@/components/HotelMapView';

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
  nameHe?: string;
  location: string;
  locationHe?: string;
  image: string;
  rating: number;
  reviewCount: number;
  reviewLabel: string;
  reviewLabelHe?: string;
  pricePerNight: number;
  originalPrice?: number;
  stars: number;
  amenities: string[];
  amenitiesHe?: string[];
  description: string;
  descriptionHe?: string;
  distanceFromCenter: string;
  distanceHe?: string;
  freeCancel?: boolean;
  breakfastIncluded?: boolean;
  tags?: string[];
  tagsHe?: string[];
  lat?: number;
  lng?: number;
}

const HOTELS: Hotel[] = [
  {
    id: 'atlantis-royal',
    name: 'Atlantis The Royal',
    location: 'Palm Jumeirah, Dubai',
    locationHe: 'פאלם ג\'ומיירה, דובאי',
    image: imgAtlantisRoyal,
    rating: 9.4,
    reviewCount: 3842,
    reviewLabel: 'Superb',
    reviewLabelHe: 'יוצא מן הכלל',
    pricePerNight: 2850,
    originalPrice: 3400,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Beach'],
    amenitiesHe: ['בריכה', 'ספא', 'מסעדה', 'WiFi', 'חדר כושר', 'חוף'],
    description: 'Ultra-luxury resort with stunning skyline views, rooftop infinity pool, and world-class dining by celebrity chefs.',
    descriptionHe: 'ריזורט יוקרתי במיוחד עם נוף מרהיב לקו הרקיע, בריכת אינפיניטי על הגג ומסעדות שף עולמיות.',
    distanceFromCenter: '25 km from center',
    distanceHe: '25 ק"מ מהמרכז',
    freeCancel: true,
    breakfastIncluded: true,
    tags: ['New', 'Top Pick'],
    tagsHe: ['חדש', 'מומלץ'],
    lat: 25.1124,
    lng: 55.1390,
  },
  {
    id: 'five-palm',
    name: 'FIVE Palm Jumeirah',
    location: 'Palm Jumeirah, Dubai',
    locationHe: 'פאלם ג\'ומיירה, דובאי',
    image: imgFivePalm,
    rating: 9.1,
    reviewCount: 5120,
    reviewLabel: 'Superb',
    reviewLabelHe: 'יוצא מן הכלל',
    pricePerNight: 1950,
    originalPrice: 2400,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Beach', 'Nightclub'],
    amenitiesHe: ['בריכה', 'ספא', 'מסעדה', 'WiFi', 'חדר כושר', 'חוף', 'מועדון לילה'],
    description: 'Iconic beachfront resort with vibrant nightlife, luxury suites, private beach, and multiple infinity pools.',
    descriptionHe: 'ריזורט אייקוני על חוף הים עם חיי לילה תוססים, סוויטות יוקרה, חוף פרטי ובריכות אינפיניטי.',
    distanceFromCenter: '24 km from center',
    distanceHe: '24 ק"מ מהמרכז',
    freeCancel: true,
    breakfastIncluded: false,
    tags: ['Popular'],
    tagsHe: ['פופולרי'],
    lat: 25.1180,
    lng: 55.1350,
  },
  {
    id: 'armani-burj',
    name: 'Armani Hotel Dubai',
    location: 'Burj Khalifa, Downtown Dubai',
    locationHe: 'בורג\' ח\'ליפה, דאון טאון דובאי',
    image: imgArmaniBurj,
    rating: 9.3,
    reviewCount: 2956,
    reviewLabel: 'Superb',
    reviewLabelHe: 'יוצא מן הכלל',
    pricePerNight: 2200,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym'],
    amenitiesHe: ['בריכה', 'ספא', 'מסעדה', 'WiFi', 'חדר כושר'],
    description: 'Designed by Giorgio Armani, located in the iconic Burj Khalifa with breathtaking views of the Dubai Fountain.',
    descriptionHe: 'עוצב על ידי ג\'ורג\'ו ארמני, ממוקם בבורג\' ח\'ליפה האייקוני עם נוף עוצר נשימה למזרקת דובאי.',
    distanceFromCenter: '1 km from center',
    distanceHe: '1 ק"מ מהמרכז',
    freeCancel: true,
    breakfastIncluded: true,
    tags: ['Luxury'],
    tagsHe: ['יוקרה'],
    lat: 25.1972,
    lng: 55.2744,
  },
  {
    id: 'atlantis-palm',
    name: 'Atlantis, The Palm',
    location: 'Palm Jumeirah, Dubai',
    locationHe: 'פאלם ג\'ומיירה, דובאי',
    image: imgAtlantisPalm,
    rating: 8.7,
    reviewCount: 12480,
    reviewLabel: 'Excellent',
    reviewLabelHe: 'מצוין',
    pricePerNight: 1650,
    originalPrice: 1900,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Waterpark', 'Aquarium'],
    amenitiesHe: ['בריכה', 'ספא', 'מסעדה', 'WiFi', 'חדר כושר', 'פארק מים', 'אקווריום'],
    description: 'Legendary resort featuring Aquaventure Waterpark, The Lost Chambers Aquarium, and celebrity restaurants.',
    descriptionHe: 'ריזורט אגדי הכולל פארק מים Aquaventure, אקווריום The Lost Chambers ומסעדות סלבריטאים.',
    distanceFromCenter: '26 km from center',
    distanceHe: '26 ק"מ מהמרכז',
    freeCancel: true,
    breakfastIncluded: false,
    tags: ['Family Friendly'],
    tagsHe: ['מתאים למשפחות'],
    lat: 25.1308,
    lng: 55.1171,
  },
  {
    id: 'jw-marriott',
    name: 'JW Marriott Marquis Dubai',
    location: 'Business Bay, Dubai',
    locationHe: 'ביזנס ביי, דובאי',
    image: imgJwMarriott,
    rating: 8.9,
    reviewCount: 6780,
    reviewLabel: 'Excellent',
    reviewLabelHe: 'מצוין',
    pricePerNight: 980,
    originalPrice: 1200,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym'],
    amenitiesHe: ['בריכה', 'ספא', 'מסעדה', 'WiFi', 'חדר כושר'],
    description: 'One of the tallest hotels in the world, offering premium rooms with panoramic city views and 9 dining venues.',
    descriptionHe: 'אחד המלונות הגבוהים בעולם, מציע חדרים פרימיום עם נוף פנורמי לעיר ו-9 מסעדות.',
    distanceFromCenter: '3 km from center',
    distanceHe: '3 ק"מ מהמרכז',
    freeCancel: true,
    breakfastIncluded: true,
    lat: 25.1865,
    lng: 55.2637,
  },
  {
    id: 'park-hyatt',
    name: 'Park Hyatt Dubai',
    location: 'Dubai Creek, Dubai',
    locationHe: 'דובאי קריק, דובאי',
    image: imgParkHyatt,
    rating: 9.0,
    reviewCount: 3210,
    reviewLabel: 'Superb',
    reviewLabelHe: 'יוצא מן הכלל',
    pricePerNight: 1450,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Golf'],
    amenitiesHe: ['בריכה', 'ספא', 'מסעדה', 'WiFi', 'חדר כושר', 'גולף'],
    description: 'Elegant waterfront resort on Dubai Creek with lagoon-style pools, marina, and championship golf course.',
    descriptionHe: 'ריזורט אלגנטי על חוף דובאי קריק עם בריכות בסגנון לגונה, מרינה ומגרש גולף אליפות.',
    distanceFromCenter: '8 km from center',
    distanceHe: '8 ק"מ מהמרכז',
    freeCancel: true,
    breakfastIncluded: true,
    tags: ['Quiet Retreat'],
    tagsHe: ['פינת שקט'],
    lat: 25.2350,
    lng: 55.3330,
  },
  {
    id: 'rixos-palm',
    name: 'Rixos Premium Dubai JBR',
    location: 'JBR, Dubai',
    locationHe: 'JBR, דובאי',
    image: imgRixos,
    rating: 8.6,
    reviewCount: 4560,
    reviewLabel: 'Excellent',
    reviewLabelHe: 'מצוין',
    pricePerNight: 1350,
    originalPrice: 1600,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Beach', 'All-Inclusive'],
    amenitiesHe: ['בריכה', 'ספא', 'מסעדה', 'WiFi', 'חדר כושר', 'חוף', 'הכל כלול'],
    description: 'All-inclusive beachfront resort with private beach, kids club, and panoramic views of the Arabian Gulf.',
    descriptionHe: 'ריזורט הכל-כלול על חוף הים עם חוף פרטי, מועדון ילדים ונוף פנורמי למפרץ הפרסי.',
    distanceFromCenter: '30 km from center',
    distanceHe: '30 ק"מ מהמרכז',
    freeCancel: true,
    breakfastIncluded: true,
    tags: ['All-Inclusive'],
    tagsHe: ['הכל כלול'],
    lat: 25.0780,
    lng: 55.1340,
  },
  {
    id: 'shangri-la',
    name: 'Shangri-La Dubai',
    location: 'Sheikh Zayed Road, Dubai',
    locationHe: 'שדרות שייח\' זאיד, דובאי',
    image: imgShangrila,
    rating: 8.8,
    reviewCount: 5890,
    reviewLabel: 'Excellent',
    reviewLabelHe: 'מצוין',
    pricePerNight: 890,
    originalPrice: 1100,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym'],
    amenitiesHe: ['בריכה', 'ספא', 'מסעדה', 'WiFi', 'חדר כושר'],
    description: 'Premium hotel on Sheikh Zayed Road with direct Burj Khalifa views, CHI The Spa, and 4 restaurants.',
    descriptionHe: 'מלון פרימיום בשדרות שייח\' זאיד עם נוף ישיר לבורג\' ח\'ליפה, ספא CHI ו-4 מסעדות.',
    distanceFromCenter: '2 km from center',
    distanceHe: '2 ק"מ מהמרכז',
    freeCancel: true,
    breakfastIncluded: false,
    lat: 25.2070,
    lng: 55.2727,
  },
  {
    id: 'sofitel-downtown',
    name: 'Sofitel Dubai Downtown',
    location: 'Downtown Dubai',
    locationHe: 'דאון טאון דובאי',
    image: imgSofitel,
    rating: 8.5,
    reviewCount: 4120,
    reviewLabel: 'Very Good',
    reviewLabelHe: 'טוב מאוד',
    pricePerNight: 750,
    originalPrice: 950,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym'],
    amenitiesHe: ['בריכה', 'ספא', 'מסעדה', 'WiFi', 'חדר כושר'],
    description: 'French elegance in the heart of Downtown, steps from Dubai Mall and Dubai Fountain with rooftop pool.',
    descriptionHe: 'אלגנטיות צרפתית בלב דאון טאון, צעדים מדובאי מול ומזרקת דובאי עם בריכה על הגג.',
    distanceFromCenter: '1.5 km from center',
    distanceHe: '1.5 ק"מ מהמרכז',
    freeCancel: true,
    breakfastIncluded: true,
    lat: 25.2000,
    lng: 55.2708,
  },
  {
    id: 'address-marina',
    name: 'Address Dubai Marina',
    location: 'Dubai Marina',
    locationHe: 'דובאי מרינה',
    image: imgMarinaGate,
    rating: 8.9,
    reviewCount: 3640,
    reviewLabel: 'Excellent',
    reviewLabelHe: 'מצוין',
    pricePerNight: 1100,
    stars: 5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym'],
    amenitiesHe: ['בריכה', 'ספא', 'מסעדה', 'WiFi', 'חדר כושר'],
    description: 'Modern luxury in Dubai Marina with infinity pool, spa, and stunning marina and sea views.',
    descriptionHe: 'יוקרה מודרנית בדובאי מרינה עם בריכת אינפיניטי, ספא ונוף מרהיב למרינה ולים.',
    distanceFromCenter: '28 km from center',
    distanceHe: '28 ק"מ מהמרכז',
    freeCancel: true,
    breakfastIncluded: false,
    tags: ['Marina Views'],
    tagsHe: ['נוף למרינה'],
    lat: 25.0770,
    lng: 55.1410,
  },
];

function getRatingColor(rating: number) {
  if (rating >= 9) return 'bg-[hsl(215,55%,30%)]';
  if (rating >= 8) return 'bg-[hsl(215,45%,35%)]';
  return 'bg-[hsl(215,40%,40%)]';
}

function getRatingLabel(rating: number, language: string) {
  if (language === 'he') {
    if (rating >= 9) return 'יוצא מן הכלל';
    if (rating >= 8) return 'טוב מאוד';
    if (rating >= 7) return 'טוב';
    return 'נחמד';
  }
  if (language === 'ar') {
    if (rating >= 9) return 'استثنائي';
    if (rating >= 8) return 'ممتاز';
    if (rating >= 7) return 'جيد جداً';
    return 'جيد';
  }
  if (language === 'fr') {
    if (rating >= 9) return 'Exceptionnel';
    if (rating >= 8) return 'Très bien';
    if (rating >= 7) return 'Bien';
    return 'Correct';
  }
  if (language === 'ru') {
    if (rating >= 9) return 'Превосходно';
    if (rating >= 8) return 'Отлично';
    if (rating >= 7) return 'Хорошо';
    return 'Неплохо';
  }
  // en
  if (rating >= 9) return 'Superb';
  if (rating >= 8) return 'Excellent';
  if (rating >= 7) return 'Very Good';
  return 'Good';
}

/** Pick hotel field based on language: Hebrew gets He variant, others get English */
function hotelField(hotel: Hotel, field: 'location' | 'description' | 'distance' | 'amenities' | 'tags' | 'reviewLabel', language: string) {
  const isHe = language === 'he';
  switch (field) {
    case 'location': return isHe ? (hotel.locationHe || hotel.location) : hotel.location;
    case 'description': return isHe ? (hotel.descriptionHe || hotel.description) : hotel.description;
    case 'distance': return isHe ? (hotel.distanceHe || hotel.distanceFromCenter) : hotel.distanceFromCenter;
    case 'amenities': return isHe ? (hotel.amenitiesHe || hotel.amenities) : hotel.amenities;
    case 'tags': return isHe ? (hotel.tagsHe || hotel.tags || []) : (hotel.tags || []);
    case 'reviewLabel': return getRatingLabel(hotel.rating, language);
  }
}

export default function HotelSearchPage() {
  const navigate = useNavigate();
  const { t, language, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState(language === 'he' ? 'דובאי' : 'Dubai');
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
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [hotelFilters, setHotelFilters] = useState<HotelFilters>({
    priceRange: [0, 5000],
    starRatings: [],
    reviewScores: [],
    propertyTypes: [],
    amenities: [],
    mealPlans: [],
    freeCancellation: false,
  });
  
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
    if (!useApi && searchQuery && !['dubai', 'דובאי'].includes(searchQuery.toLowerCase())) {
      result = result.filter(h => 
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (hotelFilters.priceRange[1] < 5000) {
      result = result.filter(h => h.pricePerNight >= hotelFilters.priceRange[0] && h.pricePerNight <= hotelFilters.priceRange[1]);
    }
    if (hotelFilters.starRatings.length > 0) {
      result = result.filter(h => hotelFilters.starRatings.includes(h.stars));
    }
    if (hotelFilters.reviewScores.length > 0) {
      const minScore = Math.min(...hotelFilters.reviewScores);
      result = result.filter(h => h.rating >= minScore);
    }
    if (hotelFilters.mealPlans.includes('breakfast')) {
      result = result.filter(h => h.breakfastIncluded);
    }
    if (hotelFilters.freeCancellation) {
      result = result.filter(h => h.freeCancel);
    }
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.pricePerNight - b.pricePerNight); break;
      case 'price-high': result.sort((a, b) => b.pricePerNight - a.pricePerNight); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [hotelsSource, searchQuery, sortBy, useApi, hotelFilters]);

  const mapHotels: MapHotel[] = useMemo(() => 
    filteredHotels
      .filter(h => h.lat && h.lng)
      .map(h => ({ id: h.id, name: h.name, lat: h.lat!, lng: h.lng!, pricePerNight: h.pricePerNight })),
    [filteredHotels]
  );

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

    const whatsappUrl = `https://wa.me/971551523121?text=${encodeURIComponent(message)}`;
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = whatsappUrl;
    document.body.appendChild(iframe);
    setTimeout(() => iframe.remove(), 3000);

    setBookingStep('done');
  };

  const pluralize = (count: number, singular: string, plural: string) => count > 1 ? plural : singular;

  // ═══ CONFIRMATION SCREEN ═══
  if (bookingStep === 'done') {
    return (
      <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-[hsl(var(--success))] flex items-center justify-center mb-6 animate-[fadeIn_0.5s_ease-out]">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">{t('hotelPage.bookingReceived')}</h1>
          <p className="text-muted-foreground max-w-sm mb-2">
            {t('hotelPage.thankYou')}, {guestName}! {t('hotelPage.bookingReceivedDesc')}<span className="text-foreground font-semibold">{selectedHotel?.name}</span> {t('hotelPage.receivedSuffix')}
          </p>
          <p className="text-muted-foreground max-w-sm mb-8">
            {t('hotelPage.conciergeWillContact')}
          </p>
          <div className="space-y-3 w-full max-w-xs">
            <Button onClick={() => { setBookingStep('search'); setSelectedHotel(null); }} className="w-full h-12 rounded-full bg-primary text-primary-foreground">
              {t('hotelPage.searchMoreHotels')}
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full h-12 rounded-full">
              {t('hotelPage.backToHome')}
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
      <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => setBookingStep('search')} className="p-1">
            <ArrowLeft className={`w-5 h-5 text-foreground ${isRTL ? 'rotate-180' : ''}`} />
          </button>
          <h1 className="text-lg font-semibold text-foreground">{t('hotelPage.completeBooking')}</h1>
        </div>

        <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full space-y-6">
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
                  <MapPin className="w-3 h-3" />{hotelField(selectedHotel, 'location', language)}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className={`${getRatingColor(selectedHotel.rating)} text-white text-xs font-bold px-1.5 py-0.5 rounded`}>
                    {selectedHotel.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">{hotelField(selectedHotel, 'reviewLabel', language)}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-border px-3 py-2 bg-secondary/30 flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">{nights} {pluralize(nights, t('hotelPage.night'), t('hotelPage.nights'))} · {guests} {pluralize(guests, t('hotelPage.guest'), t('hotelPage.guests'))}</p>
                <p className="text-xs text-muted-foreground">{checkIn || t('hotelPage.flexibleDates')} → {checkOut || ''}</p>
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-lg font-bold text-foreground">AED {total.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">{t('hotelPage.inclTaxes')}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-base font-semibold text-foreground">{t('hotelPage.yourDetails')}</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{t('hotelPage.fullName')}</label>
                <Input value={guestName} onChange={e => setGuestName(e.target.value)} placeholder={t('hotelPage.enterFullName')} className="h-11 bg-secondary/50 border-border" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{t('hotelPage.phoneNumber')}</label>
                <Input value={guestPhone} onChange={e => setGuestPhone(e.target.value)} placeholder="+971 XX XXX XXXX" className="h-11 bg-secondary/50 border-border" dir="ltr" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{t('hotelPage.emailAddress')}</label>
                <Input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} placeholder="your@email.com" className="h-11 bg-secondary/50 border-border" dir="ltr" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{t('hotelPage.specialRequests')}</label>
                <textarea 
                  value={specialRequests} 
                  onChange={e => setSpecialRequests(e.target.value)} 
                  placeholder={t('hotelPage.specialRequestsPlaceholder')}
                  className="w-full h-20 rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-4 space-y-2">
            <h3 className="text-sm font-semibold text-foreground mb-3">{t('hotelPage.priceSummary')}</h3>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">AED {selectedHotel.pricePerNight.toLocaleString()} × {nights} {pluralize(nights, t('hotelPage.night'), t('hotelPage.nights'))}</span>
              <span className="text-foreground">AED {(selectedHotel.pricePerNight * nights).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('hotelPage.taxesFees')}</span>
              <span className="text-foreground">{t('hotelPage.included')}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
              <span className="text-foreground">{t('hotelPage.total')}</span>
              <span className="text-foreground text-lg">AED {total.toLocaleString()}</span>
            </div>
          </div>

          <Button 
            onClick={handleBookingSubmit} 
            disabled={!guestName || !guestPhone}
            className="w-full h-14 rounded-xl bg-[hsl(var(--info))] hover:bg-[hsl(199,85%,45%)] text-white text-base font-bold shadow-lg"
          >
            {t('hotelPage.completeBookingBtn')}
          </Button>
          <p className="text-[10px] text-center text-muted-foreground">{t('hotelPage.byCompleting')}</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ═══ MAIN SEARCH VIEW ═══
  return (
    <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="relative bg-card pt-4 pb-6 px-4 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <img src={logo} alt="EVE BLUE" className="h-8 rounded" />
          <button onClick={() => navigate('/')} className="p-1">
            <ArrowLeft className={`w-5 h-5 text-foreground ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-1">{t('hotelPage.findPerfectHotel')}</h1>
        <p className="text-sm text-muted-foreground text-center mb-5">{t('hotelPage.luxuryStay')}</p>

        <div className="bg-[hsl(var(--warning))] p-1 rounded-xl space-y-1">
          <div className="bg-background rounded-lg flex items-center gap-2 px-3 h-12">
            <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
            <input 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('hotelPage.whereGoing')}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}><X className="w-4 h-4 text-muted-foreground" /></button>
            )}
          </div>
          
          <div className="flex gap-1">
            <div className="flex-1 bg-background rounded-lg flex items-center gap-2 px-3 h-12">
              <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
              <input 
                type="date" 
                value={checkIn} 
                min={new Date().toISOString().split('T')[0]}
                onChange={e => {
                  setCheckIn(e.target.value);
                  if (checkOut && e.target.value && checkOut <= e.target.value) {
                    setCheckOut('');
                  }
                }}
                className="flex-1 bg-transparent text-sm text-foreground outline-none [color-scheme:dark]"
                dir="ltr"
              />
            </div>
            <div className="flex-1 bg-background rounded-lg flex items-center gap-2 px-3 h-12">
              <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
              <input 
                type="date" 
                value={checkOut} 
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={e => setCheckOut(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground outline-none [color-scheme:dark]"
                dir="ltr"
              />
            </div>
          </div>

          <div className="flex gap-1">
            <div className="flex-1 bg-background rounded-lg flex items-center gap-2 px-3 h-12">
              <Users className="w-4 h-4 text-muted-foreground shrink-0" />
              <select 
                value={guests} 
                onChange={e => setGuests(Number(e.target.value))}
                className="flex-1 bg-transparent text-sm text-foreground outline-none"
              >
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {pluralize(n, t('hotelPage.guest'), t('hotelPage.guests'))}</option>)}
              </select>
            </div>
            <div className="flex-1 bg-background rounded-lg flex items-center gap-2 px-3 h-12">
              <select 
                value={rooms} 
                onChange={e => setRooms(Number(e.target.value))}
                className="flex-1 bg-transparent text-sm text-foreground outline-none"
              >
                {[1,2,3,4].map(n => <option key={n} value={n}>{n} {pluralize(n, t('hotelPage.room'), t('hotelPage.rooms'))}</option>)}
              </select>
            </div>
          </div>

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
                <Loader2 className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} animate-spin`} />
                {t('hotelPage.searching')}
              </>
            ) : (
              <>
                <Search className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('hotelPage.search')}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="px-4 py-3 flex items-center justify-between border-b border-border bg-card/50">
        <p className="text-sm text-muted-foreground">
          {t('hotelPage.found')} <span className="text-foreground font-semibold">{filteredHotels.length}</span> {t('hotelPage.accommodations')}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-1.5 text-xs bg-secondary/50 border border-border text-foreground rounded-md px-2.5 py-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {t('hotelPage.filter')}
          </button>
          <button
            onClick={() => setShowMapView(true)}
            className="flex items-center gap-1.5 text-xs bg-[hsl(var(--info))]/10 border border-[hsl(var(--info))]/30 text-[hsl(var(--info))] rounded-md px-2.5 py-1.5 hover:bg-[hsl(var(--info))]/20 transition-colors"
          >
            <Map className="w-3.5 h-3.5" />
            {isRTL ? 'מפה' : 'Map'}
          </button>
          <select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="text-xs bg-secondary/50 border border-border text-foreground rounded-md px-2 py-1.5 outline-none"
          >
            <option value="recommended">{t('hotelPage.recommended')}</option>
            <option value="price-low">{t('hotelPage.priceLowHigh')}</option>
            <option value="price-high">{t('hotelPage.priceHighLow')}</option>
            <option value="rating">{t('hotelPage.rating')}</option>
          </select>
        </div>
      </div>

      {/* Mobile filter sheet */}
      <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
        <SheetContent side={isRTL ? 'right' : 'left'} className="w-[85vw] sm:w-[380px] overflow-y-auto p-4 pt-8">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-foreground">{t('hotelPage.filter')}</SheetTitle>
          </SheetHeader>
          <HotelFilterSidebar
            filters={hotelFilters}
            onFiltersChange={setHotelFilters}
            resultCount={filteredHotels.length}
            hotels={mapHotels}
          />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <aside className={`hidden lg:block w-72 xl:w-80 shrink-0 ${isRTL ? 'border-l' : 'border-r'} border-border bg-card/50 p-4 overflow-y-auto max-h-[calc(100vh-300px)] sticky top-[200px]`}>
          <HotelFilterSidebar
            filters={hotelFilters}
            onFiltersChange={setHotelFilters}
            resultCount={filteredHotels.length}
            hotels={mapHotels}
          />
        </aside>

        <div id="hotel-results" className="flex-1 px-4 py-4 space-y-4 max-w-2xl mx-auto w-full">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">{t('hotelPage.searchingRealTime')}</p>
            </div>
          ) : filteredHotels.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Search className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{t('hotelPage.noHotelsFound')}</p>
            </div>
          ) : filteredHotels.map(hotel => (
            <div key={hotel.id} className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-colors">
              <div className="relative h-48 sm:h-56">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(hotel.id); }}
                  className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center`}
                >
                  <Heart className={`w-4 h-4 ${favorites.has(hotel.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>
                {(hotelField(hotel, 'tags', language) as string[]).length > 0 && (
                  <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} flex gap-1`}>
                    {(hotelField(hotel, 'tags', language) as string[]).map(tag => (
                      <span key={tag} className="bg-[hsl(var(--info))] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-1 mb-0.5">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[hsl(var(--warning))] text-[hsl(var(--warning))]" />
                  ))}
                </div>
                <h3 className="font-bold text-foreground text-base mb-0.5">{hotel.name}</h3>
                <p className="text-xs text-[hsl(var(--info))] flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3" />{hotelField(hotel, 'location', language)} · {hotelField(hotel, 'distance', language)}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`${getRatingColor(hotel.rating)} text-white text-xs font-bold px-2 py-1 rounded`}>
                    {hotel.rating}
                  </span>
                  <span className="text-sm font-medium text-foreground">{hotelField(hotel, 'reviewLabel', language)}</span>
                  <span className="text-xs text-muted-foreground">· {hotel.reviewCount.toLocaleString()} {t('hotelPage.reviews')}</span>
                </div>

                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{hotelField(hotel, 'description', language)}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(hotelField(hotel, 'amenities', language) as string[]).slice(0, 5).map(a => (
                    <span key={a} className="text-[10px] bg-secondary/60 text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                      {a}
                    </span>
                  ))}
                  {hotel.amenities.length > 5 && (
                    <span className="text-[10px] text-muted-foreground">+{hotel.amenities.length - 5} {t('hotelPage.more')}</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {hotel.freeCancel && (
                    <span className="text-[10px] text-[hsl(var(--success))] font-medium">✓ {t('hotelPage.freeCancel')}</span>
                  )}
                  {hotel.breakfastIncluded && (
                    <span className="text-[10px] text-[hsl(var(--success))] font-medium">✓ {t('hotelPage.breakfastIncluded')}</span>
                  )}
                </div>

                <div className="flex items-end justify-between border-t border-border pt-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground">{t('hotelPage.perNight')}</p>
                    {hotel.originalPrice && (
                      <p className="text-xs text-muted-foreground line-through">AED {hotel.originalPrice.toLocaleString()}</p>
                    )}
                    <p className="text-xl font-bold text-foreground">AED {hotel.pricePerNight.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">{t('hotelPage.inclTaxes')}</p>
                  </div>
                  <Button 
                    onClick={() => handleSelectHotel(hotel)}
                    className="h-10 px-5 rounded-lg bg-[hsl(var(--info))] hover:bg-[hsl(199,85%,45%)] text-white font-semibold text-sm"
                  >
                    {t('hotelPage.checkAvailability')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-screen map view */}
      {showMapView && (
        <HotelMapView
          hotels={filteredHotels}
          onClose={() => setShowMapView(false)}
          onSelectHotel={(hotel) => {
            setShowMapView(false);
            handleSelectHotel(hotel as any);
          }}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          isRTL={isRTL}
          t={t}
        />
      )}

      <BottomNav />
    </div>
  );
}
