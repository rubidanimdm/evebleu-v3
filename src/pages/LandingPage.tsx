import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, Compass, CreditCard, Headphones } from 'lucide-react';

// Flowing gold wave SVG
const GoldWaves = ({ position = 'top' }: { position?: 'top' | 'middle' | 'bottom' }) => {
  const isTop = position === 'top';
  const isMiddle = position === 'middle';
  
  return (
    <div className={`absolute left-0 right-0 overflow-hidden pointer-events-none ${
      isTop ? 'top-0 h-[500px]' : isMiddle ? 'top-1/2 -translate-y-1/2 h-[200px]' : 'bottom-0 h-[300px]'
    }`}>
      <svg 
        className="absolute w-full h-full" 
        viewBox="0 0 1920 500" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`goldWaveGradient-${position}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B88A2A" stopOpacity="0" />
            <stop offset="20%" stopColor="#D6B46A" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#F2D58A" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#D6B46A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#B88A2A" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Primary flowing wave */}
        <path 
          d={isTop 
            ? "M-100,400 Q200,350 400,380 T800,340 T1200,380 T1600,350 T2020,400" 
            : "M-100,100 Q200,150 400,120 T800,160 T1200,120 T1600,150 T2020,100"
          }
          fill="none" 
          stroke={`url(#goldWaveGradient-${position})`}
          strokeWidth="2"
          filter="url(#glow)"
          className="animate-[wave_8s_ease-in-out_infinite]"
        />
        
        {/* Secondary wave */}
        <path 
          d={isTop 
            ? "M-100,420 Q300,370 500,400 T900,360 T1300,400 T1700,370 T2020,420" 
            : "M-100,120 Q300,170 500,140 T900,180 T1300,140 T1700,170 T2020,120"
          }
          fill="none" 
          stroke={`url(#goldWaveGradient-${position})`}
          strokeWidth="1"
          opacity="0.5"
          className="animate-[wave_10s_ease-in-out_infinite_reverse]"
        />
        
        {/* Tertiary subtle wave */}
        <path 
          d={isTop 
            ? "M-100,440 Q400,390 600,420 T1000,380 T1400,420 T1800,390 T2020,440" 
            : "M-100,140 Q400,190 600,160 T1000,200 T1400,160 T1800,190 T2020,140"
          }
          fill="none" 
          stroke={`url(#goldWaveGradient-${position})`}
          strokeWidth="0.5"
          opacity="0.3"
          className="animate-[wave_12s_ease-in-out_infinite]"
        />
      </svg>
    </div>
  );
};

// Dubai Skyline silhouette
const DubaiSkyline = () => (
  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[400px] h-[200px] opacity-60">
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <defs>
        <linearGradient id="skylineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F2D58A" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#D6B46A" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#B88A2A" stopOpacity="0.1" />
        </linearGradient>
        <filter id="skylineGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Burj Khalifa center */}
      <path 
        d="M200,20 L203,20 L205,80 L208,80 L210,180 L190,180 L192,80 L195,80 L197,20 Z" 
        fill="url(#skylineGradient)"
        filter="url(#skylineGlow)"
      />
      
      {/* Left buildings */}
      <rect x="120" y="100" width="20" height="80" fill="url(#skylineGradient)" opacity="0.6" />
      <rect x="145" y="80" width="15" height="100" fill="url(#skylineGradient)" opacity="0.5" />
      <rect x="165" y="120" width="18" height="60" fill="url(#skylineGradient)" opacity="0.4" />
      
      {/* Right buildings */}
      <rect x="220" y="90" width="18" height="90" fill="url(#skylineGradient)" opacity="0.5" />
      <rect x="245" y="110" width="15" height="70" fill="url(#skylineGradient)" opacity="0.4" />
      <rect x="265" y="95" width="20" height="85" fill="url(#skylineGradient)" opacity="0.6" />
      
      {/* Burj Al Arab style */}
      <path 
        d="M80,180 L80,100 Q90,80 100,100 L100,180 Z" 
        fill="url(#skylineGradient)"
        opacity="0.5"
      />
      
      {/* Right tower */}
      <path 
        d="M320,180 L320,90 L330,70 L340,90 L340,180 Z" 
        fill="url(#skylineGradient)"
        opacity="0.5"
      />
    </svg>
  </div>
);

// Gold particles effect
const GoldParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/40 animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
        }}
      />
    ))}
  </div>
);

