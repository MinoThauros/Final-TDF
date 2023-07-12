import { initializeApp } from 'firebase/app';
import { FIREBASE_API_KEY } from 'react-native-dotenv';

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

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase