// Resolve src/assets at build time — Vite hashes these in production
const assetModules = import.meta.glob('/src/assets/**/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

function resolveAssetPath(rawPath: string): string {
  // For /src/assets/ paths, resolve to hashed URL; for /public/ paths, keep as-is
  return assetModules[rawPath] || rawPath;
}

export interface MediaAsset {
  id: string;
  filename: string;
  path: string;
  type: 'image' | 'video';
  category: 'blog' | 'yacht' | 'logo' | 'icon' | 'video' | 'hero' | 'misc';
}

// src/assets — imported via Vite
const SRC_ASSETS: Omit<MediaAsset, 'id'>[] = [
  // Hero / branding
  { filename: 'hero-background.jpeg', path: '/src/assets/hero-background.jpeg', type: 'image', category: 'hero' },
  { filename: 'ai-mydubai-hero.jpeg', path: '/src/assets/ai-mydubai-hero.jpeg', type: 'image', category: 'hero' },
  { filename: 'dubai-skyline.jpg', path: '/src/assets/dubai-skyline.jpg', type: 'image', category: 'hero' },
  { filename: 'eve-blue-logo.jpeg', path: '/src/assets/eve-blue-logo.jpeg', type: 'image', category: 'logo' },
  { filename: 'eve-blue-logo-transparent.png', path: '/src/assets/eve-blue-logo-transparent.png', type: 'image', category: 'logo' },
  { filename: 'eve-blue-logo-white.gif', path: '/src/assets/eve-blue-logo-white.gif', type: 'image', category: 'logo' },
  { filename: 'logo.png', path: '/src/assets/logo.png', type: 'image', category: 'logo' },

  // Service icons
  { filename: 'airport-icon.jpeg', path: '/src/assets/airport-icon.jpeg', type: 'image', category: 'icon' },
  { filename: 'airport-icon-new.jpeg', path: '/src/assets/airport-icon-new.jpeg', type: 'image', category: 'icon' },
  { filename: 'airport-pickup-icon.jpeg', path: '/src/assets/airport-pickup-icon.jpeg', type: 'image', category: 'icon' },
  { filename: 'birthday-icon.jpeg', path: '/src/assets/birthday-icon.jpeg', type: 'image', category: 'icon' },
  { filename: 'desert-icon.jpeg', path: '/src/assets/desert-icon.jpeg', type: 'image', category: 'icon' },
  { filename: 'dining-icon.jpeg', path: '/src/assets/dining-icon.jpeg', type: 'image', category: 'icon' },
  { filename: 'dining-icon-new.jpeg', path: '/src/assets/dining-icon-new.jpeg', type: 'image', category: 'icon' },
  { filename: 'dining-icon-new.png', path: '/src/assets/dining-icon-new.png', type: 'image', category: 'icon' },
  { filename: 'flights-icon.jpeg', path: '/src/assets/flights-icon.jpeg', type: 'image', category: 'icon' },
  { filename: 'helicopter-icon.jpeg', path: '/src/assets/helicopter-icon.jpeg', type: 'image', category: 'icon' },
  { filename: 'hotel-icon.jpeg', path: '/src/assets/hotel-icon.jpeg', type: 'image', category: 'icon' },
  { filename: 'luxury-car-icon.jpeg', path: '/src/assets/luxury-car-icon.jpeg', type: 'image', category: 'icon' },
  { filename: 'vip-driver-icon.jpeg', path: '/src/assets/vip-driver-icon.jpeg', type: 'image', category: 'icon' },
  { filename: 'vip-driver-icon-new.jpeg', path: '/src/assets/vip-driver-icon-new.jpeg', type: 'image', category: 'icon' },
  { filename: 'yacht-icon.jpeg', path: '/src/assets/yacht-icon.jpeg', type: 'image', category: 'icon' },
  { filename: 'yacht-icon-new.jpeg', path: '/src/assets/yacht-icon-new.jpeg', type: 'image', category: 'icon' },
  { filename: 'icon-attractions.jpeg', path: '/src/assets/icon-attractions.jpeg', type: 'image', category: 'icon' },
  { filename: 'icon-birthday.jpeg', path: '/src/assets/icon-birthday.jpeg', type: 'image', category: 'icon' },
  { filename: 'icon-desert.jpeg', path: '/src/assets/icon-desert.jpeg', type: 'image', category: 'icon' },
  { filename: 'icon-flights.jpeg', path: '/src/assets/icon-flights.jpeg', type: 'image', category: 'icon' },
  { filename: 'icon-helicopter.jpeg', path: '/src/assets/icon-helicopter.jpeg', type: 'image', category: 'icon' },
  { filename: 'icon-hotel.jpeg', path: '/src/assets/icon-hotel.jpeg', type: 'image', category: 'icon' },
  { filename: 'icon-luxury-car.jpeg', path: '/src/assets/icon-luxury-car.jpeg', type: 'image', category: 'icon' },
  { filename: 'icon-vip-driver.jpeg', path: '/src/assets/icon-vip-driver.jpeg', type: 'image', category: 'icon' },
  { filename: 'icon-yacht.jpeg', path: '/src/assets/icon-yacht.jpeg', type: 'image', category: 'icon' },

  // Blog images
  { filename: 'blog-ain-dubai.jpg', path: '/src/assets/blog-ain-dubai.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-airport.jpg', path: '/src/assets/blog-airport.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-armani-burj.jpg', path: '/src/assets/blog-armani-burj.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-atlantis-palm.jpg', path: '/src/assets/blog-atlantis-palm.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-atlantis-royal.jpg', path: '/src/assets/blog-atlantis-royal.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-burj-khalifa.jpg', path: '/src/assets/blog-burj-khalifa.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-desert.jpg', path: '/src/assets/blog-desert.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-desert-safari.jpg', path: '/src/assets/blog-desert-safari.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-dining.jpg', path: '/src/assets/blog-dining.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-dubai-mall.jpg', path: '/src/assets/blog-dubai-mall.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-dubai-nightlife.jpg', path: '/src/assets/blog-dubai-nightlife.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-emirates.jpg', path: '/src/assets/blog-emirates.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-family.jpg', path: '/src/assets/blog-family.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-five-palm.jpg', path: '/src/assets/blog-five-palm.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-helicopter-dubai.jpg', path: '/src/assets/blog-helicopter-dubai.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-hot-air-balloon.jpg', path: '/src/assets/blog-hot-air-balloon.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-jw-marriott.jpg', path: '/src/assets/blog-jw-marriott.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-marina-gate.jpg', path: '/src/assets/blog-marina-gate.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-nightlife.jpg', path: '/src/assets/blog-nightlife.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-palm-atlantis.jpg', path: '/src/assets/blog-palm-atlantis.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-park-hyatt.jpg', path: '/src/assets/blog-park-hyatt.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-rixos.jpg', path: '/src/assets/blog-rixos.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-shangrila.jpg', path: '/src/assets/blog-shangrila.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-shopping.jpg', path: '/src/assets/blog-shopping.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-skydiving-dubai.jpg', path: '/src/assets/blog-skydiving-dubai.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-sofitel.jpg', path: '/src/assets/blog-sofitel.jpg', type: 'image', category: 'blog' },
  { filename: 'blog-yacht.jpg', path: '/src/assets/blog-yacht.jpg', type: 'image', category: 'blog' },

  // Videos
  { filename: 'hero-video.mp4', path: '/src/assets/hero-video.mp4', type: 'video', category: 'video' },
  { filename: 'attractions-video.mp4', path: '/src/assets/attractions-video.mp4', type: 'video', category: 'video' },
  { filename: 'nightlife-video.mp4', path: '/src/assets/nightlife-video.mp4', type: 'video', category: 'video' },
  { filename: 'strip4-video.mp4', path: '/src/assets/strip4-video.mp4', type: 'video', category: 'video' },
  { filename: 'strip5-video.mp4', path: '/src/assets/strip5-video.mp4', type: 'video', category: 'video' },
  { filename: 'yacht-marina-video.mp4', path: '/src/assets/yacht-marina-video.mp4', type: 'video', category: 'video' },
];

// public/ — served directly
const PUBLIC_ASSETS: Omit<MediaAsset, 'id'>[] = [
  // Root public
  { filename: 'favicon.ico', path: '/favicon.ico', type: 'image', category: 'icon' },
  { filename: 'favicon.jpeg', path: '/favicon.jpeg', type: 'image', category: 'icon' },
  { filename: 'og-image.jpeg', path: '/og-image.jpeg', type: 'image', category: 'misc' },
  { filename: 'placeholder.svg', path: '/placeholder.svg', type: 'image', category: 'misc' },

  // Icons
  { filename: 'icon-1024x1024.png', path: '/icons/icon-1024x1024.png', type: 'image', category: 'icon' },

  // Splash
  { filename: 'splash-1080x1920.png', path: '/splash/splash-1080x1920.png', type: 'image', category: 'misc' },

  // Venue logos
  { filename: 'adaline.jpeg', path: '/logos/adaline.jpeg', type: 'image', category: 'logo' },
  { filename: 'african-queen.png', path: '/logos/african-queen.png', type: 'image', category: 'logo' },
  { filename: 'alaya.png', path: '/logos/alaya.png', type: 'image', category: 'logo' },
  { filename: 'amelia.jpeg', path: '/logos/amelia.jpeg', type: 'image', category: 'logo' },
  { filename: 'aretha.jpeg', path: '/logos/aretha.jpeg', type: 'image', category: 'logo' },
  { filename: 'arrogante.png', path: '/logos/arrogante.png', type: 'image', category: 'logo' },
  { filename: 'avenue.jpeg', path: '/logos/avenue.jpeg', type: 'image', category: 'logo' },
  { filename: 'baoli.jpeg', path: '/logos/baoli.jpeg', type: 'image', category: 'logo' },
  { filename: 'bar-de-pres.jpeg', path: '/logos/bar-de-pres.jpeg', type: 'image', category: 'logo' },
  { filename: 'bch-clb.png', path: '/logos/bch-clb.png', type: 'image', category: 'logo' },
  { filename: 'beach-by-five.png', path: '/logos/beach-by-five.png', type: 'image', category: 'logo' },
  { filename: 'billionaire.jpeg', path: '/logos/billionaire.jpeg', type: 'image', category: 'logo' },
  { filename: 'blume.jpg', path: '/logos/blume.jpg', type: 'image', category: 'logo' },
  { filename: 'bohemia.jpeg', path: '/logos/bohemia.jpeg', type: 'image', category: 'logo' },
  { filename: 'carnival.jpeg', path: '/logos/carnival.jpeg', type: 'image', category: 'logo' },
  { filename: 'casa-amor.png', path: '/logos/casa-amor.png', type: 'image', category: 'logo' },
  { filename: 'ce-la-vi.webp', path: '/logos/ce-la-vi.webp', type: 'image', category: 'logo' },

  // Yachts
  { filename: 'elite-100ft.jpg', path: '/yachts/elite-100ft.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-100-1.jpg', path: '/yachts/elite-100-1.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-100-2.jpg', path: '/yachts/elite-100-2.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-100-3.jpg', path: '/yachts/elite-100-3.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-100-4.jpg', path: '/yachts/elite-100-4.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-100-5.jpg', path: '/yachts/elite-100-5.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-12-56ft.jpg', path: '/yachts/elite-12-56ft.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-12-1.jpg', path: '/yachts/elite-12-1.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-12-2.jpg', path: '/yachts/elite-12-2.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-12-3.jpg', path: '/yachts/elite-12-3.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-12-4.jpg', path: '/yachts/elite-12-4.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-14-44ft.jpg', path: '/yachts/elite-14-44ft.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-14-1.jpg', path: '/yachts/elite-14-1.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-14-2.jpg', path: '/yachts/elite-14-2.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-14-3.jpg', path: '/yachts/elite-14-3.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-14-4.jpg', path: '/yachts/elite-14-4.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-16-70ft.jpg', path: '/yachts/elite-16-70ft.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-16-1.jpg', path: '/yachts/elite-16-1.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-16-2.jpg', path: '/yachts/elite-16-2.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-16-3.jpg', path: '/yachts/elite-16-3.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-16-4.jpg', path: '/yachts/elite-16-4.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-16-5.jpg', path: '/yachts/elite-16-5.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-4-48ft.jpg', path: '/yachts/elite-4-48ft.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-4-1.jpg', path: '/yachts/elite-4-1.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-4-2.jpg', path: '/yachts/elite-4-2.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-4-3.jpg', path: '/yachts/elite-4-3.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-4-4.jpg', path: '/yachts/elite-4-4.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-4-page-1.jpg', path: '/yachts/elite-4-page-1.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-4-page-2.jpg', path: '/yachts/elite-4-page-2.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-4-page-3.jpg', path: '/yachts/elite-4-page-3.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-4-page-4.jpg', path: '/yachts/elite-4-page-4.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-5-36ft.jpg', path: '/yachts/elite-5-36ft.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-5-main.jpg', path: '/yachts/elite-5-main.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-5-1.jpg', path: '/yachts/elite-5-1.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-5-2.jpg', path: '/yachts/elite-5-2.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-5-3.jpg', path: '/yachts/elite-5-3.jpg', type: 'image', category: 'yacht' },
  { filename: 'elite-5-4.jpg', path: '/yachts/elite-5-4.jpg', type: 'image', category: 'yacht' },
];

export const MEDIA_ASSETS: MediaAsset[] = [
  ...SRC_ASSETS.map((a, i) => ({ ...a, path: resolveAssetPath(a.path), id: `src-${i}` })),
  ...PUBLIC_ASSETS.map((a, i) => ({ ...a, id: `pub-${i}` })),
];

export const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'blog', label: 'Blog' },
  { value: 'yacht', label: 'Yachts' },
  { value: 'logo', label: 'Logos' },
  { value: 'icon', label: 'Icons' },
  { value: 'video', label: 'Videos' },
  { value: 'hero', label: 'Hero' },
  { value: 'misc', label: 'Other' },
] as const;
