
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.72166b02c5e04b1f8342029e13c39ee5',
  appName: 'nutri-find-smart-eats',
  webDir: 'dist',
  server: {
    url: 'https://72166b02-c5e0-4b1f-8342-029e13c39ee5.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    },
    Geolocation: {
      permissions: ['location']
    }
  }
};

export default config;
