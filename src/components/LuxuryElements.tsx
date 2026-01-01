// Shared luxury visual components matching the landing page master baseline

// Gold particles effect
export const GoldParticles = ({ count = 20 }: { count?: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/30 animate-pulse"
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

// Subtle gold wave decoration for headers/sections
export const GoldWaveAccent = ({ position = 'bottom' }: { position?: 'top' | 'bottom' }) => (
  <div className={`absolute left-0 right-0 h-px ${position === 'top' ? 'top-0' : 'bottom-0'}`}>
    <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
  </div>
);

// Decorative flowing wave SVG for page sections
export const FlowingWave = ({ className = '' }: { className?: string }) => (
  <svg 
    className={`absolute w-full h-32 opacity-20 pointer-events-none ${className}`}
    viewBox="0 0 1920 128" 
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#B88A2A" stopOpacity="0" />
        <stop offset="30%" stopColor="#D6B46A" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#F2D58A" stopOpacity="0.8" />
        <stop offset="70%" stopColor="#D6B46A" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#B88A2A" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path 
      d="M0,64 Q480,20 960,64 T1920,64" 
      fill="none" 
      stroke="url(#waveGradient)" 
      strokeWidth="1.5"
    />
    <path 
      d="M0,80 Q480,40 960,80 T1920,80" 
      fill="none" 
      stroke="url(#waveGradient)" 
      strokeWidth="0.75"
      opacity="0.5"
    />
  </svg>
);

// Page header with consistent styling
export const PageHeader = ({ 
  title, 
  subtitle 
}: { 
  title: string; 
  subtitle: string;
}) => (
  <header className="relative bg-card/80 backdrop-blur border-b border-primary/10 px-4 py-6 sticky top-0 z-40">
    <GoldWaveAccent position="bottom" />
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-xl font-medium text-primary tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    </div>
  </header>
);

// Large page header for feature pages
export const LargePageHeader = ({ 
  title, 
  subtitle 
}: { 
  title: string; 
  subtitle: string;
}) => (
  <header className="relative bg-gradient-to-b from-card to-background border-b border-primary/10 px-4 py-12 overflow-hidden">
    <GoldParticles count={15} />
    <FlowingWave className="top-0" />
    <GoldWaveAccent position="bottom" />
    <div className="relative z-10 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl md:text-3xl font-medium text-primary tracking-tight mb-2">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  </header>
);

// Section divider with gold accent
export const GoldDivider = () => (
  <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto my-8" />
);

// Card with luxury styling
export const LuxuryCard = ({ 
  children, 
  className = '',
  onClick
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) => (
  <div 
    className={`bg-card/50 border border-primary/10 rounded-xl backdrop-blur-sm hover:border-primary/25 transition-all duration-500 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);
