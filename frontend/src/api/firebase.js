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
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "kalpavruksha-web.firebaseapp.com",
  projectId: "kalpavruksha-web",
  storageBucket: "kalpavruksha-web.appspot.com",
  messagingSenderId: "REPLACE_WITH_SENDER_ID",
  appId: "REPLACE_WITH_APP_ID"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
