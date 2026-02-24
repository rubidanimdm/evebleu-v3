import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { User, LogOut, ChevronDown, Phone, Mail, MapPin, Star, Shield, Clock, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef, useState } from 'react';
import logo from '@/assets/eve-blue-logo.jpeg';
import heroImg from '@/assets/hero-background.jpeg';

const services = [
  {
    title: 'Attractions',
    titleHe: 'אטרקציות',
    description: 'Exclusive access to Dubai\'s most iconic landmarks and hidden gems',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20" />
        <path d="M2 12h20" />
      </svg>
    ),
    route: '/concierge?intent=ATTRACTION',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
  },
  {
    title: 'Luxury Cars',
    titleHe: 'השכרת רכבי יוקרה',
    description: 'Premium fleet of supercars and luxury vehicles at your disposal',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2" />
        <circle cx="7.5" cy="17" r="2" /><circle cx="16.5" cy="17" r="2" />
        <path d="M3 9l2-4h14l2 4" />
      </svg>
    ),
    route: '/concierge?intent=CAR',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
  },
  {
    title: 'Dining & Nightlife',
    titleHe: 'מסעדות וחיי לילה',
    description: 'VIP reservations at Dubai\'s finest restaurants and hottest venues',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11h18M5 11V6a7 7 0 0 1 14 0v5" />
        <path d="M12 11v6" /><circle cx="12" cy="19" r="2" />
      </svg>
    ),
    route: '/concierge?intent=TABLE',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  },
  {
    title: 'Yacht Charters',
    titleHe: 'השכרת יאכטות',
    description: 'Private yacht experiences along Dubai\'s stunning coastline',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20s3-1 5-1 4 1 7 1 5-2 5-2" />
        <path d="M12 18V4l7 8H5" /><path d="M12 4l-7 8" />
      </svg>
    ),
    route: '/concierge?intent=YACHT',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80',
  },
  {
    title: 'Desert & Action',
    titleHe: 'מדבר ואקשן',
    description: 'Thrilling desert safaris and adventure experiences',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" /><path d="M5 21c2-3 4-6 7-6s5 3 7 6" />
      </svg>
    ),
    route: '/concierge?intent=DESERT',
    image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=600&q=80',
  },
  {
    title: 'Extreme & Flights',
    titleHe: 'אקסטרים וטיסות',
    description: 'Skydiving, helicopter tours, and aerial adventures',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
      </svg>
    ),
    route: '/concierge?intent=EXTREME',
    image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=600&q=80',
  },
];

