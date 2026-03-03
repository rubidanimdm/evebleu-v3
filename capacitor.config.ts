import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'vip.evebleu.app',
  appName: 'EVE BLUE',
  webDir: 'dist',
  server: {
    url: 'https://evebleu.vip',
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
