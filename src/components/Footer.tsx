import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { t } = useLanguage();

  const categoryLinks = [
    { label: t('nav.hotels'), to: '/hotels' },
    { label: t('nav.yachts'), to: '/yachts' },
    { label: t('nav.dining'), to: '/dining' },
    { label: t('nav.attractions'), to: '/explore' },
    { label: t('nav.about'), to: '/about' },
  ];

  return (
    <footer className="mt-auto border-t border-[#E6B800]/10 bg-[#0A0A0A]/80 py-6">
      <div className="max-w-[720px] mx-auto px-4 text-center space-y-3">
        {/* Category navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/50">
          {categoryLinks.map((link, i) => (
            <span key={link.to} className="flex items-center gap-3">
              {i > 0 && <span className="text-white/20">&middot;</span>}
              <Link to={link.to} className="hover:text-[#E6B800] transition-colors">
                {link.label}
              </Link>
            </span>
          ))}
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-white/10" />

        {/* Legal links */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/40">
          <Link to="/privacy" className="hover:text-[#E6B800] transition-colors">
            {t('footer.privacy')}
          </Link>
          <span>&middot;</span>
          <Link to="/terms" className="hover:text-[#E6B800] transition-colors">
            {t('footer.terms')}
          </Link>
          <span>&middot;</span>
          <Link to="/cookies" className="hover:text-[#E6B800] transition-colors">
            {t('footer.cookies')}
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-[10px] text-white/30 tracking-[0.15em] uppercase">
          &copy; {new Date().getFullYear()} EVE BLUE &middot; {t('footer.tagline')}
        </p>
      </div>
    </footer>
  );
}
