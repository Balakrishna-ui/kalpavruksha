import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdT8jenhN9Zxvuqt87YaScApjfPfz_Lsw",
  authDomain: "kalpavruksha-b69e2.firebaseapp.com",
  projectId: "kalpavruksha-b69e2",
  storageBucket: "kalpavruksha-b69e2.firebasestorage.app",
  messagingSenderId: "1001547840277",
  appId: "1:1001547840277:web:00ae607b53c42afc9d471c",
  measurementId: "G-FN94E3JKVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
