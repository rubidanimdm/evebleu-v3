import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoldParticles } from '@/components/LuxuryElements';
import { useLanguage } from '@/lib/i18n';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Search, X, MapPin, Clock, ChevronLeft, Sparkles } from 'lucide-react';
import { ATTRACTIONS, ATTRACTION_CATEGORIES } from '@/lib/attractionsData';

export default function AttractionsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const isHe = language === 'he';

  const heroReveal = useScrollReveal<HTMLElement>();
  const gridReveal = useScrollReveal<HTMLDivElement>();

  const filtered = ATTRACTIONS.filter(a => {
    const matchesSearch = !search || 
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.nameHe.includes(search);
    const matchesCategory = activeCategory === 'All' || a.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-24 relative" dir={isHe ? 'rtl' : 'ltr'}>
      <GoldParticles count={8} />

      {/* Hero */}
      <header ref={heroReveal.ref} className={`relative overflow-hidden reveal-base ${heroReveal.isVisible ? 'revealed' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-primary/3 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 pt-8 pb-4 text-center">
          <button onClick={() => navigate('/')} className="absolute top-4 left-4 rtl:left-auto rtl:right-4 p-2 rounded-full bg-card/60 hover:bg-card/80 transition-colors">
            <ChevronLeft className="w-5 h-5 text-foreground rtl:rotate-180" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-medium text-primary tracking-wide uppercase">
              {isHe ? 'אטרקציות בדובאי' : 'Dubai Attractions'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1 font-display">
            {isHe ? 'אטרקציות בדובאי' : 'Dubai Attractions'}
          </h1>
          <p className="text-muted-foreground text-xs max-w-md mx-auto">
            {isHe 
              ? `${ATTRACTIONS.length} אטרקציות מובילות · חוויות בלתי נשכחות בדובאי`
              : `${ATTRACTIONS.length} top attractions · Unforgettable experiences in Dubai`
            }
          </p>
          <div className="w-12 h-px shimmer-line mx-auto mt-3" />
        </div>
      </header>

      {/* Search */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-primary/10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={isHe ? 'חפש אטרקציות...' : 'Search attractions...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 rtl:pl-3 rtl:pr-10 pr-10 h-11 rounded-xl bg-card/60 border-primary/15 focus:border-primary/40"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
            {ATTRACTION_CATEGORIES.map(cat => (
              <button
                key={cat.en}
                onClick={() => setActiveCategory(cat.en)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat.en
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card/60 text-muted-foreground hover:bg-card/80 border border-border/40'
                }`}
              >
                {isHe ? cat.he : cat.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 pt-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <p className="text-muted-foreground">
              {isHe ? `לא נמצאו אטרקציות עבור "${search}"` : `No attractions found for "${search}"`}
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSearch(''); setActiveCategory('All'); }} className="border-primary/20 text-primary">
              {isHe ? 'נקה חיפוש' : 'Clear search'}
            </Button>
          </div>
        ) : (
          <div ref={gridReveal.ref} className={`grid grid-cols-1 md:grid-cols-2 gap-4 reveal-base ${gridReveal.isVisible ? 'revealed' : ''}`}>
            {filtered.map((attraction, index) => (
              <div
                key={attraction.id}
                onClick={() => navigate(`/attractions/${attraction.id}`)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-card/50 border border-border/40 hover:border-primary/30 hover:bg-card/80 backdrop-blur-sm transition-all duration-300 animate-[fadeIn_0.4s_ease-out]"
                style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={attraction.image}
                    alt={isHe ? attraction.nameHe : attraction.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 rtl:left-3 rtl:right-3">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-[10px] font-medium mb-1">
                      {isHe ? attraction.categoryHe : attraction.category}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {isHe ? attraction.nameHe : attraction.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                    {isHe ? attraction.shortDescHe : attraction.shortDesc}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {isHe ? attraction.locationHe.split(',')[0] : attraction.location.split(',')[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {isHe ? attraction.durationHe : attraction.duration}
                    </span>
                  </div>
                  <Button size="sm" className="w-full h-9 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
                    {isHe ? 'פרטים נוספים' : 'View Details'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-8 mb-4">
          {isHe ? 'לא מוצא את מה שאתה מחפש?' : "Can't find what you're looking for?"}{' '}
          <button
            onClick={() => navigate('/concierge')}
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            {isHe ? 'שאל את הקונסיירז׳' : 'Ask your concierge'}
          </button>
        </p>
      </main>

      <BottomNav />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
