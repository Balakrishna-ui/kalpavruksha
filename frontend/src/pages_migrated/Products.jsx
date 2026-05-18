import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Leaf, 
  UtensilsCrossed, 
  HeartPulse, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase';

// Helper to provide premium details, tags and badges for products
const getProductDetails = (prod) => {
  const name = prod.name.toLowerCase();
  
  if (name.includes('tender coconut')) {
    return {
      description: 'Premium export quality for beverages & culinary use',
      badge: 'Fresh Harvest',
      tags: [
        { text: 'Export Forms', isGreen: false },
        { text: 'Export Grades', isGreen: true },
        { text: 'Packaging Options', isGreen: false }
      ]
    };
  }
  
  if (name.includes('husk coconut')) {
    return {
      description: 'Semi-husked & trimmed forms available for commercial use',
      badge: 'Custom Export',
      tags: [
        { text: 'Export Forms', isGreen: false },
        { text: 'Top Markets', isGreen: false },
        { text: 'Packaging', isGreen: true }
      ]
    };
  }

  if (name.includes('dried coconut') || name.includes('copra')) {
    return {
      description: 'High oil-content dried copra for extraction & culinary applications',
      badge: 'Best Seller',
      tags: [
        { text: 'Export Forms', isGreen: false },
        { text: 'Copra Packaging', isGreen: true },
        { text: 'Chips Packaging', isGreen: false }
      ]
    };
  }

  if (prod.category === 'Ecolimits') {
    return {
      description: '100% natural, biodegradable protective covers of premium durability.',
      badge: prod.subcategory === 'Extra Large' ? 'Custom Size' : null,
      tags: [
        { text: 'Eco-friendly', isGreen: false },
        { text: 'Premium Grade', isGreen: true },
        { text: prod.subcategory || 'Heavy Duty', isGreen: false }
      ]
    };
  }

  if (prod.category === 'Kulfis') {
    return {
      description: 'Rich, creamy traditional Indian frozen dessert crafted from pure milk.',
      badge: 'Organic',
      tags: [
        { text: 'Traditional', isGreen: false },
        { text: 'Pure Milk', isGreen: true },
        { text: 'Chemical-Free', isGreen: false }
      ]
    };
  }

  if (prod.category === 'Honey') {
    return {
      description: '100% pure raw wild forest honey, directly sourced and unprocessed.',
      badge: prod.price > 300 ? 'Premium Wild' : 'Pure Raw',
      tags: [
        { text: 'Wild Forest', isGreen: false },
        { text: 'Lab Certified', isGreen: true },
        { text: 'Unfiltered', isGreen: false }
      ]
    };
  }

  if (prod.category === 'Millets') {
    return {
      description: 'Nutritious, high-fiber gluten-free grains harvested sustainably.',
      badge: 'Superfood',
      tags: [
        { text: 'High Fiber', isGreen: false },
        { text: 'Gluten Free', isGreen: true },
        { text: 'Sustainably Grown', isGreen: false }
      ]
    };
  }

  if (prod.category === 'Cold Pressed Oils') {
    return {
      description: 'Traditionally extracted cold-pressed oil, preserving essential nutrients.',
      badge: '100% Pure',
      tags: [
        { text: 'Wood Pressed', isGreen: false },
        { text: 'Zero Chemical', isGreen: true },
        { text: '1-Liter Bottle', isGreen: false }
      ]
    };
  }

  if (prod.category === 'Rice') {
    return {
      description: 'Aromatic and nutrient-rich traditional Desi rice of premium quality.',
      badge: 'Fine Grain',
      tags: [
        { text: 'Desi Rice', isGreen: false },
        { text: 'Aromatic', isGreen: true },
        { text: 'Traditional', isGreen: false }
      ]
    };
  }

  if (prod.category === 'Vegetables') {
    return {
      description: 'Freshly harvested organic vegetables sourced directly from local member farms.',
      badge: 'Farm Fresh',
      tags: [
        { text: 'Farm Fresh', isGreen: false },
        { text: '100% Organic', isGreen: true },
        { text: 'Direct Sourced', isGreen: false }
      ]
    };
  }

  return {
    description: prod.description || 'Premium export quality sustainable crop products.',
    badge: prod.badgeLabel || null,
    tags: [
      { text: 'Premium Quality', isGreen: false },
      { text: 'Organic', isGreen: true },
      { text: 'Direct Sourced', isGreen: false }
    ]
  };
};

