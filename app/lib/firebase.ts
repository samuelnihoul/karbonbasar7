
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE,
  authDomain: "hypnotic-trees-328016.firebaseapp.com",
  projectId: "hypnotic-trees-328016",
  storageBucket: "hypnotic-trees-328016.appspot.com",
  messagingSenderId: "761017450319",
  appId: "1:761017450319:web:b643796d4cd995728c0f3a",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
getAnalytics(app)

export default db;
