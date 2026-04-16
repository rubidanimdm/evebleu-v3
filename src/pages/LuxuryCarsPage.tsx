import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GoldParticles, LuxuryCard } from '@/components/LuxuryElements';
import { openWhatsAppConcierge } from '@/lib/whatsapp';
import { useLanguage } from '@/lib/i18n';
import { Car, MessageCircle } from 'lucide-react';
import yachtVideo from '@/assets/yacht-marina-video.mp4';

import lamborghiniImg from '@/assets/cars/lamborghini-urus.jpg';
import rollsRoyceImg from '@/assets/cars/rolls-royce-ghost.jpg';
import ferrariImg from '@/assets/cars/ferrari-488.jpg';
import gWagonImg from '@/assets/cars/mercedes-g-wagon.jpg';
import bentleyImg from '@/assets/cars/bentley-continental.jpg';
import porscheImg from '@/assets/cars/porsche-911.jpg';

interface LuxuryCar {
  name: string;
  category: string;
  image: string;
  pricePerDay: number;
  specs: string[];
}

const CARS: LuxuryCar[] = [
  {
    name: 'Rolls Royce Ghost',
    category: 'Ultra Luxury',
    image: rollsRoyceImg,
    pricePerDay: 3500,
    specs: ['V12 Engine', '563 HP', 'Chauffeur Available'],
  },
  {
    name: 'Lamborghini Urus',
    category: 'Super SUV',
    image: lamborghiniImg,
    pricePerDay: 2800,
    specs: ['V8 Twin-Turbo', '641 HP', 'AWD'],
  },
  {
    name: 'Ferrari 488 GTB',
    category: 'Supercar',
    image: ferrariImg,
    pricePerDay: 3200,
    specs: ['V8 Twin-Turbo', '661 HP', 'RWD'],
  },
  {
    name: 'Mercedes G63 AMG',
    category: 'Luxury SUV',
    image: gWagonImg,
    pricePerDay: 2200,
    specs: ['V8 Bi-Turbo', '577 HP', 'AWD'],
  },
  {
    name: 'Bentley Continental GT',
    category: 'Grand Tourer',
    image: bentleyImg,
    pricePerDay: 2500,
    specs: ['W12 Engine', '626 HP', 'AWD'],
  },
  {
    name: 'Porsche 911 Turbo S',
    category: 'Sports Car',
    image: porscheImg,
    pricePerDay: 2000,
    specs: ['Flat-6 Twin-Turbo', '640 HP', 'AWD'],
  },
];

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Luxury Car Rental',
    subtitle: 'Drive the world\'s finest automobiles through Dubai',
    perDay: '/ day',
    bookNow: 'Book via WhatsApp',
    contactUs: 'Custom Request',
    currency: 'AED',
  },
  he: {
    title: 'השכרת רכבי יוקרה',
    subtitle: 'נהגו ברכבים היוקרתיים ביותר בעולם ברחבי דובאי',
    perDay: '/ יום',
    bookNow: 'הזמן דרך WhatsApp',
    contactUs: 'בקשה מותאמת',
    currency: 'AED',
  },
  ar: {
    title: 'تأجير سيارات فاخرة',
    subtitle: 'قُد أرقى السيارات في العالم عبر دبي',
    perDay: '/ يوم',
    bookNow: 'احجز عبر WhatsApp',
    contactUs: 'طلب مخصص',
    currency: 'AED',
  },
  fr: {
    title: 'Location de Voitures de Luxe',
    subtitle: 'Conduisez les plus belles automobiles du monde à Dubaï',
    perDay: '/ jour',
    bookNow: 'Réserver via WhatsApp',
    contactUs: 'Demande personnalisée',
    currency: 'AED',
  },
  ru: {
    title: 'Аренда Люксовых Авто',
    subtitle: 'Управляйте лучшими автомобилями мира по Дубаю',
    perDay: '/ день',
    bookNow: 'Забронировать через WhatsApp',
    contactUs: 'Индивидуальный запрос',
    currency: 'AED',
  },
};

export default function LuxuryCarsPage() {
  const { language, isRTL } = useLanguage();
  const t = translations[language] || translations.en;

  const handleBookCar = (car: LuxuryCar) => {
    openWhatsAppConcierge('CAR', `I'd like to rent: ${car.name}\nPrice: ${car.pricePerDay} AED/day`);
  };

  return (
    <div className="min-h-screen bg-background pb-24 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <GoldParticles count={10} />

      {/* Video Header */}
      <section className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] overflow-hidden">
        <video
          src={yachtVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/40" />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, transparent 0%, transparent 50%, hsl(var(--background)) 100%)`
        }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2 px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
              {t.title}
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-md mx-auto drop-shadow">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {CARS.map((car) => (
            <LuxuryCard key={car.name} className="overflow-hidden group">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={544}
                />
                <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground border-0 text-xs backdrop-blur-sm">
                  {car.category}
                </Badge>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{car.name}</h3>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xl font-bold text-primary">
                      {car.pricePerDay.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground block">
                      {t.currency} {t.perDay}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {car.specs.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground border border-border/50"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <Button
                  onClick={() => handleBookCar(car)}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t.bookNow}
                </Button>
              </div>
            </LuxuryCard>
          ))}
        </div>

        {/* Custom Request CTA */}
        <div className="mt-8 text-center">
          <LuxuryCard className="p-6 space-y-3">
            <Car className="w-8 h-8 text-primary mx-auto" />
            <p className="text-muted-foreground text-sm">
              {language === 'he' ? 'לא מצאת את הרכב שחיפשת? צור קשר עם הקונסיירז\' שלנו' :
               language === 'ar' ? 'لم تجد السيارة التي تبحث عنها؟ تواصل مع الكونسيرج' :
               language === 'fr' ? 'Vous n\'avez pas trouvé la voiture souhaitée ? Contactez notre concierge' :
               language === 'ru' ? 'Не нашли нужный автомобиль? Свяжитесь с нашим консьержем' :
               'Can\'t find what you\'re looking for? Contact our concierge'}
            </p>
            <Button
              variant="outline"
              onClick={() => openWhatsAppConcierge('CAR')}
              className="border-primary/30 text-primary hover:bg-primary/10 rounded-xl gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              {t.contactUs}
            </Button>
          </LuxuryCard>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
