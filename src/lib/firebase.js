
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore}from 'firebase/firestore'
import {getFunctions} from 'firebase/functions'
//initialize the firestore db

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE,
    authDomain: "hypnotic-trees-328016.firebaseapp.com",
    projectId: "hypnotic-trees-328016",
    storageBucket: "hypnotic-trees-328016.appspot.com",
    messagingSenderId: "761017450319",
    appId: "1:761017450319:web:5664ca82592d283e8c0f3a",
    measurementId: "G-MW7B6FFSV8"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db=getFirestore(app);
  const functions=getFunctions(app);

export {db,functions};
