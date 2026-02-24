import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { 
  UtensilsCrossed, 
  Car, 
  Hotel, 
  Plane, 
  Music, 
  Sparkles,
  User,
  LogOut,
  ArrowRight
} from 'lucide-react';
import heroVideo from '@/assets/hero-video.mp4';
import logo from '@/assets/eve-blue-logo.jpeg';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { BottomNav } from '@/components/BottomNav';

const quickActions = [
  { 
    icon: UtensilsCrossed, 
    label: 'Restaurant', 
    route: '/concierge?intent=TABLE'
  },
  { 
    icon: Car, 
    label: 'Car', 
    route: '/concierge?intent=CAR'
  },
  { 
    icon: Hotel, 
    label: 'Hotel', 
    route: '/concierge?intent=HOTEL'
  },
  { 
    icon: Plane, 
    label: 'Flight', 
    route: '/concierge?intent=FLIGHT'
  },
  { 
    icon: Music, 
    label: 'Nightlife', 
    route: '/concierge?intent=CLUB'
  },
];

export default function ResidentHome() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: 'Signed out successfully' });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Video Background - Full Screen */}
      <div className="fixed inset-0 z-0">
        <video 
          src={heroVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col safe-area-pt safe-area-pb pb-24">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-5 py-4">
          <img src={logo} alt="EVE BLUE" className="w-12 h-12 rounded-xl shadow-lg" />
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile')}
              className="h-11 w-11 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/50 border border-white/20"
            >
              <User className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-11 w-11 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/50 border border-white/20"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Spacer to push content to center/bottom */}
        <div className="flex-1" />

        {/* Main Content */}
        <main className="px-5 pb-8">
          {/* Welcome Text */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-display text-white mb-2 drop-shadow-lg">
              {profile?.full_name ? `Hi, ${profile.full_name.split(' ')[0]}` : 'Welcome'}
            </h1>
            <p className="text-xl text-white/90 font-medium drop-shadow-md">What can we do for you?</p>
          </div>

          {/* Quick Actions - Icon Buttons */}
          <div className="flex justify-center gap-4 mb-10">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.route)}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:scale-110">
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Primary CTA */}
          <Button 
            onClick={() => navigate('/concierge')}
            className="w-full h-16 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <Sparkles className="w-6 h-6 mr-3" />
            Talk to AI Concierge
            <ArrowRight className="w-5 h-5 ml-3" />
          </Button>
        </main>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
