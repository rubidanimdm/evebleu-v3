import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { BottomNav } from '@/components/BottomNav';
import { GoldParticles, GoldDivider, LuxuryCard } from '@/components/LuxuryElements';
import { Button } from '@/components/ui/button';
import { 
  UtensilsCrossed, 
  Car, 
  Hotel, 
  Plane, 
  Music, 
  Sparkles,
  User,
  CalendarCheck,
  LogOut,
  Check,
  Star,
  Shield,
  Heart,
  CreditCard,
  Settings,
  History,
  LogIn
} from 'lucide-react';
import heroImage from '@/assets/ai-mydubai-hero.jpeg';
import logo from '@/assets/logo.png';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const quickActions = [
  { 
    icon: UtensilsCrossed, 
    label: 'Book a Table', 
    route: '/concierge?intent=TABLE',
    gradient: 'from-amber-500/20 to-orange-500/20',
    requiresAuth: true
  },
  { 
    icon: Car, 
    label: 'Book a Car', 
    route: '/concierge?intent=CAR',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    requiresAuth: true
  },
  { 
    icon: Hotel, 
    label: 'Book a Hotel', 
    route: '/concierge?intent=HOTEL',
    gradient: 'from-purple-500/20 to-pink-500/20',
    requiresAuth: true
  },
  { 
    icon: Plane, 
    label: 'Book a Flight', 
    route: '/concierge?intent=FLIGHT',
    gradient: 'from-sky-500/20 to-indigo-500/20',
    requiresAuth: true
  },
  { 
    icon: Music, 
    label: 'Book a Club', 
    route: '/concierge?intent=CLUB',
    gradient: 'from-rose-500/20 to-red-500/20',
    requiresAuth: true
  },
  { 
    icon: Sparkles, 
    label: 'Ask AI Concierge', 
    route: '/concierge',
    gradient: 'from-primary/30 to-primary/10',
    requiresAuth: false
  },
];

const services = [
  { icon: UtensilsCrossed, label: 'Restaurants & Reservations' },
  { icon: Hotel, label: 'Luxury Hotels & Stays' },
  { icon: Car, label: 'Chauffeur & Car Booking' },
  { icon: Plane, label: 'Flights & Premium Travel' },
  { icon: Music, label: 'Clubs, Beach Clubs & Nightlife' },
  { icon: Star, label: 'Experiences & VIP Access' },
  { icon: Heart, label: 'Personal Requests (Anything you need)' },
];

