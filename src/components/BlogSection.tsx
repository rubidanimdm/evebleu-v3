import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

import blogAirport from '@/assets/blog-airport.jpg';
import blogEmirates from '@/assets/blog-emirates.jpg';
import blogNightlife from '@/assets/blog-dubai-nightlife.jpg';
import blogYacht from '@/assets/blog-yacht.jpg';
import blogDesert from '@/assets/blog-desert.jpg';
import blogDining from '@/assets/blog-dining.jpg';
import blogNightlifeClub from '@/assets/blog-nightlife.jpg';
import blogShopping from '@/assets/blog-shopping.jpg';
import blogFamily from '@/assets/blog-family.jpg';

export interface BlogArticle {
  id: string;
  image: string;
  category: Record<string, string>;
  title: Record<string, string>;
  excerpt: Record<string, string>;
  content: Record<string, string>;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'dubai-airport-guide',
    image: blogAirport,
    category: {
      he: 'מדריך למטייל',
      en: 'Travel Guide',
      ar: 'دليل المسافر',
      fr: 'Guide de voyage',
      ru: 'Гид путешественника',
    },
    title: {
      he: 'נמל התעופה הבינלאומי של דובאי — כל מה שצריך לדעת',
      en: 'Dubai International Airport — Everything You Need to Know',
      ar: 'مطار دبي الدولي — كل ما تحتاج معرفته',
      fr: "L'aéroport international de Dubaï — Tout ce qu'il faut savoir",
      ru: 'Международный аэропорт Дубая — Всё, что нужно знать',
    },
    excerpt: {
      he: 'מתכננים חופשה בדובאי? נמל התעופה הבינלאומי של דובאי הוא שער הכניסה שלכם לחוויה בלתי נשכחת. עם שירותים יוצאי דופן, טרמינלים מפוארים ואפשרויות קניות ללא מכס — הנה כל מה שתרצו לדעת לפני הנחיתה.',
      en: 'Planning a Dubai vacation? Dubai International Airport is your gateway to an unforgettable experience. With exceptional services, luxurious terminals, and duty-free shopping — here is everything you need to know before landing.',
      ar: 'هل تخطط لقضاء إجازة في دبي؟ مطار دبي الدولي هو بوابتك لتجربة لا تُنسى. مع خدمات استثنائية ومحلات السوق الحرة.',
      fr: "Vous planifiez des vacances à Dubaï ? L'aéroport international de Dubaï est votre porte d'entrée vers une expérience inoubliable.",
      ru: 'Планируете отпуск в Дубае? Международный аэропорт Дубая — ваши ворота к незабываемым впечатлениям.',
    },
    content: {
      he: `נמל התעופה הבינלאומי של דובאי (DXB) הוא אחד מנמלי התעופה העמוסים והמתקדמים ביותר בעולם. מדי שנה עוברים דרכו למעלה מ-80 מיליון נוסעים, והוא משמש כמרכז תעופה בינלאומי מרכזי המחבר בין מזרח למערב.

**טרמינלים ושירותים**

נמל התעופה כולל שלושה טרמינלים עיקריים. טרמינל 3, הגדול מביניהם, מוקדש לחברת Emirates ומציע חוויית נוסע ברמה אחרת: טרקלינים VIP מפנקים, ספא, מקלחות, ואפילו בריכת שחייה. טרמינל 1 משרת את רוב חברות התעופה הבינלאומיות, וטרמינל 2 מתמקד בטיסות פנימיות ואזוריות.

**קניות ללא מכס (Duty Free)**

ה-Dubai Duty Free נחשב לאחד הטובים בעולם. תמצאו שם מותגי יוקרה, אלכוהול, בשמים, שוקולדים ומוצרי אלקטרוניקה במחירים תחרותיים. טיפ קטן: שווה להשוות מחירים מראש כדי לזהות את ההזדמנויות הטובות ביותר.

**הגעה מנמל התעופה למלון**

אפשרויות ההגעה למלון מגוונות: מונית רשמית (זמינה 24/7), מטרו דובאי (קו אדום עובר דרך נמל התעופה), או שירות העברה פרטי. אנחנו ב-EVE BLUE מציעים שירות איסוף VIP מנמל התעופה ישירות למלון — ברכב יוקרתי, עם נהג מקצועי שמחכה לכם עם שלט אישי.

**טיפים חשובים**

- הגיעו לפחות 3 שעות לפני טיסה בינלאומית
- הורידו את אפליקציית DXB Smart למעקב אחר הטיסה
- השתמשו ב-Smart Gates להאצת תהליך הביקורת
- חינם WiFi בכל הטרמינלים
- אזורי מנוחה ושינה זמינים 24/7`,
      en: `Dubai International Airport (DXB) is one of the busiest and most advanced airports in the world. Over 80 million passengers pass through it annually, serving as a major international aviation hub connecting East and West.

**Terminals & Services**

The airport features three main terminals. Terminal 3, the largest, is dedicated to Emirates and offers a next-level passenger experience: luxurious VIP lounges, spa, showers, and even a swimming pool. Terminal 1 serves most international airlines, while Terminal 2 focuses on domestic and regional flights.

**Duty Free Shopping**

Dubai Duty Free is considered one of the best in the world. You'll find luxury brands, alcohol, perfumes, chocolates, and electronics at competitive prices.

**Getting to Your Hotel**

Options include official taxis (available 24/7), Dubai Metro (Red Line passes through the airport), or private transfer services. At EVE BLUE, we offer VIP airport pickup directly to your hotel — in a luxury vehicle with a professional driver waiting with a personalized sign.

**Important Tips**

- Arrive at least 3 hours before international flights
- Download the DXB Smart app for flight tracking
- Use Smart Gates to speed up passport control
- Free WiFi available in all terminals
- Rest and sleep zones available 24/7`,
      ar: 'مطار دبي الدولي (DXB) هو أحد أكثر المطارات ازدحامًا وتقدمًا في العالم.',
      fr: "L'aéroport international de Dubaï (DXB) est l'un des aéroports les plus fréquentés et les plus avancés au monde.",
      ru: 'Международный аэропорт Дубая (DXB) — один из самых загруженных и технологичных аэропортов мира.',
    },
  },
  {
    id: 'emirates-airline',
    image: blogEmirates,
    category: {
      he: 'מדריך למטייל',
      en: 'Travel Guide',
      ar: 'دليل المسافر',
      fr: 'Guide de voyage',
      ru: 'Гид путешественника',
    },
    title: {
      he: 'חברת התעופה Emirates — למה היא הבחירה הטובה ביותר לדובאי',
      en: 'Emirates Airlines — Why It\'s the Best Choice for Dubai',
      ar: 'طيران الإمارات — لماذا هي الخيار الأفضل لدبي',
      fr: 'Emirates Airlines — Pourquoi c\'est le meilleur choix pour Dubaï',
      ru: 'Emirates Airlines — Почему это лучший выбор для Дубая',
    },
    excerpt: {
      he: 'אם אתם מתכננים טיסה לדובאי ורוצים לעשות את זה בסטייל — Emirates היא חברת התעופה בשבילכם. שירות מוקפד, צי מטוסים חדיש ומחלקות פרימיום שהופכות את הטיסה עצמה לחלק מהחוויה.',
      en: 'Planning a flight to Dubai in style? Emirates is the airline for you. Impeccable service, a modern fleet, and premium classes that make the flight itself part of the experience.',
      ar: 'إذا كنت تخطط للسفر إلى دبي بأناقة — فإن طيران الإمارات هي خيارك الأمثل.',
      fr: 'Vous planifiez un vol vers Dubaï avec style ? Emirates est la compagnie qu\'il vous faut.',
      ru: 'Планируете полёт в Дубай со стилем? Emirates — ваш лучший выбор.',
    },
    content: {
      he: `Emirates היא חברת התעופה הלאומית של איחוד האמירויות הערביות ואחת מחברות התעופה המובילות בעולם. עם בסיס פעולות בדובאי, היא מטיסה ליעדים בכל רחבי העולם ונודעת בשירות יוצא דופן ובחדשנות מתמדת.

**מחלקות הטיסה**

- **מחלקת תיירים**: מסכי בידור אישיים גדולים, אוכל חם, ומרווח רגליים נדיב
- **מחלקת עסקים**: מושבים הנפתחים למיטה שטוחה, תפריט שף, בר, וגישה לטרקלינים
- **מחלקת ראשונה**: סוויטות פרטיות לחלוטין, מקלחת ספא באוויר, ושירות באטלר אישי

**צי המטוסים**

Emirates מפעילה צי של מטוסי Airbus A380 ו-Boeing 777. ה-A380 של Emirates הוא חוויה בפני עצמה — עם בר קוקטיילים, טרקלין על הסיפון, ומקלחות במחלקה ראשונה.

**טיפים להזמנה**

- הזמינו מוקדם ככל האפשר לקבלת מחירים טובים יותר
- בדקו מבצעים באתר Emirates לישראל
- שקלו שדרוג למחלקת עסקים — ההבדל שווה כל שקל
- הצטרפו ל-Emirates Skywards לצבירת נקודות

אנחנו ב-EVE BLUE יכולים לעזור לכם למצוא את הטיסה המתאימה ולארגן את כל ההעברות מנמל התעופה. פשוט שלחו לנו הודעה.`,
      en: `Emirates is the national airline of the UAE and one of the world's leading airlines. Based in Dubai, it flies to destinations worldwide and is renowned for exceptional service and constant innovation.

**Flight Classes**

- **Economy**: Large personal entertainment screens, hot meals, generous legroom
- **Business**: Lie-flat seats, chef's menu, bar, lounge access
- **First Class**: Fully private suites, in-air spa shower, personal butler service

**Fleet**

Emirates operates Airbus A380s and Boeing 777s. The Emirates A380 is an experience in itself — with cocktail bars, an onboard lounge, and first-class showers.

**Booking Tips**

- Book early for better prices
- Check Emirates website for deals
- Consider upgrading to business class — worth every penny
- Join Emirates Skywards for points

At EVE BLUE, we can help you find the perfect flight and arrange all airport transfers. Just message us.`,
      ar: 'طيران الإمارات هي شركة الطيران الوطنية لدولة الإمارات وواحدة من أبرز شركات الطيران في العالم.',
      fr: "Emirates est la compagnie aérienne nationale des EAU et l'une des principales compagnies aériennes au monde.",
      ru: 'Emirates — национальная авиакомпания ОАЭ и одна из ведущих авиакомпаний мира.',
    },
  },
  {
    id: 'dubai-nightlife-guide',
    image: blogNightlife,
    category: {
      he: 'חדשות ומידע',
      en: 'News & Info',
      ar: 'أخبار ومعلومات',
      fr: 'Actualités',
      ru: 'Новости и информация',
    },
    title: {
      he: 'המדריך המלא למופע הרחפנים המרהיב של דובאי (2026)',
      en: 'The Complete Guide to Dubai\'s Spectacular Drone Show (2026)',
      ar: 'الدليل الكامل لعرض الطائرات بدون طيار المذهل في دبي (2026)',
      fr: 'Le guide complet du spectacle de drones de Dubaï (2026)',
      ru: 'Полный гид по впечатляющему шоу дронов в Дубае (2026)',
    },
    excerpt: {
      he: 'אם תכננתם טיול לדובאי בחורף הקרוב — עצרו הכל! מופע השמיים הלילי של העיר, שנחשב לאחד הטובים בעולם, חוזר במהדורה נוצצת יותר. רשמנו לפניכם את כל הפרטים, הטיפים ונקודות הצפייה האולטימטיביות.',
      en: 'Planning a trip to Dubai this winter? Stop everything! The city\'s incredible nighttime sky show, considered one of the best in the world, is back in a more dazzling edition.',
      ar: 'إذا كنت تخطط لرحلة إلى دبي — توقف عن كل شيء! عرض السماء الليلي يعود بإصدار أكثر إبهارًا.',
      fr: 'Vous planifiez un voyage à Dubaï cet hiver ? Arrêtez tout ! Le spectacle nocturne revient dans une édition encore plus éblouissante.',
      ru: 'Планируете поездку в Дубай этой зимой? Остановитесь! Ночное шоу дронов возвращается в ещё более ослепительном формате.',
    },
    content: {
      he: `דובאי לא מפסיקה להפתיע — ומופע הרחפנים הלילי הוא אחד האירועים המרהיבים ביותר שהעיר מציעה. כל ערב, מאות רחפנים מוארים יוצרים צורות תלת-ממדיות מדהימות בשמי דובאי, מושכים מאות אלפי צופים מכל העולם.

**מה זה בדיוק?**

מדובר במופע אורות וצלילים שבו מאות ואפילו אלפי רחפנים מתוכנתים עולים לשמיים ויוצרים יחד דמויות ענק, לוגואים, ואנימציות בתלת ממד. זה שילוב של טכנולוגיה מתקדמת, אמנות ויזואלית וחוויה בלתי נשכחת.

**איפה לצפות?**

- **The Palm Jumeirah** — נקודת צפייה מעולה מכיוון החוף
- **Dubai Marina** — אווירה מדהימה עם המגדלים ברקע
- **Bluewaters Island** — קרוב ל-Ain Dubai (הגלגל הגדול)
- **JBR Beach** — נגיש, חינמי, ועם מסעדות בסביבה

**טיפים מאיתנו**

- הגיעו לפחות שעה לפני המופע לתפוס מקום טוב
- הביאו מצלמה עם יכולות צילום לילה
- בדקו את לוח הזמנים מראש — המופעים לא כל לילה
- שילבו את המופע עם ארוחת ערב במסעדה עם נוף

רוצים שנארגן לכם ערב שלם סביב המופע? ארוחה, העברה והכל — דברו איתנו ב-EVE BLUE.`,
      en: `Dubai never stops surprising — and the nightly drone show is one of the most spectacular events the city offers. Every evening, hundreds of illuminated drones create stunning 3D formations in the Dubai sky.

**What Is It?**

A lights and sound show where hundreds or thousands of programmed drones rise into the sky, creating giant figures, logos, and 3D animations. It's a blend of advanced technology, visual art, and an unforgettable experience.

**Where to Watch?**

- **The Palm Jumeirah** — Excellent beachside viewing
- **Dubai Marina** — Amazing atmosphere with towers in the background
- **Bluewaters Island** — Close to Ain Dubai
- **JBR Beach** — Accessible, free, with restaurants nearby

**Our Tips**

- Arrive at least an hour early for a good spot
- Bring a camera with night photography capabilities
- Check the schedule in advance
- Combine the show with dinner at a restaurant with a view

Want us to organize a full evening around the show? Dinner, transfers, everything — talk to us at EVE BLUE.`,
      ar: 'دبي لا تتوقف عن المفاجآت — وعرض الطائرات بدون طيار الليلي هو أحد أروع الفعاليات في المدينة.',
      fr: "Dubaï ne cesse de surprendre — et le spectacle de drones nocturne est l'un des événements les plus spectaculaires.",
      ru: 'Дубай не перестаёт удивлять — и ночное шоу дронов является одним из самых впечатляющих мероприятий.',
    },
  },
  {
    id: 'yacht-charter-guide',
    image: blogYacht,
    category: {
      he: 'חוויות יוקרה',
      en: 'Luxury Experiences',
      ar: 'تجارب فاخرة',
      fr: 'Expériences de luxe',
      ru: 'Роскошный опыт',
    },
    title: {
      he: 'השכרת יאכטה בדובאי — המדריך המלא לשייט מושלם',
      en: 'Yacht Charter in Dubai — The Complete Guide to a Perfect Cruise',
      ar: 'استئجار يخت في دبي — الدليل الكامل لرحلة بحرية مثالية',
      fr: 'Location de yacht à Dubaï — Le guide complet pour une croisière parfaite',
      ru: 'Аренда яхты в Дубае — Полный гид по идеальному круизу',
    },
    excerpt: {
      he: 'שייט על יאכטה פרטית בדובאי הוא אחת החוויות המרשימות ביותר שאפשר לחוות בעיר. מרינה דובאי הקוסמופוליטית, קו החוף המרהיב והשמש התמידית הופכים את השייט לחובה לכל מי שמבקר כאן.',
      en: 'A private yacht cruise in Dubai is one of the most impressive experiences you can have in the city. The cosmopolitan Dubai Marina, stunning coastline, and perpetual sunshine make sailing a must.',
      ar: 'رحلة بحرية على يخت خاص في دبي هي واحدة من أكثر التجارب إثارة للإعجاب.',
      fr: 'Une croisière en yacht privé à Dubaï est l\'une des expériences les plus impressionnantes.',
      ru: 'Круиз на частной яхте в Дубае — одно из самых впечатляющих впечатлений.',
    },
    content: {
      he: `השכרת יאכטה בדובאי הפכה לאחת החוויות הפופולריות ביותר בקרב מטיילים שמחפשים את הרמה הבאה של יוקרה ואקסקלוסיביות.

**למה דווקא יאכטה בדובאי?**

דובאי מציעה שילוב מושלם: ים חם וצלול, קו חוף מרהיב עם גורדי שחקים כרקע, ותשתית ימית מתקדמת. בין אם מדובר בשייט רומנטי לזוג, מסיבת יום הולדת, או אירוע עסקי — יאכטה בדובאי תמיד עובדת.

**סוגי יאכטות**

- **יאכטות קומפקטיות (36-44 רגל)**: מושלמות לזוגות ומשפחות קטנות, 2-3 שעות שייט
- **יאכטות בינוניות (48-56 רגל)**: אידיאליות לקבוצות של 8-15 איש, עם דק שמש מרווח
- **יאכטות גדולות (70-100+ רגל)**: לאירועים ומסיבות, עם צוות מלא, מטבח ותא שינה

**מה כלול בדרך כלל?**

- קפטן ונווט מקצועיים
- דלק
- משקאות קבלת פנים
- ציוד דיג ושנירקול (לפי בקשה)
- מערכת סאונד

**מסלולי שייט מומלצים**

- סביב The Palm Jumeirah — נוף מרהיב של הפאלם מכיוון הים
- לאורך קו החוף של JBR ו-Ain Dubai
- Dubai Marina — מפליגים בין המגדלים
- Burj Al Arab — צילום מושלם מכיוון הים

**המלצות מ-EVE BLUE**

- שייט בשקיעה הוא הכי מבוקש — הזמינו מראש
- הביאו בגד ים ומגבת — הרבה יאכטות כוללות עצירה לשחייה
- חגיגה על הסיפון? אנחנו מארגנים DJ, קייטרינג ועיצוב

דברו איתנו ונתאים לכם את היאכטה המושלמת.`,
      en: `Yacht charter in Dubai has become one of the most popular luxury experiences for travelers seeking the next level of exclusivity.

**Why a Yacht in Dubai?**

Dubai offers the perfect combination: warm clear seas, a stunning coastline with skyscrapers as backdrop, and advanced maritime infrastructure. Whether it's a romantic cruise, birthday party, or corporate event — a yacht in Dubai always works.

**Types of Yachts**

- **Compact (36-44ft)**: Perfect for couples and small families
- **Medium (48-56ft)**: Ideal for groups of 8-15, with spacious sun deck
- **Large (70-100+ft)**: For events and parties, full crew, kitchen and cabins

**What's Usually Included?**

- Professional captain and navigator
- Fuel
- Welcome drinks
- Fishing and snorkeling equipment
- Sound system

**Recommended Routes**

- Around The Palm Jumeirah
- Along JBR coastline and Ain Dubai
- Dubai Marina — cruise between the towers
- Burj Al Arab — perfect photo opportunity from the sea

Talk to us at EVE BLUE and we'll find you the perfect yacht.`,
      ar: 'أصبح استئجار اليخوت في دبي من أكثر التجارب الفاخرة شعبية بين المسافرين.',
      fr: "La location de yacht à Dubaï est devenue l'une des expériences de luxe les plus populaires.",
      ru: 'Аренда яхт в Дубае стала одним из самых популярных роскошных развлечений для путешественников.',
    },
  },
  {
    id: 'desert-safari-guide',
    image: blogDesert,
    category: {
      he: 'אטרקציות',
      en: 'Attractions',
      ar: 'معالم سياحية',
      fr: 'Attractions',
      ru: 'Достопримечательности',
    },
    title: {
      he: 'ספארי מדבר בדובאי — הרפתקה שאסור לפספס',
      en: 'Desert Safari in Dubai — An Adventure You Can\'t Miss',
      ar: 'سفاري صحراوي في دبي — مغامرة لا يمكن تفويتها',
      fr: 'Safari dans le désert de Dubaï — Une aventure à ne pas manquer',
      ru: 'Сафари в пустыне Дубая — Приключение, которое нельзя пропустить',
    },
    excerpt: {
      he: 'ספארי במדבר הערבי הוא אחת החוויות הייחודיות ביותר שדובאי מציעה. דיונות זהב אינסופיות, שקיעות מרהיבות, רכיבה על גמלים וארוחת ערב בדואית — חוויה שלא תשכחו.',
      en: 'A safari in the Arabian desert is one of the most unique experiences Dubai offers. Endless golden dunes, breathtaking sunsets, camel rides, and Bedouin dinner — an experience you won\'t forget.',
      ar: 'رحلة سفاري في الصحراء العربية هي واحدة من أكثر التجارب الفريدة التي تقدمها دبي.',
      fr: "Un safari dans le désert d'Arabie est l'une des expériences les plus uniques de Dubaï.",
      ru: 'Сафари в Аравийской пустыне — одно из самых уникальных впечатлений в Дубае.',
    },
    content: {
      he: `מדבר דובאי הוא לא סתם חול — הוא חוויה. ספארי במדבר הערבי הוא אחד הדברים הראשונים שכדאי לעשות כשמגיעים לדובאי, ולא בכדי: השילוב של טבע פראי, תרבות מקומית ואדרנלין יוצר חוויה בלתי נשכחת.

**סוגי ספארי**

- **ספארי שקיעה (Sunset Safari)**: הפופולרי ביותר. יוצאים אחרי הצהריים, נהנים מנסיעה על הדיונות, צופים בשקיעה ומסיימים עם ארוחת ערב
- **ספארי בוקר (Morning Safari)**: לאנשי הבוקר — דיונות, סנדבורדינג ורכיבה על גמלים
- **ספארי לילה (Overnight Safari)**: לינה באוהל בדואי יוקרתי, צפייה בכוכבים וארוחת בוקר במדבר
- **ספארי VIP פרטי**: רכב פרטי, מדריך אישי, תפריט מותאם

**מה כולל ספארי טיפוסי?**

- נסיעת דיונות (Dune Bashing) ב-SUV 4x4
- סנדבורדינג על הדיונות
- רכיבה על גמלים
- ציורי חינה
- מופע ריקוד בטן ותנורה
- ארוחת ערב בסגנון בדואי (בשרים על האש, סלטים, חומוס)
- שישה (נרגילה)
- צפייה בכוכבים

**טיפים חשובים**

- לבשו בגדים נוחים ונעליים סגורות
- הביאו קרם הגנה ומשקפי שמש
- אל תאכלו ארוחה כבדה לפני נסיעת הדיונות
- טעינה מלאה למצלמה — תרצו לצלם הכל

רוצים ספארי VIP? דברו איתנו ב-EVE BLUE ונארגן לכם חוויה מדברית ברמה הגבוהה ביותר.`,
      en: `The Dubai desert is not just sand — it's an experience. A safari in the Arabian desert is one of the first things to do when arriving in Dubai.

**Types of Safari**

- **Sunset Safari**: Most popular. Depart in the afternoon, enjoy dune driving, watch sunset, end with dinner
- **Morning Safari**: Dunes, sandboarding, and camel rides
- **Overnight Safari**: Luxury Bedouin tent, stargazing, desert breakfast
- **Private VIP Safari**: Private vehicle, personal guide, custom menu

**What's Included?**

- Dune Bashing in 4x4 SUV
- Sandboarding
- Camel rides
- Henna painting
- Belly dance and Tanoura show
- Bedouin-style dinner
- Shisha
- Stargazing

Want a VIP safari? Talk to us at EVE BLUE and we'll organize the ultimate desert experience.`,
      ar: 'صحراء دبي ليست مجرد رمال — إنها تجربة لا تُنسى.',
      fr: "Le désert de Dubaï n'est pas qu'un simple sable — c'est une expérience inoubliable.",
      ru: 'Пустыня Дубая — это не просто песок, это целое приключение.',
    },
  },
  {
    id: 'fine-dining-guide',
    image: blogDining,
    category: {
      he: 'מסעדות וחיי לילה',
      en: 'Dining & Nightlife',
      ar: 'مطاعم وحياة ليلية',
      fr: 'Restaurants et vie nocturne',
      ru: 'Рестораны и ночная жизнь',
    },
    title: {
      he: 'המסעדות הכי שוות בדובאי — המדריך שלנו ל-2026',
      en: 'The Best Restaurants in Dubai — Our 2026 Guide',
      ar: 'أفضل المطاعم في دبي — دليلنا لعام 2026',
      fr: 'Les meilleurs restaurants de Dubaï — Notre guide 2026',
      ru: 'Лучшие рестораны Дубая — Наш гид на 2026 год',
    },
    excerpt: {
      he: 'דובאי היא גן עדן קולינרי. מסעדות שף ברמה עולמית, אווירה שלא תמצאו במקום אחר, ונופים שגורמים לכל ארוחה להפוך לחוויה. הנה הרשימה שלנו של המקומות שחייבים לנסות.',
      en: 'Dubai is a culinary paradise. World-class chef restaurants, unmatched atmosphere, and views that turn every meal into an experience. Here\'s our must-try list.',
      ar: 'دبي هي جنة الطهي. مطاعم طهاة عالمية المستوى وأجواء لا مثيل لها.',
      fr: "Dubaï est un paradis culinaire. Restaurants de chefs de classe mondiale et atmosphère incomparable.",
      ru: 'Дубай — кулинарный рай. Рестораны мирового класса и неповторимая атмосфера.',
    },
    content: {
      he: `סצנת המסעדות בדובאי היא אחת הדינמיות והמרגשות ביותר בעולם. כל שנה נפתחות מסעדות חדשות, שפים מפורסמים פותחים סניפים, והתחרות על השולחן הטוב ביותר רק הולכת וגוברת.

**קטגוריות מסעדות**

**מסעדות עם נוף:**
- **At.mosphere** — מסעדה בקומה 122 של בורג' ח'ליפה. הנוף? אין מילים. הזמינו שולחן ליד החלון ותראו את כל דובאי מלמעלה
- **Ossiano** — מסעדה תת-ימית ב-Atlantis עם אקווריום ענק. פירות ים ברמה הגבוהה ביותר
- **Ce La Vi** — על גג Address Sky View, עם נוף ל-Burj Khalifa מקרוב

**מסעדות שף:**
- **Zuma** — מטבח יפני מודרני, אחת המסעדות הפופולריות ביותר. שווה כל שקל
- **Nobu** — של השף נובו מצוחישה, באטלנטיס. סושי ומאכלים יפניים-פרואניים
- **La Petite Maison** — מטבח צרפתי קלאסי ב-DIFC. אלגנטי ומדויק

**מסעדות לחוויה:**
- **Billionaire Mansion** — אוכל, מופע חי ואווירה של מסיבה. הרבה יותר ממסעדה
- **Twiggy by La Cantine** — בריכה, DJ ואוכל ים תיכוני. מושלם לברנץ' של שישי
- **LOCA** — מקסיקני לטיני עם מופעים. אווירה חמה ומדליקה

**טיפים להזמנה:**

- מסעדות פופולריות מתמלאות מהר — הזמינו 3-7 ימים מראש
- ברנץ' ביום שישי הוא מוסד בדובאי — אל תפספסו
- Dress code חשוב! רוב המסעדות דורשות Smart Casual לפחות
- תמיד ציינו אם יש אלרגיות או העדפות תזונתיות

**EVE BLUE — הקונסיירז' שלכם**

אנחנו מכירים את כל השפים, את כל המנהלים ואת כל השולחנות הטובים. צריכים שולחן ברגע האחרון? בקשת כניסה VIP? תפריט מיוחד? דברו איתנו ואנחנו נשתדל להשיג את הבלתי אפשרי.`,
      en: `Dubai's restaurant scene is one of the most dynamic and exciting in the world. Every year, new restaurants open, famous chefs launch outposts, and the competition for the best table only intensifies.

**Restaurants with Views:**
- **At.mosphere** — Restaurant on the 122nd floor of Burj Khalifa
- **Ossiano** — Underwater restaurant at Atlantis with a giant aquarium
- **Ce La Vi** — Rooftop at Address Sky View, with close-up Burj Khalifa views

**Chef Restaurants:**
- **Zuma** — Modern Japanese, one of the most popular restaurants
- **Nobu** — By Chef Nobu Matsuhisa, at Atlantis
- **La Petite Maison** — Classic French cuisine in DIFC

**Experience Restaurants:**
- **Billionaire Mansion** — Food, live shows, party atmosphere
- **Twiggy by La Cantine** — Pool, DJ, Mediterranean food
- **LOCA** — Latin Mexican with shows

**Booking Tips:**
- Popular restaurants fill fast — book 3-7 days ahead
- Friday brunch is an institution in Dubai
- Dress code matters! Most require Smart Casual minimum

At EVE BLUE, we know all the chefs, managers, and best tables. Need a last-minute reservation? VIP entry? Special menu? Talk to us.`,
      ar: 'مشهد المطاعم في دبي هو واحد من أكثر المشاهد ديناميكية وإثارة في العالم.',
      fr: "La scène culinaire de Dubaï est l'une des plus dynamiques et passionnantes au monde.",
      ru: 'Ресторанная сцена Дубая — одна из самых динамичных и захватывающих в мире.',
    },
  },
  {
    id: 'dubai-nightlife-clubs',
    image: blogNightlifeClub,
    category: {
      he: 'מסעדות וחיי לילה',
      en: 'Dining & Nightlife',
      ar: 'مطاعم وحياة ليلية',
      fr: 'Restaurants et vie nocturne',
      ru: 'Рестораны и ночная жизнь',
    },
    title: {
      he: 'חיי הלילה בדובאי — המדריך המלא למועדונים, ברים וערבי VIP',
      en: 'Dubai Nightlife — The Complete Guide to Clubs, Bars & VIP Nights',
      ar: 'الحياة الليلية في دبي — الدليل الكامل للنوادي والبارات',
      fr: 'Vie nocturne à Dubaï — Le guide complet des clubs et bars',
      ru: 'Ночная жизнь Дубая — Полный гид по клубам и барам',
    },
    excerpt: {
      he: 'דובאי היא אחת מערי חיי הלילה המובילות בעולם. מועדונים ברמה בינלאומית, ברים על גגות עם נוף מטורף, ומסיבות שלא תשכחו. הנה איך עושים את זה נכון — עם EVE BLUE.',
      en: 'Dubai is one of the world\'s top nightlife cities. International-level clubs, rooftop bars with insane views, and unforgettable parties. Here\'s how to do it right — with EVE BLUE.',
      ar: 'دبي هي واحدة من أفضل مدن الحياة الليلية في العالم.',
      fr: 'Dubaï est l\'une des meilleures villes au monde pour la vie nocturne.',
      ru: 'Дубай — один из лучших городов мира для ночной жизни.',
    },
    content: {
      he: `חיי הלילה בדובאי הם עולם בפני עצמו. העיר מציעה מגוון מטורף של מועדונים, ברים, טרקלינים ומסיבות — כולם ברמה שמתחרה בלונדון, איביזה ומיאמי. ומה שהופך את דובאי למיוחדת? השילוב של מוזיקה עולמית, נוף עירוני מרהיב ושירות שלא תמצאו במקום אחר.

**המועדונים החמים**

- **WHITE Dubai** — מועדון על הגג עם DJ-ים בינלאומיים, אווירה אנרגטית ומסיבות שנמשכות עד השעות הקטנות
- **Billionaire Mansion** — מופע חי, אוכל יוקרתי ומסיבה — הכל במקום אחד. חוויה שלמה
- **Cavalli Club** — עיצוב מפואר בסגנון רוברטו קאוואלי, מוזיקה מעולה ואווירת גלאם
- **BASE Dubai** — מועדון חוצות ענק ב-Design District עם הופעות חיות ומסיבות ענק

**ברים על גגות**

- **Ce La Vi** — על גג Address Sky View, עם נוף ישיר ל-Burj Khalifa. קוקטיילים מעולים ואווירת שקיעה מושלמת
- **Zeta** — בר אלגנטי עם DJ ושירות ברמה גבוהה
- **Skybar** — נוף פנורמי ל-Palm Jumeirah ו-Dubai Marina

**איך EVE BLUE עוזרת?**

חיי הלילה בדובאי דורשים תכנון — ובדיוק בשביל זה אנחנו כאן:

- **בקשות כניסה למועדונים** — אנחנו שולחים בקשות כניסה (Guest List) למועדונים הפופולריים ומשתדלים להבטיח כניסה חלקה
- **הזמנת שולחנות VIP** — שולחן עם שירות בקבוקים, מיקום מועדף ויחס אישי
- **תכנון ערב שלם** — מסעדה → בר → מועדון, עם הסעה בין המקומות
- **שירות נהג VIP** — נהג פרטי שמחכה לכם כל הערב, לוקח ומביא בין המקומות
- **הזמנות ברגע האחרון** — שינוי תוכניות? אנחנו זמינים 24/7 ונשתדל למצוא פתרון

**Dress Code — מה לובשים?**

- רוב המועדונים דורשים Smart Casual לפחות
- לגברים: מכנסיים ארוכים, נעליים סגורות (לא סניקרס), חולצה מכופתרת
- לנשים: שמלה או חצאית, עקבים
- טיפ: כשאתם מגיעים עם EVE BLUE, אנחנו מוודאים שאתם מוכנים לכל מקום

**טיפים מאיתנו**

- חיי הלילה מתחילים מאוחר — מועדונים מתחילים להתמלא אחרי 23:00
- ברנץ' של יום שישי (Friday Brunch) הוא דרך מעולה להתחיל את הסופ"ש — הרבה ברנצ'ים מובילים ישירות למסיבה
- חודשי החורף (נובמבר-מרץ) הם עונת השיא למסיבות ואירועים

רוצים ערב בלתי נשכח? שלחו לנו הודעה ואנחנו נארגן הכל.`,
      en: `Dubai nightlife is a world of its own. The city offers an incredible variety of clubs, bars, lounges, and parties — all at a level that competes with London, Ibiza, and Miami.

**Hot Clubs**

- **WHITE Dubai** — Rooftop club with international DJs
- **Billionaire Mansion** — Live shows, luxury dining, and party in one
- **Cavalli Club** — Roberto Cavalli-styled glamour
- **BASE Dubai** — Massive outdoor club in Design District

**Rooftop Bars**

- **Ce La Vi** — Atop Address Sky View, direct Burj Khalifa views
- **Zeta** — Elegant bar with DJ service
- **Skybar** — Panoramic Palm Jumeirah and Marina views

**How EVE BLUE Helps**

- **Club guest list requests** — We submit entry requests to popular clubs
- **VIP table bookings** — Bottle service, premium location
- **Full evening planning** — Restaurant → Bar → Club with transfers
- **VIP driver service** — Private driver waiting all evening
- **Last-minute bookings** — We're available 24/7

Want an unforgettable night? Message us and we'll arrange everything.`,
      ar: 'الحياة الليلية في دبي هي عالم قائم بذاته. تقدم المدينة تشكيلة مذهلة من النوادي والبارات.',
      fr: "La vie nocturne de Dubaï est un monde à part entière avec une variété incroyable de clubs et bars.",
      ru: 'Ночная жизнь Дубая — это целый мир. Город предлагает невероятное разнообразие клубов и баров.',
    },
  },
  {
    id: 'luxury-shopping-guide',
    image: blogShopping,
    category: {
      he: 'קניות יוקרה',
      en: 'Luxury Shopping',
      ar: 'تسوق فاخر',
      fr: 'Shopping de luxe',
      ru: 'Люксовый шопинг',
    },
    title: {
      he: 'קניות יוקרה בדובאי — המדריך שלנו לקניונים, מותגים וחוויות שופינג',
      en: 'Luxury Shopping in Dubai — Our Guide to Malls, Brands & Shopping Experiences',
      ar: 'التسوق الفاخر في دبي — دليلنا للمولات والعلامات التجارية',
      fr: 'Shopping de luxe à Dubaï — Notre guide des centres commerciaux et marques',
      ru: 'Люксовый шопинг в Дубае — Наш гид по моллам и брендам',
    },
    excerpt: {
      he: 'דובאי היא גן עדן לחובבי קניות. מקניון הגדול בעולם ועד בוטיקים אקסקלוסיביים — הנה המדריך שלנו לחוויית שופינג יוקרתית בדובאי, כולל איך EVE BLUE יכולה לשדרג את החוויה.',
      en: 'Dubai is a shopping paradise. From the world\'s largest mall to exclusive boutiques — here\'s our guide to luxury shopping, plus how EVE BLUE can elevate the experience.',
      ar: 'دبي هي جنة التسوق. من أكبر مول في العالم إلى البوتيكات الحصرية.',
      fr: "Dubaï est un paradis du shopping. Du plus grand centre commercial au monde aux boutiques exclusives.",
      ru: 'Дубай — рай для шопинга. От крупнейшего в мире торгового центра до эксклюзивных бутиков.',
    },
    content: {
      he: `דובאי ושופינג הולכים יד ביד. העיר מציעה חוויית קניות שאין לה מקבילה בעולם — קניונים ענקיים, מותגי יוקרה בכל פינה, ומחירים שלפעמים טובים יותר מאירופה בזכות העדר מס (Tax Free).

**הקניונים המובילים**

- **The Dubai Mall** — הקניון הגדול בעולם. מעל 1,200 חנויות, אקווריום ענק, מגרש החלקה על הקרח, מפל מים מקורה, ואינספור מסעדות. אפשר לבלות כאן יום שלם
- **Mall of the Emirates** — ביתו של Ski Dubai (מגלשת סקי מקורית!), עם כל מותגי היוקרה ואפשרויות בידור
- **City Walk** — אזור קניות חוצות מעוצב ומודרני עם בוטיקים, בתי קפה וגלריות
- **Dubai Marina Mall** — קניון קומפקטי ונוח ליד המרינה עם מותגים מובילים

**מותגי יוקרה שחייבים לבקר**

- **Fashion Avenue** (Dubai Mall) — אגף שלם של מותגי העילית: Louis Vuitton, Gucci, Chanel, Dior, Hermès
- **Gold Souk** (שוק הזהב) — שוק מסורתי עם מאות חנויות זהב ותכשיטים במחירים תחרותיים
- **Perfume Souk** — שוק הבשמים המסורתי ב-Deira, עם בשמים מזרחיים ייחודיים
- **Dubai Design District (d3)** — בוטיקים של מעצבים מקומיים ובינלאומיים

**טיפים לשופינג חכם**

- **Tax Refund**: תיירים זכאים להחזר מס (VAT Refund) על קניות מעל 250 AED. שמרו את הקבלות!
- **Dubai Shopping Festival**: פסטיבל הקניות השנתי (ינואר-פברואר) עם הנחות משמעותיות ואירועים
- **Summer Surprises**: מבצעי קיץ עם הנחות של עד 75%
- **Gold & Jewelry**: דובאי ידועה כעיר הזהב — המחירים תחרותיים מאוד

**איך EVE BLUE עוזרת?**

- **השכרת רכב יוקרתי** — הגיעו לקניון בסטייל עם אחד מרכבי הפרימיום שלנו
- **שירות נהג VIP** — נהג פרטי שמחכה לכם מחוץ לקניון, עוזר עם שקיות ומסיע בין המקומות
- **המלצות מותאמות** — ספרו לנו מה אתם מחפשים ואנחנו נכוון אתכם למקומות הנכונים
- **שילוב קניות עם חוויות** — קניות בבוקר, ארוחה במסעדת שף, שייט על יאכטה בערב

דברו איתנו ונבנה לכם יום שופינג שלא תשכחו.`,
      en: `Dubai and shopping go hand in hand. The city offers an unparalleled shopping experience — massive malls, luxury brands everywhere, and prices sometimes better than Europe thanks to tax-free shopping.

**Top Malls**

- **The Dubai Mall** — World's largest mall. 1,200+ stores, aquarium, ice rink, waterfall
- **Mall of the Emirates** — Home of Ski Dubai, all luxury brands
- **City Walk** — Modern outdoor shopping district
- **Dubai Marina Mall** — Compact and convenient near the Marina

**Must-Visit Luxury Brands**

- **Fashion Avenue** (Dubai Mall) — Louis Vuitton, Gucci, Chanel, Dior, Hermès
- **Gold Souk** — Traditional market with hundreds of gold and jewelry shops
- **Perfume Souk** — Traditional perfume market with unique oriental fragrances

**Smart Shopping Tips**

- **Tax Refund**: Tourists can claim VAT refund on purchases over 250 AED
- **Dubai Shopping Festival**: Annual festival (Jan-Feb) with major discounts
- **Gold & Jewelry**: Dubai is the City of Gold — very competitive prices

**How EVE BLUE Helps**

- **Luxury car rental** — Arrive at the mall in style
- **VIP driver service** — Private driver waiting, helps with bags
- **Personalized recommendations** — Tell us what you're looking for
- **Combined experiences** — Shopping + chef restaurant + yacht cruise

Talk to us and we'll build you an unforgettable shopping day.`,
      ar: 'دبي والتسوق يسيران جنبًا إلى جنب. تقدم المدينة تجربة تسوق لا مثيل لها.',
      fr: "Dubaï et le shopping vont de pair. La ville offre une expérience shopping incomparable.",
      ru: 'Дубай и шопинг идут рука об руку. Город предлагает непревзойдённый опыт покупок.',
    },
  },
  {
    id: 'family-attractions-guide',
    image: blogFamily,
    category: {
      he: 'אטרקציות למשפחות',
      en: 'Family Attractions',
      ar: 'معالم عائلية',
      fr: 'Attractions familiales',
      ru: 'Семейные развлечения',
    },
    title: {
      he: 'דובאי עם ילדים — האטרקציות הכי שוות למשפחות (2026)',
      en: 'Dubai with Kids — The Best Family Attractions (2026)',
      ar: 'دبي مع الأطفال — أفضل المعالم العائلية (2026)',
      fr: 'Dubaï avec des enfants — Les meilleures attractions familiales (2026)',
      ru: 'Дубай с детьми — Лучшие семейные достопримечательности (2026)',
    },
    excerpt: {
      he: 'חושבים שדובאי היא רק למבוגרים? תחשבו שוב. העיר מציעה כמות מטורפת של אטרקציות למשפחות — פארקי מים, אקווריומים, פארקי שעשועים וחוויות שהילדים (וגם אתם) לא ישכחו.',
      en: 'Think Dubai is just for adults? Think again. The city offers an incredible array of family attractions — water parks, aquariums, theme parks, and experiences kids (and you) won\'t forget.',
      ar: 'هل تعتقد أن دبي للكبار فقط؟ فكر مرة أخرى. المدينة تقدم مجموعة مذهلة من المعالم العائلية.',
      fr: 'Vous pensez que Dubaï est réservé aux adultes ? Détrompez-vous. La ville offre une multitude d\'attractions familiales.',
      ru: 'Думаете, Дубай только для взрослых? Подумайте ещё раз. Город предлагает невероятное количество семейных развлечений.',
    },
    content: {
      he: `דובאי היא יעד מושלם למשפחות. העיר הבינה מזמן שמשפחות מחפשות חוויות ייחודיות, והשקיעה מיליארדים באטרקציות ברמה עולמית שמתאימות לכל הגילאים.

**פארקי מים**

- **Aquaventure Waterpark** (Atlantis The Palm) — פארק המים הגדול ביותר במזרח התיכון. מגלשות ענק, נהר עצל, חוף פרטי, ואפילו שחייה עם דולפינים. חובה מוחלטת!
- **Wild Wadi** — פארק מים ליד Burj Al Arab עם מגלשות לכל הגילאים ונוף מדהים
- **Laguna Waterpark** — פארק קומפקטי ומשפחתי ב-La Mer עם אווירה נינוחה

**אטרקציות מקורות**

- **IMG Worlds of Adventure** — פארק שעשועים מקורה (הגדול בעולם!) עם אזורי Marvel, Cartoon Network ודינוזאורים
- **Dubai Aquarium & Underwater Zoo** — אקווריום ענק ב-Dubai Mall עם מנהרת זכוכית מרהיבה, כרישים, ואפילו חוויית צלילה
- **KidZania** — עיר מיניאטורית שבה ילדים יכולים "לעבוד" במקצועות שונים — מכבי אש, רופאים, שפים ועוד
- **VR Park** — פארק מציאות מדומה ב-Dubai Mall עם חוויות אינטראקטיביות

**חוויות חוצות**

- **Dubai Miracle Garden** — גן הפרחים הגדול בעולם עם מיליוני פרחים בצורות מדהימות
- **Dubai Safari Park** — גן חיות מודרני עם אלפי חיות מרחבי העולם
- **Global Village** — שוק בינלאומי ענק עם ביתנים מ-90 מדינות, אטרקציות ואוכל
- **The Green Planet** — יער גשם טרופי מקורה עם בעלי חיים אקזוטיים

**חוויות מיוחדות לכל המשפחה**

- **טיסת הליקופטר** — סיור על דובאי מלמעלה. הילדים ישתגעו! (אנחנו ב-EVE BLUE מארגנים טיסות פרטיות)
- **שייט על יאכטה** — יאכטה משפחתית עם עצירה לשחייה וציוד שנירקול
- **ספארי מדבר** — רכיבה על גמלים, סנדבורדינג וארוחת ערב בדואית
- **Ski Dubai** — סקי ושלג ב-35 מעלות בחוץ! כולל פינגווינים אמיתיים

**איך EVE BLUE עוזרת משפחות?**

- **כרטיסים לאטרקציות** — אנחנו מארגנים כרטיסי כניסה ומשתדלים להשיג מחירים טובים ואפשרויות VIP
- **תכנון ימי טיול** — מסלול מותאם למשפחה עם ילדים, כולל הפסקות, ארוחות ואטרקציות
- **שירות נהג VIP** — נהג פרטי עם רכב מרווח למשפחה, כולל מושבי בטיחות לילדים
- **השכרת רכב** — רכבי SUV מרווחים למשפחות גדולות
- **המלצות למסעדות ידידותיות למשפחות** — מקומות עם תפריט ילדים, מתחמי משחק ואווירה מתאימה
- **הזמנת מלונות** — נעזור לכם למצוא מלון עם בריכה, מועדון ילדים ונוחות למשפחה

**טיפים למשפחות**

- בחודשי הקיץ (יוני-ספטמבר) העדיפו אטרקציות מקורות — החום יכול להיות אינטנסיבי
- הרבה אטרקציות מציעות כרטיסים משולבים (Combo Tickets) — שווה לבדוק
- ילדים מתחת לגיל 3 נכנסים חינם לרוב האטרקציות
- קחו הפסקות — הימים בדובאי ארוכים ומלאים

רוצים שנתכנן לכם חופשה משפחתית מושלמת? דברו איתנו ואנחנו נדאג לכל הפרטים.`,
      en: `Dubai is a perfect family destination. The city invested billions in world-class attractions suitable for all ages.

**Water Parks**

- **Aquaventure Waterpark** (Atlantis) — Largest in the Middle East. Giant slides, lazy river, private beach, swim with dolphins
- **Wild Wadi** — Near Burj Al Arab with slides for all ages
- **Laguna Waterpark** — Compact family-friendly park at La Mer

**Indoor Attractions**

- **IMG Worlds of Adventure** — World's largest indoor theme park with Marvel, Cartoon Network zones
- **Dubai Aquarium & Underwater Zoo** — Giant aquarium in Dubai Mall
- **KidZania** — Miniature city where kids can "work" different jobs
- **VR Park** — Virtual reality park in Dubai Mall

**Special Family Experiences**

- **Helicopter tour** — See Dubai from above (EVE BLUE arranges private flights)
- **Family yacht cruise** — Swimming stop and snorkeling gear included
- **Desert safari** — Camel rides, sandboarding, Bedouin dinner
- **Ski Dubai** — Skiing in 35°C heat! Real penguins included

**How EVE BLUE Helps Families**

- **Attraction tickets** — We arrange entry tickets and try to get VIP options
- **Day trip planning** — Custom family itineraries with breaks and meals
- **VIP driver service** — Private driver with spacious family vehicle, child seats
- **Family restaurant recommendations** — Places with kids' menus and play areas
- **Hotel booking assistance** — Hotels with pools, kids clubs, family-friendly amenities

Want us to plan your perfect family vacation? Talk to us and we'll handle all the details.`,
      ar: 'دبي هي وجهة مثالية للعائلات. استثمرت المدينة المليارات في معالم سياحية عالمية المستوى.',
      fr: "Dubaï est une destination parfaite pour les familles avec des attractions de classe mondiale.",
      ru: 'Дубай — идеальное семейное направление. Город инвестировал миллиарды в достопримечательности мирового уровня.',
    },
  },
];

