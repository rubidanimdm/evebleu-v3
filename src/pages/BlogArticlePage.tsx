import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { BLOG_ARTICLES } from '@/components/BlogSection';
import { ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsAppConcierge } from '@/lib/whatsapp';

export default function BlogArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';

  const article = BLOG_ARTICLES.find((a) => a.id === id);

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
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero image */}
      <div className="relative w-full h-[260px] sm:h-[360px] md:h-[420px] overflow-hidden">
        <img
          src={article.image}
          alt={article.title[language] || article.title.en}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 right-auto rtl:left-auto rtl:right-6 flex items-center gap-2 text-foreground/80 hover:text-foreground bg-background/50 backdrop-blur-md rounded-full px-4 py-2 text-sm transition-colors border border-primary/10"
        >
          <BackArrow className="w-4 h-4" />
          {backLabel[language] || backLabel.en}
        </button>
      </div>

      {/* Article content */}
      <article className="max-w-[720px] mx-auto px-5 sm:px-8 pb-20 -mt-16 relative z-10">
        {/* Category */}
        <span className="text-xs text-primary/70 uppercase tracking-[0.2em] font-medium">
          {article.category[language] || article.category.en}
        </span>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mt-3 mb-4 leading-snug">
          {article.title[language] || article.title.en}
        </h1>

        {/* Reading time estimate */}
        <div className="flex items-center gap-2 text-foreground/40 text-xs mb-8">
          <Clock className="w-3.5 h-3.5" />
          <span>{Math.max(3, Math.round(content.length / 800))} {language === 'he' ? 'דקות קריאה' : language === 'ar' ? 'دقائق للقراءة' : 'min read'}</span>
        </div>

        <div className="w-full h-px bg-primary/15 mb-8" />

        {/* Content */}
        <div className="prose-custom">
          {renderContent(content)}
        </div>

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-primary/15 text-center">
          <Button
            onClick={() => openWhatsAppConcierge()}
            className="h-13 px-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base font-semibold shadow-lg shadow-primary/15 gap-2"
          >
            {ctaLabel[language] || ctaLabel.en}
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </article>
    </div>
  );
}
