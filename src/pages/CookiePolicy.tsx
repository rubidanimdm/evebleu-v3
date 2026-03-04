import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

function CookiePolicyHe() {
  return (
    <>
      <p>מדיניות עוגיות זו מסבירה כיצד EVE BLUE משתמשת בעוגיות וטכנולוגיות דומות בפלטפורמה שלנו.</p>

      <h2>1. מהן עוגיות?</h2>
      <p>עוגיות הן קבצי טקסט קטנים המאוחסנים במכשיר שלך כאשר אתה מבקר באתר. הן עוזרות לאתר לזכור את ההעדפות שלך ולשפר את החוויה.</p>

      <h2>2. סוגי העוגיות שאנו משתמשים בהן</h2>

      <h3 className="text-foreground font-medium mt-4 mb-2">עוגיות הכרחיות</h3>
      <p>נדרשות לפעולת הפלטפורמה. אלה כוללות:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>עוגיות אימות:</strong> שומרות אותך מחובר בצורה מאובטחת</li>
        <li><strong>עוגיות הפעלה:</strong> שומרות על מצב ההפעלה שלך</li>
        <li><strong>עוגיות אבטחה:</strong> מונעות זיוף בקשות חוצות-אתרים</li>
      </ul>
      <p>לא ניתן להשבית עוגיות אלו כיוון שהן הכרחיות לפעולת הפלטפורמה.</p>

      <h3 className="text-foreground font-medium mt-4 mb-2">עוגיות פונקציונליות</h3>
      <p>זוכרות את ההעדפות שלך כגון:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>העדפות שפה</li>
        <li>העדפות הסכמה לעוגיות</li>
        <li>הגדרות תצוגה</li>
      </ul>

      <h3 className="text-foreground font-medium mt-4 mb-2">עוגיות אנליטיות</h3>
      <p>עוזרות לנו להבין כיצד מבקרים מתקשרים עם הפלטפורמה שלנו. אלו אוספות נתונים אנונימיים על:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>עמודים שנצפו וזמן שהייה</li>
        <li>דפוסי ניווט</li>
        <li>דוחות שגיאות</li>
      </ul>

      <h2>3. ניהול עוגיות</h2>
      <p>באפשרותך לנהל את העדפות העוגיות שלך דרך:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>באנר ההסכמה לעוגיות המוצג בביקור הראשון</li>
        <li>הגדרות הדפדפן שלך (שים לב: השבתת עוגיות הכרחיות עשויה להשפיע על הפונקציונליות)</li>
      </ul>

      <h2>4. עוגיות צד שלישי</h2>
      <p>עוגיות מסוימות עשויות להיות מוגדרות על ידי שירותי צד שלישי שאנו משתמשים בהם, כגון פלטפורמות אנליטיקה. אלו מנוהלות על ידי מדיניות הפרטיות של הצד השלישי הרלוונטי.</p>

      <h2>5. יצירת קשר</h2>
      <p>לשאלות בנוגע לשימוש שלנו בעוגיות, צור קשר בכתובת <a href="mailto:privacy@evebleu.vip" className="text-primary hover:underline">privacy@evebleu.vip</a>.</p>
    </>
  );
}

function CookiePolicyEn() {
  return (
    <>
      <p>This Cookie Policy explains how EVE BLUE uses cookies and similar technologies on our platform.</p>

      <h2>1. What Are Cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve your experience.</p>

      <h2>2. Types of Cookies We Use</h2>

      <h3 className="text-foreground font-medium mt-4 mb-2">Essential Cookies</h3>
      <p>Required for the platform to function. These include:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Authentication cookies:</strong> Keep you signed in securely</li>
        <li><strong>Session cookies:</strong> Maintain your session state</li>
        <li><strong>Security cookies:</strong> Prevent cross-site request forgery</li>
      </ul>
      <p>These cookies cannot be disabled as they are necessary for the platform to operate.</p>

      <h3 className="text-foreground font-medium mt-4 mb-2">Functional Cookies</h3>
      <p>Remember your preferences such as:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Language preferences</li>
        <li>Cookie consent preferences</li>
        <li>Display settings</li>
      </ul>

      <h3 className="text-foreground font-medium mt-4 mb-2">Analytics Cookies</h3>
      <p>Help us understand how visitors interact with our platform. These collect anonymized data about:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Pages visited and time spent</li>
        <li>Navigation patterns</li>
        <li>Error reports</li>
      </ul>

      <h2>3. Managing Cookies</h2>
      <p>You can manage your cookie preferences through:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>The cookie consent banner shown on your first visit</li>
        <li>Your browser settings (note: disabling essential cookies may affect functionality)</li>
      </ul>

      <h2>4. Third-Party Cookies</h2>
      <p>Some cookies may be set by third-party services we use, such as analytics platforms. These are governed by the respective third party's privacy policy.</p>

      <h2>5. Contact</h2>
      <p>For questions about our cookie usage, contact us at <a href="mailto:privacy@evebleu.vip" className="text-primary hover:underline">privacy@evebleu.vip</a>.</p>
    </>
  );
}

export default function CookiePolicy() {
  const { language, isRTL } = useLanguage();
  const isHebrew = language === 'he';

  const title = isHebrew ? 'מדיניות עוגיות' : 'Cookie Policy';
  const backText = isHebrew ? 'חזרה לדף הבית' : 'Back to Home';
  const lastUpdated = isHebrew ? 'עודכן לאחרונה:' : 'Last updated:';

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" /> {backText}
        </Link>

        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground mb-8">{lastUpdated} {new Date().toLocaleDateString(isHebrew ? 'he-IL' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-foreground">
          {isHebrew ? <CookiePolicyHe /> : <CookiePolicyEn />}
        </div>
      </div>
    </div>
  );
}
