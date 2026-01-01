import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import { 
  MessageSquare, 
  Compass, 
  Calendar, 
  FolderOpen, 
  Shield,
  ArrowRight
} from 'lucide-react';

// Abstract geometric graphics component
const HeroGraphics = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Large arc - top right */}
    <svg 
      className="absolute -top-20 -right-20 w-[600px] h-[600px] opacity-20"
      viewBox="0 0 600 600"
    >
      <defs>
        <linearGradient id="goldGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(43 56% 62%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(43 70% 44%)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <circle 
        cx="300" 
        cy="300" 
        r="250" 
        fill="none" 
        stroke="url(#goldGradient1)" 
        strokeWidth="1"
        className="animate-[spin_60s_linear_infinite]"
      />
      <circle 
        cx="300" 
        cy="300" 
        r="200" 
        fill="none" 
        stroke="url(#goldGradient1)" 
        strokeWidth="0.5"
        className="animate-[spin_45s_linear_infinite_reverse]"
      />
    </svg>

    {/* Grid pattern - center */}
    <svg 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03]"
      viewBox="0 0 800 800"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(43 56% 62%)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>

    {/* Diagonal lines - left */}
    <svg 
      className="absolute -left-10 top-1/3 w-[400px] h-[400px] opacity-15"
      viewBox="0 0 400 400"
    >
      <defs>
        <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(43 56% 62%)" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(43 56% 62%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(43 56% 62%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="100" x2="400" y2="100" stroke="url(#goldGradient2)" strokeWidth="1" />
      <line x1="0" y1="200" x2="300" y2="200" stroke="url(#goldGradient2)" strokeWidth="0.5" />
      <line x1="0" y1="300" x2="350" y2="300" stroke="url(#goldGradient2)" strokeWidth="0.5" />
    </svg>

    {/* Corner accent - bottom left */}
    <svg 
      className="absolute -bottom-10 -left-10 w-[300px] h-[300px] opacity-20"
      viewBox="0 0 300 300"
    >
      <path 
        d="M 0 300 Q 150 250 150 150 Q 150 50 300 0" 
        fill="none" 
        stroke="hsl(43 56% 62%)" 
        strokeWidth="1"
      />
      <path 
        d="M 0 250 Q 125 200 125 125 Q 125 50 250 0" 
        fill="none" 
        stroke="hsl(43 56% 62%)" 
        strokeWidth="0.5"
        opacity="0.5"
      />
    </svg>

    {/* Floating dots */}
    <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-primary/30 animate-pulse" />
    <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-1/4 w-1 h-1 rounded-full bg-primary/25 animate-pulse" style={{ animationDelay: '2s' }} />
  </div>
);

