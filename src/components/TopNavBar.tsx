import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/eve-blue-logo-white.gif';

const NAV_LINKS = [
  { key: 'nav.hotels', path: '/hotels' },
  { key: 'nav.yachts', path: '/yachts' },
  { key: 'nav.dining', path: '/dining' },
  { key: 'nav.attractions', path: '/explore' },
  { key: 'nav.about', path: '/about' },
];

export function TopNavBar() {
  const { t, isRTL } = useLanguage();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-black/60 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 sm:px-6"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Left: Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="EVE BLUE"
            className="h-8 sm:h-9 w-auto"
          />
        </Link>

        {/* Center: Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm tracking-wide transition-colors",
                  isActive
                    ? 'text-[#E6B800]'
                    : 'text-white/80 hover:text-[#E6B800]'
                )}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </div>

        {/* Right: Language switcher + mobile hamburger */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:block" />
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden p-2 text-white/80 hover:text-[#E6B800] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile slide-out drawer */}
      <div
        className={cn(
          "fixed top-0 z-[70] h-full w-[280px] bg-[#0A0A0A]/95 backdrop-blur-xl border-white/10 transition-transform duration-300 ease-in-out flex flex-col",
          isRTL ? 'right-0 border-l' : 'left-0 border-r',
          drawerOpen
            ? 'translate-x-0'
            : isRTL
              ? 'translate-x-full'
              : '-translate-x-full'
        )}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <img src={logo} alt="EVE BLUE" className="h-7 w-auto" />
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 text-white/60 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer links */}
        <div className="flex-1 py-4">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
                className={cn(
                  "block px-6 py-3 text-sm tracking-wide transition-colors",
                  isActive
                    ? 'text-[#E6B800] bg-[#E6B800]/10'
                    : 'text-white/70 hover:text-[#E6B800] hover:bg-white/5'
                )}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </div>

        {/* Drawer footer: language switcher */}
        <div className="p-4 border-t border-white/10">
          <LanguageSwitcher variant="full" />
        </div>
      </div>
    </>
  );
}
