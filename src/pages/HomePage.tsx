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
      className="fixed inset-0 w-full h-full"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Invisible button overlays - positioned to match the buttons in the background image */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[12%]">
        <div className="w-full max-w-[85%] md:max-w-[600px]">
          {/* First Row - 4 buttons */}
          <div className="grid grid-cols-4 gap-[2%] mb-[2%]">
            {services.slice(0, 4).map((service) => (
              <button
                key={service.label}
                onClick={() => handleServiceClick(service)}
                className="aspect-[1/1.1] rounded-xl cursor-pointer hover:bg-white/5 active:bg-white/10 transition-colors duration-200"
                aria-label={service.label}
              />
            ))}
          </div>
          
          {/* Second Row - 3 buttons centered */}
          <div className="grid grid-cols-3 gap-[2%] w-[75%] mx-auto">
            {services.slice(4).map((service) => (
              <button
                key={service.label}
                onClick={() => handleServiceClick(service)}
                className="aspect-[1/1.1] rounded-xl cursor-pointer hover:bg-white/5 active:bg-white/10 transition-colors duration-200"
                aria-label={service.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
