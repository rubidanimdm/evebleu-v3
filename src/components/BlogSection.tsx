import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';

import blogAirport from '@/assets/blog-airport.jpg';
import blogEmirates from '@/assets/blog-emirates.jpg';
import blogNightlife from '@/assets/blog-dubai-nightlife.jpg';
import blogYacht from '@/assets/blog-yacht.jpg';
import blogDesert from '@/assets/blog-desert.jpg';
import blogDining from '@/assets/blog-dining.jpg';

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

  return (
    <section className="px-4 sm:px-6 py-14 sm:py-20 max-w-[1100px] mx-auto w-full" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary">
          {sectionTitle[language] || sectionTitle.en}
        </h2>
        <div className="w-20 h-px bg-primary/30 mx-auto mt-4" />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
