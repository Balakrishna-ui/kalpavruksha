// src/api/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

/**
 * FIREBASE INTEGRATION STEP:
 * Replace the values below with your actual Firebase project configuration.
 * You can find this in the Firebase Console: Project Settings > General > Your apps.
 */
const firebaseConfig = {
  apiKey: "AIzaSyAdT8jenhN9Zxvuqt87YaScApjfPfz_Lsw",
  authDomain: "kalpavruksha-b69e2.firebaseapp.com",
  projectId: "kalpavruksha-b69e2",
  storageBucket: "kalpavruksha-b69e2.firebasestorage.app",
  messagingSenderId: "1001547840277",
  appId: "1:1001547840277:web:00ae607b53c42afc9d471c",
  measurementId: "G-FN94E3JKVR"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
