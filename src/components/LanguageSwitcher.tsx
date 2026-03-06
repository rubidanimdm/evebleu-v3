import { useState, useRef, useEffect } from 'react';
import { useLanguage, LANGUAGES, Language } from '@/lib/i18n';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  variant?: 'minimal' | 'full';
  className?: string;
}

export function LanguageSwitcher({ variant = 'minimal', className }: LanguageSwitcherProps) {
  const { language, setLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(l => l.code === language);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          "bg-transparent backdrop-blur-sm border border-white/20",
          "text-white/80 hover:text-white hover:border-white/40",
          "transition-all duration-300 hover:scale-105"
        )}
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" strokeWidth={1.5} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div 
          className={cn(
            "absolute top-full mt-2 z-50",
            "bg-card/95 backdrop-blur-xl border border-primary/20 rounded-xl shadow-xl",
            "min-w-[140px] py-2 overflow-hidden",
            // Position based on RTL
            isRTL ? "right-0" : "left-0"
          )}
        >
          {/* Gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={cn(
                "w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-all duration-200",
                "hover:bg-primary/10",
                language === lang.code 
                  ? "text-primary bg-primary/5" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="font-medium">{lang.label}</span>
              {variant === 'full' && (
                <span className="text-xs opacity-60">{lang.nativeLabel}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
