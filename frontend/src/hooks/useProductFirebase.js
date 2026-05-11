// src/hooks/useProductFirebase.js
import { useState, useEffect } from 'react';
import { db } from '../api/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

/**
 * MNC-LEVEL CLOUD UPGRADE:
 * This hook fetches product data directly from Firebase Firestore.
 * It eliminates the need for a local Node.js server for data retrieval.
 */
export const useProductFirebase = (slug) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductFromFirestore = async () => {
      try {
        setLoading(true);
        
        // 1. Reference the 'products' collection in Firestore
        const productsRef = collection(db, "products");
        
        // 2. Create a query to find the product by its unique slug
        const q = query(productsRef, where("slug", "==", slug));
        
        // 3. Execute the query
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          // 4. Extract data from the first matching document
          setProduct(querySnapshot.docs[0].data());
          setError(null);
        } else {
          setError('Product not found in Firestore');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch from Firebase');
        console.error('Firebase Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProductFromFirestore();
    }
  }, [slug]);

  return { product, loading, error };
};
