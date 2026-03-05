import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { VenueBookingForm } from '@/components/VenueBookingForm';
import { useLanguage } from '@/lib/i18n';
import { ChevronLeft, MapPin, Clock, Star, Lightbulb, CalendarCheck } from 'lucide-react';
import { ATTRACTIONS } from '@/lib/attractionsData';

export default function AttractionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isHe = language === 'he';
  const [bookingOpen, setBookingOpen] = useState(false);

  const attraction = ATTRACTIONS.find(a => a.id === id);

  if (!attraction) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir={isHe ? 'rtl' : 'ltr'}>
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">{isHe ? 'אטרקציה לא נמצאה' : 'Attraction not found'}</p>
          <Button onClick={() => navigate('/attractions')}>{isHe ? 'חזור לאטרקציות' : 'Back to Attractions'}</Button>
        </div>
      </div>
    );
  }

  const name = isHe ? attraction.nameHe : attraction.name;
  const category = isHe ? attraction.categoryHe : attraction.category;
  const fullDesc = isHe ? attraction.fullDescHe : attraction.fullDesc;
  const location = isHe ? attraction.locationHe : attraction.location;
  const duration = isHe ? attraction.durationHe : attraction.duration;
  const highlights = isHe ? attraction.highlightsHe : attraction.highlights;
  const tips = isHe ? attraction.tipsHe : attraction.tips;
  const bestTime = isHe ? attraction.bestTimeHe : attraction.bestTime;

  return (
    <div className="min-h-screen bg-background pb-24" dir={isHe ? 'rtl' : 'ltr'}>
      {/* Hero Image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={attraction.image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        
        <button 
          onClick={() => navigate('/attractions')} 
          className="absolute top-4 left-4 rtl:left-auto rtl:right-4 p-2.5 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-colors z-10"
        >
          <ChevronLeft className="w-5 h-5 text-foreground rtl:rotate-180" />
        </button>

        <div className="absolute bottom-4 left-4 right-4 rtl:left-4 rtl:right-4">
          <span className="inline-block px-2.5 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-[10px] font-medium mb-2">
            {category}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {name}
          </h1>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 pt-6 space-y-6">
        {/* Quick Info */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/60 border border-border/40 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {location}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/60 border border-border/40 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5 text-primary" />
            {duration}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/60 border border-border/40 text-xs text-muted-foreground">
            <CalendarCheck className="w-3.5 h-3.5 text-primary" />
            {isHe ? 'זמן מומלץ: ' : 'Best time: '}{bestTime}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-foreground">
            {isHe ? 'אודות' : 'About'}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {fullDesc}
          </p>
        </div>

        {/* Highlights */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            {isHe ? 'היילייטים' : 'Highlights'}
          </h2>
          <div className="grid gap-2">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-card/50 border border-border/30">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span className="text-xs text-foreground/90">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            {isHe ? 'טיפים' : 'Tips'}
          </h2>
          <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4 space-y-2">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-primary font-bold text-xs mt-0.5">{i + 1}.</span>
                <span className="text-xs text-muted-foreground leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Book CTA */}
        <div className="pt-2">
          <Button
            onClick={() => setBookingOpen(true)}
            className="w-full h-14 rounded-2xl text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          >
            <CalendarCheck className="w-5 h-5" />
            {isHe ? `הזמן ${name}` : `Book ${name}`}
          </Button>
          <p className="text-center text-[10px] text-muted-foreground mt-2">
            {isHe ? 'הבקשה תישלח לצוות הקונסיירז׳ שלנו' : 'Your request will be sent to our concierge team'}
          </p>
        </div>
      </main>

      <VenueBookingForm
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        venueName={name}
      />

      <BottomNav />
    </div>
  );
}
