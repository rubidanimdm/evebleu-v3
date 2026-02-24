import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5a641b5aa07147f88e7ff4bd195318cb',
  appName: 'EVE BLUE',
  webDir: 'dist',
  server: {
    url: 'https://5a641b5a-a071-47f8-8e7f-f4bd195318cb.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#0A0A0A',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0A0A0A'
    }
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scheme: 'EVE BLUE'
  },
  android: {
    backgroundColor: '#0A0A0A',
    allowMixedContent: true
  }
};

export default config;
