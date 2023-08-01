import { initializeApp } from 'firebase/app';
import { 
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID
} from 'react-native-dotenv';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey:FIREBASE_API_KEY,
  authDomain:FIREBASE_AUTH_DOMAIN,
  databaseURL:DATABASE_URL,
  projectId:PROJECT_ID,
  storageBucket:STORAGE_BUCKET,
  messagingSenderId:MESSAGING_SENDER_ID,
  appId:APP_ID
};
//pass configs to app contrsuctor
const app = initializeApp(firebaseConfig);
//bing storage constructor to app
export const storage = getStorage(app);