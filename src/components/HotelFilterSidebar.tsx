import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { MapPin, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export interface HotelFilters {
  priceRange: [number, number];
  starRatings: number[];
  reviewScores: number[];
  propertyTypes: string[];
  amenities: string[];
  mealPlans: string[];
  freeCancellation: boolean;
}

export interface MapHotel {
  id: string;
  name: string;
  lat: number;
  lng: number;
  pricePerNight: number;
}

interface FilterSidebarProps {
  filters: HotelFilters;
  onFiltersChange: (filters: HotelFilters) => void;
  resultCount: number;
  hotels?: MapHotel[];
}

const POPULAR_FILTERS = [
  { key: 'stars-5', label: '5 כוכבים', group: 'starRatings', value: 5 },
  { key: 'type-hotel', label: 'מלונות', group: 'propertyTypes', value: 'Hotel' },
  { key: 'review-9', label: 'מעולה: 9+', group: 'reviewScores', value: 9 },
  { key: 'meal-breakfast', label: 'ארוחת בוקר כלולה', group: 'mealPlans', value: 'breakfast' },
  { key: 'type-resort', label: 'אתרי נופש', group: 'propertyTypes', value: 'Resort' },
  { key: 'type-apartment', label: 'דירות', group: 'propertyTypes', value: 'Apartment' },
  { key: 'meal-halfboard', label: 'כולל ארוחות בוקר וערב', group: 'mealPlans', value: 'halfboard' },
  { key: 'type-villa', label: 'וילות', group: 'propertyTypes', value: 'Villa' },
];

const REVIEW_SCORES = [
  { value: 9, label: 'מעולה: 9+' },
  { value: 8, label: 'טוב מאוד: 8+' },
  { value: 7, label: 'טוב: 7+' },
  { value: 6, label: 'נחמד: 6+' },
];

const ACTIVITIES = [
  'מרכז כושר', 'כושר גופני', 'סאונה', 'מגרש משחקים לילדים', "ג'קוזי",
];

const PROPERTY_TYPES = [
  { value: 'Apartment', label: 'דירות' },
  { value: 'Hotel', label: 'מלונות' },
  { value: 'Homestay', label: 'מקומות אירוח ביתי' },
  { value: 'Holiday Home', label: 'בתי נופש' },
  { value: 'Resort', label: 'אתרי נופש' },
  { value: 'Villa', label: 'וילות' },
  { value: 'Guest House', label: 'בתי הארחה' },
];

const FACILITIES = [
  'חניה', 'מסעדה', 'שירות חדרים', 'דלפק קבלה 24/7', 'מרכז כושר', 'בריכה',
];

const ROOM_AMENITIES = [
  'נוף לים', 'מרפסת', "ג'קוזי", 'בריכה פרטית', 'מיזוג אוויר',
];

interface FilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function FilterSection({ title, defaultOpen = true, children }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2 text-sm font-semibold text-foreground"
      >
        <span>{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && <div className="space-y-2 mt-1">{children}</div>}
    </div>
  );
}

function FilterCheckbox({ label, checked, onChange, count }: { label: string; checked: boolean; onChange: (v: boolean) => void; count?: number }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      <span className="text-sm text-foreground group-hover:text-primary transition-colors flex-1">{label}</span>
      {count !== undefined && <span className="text-xs text-muted-foreground">{count}</span>}
    </label>
  );
}

// Custom price marker icon
const createPriceIcon = (price: number) => {
  return L.divIcon({
    className: 'custom-price-marker',
    html: `<div style="background:hsl(215,55%,30%);color:white;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:bold;white-space:nowrap;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);">AED ${price.toLocaleString()}</div>`,
    iconSize: [80, 28],
    iconAnchor: [40, 28],
  });
};