const advantages = [
  { icon: Check, label: 'One place for everything (no WhatsApp chaos)' },
  { icon: Check, label: 'Fast response and clear confirmations' },
  { icon: Star, label: 'Premium curated options (not random lists)' },
  { icon: User, label: 'Personal account + saved preferences' },
  { icon: Shield, label: 'Secure and private' },
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
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="AI My Dubai - Premium Dubai Experience" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        </div>

        {/* Gold Particles */}
        <GoldParticles count={25} />

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 safe-area-pt">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <img src={logo} alt="AI My Dubai" className="w-10 h-10 rounded-lg" />
            </div>
            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/profile')}
                    className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/40"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/my-plans')}
                    className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/40"
                  >
                    <CalendarCheck className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/40"
                  >
                    <LogOut className="w-5 h-5" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="h-10 px-4 rounded-full bg-primary/90 backdrop-blur-md text-primary-foreground hover:bg-primary"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 pb-12 pt-8 w-full">
          <div className="space-y-2 mb-6">
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight drop-shadow-lg">
              AI My Dubai
            </h1>
            <p className="text-xl text-primary font-medium tracking-wide drop-shadow-md">
              Concierge. It. Done.
            </p>
          </div>
          
          {isLoggedIn && profile?.full_name && (
            <p className="text-white/80 text-sm mb-4">
              Welcome back, {profile.full_name.split(' ')[0]}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10 -mt-8">
        {/* Quick Actions Grid */}
        <section className="px-4 mb-8">
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const isLocked = action.requiresAuth && !isLoggedIn;
              return (
                <button
                  key={action.label}
                  onClick={() => handleActionClick(action)}
                  className={`p-4 rounded-2xl border border-primary/20 bg-card/90 backdrop-blur-sm hover:border-primary/40 hover:scale-[1.02] transition-all duration-300 text-left group shadow-lg relative`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {action.label}
                  </p>
                  {isLocked && (
                    <div className="absolute top-2 right-2">
                      <LogIn className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Personal Area - Only for logged in users */}
        {isLoggedIn && (
          <section className="px-4 mb-8">
            <h2 className="text-lg font-semibold text-primary tracking-tight mb-4">Your Account</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/my-plans')}
                className="p-4 rounded-2xl border border-primary/20 bg-card/90 backdrop-blur-sm hover:border-primary/40 hover:scale-[1.02] transition-all duration-300 text-left group shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-3">
                  <History className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  Booking History
                </p>
              </button>
              
              <button
                onClick={() => navigate('/profile')}
                className="p-4 rounded-2xl border border-primary/20 bg-card/90 backdrop-blur-sm hover:border-primary/40 hover:scale-[1.02] transition-all duration-300 text-left group shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center mb-3">
                  <CreditCard className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  Payments
                </p>
              </button>
              
              <button
                onClick={() => navigate('/profile')}
                className="p-4 rounded-2xl border border-primary/20 bg-card/90 backdrop-blur-sm hover:border-primary/40 hover:scale-[1.02] transition-all duration-300 text-left group shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center mb-3">
                  <Settings className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  Invoice Settings
                </p>
              </button>
              
              <button
                onClick={() => navigate('/profile')}
                className="p-4 rounded-2xl border border-primary/20 bg-card/90 backdrop-blur-sm hover:border-primary/40 hover:scale-[1.02] transition-all duration-300 text-left group shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center mb-3">
                  <User className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  My Profile
                </p>
              </button>
            </div>
          </section>
        )}

        <div className="px-4 space-y-8">
          <GoldDivider />

          {/* About Us Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-primary tracking-tight">About Us</h2>
            <LuxuryCard className="p-5">
              <p className="text-muted-foreground leading-relaxed">
                AI My Dubai is your premium concierge assistant for Dubai — built to save you time, 
                remove confusion, and deliver the exact experience you want. From restaurants and hotels 
                to transport and nightlife — you ask, we handle it.
              </p>
            </LuxuryCard>
          </section>

          <GoldDivider />

          {/* Who We Are Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-primary tracking-tight">Who We Are</h2>
            <LuxuryCard className="p-5">
              <p className="text-muted-foreground leading-relaxed">
                We are a discreet concierge team powered by a smart personal assistant. We combine 
                human-level taste and local knowledge with fast automation — so every request is 
                handled accurately and efficiently.
              </p>
            </LuxuryCard>
          </section>

          <GoldDivider />

          {/* Our Services Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-primary tracking-tight">Our Services</h2>
            <div className="space-y-2">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <LuxuryCard key={index} className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <p className="text-foreground font-medium">{service.label}</p>
                  </LuxuryCard>
                );
              })}
            </div>
          </section>

          <GoldDivider />

          {/* Why Us Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-primary tracking-tight">Why Us</h2>
            <div className="space-y-2">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;
                return (
                  <div key={index} className="flex items-center gap-3 p-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" strokeWidth={2} />
                    </div>
                    <p className="text-muted-foreground">{advantage.label}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <GoldDivider />

          {/* CTA Section */}
          <section className="pb-8">
            <LuxuryCard className="p-6 text-center space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Ready to Experience Dubai?</h3>
              <p className="text-muted-foreground text-sm">
                Let our AI concierge handle everything for you
              </p>
              {isLoggedIn ? (
                <Button 
                  onClick={() => navigate('/concierge')}
                  className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-base font-medium"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start a Conversation
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate('/signup')}
                    className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-base font-medium"
                  >
                    <User className="w-5 h-5 mr-2" />
                    Create Account
                  </Button>
                  <Button 
                    onClick={() => navigate('/login')}
                    variant="outline"
                    className="w-full h-12 border-primary/30 text-primary hover:bg-primary/10 rounded-xl text-base"
                  >
                    Already have an account? Sign In
                  </Button>
                </div>
              )}
            </LuxuryCard>
          </section>
        </div>
      </main>

      {/* Bottom Navigation - only for logged in users */}
      {isLoggedIn && <BottomNav />}
    </div>
  );
}
