// clearFirebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdT8jenhN9Zxvuqt87YaScApjfPfz_Lsw",
  authDomain: "kalpavruksha-b69e2.firebaseapp.com",
  projectId: "kalpavruksha-b69e2",
  storageBucket: "kalpavruksha-b69e2.firebasestorage.app",
  messagingSenderId: "1001547840277",
  appId: "1:1001547840277:web:00ae607b53c42afc9d471c",
  measurementId: "G-FN94E3JKVR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const collections = [
  "leads",
  "members",
  "financial_enquiries",
  "services",
  "contact_requests"
];

async function clearCollections() {
  console.log("Starting Firebase Firestore cleanup...");
  for (const colName of collections) {
    try {
      const querySnapshot = await getDocs(collection(db, colName));
      console.log(`Found ${querySnapshot.size} documents in collection "${colName}".`);
      
      const deletePromises = [];
      querySnapshot.forEach((document) => {
        const docRef = doc(db, colName, document.id);
        deletePromises.push(deleteDoc(docRef));
      });
      
      await Promise.all(deletePromises);
      console.log(`Successfully cleared collection "${colName}".`);
    } catch (error) {
      console.error(`Error clearing collection "${colName}":`, error);
    }
  }
  console.log("Firebase Firestore cleanup complete.");
  process.exit(0);
}

clearCollections();
