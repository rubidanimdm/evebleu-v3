import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { BLOG_ARTICLES } from '@/components/BlogSection';
import { ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsAppConcierge } from '@/lib/whatsapp';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { updateSEO, resetSEO } from '@/lib/seo';
import { supabase } from '@/integrations/supabase/client';

export default function BlogArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';

  const [dbArticle, setDbArticle] = useState<any>(null);

  useEffect(() => {
    async function fetchFromDB() {
      const { data } = await (supabase as any)
        .from('pages')
        .select('*')
        .eq('slug', id)
        .eq('is_published', true)
        .single();
      if (data) setDbArticle(data);
    }
    fetchFromDB();
  }, [id]);

  const article = BLOG_ARTICLES.find((a) => a.id === id);

  const contentReveal = useScrollReveal<HTMLDivElement>();
  const ctaReveal = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    if (dbArticle) {
      updateSEO({
        title: dbArticle.title,
        description: dbArticle.meta_description || dbArticle.title,
        canonicalPath: `/blog/${dbArticle.slug}`,
        ogImage: dbArticle.featured_image_url,
        ogType: 'article',
      });
    } else if (article) {
      const title = article.title[language] || article.title.en;
      const description = article.excerpt[language] || article.excerpt.en;
      updateSEO({
        title,
        description,
        canonicalPath: `/blog/${article.id}`,
        ogImage: article.image,
        ogType: 'article',
      });
    }
    return () => resetSEO();
  }, [dbArticle, article, language]);

  // DB article takes priority
  if (dbArticle) {
    const BackArrow = isRTL ? ArrowRight : ArrowLeft;
    return (
      <div className="flex flex-col bg-background">
        <article className="max-w-3xl mx-auto px-4 py-8 w-full">
          {dbArticle.featured_image_url && (
            <img src={dbArticle.featured_image_url} alt={dbArticle.title} className="w-full rounded-xl mb-6 max-h-[400px] object-cover" />
          )}
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">{dbArticle.title}</h1>
          <div className="prose prose-invert max-w-none">
            {dbArticle.content_blocks?.map((block: any, i: number) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: block.content }} />
            ))}
          </div>
          <div className="mt-8">
            <Button onClick={() => navigate(-1)} variant="outline" className="gap-2">
              <BackArrow className="w-4 h-4" />
              Back
            </Button>
          </div>
        </article>
      </div>
    );
  }

  // Fallback to hardcoded BLOG_ARTICLES
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground/50">Article not found</p>
      </div>
    );
  }

  const content = article.content[language] || article.content.en;
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const backLabel: Record<string, string> = {
    he: 'חזרה',
    en: 'Back',
    ar: 'رجوع',
    fr: 'Retour',
    ru: 'Назад',
  };

  const ctaLabel: Record<string, string> = {
    he: 'דברו איתנו',
    en: 'Talk to us',
    ar: 'تحدث إلينا',
    fr: 'Contactez-nous',
    ru: 'Свяжитесь с нами',
  };

  // Parse markdown-like bold
  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h3 key={i} className="text-lg sm:text-xl font-semibold text-foreground mt-8 mb-3">
            {line.replace(/\*\*/g, '')}
          </h3>
        );
      }
      if (line.startsWith('- **')) {
        const parts = line.replace('- **', '').split('**');
        return (
          <li key={i} className="text-foreground/70 text-sm sm:text-base leading-relaxed mb-1.5">
            <span className="font-semibold text-foreground">{parts[0]}</span>
            {parts[1] && <span>{parts[1]}</span>}
          </li>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="text-foreground/70 text-sm sm:text-base leading-relaxed mb-1.5">
            {line.slice(2)}
          </li>
        );
      }
      if (line.trim() === '') {
        return <div key={i} className="h-3" />;
      }
      // Inline bold
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="text-foreground/70 text-sm sm:text-base leading-[1.85] mb-2">
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**') ? (
              <span key={j} className="font-semibold text-foreground">{part.replace(/\*\*/g, '')}</span>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  };

  return (
    <div className="bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero image with fade-in */}
      <div className="relative w-full h-[260px] sm:h-[360px] md:h-[420px] overflow-hidden animate-[fadeIn_0.8s_ease-out]">
        <img
          src={article.image}
          alt={article.title[language] || article.title.en}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 right-auto rtl:left-auto rtl:right-6 flex items-center gap-2 text-foreground/80 hover:text-foreground bg-background/50 backdrop-blur-md rounded-full px-4 py-2 text-sm transition-colors border border-primary/10 animate-[fadeIn_1s_ease-out]"
        >
          <BackArrow className="w-4 h-4" />
          {backLabel[language] || backLabel.en}
        </button>
      </div>

      {/* Article content */}
      <article className="max-w-[720px] mx-auto px-5 sm:px-8 pb-20 -mt-16 relative z-10">
        {/* Category */}
        <span className="text-xs text-primary/70 uppercase tracking-[0.2em] font-medium animate-[fadeIn_0.6s_ease-out]">
          {article.category[language] || article.category.en}
        </span>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mt-3 mb-4 leading-snug animate-[fadeIn_0.8s_ease-out]">
          {article.title[language] || article.title.en}
        </h1>

        {/* Reading time estimate */}
        <div className="flex items-center gap-2 text-foreground/40 text-xs mb-8 animate-[fadeIn_1s_ease-out]">
          <Clock className="w-3.5 h-3.5" />
          <span>{Math.max(3, Math.round(content.length / 800))} {language === 'he' ? 'דקות קריאה' : language === 'ar' ? 'دقائق للقراءة' : 'min read'}</span>
        </div>

        <div className="w-full h-px shimmer-line mb-8" />

        {/* Content */}
        <div ref={contentReveal.ref} className={`prose-custom reveal-base ${contentReveal.isVisible ? 'revealed' : ''}`}>
          {renderContent(content)}
        </div>

        {/* CTA */}
        <div ref={ctaReveal.ref} className={`mt-12 pt-8 border-t border-primary/15 text-center reveal-scale ${ctaReveal.isVisible ? 'revealed' : ''}`}>
          <Button
            onClick={() => openWhatsAppConcierge()}
            className="h-13 px-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base font-semibold shadow-lg shadow-primary/15 gap-2"
          >
            {ctaLabel[language] || ctaLabel.en}
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </article>

      {/* Fade-in keyframe */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
