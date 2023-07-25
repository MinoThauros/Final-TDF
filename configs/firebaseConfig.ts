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


// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDWZcx9JHwZSj2fam2grs4bAL0reJBuIzE",
  authDomain: "bgetapp.firebaseapp.com",
  databaseURL: "https://bgetapp-default-rtdb.firebaseio.com",
  projectId: "bgetapp",
  storageBucket: "bgetapp.appspot.com",
  messagingSenderId: "871157693131",
  appId: "1:871157693131:web:b8692954d93449aee7b94e"
};
//pass configs to app contrsuctor
const app = initializeApp(firebaseConfig);
//bing storage constructor to app
export const storage = getStorage(app);