// Feature card component
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => (
  <div className="group relative bg-card/30 border border-primary/20 rounded-xl p-8 hover:border-primary/40 transition-all duration-500 backdrop-blur-sm">
    {/* Icon container */}
    <div className="flex justify-center mb-6">
      <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center bg-background/50 group-hover:border-primary/50 transition-colors duration-300">
        <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
      </div>
    </div>
    
    {/* Title */}
    <h3 className="text-lg font-medium text-primary text-center mb-3">
      {title}
    </h3>
    
    {/* Description */}
    <p className="text-muted-foreground text-sm text-center leading-relaxed">
      {description}
    </p>
  </div>
);

// Crown logo for footer
const CrownLogo = () => (
  <svg viewBox="0 0 60 40" className="w-12 h-8 text-primary">
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

const features = [
  {
    icon: Brain,
    title: "AI Concierge",
    description: "A private AI that interprets intent and executes instantly.",
  },
  {
    icon: Compass,
    title: "Explore",
    description: "Curated access to Dubai's most exclusive venues & services.",
  },
  {
    icon: CreditCard,
    title: "Book & Manage",
    description: "Secure booking and payment inside the platform.",
  },
  {
    icon: Headphones,
    title: "My Plans",
    description: "All your reservations, organized and controlled.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Add wave animation keyframe */}
      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-20px) translateY(5px); }
        }
      `}</style>

      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/50" />
        <GoldParticles />
        <GoldWaves position="top" />
        <DubaiSkyline />
        
        {/* Hero content */}
        <div className="relative z-10 text-center px-6 mt-32">
          {/* Brand name */}
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-primary mb-4">
            AI MY DUBAI
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl text-foreground font-medium tracking-wide mb-6">
            Concierge. It. Done.
          </p>
          
          {/* Subline */}
          <p className="text-muted-foreground text-lg mb-12">
            Your private AI concierge for Dubai.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-base font-medium rounded-lg min-w-[180px]"
              onClick={() => navigate('/auth')}
            >
              Enter Concierge
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary px-10 py-6 text-base font-medium rounded-lg min-w-[180px]"
              onClick={() => {
                const section = document.getElementById('how-it-works');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Services
            </Button>
          </div>
        </div>
        
        {/* Bottom wave decoration */}
        <GoldWaves position="bottom" />
      </section>

      {/* ========== STATEMENT SECTION ========== */}
      <section className="relative py-32 px-6 overflow-hidden">
        <GoldParticles />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <h2 className="text-3xl md:text-5xl font-medium text-foreground mb-8">
            Dubai, handled for you.
          </h2>
          
          {/* Subtext */}
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-4">
            One intelligent interface.
            <br />
            All of Dubai, executed.
          </p>
          
          <p className="text-primary/80 text-lg tracking-wide">
            Dining. Nightlife. Transport. Experiences.
          </p>
        </div>
      </section>

      {/* ========== HOW IT WORKS SECTION ========== */}
      <section id="how-it-works" className="relative py-24 px-6 overflow-hidden">
        {/* Wave decorations */}
        <GoldWaves position="top" />
        <GoldParticles />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section title */}
          <h2 className="text-3xl md:text-4xl font-medium text-foreground text-center mb-16">
            How it works.
          </h2>
          
          {/* Feature cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <FeatureCard 
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
        
        <GoldWaves position="bottom" />
      </section>

      {/* ========== CONTROL LAYER SECTION ========== */}
      <section className="relative py-32 px-6 overflow-hidden">
        <GoldParticles />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <h2 className="text-3xl md:text-5xl font-medium text-foreground mb-8">
            Not a service. A control layer.
          </h2>
          
          {/* Subtext */}
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-4">
            AI My Dubai is not about recommendations.
            <br />
            It is about execution.
          </p>
          
          <p className="text-primary/80 text-lg tracking-wide">
            Quietly. Precisely. Reliably.
          </p>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="relative py-16 px-6 border-t border-border/20">
        {/* Wave decoration */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="max-w-6xl mx-auto">
          {/* Crown logo centered */}
          <div className="flex justify-center mb-8">
            <CrownLogo />
          </div>
          
          {/* Links */}
          <div className="flex items-center justify-center gap-12 text-sm text-muted-foreground">
            <button 
              onClick={() => navigate('/auth')}
              className="hover:text-primary transition-colors duration-300"
            >
              Contact
            </button>
            <button 
              onClick={() => navigate('/auth')}
              className="hover:text-primary transition-colors duration-300"
            >
              Privacy
            </button>
          </div>
          
          {/* Copyright */}
          <p className="text-center text-muted-foreground/50 text-xs mt-8">
            © 2026 AI My Dubai. Private Access Only.
          </p>
        </div>
      </footer>
    </div>
  );
}