const sectionTitle: Record<string, string> = {
  he: 'כתבות מתוך הבלוג שיכולות לעניין אותך',
  en: 'Blog articles you might enjoy',
  ar: 'مقالات من المدونة قد تهمك',
  fr: 'Articles de blog qui pourraient vous intéresser',
  ru: 'Статьи блога, которые могут вас заинтересовать',
};

export function BlogSection() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';
  const headerReveal = useScrollReveal<HTMLDivElement>();
  const cardsReveal = useScrollReveal<HTMLDivElement>();

  return (
    <section className="px-4 sm:px-6 py-14 sm:py-20 max-w-[1100px] mx-auto w-full" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div ref={headerReveal.ref} className={`text-center mb-10 sm:mb-14 reveal-base ${headerReveal.isVisible ? 'revealed' : ''}`}>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary">
          {sectionTitle[language] || sectionTitle.en}
        </h2>
        <div className="w-20 h-px shimmer-line mx-auto mt-4" />
      </div>

      {/* Cards grid */}
      <div ref={cardsReveal.ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 reveal-stagger ${cardsReveal.isVisible ? 'revealed' : ''}`}>
        {BLOG_ARTICLES.map((article) => (
          <button
            key={article.id}
            onClick={() => navigate(`/blog/${article.id}`)}
            className="group text-start rounded-xl overflow-hidden bg-card/40 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_hsl(var(--primary)/0.1)]"
          >
            {/* Image */}
            <div className="relative aspect-[3/2] overflow-hidden">
              <img
                src={article.image}
                alt={article.title[language] || article.title.en}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 space-y-2.5">
              {/* Category tag */}
              <span className="text-[10px] sm:text-xs text-primary/70 uppercase tracking-[0.2em] font-medium">
                {article.category[language] || article.category.en}
              </span>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {article.title[language] || article.title.en}
              </h3>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-foreground/50 leading-relaxed line-clamp-3">
                {article.excerpt[language] || article.excerpt.en}
              </p>

              {/* Read more */}
              <div className="flex items-center gap-1.5 text-primary text-xs font-medium pt-1">
                <span>{language === 'he' ? 'קרא עוד' : language === 'ar' ? 'اقرأ المزيد' : language === 'fr' ? 'Lire la suite' : language === 'ru' ? 'Читать далее' : 'Read more'}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
