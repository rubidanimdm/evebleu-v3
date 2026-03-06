import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { X, Star, MapPin, Heart, List, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Fix Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface Hotel {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  originalPrice?: number;
  stars: number;
  lat?: number;
  lng?: number;
  freeCancel?: boolean;
  breakfastIncluded?: boolean;
}

interface HotelMapViewProps {
  hotels: Hotel[];
  onClose: () => void;
  onSelectHotel: (hotel: Hotel) => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const createPriceIcon = (price: number, isSelected: boolean) => {
  return L.divIcon({
    className: 'custom-price-marker',
    html: `<div style="
      background:${isSelected ? '#0071c2' : '#1a3e5c'};
      color:white;
      padding:3px 8px;
      border-radius:4px;
      font-size:12px;
      font-weight:bold;
      white-space:nowrap;
      border:2px solid ${isSelected ? '#fff' : 'rgba(255,255,255,0.7)'};
      box-shadow:0 2px 8px rgba(0,0,0,0.35);
      cursor:pointer;
      transform:${isSelected ? 'scale(1.2)' : 'scale(1)'};
      transition:all 0.2s;
    ">AED ${price.toLocaleString()}</div>`,
    iconSize: [90, 28],
    iconAnchor: [45, 28],
  });
};

function FlyToHotel({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.flyTo([lat, lng], 14, { duration: 0.8 });
  return null;
}

function HotelCard({ hotel, isSelected, onSelect, onBook, isFav, onToggleFav, isRTL }: {
  hotel: Hotel;
  isSelected: boolean;
  onSelect: () => void;
  onBook: () => void;
  isFav: boolean;
  onToggleFav: () => void;
  isRTL: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isSelected]);

  return (
    <div
      ref={cardRef}
      className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-500/30 bg-blue-50/5'
          : 'border-border hover:border-primary/30'
      }`}
      onClick={onSelect}
    >
      <div className="flex gap-0">
        <div className="relative w-28 sm:w-36 shrink-0">
          <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover min-h-[130px]" />
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
            className={`absolute top-2 ${isRTL ? 'right-2' : 'left-2'} w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>
        </div>
        <div className="flex-1 p-2.5 min-w-0">
          <div className="flex items-center gap-0.5 mb-0.5">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h4 className="font-bold text-sm text-foreground truncate">{hotel.name}</h4>
          <p className="text-[10px] text-blue-400 flex items-center gap-0.5 mb-1">
            <MapPin className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{hotel.location}</span>
          </p>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{hotel.rating}</span>
            <span className="text-[10px] text-muted-foreground">{hotel.reviewCount.toLocaleString()} {isRTL ? 'חוות דעת' : 'reviews'}</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-1.5">
            {hotel.freeCancel && (
              <span className="text-[9px] text-emerald-400 font-medium">✓ {isRTL ? 'ביטול חינם' : 'Free Cancel'}</span>
            )}
            {hotel.breakfastIncluded && (
              <span className="text-[9px] text-emerald-400 font-medium">✓ {isRTL ? 'בוקר כלול' : 'Breakfast'}</span>
            )}
          </div>
          <div className="flex items-end justify-between">
            <div>
              {hotel.originalPrice && (
                <p className="text-[10px] text-muted-foreground line-through">AED {hotel.originalPrice.toLocaleString()}</p>
              )}
              <p className="text-base font-bold text-foreground">AED {hotel.pricePerNight.toLocaleString()}</p>
              <p className="text-[9px] text-muted-foreground">{isRTL ? 'ללילה' : 'per night'}</p>
            </div>
            <Button
              onClick={(e) => { e.stopPropagation(); onBook(); }}
              size="sm"
              className="h-7 px-3 text-[10px] bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {isRTL ? 'בדוק זמינות' : 'Check'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HotelMapView({ hotels, onClose, onSelectHotel, favorites, onToggleFavorite, isRTL, t }: HotelMapViewProps) {
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'map' | 'list'>('map');

  const mappableHotels = hotels.filter(h => h.lat && h.lng && h.lat !== 0 && h.lng !== 0);
  const selectedHotel = mappableHotels.find(h => h.id === selectedHotelId);

  const center: [number, number] = mappableHotels.length > 0
    ? [
        mappableHotels.reduce((s, h) => s + h.lat!, 0) / mappableHotels.length,
        mappableHotels.reduce((s, h) => s + h.lng!, 0) / mappableHotels.length,
      ]
    : [25.2048, 55.2708];

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top bar */}
      <div className="h-12 bg-card border-b border-border flex items-center justify-between px-4 shrink-0 z-10">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          <X className="w-5 h-5" />
          <span>{isRTL ? 'סגירת המפה' : 'Close Map'}</span>
        </button>
        <span className="text-xs text-muted-foreground">
          {mappableHotels.length} {isRTL ? 'מלונות על המפה' : 'hotels on map'}
        </span>
        {/* Mobile toggle: map vs list */}
        <button
          onClick={() => setMobileView(mobileView === 'map' ? 'list' : 'map')}
          className="md:hidden flex items-center gap-1.5 text-xs text-primary font-medium bg-primary/10 px-3 py-1.5 rounded-full"
        >
          {mobileView === 'map' ? (
            <><List className="w-4 h-4" />{isRTL ? 'רשימה' : 'List'}</>
          ) : (
            <><MapIcon className="w-4 h-4" />{isRTL ? 'מפה' : 'Map'}</>
          )}
        </button>
        {/* Desktop: placeholder for alignment */}
        <div className="hidden md:block w-20" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Hotel list panel - desktop: always visible, mobile: conditional */}
        <div
          className={`
            w-full md:w-[380px] lg:w-[420px] shrink-0 bg-card overflow-y-auto
            ${isRTL ? 'md:border-l border-border' : 'md:border-r border-border'}
            ${mobileView === 'list' ? 'block' : 'hidden md:block'}
          `}
        >
          <div className="p-3 space-y-3">
            {hotels.map(hotel => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                isSelected={selectedHotelId === hotel.id}
                onSelect={() => setSelectedHotelId(hotel.id)}
                onBook={() => onSelectHotel(hotel)}
                isFav={favorites.has(hotel.id)}
                onToggleFav={() => onToggleFavorite(hotel.id)}
                isRTL={isRTL}
              />
            ))}
          </div>
        </div>

        {/* Map panel - desktop: always visible, mobile: conditional */}
        <div className={`flex-1 relative ${mobileView === 'map' ? 'block' : 'hidden md:block'}`}>
          <MapContainer
            center={center}
            zoom={11}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            attributionControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {selectedHotel && <FlyToHotel lat={selectedHotel.lat!} lng={selectedHotel.lng!} />}
            {mappableHotels.map(hotel => (
              <Marker
                key={hotel.id}
                position={[hotel.lat!, hotel.lng!]}
                icon={createPriceIcon(hotel.pricePerNight, selectedHotelId === hotel.id)}
                eventHandlers={{
                  click: () => {
                    setSelectedHotelId(hotel.id);
                    // On mobile, switch to list to show the selected hotel
                    if (window.innerWidth < 768) {
                      setMobileView('list');
                    }
                  },
                }}
              >
                <Popup maxWidth={260} className="hotel-map-popup">
                  <div className="flex gap-2 p-1">
                    <img src={hotel.image} alt={hotel.name} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-0.5 mb-0.5">
                        {Array.from({ length: hotel.stars }).map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="font-bold text-xs text-foreground truncate">{hotel.name}</p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                        <MapPin className="w-2.5 h-2.5" />{hotel.location}
                      </p>
                      <p className="font-bold text-sm text-foreground mt-1">AED {hotel.pricePerNight.toLocaleString()}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
