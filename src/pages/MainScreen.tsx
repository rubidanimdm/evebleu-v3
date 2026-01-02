import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { BottomNav } from '@/components/BottomNav';
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
  Check,
  Star,
  Shield,
  ChevronRight,
  LogIn,
  ArrowRight
} from 'lucide-react';
import heroImage from '@/assets/ai-mydubai-hero.jpeg';
import logo from '@/assets/logo.png';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const quickActions = [
  { 
    icon: UtensilsCrossed, 
    label: 'Restaurant', 
    route: '/concierge?intent=TABLE',
    requiresAuth: true
  },
  { 
    icon: Car, 
    label: 'Car', 
    route: '/concierge?intent=CAR',
    requiresAuth: true
  },
  { 
    icon: Hotel, 
    label: 'Hotel', 
    route: '/concierge?intent=HOTEL',
    requiresAuth: true
  },
  { 
    icon: Plane, 
    label: 'Flight', 
    route: '/concierge?intent=FLIGHT',
    requiresAuth: true
  },
  { 
    icon: Music, 
    label: 'Nightlife', 
    route: '/concierge?intent=CLUB',
    requiresAuth: true
  },
];

const services = [
  { icon: UtensilsCrossed, label: 'Fine Dining & Reservations' },
  { icon: Hotel, label: 'Luxury Hotels & Stays' },
  { icon: Car, label: 'Chauffeur & Car Service' },
  { icon: Plane, label: 'Private Flights & Travel' },
  { icon: Music, label: 'Beach Clubs & Nightlife' },
  { icon: Star, label: 'VIP Experiences' },
];

const benefits = [
  { icon: Check, label: 'One place for everything' },
  { icon: Shield, label: 'Secure & private' },
  { icon: Star, label: 'Curated premium options' },
];

export default function MainScreen() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isLoggedIn = !!user;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: 'Signed out' });
  };

  const handleActionClick = (action: typeof quickActions[0]) => {
    if (action.requiresAuth && !isLoggedIn) {
      navigate('/login');
      return;
    }
    navigate(action.route);
  };

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-x-hidden">
      {/* Hero Section - Visual Only */}
      <section className="relative h-[45vh] min-h-[320px] max-h-[400px] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Dubai Skyline" 
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 safe-area-pt">
          <div className="flex items-center justify-between px-5 py-4">
            <img src={logo} alt="AI My Dubai" className="w-11 h-11 rounded-xl shadow-lg" />
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/profile')}
                    className="h-11 w-11 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/50 border border-white/10"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="h-11 w-11 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/50 border border-white/10"
                  >
                    <LogOut className="w-5 h-5" />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => navigate('/login')}
                  className="h-11 px-5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Clean Sections */}
      <main className="relative z-10 -mt-16 px-5">
        
        {/* Welcome Card */}
        <section className="mb-8">
          <div className="bg-card rounded-3xl p-6 shadow-xl border border-primary/20">
            <div className="text-center mb-6">
              <h1 className="text-3xl text-primary mb-2">AI My Dubai</h1>
              <p className="text-lg text-foreground font-medium">Concierge. It. Done.</p>
              {isLoggedIn && profile?.full_name && (
                <p className="text-muted-foreground mt-2">
                  Welcome back, {profile.full_name.split(' ')[0]}
                </p>
              )}
            </div>

            {/* Primary CTA */}
            <Button 
              onClick={() => isLoggedIn ? navigate('/concierge') : navigate('/signup')}
              className="w-full h-16 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              {isLoggedIn ? 'Talk to AI Concierge' : 'Get Started Free'}
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>

            {!isLoggedIn && (
              <Button 
                onClick={() => navigate('/login')}
                variant="ghost"
                className="w-full h-14 mt-3 text-primary hover:bg-primary/10 rounded-2xl text-base"
              >
                Already have an account? Sign In
              </Button>
            )}
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="mb-10">
          <h2 className="text-xl text-foreground mb-5 px-1">Quick Book</h2>
          <div className="grid grid-cols-5 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => handleActionClick(action)}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-primary/15 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Benefits Strip */}
        <section className="mb-10">
          <div className="flex items-center justify-around py-4 px-2 bg-card rounded-2xl border border-primary/10">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" strokeWidth={2} />
                  </div>
                  <span className="text-sm text-muted-foreground hidden sm:block">{benefit.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Services List */}
        <section className="mb-10">
          <h2 className="text-xl text-foreground mb-5 px-1">Our Services</h2>
          <div className="space-y-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate('/concierge')}
                  className="w-full flex items-center gap-4 p-5 bg-card rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="flex-1 text-base font-medium text-foreground">{service.label}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              );
            })}
          </div>
        </section>

        {/* About Section */}
        <section className="mb-10">
          <div className="bg-card rounded-3xl p-6 border border-primary/15">
            <h2 className="text-xl text-foreground mb-4">About AI My Dubai</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Your premium concierge assistant for Dubai — built to save you time, 
              remove confusion, and deliver the exact experience you want.
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-6" />
            <p className="text-muted-foreground leading-relaxed">
              We combine human-level taste and local knowledge with smart automation — 
              so every request is handled accurately and efficiently.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="pb-8">
          <div className="bg-gradient-to-br from-primary/15 to-primary/5 rounded-3xl p-6 text-center border border-primary/20">
            <h3 className="text-xl text-foreground mb-2">Ready to Experience Dubai?</h3>
            <p className="text-muted-foreground mb-6">
              Let our AI concierge handle everything for you
            </p>
            <Button 
              onClick={() => isLoggedIn ? navigate('/concierge') : navigate('/signup')}
              className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl text-base font-semibold"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {isLoggedIn ? 'Start a Conversation' : 'Create Free Account'}
            </Button>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      {isLoggedIn && <BottomNav />}
    </div>
  );
}