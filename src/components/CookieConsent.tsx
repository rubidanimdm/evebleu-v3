import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const COOKIE_CONSENT_KEY = 'eve-blue-cookie-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();
  const isHebrew = language === 'he';

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ essential: true, analytics: true, timestamp: new Date().toISOString() }));
    setVisible(false);
  }

  function acceptEssential() {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ essential: true, analytics: false, timestamp: new Date().toISOString() }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-5 shadow-2xl shadow-black/40">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <p className="text-sm font-medium text-foreground">
              {isHebrew ? '🍪 אנו משתמשים בעוגיות' : '🍪 We use cookies'}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isHebrew 
                ? 'אנו משתמשים בעוגיות הכרחיות כדי לשמור אותך מחובר ובעוגיות פונקציונליות לזכירת ההעדפות שלך. אנו גם משתמשים בעוגיות אנליטיות לשיפור השירות. '
                : 'We use essential cookies to keep you signed in and functional cookies to remember your preferences. We also use analytics cookies to improve our service. '
              }
              <Link to="/cookies" className="text-primary hover:underline">
                {isHebrew ? 'למידע נוסף' : 'Learn more'}
              </Link>
            </p>
          </div>
          <button onClick={acceptEssential} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Button onClick={accept} size="sm" className="flex-1">
            {isHebrew ? 'אשר הכל' : 'Accept All'}
          </Button>
          <Button onClick={acceptEssential} variant="outline" size="sm" className="flex-1">
            {isHebrew ? 'הכרחיות בלבד' : 'Essential Only'}
          </Button>
        </div>
      </div>
    </div>
  );
}
