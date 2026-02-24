import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'he';

export const LANGUAGES: { code: Language; label: string; nativeLabel: string; rtl: boolean }[] = [
  { code: 'en', label: 'EN', nativeLabel: 'English', rtl: false },
  { code: 'he', label: 'HE', nativeLabel: 'עברית', rtl: true },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'eveblue_language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && LANGUAGES.some(l => l.code === stored)) {
        return stored as Language;
      }
    }
    return 'en';
  });

  const isRTL = LANGUAGES.find(l => l.code === language)?.rtl ?? false;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    
    // Update document direction for RTL languages
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to English
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = (value as Record<string, unknown>)[fallbackKey];
          } else {
            return key; // Return key if not found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation files
const translations: Record<Language, Record<string, unknown>> = {
  // NOTE: ar, fr, de, ru translations removed — only en + he supported
  en: {
    brand: {
      name: 'EVE BLUE',
      tagline: 'Concierge. It. Done.',
      description: 'Your private luxury concierge for Dubai.',
    },
    landing: {
      enterConcierge: 'Enter Concierge',
      exploreServices: 'Explore Services',
      scroll: 'Scroll',
      handled: 'Dubai, handled for you.',
      oneInterface: 'One intelligent interface.',
      allDubai: 'All of Dubai, executed.',
      categories: 'Dining. Nightlife. Transport. Experiences.',
      howItWorks: 'How it works.',
      notService: 'Not a service. A control layer.',
      notRecommendations: 'EVE BLUE is not about recommendations.',
      aboutExecution: 'It is about execution.',
      quietly: 'Quietly. Precisely. Reliably.',
      beginExperience: 'Begin Your Experience',
      accessConcierge: 'Access your private concierge and discover what it means to have Dubai handled.',
      privateAccess: 'Private Access',
      contact: 'Contact',
      privacy: 'Privacy',
      copyright: '© 2026 EVE BLUE. Private Access Only.',
    },
    features: {
      aiConcierge: 'AI Concierge',
      aiConciergeDesc: 'A private AI that interprets intent and executes instantly.',
      explore: 'Explore',
      exploreDesc: "Curated access to Dubai's most exclusive venues & services.",
      bookManage: 'Book & Manage',
      bookManageDesc: 'Secure booking and payment inside the platform.',
      myPlans: 'My Plans',
      myPlansDesc: 'All your reservations, organized and controlled.',
      privateSupport: 'Private Support',
      privateSupportDesc: 'Discreet assistance. Always available. Never intrusive.',
    },
    auth: {
      signIn: 'Sign In',
      signingIn: 'Signing in...',
      email: 'Email',
      password: 'Password',
      requestAccess: 'Request Access',
      backToHome: 'Back to Home',
    },
    nav: {
      concierge: 'Concierge',
      explore: 'Explore',
      myPlans: 'My Plans',
      support: 'Support',
      admin: 'Admin',
      exit: 'Exit',
    },
    concierge: {
      askQuestion: 'How can I handle Dubai for you?',
      categories: 'Dining. Nightlife. Yachts. Transport. Experiences.',
      tellMe: 'Tell me what you need.',
      inputPlaceholder: 'Tell me what you need...',
      quickPrompts: {
        dinner: 'Private dinner for two tonight',
        nightclub: 'VIP table at the best nightclub',
        yacht: 'Yacht for a sunset cruise',
        transport: 'Luxury transport to an event',
      },
    },
    explore: {
      title: 'Explore',
      subtitle: "Curated access to Dubai's most exclusive experiences",
      all: 'All',
      dining: 'Dining',
      nightlife: 'Nightlife',
      transport: 'Transport',
      yachts: 'Yachts',
      events: 'Events',
      bookWithConcierge: 'Book with Concierge',
      noExperiences: 'No experiences available.',
      askConcierge: 'Ask Concierge',
    },
    myPlans: {
      title: 'My Plans',
      subtitle: 'Your reservations, organized and controlled',
      upcoming: 'Upcoming',
      past: 'Past',
      noBookings: 'No bookings yet.',
      startConcierge: 'Start with Concierge',
      guests: 'guests',
      guest: 'guest',
      total: 'Total',
    },
    support: {
      title: 'Private Support',
      subtitle: 'Discreet assistance. Always available.',
      available: '24/7 Concierge',
      availableDesc: 'AI concierge always available. Human support: 9 AM – 11 PM',
      openChat: 'Open Chat',
      whatsapp: 'WhatsApp',
      whatsappDesc: 'Direct line to our team',
      message: 'Message',
      call: 'Call',
      callDesc: 'Speak with a specialist',
      emailTitle: 'Email',
      emailDesc: 'For detailed requests',
      send: 'Send',
    },
    onboarding: {
      requestAccess: 'Request Access',
      joinMember: 'Join as a private member',
      partnerAccess: 'Partner Access',
      partnerDesc: 'Supplier or admin registration',
      alreadyAccess: 'Already have access? Sign in',
      createAccount: 'Create Account',
      memberReg: 'Member Registration',
      partnerReg: 'Partner Registration',
      fullName: 'Full Name',
      phone: 'Phone Number',
      back: 'Back',
      continue: 'Continue',
      creating: 'Creating...',
    },
    admin: {
      title: 'Admin Panel',
      subtitle: 'Manage suppliers and bookings',
      activeSuppliers: 'Active Suppliers',
      pendingBookings: 'Pending Bookings',
      totalRevenue: 'Total Revenue',
      totalBookings: 'Total Bookings',
      suppliers: 'Suppliers',
      bookings: 'Bookings',
      addSupplier: 'Add Supplier',
      editSupplier: 'Edit Supplier',
      confirm: 'Confirm',
      cancel: 'Cancel',
      complete: 'Complete',
    },
    status: {
      pending: 'Pending',
      confirmed: 'Confirmed',
      completed: 'Completed',
      cancelled: 'Cancelled',
    },
    common: {
      loading: 'Loading...',
      from: 'From',
      signedOut: 'Signed out',
      welcome: 'Welcome back',
    },
    mainScreen: {
      tagline: 'Your Luxury Dubai Experience',
      talkToConcierge: 'Talk to Concierge',
      getStarted: 'Get Started',
      premiumServices: 'Premium Services',
      everythingYouNeed: 'Everything You Need',
      readyForSomethingSpecial: 'Ready for Something Special?',
      conciergeAvailable: 'Our concierge team is available 24/7 to create unforgettable experiences in Dubai.',
      chatNow: 'Chat Now',
      joinUs: 'Join Us',
      attractions: 'Attractions',
      luxuryCars: 'Luxury Car Rental',
      diningNightlife: 'Dining & Nightlife',
      yachtCharters: 'Yacht Charters',
      desertAction: 'Desert & Action',
      extremeFlights: 'Extreme & Flights',
    },
  },
  he: {
    brand: {
      name: 'EVE BLUE',
      tagline: 'קונסיירז׳. זה. נעשה.',
      description: 'הקונסיירז׳ הפרטי והיוקרתי שלך בדובאי.',
    },
    landing: {
      enterConcierge: 'כניסה לקונסיירז׳',
      exploreServices: 'גלה שירותים',
      scroll: 'גלול',
      handled: 'דובאי, מטופלת עבורך.',
      oneInterface: 'ממשק חכם אחד.',
      allDubai: 'כל דובאי, מבוצעת.',
      categories: 'מסעדות. חיי לילה. הסעות. חוויות.',
      howItWorks: 'איך זה עובד.',
      notService: 'לא שירות. שכבת שליטה.',
      notRecommendations: 'EVE BLUE לא על המלצות.',
      aboutExecution: 'זה על ביצוע.',
      quietly: 'בשקט. במדויק. באמינות.',
      beginExperience: 'התחל את החוויה שלך',
      accessConcierge: 'גש לקונסיירז׳ הפרטי שלך וגלה מה זה אומר שדובאי מטופלת.',
      privateAccess: 'גישה פרטית',
      contact: 'יצירת קשר',
      privacy: 'פרטיות',
      copyright: '© 2026 EVE BLUE. גישה פרטית בלבד.',
    },
    features: {
      aiConcierge: 'קונסיירז׳ AI',
      aiConciergeDesc: 'AI פרטי שמבין כוונות ומבצע מיידית.',
      explore: 'גלה',
      exploreDesc: 'גישה אוצרת למקומות והשירותים הבלעדיים ביותר בדובאי.',
      bookManage: 'הזמן ונהל',
      bookManageDesc: 'הזמנה ותשלום מאובטחים בפלטפורמה.',
      myPlans: 'התוכניות שלי',
      myPlansDesc: 'כל ההזמנות שלך, מאורגנות ומבוקרות.',
      privateSupport: 'תמיכה פרטית',
      privateSupportDesc: 'סיוע דיסקרטי. תמיד זמין. לעולם לא פולשני.',
    },
    auth: {
      signIn: 'כניסה',
      signingIn: 'מתחבר...',
      email: 'אימייל',
      password: 'סיסמה',
      requestAccess: 'בקש גישה',
      backToHome: 'חזרה לדף הבית',
    },
    nav: {
      concierge: 'קונסיירז׳',
      explore: 'גלה',
      myPlans: 'התוכניות שלי',
      support: 'תמיכה',
      admin: 'ניהול',
      exit: 'יציאה',
    },
    concierge: {
      askQuestion: 'איך אוכל לטפל בדובאי עבורך?',
      categories: 'מסעדות. חיי לילה. יאכטות. הסעות. חוויות.',
      tellMe: 'ספר לי מה אתה צריך.',
      inputPlaceholder: 'ספר לי מה אתה צריך...',
      quickPrompts: {
        dinner: 'ארוחת ערב פרטית לשניים הערב',
        nightclub: 'שולחן VIP במועדון הכי טוב',
        yacht: 'יאכטה לשייט שקיעה',
        transport: 'הסעה יוקרתית לאירוע',
      },
    },
    explore: {
      title: 'גלה',
      subtitle: 'גישה אוצרת לחוויות הבלעדיות ביותר בדובאי',
      all: 'הכל',
      dining: 'מסעדות',
      nightlife: 'חיי לילה',
      transport: 'הסעות',
      yachts: 'יאכטות',
      events: 'אירועים',
      bookWithConcierge: 'הזמן עם הקונסיירז׳',
      noExperiences: 'אין חוויות זמינות.',
      askConcierge: 'שאל את הקונסיירז׳',
    },
    myPlans: {
      title: 'התוכניות שלי',
      subtitle: 'ההזמנות שלך, מאורגנות ומבוקרות',
      upcoming: 'עתידיות',
      past: 'עבר',
      noBookings: 'אין הזמנות.',
      startConcierge: 'התחל עם הקונסיירז׳',
      guests: 'אורחים',
      guest: 'אורח',
      total: 'סה״כ',
    },
    support: {
      title: 'תמיכה פרטית',
      subtitle: 'סיוע דיסקרטי. תמיד זמין.',
      available: 'קונסיירז׳ 24/7',
      availableDesc: 'קונסיירז׳ AI תמיד זמין. תמיכה אנושית: 9 – 23',
      openChat: 'פתח צ׳אט',
      whatsapp: 'וואטסאפ',
      whatsappDesc: 'קו ישיר לצוות שלנו',
      message: 'הודעה',
      call: 'התקשר',
      callDesc: 'דבר עם מומחה',
      emailTitle: 'אימייל',
      emailDesc: 'לבקשות מפורטות',
      send: 'שלח',
    },
    onboarding: {
      requestAccess: 'בקש גישה',
      joinMember: 'הצטרף כחבר פרטי',
      partnerAccess: 'גישת שותף',
      partnerDesc: 'הרשמת ספק או מנהל',
      alreadyAccess: 'כבר יש לך גישה? התחבר',
      createAccount: 'צור חשבון',
      memberReg: 'הרשמת חבר',
      partnerReg: 'הרשמת שותף',
      fullName: 'שם מלא',
      phone: 'מספר טלפון',
      back: 'חזור',
      continue: 'המשך',
      creating: 'יוצר...',
    },
    admin: {
      title: 'פאנל ניהול',
      subtitle: 'ניהול ספקים והזמנות',
      activeSuppliers: 'ספקים פעילים',
      pendingBookings: 'הזמנות ממתינות',
      totalRevenue: 'הכנסות כוללות',
      totalBookings: 'סה״כ הזמנות',
      suppliers: 'ספקים',
      bookings: 'הזמנות',
      addSupplier: 'הוסף ספק',
      editSupplier: 'ערוך ספק',
      confirm: 'אשר',
      cancel: 'בטל',
      complete: 'השלם',
    },
    status: {
      pending: 'ממתין',
      confirmed: 'מאושר',
      completed: 'הושלם',
      cancelled: 'בוטל',
    },
    common: {
      loading: 'טוען...',
      from: 'מ-',
      signedOut: 'יצאת',
      welcome: 'ברוך שובך',
    },
    mainScreen: {
      tagline: 'חוויית היוקרה שלך בדובאי',
      talkToConcierge: 'דבר עם הקונסיירז׳',
      getStarted: 'התחל עכשיו',
      premiumServices: 'שירותי פרימיום',
      everythingYouNeed: 'כל מה שאתה צריך',
      readyForSomethingSpecial: 'מוכן למשהו מיוחד?',
      conciergeAvailable: 'צוות הקונסיירז׳ שלנו זמין 24/7 ליצור חוויות בלתי נשכחות בדובאי.',
      chatNow: 'צ׳אט עכשיו',
      joinUs: 'הצטרף אלינו',
      attractions: 'אטרקציות',
      luxuryCars: 'השכרת רכבי יוקרה',
      diningNightlife: 'מסעדות וחיי לילה',
      yachtCharters: 'השכרות יאכטות',
      desertAction: 'מדבר ואקשן',
      extremeFlights: 'אקסטרים וטיסות',
    },
  },
};
