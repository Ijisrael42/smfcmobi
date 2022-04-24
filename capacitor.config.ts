import { CapacitorConfig } from '@capacitor/cli';

const config = {
  appId: 'com.smfc.tutors',
  appName: 'Smfctutors',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "920422764087-gnbtuq51uk9gvpumsh6l3dgcikcqfto4.apps.googleusercontent.com",
      forceCodeForRefreshToken : true
    }
  } 
};

export default config;
