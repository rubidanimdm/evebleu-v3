import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

function PrivacyPolicyHe() {
  return (
    <>
      <p>EVE BLUE ("אנחנו" או "שלנו") מחויבת להגנה על פרטיותך. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, חושפים ומגנים על המידע שלך בעת השימוש בפלטפורמת שירותי הקונסיירז׳ שלנו.</p>

      <h2>1. מידע שאנו אוספים</h2>
      <h3>מידע אישי</h3>
      <p>אנו אוספים מידע שאתה מספק ישירות, כולל:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>שם מלא, כתובת אימייל ומספר טלפון</li>
        <li>העדפות מיקום ופרטי לינה</li>
        <li>העדפות תזונה ותחומי עניין</li>
        <li>היסטוריית הזמנות והעדפות שירות</li>
        <li>רישומי תקשורת עם צוות הקונסיירז׳ שלנו</li>
      </ul>

      <h3>מידע שנאסף באופן אוטומטי</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>מידע על המכשיר וסוג הדפדפן</li>
        <li>כתובת IP ומיקום משוער</li>
        <li>נתוני שימוש ודפוסי אינטראקציה</li>
        <li>עוגיות וטכנולוגיות מעקב דומות</li>
      </ul>

      <h2>2. כיצד אנו משתמשים במידע שלך</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>כדי לספק ולהתאים אישית את שירותי הקונסיירז׳ שלנו</li>
        <li>כדי לעבד ולנהל את ההזמנות שלך</li>
        <li>כדי לתקשר איתך בנוגע לבקשותיך ושירותים</li>
        <li>כדי לשפר את הפלטפורמה שלנו ולפתח תכונות חדשות</li>
        <li>כדי לשלוח לך הצעות ועדכונים רלוונטיים (בהסכמתך)</li>
        <li>כדי לעמוד בחובות חוקיות</li>
      </ul>

      <h2>3. בסיס חוקי לעיבוד (GDPR)</h2>
      <p>על פי תקנת הגנת המידע הכללית (GDPR), אנו מעבדים את הנתונים שלך על בסיס:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>הכרח חוזי:</strong> למילוי הסכם שירות הקונסיירז׳ שלנו איתך</li>
        <li><strong>אינטרסים לגיטימיים:</strong> לשיפור שירותינו ותקשורת הצעות רלוונטיות</li>
        <li><strong>הסכמה:</strong> לתקשורת שיווקית ועוגיות לא הכרחיות</li>
        <li><strong>חובה חוקית:</strong> לעמידה בחוקים ותקנות החלים</li>
      </ul>

      <h2>4. שיתוף וחשיפת מידע</h2>
      <p>אנו עשויים לשתף את המידע שלך עם:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>ספקי שירות:</strong> מסעדות, מלונות, מפעילי יאכטות וספקים אחרים למילוי ההזמנות שלך</li>
        <li><strong>שותפים טכנולוגיים:</strong> אחסון ענן, אנליטיקה ופלטפורמות תקשורת</li>
        <li><strong>רשויות חוקיות:</strong> כאשר נדרש על פי חוק או להגנה על זכויותינו</li>
      </ul>
      <p>אנחנו <strong>לא</strong> מוכרים את הנתונים האישיים שלך לצדדים שלישיים.</p>

      <h2>5. הזכויות שלך</h2>
      <p>לפי GDPR וחוקי פרטיות החלים, יש לך זכות:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>גישה:</strong> לבקש עותק של הנתונים האישיים שלך</li>
        <li><strong>תיקון:</strong> לתקן נתונים לא מדויקים או חסרים</li>
        <li><strong>מחיקה:</strong> לבקש מחיקת הנתונים שלך ("הזכות להישכח")</li>
        <li><strong>הגבלה:</strong> להגביל את אופן עיבוד הנתונים שלך</li>
        <li><strong>ניידות:</strong> לקבל את הנתונים שלך בפורמט מובנה וקריא</li>
        <li><strong>התנגדות:</strong> להתנגד לעיבוד המבוסס על אינטרסים לגיטימיים</li>
        <li><strong>ביטול הסכמה:</strong> לבטל הסכמה שניתנה בכל עת</li>
      </ul>
      <p>למימוש כל אחת מהזכויות הללו, צור קשר בכתובת <a href="mailto:privacy@evebleu.vip" className="text-primary hover:underline">privacy@evebleu.vip</a>.</p>

      <h2>6. שמירת מידע</h2>
      <p>אנו שומרים את הנתונים האישיים שלך רק כל עוד הדבר נחוץ לאספקת שירותינו או כנדרש על פי חוק. רישומי הזמנות נשמרים עד 7 שנים לצורכי חשבונאות. באפשרותך לבקש מחיקת החשבון שלך והנתונים הקשורים בכל עת.</p>

      <h2>7. אבטחת מידע</h2>
      <p>אנו מיישמים אמצעי אבטחה בתקן התעשייה, כולל הצפנה בהעברה (TLS/SSL), אחסון נתונים מוצפן, בקרת גישה מבוססת תפקידים וביקורות אבטחה סדירות להגנה על המידע שלך.</p>

      <h2>8. העברות מידע בינלאומיות</h2>
      <p>הנתונים שלך עשויים להיות מעובדים באיחוד האמירויות הערביות ובאזור הכלכלי האירופי. בהעברת נתונים בינלאומית, אנו מבטיחים כי אמצעי הגנה מתאימים קיימים בהתאם לדרישות GDPR.</p>

      <h2>9. עוגיות</h2>
      <p>אנו משתמשים בעוגיות הכרחיות לשמירת ההפעלה וההעדפות שלך. לפרטים על השימוש שלנו בעוגיות, ראה את <Link to="/cookies" className="text-primary hover:underline">מדיניות העוגיות</Link> שלנו.</p>

      <h2>10. פרטיות ילדים</h2>
      <p>שירותינו אינם מיועדים לאנשים מתחת לגיל 18. איננו אוספים ביודעין נתונים מקטינים.</p>

      <h2>11. שינויים במדיניות זו</h2>
      <p>אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. נודיע לך על שינויים משמעותיים באמצעות אימייל או הודעה בפלטפורמה שלנו.</p>

      <h2>12. צור קשר</h2>
      <p>לכל שאלה בנוגע לפרטיות:</p>
      <ul className="list-none space-y-1">
        <li>📧 אימייל: <a href="mailto:privacy@evebleu.vip" className="text-primary hover:underline">privacy@evebleu.vip</a></li>
        <li>📞 טלפון: +971 55 152 3121</li>
        <li>🏢 EVE BLUE, דובאי, איחוד האמירויות הערביות</li>
      </ul>
    </>
  );
}

