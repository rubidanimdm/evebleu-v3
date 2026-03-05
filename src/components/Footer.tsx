import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-[#E6B800]/10 bg-[#0A0A0A]/80 py-6">
      <div className="max-w-[720px] mx-auto px-4 text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/40">
          <Link to="/p/privacy-policy" className="hover:text-[#E6B800] transition-colors">
            {t('footer.privacy')}
          </Link>
          <span>·</span>
          <Link to="/p/terms-of-service" className="hover:text-[#E6B800] transition-colors">
            {t('footer.terms')}
          </Link>
          <span>·</span>
          <Link to="/p/cookie-policy" className="hover:text-[#E6B800] transition-colors">
            {t('footer.cookies')}
          </Link>
        </div>
        <p className="text-[10px] text-white/30 tracking-[0.15em] uppercase">
          © {new Date().getFullYear()} EVE BLUE · {t('footer.tagline')}
        </p>
      </div>
    </footer>
  );
}
