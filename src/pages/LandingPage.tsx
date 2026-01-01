import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Utensils, Car, Building, Plane, Wine, Ship, Headphones } from 'lucide-react';
import heroImage from '@/assets/ai-mydubai-hero.jpeg';

// Service category button component
const ServiceButton = ({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: React.ElementType; 
  label: string;
  onClick: () => void;
}) => (
  <button 
    onClick={onClick}
    className="group flex flex-col items-center gap-3 p-4 transition-all duration-300"
  >
    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-primary/40 flex items-center justify-center bg-card/30 backdrop-blur-sm group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
      <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary" strokeWidth={1.5} />
    </div>
    <span className="text-primary text-xs md:text-sm font-medium tracking-wide text-center">
      {label}
    </span>
  </button>
);

// Crown logo
const CrownLogo = () => (
  <svg viewBox="0 0 60 40" className="w-10 h-6 text-primary">
    <path 
      d="M5,35 L10,15 L20,25 L30,10 L40,25 L50,15 L55,35 Z" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <circle cx="10" cy="12" r="3" fill="currentColor" opacity="0.8" />
    <circle cx="30" cy="7" r="3" fill="currentColor" opacity="0.8" />
    <circle cx="50" cy="12" r="3" fill="currentColor" opacity="0.8" />
  </svg>
);

export default function LandingPage() {
  const navigate = useNavigate();

  const handleServiceClick = (category: string) => {
    if (category === 'CONCIERGE') {
      navigate('/auth');
    } else {
      navigate(`/auth?redirect=/explore?category=${category}`);
    }
  };

  const services = [
    { icon: Utensils, label: 'Book Me a Table', category: 'DINING' },
    { icon: Car, label: 'Book Me a Car', category: 'TRANSPORT' },
    { icon: Building, label: 'Book Me a Hotel', category: 'HOTEL' },
    { icon: Plane, label: 'Book Me a Flight', category: 'FLIGHT' },
    { icon: Wine, label: 'Book Me a Club', category: 'CLUB' },
    { icon: Ship, label: 'Book an Experience', category: 'EXPERIENCE' },
    { icon: Headphones, label: 'Handle It For Me', category: 'CONCIERGE' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher variant="full" />
      </div>

      {/* Full-screen Hero with Image */}
      <div className="relative min-h-screen flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="AI My Dubai - Luxury Concierge"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/80" />
        </div>

        {/* Content positioned over the image */}
        <div className="relative z-10 flex-1 flex flex-col justify-end pb-8 px-4">
          {/* Service Buttons Grid - positioned at bottom */}
          <div className="max-w-md mx-auto w-full">
            {/* First row - 4 buttons */}
            <div className="grid grid-cols-4 gap-1 mb-2">
              {services.slice(0, 4).map((service) => (
                <ServiceButton
                  key={service.category}
                  icon={service.icon}
                  label={service.label}
                  onClick={() => handleServiceClick(service.category)}
                />
              ))}
            </div>
            
            {/* Second row - 3 buttons centered */}
            <div className="flex justify-center gap-1">
              {services.slice(4, 7).map((service) => (
                <ServiceButton
                  key={service.category}
                  icon={service.icon}
                  label={service.label}
                  onClick={() => handleServiceClick(service.category)}
                />
              ))}
            </div>
          </div>

          {/* Crown + Footer Links */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <CrownLogo />
            <div className="flex items-center gap-8 text-xs text-muted-foreground/60">
              <button 
                onClick={() => navigate('/auth')}
                className="hover:text-primary transition-colors"
              >
                Contact
              </button>
              <button 
                onClick={() => navigate('/auth')}
                className="hover:text-primary transition-colors"
              >
                Privacy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
