import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Car, Building, Plane, Wine, Ship, Headphones } from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { BottomNav } from '@/components/BottomNav';
import { SERVICE_CATEGORIES, CONCIERGE_INTENTS } from '@/lib/constants';
import heroBackground from '@/assets/hero-background.jpeg';

interface ServiceButton {
  icon: React.ElementType;
  label: string;
  route: string;
  category?: string;
  intent?: string;
}

const services: ServiceButton[] = [
  { icon: UtensilsCrossed, label: 'Book Me a Table', route: '/explore', category: SERVICE_CATEGORIES.DINING },
  { icon: Car, label: 'Book Me a Car', route: '/explore', category: SERVICE_CATEGORIES.TRANSPORT },
  { icon: Building, label: 'Book Me a Hotel', route: '/concierge', intent: SERVICE_CATEGORIES.HOTEL },
  { icon: Plane, label: 'Book Me a Flight', route: '/concierge', intent: SERVICE_CATEGORIES.FLIGHT },
  { icon: Wine, label: 'Book Me a Club', route: '/explore', category: SERVICE_CATEGORIES.CLUB },
  { icon: Ship, label: 'Book an Experience', route: '/explore', category: SERVICE_CATEGORIES.EXPERIENCE },
  { icon: Headphones, label: 'Handle It For Me', route: '/concierge', intent: CONCIERGE_INTENTS.CUSTOM_REQUEST },
];

export default function HomePage() {
  const navigate = useNavigate();

  const handleServiceClick = (service: ServiceButton) => {
    if (service.category) {
      navigate(`${service.route}?category=${service.category}`);
    } else if (service.intent) {
      navigate(`${service.route}?intent=${service.intent}`);
    } else {
      navigate(service.route);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Full-screen Hero Background */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Language Switcher - Overlay */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Content Overlay - Buttons positioned to match image */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-end pb-32 px-4">
        {/* Service Buttons Grid - positioned at bottom third of hero */}
        <div className="w-full max-w-2xl mx-auto mt-auto">
          {/* First Row - 4 buttons */}
          <div className="grid grid-cols-4 gap-3 md:gap-4 mb-3 md:mb-4">
            {services.slice(0, 4).map((service) => (
              <ServiceButtonComponent 
                key={service.label}
                service={service}
                onClick={() => handleServiceClick(service)}
              />
            ))}
          </div>
          
          {/* Second Row - 3 buttons centered */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-[75%] mx-auto">
            {services.slice(4).map((service) => (
              <ServiceButtonComponent 
                key={service.label}
                service={service}
                onClick={() => handleServiceClick(service)}
              />
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function ServiceButtonComponent({ 
  service, 
  onClick 
}: { 
  service: ServiceButton; 
  onClick: () => void;
}) {
  const Icon = service.icon;
  
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center p-3 md:p-4 rounded-xl
        bg-black/40 backdrop-blur-sm border border-[hsl(45,80%,45%)]/30
        hover:bg-black/50 hover:border-[hsl(45,80%,50%)]/50
        transition-all duration-300 ease-out
        min-h-[100px] md:min-h-[120px]"
    >
      {/* Icon Circle */}
      <div className="relative mb-2 md:mb-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[hsl(45,80%,45%)]/50 
          flex items-center justify-center
          group-hover:border-[hsl(45,80%,55%)]/70
          transition-all duration-300">
          <Icon 
            className="w-5 h-5 md:w-6 md:h-6 text-[hsl(45,80%,55%)] group-hover:scale-110 transition-transform duration-300" 
            strokeWidth={1.5} 
          />
        </div>
      </div>
      
      {/* Label */}
      <span className="text-[10px] md:text-xs text-[hsl(45,80%,55%)] font-light text-center leading-tight">
        {service.label}
      </span>
    </button>
  );
}
