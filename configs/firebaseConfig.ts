import { initializeApp } from 'firebase/app';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
  apiKey:process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain:process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL:process.env.EXPO_PUBLIC_DATABASE_URL,
  projectId:process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket:process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId:process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId:process.env.EXPO_PUBLIC_APP_ID
};
//pass configs to app contrsuctor
const app = initializeApp(firebaseConfig);
//bing storage constructor to app
export const storage = getStorage(app);