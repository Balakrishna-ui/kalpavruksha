// src/api/firebaseEnquiry.js
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * MNC-LEVEL LEAD CAPTURE:
 * Submits lead/enquiry data directly to Firestore.
 */
export const submitEnquiryToFirebase = async (formData) => {
  try {
    const enquiriesRef = collection(db, "enquiries");
    
    const docRef = await addDoc(enquiriesRef, {
      ...formData,
      status: "New",
      createdAt: serverTimestamp(), // Uses Firebase server time for accuracy
    });

    console.log("Enquiry submitted with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error };
  }
};
