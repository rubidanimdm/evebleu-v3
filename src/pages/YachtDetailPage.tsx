import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';

// Static yacht detail pages data – extend as more PDFs are added
const YACHT_PAGES: Record<string, { title: string; pages: string[] }> = {
  'elite-4': {
    title: 'Elite 4 – 48ft Majesty',
    pages: [
      '/yachts/elite-4-page-1.jpg',
      '/yachts/elite-4-page-2.jpg',
      '/yachts/elite-4-page-3.jpg',
      '/yachts/elite-4-page-4.jpg',
    ],
  },
};

export default function YachtDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const yacht = slug ? YACHT_PAGES[slug] : undefined;

  if (!yacht) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Yacht not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-primary/10 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate('/yachts')}
          className="p-1.5 rounded-full hover:bg-muted transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground truncate">{yacht.title}</h1>
      </div>

      {/* PDF pages displayed as full-width images */}
      <main className="max-w-2xl mx-auto">
        {yacht.pages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${yacht.title} – Page ${i + 1}`}
            className="w-full"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}

        {/* Book CTA */}
        <div className="p-4">
          <Button
            onClick={() => navigate('/concierge?intent=YACHT&yacht=Elite%204%20-%2048ft')}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-12 text-base"
          >
            Book This Yacht
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
