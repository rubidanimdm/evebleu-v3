# AI My Dubai - App Store Assets Guide

## App Information

- **App Name:** AI My Dubai
- **Tagline:** Concierge. It. Done.
- **Category:** Lifestyle / Travel
- **Default Language:** English

---

## Required Icon Sizes

### iOS App Store
| Size | Usage |
|------|-------|
| 1024x1024 | App Store listing |
| 180x180 | iPhone (iOS 7+) |
| 167x167 | iPad Pro |
| 152x152 | iPad, iPad mini |
| 120x120 | iPhone (iOS 7+) |
| 87x87 | iPhone Spotlight (3x) |
| 80x80 | iPad Spotlight |
| 76x76 | iPad |
| 60x60 | iPhone |
| 58x58 | Settings (3x) |
| 40x40 | Spotlight |
| 29x29 | Settings |
| 20x20 | Notification |

### Google Play Store
| Size | Usage |
|------|-------|
| 512x512 | Play Store listing |
| 192x192 | Launcher (xxxhdpi) |
| 144x144 | Launcher (xxhdpi) |
| 96x96 | Launcher (xhdpi) |
| 72x72 | Launcher (hdpi) |
| 48x48 | Launcher (mdpi) |

---

## Splash Screen Specifications

### iOS
- 2732x2732 (iPad Pro 12.9")
- 2048x2732 (iPad Pro 11")
- 1668x2388 (iPad Pro 11")
- 1536x2048 (iPad)
- 1242x2688 (iPhone 11 Pro Max)
- 1125x2436 (iPhone X/XS/11 Pro)
- 828x1792 (iPhone XR/11)
- 750x1334 (iPhone 8)
- 640x1136 (iPhone SE)

### Android
- xxxhdpi: 1280x1920
- xxhdpi: 960x1440
- xhdpi: 640x960
- hdpi: 480x800
- mdpi: 320x480

---

## App Store Screenshots

### iOS Screenshots (Required)
- **iPhone 6.7":** 1290x2796 or 1284x2778
- **iPhone 6.5":** 1242x2688 or 1284x2778
- **iPhone 5.5":** 1242x2208
- **iPad Pro 12.9":** 2048x2732

### Google Play Screenshots
- Minimum: 320px
- Maximum: 3840px
- Aspect ratio: 16:9 or 9:16
- Recommended: 1080x1920 (portrait)

---

## Store Listing Content

### Short Description (80 chars max)
```
Your premium Dubai lifestyle concierge - dining, hotels, flights & more.
```

### Full Description
```
AI My Dubai - Concierge. It. Done.

Experience Dubai like never before with your personal AI-powered concierge service.

FEATURES:
• Book Me a Table - Reserve at Dubai's finest restaurants
• Book Me a Car - Premium transportation at your fingertips
• Book Me a Hotel - Luxury accommodations handpicked for you
• Book Me a Flight - Seamless travel arrangements
• Book Me a Club - VIP nightlife access
• Book an Experience - Curated adventures across Dubai
• Handle It For Me - Custom requests handled with care

PREMIUM SERVICE:
Our concierge team is available to handle any request, no matter how unique. From last-minute reservations to exclusive experiences, we make it happen.

Download now and discover the art of effortless luxury.
```

### Keywords
```
dubai, concierge, luxury, lifestyle, travel, restaurants, hotels, booking, vip, premium, nightlife, experiences
```

---

## Color Palette for Assets

- **Primary Background:** #0A0A0A (Rich Black)
- **Primary Gold:** hsl(45, 80%, 50%) - #E6B800
- **Accent Gold Light:** hsl(45, 70%, 65%) - #D4AF37
- **Text Primary:** #FAFAFA (Off White)

---

## Next Steps for Developers

1. **Export to GitHub** using the "Export to GitHub" button
2. **Clone the repository** to your local machine
3. **Run setup commands:**
   ```bash
   npm install
   npx cap add ios
   npx cap add android
   npm run build
   npx cap sync
   ```
4. **Open in IDE:**
   - iOS: `npx cap open ios` (requires Xcode on Mac)
   - Android: `npx cap open android` (requires Android Studio)
5. **Generate icons and splash screens** using the assets in `/public/icons/`
6. **Build and submit** to respective app stores

---

## Testing

### Local Development
```bash
npx cap run ios      # Run on iOS simulator/device
npx cap run android  # Run on Android emulator/device
```

### Live Reload (Development)
The `server.url` in capacitor.config.ts is set to load from the Lovable preview URL for hot-reload during development.

For production builds, comment out or remove the `server` block in capacitor.config.ts to use the local `dist` folder.
