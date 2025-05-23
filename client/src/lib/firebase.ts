import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB8eB3_KHVp6WsT3NuhDviAnr6-TDB7-oc",
  authDomain: "pcshopx0.firebaseapp.com",
  projectId: "pcshopx0",
  storageBucket: "pcshopx0.firebasestorage.app",
  messagingSenderId: "904090994847",
  appId: "1:904090994847:web:1b8cca4a2b14d89a433aaa",
  measurementId: "G-YDKS8EFBBL"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;