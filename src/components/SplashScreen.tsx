import { useState, useEffect } from 'react';
import logo from '@/assets/eve-blue-logo-white.gif';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    // Enter → hold
    const holdTimer = setTimeout(() => setPhase('hold'), 300);
    // Hold → exit
    const exitTimer = setTimeout(() => setPhase('exit'), 2000);
    // Complete
    const completeTimer = setTimeout(() => onComplete(), 2700);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
        phase === 'exit' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Radial glow behind logo */}
      <div
        className={`absolute w-[400px] h-[400px] rounded-full transition-all duration-[1.5s] ease-out ${
          phase === 'enter' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
        }`}
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <img
        src={logo}
        alt="EVE BLUE"
        className={`relative w-[220px] sm:w-[280px] h-auto rounded-lg transition-all duration-[1s] ease-out ${
          phase === 'enter'
            ? 'opacity-0 scale-90 translate-y-4'
            : 'opacity-100 scale-100 translate-y-0'
        }`}
      />

      {/* Tagline */}
      <p
        className={`relative mt-6 text-foreground/40 text-xs sm:text-sm tracking-[0.35em] uppercase transition-all duration-700 ease-out ${
          phase === 'enter'
            ? 'opacity-0 translate-y-3'
            : phase === 'hold'
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2'
        }`}
        style={{ transitionDelay: phase === 'enter' ? '0ms' : '400ms' }}
      >
        Concierge. It. Done.
      </p>

      {/* Bottom shimmer line */}
      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-24 h-px shimmer-line" />
    </div>
  );
}
