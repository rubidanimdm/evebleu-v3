import { useRef } from 'react';
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
import blogJWMarriott from '@/assets/blog-jw-marriott.jpg';
import blogShangriLa from '@/assets/blog-shangrila.jpg';
import blogSofitel from '@/assets/blog-sofitel.jpg';
import blogParkHyatt from '@/assets/blog-park-hyatt.jpg';
import blogRixos from '@/assets/blog-rixos.jpg';
import blogBurjKhalifa from '@/assets/blog-burj-khalifa.jpg';
import blogDubaiMall from '@/assets/blog-dubai-mall.jpg';
import blogDesertSafari from '@/assets/blog-desert-safari.jpg';
import blogPalmAtlantis from '@/assets/blog-palm-atlantis.jpg';
import blogAinDubai from '@/assets/blog-ain-dubai.jpg';
import blogAtlantisRoyal from '@/assets/blog-atlantis-royal.jpg';
import blogAtlantisPalm from '@/assets/blog-atlantis-palm.jpg';
import blogFivePalm from '@/assets/blog-five-palm.jpg';
import blogArmaniBurj from '@/assets/blog-armani-burj.jpg';
import blogMarinaGate from '@/assets/blog-marina-gate.jpg';
import blogHotAirBalloon from '@/assets/blog-hot-air-balloon.jpg';
import blogHelicopterDubai from '@/assets/blog-helicopter-dubai.jpg';
import blogSkydivingDubai from '@/assets/blog-skydiving-dubai.jpg';

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
  {
    id: 'jw-marriott-marquis-dubai',
    image: blogJWMarriott,
    category: {
      he: 'מלונות מומלצים',
      en: 'Recommended Hotels',
      ar: 'فنادق موصى بها',
      fr: 'Hôtels recommandés',
      ru: 'Рекомендуемые отели',
    },
    title: {
      he: 'JW Marriott Marquis Hotel Dubai — המלון הגבוה ביותר בעולם',
      en: 'JW Marriott Marquis Hotel Dubai — The World\'s Tallest Hotel',
      ar: 'فندق JW ماريوت ماركيز دبي — أطول فندق في العالم',
      fr: 'JW Marriott Marquis Hotel Dubai — L\'hôtel le plus haut du monde',
      ru: 'JW Marriott Marquis Hotel Dubai — Самый высокий отель в мире',
    },
    excerpt: {
      he: 'שני מגדלי תאומים מרשימים בלב Business Bay, עם מסעדות עולמיות, ספא מפנק ונוף פנורמי שאין לו תחרות.',
      en: 'Two impressive twin towers in the heart of Business Bay, with world-class restaurants, a luxurious spa, and unrivaled panoramic views.',
      ar: 'برجان توأمان مذهلان في قلب الخليج التجاري مع مطاعم عالمية ومنتجع صحي فاخر.',
      fr: 'Deux tours jumelles impressionnantes au cœur de Business Bay avec des restaurants de classe mondiale.',
      ru: 'Две впечатляющие башни-близнецы в самом сердце Business Bay с ресторанами мирового класса.',
    },
    content: {
      he: `מלון JW Marriott Marquis Dubai הוא אחד המלונות האייקוניים ביותר בדובאי, ונחשב למלון הגבוה ביותר בעולם עם שני מגדלי תאומים שמתנשאים לגובה של 355 מטרים. המלון ממוקם באזור Business Bay היוקרתי, במרחק דקות מ-Downtown Dubai, ה-Dubai Mall וברג' ח'ליפה.

**מיקום אסטרטגי**

המלון שוכן לצד תעלת דובאי (Dubai Water Canal), ומציע גישה נוחה הן למרכז העסקים של העיר והן לאזורי הבילוי. תוך 10 דקות נסיעה תגיעו ל-Dubai Mall, ותוך 15 דקות לחוף ג'ומיירה.

**חדרים וסוויטות**

המלון מציע למעלה מ-1,600 חדרים וסוויטות מרווחים, כולם מעוצבים ברמה גבוהה עם נוף מרהיב לקו הרקיע של דובאי. הסוויטות הנשיאותיות מציעות מרפסות פרטיות, ג'קוזי ושירות באטלר אישי. כל חדר מצויד בטכנולוגיה מתקדמת, מצעים יוקרתיים וחדרי רחצה מפנקים מאבן שיש.

**מסעדות ובארים**

זהו ללא ספק אחד היתרונות הגדולים של המלון — מגוון קולינרי עצום:
- **Tong Thai** — מסעדה תאילנדית אותנטית עם אווירה מזרחית קסומה
- **Positano** — מטבח איטלקי משובח עם נוף פנורמי מדהים
- **Rang Mahal** — מסעדה הודית זוכת פרסים, אחת הטובות בדובאי
- **Prime68** — סטייקהאוס יוקרתי בקומה 68 עם נוף של 360 מעלות
- **Vault** — בר קוקטיילים יוקרתי בקומה העליונה עם אווירה אינטימית

**ספא ובריאות**

ה-Saray Spa משתרע על פני 3,000 מ"ר ומציע טיפולים מפנקים בהשראה ערבית מסורתית. יש גם חמאם טורקי אותנטי, סאונה, ג'קוזי וחדר אדים. חדר הכושר מצויד בציוד מתקדם ופתוח 24 שעות. הבריכה החיצונית ממוקמת בקומה 4 ומציעה נוף עירוני מרהיב.

**חווית שהייה**

המלון מתאים הן לאנשי עסקים (עם מרכז כנסים ענק ואולמות ישיבות) והן למטיילים שרוצים חוויה יוקרתית. צוות הקונסיירז' המקצועי ישמח לסייע בהזמנת מסעדות, סיורים ואטרקציות.

**למה אנחנו ב-EVE BLUE אוהבים את JW Marriott Marquis?**

- מיקום מעולה ליד כל האטרקציות המרכזיות
- מגוון מסעדות שלא מצריך לצאת מהמלון
- תמורה מצוינת לכסף ברמת 5 כוכבים
- שירות מקצועי וחם

רוצים שנזמין לכם חדר? דברו איתנו ונדאג לכל הפרטים, כולל איסוף משדה התעופה והעברות.`,
      en: `JW Marriott Marquis Hotel Dubai is one of Dubai's most iconic hotels and holds the title of the world's tallest hotel, with twin towers soaring to 355 meters. Located in the prestigious Business Bay area, it's just minutes from Downtown Dubai, Dubai Mall, and Burj Khalifa.

**Strategic Location**

The hotel sits alongside the Dubai Water Canal, offering convenient access to both the city's business district and entertainment areas. Dubai Mall is a 10-minute drive, and Jumeirah Beach is just 15 minutes away.

**Rooms & Suites**

With over 1,600 spacious rooms and suites, all elegantly designed with stunning views of Dubai's skyline, the hotel offers something for every traveler. Presidential suites feature private balconies, jacuzzis, and personal butler service. Every room is equipped with advanced technology, luxury linens, and marble bathrooms.

**Restaurants & Bars**

One of the hotel's greatest strengths is its incredible culinary diversity:
- **Tong Thai** — Authentic Thai cuisine with enchanting Eastern ambiance
- **Positano** — Fine Italian dining with stunning panoramic views
- **Rang Mahal** — Award-winning Indian restaurant, one of Dubai's finest
- **Prime68** — Luxury steakhouse on the 68th floor with 360-degree views
- **Vault** — Premium cocktail bar on the top floor with intimate atmosphere

**Spa & Wellness**

The Saray Spa spans 3,000 sqm and offers pampering treatments inspired by traditional Arabian wellness. Features include an authentic Turkish hammam, sauna, jacuzzi, and steam room. The gym is equipped with state-of-the-art equipment and open 24 hours. The outdoor pool on the 4th floor offers stunning city views.

**The Experience**

Perfect for both business travelers (with a massive convention center and meeting rooms) and leisure guests seeking luxury. The professional concierge team assists with restaurant reservations, tours, and attractions.

**Why EVE BLUE Loves JW Marriott Marquis**

- Excellent location near all major attractions
- Diverse restaurants — no need to leave the hotel
- Outstanding value for 5-star quality
- Professional and warm service

Want us to book a room? Talk to us and we'll handle everything, including airport pickup and transfers.`,
      ar: 'فندق JW ماريوت ماركيز دبي هو أحد أكثر الفنادق شهرة في دبي ويحمل لقب أطول فندق في العالم.',
      fr: "Le JW Marriott Marquis Hotel Dubai est l'un des hôtels les plus emblématiques de Dubaï et détient le titre de l'hôtel le plus haut du monde.",
      ru: 'JW Marriott Marquis Hotel Dubai — один из самых знаковых отелей Дубая, удерживающий титул самого высокого отеля в мире.',
    },
  },
  {
    id: 'shangri-la-dubai',
    image: blogShangriLa,
    category: {
      he: 'מלונות מומלצים',
      en: 'Recommended Hotels',
      ar: 'فنادق موصى بها',
      fr: 'Hôtels recommandés',
      ru: 'Рекомендуемые отели',
    },
    title: {
      he: 'Shangri‑La Dubai — אלגנטיות אסייתית עם נוף לברג\' ח\'ליפה',
      en: 'Shangri‑La Dubai — Asian Elegance with Burj Khalifa Views',
      ar: 'شانغريلا دبي — أناقة آسيوية مع إطلالة على برج خليفة',
      fr: 'Shangri‑La Dubai — Élégance asiatique avec vue sur le Burj Khalifa',
      ru: 'Shangri‑La Dubai — Азиатская элегантность с видом на Бурдж-Халифу',
    },
    excerpt: {
      he: 'מלון 5 כוכבים ברמה הגבוהה ביותר, ממוקם ב-Sheikh Zayed Road עם נוף ישיר לברג\' ח\'ליפה. שילוב מושלם של הכנסת אורחים אסייתית מסורתית ויוקרה מודרנית.',
      en: 'A top-tier 5-star hotel on Sheikh Zayed Road with direct Burj Khalifa views. A perfect blend of traditional Asian hospitality and modern luxury.',
      ar: 'فندق 5 نجوم من الدرجة الأولى على شارع الشيخ زايد مع إطلالة مباشرة على برج خليفة.',
      fr: 'Un hôtel 5 étoiles haut de gamme sur Sheikh Zayed Road avec vue directe sur le Burj Khalifa.',
      ru: '5-звёздочный отель высочайшего уровня на Sheikh Zayed Road с прямым видом на Бурдж-Халифу.',
    },
    content: {
      he: `Shangri-La Dubai הוא מלון יוקרה קלאסי שמביא את המסורת האסייתית המפורסמת של הכנסת אורחים אל לב דובאי. המלון ממוקם בשדרות Sheikh Zayed Road, ומציע גישה ישירה למטרו ומיקום אידיאלי לחקירת העיר.

**מיקום מרכזי ונגיש**

המלון צמוד לתחנת מטרו Financial Centre, מה שמאפשר גישה קלה לכל רחבי העיר. ה-Dubai Mall וברג' ח'ליפה נמצאים במרחק הליכה קצר. כמו כן, DIFC (מרכז הפיננסים) נמצא ממש מעבר לכביש.

**חדרים וסוויטות**

302 חדרים וסוויטות מרווחים, מעוצבים בסגנון אלגנטי עם השפעות אסייתיות עדינות. רבים מהחדרים מציעים נוף ישיר לברג' ח'ליפה — חוויה בלתי נשכחת, במיוחד בלילה. הסוויטות כוללות סלון נפרד, חדר ארונות מפנק וחדרי רחצה מאבן שיש.

**חוויה קולינרית**

- **Shang Palace** — מסעדה סינית מפורסמת, אחת הטובות בדובאי, המגישה מאכלים קנטונזיים מסורתיים ודים סאם מעולה
- **Dunes Café** — מסעדה בינלאומית עם בופה עשיר ומגוון
- **Hoi An** — מטבח וייטנאמי אותנטי באווירה רומנטית
- **Lobby Lounge** — תה אחר הצהריים מסורתי בסגנון בריטי-אסייתי

**ספא CHI**

ספא CHI המפורסם של Shangri-La הוא חוויה בפני עצמה. טיפולים בהשראה אסייתית עתיקה, חדרי טיפול זוגיים, סאונה, ג'קוזי ובריכת אינפיניטי מרהיבה עם נוף לקו הרקיע של דובאי.

**בריכה ופנאי**

הבריכה החיצונית בקומה הגבוהה מציעה נוף עוצר נשימה ואווירה רגועה. יש גם חדר כושר מתקדם, מגרש טניס ומועדון ילדים.

**למה אנחנו ב-EVE BLUE ממליצים על Shangri-La?**

- שירות אסייתי מסורתי ברמה הגבוהה ביותר — חם, מדויק ואנושי
- נוף לברג' ח'ליפה שאין דומה לו
- המסעדה הסינית Shang Palace שווה ביקור בפני עצמה
- מיקום מרכזי עם גישה למטרו
- אווירה שקטה ואלגנטית בלב עיר סוערת

צרו איתנו קשר ונדאג להזמנת חדר, שדרוגים ותוספות מיוחדות.`,
      en: `Shangri-La Dubai is a classic luxury hotel bringing Asia's renowned hospitality tradition to the heart of Dubai. Located on Sheikh Zayed Road, it offers direct metro access and an ideal base for exploring the city.

**Central & Accessible Location**

Adjacent to the Financial Centre metro station, providing easy access across the city. Dubai Mall and Burj Khalifa are within walking distance. DIFC (Dubai International Financial Centre) is just across the road.

**Rooms & Suites**

302 spacious rooms and suites elegantly designed with subtle Asian influences. Many rooms offer direct Burj Khalifa views — an unforgettable experience, especially at night. Suites include separate living rooms, walk-in closets, and marble bathrooms.

**Culinary Experience**

- **Shang Palace** — Renowned Chinese restaurant, one of Dubai's best, serving traditional Cantonese cuisine and excellent dim sum
- **Dunes Café** — International restaurant with a rich and diverse buffet
- **Hoi An** — Authentic Vietnamese cuisine in a romantic setting
- **Lobby Lounge** — Traditional afternoon tea in British-Asian style

**CHI Spa**

Shangri-La's famous CHI Spa is an experience in itself. Ancient Asian-inspired treatments, couples treatment rooms, sauna, jacuzzi, and a stunning infinity pool with views of Dubai's skyline.

**Pool & Leisure**

The outdoor pool on the upper floor offers breathtaking views and a serene atmosphere. Also features an advanced gym, tennis court, and kids' club.

**Why EVE BLUE Recommends Shangri-La**

- Traditional Asian service at the highest level — warm, precise, and personal
- Unmatched Burj Khalifa views
- Shang Palace Chinese restaurant is worth a visit on its own
- Central location with metro access
- Quiet, elegant atmosphere in the heart of a bustling city

Contact us and we'll arrange room bookings, upgrades, and special additions.`,
      ar: 'شانغريلا دبي هو فندق فاخر كلاسيكي يجلب تقاليد الضيافة الآسيوية الشهيرة إلى قلب دبي.',
      fr: "Le Shangri-La Dubai est un hôtel de luxe classique qui apporte la tradition d'hospitalité asiatique au cœur de Dubaï.",
      ru: 'Shangri-La Dubai — классический роскошный отель, привносящий знаменитые азиатские традиции гостеприимства в самое сердце Дубая.',
    },
  },
  {
    id: 'sofitel-dubai-jumeirah-beach',
    image: blogSofitel,
    category: {
      he: 'מלונות מומלצים',
      en: 'Recommended Hotels',
      ar: 'فنادق موصى بها',
      fr: 'Hôtels recommandés',
      ru: 'Рекомендуемые отели',
    },
    title: {
      he: 'Sofitel Dubai Jumeirah Beach — אלגנטיות צרפתית על חוף הים',
      en: 'Sofitel Dubai Jumeirah Beach — French Elegance on the Beach',
      ar: 'سوفيتيل دبي جميرا بيتش — أناقة فرنسية على الشاطئ',
      fr: 'Sofitel Dubai Jumeirah Beach — L\'élégance française sur la plage',
      ru: 'Sofitel Dubai Jumeirah Beach — Французская элегантность на пляже',
    },
    excerpt: {
      he: 'מלון בוטיק יוקרתי בסגנון צרפתי, ממוקם ישירות על חוף ג\'ומיירה. שילוב מושלם של Art de Vivre צרפתי, חוף פרטי מדהים ומיקום מעולה ליד JBR.',
      en: 'A luxurious French-style boutique hotel directly on Jumeirah Beach. A perfect blend of French Art de Vivre, stunning private beach, and prime location near JBR.',
      ar: 'فندق بوتيك فاخر بطراز فرنسي على شاطئ جميرا مباشرةً.',
      fr: 'Un hôtel-boutique de luxe de style français directement sur la plage de Jumeirah.',
      ru: 'Роскошный бутик-отель во французском стиле прямо на пляже Джумейра.',
    },
    content: {
      he: `Sofitel Dubai Jumeirah Beach הוא מלון 5 כוכבים מרשים שמשלב את האלגנטיות הצרפתית המפורסמת עם מיקום חלומי על חוף הים. המלון ממוקם באזור JBR (Jumeirah Beach Residence) הפופולרי, עם גישה ישירה לחוף חול לבן ולטיילת The Walk.

**מיקום חלומי**

המלון פונה ישירות לים, עם חוף פרטי מטופח. ברחבי JBR תמצאו מסעדות, חנויות ובילויים ללא סוף. טרם דובאי מרינה וטיילת Marina Walk נמצאים במרחק הליכה קצר. הנוף מהמלון כולל את Ain Dubai (הגלגל הגדול ביותר בעולם) ואי Bluewaters.

**חדרים וסוויטות**

444 חדרים מרווחים ומעוצבים בסגנון צרפתי מודרני — ניחוח פריזאי עם טאצ' דובאיאני. כל חדר מציע מרפסת פרטית עם נוף לים או לעיר. המיטות של Sofitel MyBed מפורסמות בנוחות שלהן. חדרי הרחצה מצוידים במוצרי Hermès.

**מסעדות ובארים**

- **Plantation Brasserie** — מסעדה צרפתית קלאסית עם בופה עשיר ומפנק
- **A.O.C International Buffet** — בופה בינלאומי עם תחנות בישול חי
- **Infini Pool Lounge** — אוכל קל וקוקטיילים ליד הבריכה עם נוף לים
- **Café Macchiato** — בית קפה צרפתי אותנטי עם מאפים טריים ופטיסרי

**ספא SO SPA**

ספא SO SPA מציע חוויה צרפתית אותנטית עם טיפולי פנים וגוף בשיטות מתקדמות. חדרי טיפול מפנקים, סאונה, חמאם ובריכת מנוחה. המוצרים של הספא הם ממותגים צרפתיים מובילים.

**חוף ובריכה**

החוף הפרטי של Sofitel הוא אחד היפים ב-JBR — חול לבן, מים צלולים ושירות מושלם. הבריכה האינפיניטי בקומה העליונה מציעה נוף פנורמי מרהיב לים ולקו הרקיע.

**חדר כושר ופעילויות**

חדר כושר מאובזר היטב עם ציוד Technogym, שיעורי יוגה ופילאטיס. המלון מארגן גם פעילויות חוף כמו וולי, פדלבורד וקייאק.

**למה אנחנו ב-EVE BLUE אוהבים את Sofitel?**

- חוף פרטי מדהים — מהיפים בדובאי
- אווירה צרפתית אלגנטית שמרגישה כמו פריז על הים
- מיקום מושלם ב-JBR עם חיי לילה ובילויים מסביב
- מוצרי Hermès בחדרי הרחצה — פרט קטן שעושה הבדל גדול
- יחס אישי ושירות ברמה גבוהה

נשמח לעזור לכם להזמין חדר, לארגן ארוחת ערב רומנטית על החוף או כל חוויה אחרת.`,
      en: `Sofitel Dubai Jumeirah Beach is an impressive 5-star hotel blending renowned French elegance with a dreamy beachfront location. Situated in the popular JBR (Jumeirah Beach Residence) area, it offers direct access to white sandy beach and The Walk promenade.

**Dream Location**

The hotel faces the sea directly with a well-maintained private beach. JBR offers endless restaurants, shops, and entertainment. Dubai Marina and Marina Walk are within walking distance. Views include Ain Dubai (world's largest Ferris wheel) and Bluewaters Island.

**Rooms & Suites**

444 spacious rooms designed in modern French style — Parisian flair with a Dubai touch. Every room offers a private balcony with sea or city views. Sofitel's famous MyBed mattresses are renowned for comfort. Bathrooms feature Hermès amenities.

**Restaurants & Bars**

- **Plantation Brasserie** — Classic French restaurant with a rich buffet
- **A.O.C International Buffet** — International buffet with live cooking stations
- **Infini Pool Lounge** — Light bites and cocktails poolside with sea views
- **Café Macchiato** — Authentic French café with fresh pastries and pâtisserie

**SO SPA**

SO SPA offers an authentic French experience with advanced facial and body treatments. Luxurious treatment rooms, sauna, hammam, and relaxation pool. Products from leading French brands.

**Beach & Pool**

Sofitel's private beach is one of JBR's finest — white sand, crystal waters, impeccable service. The infinity pool on the upper floor offers panoramic sea and skyline views.

**Why EVE BLUE Loves Sofitel**

- Stunning private beach — one of Dubai's best
- Elegant French atmosphere that feels like Paris by the sea
- Perfect JBR location with nightlife and entertainment all around
- Hermès bathroom amenities — a small detail that makes a big difference
- Personal attention and high-level service

We'd love to help you book a room, arrange a romantic beachfront dinner, or any other experience.`,
      ar: 'سوفيتيل دبي جميرا بيتش هو فندق 5 نجوم مذهل يمزج بين الأناقة الفرنسية والموقع الشاطئي المثالي.',
      fr: "Le Sofitel Dubai Jumeirah Beach est un impressionnant hôtel 5 étoiles alliant l'élégance française à un emplacement de rêve en bord de mer.",
      ru: 'Sofitel Dubai Jumeirah Beach — впечатляющий 5-звёздочный отель, сочетающий французскую элегантность с идеальным расположением на берегу моря.',
    },
  },
  {
    id: 'park-hyatt-dubai',
    image: blogParkHyatt,
    category: {
      he: 'מלונות מומלצים',
      en: 'Recommended Hotels',
      ar: 'فنادق موصى بها',
      fr: 'Hôtels recommandés',
      ru: 'Рекомендуемые отели',
    },
    title: {
      he: 'Park Hyatt Dubai — ריזורט שקט ויוקרתי על גדות ה-Creek',
      en: 'Park Hyatt Dubai — A Serene Luxury Resort on Dubai Creek',
      ar: 'بارك حياة دبي — منتجع هادئ وفاخر على ضفاف الخور',
      fr: 'Park Hyatt Dubai — Un resort luxueux et serein sur le Dubai Creek',
      ru: 'Park Hyatt Dubai — Тихий роскошный курорт на берегу Дубайского залива',
    },
    excerpt: {
      he: 'אואזיס של שקט ויוקרה על גדות Dubai Creek, עם אדריכלות בהשראה ערבית-ים תיכונית, מרינה פרטית ושירות אישי ברמה שלא תמצאו במקום אחר.',
      en: 'An oasis of tranquility and luxury on the banks of Dubai Creek, with Moorish-Mediterranean architecture, a private marina, and personal service you won\'t find elsewhere.',
      ar: 'واحة من الهدوء والفخامة على ضفاف خور دبي.',
      fr: 'Une oasis de tranquillité et de luxe sur les rives du Dubai Creek.',
      ru: 'Оазис спокойствия и роскоши на берегу Дубайского залива.',
    },
    content: {
      he: `Park Hyatt Dubai הוא אחד המלונות המיוחדים ביותר בדובאי — מלון בוטיק יוקרתי שמציע חוויה אחרת לגמרי מהמלונות הגדולים והרועשים. ממוקם על גדות Dubai Creek, באזור ההיסטורי של העיר, המלון מציע אווירה של ריזורט שקט בלב מטרופולין תוסס.

**מיקום ייחודי**

בניגוד לרוב המלונות היוקרתיים בדובאי שממוקמים ב-Downtown או ב-JBR, Park Hyatt שוכן באזור Creek — האזור ההיסטורי והאותנטי של דובאי. המרינה הפרטית של המלון מציעה שקט ונופים יפהפיים. שדה הגולף Dubai Creek Golf & Yacht Club נמצא ממש לידו. חובבי תרבות ייהנו מהקרבה ל-Al Fahidi Historical District ולשוקים המסורתיים.

**אדריכלות ועיצוב**

העיצוב בהשראה מורית-ים תיכונית הוא ייחודי ומרהיב. קשתות אבן, חצרות פנימיות ירוקות, בריכות מים שקטות ושפע של אור טבעי. התחושה היא של ריזורט בוטיק במרוקו יותר מאשר מלון בדובאי.

**חדרים וסוויטות**

225 חדרים וסוויטות מרווחים, כולם מעוצבים בסגנון מינימליסטי-יוקרתי עם חומרים טבעיים. חדרי הרחצה מאבן גדולים במיוחד עם אמבטיות שקועות. המרפסות הפרטיות פונות ל-Creek או לגני המלון הירוקים.

**מסעדות ובארים**

- **Traiteur** — מסעדה צרפתית-ים תיכונית מעולה עם מטבח פתוח ואווירה אלגנטית
- **The Thai Kitchen** — מסעדה תאילנדית אותנטית עם שפים מתאילנד, אחת הטובות בדובאי
- **Noepe** — בר ומסעדה עם אווירה רומנטית על שפת ה-Creek
- **Brasserie du Park** — ארוחות בוקר מפורסמות ובופה עשיר

**ספא Amara**

הספא מציע חוויה הוליסטית עם טיפולים בהשראה ערבית ואסייתית. יש חמאם מרוקאי מסורתי, חדרי טיפול זוגיים ואזור מנוחה שקט. הבריכה הגדולה (25 מטר) מוקפת בגנים טרופיים ויוצרת תחושה של ריזורט.

**פעילויות**

- גולף במגרש הסמוך
- שייט ב-Creek על סירת אבנרה מסורתית
- סיורים בשוק הזהב ושוק התבלינים
- טיול רגלי באזור ההיסטורי Al Fahidi

**למה אנחנו ב-EVE BLUE ממליצים על Park Hyatt?**

- חוויה אחרת מכל מלון אחר בדובאי — אותנטית ושקטה
- אדריכלות מרהיבה שמרגישה כמו ריזורט בוטיק
- מסעדות ברמה גבוהה מאוד (Thai Kitchen הוא חובה!)
- מושלם לזוגות ולמי שמחפש רומנטיקה ושלווה
- קרבה לדובאי ההיסטורית — חוויה תרבותית אמיתית

פנו אלינו ונדאג לכל הפרטים — מההזמנה ועד ההעברות.`,
      en: `Park Hyatt Dubai is one of Dubai's most unique hotels — a luxury boutique hotel offering a completely different experience from the city's large, bustling properties. Located on the banks of Dubai Creek in the city's historic district, it offers a serene resort atmosphere in the heart of a vibrant metropolis.

**Unique Location**

Unlike most luxury Dubai hotels in Downtown or JBR, Park Hyatt sits in the Creek area — Dubai's historic and authentic district. The hotel's private marina offers tranquility and beautiful views. Dubai Creek Golf & Yacht Club is right next door. Culture lovers will appreciate the proximity to Al Fahidi Historical District and traditional souks.

**Architecture & Design**

The Moorish-Mediterranean inspired design is unique and stunning. Stone arches, green inner courtyards, quiet water features, and abundant natural light. The feeling is more Moroccan boutique resort than Dubai hotel.

**Rooms & Suites**

225 spacious rooms and suites, all designed in minimalist-luxury style with natural materials. Extra-large stone bathrooms with sunken bathtubs. Private balconies overlook the Creek or the hotel's lush gardens.

**Restaurants & Bars**

- **Traiteur** — Superb French-Mediterranean restaurant with open kitchen and elegant atmosphere
- **The Thai Kitchen** — Authentic Thai restaurant with chefs from Thailand, one of Dubai's best
- **Noepe** — Bar and restaurant with romantic Creek-side atmosphere
- **Brasserie du Park** — Famous breakfasts and rich buffet

**Amara Spa**

The spa offers a holistic experience with Arabian and Asian-inspired treatments. Features a traditional Moroccan hammam, couples treatment rooms, and quiet relaxation areas. The large pool (25m) surrounded by tropical gardens creates a resort feel.

**Why EVE BLUE Recommends Park Hyatt**

- A different experience from any other Dubai hotel — authentic and serene
- Stunning architecture that feels like a boutique resort
- High-quality restaurants (Thai Kitchen is a must!)
- Perfect for couples seeking romance and tranquility
- Close to historic Dubai — a genuine cultural experience

Reach out and we'll handle everything — from booking to transfers.`,
      ar: 'بارك حياة دبي هو أحد أكثر الفنادق تميزًا في دبي — فندق بوتيك فاخر يقدم تجربة مختلفة تمامًا.',
      fr: "Le Park Hyatt Dubai est l'un des hôtels les plus uniques de Dubaï — un hôtel-boutique de luxe offrant une expérience complètement différente.",
      ru: 'Park Hyatt Dubai — один из самых уникальных отелей Дубая, предлагающий совершенно иной опыт роскошного отдыха.',
    },
  },
  {
    id: 'rixos-premium-dubai-jbr',
    image: blogRixos,
    category: {
      he: 'מלונות מומלצים',
      en: 'Recommended Hotels',
      ar: 'فنادق موصى بها',
      fr: 'Hôtels recommandés',
      ru: 'Рекомендуемые отели',
    },
    title: {
      he: 'Rixos Premium Dubai JBR — הכל כלול ברמה הכי גבוהה',
      en: 'Rixos Premium Dubai JBR — Ultra All-Inclusive at Its Finest',
      ar: 'ريكسوس بريميوم دبي JBR — شامل كليًا بأعلى مستوى',
      fr: 'Rixos Premium Dubai JBR — Le tout-inclus ultra premium',
      ru: 'Rixos Premium Dubai JBR — Ультра всё включено на высшем уровне',
    },
    excerpt: {
      he: 'מלון הכל-כלול יוקרתי על חוף JBR עם בריכות אינפיניטי, מסעדות ללא הגבלה, מועדון חוף תוסס וחוף פרטי מושלם — הכל ברמת 5 כוכבים.',
      en: 'A luxury all-inclusive hotel on JBR beach with infinity pools, unlimited restaurants, a vibrant beach club, and a perfect private beach — all at 5-star level.',
      ar: 'فندق فاخر شامل كليًا على شاطئ JBR مع مسابح لا متناهية ومطاعم غير محدودة.',
      fr: 'Un hôtel tout-inclus de luxe sur la plage JBR avec piscines à débordement et restaurants illimités.',
      ru: 'Роскошный отель «всё включено» на пляже JBR с панорамными бассейнами и неограниченным количеством ресторанов.',
    },
    content: {
      he: `Rixos Premium Dubai JBR הוא אחד המלונות הפופולריים ביותר בדובאי — ובצדק. זהו מלון All-Inclusive יוקרתי שמציע חוויה שלמה: חוף פרטי, בריכות מדהימות, מסעדות ובארים ללא הגבלה, ומועדון חוף שפועל עד שעות הלילה המאוחרות.

**קונספט All-Inclusive יוקרתי**

הרעיון של Rixos פשוט אבל גאוני: אתם משלמים מחיר אחד ונהנים מהכל. כל המסעדות, כל הבארים, פעילויות חוף, חדר כושר, מועדון ילדים — הכל כלול. ולא מדובר ב-All-Inclusive רגיל — הכל ברמת 5 כוכבים אמיתית.

**מיקום על חוף JBR**

המלון ממוקם ישירות על חוף ה-JBR, אחד החופים הפופולריים ביותר בדובאי. הנוף מהמלון כולל את Ain Dubai ואי Bluewaters. טיילת The Walk עם חנויות ומסעדות נמצאת מול הדלת.

**חדרים וסוויטות**

חדרים מרווחים ומודרניים עם מרפסות פרטיות ונוף לים או לעיר. הסוויטות מציעות סלון נפרד, ג'קוזי פרטי ושירות VIP. כל החדרים מצוידים במיני-בר מלא (כלול!) ומתחדש יומית.

**מסעדות ובארים (הכל כלול!)**

- **Turquoise** — מסעדה ראשית בינלאומית עם בופה עשיר
- **L'Olivo** — מטבח איטלקי אותנטי עם פסטות ופיצות טריות
- **A La Turca** — מסעדה טורקית מסורתית עם קבבים ומנות עות'מאניות
- **Kinara** — מטבח הודי מפואר עם תפריט עשיר
- **Seven Heights** — בר גג עם נוף פנורמי וקוקטיילים יצירתיים
- **Black Pearl** — בר ומועדון שפועל עד שעות הלילה

**חוף ובריכות**

החוף הפרטי של Rixos מטופח להפליא, עם שירות מושלם, מיטות שיזוף נוחות ופעילויות מים מגוונות (הכל כלול!). שתי בריכות אינפיניטי — אחת למבוגרים בלבד ואחת משפחתית.

**Rixy Club (מועדון ילדים)**

מועדון הילדים של Rixos הוא אחד הטובים בדובאי. אנימטורים מקצועיים, פעילויות לכל הגילאים, מיני דיסקו בערב, ושטח משחקים ענק. ההורים נהנים בזמן שהילדים מבלים.

**ספא Anjana**

טיפולים מפנקים בהשראה טורקית ואסייתית. חמאם טורקי מסורתי, סאונה וחדרי טיפול זוגיים. הספא גם הוא כלול בחבילה!

**למה אנחנו ב-EVE BLUE ממליצים על Rixos Premium?**

- קונספט All-Inclusive יוקרתי — שקט נפשי מלא בלי חשבונות מפתיעים
- חוף פרטי מדהים עם שירות מושלם
- מגוון מסעדות שלא מצריך לצאת מהמלון
- מועדון ילדים מצוין — מושלם למשפחות
- אווירה חיה ותוססת עם מועדון חוף ובר גג
- תמורה מצוינת לכסף — כשמחשבים שהכל כלול

רוצים לשמוע עוד? פנו אלינו ונדאג להזמנה, העברות משדה התעופה ותוספות מיוחדות.`,
      en: `Rixos Premium Dubai JBR is one of Dubai's most popular hotels — and rightfully so. This luxury All-Inclusive hotel offers a complete experience: private beach, stunning pools, unlimited restaurants and bars, and a beach club that operates late into the night.

**Luxury All-Inclusive Concept**

Rixos's concept is simple but brilliant: you pay one price and enjoy everything. All restaurants, all bars, beach activities, gym, kids' club — everything included. And this isn't ordinary all-inclusive — everything is at genuine 5-star level.

**JBR Beach Location**

Located directly on JBR beach, one of Dubai's most popular beaches. Views include Ain Dubai and Bluewaters Island. The Walk promenade with shops and restaurants is right at the doorstep.

**Rooms & Suites**

Spacious, modern rooms with private balconies and sea or city views. Suites offer separate living rooms, private jacuzzis, and VIP service. All rooms have a full mini-bar (included!) replenished daily.

**Restaurants & Bars (All Included!)**

- **Turquoise** — Main international restaurant with a rich buffet
- **L'Olivo** — Authentic Italian cuisine with fresh pastas and pizzas
- **A La Turca** — Traditional Turkish restaurant with kebabs and Ottoman dishes
- **Kinara** — Grand Indian cuisine with an extensive menu
- **Seven Heights** — Rooftop bar with panoramic views and creative cocktails
- **Black Pearl** — Bar and club operating until late night

**Beach & Pools**

Rixos's private beach is immaculately maintained with perfect service, comfortable sun loungers, and various water activities (all included!). Two infinity pools — one adults-only and one family-friendly.

**Rixy Club (Kids' Club)**

Rixos's kids' club is one of Dubai's best. Professional animators, activities for all ages, mini disco in the evening, and a huge playground. Parents relax while kids have fun.

**Why EVE BLUE Recommends Rixos Premium**

- Luxury All-Inclusive concept — complete peace of mind with no surprise bills
- Stunning private beach with perfect service
- Diverse restaurants — no need to leave the hotel
- Excellent kids' club — perfect for families
- Vibrant atmosphere with beach club and rooftop bar
- Outstanding value — when you calculate that everything is included

Want to hear more? Contact us and we'll arrange booking, airport transfers, and special additions.`,
      ar: 'ريكسوس بريميوم دبي JBR هو أحد أكثر الفنادق شعبية في دبي — فندق فاخر شامل كليًا يقدم تجربة متكاملة.',
      fr: "Le Rixos Premium Dubai JBR est l'un des hôtels les plus populaires de Dubaï — un hôtel tout-inclus de luxe offrant une expérience complète.",
      ru: 'Rixos Premium Dubai JBR — один из самых популярных отелей Дубая, роскошный отель «всё включено», предлагающий полный спектр услуг.',
    },
  },
  {
    id: 'burj-khalifa-guide',
    image: blogBurjKhalifa,
    category: {
      he: 'אטרקציות מומלצות',
      en: 'Top Attractions',
      ar: 'معالم موصى بها',
      fr: 'Attractions incontournables',
      ru: 'Лучшие достопримечательности',
    },
    title: {
      he: 'ברג\' ח\'ליפה — המבנה הגבוה ביותר בעולם',
      en: 'Burj Khalifa — The World\'s Tallest Building',
      ar: 'برج خليفة — أطول مبنى في العالم',
      fr: 'Burj Khalifa — Le plus haut bâtiment du monde',
      ru: 'Бурдж-Халифа — Самое высокое здание в мире',
    },
    excerpt: {
      he: 'מתנשא לגובה 828 מטרים עם 163 קומות, ברג\' ח\'ליפה הוא הסמל של דובאי. תצפית מקומה 124 או 148, מזרקות מוזיקליות ומסעדות בשמיים.',
      en: 'Soaring 828 meters with 163 floors, Burj Khalifa is Dubai\'s ultimate icon. Observation decks, musical fountains, and sky-high dining.',
      ar: 'يرتفع 828 مترًا مع 163 طابقًا، برج خليفة هو رمز دبي الأبرز.',
      fr: 'Culminant à 828 mètres avec 163 étages, le Burj Khalifa est l\'icône ultime de Dubaï.',
      ru: 'Возвышаясь на 828 метров с 163 этажами, Бурдж-Халифа — главный символ Дубая.',
    },
    content: {
      he: `ברג' ח'ליפה (Burj Khalifa) הוא לא רק המבנה הגבוה ביותר בעולם — הוא סמל של שאפתנות, חדשנות וחזון. מתנשא לגובה מדהים של 828 מטרים עם 163 קומות, הוא שולט על קו הרקיע של דובאי ומהווה חובה לכל מי שמבקר בעיר.

**היסטוריה ובנייה**

הבנייה של ברג' ח'ליפה החלה בשנת 2004 והסתיימה בשנת 2010. יותר מ-12,000 פועלים עבדו על הפרויקט בו-זמנית. המגדל תוכנן על ידי חברת האדריכלות האמריקאית Skidmore, Owings & Merrill בהשראת פרח הספיידר לילי (Hymenocallis). המבנה מכיל למעלה מ-330,000 מ"ק של בטון ו-31,400 טון פלדה.

**תצפיות**

- **At The Top (קומה 124-125)** — תצפית פופולרית עם נוף פנורמי 360 מעלות על דובאי. כולל טלסקופים אינטראקטיביים ותצוגות מולטימדיה
- **At The Top SKY (קומה 148)** — החוויה האקסקלוסיבית. תצפית מהקומה הגבוהה ביותר הפתוחה לציבור בעולם, עם טרקלין פרטי, כיבוד ושירות אישי
- **הטיפ שלנו**: מומלץ להזמין כרטיסים לשעות השקיעה — הנוף פשוט עוצר נשימה כשהשמש שוקעת מעל המדבר והעיר נדלקת באורות

**מזרקת דובאי (Dubai Fountain)**

ממש למרגלות ברג' ח'ליפה שוכנת מזרקת דובאי — מופע המים הגדול ביותר בעולם. סילוני מים מגיעים לגובה של 150 מטרים, מלווים במוזיקה ותאורה דרמטית. המופעים מתקיימים כל ערב כל 30 דקות (18:00-23:00) וביום בשעות 13:00 ו-13:30. ניתן לצפות בחינם מהטיילת שמסביב, או להזמין סיור בסירת אבנרה על האגם.

**מסעדות בשמיים**

- **At.mosphere** — מסעדה וטרקלין בקומה 122 של ברג' ח'ליפה. ארוחות ברמה גבוהה עם נוף שאין דומה לו. חוויה קולינרית בלתי נשכחת
- **The Lounge** — טרקלין אלגנטי לתה אחר הצהריים וקוקטיילים בקומות הגבוהות

**מתחם Downtown Dubai**

ברג' ח'ליפה ממוקם בלב Downtown Dubai — האזור התוסס ביותר בעיר. מסביב תמצאו את Dubai Mall (הקניון הגדול ביותר בעולם), Dubai Opera, Souk Al Bahar ומגוון מסעדות ובתי קפה.

**עובדות מעניינות**

- מהירות המעליות: 10 מטרים לשנייה
- ניתן לראות את המגדל ממרחק של כ-95 ק"מ
- יש בו 57 מעליות ו-8 מעליות מדרגות
- הטמפרטורה בפסגה נמוכה בכ-6 מעלות מהרחוב
- במגדל יש מלון ארמאני, דירות מגורים, משרדים ותצפיות

**איך EVE BLUE עוזרת?**

- הזמנת כרטיסי כניסה לתצפית At The Top ו-SKY
- ארגון ארוחת ערב ב-At.mosphere
- שירות נהג VIP להגעה וחזרה
- שילוב הביקור עם אטרקציות נוספות ב-Downtown
- סיורים מודרכים פרטיים

פנו אלינו ב-EVE BLUE ונדאג שהחוויה תהיה מושלמת.`,
      en: `Burj Khalifa is not just the world's tallest building — it's a symbol of ambition, innovation, and vision. Soaring to an incredible 828 meters with 163 floors, it dominates Dubai's skyline and is a must-visit for every traveler.

**History & Construction**

Construction began in 2004 and was completed in 2010. Over 12,000 workers were employed simultaneously. Designed by American firm Skidmore, Owings & Merrill, inspired by the Spider Lily flower. The structure contains over 330,000 cubic meters of concrete and 31,400 tons of steel.

**Observation Decks**

- **At The Top (Floors 124-125)** — Popular observation deck with 360-degree panoramic views. Features interactive telescopes and multimedia displays
- **At The Top SKY (Floor 148)** — The exclusive experience. World's highest public observation deck with a private lounge, refreshments, and personal service
- **Our tip**: Book sunset time slots — the view is absolutely breathtaking as the sun sets over the desert and the city lights up

**Dubai Fountain**

At the foot of Burj Khalifa lies the Dubai Fountain — the world's largest choreographed fountain system. Water jets reach 150 meters high, accompanied by music and dramatic lighting. Shows run every evening every 30 minutes (6PM-11PM) and during the day at 1:00PM and 1:30PM. Watch for free from the surrounding promenade, or book an abra boat ride on the lake.

**Sky-High Dining**

- **At.mosphere** — Restaurant and lounge on the 122nd floor with unmatched views and fine dining
- **The Lounge** — Elegant lounge for afternoon tea and cocktails on the upper floors

**Downtown Dubai District**

Burj Khalifa sits in the heart of Downtown Dubai — the city's most vibrant area. Nearby you'll find Dubai Mall, Dubai Opera, Souk Al Bahar, and numerous restaurants and cafés.

**Fun Facts**

- Elevator speed: 10 meters per second
- Visible from approximately 95 km away
- Contains 57 elevators and 8 escalators
- Temperature at the top is about 6°C cooler than street level
- Houses Armani Hotel, residential apartments, offices, and observation decks

**How EVE BLUE Helps**

- Booking entry tickets for At The Top and SKY
- Arranging dinner at At.mosphere
- VIP driver service for arrival and return
- Combining the visit with other Downtown attractions
- Private guided tours

Contact EVE BLUE and we'll make the experience perfect.`,
      ar: 'برج خليفة ليس فقط أطول مبنى في العالم — إنه رمز للطموح والابتكار والرؤية.',
      fr: "Le Burj Khalifa n'est pas seulement le plus haut bâtiment du monde — c'est un symbole d'ambition, d'innovation et de vision.",
      ru: 'Бурдж-Халифа — это не просто самое высокое здание в мире, это символ амбиций, инноваций и видения.',
    },
  },
  {
    id: 'dubai-mall-guide',
    image: blogDubaiMall,
    category: {
      he: 'אטרקציות מומלצות',
      en: 'Top Attractions',
      ar: 'معالم موصى بها',
      fr: 'Attractions incontournables',
      ru: 'Лучшие достопримечательности',
    },
    title: {
      he: 'Dubai Mall — הקניון הגדול ביותר בעולם',
      en: 'Dubai Mall — The World\'s Largest Shopping Destination',
      ar: 'دبي مول — أكبر وجهة تسوق في العالم',
      fr: 'Dubai Mall — La plus grande destination shopping au monde',
      ru: 'Dubai Mall — Крупнейший торговый центр в мире',
    },
    excerpt: {
      he: 'יותר מ-1,200 חנויות, אקווריום ענק, משטח החלקה על קרח, מפל מים ואטרקציות לכל הגילאים — הכל תחת קורת גג אחת.',
      en: 'Over 1,200 stores, a giant aquarium, ice rink, waterfall, and attractions for all ages — all under one roof.',
      ar: 'أكثر من 1200 متجر وحوض سمك عملاق وحلبة تزلج ومعالم لجميع الأعمار.',
      fr: 'Plus de 1 200 boutiques, un aquarium géant, une patinoire et des attractions pour tous les âges.',
      ru: 'Более 1200 магазинов, гигантский аквариум, каток, водопад и развлечения для всех возрастов.',
    },
    content: {
      he: `Dubai Mall הוא הרבה יותר מקניון — זו עיר שלמה בפני עצמה. עם שטח כולל של למעלה מ-1.1 מיליון מ"ר, הוא הקניון הגדול ביותר בעולם ואחד המקומות המבוקרים ביותר על פני כדור הארץ, עם למעלה מ-80 מיליון מבקרים בשנה.

**קניות ברמה עולמית**

הקניון מכיל למעלה מ-1,200 חנויות, כולל כל מותג יוקרה שאפשר לחשוב עליו:
- **Fashion Avenue** — האזור היוקרתי ביותר עם מותגים כמו Louis Vuitton, Chanel, Dior, Gucci, Prada, Hermès ורבים אחרים
- **Gold Souk** — שוק זהב מודרני עם עשרות חנויות תכשיטים
- **Electronics** — מגוון ענק של חנויות אלקטרוניקה כולל Apple Store ענק
- **Level Kids** — קומה שלמה המוקדשת לילדים עם מותגי אופנה, צעצועים וחנויות ייחודיות

**אטרקציות ייחודיות**

- **Dubai Aquarium & Underwater Zoo** — אקווריום ענק עם מנהרת זכוכית של 48 מטר. כרישים, קרניים וצבי ים. אפשר גם לצלול עם כרישים או לעשות סיור בסירת תחתית שקופה
- **Dubai Ice Rink** — משטח החלקה על קרח בגודל אולימפי. מושלם לשעה של כיף, גם כשבחוץ 40 מעלות
- **VR Park** — פארק מציאות מדומה עם עשרות חוויות אינטראקטיביות
- **KidZania** — עיר מיניאטורית שבה ילדים יכולים "לעבוד" במקצועות שונים
- **Dubai Dino** — שלד דינוזאור אמיתי בן 155 מיליון שנה המוצג בכניסה הראשית

**מפל Dubai Mall**

מפל הסלע המרשים בגובה 4 קומות (24 מטר) הוא אחד מנקודות הציון האייקוניות של הקניון. פסלי צוללנים אנושיים נופלים לצד המים — חובה לצלם!

**אוכל ומסעדות**

הקניון מציע מאות מסעדות ובתי קפה:
- **אזור המסעדות הראשי** — קומה שלמה עם מגוון מטבחים מכל העולם
- **מסעדות יוקרה** — כולל סניפים של מסעדות מישלן
- **Souk Al Bahar** — קניון סמוך עם מסעדות ונוף למזרקת דובאי
- **בתי קפה ומאפיות** — מ-Starbucks Reserve ועד מאפיות בוטיק מקומיות

**מזרקת דובאי**

היציאה מהקניון לטיילת מזרקת דובאי היא חוויה בפני עצמה. כל ערב, מופעי המזרקות המוזיקליות מרהיבים את העין עם סילוני מים, אורות ומוזיקה.

**שעות פתיחה**

הקניון פתוח כל יום, כולל שישי ושבת. בימי חול בדרך כלל 10:00-00:00, ובסופי שבוע עד 01:00.

**טיפים חשובים**

- הקניון ענק — תכננו מראש אילו אזורים אתם רוצים לבקר
- הורידו את אפליקציית Dubai Mall לניווט
- בחודשי הקיץ הקניון עמוס יותר (כולם בורחים מהחום!)
- חניה חינמית לשעות הראשונות
- השתמשו במפה לאתר חנויות ספציפיות

**איך EVE BLUE עוזרת?**

- ארגון יום קניות VIP עם סטייליסט אישי
- הזמנת כרטיסים לאטרקציות (אקווריום, VR Park, KidZania)
- שירות נהג VIP להגעה וחזרה
- המלצות למסעדות ושריון מקומות
- שילוב עם ביקור בברג' ח'ליפה ומזרקת דובאי

דברו איתנו ונתכנן לכם יום מושלם ב-Dubai Mall.`,
      en: `Dubai Mall is far more than a shopping center — it's an entire city unto itself. With a total area exceeding 1.1 million square meters, it's the world's largest mall and one of the most visited places on Earth, attracting over 80 million visitors annually.

**World-Class Shopping**

The mall houses over 1,200 stores, including every luxury brand imaginable:
- **Fashion Avenue** — The most exclusive area with Louis Vuitton, Chanel, Dior, Gucci, Prada, Hermès, and more
- **Gold Souk** — A modern gold market with dozens of jewelry stores
- **Electronics** — Vast selection including a massive Apple Store
- **Level Kids** — An entire floor dedicated to children's fashion, toys, and unique stores

**Unique Attractions**

- **Dubai Aquarium & Underwater Zoo** — Massive aquarium with a 48-meter glass tunnel. Sharks, rays, and sea turtles. Options for shark diving or glass-bottom boat tours
- **Dubai Ice Rink** — Olympic-sized ice skating rink. Perfect fun even when it's 40°C outside
- **VR Park** — Virtual reality park with dozens of interactive experiences
- **KidZania** — Miniature city where kids can "work" different jobs
- **Dubai Dino** — A real 155-million-year-old dinosaur skeleton displayed at the main entrance

**The Waterfall**

The impressive 4-story (24-meter) rock waterfall with human diver sculptures is one of the mall's iconic landmarks — a must-photograph!

**Dining**

Hundreds of restaurants and cafés across the mall, from luxury dining to international food courts, Souk Al Bahar with fountain views, and boutique local bakeries.

**Dubai Fountain**

Stepping out to the Dubai Fountain promenade is an experience in itself. Nightly musical fountain shows with water jets, lights, and music.

**Tips**

- The mall is enormous — plan which areas you want to visit
- Download the Dubai Mall app for navigation
- Summer months are busier (everyone escapes the heat!)
- Free parking for first hours

**How EVE BLUE Helps**

- Organizing VIP shopping days with personal stylists
- Booking attraction tickets (Aquarium, VR Park, KidZania)
- VIP driver service
- Restaurant recommendations and reservations
- Combining with Burj Khalifa and Dubai Fountain visits

Talk to us and we'll plan your perfect Dubai Mall day.`,
      ar: 'دبي مول هو أكثر بكثير من مجرد مركز تسوق — إنه مدينة كاملة بحد ذاتها.',
      fr: "Le Dubai Mall est bien plus qu'un centre commercial — c'est une véritable ville à lui seul.",
      ru: 'Dubai Mall — это гораздо больше, чем торговый центр, это целый город.',
    },
  },
  {
    id: 'desert-safari-dubai',
    image: blogDesertSafari,
    category: {
      he: 'אטרקציות מומלצות',
      en: 'Top Attractions',
      ar: 'معالم موصى بها',
      fr: 'Attractions incontournables',
      ru: 'Лучшие достопримечательности',
    },
    title: {
      he: 'ספארי מדבר בדובאי — הרפתקה בין הדיונות',
      en: 'Desert Safari Dubai — An Adventure Among the Dunes',
      ar: 'سفاري الصحراء في دبي — مغامرة بين الكثبان',
      fr: 'Safari dans le désert de Dubaï — Aventure parmi les dunes',
      ru: 'Сафари в пустыне Дубая — Приключение среди дюн',
    },
    excerpt: {
      he: 'חוויית מדבר אותנטית: נסיעת שטח מרגשת בדיונות, רכיבה על גמלים, סנדבורדינג, ארוחת ערב בדואית ומופעי ריקוד מסורתיים תחת כיפת השמיים.',
      en: 'An authentic desert experience: thrilling dune bashing, camel riding, sandboarding, Bedouin dinner, and traditional dance performances under the stars.',
      ar: 'تجربة صحراوية أصيلة: قيادة مثيرة على الكثبان وركوب الجمال وعشاء بدوي.',
      fr: 'Une expérience désertique authentique : dune bashing, balade en chameau, dîner bédouin.',
      ru: 'Аутентичный опыт пустыни: захватывающая езда по дюнам, катание на верблюдах, бедуинский ужин.',
    },
    content: {
      he: `ספארי מדבר הוא אחת החוויות הייחודיות ביותר שדובאי מציעה — ואחת הפופולריות ביותר בקרב תיירים מכל העולם. תוך נסיעה קצרה מהעיר, אתם מוצאים את עצמכם בלב המדבר הערבי, עם דיונות חול זהובות משתרעות עד האופק.

**מה כולל ספארי מדבר?**

חוויית ספארי מדבר טיפוסית כוללת מגוון פעילויות מרגשות:

**Dune Bashing (נסיעת שטח בדיונות)**

זוהי ללא ספק ההיילייט של הספארי. נהג מקצועי ומנוסה נוהג ברכב 4x4 (בדרך כלל Toyota Land Cruiser) במהירות על פני הדיונות — עולה ויורד בזוויות מטורפות. זו חוויה אדרנלינית ומרגשת שמתאימה לכל הגילאים (למעט תינוקות ונשים בהריון).

**רכיבה על גמלים**

חוויה מסורתית ואותנטית. הגמלים עדינים ומאולפים, והרכיבה מציעה נקודת מבט ייחודית על המדבר. מושלם לצילומים ולחוויה תרבותית.

**סנדבורדינג**

כמו סנובורד — אבל על חול! גולשים במורד הדיונות על לוח. פעילות כיפית שמתאימה גם למתחילים.

**מחנה בדואי מסורתי**

בסיום הפעילויות, מגיעים למחנה בדואי מסורתי במדבר:
- **ארוחת ערב** — בופה עשיר עם מנות ערביות מסורתיות: חומוס, פיתות טריות, שווארמה, קבב, סלטים ועוד
- **שישה (נרגילה)** — עישון נרגילה מסורתי באווירה רגועה
- **חינה (Henna)** — ציורי חינה מסורתיים על הידיים — בחינם!
- **תלבושות מסורתיות** — אפשרות ללבוש בגדים ערביים מסורתיים ולהצטלם
- **צפייה בכוכבים** — המדבר מציע שמיים נקיים מדהימים בלילה

**מופעים**

- **ריקוד בטן** — מופע ריקוד מרהיב
- **ריקוד טנורה** — ריקוד מסורתי עם חצאיות מסתובבות צבעוניות — מהפנט!
- **מופע אש** — להטוטנות אש מרשימה

**סוגי ספארי**

- **ספארי אחר הצהריים/ערב** — הפופולרי ביותר. יוצאים בסביבות 15:00-16:00, חוזרים ב-21:00-22:00
- **ספארי בוקר** — נסיעת שטח בדיונות ללא ארוחת ערב, מתאים למי שרוצה פעילות קצרה
- **ספארי לילה** — ארוחת ערב ומופעים במדבר ללא Dune Bashing
- **ספארי VIP/פרטי** — חוויה אקסקלוסיבית עם רכב פרטי, שולחן VIP וכיבוד מיוחד

**טיפים חשובים**

- לבשו בגדים נוחים וסגורים (חול נכנס לכל מקום!)
- קחו מצלמה — השקיעות במדבר מטורפות
- מומלץ להימנע מאכילה כבדה לפני ה-Dune Bashing
- קחו מים — למרות שמספקים, תמיד טוב שיהיה
- מומלץ בחודשי החורף (נובמבר-מרץ) כשמזג האוויר נעים

**איך EVE BLUE עוזרת?**

- ארגון ספארי VIP פרטי עם איסוף מהמלון
- בחירת הספארי המתאים לכם (משפחות, זוגות, קבוצות)
- תוספות מיוחדות: טיסת בלון כדור פורח, רכיבה על סוסים, Quad Biking
- שילוב עם אטרקציות נוספות ביום הספארי

דברו איתנו ונדאג לחוויה מדברית בלתי נשכחת.`,
      en: `Desert safari is one of the most unique experiences Dubai offers — and one of the most popular among tourists worldwide. A short drive from the city, you find yourself in the heart of the Arabian desert, with golden sand dunes stretching to the horizon.

**What Does a Desert Safari Include?**

A typical desert safari offers a variety of thrilling activities:

**Dune Bashing**

The undisputed highlight. A professional driver navigates a 4x4 (usually Toyota Land Cruiser) at speed across the dunes — climbing and descending at extreme angles. An adrenaline-pumping experience suitable for all ages (except infants and pregnant women).

**Camel Riding**

A traditional, authentic experience. The camels are gentle and trained, offering a unique perspective of the desert. Perfect for photos and cultural immersion.

**Sandboarding**

Like snowboarding — but on sand! Slide down dunes on a board. Fun activity suitable for beginners too.

**Traditional Bedouin Camp**

After activities, arrive at a traditional Bedouin camp:
- **Dinner** — Rich buffet with traditional Arabian dishes: hummus, fresh pita, shawarma, kebabs, salads
- **Shisha** — Traditional hookah smoking in a relaxed atmosphere
- **Henna** — Traditional henna art on hands — free!
- **Traditional costumes** — Option to wear traditional Arabian clothing for photos
- **Stargazing** — The desert offers incredibly clear night skies

**Performances**

- **Belly dance** — Stunning dance performance
- **Tanoura dance** — Traditional spinning skirt dance — mesmerizing!
- **Fire show** — Impressive fire juggling

**Types of Safari**

- **Afternoon/Evening** — Most popular. Depart around 3-4PM, return 9-10PM
- **Morning** — Dune bashing without dinner, for those wanting a shorter activity
- **Overnight** — Dinner and shows without dune bashing
- **VIP/Private** — Exclusive experience with private vehicle, VIP seating, special refreshments

**Important Tips**

- Wear comfortable, closed clothing (sand gets everywhere!)
- Bring a camera — desert sunsets are incredible
- Avoid heavy eating before dune bashing
- Bring water — always good to have extra
- Best during winter months (November-March) when weather is pleasant

**How EVE BLUE Helps**

- Arranging private VIP safari with hotel pickup
- Choosing the right safari for you (families, couples, groups)
- Special additions: hot air balloon rides, horseback riding, quad biking
- Combining with other attractions on safari day

Talk to us and we'll ensure an unforgettable desert experience.`,
      ar: 'سفاري الصحراء هي واحدة من أكثر التجارب فرادة التي تقدمها دبي.',
      fr: "Le safari dans le désert est l'une des expériences les plus uniques que Dubaï offre.",
      ru: 'Сафари в пустыне — одно из самых уникальных впечатлений, которые предлагает Дубай.',
    },
  },
  {
    id: 'palm-jumeirah-atlantis',
    image: blogPalmAtlantis,
    category: {
      he: 'אטרקציות מומלצות',
      en: 'Top Attractions',
      ar: 'معالم موصى بها',
      fr: 'Attractions incontournables',
      ru: 'Лучшие достопримечательности',
    },
    title: {
      he: 'Palm Jumeirah & Atlantis — האי המלאכותי המפורסם בעולם',
      en: 'Palm Jumeirah & Atlantis — The World\'s Most Famous Man-Made Island',
      ar: 'نخلة جميرا وأتلانتس — أشهر جزيرة اصطناعية في العالم',
      fr: 'Palm Jumeirah & Atlantis — L\'île artificielle la plus célèbre au monde',
      ru: 'Палм-Джумейра и Атлантис — Самый знаменитый рукотворный остров в мире',
    },
    excerpt: {
      he: 'האי בצורת דקל שניתן לראות מהחלל, עם מלונות אייקוניים, פארק מים ענק, חופים מרהיבים ומסעדות בינלאומיות ברמה הגבוהה ביותר.',
      en: 'The palm-shaped island visible from space, with iconic hotels, a massive waterpark, stunning beaches, and world-class international restaurants.',
      ar: 'الجزيرة على شكل نخلة المرئية من الفضاء مع فنادق أيقونية وحديقة مائية ضخمة.',
      fr: "L'île en forme de palmier visible depuis l'espace, avec des hôtels emblématiques et un parc aquatique géant.",
      ru: 'Остров в форме пальмы, видимый из космоса, с культовыми отелями и огромным аквапарком.',
    },
    content: {
      he: `Palm Jumeirah הוא אחד הפרויקטים ההנדסיים המרהיבים ביותר שנבנו אי פעם — אי מלאכותי בצורת דקל שנראה מהחלל. הוא הפך לסמל של דובאי ולאחד היעדים התיירותיים הפופולריים ביותר בעולם.

**על האי**

Palm Jumeirah נבנה באמצעות חול ים שנחפר מתחתית המפרץ הפרסי. הוא כולל "גזע" מרכזי, 16 "עלים" (Fronds) ו"סהר" חיצוני (Crescent). על האי יש מלונות יוקרה, וילות פרטיות, דירות, מסעדות, חופים ומרכזי בילוי.

**Atlantis, The Palm**

מלון הדגל של האי, Atlantis, הוא אייקון בפני עצמו:
- **Aquaventure Waterpark** — פארק המים הגדול ביותר במזרח התיכון ואחד הגדולים בעולם. מגלשות ענק (כולל Leap of Faith — מגלשה כמעט אנכית!), נהר עצל, חוף פרטי ואזורי ילדים
- **The Lost Chambers Aquarium** — אקווריום מרהיב בהשראת העיר האבודה אטלנטיס. מנהרות זכוכית, 65,000 יצורי ים וחוויה אינטראקטיבית
- **Dolphin Bay** — שחייה עם דולפינים בסביבה מבוקרת ובטוחה
- **Sea Lion Point** — מפגש עם אריות ים

**Atlantis The Royal**

מלון היוקרה החדש שנפתח ב-2023 הוא הדבר הבא:
- עיצוב ארכיטקטוני עתידני עם בריכות אינפיניטי מרחפות
- מסעדות של שפים מפורסמים: Nobu, Heston Blumenthal, José Andrés
- מועדון חוף Cloud 22
- ספא ESPA מפואר

**חופים**

Palm Jumeirah מציע חופים מהיפים ביותר בדובאי:
- **חוף Atlantis** — חוף פרטי לאורחי המלון
- **West Beach** — חוף ציבורי פופולרי עם נוף למגדלי Dubai Marina
- **חופי מלונות** — רבים מהמלונות מציעים יום חוף (Day Pass) לא-אורחים

**מסעדות**

- **Nobu** — המסעדה היפנית המפורסמת של השף Nobu Matsuhisa
- **Ossiano** — חוויית אוכל מתחת למים (!) עם נוף לאקווריום
- **Bread Street Kitchen** — של השף Gordon Ramsay
- **STAY by Yannick Alléno** — מטבח צרפתי ברמה גבוהה

**המונורייל**

המונורייל של Palm Jumeirah מחבר את שער האי ל-Atlantis. הנסיעה מציעה נוף מרהיב לאי מלמעלה ולמגדלי Dubai Marina. זוהי דרך נוחה ומהנה להגיע ל-Atlantis.

**פעילויות על האי**

- סיור בסירה מהירה סביב האי
- סקיי דייבינג מעל Palm Jumeirah (Skydive Dubai)
- שייט על יאכטה עם עצירה ליד האי
- טיסת הליקופטר לנוף אווירי מדהים
- ג'ט סקי וספורט ימי

**טיפים**

- מומלץ להקדיש יום שלם ל-Atlantis ופארק המים
- בסופי שבוע האטרקציות עמוסות יותר
- הזמינו כרטיסים לאטרקציות מראש
- שלבו ביקור ב-Palm עם ארוחת ערב באחת המסעדות

**איך EVE BLUE עוזרת?**

- הזמנת כרטיסים ל-Aquaventure ו-Lost Chambers
- ארגון יום חוף VIP
- הזמנת מסעדות (Nobu, Ossiano ועוד)
- שילוב עם שייט יאכטה פרטי סביב Palm
- שירות נהג VIP

דברו איתנו ונתכנן לכם יום מושלם ב-Palm Jumeirah.`,
      en: `Palm Jumeirah is one of the most spectacular engineering projects ever built — a man-made island shaped like a palm tree, visible from space. It has become a symbol of Dubai and one of the world's most popular tourist destinations.

**About the Island**

Palm Jumeirah was built using sand dredged from the Persian Gulf seabed. It comprises a central "trunk," 16 "fronds," and an outer "crescent." The island hosts luxury hotels, private villas, apartments, restaurants, beaches, and entertainment centers.

**Atlantis, The Palm**

The island's flagship hotel, Atlantis, is an icon in itself:
- **Aquaventure Waterpark** — The Middle East's largest waterpark. Giant slides (including the near-vertical Leap of Faith!), lazy river, private beach, and kids' zones
- **The Lost Chambers Aquarium** — Stunning aquarium inspired by the lost city of Atlantis. Glass tunnels, 65,000 marine creatures, interactive experience
- **Dolphin Bay** — Swim with dolphins in a controlled, safe environment
- **Sea Lion Point** — Meet sea lions up close

**Atlantis The Royal**

The new luxury hotel opened in 2023 is next-level:
- Futuristic architectural design with floating infinity pools
- Celebrity chef restaurants: Nobu, Heston Blumenthal, José Andrés
- Cloud 22 beach club
- Luxurious ESPA spa

**Beaches**

Palm Jumeirah offers some of Dubai's finest beaches:
- **Atlantis Beach** — Private beach for hotel guests
- **West Beach** — Popular public beach with Dubai Marina skyline views
- **Hotel beaches** — Many hotels offer Day Passes for non-guests

**Restaurants**

- **Nobu** — Chef Nobu Matsuhisa's famous Japanese restaurant
- **Ossiano** — Underwater dining experience (!) with aquarium views
- **Bread Street Kitchen** — Chef Gordon Ramsay's restaurant
- **STAY by Yannick Alléno** — High-end French cuisine

**The Monorail**

Palm Jumeirah's monorail connects the island's gateway to Atlantis, offering stunning aerial views of the island and Dubai Marina towers.

**Activities**

- Speed boat tours around the island
- Skydiving over Palm Jumeirah (Skydive Dubai)
- Private yacht cruise with Palm stop
- Helicopter tours for aerial views
- Jet skiing and water sports

**How EVE BLUE Helps**

- Booking Aquaventure and Lost Chambers tickets
- Organizing VIP beach days
- Restaurant reservations (Nobu, Ossiano, and more)
- Combining with private yacht cruise around Palm
- VIP driver service

Talk to us and we'll plan your perfect Palm Jumeirah day.`,
      ar: 'نخلة جميرا هي واحدة من أروع المشاريع الهندسية التي بُنيت على الإطلاق.',
      fr: "Palm Jumeirah est l'un des projets d'ingénierie les plus spectaculaires jamais construits.",
      ru: 'Палм-Джумейра — один из самых впечатляющих инженерных проектов, когда-либо построенных.',
    },
  },
  {
    id: 'ain-dubai-guide',
    image: blogAinDubai,
    category: {
      he: 'אטרקציות מומלצות',
      en: 'Top Attractions',
      ar: 'معالم موصى بها',
      fr: 'Attractions incontournables',
      ru: 'Лучшие достопримечательности',
    },
    title: {
      he: 'Ain Dubai — גלגל התצפית הגדול ביותר בעולם',
      en: 'Ain Dubai — The World\'s Largest Observation Wheel',
      ar: 'عين دبي — أكبر عجلة مراقبة في العالم',
      fr: 'Ain Dubai — La plus grande roue d\'observation au monde',
      ru: 'Ain Dubai — Самое большое колесо обозрения в мире',
    },
    excerpt: {
      he: 'מתנשא לגובה 250 מטרים על אי Bluewaters, Ain Dubai מציע נוף פנורמי עוצר נשימה לקו החוף של דובאי, Palm Jumeirah ו-Dubai Marina.',
      en: 'Rising 250 meters on Bluewaters Island, Ain Dubai offers breathtaking panoramic views of Dubai\'s coastline, Palm Jumeirah, and Dubai Marina.',
      ar: 'يرتفع 250 مترًا على جزيرة بلووترز، يوفر عين دبي إطلالات بانورامية خلابة.',
      fr: "S'élevant à 250 mètres sur l'île de Bluewaters, Ain Dubai offre des vues panoramiques à couper le souffle.",
      ru: 'Возвышаясь на 250 метров на острове Bluewaters, Ain Dubai предлагает захватывающие панорамные виды.',
    },
    content: {
      he: `Ain Dubai (עין דובאי) הוא גלגל התצפית הגדול ביותר בעולם, מתנשא לגובה מרשים של 250 מטרים — כמעט פי שניים מ-London Eye. ממוקם על אי Bluewaters מול חוף JBR, הוא מציע חוויה ויזואלית בלתי נשכחת.

**על הגלגל**

Ain Dubai נבנה על ידי חברת Meraas ונפתח לציבור ב-2021. הגלגל מכיל 48 קפסולות (תאי תצפית) שכל אחת מהן יכולה להכיל עד 40 אנשים. סיבוב מלא אורך כ-38 דקות, במהלכן אתם מקבלים נוף 360 מעלות על דובאי.

**מה רואים מלמעלה?**

הנוף מ-Ain Dubai הוא עוצר נשימה:
- **Palm Jumeirah** — האי המלאכותי בצורת דקל נראה בשלמותו
- **Dubai Marina** — מגדלי היוקרה המרהיבים
- **JBR Beach** — קו החוף הארוך והתוסס
- **Burj Al Arab** — מלון המפרש האייקוני
- **קו הרקיע של דובאי** — כולל ברג' ח'ליפה במרחק

**סוגי חוויות**

- **Observation Cabin** — קפסולת תצפית סטנדרטית עם מושבים נוחים ומסכי מידע אינטראקטיביים
- **Social Cabin** — קפסולה חברתית עם שולחנות ובר — מושלם לחגיגות ואירועים קטנים
- **Private Cabin** — קפסולה פרטית לחלוטין לאירועים מיוחדים, הצעות נישואין או חגיגות אינטימיות

**אי Bluewaters**

Ain Dubai ממוקם על אי Bluewaters — אי מלאכותי קטן ומקסים עם:
- מסעדות ובתי קפה מגוונים
- חנויות ובוטיקים
- מלון Caesars Palace (הראשון מחוץ ללאס וגאס!)
- חוף Cove Beach — מועדון חוף פופולרי
- טיילת עם נוף לים ול-JBR

**תאורה ומופעים**

בלילה, Ain Dubai הופך למופע אורות מרהיב. מאות אלפי נורות LED מאירות את הגלגל בצבעים משתנים, ולעיתים מוצגות אנימציות ומסרים מיוחדים. הנוף מ-JBR Beach על Ain Dubai מואר בלילה הוא אחד המראות היפים ביותר בדובאי.

**מתי כדאי לבוא?**

- **שקיעה** — הזמן הכי מומלץ! רואים את השמש שוקעת מעל הים ואת העיר נדלקת באורות
- **לילה** — נוף עירוני מואר מרהיב
- **בוקר** — פחות עמוס ונוף צלול
- **סופי שבוע** — עמוס יותר, עדיף ימי חול

**גישה**

- ניתן להגיע ברגל מ-JBR דרך גשר להולכי רגל
- חניה זמינה באי Bluewaters
- שירות מונית/נסיעה שיתופית
- קו טרם ייעודי

**טיפים**

- הזמינו כרטיסים מראש, במיוחד לשקיעה
- קחו מצלמה — הנוף שווה כל רגע
- שלבו ביקור עם ארוחה באחת המסעדות על האי
- בחורף מזג האוויר נעים יותר לחוויה על הגלגל

**איך EVE BLUE עוזרת?**

- הזמנת כרטיסים לקפסולה סטנדרטית או פרטית
- ארגון חגיגה מיוחדת על הגלגל (יום הולדת, הצעת נישואין)
- שירות נהג VIP לאי Bluewaters
- שילוב עם ארוחת ערב ומופע מזרקת דובאי
- תכנון ערב שלם: Ain Dubai + ארוחה + שייט

פנו אלינו ב-EVE BLUE ונדאג שהחוויה תהיה מושלמת.`,
      en: `Ain Dubai is the world's largest observation wheel, rising an impressive 250 meters — nearly twice the height of the London Eye. Located on Bluewaters Island facing JBR beach, it offers an unforgettable visual experience.

**About the Wheel**

Built by Meraas and opened to the public in 2021, Ain Dubai contains 48 capsules (observation pods), each holding up to 40 people. A full rotation takes approximately 38 minutes, during which you get 360-degree views of Dubai.

**What You See from the Top**

The views from Ain Dubai are breathtaking:
- **Palm Jumeirah** — The palm-shaped island in its entirety
- **Dubai Marina** — Stunning luxury towers
- **JBR Beach** — The long, vibrant coastline
- **Burj Al Arab** — The iconic sail-shaped hotel
- **Dubai's skyline** — Including Burj Khalifa in the distance

**Experience Types**

- **Observation Cabin** — Standard pod with comfortable seating and interactive info screens
- **Social Cabin** — Social pod with tables and bar — perfect for celebrations and small events
- **Private Cabin** — Fully private pod for special occasions, proposals, or intimate celebrations

**Bluewaters Island**

Ain Dubai sits on Bluewaters Island — a charming small man-made island featuring:
- Diverse restaurants and cafés
- Shops and boutiques
- Caesars Palace hotel (first outside Las Vegas!)
- Cove Beach — popular beach club
- Promenade with sea and JBR views

**Night Illumination**

At night, Ain Dubai transforms into a spectacular light show. Hundreds of thousands of LED lights illuminate the wheel in changing colors, sometimes displaying animations and special messages.

**Best Times to Visit**

- **Sunset** — Most recommended! Watch the sun set over the sea as the city lights up
- **Night** — Stunning illuminated cityscape views
- **Morning** — Less crowded with clear views
- **Weekdays** — Less busy than weekends

**How EVE BLUE Helps**

- Booking standard or private cabin tickets
- Organizing special celebrations on the wheel (birthdays, proposals)
- VIP driver service to Bluewaters Island
- Combining with dinner and Dubai Fountain show
- Planning a full evening: Ain Dubai + dinner + cruise

Contact EVE BLUE and we'll make the experience perfect.`,
      ar: 'عين دبي هي أكبر عجلة مراقبة في العالم، ترتفع إلى ارتفاع مذهل يبلغ 250 مترًا.',
      fr: "Ain Dubai est la plus grande roue d'observation au monde, s'élevant à une hauteur impressionnante de 250 mètres.",
      ru: 'Ain Dubai — самое большое колесо обозрения в мире, возвышающееся на впечатляющие 250 метров.',
    },
  },
  {
    id: 'atlantis-the-royal',
    image: blogAtlantisRoyal,
    category: {
      he: 'מלונות מומלצים',
      en: 'Recommended Hotels',
      ar: 'فنادق موصى بها',
      fr: 'Hôtels recommandés',
      ru: 'Рекомендуемые отели',
    },
    title: {
      he: 'Atlantis The Royal — היהלום החדש של דובאי',
      en: 'Atlantis The Royal — Dubai\'s Newest Crown Jewel',
      ar: 'أتلانتس ذا رويال — جوهرة دبي الجديدة',
      fr: 'Atlantis The Royal — Le nouveau joyau de Dubaï',
      ru: 'Atlantis The Royal — Новая жемчужина Дубая',
    },
    excerpt: {
      he: 'המלון היוקרתי והמודרני ביותר בדובאי, עם סוויטות עם בריכות פרטיות, מסעדות שף עולמיות ועיצוב ארכיטקטוני מהפכני.',
      en: 'Dubai\'s most luxurious modern hotel with private pool suites, world-class chef restaurants and revolutionary architecture.',
      ar: 'أفخم فندق حديث في دبي مع أجنحة بمسابح خاصة ومطاعم شيف عالمية.',
      fr: 'L\'hôtel moderne le plus luxueux de Dubaï avec des suites à piscine privée.',
      ru: 'Самый роскошный современный отель Дубая с номерами с частными бассейнами.',
    },
    content: {
      he: `Atlantis The Royal הוא המלון החדש והיוקרתי ביותר בדובאי, שנפתח ב-2023 על חוף Palm Jumeirah. עם עיצוב ארכיטקטוני פורץ דרך שנראה כמו מגדלי לגו ענקיים, המלון הפך מיד לאייקון של העיר.

**מיקום מושלם**

המלון ממוקם בקצה Palm Jumeirah, עם נוף פנורמי לקו החוף של דובאי ולמפרץ הפרסי. הגישה נוחה — 25 דקות משדה התעופה ו-20 דקות מ-Dubai Mall.

**חדרים וסוויטות**

795 חדרים וסוויטות, כולל סוויטות עם בריכות אינפיניטי פרטיות על הגג. העיצוב מודרני ומינימליסטי עם חומרים יוקרתיים — שיש, זהב ועץ טבעי. חלק מהסוויטות מציעות נוף ישיר לים עם מרפסות ענקיות.

**מסעדות עולמיות**

- **Nobu by the Beach** — סניף חוף ייחודי של השף נובו מאצוהיסה
- **Dinner by Heston Blumenthal** — מסעדת השף הבריטי הזוכה 3 כוכבי מישלן
- **Ling Ling** — מסעדה אסייתית מבית Hakkasan עם אווירת מסיבה
- **La Mar by Gastón Acurio** — מטבח פרואני על חוף הים
- **Jaleo by José Andrés** — מטבח ספרדי מבית השף חוסה אנדרס

**חוויות ייחודיות**

- **Aquaventure** — פארק המים הגדול ביותר בעולם ממש ליד
- **Cloud 22** — בריכת אינפיניטי על הגג עם DJ ואווירת מסיבה
- **Skyblaze** — מופע אש ומים מרהיב בכל ערב

**למה אנחנו ב-EVE BLUE אוהבים את Atlantis The Royal?**

- המלון החדש והיוקרתי ביותר בדובאי
- מסעדות שף שאין כמותן בשום מלון אחר
- הסוויטות עם הבריכות הפרטיות — חוויה שאין לה מתחרה
- אווירה צעירה ואנרגטית

רוצים שנזמין לכם חדר ב-Atlantis The Royal? דברו איתנו ונדאג להכל.`,
      en: `Atlantis The Royal is Dubai's newest and most luxurious hotel, opened in 2023 on the shores of Palm Jumeirah. With groundbreaking architectural design resembling giant Lego-like towers, the hotel instantly became a city icon.

**Perfect Location**

Located at the tip of Palm Jumeirah, offering panoramic views of Dubai's coastline and the Arabian Gulf. Easy access — 25 minutes from the airport and 20 minutes from Dubai Mall.

**Rooms & Suites**

795 rooms and suites, including suites with private rooftop infinity pools. Modern minimalist design with luxurious materials — marble, gold, and natural wood. Some suites offer direct sea views with massive terraces.

**World-Class Restaurants**

- **Nobu by the Beach** — Unique beachside outpost by Chef Nobu Matsuhisa
- **Dinner by Heston Blumenthal** — 3 Michelin-starred British chef's restaurant
- **Ling Ling** — Asian restaurant by Hakkasan with party atmosphere
- **La Mar by Gastón Acurio** — Peruvian cuisine on the beachfront
- **Jaleo by José Andrés** — Spanish cuisine by Chef José Andrés

**Unique Experiences**

- **Aquaventure** — World's largest waterpark right next door
- **Cloud 22** — Rooftop infinity pool with DJ and party vibes
- **Skyblaze** — Spectacular fire and water show every evening

**Why EVE BLUE loves Atlantis The Royal**

- Dubai's newest and most luxurious hotel
- Chef restaurants unmatched by any other hotel
- Private pool suites — an unrivaled experience
- Young and energetic atmosphere

Want us to book a room at Atlantis The Royal? Talk to us and we'll handle everything.`,
      ar: 'أتلانتس ذا رويال هو أحدث وأفخم فندق في دبي، افتتح في 2023 على شاطئ نخلة جميرا.',
      fr: "Atlantis The Royal est l'hôtel le plus récent et le plus luxueux de Dubaï, ouvert en 2023.",
      ru: 'Atlantis The Royal — новейший и самый роскошный отель Дубая, открытый в 2023 году.',
    },
  },
  {
    id: 'atlantis-the-palm',
    image: blogAtlantisPalm,
    category: {
      he: 'מלונות מומלצים',
      en: 'Recommended Hotels',
      ar: 'فنادق موصى بها',
      fr: 'Hôtels recommandés',
      ru: 'Рекомендуемые отели',
    },
    title: {
      he: 'Atlantis The Palm — האייקון של דובאי',
      en: 'Atlantis The Palm — Dubai\'s Iconic Resort',
      ar: 'أتلانتس ذا بالم — المنتجع الأيقوني في دبي',
      fr: 'Atlantis The Palm — Le resort iconique de Dubaï',
      ru: 'Atlantis The Palm — Культовый курорт Дубая',
    },
    excerpt: {
      he: 'המלון האייקוני ביותר של דובאי על חוף Palm Jumeirah, עם פארק מים, אקווריום ענק וחוויה משפחתית בלתי נשכחת.',
      en: 'Dubai\'s most iconic resort on Palm Jumeirah with a waterpark, giant aquarium and unforgettable family experience.',
      ar: 'المنتجع الأكثر شهرة في دبي على نخلة جميرا مع حديقة مائية وحوض أسماك عملاق.',
      fr: 'Le resort le plus emblématique de Dubaï sur Palm Jumeirah avec un parc aquatique.',
      ru: 'Самый знаковый курорт Дубая на Палм Джумейра с аквапарком и гигантским аквариумом.',
    },
    content: {
      he: `Atlantis The Palm הוא המלון האייקוני ביותר של דובאי, ממוקם בקצה Palm Jumeirah עם הקשת המפורסמת שלו. מאז פתיחתו ב-2008 הוא הפך לסמל של העיר ושל חוויית הנופש היוקרתית.

**מיקום קסום**

על קצה הפאלם, מוקף בים מכל הכיוונים. נוף מרהיב לקו החוף ולמרינה של דובאי. 30 דקות משדה התעופה.

**חדרים וסוויטות**

1,500+ חדרים וסוויטות, כולל סוויטות תת-ימיות עם חלונות לאקווריום! חדרים עם נוף לים או לפאלם, כולם מרווחים ומעוצבים בסגנון ימי-יוקרתי.

**אטרקציות במלון**

- **Aquaventure Waterpark** — פארק המים הגדול ביותר במזרח התיכון עם מגלשות ענק
- **The Lost Chambers Aquarium** — אקווריום עם 65,000 יצורי ים
- **Dolphin Bay** — שחייה עם דולפינים
- **Sea Lion Point** — מפגש עם אריות ים

**מסעדות**

- **Nobu** — מסעדה יפנית מפורסמת של השף נובו
- **Ossiano** — מסעדת פירות ים תת-ימית עם נוף לאקווריום
- **Bread Street Kitchen** — של השף גורדון רמזי
- **Ronda Locatelli** — מטבח איטלקי אותנטי

**למה אנחנו ב-EVE BLUE אוהבים את Atlantis The Palm?**

- חוויה משפחתית מושלמת
- פארק מים ואקווריום ברמה עולמית
- מסעדות שף מגוונות
- חוף פרטי מהמם

רוצים שנזמין לכם חדר? דברו איתנו ונטפל בהכל.`,
      en: `Atlantis The Palm is Dubai's most iconic hotel, located at the tip of Palm Jumeirah with its famous arch. Since opening in 2008, it has become a symbol of the city and the ultimate luxury resort experience.

**Magical Location**

At the tip of the Palm, surrounded by sea on all sides. Stunning views of Dubai's coastline and marina. 30 minutes from the airport.

**Rooms & Suites**

1,500+ rooms and suites, including underwater suites with windows into the aquarium! Rooms with sea or Palm views, all spacious and designed in a marine-luxury style.

**Hotel Attractions**

- **Aquaventure Waterpark** — Middle East's largest waterpark with giant slides
- **The Lost Chambers Aquarium** — Aquarium with 65,000 marine creatures
- **Dolphin Bay** — Swim with dolphins
- **Sea Lion Point** — Meet sea lions

**Restaurants**

- **Nobu** — Famous Japanese restaurant by Chef Nobu
- **Ossiano** — Underwater seafood restaurant with aquarium views
- **Bread Street Kitchen** — By Chef Gordon Ramsay
- **Ronda Locatelli** — Authentic Italian cuisine

**Why EVE BLUE loves Atlantis The Palm**

- Perfect family experience
- World-class waterpark and aquarium
- Diverse chef restaurants
- Stunning private beach

Want us to book a room? Talk to us and we'll handle everything.`,
      ar: 'أتلانتس ذا بالم هو أشهر فندق في دبي، يقع في نهاية نخلة جميرا مع قوسه الشهير.',
      fr: "Atlantis The Palm est l'hôtel le plus emblématique de Dubaï, situé à la pointe de Palm Jumeirah.",
      ru: 'Atlantis The Palm — самый знаковый отель Дубая, расположенный на вершине Палм Джумейра.',
    },
  },
  {
    id: 'five-palm-jumeirah',
    image: blogFivePalm,
    category: {
      he: 'מלונות מומלצים',
      en: 'Recommended Hotels',
      ar: 'فنادق موصى بها',
      fr: 'Hôtels recommandés',
      ru: 'Рекомендуемые отели',
    },
    title: {
      he: 'FIVE Palm Jumeirah — מלון המסיבות של דובאי',
      en: 'FIVE Palm Jumeirah — Dubai\'s Ultimate Party Hotel',
      ar: 'فايف نخلة جميرا — فندق الحفلات الأفضل في دبي',
      fr: 'FIVE Palm Jumeirah — L\'hôtel festif ultime de Dubaï',
      ru: 'FIVE Palm Jumeirah — Лучший тусовочный отель Дубая',
    },
    excerpt: {
      he: 'מלון בוטיק יוקרתי על חוף הפאלם, עם בריכות אינפיניטי מרהיבות, מסיבות ביץ\' מפורסמות ואווירה צעירה ואנרגטית.',
      en: 'Luxury boutique hotel on the Palm\'s beach with stunning infinity pools, famous beach parties, and a young energetic vibe.',
      ar: 'فندق بوتيكي فاخر على شاطئ النخلة مع مسابح لا متناهية ومناخ حيوي.',
      fr: 'Hôtel boutique de luxe sur la plage du Palm avec des piscines à débordement.',
      ru: 'Роскошный бутик-отель на пляже Палм с панорамными бассейнами.',
    },
    content: {
      he: `FIVE Palm Jumeirah הוא מלון הבוטיק היוקרתי והאנרגטי ביותר בדובאי, ממוקם ישירות על חוף Palm Jumeirah. המלון ידוע בעיקר בזכות מסיבות הבריכה וביץ' הפארטיז המפורסמים שלו.

**מיקום על חוף הפאלם**

ממוקם על החוף של Palm Jumeirah עם גישה ישירה לים. נוף מרהיב לקו הרקיע של דובאי ולמרינה. 20 דקות משדה התעופה.

**חדרים וסוויטות**

סוויטות מרווחות עם עיצוב מודרני ותוסס. חלקן עם בריכות פרטיות על הגג, אחרות עם נוף ישיר לים. העיצוב משלב יוקרה עם אנרגיה צעירה — צבעים חיים, תאורה דרמטית ופרטים מעוצבים.

**הבריכות**

- **The Penthouse Pool** — בריכת אינפיניטי על הגג עם נוף 360 מעלות
- **Beach Pool** — בריכת חוף ענקית עם DJ ואווירת מסיבה
- מסיבות בריכה מפורסמות בימי שישי ושבת

**מסעדות וחיי לילה**

- **Maiden Shanghai** — מסעדה סינית יוקרתית
- **The Penthouse** — מסעדה על הגג עם נוף מרהיב
- **Praia** — ביץ' בר על החוף
- **Secret Room** — בר נסתר עם אווירה אינטימית
- מסיבות ביץ' ובריכה כל סוף שבוע

**למה אנחנו ב-EVE BLUE אוהבים את FIVE Palm?**

- אווירה צעירה ואנרגטית שאין בשום מלון אחר
- הבריכות והמסיבות הכי טובות בדובאי
- חוף פרטי מדהים
- מושלם לזוגות צעירים וקבוצות חברים

רוצים להזמין חדר ב-FIVE? דברו איתנו!`,
      en: `FIVE Palm Jumeirah is Dubai's most energetic luxury boutique hotel, located directly on the Palm Jumeirah beach. The hotel is renowned for its famous pool parties and beach events.

**Beachfront on the Palm**

Located on Palm Jumeirah's beach with direct sea access. Stunning views of Dubai's skyline and marina. 20 minutes from the airport.

**Rooms & Suites**

Spacious suites with modern, vibrant design. Some with private rooftop pools, others with direct sea views. The design combines luxury with youthful energy — vivid colors, dramatic lighting, and designer details.

**The Pools**

- **The Penthouse Pool** — Rooftop infinity pool with 360-degree views
- **Beach Pool** — Massive beach pool with DJ and party vibes
- Famous pool parties every Friday and Saturday

**Restaurants & Nightlife**

- **Maiden Shanghai** — Luxury Chinese restaurant
- **The Penthouse** — Rooftop restaurant with stunning views
- **Praia** — Beach bar on the shore
- **Secret Room** — Hidden bar with intimate atmosphere
- Beach and pool parties every weekend

**Why EVE BLUE loves FIVE Palm**

- Young and energetic vibe unlike any other hotel
- Best pools and parties in Dubai
- Amazing private beach
- Perfect for young couples and friend groups

Want to book at FIVE? Talk to us!`,
      ar: 'فايف نخلة جميرا هو أكثر فنادق البوتيك الفاخرة حيوية في دبي.',
      fr: "FIVE Palm Jumeirah est l'hôtel boutique de luxe le plus énergique de Dubaï.",
      ru: 'FIVE Palm Jumeirah — самый энергичный роскошный бутик-отель Дубая.',
    },
  },
  {
    id: 'armani-hotel-burj-khalifa',
    image: blogArmaniBurj,
    category: {
      he: 'מלונות מומלצים',
      en: 'Recommended Hotels',
      ar: 'فنادق موصى بها',
      fr: 'Hôtels recommandés',
      ru: 'Рекомендуемые отели',
    },
    title: {
      he: 'Armani Hotel Dubai — יוקרה בתוך בורג\' ח\'ליפה',
      en: 'Armani Hotel Dubai — Luxury Inside Burj Khalifa',
      ar: 'فندق أرماني دبي — فخامة داخل برج خليفة',
      fr: 'Armani Hotel Dubai — Le luxe au cœur du Burj Khalifa',
      ru: 'Armani Hotel Dubai — Роскошь внутри Бурдж Халифа',
    },
    excerpt: {
      he: 'המלון היחיד בעולם שממוקם בתוך הבניין הגבוה בעולם, מעוצב כולו על ידי ג\'ורג\'ו ארמאני עצמו.',
      en: 'The only hotel in the world located inside the tallest building, entirely designed by Giorgio Armani himself.',
      ar: 'الفندق الوحيد في العالم داخل أطول مبنى، صممه جورجيو أرماني بالكامل.',
      fr: 'Le seul hôtel au monde situé dans le plus haut bâtiment, entièrement conçu par Giorgio Armani.',
      ru: 'Единственный в мире отель внутри самого высокого здания, полностью оформленный Джорджо Армани.',
    },
    content: {
      he: `Armani Hotel Dubai הוא מלון יוקרה אקסקלוסיבי הממוקם בקומות הראשונות של בורג' ח'ליפה — הבניין הגבוה ביותר בעולם. המלון עוצב כולו על ידי ג'ורג'ו ארמאני, מהלובי ועד לפינה האחרונה בכל חדר.

**מיקום ייחודי**

בתוך בורג' ח'ליפה, במרכז Downtown Dubai. צעדים מ-Dubai Mall, מזרקות דובאי ו-Dubai Opera. אין מיקום יוקרתי ומרכזי מזה בכל דובאי.

**חדרים וסוויטות**

160 חדרים וסוויטות בלבד — כולם מעוצבים בסגנון Armani מינימליסטי ואלגנטי. חומרים יוקרתיים, קווים נקיים, גוונים של שוקולד, שמנת וזהב עדין. תחושת בית יוקרתית ושקטה.

**מסעדות**

- **Armani/Ristorante** — מטבח איטלקי אלגנטי
- **Armani/Amal** — מטבח הודי יוקרתי
- **Armani/Hashi** — מסעדה יפנית אותנטית
- **Armani/Mediterraneo** — מטבח ים תיכוני
- **Armani/Privé** — לאונג' בר אקסקלוסיבי עם DJ

**ספא ובריאות**

ספא Armani/SPA מציע טיפולים מפנקים בהשראת ארמאני — שימוש במוצרי טיפוח של Armani עצמו. בריכה פרטית, סאונה ואזורי רגיעה.

**למה אנחנו ב-EVE BLUE אוהבים את Armani Hotel?**

- חוויית יוקרה אינטימית ושקטה
- עיצוב ברמה שאין לה מתחרה
- מיקום לא ייאמן — בתוך בורג' ח'ליפה
- שירות אישי ומושלם

רוצים לחוות לילה בבניין הגבוה ביותר בעולם? דברו איתנו.`,
      en: `Armani Hotel Dubai is an exclusive luxury hotel located on the first floors of Burj Khalifa — the world's tallest building. The entire hotel was designed by Giorgio Armani, from the lobby to the last corner of every room.

**Unique Location**

Inside Burj Khalifa, in the heart of Downtown Dubai. Steps from Dubai Mall, Dubai Fountains, and Dubai Opera. There's no more luxurious and central location in all of Dubai.

**Rooms & Suites**

Only 160 rooms and suites — all designed in Armani's minimalist, elegant style. Luxurious materials, clean lines, shades of chocolate, cream, and subtle gold. A quiet, luxurious home-like feeling.

**Restaurants**

- **Armani/Ristorante** — Elegant Italian cuisine
- **Armani/Amal** — Luxury Indian cuisine
- **Armani/Hashi** — Authentic Japanese restaurant
- **Armani/Mediterraneo** — Mediterranean cuisine
- **Armani/Privé** — Exclusive lounge bar with DJ

**Spa & Wellness**

Armani/SPA offers pampering treatments inspired by Armani — using Armani's own skincare products. Private pool, sauna, and relaxation areas.

**Why EVE BLUE loves Armani Hotel**

- Intimate and quiet luxury experience
- Unrivaled design quality
- Unbelievable location — inside Burj Khalifa
- Personal and perfect service

Want to experience a night in the world's tallest building? Talk to us.`,
      ar: 'فندق أرماني دبي هو فندق فاخر حصري يقع في الطوابق الأولى من برج خليفة.',
      fr: "L'Armani Hotel Dubai est un hôtel de luxe exclusif situé aux premiers étages du Burj Khalifa.",
      ru: 'Armani Hotel Dubai — эксклюзивный отель класса люкс в первых этажах Бурдж Халифа.',
    },
  },
  {
    id: 'address-dubai-marina',
    image: blogMarinaGate,
    category: {
      he: 'מלונות מומלצים',
      en: 'Recommended Hotels',
      ar: 'فنادق موصى بها',
      fr: 'Hôtels recommandés',
      ru: 'Рекомендуемые отели',
    },
    title: {
      he: 'Address Dubai Marina — יוקרה על המרינה',
      en: 'Address Dubai Marina — Luxury on the Marina',
      ar: 'أدرس دبي مارينا — فخامة على المارينا',
      fr: 'Address Dubai Marina — Le luxe sur la Marina',
      ru: 'Address Dubai Marina — Роскошь на Марине',
    },
    excerpt: {
      he: 'מלון יוקרתי מרשת Address עם נוף מרהיב למרינה של דובאי, בריכות על הגג ומיקום מושלם לבילויים.',
      en: 'Luxury Address hotel with stunning Dubai Marina views, rooftop pools, and perfect location for entertainment.',
      ar: 'فندق فاخر من سلسلة أدرس مع إطلالات خلابة على مارينا دبي.',
      fr: 'Hôtel de luxe Address avec vue imprenable sur la marina de Dubaï.',
      ru: 'Роскошный отель Address с потрясающим видом на Дубай Марину.',
    },
    content: {
      he: `Address Dubai Marina הוא מלון יוקרתי מרשת Address Hotels הממוקם בלב מרינה דובאי, עם נוף ישיר ליאכטות, למגדלי המרינה ולים.

**מיקום מרכזי**

במרכז Dubai Marina — האזור הפופולרי ביותר לבילויים בדובאי. צעדים מ-JBR Walk, The Beach, וקרוב ל-Ain Dubai. קל להגיע לכל מקום — טראם, מטרו ומוניות זמינים.

**חדרים וסוויטות**

חדרים מעוצבים בסגנון מודרני ואלגנטי עם נוף למרינה או לים. סוויטות מרווחות עם סלון נפרד ומרפסת. כל החדרים מצוידים בטכנולוגיה מתקדמת ומצעים יוקרתיים.

**בריכות וספא**

- בריכת אינפיניטי על הגג עם נוף פנורמי למרינה
- ספא מפנק עם טיפולים מגוונים
- חדר כושר מצויד ברמה גבוהה

**מסעדות**

- **The Restaurant** — מטבח בינלאומי יוקרתי
- **Asia Asia** — מסעדה אסייתית עם נוף למרינה
- **Shades** — בר על הבריכה
- מגוון מסעדות ובארים ב-Marina Walk במרחק הליכה

**למה אנחנו ב-EVE BLUE אוהבים את Address Dubai Marina?**

- מיקום מושלם באזור הבילויים של דובאי
- נוף מרהיב למרינה ולים
- קרוב ל-JBR, The Beach ו-Ain Dubai
- שירות Address ברמה הגבוהה ביותר

רוצים שנזמין לכם חדר ב-Address Marina? דברו איתנו.`,
      en: `Address Dubai Marina is a luxury hotel from the Address Hotels chain, located in the heart of Dubai Marina with direct views of yachts, marina towers, and the sea.

**Central Location**

In the center of Dubai Marina — Dubai's most popular entertainment district. Steps from JBR Walk, The Beach, and close to Ain Dubai. Easy to get anywhere — tram, metro, and taxis available.

**Rooms & Suites**

Rooms designed in modern elegant style with marina or sea views. Spacious suites with separate living area and balcony. All rooms equipped with advanced technology and luxury linens.

**Pools & Spa**

- Rooftop infinity pool with panoramic marina views
- Pampering spa with diverse treatments
- High-end equipped fitness center

**Restaurants**

- **The Restaurant** — Luxury international cuisine
- **Asia Asia** — Asian restaurant with marina views
- **Shades** — Poolside bar
- Various restaurants and bars at Marina Walk within walking distance

**Why EVE BLUE loves Address Dubai Marina**

- Perfect location in Dubai's entertainment district
- Stunning marina and sea views
- Close to JBR, The Beach, and Ain Dubai
- Address service at the highest level

Want us to book a room at Address Marina? Talk to us.`,
      ar: 'أدرس دبي مارينا هو فندق فاخر من سلسلة فنادق أدرس في قلب مارينا دبي.',
      fr: "Address Dubai Marina est un hôtel de luxe de la chaîne Address Hotels au cœur de Dubai Marina.",
      ru: 'Address Dubai Marina — роскошный отель сети Address Hotels в самом сердце Дубай Марины.',
    },
  },
  {
    id: 'hot-air-balloon-dubai',
    image: blogHotAirBalloon,
    category: {
      he: 'אטרקציות',
      en: 'Attractions',
      ar: 'معالم سياحية',
      fr: 'Attractions',
      ru: 'Достопримечательности',
    },
    title: {
      he: 'כדור פורח בדובאי — טיסה מעל המדבר',
      en: 'Hot Air Balloon Dubai — Flight Over the Desert',
      ar: 'منطاد الهواء الساخن في دبي — رحلة فوق الصحراء',
      fr: 'Montgolfière à Dubaï — Vol au-dessus du désert',
      ru: 'Воздушный шар в Дубае — Полёт над пустыней',
    },
    excerpt: {
      he: 'חוויה בלתי נשכחת של טיסה בכדור פורח מעל דיונות המדבר של דובאי בזריחה, עם נוף מרהיב של 360 מעלות.',
      en: 'An unforgettable hot air balloon flight over Dubai\'s desert dunes at sunrise with breathtaking 360-degree views.',
      ar: 'تجربة لا تُنسى في منطاد فوق كثبان صحراء دبي عند شروق الشمس.',
      fr: 'Une expérience inoubliable en montgolfière au-dessus des dunes du désert de Dubaï au lever du soleil.',
      ru: 'Незабываемый полёт на воздушном шаре над дюнами пустыни Дубая на рассвете.',
    },
    content: {
      he: `טיסה בכדור פורח מעל המדבר של דובאי היא אחת החוויות הכי מרגשות ומיוחדות שתוכלו לחוות באמירויות. הטיסה מתקיימת בזריחה, כשהשמש צובעת את הדיונות בגוונים של זהב וכתום — רגע קסום שאי אפשר לשכוח.

**מה כולל הטיול?**

- איסוף מהמלון לפנות בוקר (בדרך כלל 4:00-5:00 בבוקר)
- הגעה לאזור ההמראה במדבר
- צפייה בניפוח הכדור הפורח — חוויה בפני עצמה
- טיסה של כ-60 דקות מעל הדיונות
- נחיתה עם ארוחת בוקר במדבר
- חזרה למלון

**מה רואים מלמעלה?**

- דיונות חול אינסופיות בגוונים משתנים
- חיות מדבר — אוריקס, גמלים ועופות טורפים
- הזריחה המדהימה מעל קו האופק
- נוף פנורמי של 360 מעלות

**טיפים חשובים**

- הזמינו מראש — המקומות מוגבלים
- לבשו בגדים נוחים ושכבות (בבוקר קריר במדבר)
- קחו מצלמה עם סוללה טעונה
- הטיסה מתאימה לכל הגילאים (מגיל 5)
- העונה הטובה ביותר: אוקטובר עד אפריל

**למה אנחנו ב-EVE BLUE ממליצים?**

- חוויה רומנטית מושלמת לזוגות
- צילומים שאי אפשר לקבל בשום מקום אחר
- מתאים גם למשפחות
- שילוב מושלם עם סאפרי במדבר

רוצים לטוס בכדור פורח? דברו איתנו ונארגן הכל.`,
      en: `A hot air balloon flight over Dubai's desert is one of the most thrilling and unique experiences you can have in the Emirates. The flight takes place at sunrise, when the sun paints the dunes in shades of gold and orange — a magical moment you'll never forget.

**What's Included?**

- Hotel pickup in the early morning (usually 4:00-5:00 AM)
- Arrival at the desert launch site
- Watching the balloon inflate — an experience in itself
- Approximately 60-minute flight over the dunes
- Landing with a desert breakfast
- Return to hotel

**What You'll See from Above**

- Endless sand dunes in changing shades
- Desert wildlife — oryx, camels, and birds of prey
- The stunning sunrise over the horizon
- 360-degree panoramic views

**Important Tips**

- Book in advance — spots are limited
- Wear comfortable clothing and layers (mornings are cool in the desert)
- Bring a camera with a charged battery
- Suitable for all ages (from age 5)
- Best season: October to April

**Why EVE BLUE Recommends This**

- Perfect romantic experience for couples
- Photos you can't get anywhere else
- Great for families too
- Perfect combination with a desert safari

Want to fly in a hot air balloon? Talk to us and we'll arrange everything.`,
      ar: 'رحلة منطاد الهواء الساخن فوق صحراء دبي هي واحدة من أكثر التجارب إثارة في الإمارات.',
      fr: "Un vol en montgolfière au-dessus du désert de Dubaï est l'une des expériences les plus uniques aux Émirats.",
      ru: 'Полёт на воздушном шаре над пустыней Дубая — одно из самых захватывающих впечатлений в Эмиратах.',
    },
  },
  {
    id: 'helicopter-tour-dubai',
    image: blogHelicopterDubai,
    category: {
      he: 'אטרקציות',
      en: 'Attractions',
      ar: 'معالم سياحية',
      fr: 'Attractions',
      ru: 'Достопримечательности',
    },
    title: {
      he: 'טיסת הליקופטר בדובאי — דובאי מהאוויר',
      en: 'Helicopter Tour Dubai — See Dubai from Above',
      ar: 'جولة هليكوبتر في دبي — شاهد دبي من الأعلى',
      fr: 'Tour en hélicoptère à Dubaï — Voir Dubaï d\'en haut',
      ru: 'Вертолётная экскурсия по Дубаю — Увидеть Дубай сверху',
    },
    excerpt: {
      he: 'טיסת הליקופטר מרהיבה מעל האייקונים של דובאי — בורג\' ח\'ליפה, הפאלם, מרינה ועוד. חוויה שאי אפשר לפספס.',
      en: 'A breathtaking helicopter flight over Dubai\'s icons — Burj Khalifa, the Palm, Marina and more.',
      ar: 'رحلة هليكوبتر مذهلة فوق معالم دبي الشهيرة — برج خليفة والنخلة والمارينا.',
      fr: 'Un vol en hélicoptère époustouflant au-dessus des icônes de Dubaï.',
      ru: 'Захватывающий полёт на вертолёте над достопримечательностями Дубая.',
    },
    content: {
      he: `טיסת הליקופטר מעל דובאי היא אחת החוויות הכי מרשימות שתוכלו לחוות בעיר. לראות את כל האייקונים של דובאי מלמעלה — בורג' ח'ליפה, Palm Jumeirah, Dubai Marina, Burj Al Arab ועוד — זה משהו שאי אפשר לתאר במילים.

**מסלולי טיסה**

- **מסלול 12 דקות** — טיסה מעל Atlantis, Palm Jumeirah ו-Burj Al Arab
- **מסלול 17 דקות** — כולל גם את Dubai Marina ו-Ain Dubai
- **מסלול 22 דקות** — המסלול המלא כולל בורג' ח'ליפה, Downtown ו-Dubai Frame
- **מסלול 40 דקות** — חוויה פרטית VIP עם שמפניה

**מה רואים?**

- Palm Jumeirah מהאוויר — הצורה המפורסמת של הדקל
- בורג' ח'ליפה — הבניין הגבוה ביותר בעולם מזווית ייחודית
- Burj Al Arab — מלון המפרשית מלמעלה
- Dubai Marina — מגדלי היוקרה והיאכטות
- The World Islands — איי העולם

**פרטים חשובים**

- ההמראה מ-Atlantis Helipad על Palm Jumeirah
- בטוח לחלוטין — טייסים מנוסים וציוד מתקדם
- מתאים מגיל 2 ומעלה
- מומלץ להזמין לשעות הזריחה או השקיעה

**למה אנחנו ב-EVE BLUE ממליצים?**

- הדרך הכי מרשימה לראות את דובאי
- מתנה מושלמת ליום הולדת או הצעת נישואין
- צילומים ברמה שאי אפשר להשיג אחרת
- חוויה קצרה אבל בלתי נשכחת

רוצים לטוס מעל דובאי? דברו איתנו ונארגן טיסה פרטית.`,
      en: `A helicopter tour over Dubai is one of the most impressive experiences you can have in the city. Seeing all of Dubai's icons from above — Burj Khalifa, Palm Jumeirah, Dubai Marina, Burj Al Arab and more — is something words can't describe.

**Flight Routes**

- **12-minute route** — Flight over Atlantis, Palm Jumeirah, and Burj Al Arab
- **17-minute route** — Also includes Dubai Marina and Ain Dubai
- **22-minute route** — Full route including Burj Khalifa, Downtown, and Dubai Frame
- **40-minute route** — Private VIP experience with champagne

**What You'll See**

- Palm Jumeirah from the air — the famous palm shape
- Burj Khalifa — the world's tallest building from a unique angle
- Burj Al Arab — the sail-shaped hotel from above
- Dubai Marina — luxury towers and yachts
- The World Islands

**Important Details**

- Takeoff from Atlantis Helipad on Palm Jumeirah
- Completely safe — experienced pilots and advanced equipment
- Suitable from age 2 and up
- Recommended for sunrise or sunset hours

**Why EVE BLUE Recommends This**

- The most impressive way to see Dubai
- Perfect gift for birthdays or proposals
- Photos at a level impossible to achieve otherwise
- Short but unforgettable experience

Want to fly over Dubai? Talk to us and we'll arrange a private flight.`,
      ar: 'جولة الهليكوبتر فوق دبي هي واحدة من أكثر التجارب إثارة في المدينة.',
      fr: "Un tour en hélicoptère au-dessus de Dubaï est l'une des expériences les plus impressionnantes de la ville.",
      ru: 'Вертолётная экскурсия над Дубаем — одно из самых впечатляющих впечатлений в городе.',
    },
  },
  {
    id: 'skydiving-dubai',
    image: blogSkydivingDubai,
    category: {
      he: 'אטרקציות',
      en: 'Attractions',
      ar: 'معالم سياحية',
      fr: 'Attractions',
      ru: 'Достопримечательности',
    },
    title: {
      he: 'צניחה חופשית בדובאי — אדרנלין מעל הפאלם',
      en: 'Skydiving Dubai — Adrenaline Over the Palm',
      ar: 'القفز بالمظلات في دبي — أدرينالين فوق النخلة',
      fr: 'Parachutisme à Dubaï — Adrénaline au-dessus du Palm',
      ru: 'Прыжок с парашютом в Дубае — Адреналин над Палмом',
    },
    excerpt: {
      he: 'קפיצה חופשית מגובה 13,000 רגל מעל Palm Jumeirah — חוויית האדרנלין הכי גבוהה בדובאי עם נוף שאין לו תחרות.',
      en: 'Freefall from 13,000 feet above Palm Jumeirah — Dubai\'s ultimate adrenaline experience with unrivaled views.',
      ar: 'قفزة حرة من ارتفاع 13,000 قدم فوق نخلة جميرا — أقصى تجربة أدرينالين في دبي.',
      fr: 'Chute libre depuis 13 000 pieds au-dessus de Palm Jumeirah — l\'expérience ultime d\'adrénaline à Dubaï.',
      ru: 'Свободное падение с высоты 13 000 футов над Палм Джумейра — максимальный адреналин в Дубае.',
    },
    content: {
      he: `צניחה חופשית מעל דובאי היא חוויית האדרנלין הכי מטורפת שתוכלו לחוות. לקפוץ מגובה 13,000 רגל מעל Palm Jumeirah, לטוס בנפילה חופשית ולראות את כל דובאי מלמעלה — זה משהו שישנה לכם את החיים.

**איפה קופצים?**

- **Skydive Dubai — Palm Drop Zone** — הנחיתה על Palm Jumeirah עם נוף מטורף
- **Skydive Dubai — Desert Drop Zone** — נחיתה במדבר, חוויה שונה לגמרי

**איך זה עובד?**

- הדרכה קצרה על הקרקע (30 דקות)
- טיסה במטוס לגובה 13,000 רגל
- נפילה חופשית למשך 60 שניות במהירות 200 קמ"ש
- פתיחת מצנח וטיסה שקטה של 5-7 דקות
- נחיתה רכה על החוף או במדבר

**סוגי קפיצות**

- **Tandem Jump** — קפיצה עם מדריך מקצועי (מתאים למתחילים)
- **Solo Jump** — לבעלי ניסיון עם רישיון
- **צילום וידאו** — צלם מקצועי קופץ איתכם ומצלם הכל

**דרישות**

- גיל מינימלי: 18
- משקל מקסימלי: 100 ק"ג
- אין צורך בניסיון קודם לקפיצת Tandem
- מצב בריאות תקין

**למה אנחנו ב-EVE BLUE ממליצים?**

- חוויה שמשנה חיים — פעם בחיים חייבים לנסות
- הנוף מלמעלה על הפאלם הוא הכי מרשים בעולם
- צוות מקצועי ובטוח
- מתנה בלתי נשכחת

רוצים לקפוץ? דברו איתנו ונארגן את הכל!`,
      en: `Skydiving over Dubai is the most insane adrenaline experience you can have. Jumping from 13,000 feet above Palm Jumeirah, flying in freefall, and seeing all of Dubai from above — it's something that will change your life.

**Where to Jump?**

- **Skydive Dubai — Palm Drop Zone** — Landing on Palm Jumeirah with insane views
- **Skydive Dubai — Desert Drop Zone** — Landing in the desert, a completely different experience

**How It Works**

- Short ground briefing (30 minutes)
- Flight in an airplane to 13,000 feet
- 60 seconds of freefall at 200 km/h
- Parachute opens for a quiet 5-7 minute flight
- Soft landing on the beach or in the desert

**Jump Types**

- **Tandem Jump** — Jump with a professional instructor (suitable for beginners)
- **Solo Jump** — For experienced jumpers with a license
- **Video Package** — Professional cameraman jumps with you and films everything

**Requirements**

- Minimum age: 18
- Maximum weight: 100 kg
- No prior experience needed for Tandem
- Good health condition

**Why EVE BLUE Recommends This**

- Life-changing experience — everyone should try it once
- The view from above the Palm is the most impressive in the world
- Professional and safe crew
- An unforgettable gift

Want to jump? Talk to us and we'll arrange everything!`,
      ar: 'القفز بالمظلات فوق دبي هو أكثر تجربة أدرينالين جنونية يمكنك تجربتها.',
      fr: "Le parachutisme au-dessus de Dubaï est l'expérience d'adrénaline la plus folle que vous puissiez vivre.",
      ru: 'Прыжок с парашютом над Дубаем — самый сумасшедший адреналин, который вы можете испытать.',
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
  const cardsReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.01 });

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    const actualDir = isRTL
      ? (direction === 'left' ? scrollAmount : -scrollAmount)
      : (direction === 'left' ? -scrollAmount : scrollAmount);
    scrollRef.current.scrollBy({ left: actualDir, behavior: 'smooth' });
  };

  return (
    <section className="py-14 sm:py-20 w-full" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div ref={headerReveal.ref} className={`text-center mb-8 sm:mb-12 px-4 reveal-base ${headerReveal.isVisible ? 'revealed' : ''}`}>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary">
          {sectionTitle[language] || sectionTitle.en}
        </h2>
        <div className="w-20 h-px shimmer-line mx-auto mt-4" />
      </div>

      {/* Horizontal scroll strip */}
      <div className="relative group/strip">
        {/* Scroll arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute top-1/2 -translate-y-1/2 left-2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 flex items-center justify-center text-primary opacity-0 group-hover/strip:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowRight className={`w-5 h-5 ${isRTL ? '' : 'rotate-180'}`} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute top-1/2 -translate-y-1/2 right-2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 flex items-center justify-center text-primary opacity-0 group-hover/strip:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-4 sm:px-6 pb-4 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {BLOG_ARTICLES.map((article) => (
            <button
              key={article.id}
              onClick={() => navigate(`/blog/${article.id}`)}
              className="group flex-shrink-0 w-[280px] sm:w-[300px] text-start rounded-xl overflow-hidden bg-card/40 border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_hsl(var(--primary)/0.15),0_8px_24px_rgba(0,0,0,0.2)]"
            >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title[language] || article.title.en}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <span className="text-[10px] text-primary/70 uppercase tracking-[0.2em] font-medium">
                  {article.category[language] || article.category.en}
                </span>
                <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {article.title[language] || article.title.en}
                </h3>
                <p className="text-xs text-foreground/50 leading-relaxed line-clamp-2">
                  {article.excerpt[language] || article.excerpt.en}
                </p>
                <div className="flex items-center gap-1.5 text-primary text-xs font-medium pt-1">
                  <span>{language === 'he' ? 'קרא עוד' : language === 'ar' ? 'اقرأ المزيد' : language === 'fr' ? 'Lire la suite' : language === 'ru' ? 'Читать далее' : 'Read more'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5 ${isRTL ? 'rotate-180 group-hover:-translate-x-1.5' : ''}`} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