const stats = [
  { value: '500+', label: 'Experiences Delivered' },
  { value: '24/7', label: 'Concierge Available' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: 'VIP', label: 'Exclusive Access' },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

export default function MainScreen() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isLoggedIn = !!user;

  const heroAnim = useInView(0.1);
  const servicesAnim = useInView(0.1);
  const aboutAnim = useInView(0.15);
  const statsAnim = useInView(0.15);
  const ctaAnim = useInView(0.15);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: 'Signed out' });
  };

  const handleServiceClick = (route: string) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    navigate(route);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{
      background: `radial-gradient(1200px 700px at 20% -10%, hsl(43 62% 60% / 0.08), transparent 60%),
                    radial-gradient(900px 600px at 100% 50%, hsl(43 62% 60% / 0.06), transparent 55%),
                    linear-gradient(180deg, hsl(214 55% 8%), hsl(214 60% 5%))`
    }}>

      {/* ═══════════ NAVIGATION ═══════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-primary/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <img src={logo} alt="EVE BLUE" className="h-10 sm:h-12 w-auto" />
          <div className="flex items-center gap-2 sm:gap-3">
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/profile')}
                  className="h-9 w-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                >
                  <User className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="h-9 w-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="h-9 px-4 text-sm text-muted-foreground hover:text-foreground"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  className="h-9 px-5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroAnim.ref}
        className="relative min-h-[100svh] flex flex-col items-center justify-center pt-16"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover" aria-hidden />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(7,20,35,0.55) 0%, rgba(7,20,35,0.70) 40%, rgba(7,20,35,0.95) 100%)',
          }} />
        </div>

        <div className={`relative z-10 text-center px-4 max-w-3xl mx-auto transition-all duration-1000 ${heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Logo */}
          <img
            src={logo}
            alt="EVE BLUE - Concierge. It. Done."
            className="w-[min(320px,70vw)] h-auto mx-auto mb-8 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          />

          {/* Tagline */}
          <h1 className="text-[clamp(28px,5vw,56px)] font-bold tracking-[0.08em] uppercase text-foreground leading-tight mb-4">
            Elevate Your
            <br />
            <span className="text-primary">Dubai Experience</span>
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
            Your private luxury concierge — handling Dubai's finest experiences with discretion, precision, and style.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
            <Button
              onClick={() => isLoggedIn ? navigate('/concierge') : navigate('/signup')}
              className="h-14 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold shadow-[0_8px_32px_hsl(43_62%_60%/0.3)] hover:shadow-[0_12px_40px_hsl(43_62%_60%/0.4)] transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {isLoggedIn ? 'Talk to Concierge' : 'Start Your Experience'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-14 px-8 rounded-full text-foreground/80 hover:text-foreground border border-white/15 hover:border-white/30 hover:bg-white/5 text-base"
            >
              Explore Services
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <ChevronDown className="w-6 h-6 text-primary/60 mx-auto" />
          </div>
        </div>
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <section
        ref={statsAnim.ref}
        className="relative z-10 border-y border-primary/15 bg-background/60 backdrop-blur-sm"
      >
        <div className={`max-w-[1200px] mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 ${statsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 tracking-wide uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section id="services" ref={servicesAnim.ref} className="relative z-10 py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className={`text-center mb-14 transition-all duration-700 ${servicesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-3">Our Services</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
              Everything Dubai Has to Offer
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From luxury car rentals to private yacht charters — we handle every detail so you can enjoy the moment.
            </p>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <button
                key={svc.title}
                onClick={() => handleServiceClick(svc.route)}
                className={`group relative overflow-hidden rounded-2xl border border-primary/15 bg-card/50 backdrop-blur-sm text-left transition-all duration-500 hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${servicesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: servicesAnim.isVisible ? `${i * 100}ms` : '0ms' }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-primary/20 backdrop-blur-md border border-primary/30 grid place-items-center text-primary">
                    {svc.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{svc.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT / WHY US ═══════════ */}
      <section ref={aboutAnim.ref} className="relative z-10 py-20 sm:py-28 border-t border-primary/10">
        <div className={`max-w-[1200px] mx-auto px-4 sm:px-6 transition-all duration-700 ${aboutAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-3">Why EVE BLUE</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
              Concierge. It. Done.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We don't just recommend — we execute. Every request handled with precision, discretion, and a personal touch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Trusted & Discreet', desc: 'Your privacy and preferences are always protected' },
              { icon: Clock, title: '24/7 Available', desc: 'Round-the-clock concierge at your fingertips' },
              { icon: Star, title: 'VIP Access', desc: 'Exclusive connections to Dubai\'s finest venues' },
              { icon: Sparkles, title: 'Effortless', desc: 'From request to reality in minutes, not hours' },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`text-center p-6 rounded-2xl border border-primary/10 bg-white/[0.02] hover:border-primary/25 transition-all duration-500 ${aboutAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: aboutAnim.isVisible ? `${i * 120}ms` : '0ms' }}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 grid place-items-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section ref={ctaAnim.ref} className="relative z-10 py-20 sm:py-28">
        <div className={`max-w-[700px] mx-auto px-4 text-center transition-all duration-700 ${ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="p-8 sm:p-12 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] to-transparent backdrop-blur-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to Experience Dubai <span className="text-primary">Differently?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Let EVE BLUE handle the details. Your unforgettable Dubai experience starts with a single message.
            </p>
            <Button
              onClick={() => isLoggedIn ? navigate('/concierge') : navigate('/signup')}
              className="h-14 px-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold shadow-[0_8px_32px_hsl(43_62%_60%/0.3)] hover:shadow-[0_12px_40px_hsl(43_62%_60%/0.4)] transition-all duration-300 hover:scale-105"
            >
              {isLoggedIn ? 'Open Concierge' : 'Get Started — It\'s Free'}
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="relative z-10 border-t border-primary/15 bg-background/80 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <img src={logo} alt="EVE BLUE" className="h-14 w-auto mb-4" />
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Your private luxury concierge for Dubai. Discreet, precise, and always ready.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-primary tracking-[0.15em] uppercase mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary/70" />
                  <a href="tel:+971551523121" className="hover:text-foreground transition-colors">+971 55 152 3121</a>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary/70" />
                  <a href="mailto:dekel@evebleu.vip" className="hover:text-foreground transition-colors">dekel@evebleu.vip</a>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary/70" />
                  Dubai, UAE
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-primary tracking-[0.15em] uppercase mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-muted-foreground hover:text-foreground transition-colors min-h-0">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => isLoggedIn ? navigate('/concierge') : navigate('/signup')} className="text-sm text-muted-foreground hover:text-foreground transition-colors min-h-0">
                    Concierge
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate(isLoggedIn ? '/support' : '/login')} className="text-sm text-muted-foreground hover:text-foreground transition-colors min-h-0">
                    Support
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} EVE BLUE. All rights reserved.
            </p>
            <p className="text-xs text-primary/60 tracking-[0.15em] uppercase font-medium">
              Concierge. It. Done.
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation for logged-in users */}
      {isLoggedIn && <BottomNav />}
    </div>
  );
}
