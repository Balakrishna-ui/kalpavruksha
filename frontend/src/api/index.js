import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  doc, 
  setDoc,
  addDoc, 
  updateDoc, 
  deleteDoc,
  orderBy
} from 'firebase/firestore';

export const productApi = {
  getAll: async () => {
    const q = collection(db, 'products');
    const snapshot = await getDocs(q);
    return { data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
  },
  getBySlug: async (slug) => {
    const q = query(collection(db, 'products'), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) throw new Error('Product not found');
    return { data: { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } };
  }
};

export const projectApi = {
  getAll: async () => {
    const q = collection(db, 'projects');
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      const demoProjects = [
        {
          id: 'mana-palle-1',
          slug: 'mana-palle-phase-1',
          name: 'Mana Palle Phase 1',
          emoji: '🌱',
          status: 'ongoing',
          progress: 68,
          description: 'A self-sustaining eco-village combining modern amenities with rural serenity. Construction of 120 eco-friendly homes in the first phase of our sustainable village project.',
          vision: 'A self-sustaining eco-village combining modern amenities with rural serenity.',
          badgeLabel: 'Ongoing Project',
          mainImg: '/img/mana_hero.png',
          createdAt: new Date().toISOString()
        }
      ];
      for (const proj of demoProjects) {
        await setDoc(doc(db, 'projects', proj.id), proj);
      }
      return { data: demoProjects };
    }
    return { data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
  },
  getById: async (id) => {
    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('Project not found');
    return { data: { id: docSnap.id, ...docSnap.data() } };
  },
  getBySlug: async (slug) => {
    const q = query(collection(db, 'projects'), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      if (slug === 'mana-palle-phase-1') {
        return {
          data: {
            id: 'mana-palle-1',
            slug: 'mana-palle-phase-1',
            name: 'Mana Palle Phase 1',
            emoji: '🌱',
            status: 'ongoing',
            progress: 68,
            description: 'A self-sustaining eco-village combining modern amenities with rural serenity. Construction of 120 eco-friendly homes in the first phase of our sustainable village project.',
            vision: 'A self-sustaining eco-village combining modern amenities with rural serenity.',
            badgeLabel: 'Ongoing Project',
            mainImg: '/img/mana_hero.png',
            createdAt: new Date().toISOString()
          }
        };
      }
      throw new Error('Project not found');
    }
    return { data: { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } };
  }
};

export const adminApi = {
  getMembers: async (params) => {
    try {
      const q = query(collection(db, 'members'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return { data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
    } catch (e) {
      return { data: [] };
    }
  },
  getSchemeStats: async () => {
    try {
      const q = collection(db, 'members');
      const snapshot = await getDocs(q);
      const members = snapshot.docs.map(doc => doc.data());
      
      const groups = {};
      members.forEach(m => {
        const type = m.membershipType || 'Standard';
        groups[type] = (groups[type] || 0) + 1;
      });
      
      const schemes = Object.keys(groups).map(key => ({
        membershipType: key,
        _count: { id: groups[key] }
      }));
      
      return { data: { schemes, total: members.length } };
    } catch (e) {
      return { data: { schemes: [], total: 0 } };
    }
  },
  getEnquiries: async (params) => {
    try {
      const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return { data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
    } catch (e) {
      return { data: [] };
    }
  },
  getFinancialEnquiries: async (params) => {
    try {
      const q = query(collection(db, 'financialEnquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return { data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
    } catch (e) {
      return { data: [] };
    }
  },
  getOrders: async () => {
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return { data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
    } catch (e) {
      return { data: [] };
    }
  },
  exportMembers: async (params) => {
    const q = query(collection(db, 'members'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return { data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
  },
  exportEnquiries: async (params) => {
    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return { data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
  },
  exportFinancialEnquiries: async (params) => {
    const q = query(collection(db, 'financialEnquiries'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return { data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
  },
  getServices: async (params) => {
    try {
      const q = query(collection(db, 'serviceEnquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return { data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
    } catch (e) {
      return { data: [] };
    }
  },
  exportServices: async (params) => {
    const q = query(collection(db, 'serviceEnquiries'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return { data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
  },
  updateServiceStatus: async (id, status) => {
    const docRef = doc(db, 'serviceEnquiries', id);
    await updateDoc(docRef, { status });
    return { data: { id, status } };
  },
  updateEnquiryStatus: async (id, status) => {
    const docRef = doc(db, 'enquiries', id);
    await updateDoc(docRef, { status });
    return { data: { id, status } };
  },
  updateFinancialEnquiryStatus: async (id, status) => {
    const docRef = doc(db, 'financialEnquiries', id);
    await updateDoc(docRef, { status });
    return { data: { id, status } };
  },
  deleteEnquiry: async (id) => {
    const docRef = doc(db, 'enquiries', id);
    await deleteDoc(docRef);
    return { data: { id } };
  },
  deleteFinancialEnquiry: async (id) => {
    const docRef = doc(db, 'financialEnquiries', id);
    await deleteDoc(docRef);
    return { data: { id } };
  }
};

export default db;
