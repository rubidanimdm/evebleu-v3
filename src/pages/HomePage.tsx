import { useNavigate } from 'react-router-dom';
import { SERVICE_CATEGORIES, CONCIERGE_INTENTS } from '@/lib/constants';
import heroBackground from '@/assets/hero-background.jpeg';

interface ServiceButton {
  label: string;
  route: string;
  category?: string;
  intent?: string;
}

const services: ServiceButton[] = [
  { label: 'Book Me a Table', route: '/explore', category: SERVICE_CATEGORIES.DINING },
  { label: 'Book Me a Car', route: '/explore', category: SERVICE_CATEGORIES.TRANSPORT },
  { label: 'Book Me a Hotel', route: '/concierge', intent: SERVICE_CATEGORIES.HOTEL },
  { label: 'Book Me a Flight', route: '/concierge', intent: SERVICE_CATEGORIES.FLIGHT },
  { label: 'Book Me a Club', route: '/explore', category: SERVICE_CATEGORIES.CLUB },
  { label: 'Book an Experience', route: '/explore', category: SERVICE_CATEGORIES.EXPERIENCE },
  { label: 'Handle It For Me', route: '/concierge', intent: CONCIERGE_INTENTS.CUSTOM_REQUEST },
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
    <div 
      className="fixed inset-0 w-full h-full overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
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