// Abstract AI-inspired pattern for sections
const SectionGraphic = ({ variant = 1 }: { variant?: number }) => {
  if (variant === 1) {
    return (
      <svg className="w-16 h-16 text-primary/40" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="32" cy="32" r="16" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="32" cy="32" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="32" cy="32" r="2" fill="currentColor" />
      </svg>
    );
  }
  if (variant === 2) {
    return (
      <svg className="w-16 h-16 text-primary/40" viewBox="0 0 64 64">
        <rect x="16" y="16" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(45 32 32)" />
        <rect x="22" y="22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 32 32)" />
        <circle cx="32" cy="32" r="3" fill="currentColor" />
      </svg>
    );
  }
  if (variant === 3) {
    return (
      <svg className="w-16 h-16 text-primary/40" viewBox="0 0 64 64">
        <path d="M 8 32 L 32 8 L 56 32 L 32 56 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M 16 32 L 32 16 L 48 32 L 32 48 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="32" cy="32" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  if (variant === 4) {
    return (
      <svg className="w-16 h-16 text-primary/40" viewBox="0 0 64 64">
        <line x1="8" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="0.5" />
        <line x1="32" y1="8" x2="32" y2="56" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="32" cy="32" r="4" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg className="w-16 h-16 text-primary/40" viewBox="0 0 64 64">
      <polygon points="32,8 56,24 56,48 32,56 8,48 8,24" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <polygon points="32,16 48,26 48,42 32,48 16,42 16,26" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
    </svg>
  );
};

const features = [
  {
    icon: MessageSquare,
    title: "AI Concierge",
    description: "Intelligent execution. Your requests, handled with precision.",
    graphic: 1,
  },
  {
    icon: Compass,
    title: "Explore Experiences",
    description: "Curated access to Dubai's most exclusive venues and services.",
    graphic: 2,
  },
  {
    icon: Calendar,
    title: "Book & Manage",
    description: "Seamless reservations. Instant confirmations. Zero friction.",
    graphic: 3,
  },
  {
    icon: FolderOpen,
    title: "My Plans",
    description: "Your complete itinerary. Every detail, organized.",
    graphic: 4,
  },
  {
    icon: Shield,
    title: "Private Support",
    description: "Discreet assistance. Always available. Never intrusive.",
    graphic: 5,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        <HeroGraphics />
        
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-6 lg:px-16">
          <div className="flex items-center gap-3">
            <img src={logo} alt="AI My Dubai" className="h-10 w-10 object-contain" />
            <span className="text-foreground font-medium tracking-tight">AI My Dubai</span>
          </div>
          <Button 
            variant="outline" 
            className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
            onClick={() => navigate('/auth')}
          >
            Sign In
          </Button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center">
          {/* Subtle gold line above */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent mb-12" />
          
          {/* Logo mark */}
          <div className="relative mb-8">
            <div className="absolute inset-0 blur-3xl bg-primary/10 rounded-full scale-150" />
            <img 
              src={logo} 
              alt="AI My Dubai" 
              className="relative h-24 w-24 lg:h-32 lg:w-32 object-contain"
            />
          </div>

          {/* Brand Name */}
          <h1 className="text-4xl lg:text-6xl font-medium tracking-tight mb-4">
            AI My Dubai
          </h1>
          
          {/* Tagline */}
          <p className="text-xl lg:text-2xl text-primary font-medium tracking-wide mb-6">
            Concierge. It. Done.
          </p>

          {/* Subtitle */}
          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mb-12 leading-relaxed">
            A private, intelligent concierge that executes life in Dubai — 
            quietly, efficiently, flawlessly.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-medium"
              onClick={() => navigate('/auth')}
            >
              Enter Concierge
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 px-8 py-6 text-base"
              onClick={() => {
                const section = document.getElementById('services');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Services
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 px-8 lg:px-16">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        
        {/* Section header */}
        <div className="relative z-10 text-center mb-20">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto mb-8" />
          <h2 className="text-3xl lg:text-4xl font-medium tracking-tight mb-4">
            Intelligent Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every aspect of your Dubai experience, orchestrated with precision.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative bg-card/50 border border-border/50 rounded-xl p-8 hover:border-primary/30 transition-all duration-500 hover:bg-card/80"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon and graphic */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <SectionGraphic variant={feature.graphic} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-medium mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Subtle arrow on hover */}
                <div className="mt-6 flex items-center gap-2 text-primary/0 group-hover:text-primary/60 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                  <span className="text-xs tracking-wide uppercase">Explore</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statement Section */}
      <section className="relative py-32 px-8 lg:px-16 overflow-hidden">
        {/* Large background graphic */}
        <svg 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-[0.02]"
          viewBox="0 0 1000 1000"
        >
          <circle cx="500" cy="500" r="400" fill="none" stroke="hsl(43 56% 62%)" strokeWidth="1" />
          <circle cx="500" cy="500" r="300" fill="none" stroke="hsl(43 56% 62%)" strokeWidth="0.5" />
          <circle cx="500" cy="500" r="200" fill="none" stroke="hsl(43 56% 62%)" strokeWidth="0.5" />
          <circle cx="500" cy="500" r="100" fill="none" stroke="hsl(43 56% 62%)" strokeWidth="1" />
        </svg>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto mb-12" />
          
          <blockquote className="text-2xl lg:text-4xl font-medium leading-relaxed mb-8">
            <span className="text-primary">"</span>
            For those who do not wait.
            <br />
            And do not explain themselves.
            <span className="text-primary">"</span>
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-primary/30" />
            <span className="text-muted-foreground text-sm tracking-widest uppercase">Private Access</span>
            <div className="w-12 h-px bg-primary/30" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-8 lg:px-16">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="relative bg-card/80 border border-border/50 rounded-2xl p-12 lg:p-16 text-center overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-primary/30 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-primary/30 rounded-br-2xl" />
            
            <h2 className="text-2xl lg:text-3xl font-medium mb-4">
              Begin Your Experience
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Access your private AI concierge and discover what it means to have Dubai handled.
            </p>
            
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-base font-medium"
              onClick={() => navigate('/auth')}
            >
              Enter Concierge
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-8 lg:px-16 border-t border-border/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="AI My Dubai" className="h-8 w-8 object-contain opacity-60" />
            <span className="text-muted-foreground text-sm">AI My Dubai</span>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <span>Concierge. It. Done.</span>
          </div>

          <div className="text-muted-foreground/60 text-xs">
            © 2026 AI My Dubai. Private Access Only.
          </div>
        </div>
      </footer>
    </div>
  );
}
