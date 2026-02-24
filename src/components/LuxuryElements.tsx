// Premium luxury visual components for EVE BLUE
import { cn } from '@/lib/utils';

// Gold particles effect - subtle and elegant
export const GoldParticles = ({ count = 15 }: { count?: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/25 animate-pulse"
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

// Subtle gold wave decoration
export const GoldWaveAccent = ({ position = 'bottom' }: { position?: 'top' | 'bottom' }) => (
  <div className={`absolute left-0 right-0 h-px ${position === 'top' ? 'top-0' : 'bottom-0'}`}>
    <div className="h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
  </div>
);

// Decorative flowing wave SVG
export const FlowingWave = ({ className = '' }: { className?: string }) => (
  <svg 
    className={`absolute w-full h-24 opacity-15 pointer-events-none ${className}`}
    viewBox="0 0 1920 96" 
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#B88A2A" stopOpacity="0" />
        <stop offset="30%" stopColor="#D6B46A" stopOpacity="0.5" />
        <stop offset="50%" stopColor="#F2D58A" stopOpacity="0.7" />
        <stop offset="70%" stopColor="#D6B46A" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#B88A2A" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path 
      d="M0,48 Q480,16 960,48 T1920,48" 
      fill="none" 
      stroke="url(#waveGradient)" 
      strokeWidth="1.5"
    />
  </svg>
);

// Page header with premium styling
export const PageHeader = ({ 
  title, 
  subtitle,
  className
}: { 
  title: string; 
  subtitle?: string;
  className?: string;
}) => (
  <header className={cn(
    "relative bg-card/95 backdrop-blur-xl border-b border-primary/10 px-5 py-6 sticky top-0 z-40",
    className
  )}>
    <GoldWaveAccent position="bottom" />
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-2xl text-primary tracking-tight">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
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
  <header className="relative bg-gradient-to-b from-card to-background border-b border-primary/10 px-5 py-14 overflow-hidden">
    <GoldParticles count={12} />
    <FlowingWave className="top-0" />
    <GoldWaveAccent position="bottom" />
    <div className="relative z-10 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl text-primary tracking-tight mb-3">{title}</h1>
      <p className="text-base text-muted-foreground">{subtitle}</p>
    </div>
  </header>
);

// Section divider with gold accent
export const GoldDivider = () => (
  <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto my-10" />
);

// Premium card with luxury styling
export const LuxuryCard = ({ 
  children, 
  className = '',
  onClick,
  variant = 'default'
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
}) => (
  <div 
    className={cn(
      "rounded-2xl backdrop-blur-sm transition-all duration-300",
      variant === 'default' && "bg-card/60 border border-primary/10 hover:border-primary/20",
      variant === 'elevated' && "bg-card shadow-xl border border-primary/15 hover:border-primary/30",
      variant === 'outlined' && "bg-transparent border-2 border-primary/20 hover:border-primary/40",
      onClick && "cursor-pointer hover:scale-[1.01]",
      className
    )}
    onClick={onClick}
  >
    {children}
  </div>
);

// Section title with consistent styling
export const SectionTitle = ({ 
  children,
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) => (
  <h2 className={cn("text-xl text-foreground mb-5 px-1", className)}>
    {children}
  </h2>
);

// Empty state component
export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
      <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    {description && (
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
    )}
    {action}
  </div>
);