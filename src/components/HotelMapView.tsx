import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { X, Star, MapPin, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
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
    html: `<div style="background:${isSelected ? 'hsl(199,85%,40%)' : 'hsl(215,55%,25%)'};color:white;padding:4px 8px;border-radius:6px;font-size:12px;font-weight:bold;white-space:nowrap;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35);cursor:pointer;transform:${isSelected ? 'scale(1.15)' : 'scale(1)'};transition:transform 0.2s;">AED ${price.toLocaleString()}</div>`,
    iconSize: [90, 32],
    iconAnchor: [45, 32],
  });
};

function FlyToHotel({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.flyTo([lat, lng], 14, { duration: 0.8 });
  return null;
}

export default function HotelMapView({ hotels, onClose, onSelectHotel, favorites, onToggleFavorite, isRTL, t }: HotelMapViewProps) {
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [showList, setShowList] = useState(true);

  const mappableHotels = hotels.filter(h => h.lat && h.lng && h.lat !== 0 && h.lng !== 0);
  const selectedHotel = mappableHotels.find(h => h.id === selectedHotelId);

  // Calculate center from hotels or default to Dubai
  const center: [number, number] = mappableHotels.length > 0
    ? [
        mappableHotels.reduce((s, h) => s + h.lat!, 0) / mappableHotels.length,
        mappableHotels.reduce((s, h) => s + h.lng!, 0) / mappableHotels.length,
      ]
    : [25.2048, 55.2708];

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top bar */}
      <div className="h-12 bg-card border-b border-border flex items-center justify-between px-3 shrink-0">
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
        <button
          onClick={() => setShowList(!showList)}
          className="flex items-center gap-1 text-xs text-primary font-medium"
        >
          {showList ? (isRTL ? 'הסתר רשימה' : 'Hide List') : (isRTL ? 'הצג רשימה' : 'Show List')}
        </button>
      </div>

      {/* Main content: map + hotel list */}
      <div className="flex-1 flex overflow-hidden">
        {/* Map */}
        <div className={`flex-1 relative`}>
          <MapContainer
            center={center}
            zoom={12}
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
                    setShowList(true);
                  },
                }}
              >
                <Popup maxWidth={260} className="hotel-map-popup">
                  <div className="flex gap-2 p-1">
                    <img src={hotel.image} alt={hotel.name} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-0.5 mb-0.5">
                        {Array.from({ length: hotel.stars }).map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-[hsl(var(--warning))] text-[hsl(var(--warning))]" />
                        ))}
                      </div>
                      <p className="font-bold text-xs text-foreground truncate">{hotel.name}</p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                        <MapPin className="w-2.5 h-2.5" />{hotel.location}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="bg-[hsl(var(--info))] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{hotel.rating}</span>
                        <span className="text-[10px] text-muted-foreground">{hotel.reviewCount} {isRTL ? 'חוות דעת' : 'reviews'}</span>
                      </div>
                      <p className="font-bold text-sm text-foreground mt-1">AED {hotel.pricePerNight.toLocaleString()}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Toggle list button (mobile) */}
          <button
            onClick={() => setShowList(!showList)}
            className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} z-[1000] bg-card border border-border rounded-full w-9 h-9 flex items-center justify-center shadow-lg md:hidden`}
          >
            {showList ? <ChevronRight className="w-5 h-5 text-foreground" /> : <ChevronLeft className="w-5 h-5 text-foreground" />}
          </button>
        </div>

        {/* Hotel list panel */}
        {showList && (
          <div className={`w-full md:w-[380px] lg:w-[420px] shrink-0 bg-card border-border overflow-y-auto ${isRTL ? 'border-l' : 'border-r'} absolute md:relative inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-[1000] md:z-auto`}
            style={{ top: 0, bottom: 0 }}
          >
            {/* Mobile close list */}
            <div className="md:hidden sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-2 flex justify-between items-center z-10">
              <span className="text-xs font-medium text-foreground">{hotels.length} {isRTL ? 'תוצאות' : 'results'}</span>
              <button onClick={() => setShowList(false)} className="text-xs text-primary font-medium">
                {isRTL ? 'הצג מפה' : 'Show Map'}
              </button>
            </div>

            <div className="p-3 space-y-3">
              {hotels.map(hotel => (
                <div 
                  key={hotel.id}
                  className={`bg-background rounded-xl border overflow-hidden cursor-pointer transition-all ${
                    selectedHotelId === hotel.id 
                      ? 'border-[hsl(var(--info))] ring-1 ring-[hsl(var(--info))]' 
                      : 'border-border hover:border-primary/30'
                  }`}
                  onClick={() => {
                    setSelectedHotelId(hotel.id);
                  }}
                >
                  <div className="flex gap-0">
                    {/* Image */}
                    <div className="relative w-28 sm:w-32 shrink-0">
                      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover min-h-[120px]" />
                      <button
                        onClick={(e) => { e.stopPropagation(); onToggleFavorite(hotel.id); }}
                        className={`absolute top-2 ${isRTL ? 'right-2' : 'left-2'} w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${favorites.has(hotel.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-2.5 min-w-0">
                      <div className="flex items-center gap-0.5 mb-0.5">
                        {Array.from({ length: hotel.stars }).map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-[hsl(var(--warning))] text-[hsl(var(--warning))]" />
                        ))}
                      </div>
                      <h4 className="font-bold text-sm text-foreground truncate">{hotel.name}</h4>
                      <p className="text-[10px] text-[hsl(var(--info))] flex items-center gap-0.5 mb-1">
                        <MapPin className="w-2.5 h-2.5 shrink-0" />
                        <span className="truncate">{hotel.location}</span>
                      </p>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="bg-[hsl(var(--info))] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{hotel.rating}</span>
                        <span className="text-[10px] text-muted-foreground">{hotel.reviewCount.toLocaleString()} {isRTL ? 'חוות דעת' : 'reviews'}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-1.5">
                        {hotel.freeCancel && (
                          <span className="text-[9px] text-[hsl(var(--success))] font-medium">✓ {isRTL ? 'ביטול חינם' : 'Free Cancel'}</span>
                        )}
                        {hotel.breakfastIncluded && (
                          <span className="text-[9px] text-[hsl(var(--success))] font-medium">✓ {isRTL ? 'בוקר כלול' : 'Breakfast'}</span>
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
                          onClick={(e) => { e.stopPropagation(); onSelectHotel(hotel as any); }}
                          size="sm"
                          className="h-7 px-3 text-[10px] bg-[hsl(var(--info))] hover:bg-[hsl(199,85%,45%)] text-white font-semibold"
                        >
                          {isRTL ? 'בדוק זמינות' : 'Check'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
