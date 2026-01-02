import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { BottomNav } from '@/components/BottomNav';
import { GoldParticles, LuxuryCard, GoldDivider } from '@/components/LuxuryElements';
import { Button } from '@/components/ui/button';
import { 
  UtensilsCrossed, 
  Car, 
  Hotel, 
  Plane, 
  Music, 
  Sparkles, 
  MessageSquare,
  Calendar,
  ChevronRight 
} from 'lucide-react';
import logo from '@/assets/logo.png';

const quickActions = [
  { 
    icon: UtensilsCrossed, 
    label: 'Book a Table', 
    route: '/explore?category=DINING',
    description: 'Fine dining reservations'
  },
  { 
    icon: Car, 
    label: 'Book a Car', 
    route: '/explore?category=TRANSPORT',
    description: 'Luxury transportation'
  },
  { 
    icon: Hotel, 
    label: 'Book a Hotel', 
    route: '/concierge?intent=HOTEL',
    description: 'Premium accommodations'
  },
  { 
    icon: Plane, 
    label: 'Book a Flight', 
    route: '/concierge?intent=FLIGHT',
    description: 'First-class travel'
  },
  { 
    icon: Music, 
    label: 'Nightlife', 
    route: '/explore?category=CLUB',
    description: 'VIP access'
  },
  { 
    icon: Sparkles, 
    label: 'Experiences', 
    route: '/explore?category=EXPERIENCE',
    description: 'Curated activities'
  },
];

export default function HomePage() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  
  const firstName = profile?.full_name?.split(' ')[0] || 'Guest';

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <GoldParticles count={15} />
      
      {/* Header */}
      <header className="relative bg-card/80 backdrop-blur border-b border-primary/10 px-4 py-6">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 blur-xl bg-primary/10 rounded-full" />
            <img 
              src={logo} 
              alt="AI My Dubai" 
              className="relative w-12 h-12 rounded-lg object-contain"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-medium text-primary tracking-tight">
              Welcome, {firstName}
            </h1>
            <p className="text-xs text-muted-foreground">
              Concierge. It. Done.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Hero CTA */}
        <LuxuryCard className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-medium text-foreground">AI Concierge</h2>
              <p className="text-sm text-muted-foreground">Let me handle everything for you</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/concierge')}
            className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-base"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Start a Conversation
          </Button>
        </LuxuryCard>

        <GoldDivider />

        {/* Quick Actions Grid */}
        <section className="space-y-4">
          <h2 className="text-primary font-medium uppercase tracking-wider text-sm">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.route)}
                  className="p-4 rounded-xl border border-primary/10 bg-card/50 hover:bg-card hover:border-primary/20 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">
                    {action.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {action.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <GoldDivider />

        {/* Secondary Actions */}
        <section className="space-y-3">
          <button
            onClick={() => navigate('/my-plans')}
            className="w-full p-4 rounded-xl border border-primary/10 bg-card/50 hover:bg-card hover:border-primary/20 transition-all flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium group-hover:text-primary transition-colors">My Plans</p>
              <p className="text-xs text-muted-foreground">View your reservations</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>

          <button
            onClick={() => navigate('/explore')}
            className="w-full p-4 rounded-xl border border-primary/10 bg-card/50 hover:bg-card hover:border-primary/20 transition-all flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium group-hover:text-primary transition-colors">Explore</p>
              <p className="text-xs text-muted-foreground">Browse curated experiences</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
