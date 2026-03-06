import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Clock, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, Thermometer } from 'lucide-react';

/* ── Currency config by language ── */
const CURRENCY_MAP: Record<string, { code: string; symbol: string; label: string }> = {
  he: { code: 'ILS', symbol: '₪', label: 'שקל ישראלי' },
  en: { code: 'USD', symbol: '$', label: 'US Dollar' },
  ar: { code: 'SAR', symbol: '﷼', label: 'ريال سعودي' },
  fr: { code: 'EUR', symbol: '€', label: 'Euro' },
  ru: { code: 'RUB', symbol: '₽', label: 'Рубль' },
};

/* ── Weather icon helper ── */
function WeatherIcon({ code }: { code: number }) {
  const cls = "w-5 h-5 text-primary";
  if (code === 0) return <Sun className={cls} />;
  if (code <= 3) return <Cloud className={cls} />;
  if (code <= 48) return <CloudFog className={cls} />;
  if (code <= 67) return <CloudRain className={cls} />;
  if (code <= 77) return <CloudSnow className={cls} />;
  if (code <= 99) return <CloudLightning className={cls} />;
  return <Thermometer className={cls} />;
}

/* ── Weather description by WMO code ── */
function getWeatherDesc(code: number, lang: string): string {
  const descs: Record<string, Record<string, string>> = {
    clear: { he: 'שמיים בהירים', en: 'Clear sky', ar: 'سماء صافية', fr: 'Ciel dégagé', ru: 'Ясно' },
    partlyCloudy: { he: 'מעונן חלקית', en: 'Partly cloudy', ar: 'غائم جزئياً', fr: 'Partiellement nuageux', ru: 'Переменная облачность' },
    cloudy: { he: 'מעונן', en: 'Cloudy', ar: 'غائم', fr: 'Nuageux', ru: 'Облачно' },
    foggy: { he: 'ערפילי', en: 'Foggy', ar: 'ضبابي', fr: 'Brumeux', ru: 'Туман' },
    rainy: { he: 'גשום', en: 'Rainy', ar: 'ممطر', fr: 'Pluvieux', ru: 'Дождь' },
    snowy: { he: 'שלג', en: 'Snow', ar: 'ثلج', fr: 'Neige', ru: 'Снег' },
    stormy: { he: 'סופה', en: 'Stormy', ar: 'عاصف', fr: 'Orageux', ru: 'Гроза' },
  };
  let key = 'clear';
  if (code <= 0) key = 'clear';
  else if (code <= 3) key = 'partlyCloudy';
  else if (code <= 48) key = 'foggy';
  else if (code <= 67) key = 'rainy';
  else if (code <= 77) key = 'snowy';
  else if (code <= 99) key = 'stormy';
  return descs[key]?.[lang] || descs[key]?.en || '';
}

export function DubaiInfoStrip() {
  const { language } = useLanguage();
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null);
  const [rate, setRate] = useState<number | null>(null);

  const currency = CURRENCY_MAP[language] || CURRENCY_MAP.en;
  const isRTL = language === 'he' || language === 'ar';

  /* ── Clock ── */
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const dubaiTime = new Intl.DateTimeFormat(language === 'he' ? 'he-IL' : language, {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      const dubaiDate = new Intl.DateTimeFormat(language === 'he' ? 'he-IL' : language, {
        timeZone: 'Asia/Dubai',
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(now);
      setTime(dubaiTime);
      setDate(dubaiDate);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [language]);

  /* ── Weather (Open-Meteo — no API key needed) ── */
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current_weather=true')
      .then(r => r.json())
      .then(d => {
        if (d.current_weather) {
          setWeather({ temp: Math.round(d.current_weather.temperature), code: d.current_weather.weathercode });
        }
      })
      .catch(() => {});
  }, []);

  /* ── Exchange rate (open.er-api.com — free, no key) ── */
  useEffect(() => {
    if (currency.code === 'AED') return;
    fetch(`https://open.er-api.com/v6/latest/AED`)
      .then(r => r.json())
      .then(d => {
        if (d.rates?.[currency.code]) {
          setRate(d.rates[currency.code]);
        }
      })
      .catch(() => {});
  }, [currency.code]);

  const weatherLabel: Record<string, string> = {
    he: 'מזג האוויר כעת בדובאי',
    en: 'Current weather in Dubai',
    ar: 'الطقس الحالي في دبي',
    fr: 'Météo actuelle à Dubaï',
    ru: 'Погода в Дубае',
  };

  const timeLabel: Record<string, string> = {
    he: 'דובאי איחוד האמירויות',
    en: 'Dubai, UAE',
    ar: 'دبي، الإمارات',
    fr: 'Dubaï, EAU',
    ru: 'Дубай, ОАЭ',
  };

  const rateLabel: Record<string, string> = {
    he: 'שווה ל',
    en: 'equals',
    ar: 'يساوي',
    fr: 'équivaut à',
    ru: 'равен',
  };

  return (
    <div
      className="w-full bg-card/80 backdrop-blur-md border-b border-primary/10 py-2.5 px-4 z-50 relative"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[960px] lg:max-w-[1200px] xl:max-w-[1400px] mx-auto flex items-center justify-between gap-4 sm:gap-6 lg:gap-10 text-xs sm:text-sm lg:text-base">

        {/* ── Time & Date ── */}
        <div className="flex items-center gap-2 min-w-0">
          <Clock className="w-4 h-4 text-primary shrink-0" />
          <div className="flex flex-col leading-tight">
            <span className="text-foreground font-bold text-sm sm:text-base lg:text-lg tabular-nums">{time}</span>
            <span className="text-foreground/50 text-[10px] sm:text-xs lg:text-sm truncate">{date}</span>
            <span className="text-foreground/40 text-[9px] sm:text-[10px] lg:text-xs">{timeLabel[language] || timeLabel.en}</span>
          </div>
        </div>

        {/* ── Weather ── */}
        {weather && (
          <div className="flex items-center gap-2 min-w-0">
            <WeatherIcon code={weather.code} />
            <div className="flex flex-col items-center leading-tight">
              <span className="text-foreground font-bold text-sm sm:text-lg lg:text-xl">{weather.temp}°C</span>
              <span className="text-foreground/50 text-[10px] sm:text-xs lg:text-sm truncate max-w-[100px] sm:max-w-none">
                {getWeatherDesc(weather.code, language)}
              </span>
              <span className="text-foreground/40 text-[9px] sm:text-[10px] lg:text-xs hidden sm:block">
                {weatherLabel[language] || weatherLabel.en}
              </span>
            </div>
          </div>
        )}

        {/* ── Exchange Rate ── */}
        {rate !== null && (
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-primary font-bold text-base sm:text-lg lg:text-xl shrink-0">{currency.symbol}</span>
            <div className="flex flex-col leading-tight">
              <span className="text-foreground font-bold text-sm sm:text-base lg:text-lg tabular-nums">
                {rate.toFixed(2)}
              </span>
              <span className="text-foreground/50 text-[10px] sm:text-xs lg:text-sm">
                1 AED {rateLabel[language] || rateLabel.en}
              </span>
              <span className="text-foreground/40 text-[9px] sm:text-[10px] lg:text-xs">{currency.label}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
