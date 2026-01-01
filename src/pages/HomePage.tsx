import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Car, Building, Plane, Wine, Ship, Headphones } from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { BottomNav } from '@/components/BottomNav';
import { GoldParticles, FlowingWave, GoldWaveAccent } from '@/components/LuxuryElements';

interface ServiceButton {
  icon: React.ElementType;
  label: string;
  route: string;
  category?: string;
  conciergeIntent?: string;
}

const services: ServiceButton[] = [
  { icon: UtensilsCrossed, label: 'Book Me a Table', route: '/explore', category: 'restaurant' },
  { icon: Car, label: 'Book Me a Car', route: '/explore', category: 'transport' },
  { icon: Building, label: 'Book Me a Hotel', route: '/concierge', conciergeIntent: 'I need to book a hotel' },
  { icon: Plane, label: 'Book Me a Flight', route: '/concierge', conciergeIntent: 'I need to book a flight' },
  { icon: Wine, label: 'Book Me a Club', route: '/explore', category: 'nightlife' },
  { icon: Ship, label: 'Book an Experience', route: '/explore', category: 'yacht' },
  { icon: Headphones, label: 'Handle It For Me', route: '/concierge', conciergeIntent: 'I have a custom request' },
];

export default function HomePage() {
  const navigate = useNavigate();

  const handleServiceClick = (service: ServiceButton) => {
    if (service.category) {
      navigate(`${service.route}?category=${service.category}`);
    } else if (service.conciergeIntent) {
      navigate(`${service.route}?intent=${encodeURIComponent(service.conciergeIntent)}`);
    } else {
      navigate(service.route);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/3 via-transparent to-transparent" />
      
      <GoldParticles count={30} />
      <FlowingWave className="absolute top-1/4 left-0 right-0 opacity-40" />
      
      {/* Dubai Skyline Silhouette */}
      <div className="absolute top-0 left-0 right-0 h-80 pointer-events-none">
        <svg viewBox="0 0 1200 300" className="w-full h-full opacity-20" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="skylineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Burj Khalifa center */}
          <path d="M600 300 L600 40 L602 30 L604 40 L604 300 Z" fill="url(#skylineGradient)" />
          {/* Left buildings */}
          <rect x="200" y="180" width="40" height="120" fill="url(#skylineGradient)" />
          <rect x="250" y="150" width="50" height="150" fill="url(#skylineGradient)" />
          <rect x="320" y="120" width="35" height="180" fill="url(#skylineGradient)" />
          <rect x="380" y="160" width="60" height="140" fill="url(#skylineGradient)" />
          <rect x="460" y="100" width="45" height="200" fill="url(#skylineGradient)" />
          <rect x="520" y="140" width="55" height="160" fill="url(#skylineGradient)" />
          {/* Right buildings */}
          <rect x="620" y="130" width="50" height="170" fill="url(#skylineGradient)" />
          <rect x="690" y="110" width="40" height="190" fill="url(#skylineGradient)" />
          <rect x="750" y="150" width="55" height="150" fill="url(#skylineGradient)" />
          <rect x="820" y="170" width="45" height="130" fill="url(#skylineGradient)" />
          <rect x="890" y="140" width="60" height="160" fill="url(#skylineGradient)" />
          <rect x="970" y="190" width="50" height="110" fill="url(#skylineGradient)" />
        </svg>
      </div>

      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pb-24">
        {/* Logo & Tagline */}
        <div className="text-center mb-12 pt-20">
          {/* Crown Icon */}
          <div className="mb-6">
            <svg viewBox="0 0 60 40" className="w-16 h-10 mx-auto text-primary">
              <path 
                d="M30 5 L35 15 L45 10 L40 25 L20 25 L15 10 L25 15 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
              />
              <circle cx="30" cy="5" r="2" fill="currentColor" />
              <circle cx="15" cy="10" r="2" fill="currentColor" />
              <circle cx="45" cy="10" r="2" fill="currentColor" />
            </svg>
          </div>
          
          {/* Brand Name */}
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-4">
            <span className="text-foreground">AI</span>
            <span className="text-primary italic ml-3">My Dubai</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-lg md:text-xl text-primary/80 tracking-[0.3em] uppercase font-light">
            Concierge. It. Done.
          </p>
        </div>

        <GoldWaveAccent position="top" />

        {/* Service Buttons Grid */}
        <div className="w-full max-w-3xl mx-auto">
          {/* First Row - 4 buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {services.slice(0, 4).map((service) => (
              <ServiceButtonComponent 
                key={service.label}
                service={service}
                onClick={() => handleServiceClick(service)}
              />
            ))}
          </div>
          
          {/* Second Row - 3 buttons centered */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-xl md:max-w-2xl mx-auto">
            {services.slice(4).map((service) => (
              <ServiceButtonComponent 
                key={service.label}
                service={service}
                onClick={() => handleServiceClick(service)}
              />
            ))}
          </div>
        </div>

        {/* Footer Crown */}
        <div className="mt-16">
          <svg viewBox="0 0 60 40" className="w-10 h-6 mx-auto text-primary/40">
            <path 
              d="M30 5 L35 15 L45 10 L40 25 L20 25 L15 10 L25 15 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
            />
          </svg>
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
      className="group relative flex flex-col items-center justify-center p-6 rounded-2xl
        bg-card/30 backdrop-blur-md border border-primary/20
        hover:bg-card/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10
        transition-all duration-300 ease-out
        min-h-[140px] md:min-h-[160px]"
    >
      {/* Icon Circle */}
      <div className="relative mb-4">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-primary/40 
          flex items-center justify-center
          group-hover:border-primary/60 group-hover:shadow-md group-hover:shadow-primary/20
          transition-all duration-300">
          <Icon 
            className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:scale-110 transition-transform duration-300" 
            strokeWidth={1.5} 
          />
        </div>
      </div>
      
      {/* Label */}
      <span className="text-sm md:text-base text-primary/90 font-light text-center leading-tight
        group-hover:text-primary transition-colors duration-300">
        {service.label}
      </span>
    </button>
  );
}