export default function HotelFilterSidebar({ filters, onFiltersChange, resultCount, hotels = [] }: FilterSidebarProps) {
  const update = (partial: Partial<HotelFilters>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  const toggleArrayValue = <T,>(arr: T[], val: T): T[] => {
    return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
  };

  const handlePopularFilter = (filter: typeof POPULAR_FILTERS[0]) => {
    if (filter.group === 'starRatings') {
      update({ starRatings: toggleArrayValue(filters.starRatings, filter.value as number) });
    } else if (filter.group === 'propertyTypes') {
      update({ propertyTypes: toggleArrayValue(filters.propertyTypes, filter.value as string) });
    } else if (filter.group === 'reviewScores') {
      update({ reviewScores: toggleArrayValue(filters.reviewScores, filter.value as number) });
    } else if (filter.group === 'mealPlans') {
      update({ mealPlans: toggleArrayValue(filters.mealPlans, filter.value as string) });
    }
  };

  const isPopularChecked = (filter: typeof POPULAR_FILTERS[0]) => {
    if (filter.group === 'starRatings') return filters.starRatings.includes(filter.value as number);
    if (filter.group === 'propertyTypes') return filters.propertyTypes.includes(filter.value as string);
    if (filter.group === 'reviewScores') return filters.reviewScores.includes(filter.value as number);
    if (filter.group === 'mealPlans') return filters.mealPlans.includes(filter.value as string);
    return false;
  };

  // Filter hotels with valid coordinates
  const mappableHotels = hotels.filter(h => h.lat && h.lng && h.lat !== 0 && h.lng !== 0);

  return (
    <div className="space-y-0" dir="rtl">
      {/* Interactive Map with hotel markers */}
      <div className="rounded-xl overflow-hidden border border-border mb-4 h-48">
        <MapContainer
          center={[25.2048, 55.2708]}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {mappableHotels.length > 0 ? (
            mappableHotels.map(hotel => (
              <Marker
                key={hotel.id}
                position={[hotel.lat, hotel.lng]}
                icon={createPriceIcon(hotel.pricePerNight)}
              >
                <Popup>
                  <div className="text-xs font-semibold">{hotel.name}</div>
                  <div className="text-xs">AED {hotel.pricePerNight.toLocaleString()} / לילה</div>
                </Popup>
              </Marker>
            ))
          ) : (
            <Marker position={[25.2048, 55.2708]}>
              <Popup>דובאי</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Filter title */}
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-4 h-4 text-foreground" />
        <h3 className="text-base font-bold text-foreground">סינון לפי:</h3>
      </div>

      {/* Budget slider */}
      <FilterSection title="התקציב שלכם (ללילה)">
        <div className="px-1">
          <div className="text-sm text-muted-foreground text-center mb-3" dir="ltr">
            AED {filters.priceRange[0].toLocaleString()} - AED {filters.priceRange[1].toLocaleString()}+
          </div>
          <Slider
            value={filters.priceRange}
            min={0}
            max={5000}
            step={100}
            onValueChange={(v) => update({ priceRange: v as [number, number] })}
            className="mb-2"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground" dir="ltr">
            <span>AED 0</span>
            <span>AED 5,000+</span>
          </div>
        </div>
      </FilterSection>

      {/* Popular filters */}
      <FilterSection title="מסנני חיפוש פופולריים">
        {POPULAR_FILTERS.map(f => (
          <FilterCheckbox
            key={f.key}
            label={f.label}
            checked={isPopularChecked(f)}
            onChange={() => handlePopularFilter(f)}
          />
        ))}
      </FilterSection>

      {/* Review scores */}
      <FilterSection title="ציון חוות דעת">
        {REVIEW_SCORES.map(s => (
          <FilterCheckbox
            key={s.value}
            label={s.label}
            checked={filters.reviewScores.includes(s.value)}
            onChange={() => update({ reviewScores: toggleArrayValue(filters.reviewScores, s.value) })}
          />
        ))}
      </FilterSection>

      {/* Fun things to do */}
      <FilterSection title="דברים שכיף לעשות" defaultOpen={false}>
        {ACTIVITIES.map(a => (
          <FilterCheckbox
            key={a}
            label={a}
            checked={filters.amenities.includes(a)}
            onChange={() => update({ amenities: toggleArrayValue(filters.amenities, a) })}
          />
        ))}
      </FilterSection>

      {/* Property type */}
      <FilterSection title="סוג מקום האירוח" defaultOpen={false}>
        {PROPERTY_TYPES.map(t => (
          <FilterCheckbox
            key={t.value}
            label={t.label}
            checked={filters.propertyTypes.includes(t.value)}
            onChange={() => update({ propertyTypes: toggleArrayValue(filters.propertyTypes, t.value) })}
          />
        ))}
      </FilterSection>

      {/* Facilities */}
      <FilterSection title="מתקנים" defaultOpen={false}>
        {FACILITIES.map(f => (
          <FilterCheckbox
            key={f}
            label={f}
            checked={filters.amenities.includes(f)}
            onChange={() => update({ amenities: toggleArrayValue(filters.amenities, f) })}
          />
        ))}
      </FilterSection>

      {/* Room amenities */}
      <FilterSection title="מתקני החדר" defaultOpen={false}>
        {ROOM_AMENITIES.map(a => (
          <FilterCheckbox
            key={a}
            label={a}
            checked={filters.amenities.includes(a)}
            onChange={() => update({ amenities: toggleArrayValue(filters.amenities, a) })}
          />
        ))}
      </FilterSection>

      {/* Free cancellation */}
      <FilterSection title="גמישות" defaultOpen={false}>
        <FilterCheckbox
          label="ביטול חינם"
          checked={filters.freeCancellation}
          onChange={(v) => update({ freeCancellation: v as boolean })}
        />
      </FilterSection>
    </div>
  );
}