const Products = () => {
  const categories = [
    { name: 'All', icon: <Sparkles size={16} /> },
    { 
      name: 'Ecolimits', 
      icon: <Leaf size={16} />, 
      subcategories: [
        { name: 'Small Size', count: 8 },
        { name: 'Medium Size', count: 12 },
        { name: 'Large Size', count: 6 },
        { name: 'Extra Large', count: 3 }
      ] 
    },
    { name: 'Kulfis', icon: <UtensilsCrossed size={16} /> },
    { name: 'Honey', icon: <Sparkles size={16} /> },
    { name: 'Rice', icon: <Leaf size={16} /> },
    { name: 'Vegetables', icon: <Leaf size={16} /> },
    { name: 'Fruits', icon: <Sparkles size={16} /> },
    { name: 'Millets', icon: <Leaf size={16} /> },
    { name: 'Cold Pressed Oils', icon: <Sparkles size={16} /> }
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState('Ecolimits');
  const [sortBy, setSortBy] = useState('Price: Low to High');
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('2000');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Initial demo data if DB is empty
  const demoProducts = [
    { id: 1, name: 'Eco Cover Small', price: 219, category: 'Ecolimits', subcategory: 'Small Size', img: '/img/p1.png' },
    { id: 2, name: 'Eco Cover Medium', price: 349, category: 'Ecolimits', subcategory: 'Medium Size', img: '/img/p1.png' },
    { id: 3, name: 'Eco Cover Large', price: 499, category: 'Ecolimits', subcategory: 'Large Size', img: '/img/p1.png' },
    { id: 4, name: 'Eco Cover Extra Large', price: 599, category: 'Ecolimits', subcategory: 'Extra Large', img: '/img/p1.png' },
    { id: 5, name: 'Opalls Traditional Kulfies', price: 229, category: 'Kulfis', img: '/img/p2.jpg' },
    { id: 6, name: 'Jamun Honey', price: 299, category: 'Honey', img: '/img/hn1.png' },
    { id: 8, name: 'Eucalyptus Honey', price: 350, category: 'Honey', img: '/img/hn2.png' },
    { id: 80, name: 'Neem Honey', price: 399, category: 'Honey', img: '/img/hn3.png' },
    { id: 81, name: 'Multiflora Honey', price: 420, category: 'Honey', img: '/img/hn4.png' },
    { id: 82, name: 'Tulsi Honey', price: 450, category: 'Honey', img: '/img/hn5.png' },
    { id: 7, name: 'Finger Millet – Ragi (1kg)', price: 175, category: 'Millets', img: '/img/ml1.png' },
    { id: 19, name: 'Jowar Millet (1kg)', price: 160, category: 'Millets', img: '/img/ml2.png' },
    { id: 20, name: 'Pearl Millet (1kg)', price: 140, category: 'Millets', img: '/img/ml3.png' },
    { id: 21, name: 'Kodo Millet (1kg)', price: 130, category: 'Millets', img: '/img/ml4.png' },
    { id: 22, name: 'Brown Top Millet (1kg)', price: 180, category: 'Millets', img: '/img/ml6.png' },
    { id: 23, name: 'Barnyard Millet (1kg)', price: 170, category: 'Millets', img: '/img/ml7.png' },
    { id: 11, name: 'Groundnut Cold Pressed Oil (1L)', price: 499, category: 'Cold Pressed Oils', img: '/img/oil1.png' },
    { id: 12, name: 'Sesame Cold Pressed Oil (1L)', price: 549, category: 'Cold Pressed Oils', img: '/img/oil2.png' },
    { id: 13, name: 'Coconut Cold Pressed Oil (1L)', price: 450, category: 'Cold Pressed Oils', img: '/img/oil3.jpeg' },
    { id: 14, name: 'Mustard Cold Pressed Oil (1L)', price: 399, category: 'Cold Pressed Oils', img: '/img/oil4.png' },
    { id: 15, name: 'Sunflower Cold Pressed Oil (1L)', price: 420, category: 'Cold Pressed Oils', img: '/img/oil5.png' },
    { id: 9, name: 'Navara Rice', price: 1400, category: 'Rice', img: '/img/rc1.png' },
    { id: 90, name: 'Kulakar Rice', price: 1650, category: 'Rice', img: '/img/rc2.png' },
    { id: 91, name: 'Indrani Rice', price: 1500, category: 'Rice', img: '/img/rc3.png' },
    { id: 92, name: 'Thala Bhat Rice', price: 1350, category: 'Rice', img: '/img/rc4.png' },
    { id: 93, name: 'Chitti Muthyalu Rice', price: 1800, category: 'Rice', img: '/img/rc5.png' },
    { id: 10, name: 'Red Onions', price: 40, category: 'Vegetables', img: '/img/vg1.png' },
    { id: 100, name: 'Fresh Tomatoes', price: 50, category: 'Vegetables', img: '/img/vg7.png' },
    { id: 101, name: 'Drumsticks (Moringa)', price: 25, category: 'Vegetables', img: '/img/vg3.png' },
    { id: 102, name: 'Fresh Curry Leaves', price: 35, category: 'Vegetables', img: '/img/vg4.png' },
    { id: 103, name: 'Fresh Spinach', price: 45, category: 'Vegetables', img: '/img/vg5.png' },
    { id: 104, name: 'Fresh Coriander Leaves', price: 30, category: 'Vegetables', img: '/img/vg6.png' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        
        if (!snapshot.empty) {
          const fetchedProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
          // Check if there are any demoProducts not yet present in Firestore or with different images
          const batch = writeBatch(db);
          let needsUpdate = false;

          demoProducts.forEach((demo) => {
            const fetched = fetchedProducts.find(f => f.id.toString() === demo.id.toString());
            if (!fetched) {
              const newDocRef = doc(productsRef, demo.id.toString());
              batch.set(newDocRef, demo);
              needsUpdate = true;
            } else {
              // Check if any property has changed and update it
              const changedFields = {};
              if (fetched.name !== demo.name) changedFields.name = demo.name;
              if (fetched.price !== demo.price) changedFields.price = demo.price;
              if (fetched.category !== demo.category) changedFields.category = demo.category;
              if (fetched.subcategory !== demo.subcategory) changedFields.subcategory = demo.subcategory || null;
              if (fetched.img !== demo.img) changedFields.img = demo.img;

              if (Object.keys(changedFields).length > 0) {
                const docRef = doc(productsRef, fetched.id.toString());
                batch.update(docRef, changedFields);
                needsUpdate = true;
              }
            }
          });

          if (needsUpdate) {
            await batch.commit();
            
            // Re-fetch database to get completely merged and updated list
            const updatedSnapshot = await getDocs(productsRef);
            const updatedProducts = updatedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(updatedProducts);
          } else {
            setProducts(fetchedProducts);
          }
        } else {
          // If Firestore is empty, populate it with demo products
          const batch = writeBatch(db);
          demoProducts.forEach((product) => {
            const newDocRef = doc(productsRef, product.id.toString());
            batch.set(newDocRef, product);
          });
          await batch.commit();
          setProducts(demoProducts);
        }
      } catch (error) {
        console.error("Error fetching from Firebase:", error);
        setProducts(demoProducts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchQuery = searchParams.get('search');
    
    if (categoryParam) {
      const matched = categories.find(c => c.name.toLowerCase() === categoryParam.toLowerCase());
      if (matched) {
        setActiveCategory(matched.name);
      }
    }
    
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
    
    // Force instant scroll to top on any search params change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryClick = (catName) => {
    setActiveCategory(catName);
    setActiveSubcategory(null);
    if (expandedCategory === catName) setExpandedCategory(null);
    else setExpandedCategory(catName);
    
    const newParams = new URLSearchParams(searchParams);
    if (catName === 'All') newParams.delete('category');
    else newParams.set('category', catName.toLowerCase());
    setSearchParams(newParams);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(prod => {
      const isCoconut = prod.name.toLowerCase().includes('coconut') || prod.img.toLowerCase().includes('coconut') || prod.name.toLowerCase().includes('copra');
      if (isCoconut) return false;

      const matchesCat = activeCategory === 'All' || prod.category === activeCategory;
      const matchesSub = !activeSubcategory || prod.subcategory === activeSubcategory;
      const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = prod.price >= parseInt(minPrice || 0) && prod.price <= parseInt(maxPrice || 9999);
      return matchesCat && matchesSub && matchesSearch && matchesPrice;
    });
  }, [products, activeCategory, activeSubcategory, searchTerm, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-[#f8f7f5] pt-[100px] md:pt-[120px] pb-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-4 md:gap-8">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-[320px] space-y-3 md:space-y-6">
          {/* Search Box */}
          <div className="bg-white p-3 md:p-6 rounded-[24px] shadow-sm border border-gray-100">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-[#f8f7f5] border-none rounded-2xl py-2 md:py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Categories Card */}
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            <button 
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="w-full flex items-center justify-between p-4 md:p-6 md:cursor-default"
            >
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 px-2">Categories</h3>
              <div className="md:hidden">
                {isMobileFilterOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </div>
            </button>
            
            <div className={`${isMobileFilterOpen ? 'block' : 'hidden md:block'} p-6 pt-0 space-y-2`}>
              {categories.map((cat) => (
                <div key={cat.name} className="space-y-2">
                  <button 
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
                      activeCategory === cat.name 
                      ? 'bg-[#c5a059] text-white shadow-xl shadow-[#c5a059]/20' 
                      : 'text-slate-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={activeCategory === cat.name ? 'text-white' : 'text-gray-400'}>{cat.icon}</span>
                      <span className="text-xs md:text-[14px] font-bold">{cat.name}</span>
                    </div>
                    {cat.subcategories && (
                      expandedCategory === cat.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>

                  {/* Subcategories Dropdown */}
                  {cat.subcategories && expandedCategory === cat.name && (
                    <div className="pl-6 pt-2 pb-4 space-y-1 relative">
                      <div className="absolute left-[30px] top-0 bottom-6 w-[1px] bg-gray-100"></div>
                      {cat.subcategories.map((sub) => (
                        <button 
                          key={sub.name}
                          onClick={() => setActiveSubcategory(sub.name)}
                          className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-[13px] font-semibold transition-all relative ${
                            activeSubcategory === sub.name ? 'text-[#c5a059]' : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full border-2 bg-white transition-all ${
                              activeSubcategory === sub.name ? 'border-[#c5a059] scale-125 shadow-sm' : 'border-gray-100'
                            }`}>
                              {activeSubcategory === sub.name && <div className="w-1 h-1 bg-[#c5a059] rounded-full mx-auto mt-[2px]"></div>}
                            </div>
                            {sub.name}
                          </div>
                          <span className="text-[11px] opacity-60">({sub.count})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow space-y-3 md:space-y-6">

          {/* Active Tags */}
          <div className="flex flex-wrap items-center gap-3">
            {activeCategory !== 'All' && (
              <div className="bg-[#c5a05911] text-[#c5a059] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-[#c5a05922]">
                Category: {activeCategory}
                <X size={14} className="cursor-pointer hover:scale-110 transition-transform" onClick={() => handleCategoryClick('All')} />
              </div>
            )}
            {activeSubcategory && (
              <div className="bg-[#c5a05911] text-[#c5a059] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-[#c5a05922]">
                Size: {activeSubcategory}
                <X size={14} className="cursor-pointer hover:scale-110 transition-transform" onClick={() => setActiveSubcategory(null)} />
              </div>
            )}
            <span className="text-[11px] font-bold text-slate-400 ml-auto uppercase tracking-widest">
              Showing {filteredProducts.length > 0 ? `1-${filteredProducts.length}` : '0'} of {products.length} products
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-[24px] h-[250px] md:h-[360px] animate-pulse border border-gray-100"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-8">
              {filteredProducts.map((prod) => {
                const details = getProductDetails(prod);
                const slug = prod.slug || prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return (
                  <div key={prod.id} className="group bg-white rounded-[16px] sm:rounded-[24px] md:rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_5px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col relative p-3 sm:p-4 md:p-6">
                    
                    {/* Top-Right Badge (e.g. Custom Export, Fresh Harvest, Best Seller) */}
                    {details.badge && (
                      <span className="absolute top-2.5 right-2.5 sm:top-5 sm:right-5 md:top-8 md:right-8 z-10 bg-[#F9C312] text-white text-[8px] sm:text-[9px] md:text-[10px] font-extrabold uppercase tracking-widest px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-xl shadow-sm">
                        {details.badge}
                      </span>
                    )}

                    {/* Product Image Container */}
                    <div className="relative w-full aspect-square flex items-center justify-center bg-white rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 md:mb-6 p-2 sm:p-4 border border-gray-50">
                      <img 
                        src={prod.img} 
                        alt={prod.name} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col flex-grow">
                      {/* Title */}
                      <h3 className="font-bold text-xs sm:text-base md:text-lg lg:text-xl text-[#0B1F4D] tracking-tight leading-snug line-clamp-1 mb-1 sm:mb-2">
                        {prod.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-[10px] sm:text-xs md:text-sm text-[#6B7280] font-normal leading-relaxed mb-2 sm:mb-4 line-clamp-2 h-7 sm:h-9 md:h-10">
                        {details.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4 md:mb-6">
                        {details.tags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className={`text-[8px] sm:text-[9px] md:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md tracking-wide ${
                              tag.isGreen 
                                ? 'bg-[#E8F8F0] text-[#047857] border border-[#A7F3D0]/20' 
                                : 'bg-[#F3F4F6] text-[#4B5563]'
                            }`}
                          >
                            {tag.text}
                          </span>
                        ))}
                      </div>

                      {/* Action Row */}
                      <div className="flex items-center mt-auto pt-2">
                        {/* Enquire Now WhatsApp Green Button */}
                        <a 
                          href={`https://wa.me/919392509079?text=${encodeURIComponent(
                            `Hello, I am interested in the following product:\nProduct:* ${prod.name}\nDescription: ${details.description}\nSelected Type: ${details.tags[0]?.text || 'Premium'}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm font-bold tracking-wider transition-all duration-300 shadow-sm"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          Enquire Now
                        </a>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {!isLoading && filteredProducts.length === 0 && (
            <div className="py-32 text-center bg-white rounded-[32px] border border-gray-100 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Products Found</h3>
              <p className="text-slate-400 text-sm">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
