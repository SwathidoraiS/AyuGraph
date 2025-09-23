// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBtBuSQ53YH8HRpdfTbHQZiLut1JriRMdo",
  authDomain: "ayufitmvp.firebaseapp.com",
  projectId: "ayufitmvp",
  storageBucket: "ayufitmvp.firebasestorage.app",
  messagingSenderId: "901748727317",
  appId: "1:901748727317:web:13945b1f8a10086a72b81c",
  measurementId: "G-B9TQ2917JW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth object to use in Login/Signup pages
export const db = getFirestore(app);

export const auth = getAuth(app);