function PrivacyPolicyEn() {
  return (
    <>
      <p>EVE BLUE ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our concierge services platform.</p>

      <h2>1. Information We Collect</h2>
      <h3>Personal Information</h3>
      <p>We collect information you provide directly, including:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Full name, email address, and phone number</li>
        <li>Location preferences and accommodation details</li>
        <li>Dietary preferences and lifestyle interests</li>
        <li>Booking history and service preferences</li>
        <li>Communication records with our concierge team</li>
      </ul>

      <h3>Automatically Collected Information</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Device information and browser type</li>
        <li>IP address and approximate location</li>
        <li>Usage data and interaction patterns</li>
        <li>Cookies and similar tracking technologies</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>To provide and personalize our concierge services</li>
        <li>To process and manage your bookings and reservations</li>
        <li>To communicate with you about your requests and services</li>
        <li>To improve our platform and develop new features</li>
        <li>To send you relevant offers and updates (with your consent)</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>3. Legal Basis for Processing (GDPR)</h2>
      <p>Under the General Data Protection Regulation (GDPR), we process your data based on:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Contractual necessity:</strong> To fulfill our concierge service agreement with you</li>
        <li><strong>Legitimate interests:</strong> To improve our services and communicate relevant offers</li>
        <li><strong>Consent:</strong> For marketing communications and non-essential cookies</li>
        <li><strong>Legal obligation:</strong> To comply with applicable laws and regulations</li>
      </ul>

      <h2>4. Data Sharing and Disclosure</h2>
      <p>We may share your information with:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Service providers:</strong> Restaurants, hotels, yacht operators, and other vendors to fulfill your bookings</li>
        <li><strong>Technology partners:</strong> Cloud hosting, analytics, and communication platforms</li>
        <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
      </ul>
      <p>We do <strong>not</strong> sell your personal data to third parties.</p>

      <h2>5. Your Rights</h2>
      <p>Under GDPR and applicable privacy laws, you have the right to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Access:</strong> Request a copy of your personal data</li>
        <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
        <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
        <li><strong>Restriction:</strong> Limit how we process your data</li>
        <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
        <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
        <li><strong>Withdraw consent:</strong> Withdraw previously given consent at any time</li>
      </ul>
      <p>To exercise any of these rights, contact us at <a href="mailto:privacy@evebleu.vip" className="text-primary hover:underline">privacy@evebleu.vip</a>.</p>

      <h2>6. Data Retention</h2>
      <p>We retain your personal data only as long as necessary to provide our services or as required by law. Booking records are retained for up to 7 years for accounting purposes. You may request deletion of your account and associated data at any time.</p>

      <h2>7. Data Security</h2>
      <p>We implement industry-standard security measures including encryption in transit (TLS/SSL), encrypted data storage, role-based access controls, and regular security audits to protect your information.</p>

      <h2>8. International Data Transfers</h2>
      <p>Your data may be processed in the United Arab Emirates and the European Economic Area. When transferring data internationally, we ensure appropriate safeguards are in place in compliance with GDPR requirements.</p>

      <h2>9. Cookies</h2>
      <p>We use essential cookies to maintain your session and preferences. For details on our cookie usage, please see our <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.</p>

      <h2>10. Children's Privacy</h2>
      <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect data from minors.</p>

      <h2>11. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through a notice on our platform.</p>

      <h2>12. Contact Us</h2>
      <p>For any privacy-related inquiries:</p>
      <ul className="list-none space-y-1">
        <li>📧 Email: <a href="mailto:privacy@evebleu.vip" className="text-primary hover:underline">privacy@evebleu.vip</a></li>
        <li>📞 Phone: +971 55 152 3121</li>
        <li>🏢 EVE BLUE, Dubai, United Arab Emirates</li>
      </ul>
    </>
  );
}

export default function PrivacyPolicy() {
  const { language, isRTL } = useLanguage();
  const isHebrew = language === 'he';

  const title = isHebrew ? 'מדיניות פרטיות' : 'Privacy Policy';
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

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-foreground [&_h3]:text-base [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-2 [&_strong]:text-foreground">
          {isHebrew ? <PrivacyPolicyHe /> : <PrivacyPolicyEn />}
        </div>
      </div>
    </div>
  );
}
