import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import heroBackground from '@/assets/hero-background.jpeg';

interface ServiceButton {
  label: string;
  route: string;
  category?: string;
  intent?: string;
}

const services: ServiceButton[] = [
  { label: 'Book Me a Table', route: '/auth', category: 'DINING' },
  { label: 'Book Me a Car', route: '/auth', category: 'TRANSPORT' },
  { label: 'Book Me a Hotel', route: '/auth', category: 'HOTEL' },
  { label: 'Book Me a Flight', route: '/auth', category: 'FLIGHT' },
  { label: 'Book Me a Club', route: '/auth', category: 'CLUB' },
  { label: 'Book an Experience', route: '/auth', category: 'EXPERIENCE' },
  { label: 'Handle It For Me', route: '/auth', intent: 'CONCIERGE' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  const handleServiceClick = (service: ServiceButton) => {
    if (service.category) {
      navigate(`/auth?redirect=/explore?category=${service.category}`);
    } else if (service.intent) {
      navigate(`/auth?redirect=/concierge`);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div 
      className="fixed inset-0 w-full h-full overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#0a0a0a',
      }}
    >
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher variant="full" />
      </div>

      {/* Button overlays - positioned to match buttons in background image */}
      <div className="absolute inset-0 flex flex-col items-center justify-end">
        {/* 
          Positioning calibrated for the reference image:
          - Desktop (1440px+): buttons at ~60% from top
          - Tablet: adjusted for portrait orientation
          - Mobile: stacked layout with maintained hierarchy
        */}
        <div 
          className="w-full flex justify-center"
          style={{ 
            paddingBottom: 'clamp(8%, 12vh, 15%)',
          }}
        >
          <div className="w-[85%] max-w-[550px] md:max-w-[600px] lg:max-w-[650px]">
            {/* First Row - 4 buttons */}
            <div className="grid grid-cols-4 gap-[3%] mb-[3%]">
              {services.slice(0, 4).map((service) => (
                <ServiceButtonOverlay
                  key={service.label}
                  label={service.label}
                  onClick={() => handleServiceClick(service)}
                />
              ))}
            </div>
            
            {/* Second Row - 3 buttons centered */}
            <div className="grid grid-cols-3 gap-[3%] w-[75%] mx-auto">
              {services.slice(4).map((service) => (
                <ServiceButtonOverlay
                  key={service.label}
                  label={service.label}
                  onClick={() => handleServiceClick(service)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceButtonOverlay({ 
  label, 
  onClick 
}: { 
  label: string; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        aspect-[1/1.15] rounded-xl cursor-pointer
        transition-all duration-300 ease-out
        hover:bg-[hsl(45,80%,50%)]/8 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]
        active:bg-[hsl(45,80%,50%)]/12 active:shadow-[0_0_25px_rgba(212,175,55,0.25)]
        focus:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(45,80%,50%)]/30
      "
      aria-label={label}
    />
  );
}