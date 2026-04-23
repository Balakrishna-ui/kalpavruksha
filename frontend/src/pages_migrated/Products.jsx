import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Leaf, UtensilsCrossed, HeartPulse, Sparkles, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Products = () => {
  const categories = [
    { name: 'All', icon: <Sparkles size={14} /> },
    { name: 'Ecolimits', icon: <Leaf size={14} /> },
    { name: 'Kulfis', icon: <UtensilsCrossed size={14} /> },
    { name: 'Honey', icon: <Sparkles size={14} /> },
    { name: 'Grameenam', icon: <UtensilsCrossed size={14} /> },
    { name: 'Niramaya', icon: <HeartPulse size={14} /> }
  ];

  const { addToCart, cart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sync state with URL parameter (Case-Insensitive)
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // Find matching category name from our list to ensure correct casing for UI highlighting
      const matchedCategory = categories.find(
        cat => cat.name.toLowerCase() === categoryParam.toLowerCase()
      );
      
      if (matchedCategory) {
        setActiveFilter(matchedCategory.name);
      } else {
        // Fallback for custom categories not in the static list
        setActiveFilter(categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1));
      }
      
      // Small delay to ensure content is rendered before scrolling
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      setActiveFilter('All');
    }
  }, [searchParams]);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', category.toLowerCase());
    }
    setSearchParams(newParams);
  };

  const hardcodedProductData = [];

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/products`);
        const data = await response.json();
        
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          // Fallback if DB is empty
          setProducts(hardcodedProductData);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(hardcodedProductData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getQuantity = (id) => {
    const item = cart.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  const filteredProducts = useMemo(() => {
    return products.filter(prod => {
      const matchesFilter = activeFilter === 'All' || 
                           prod.category.toLowerCase() === activeFilter.toLowerCase();
      const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm, products]);

  return (
    <div className="w-full min-h-screen bg-[#fcfbf9]">
      {/* Refined Header */}
      <section className="bg-forest pt-14 pb-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-1 tracking-tight">The <span className="text-gold">Product</span> World</h1>
          <p className="text-white/60 text-xs md:text-sm font-medium max-w-xl mx-auto">Discover the purity of village life with our curated organic range.</p>
        </div>
      </section>

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-10">
        
        {/* Sidebar - Left Column */}
        <aside className="w-full lg:w-64 shrink-0 space-y-8">
          {/* Sidebar Search */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gold transition-colors" size={14} />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-2xl text-xs font-medium focus:ring-2 focus:ring-gold/30 transition-all text-forest"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category List */}
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
            <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase mb-6 pl-1">Categories</h3>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleFilterChange(cat.name)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all whitespace-nowrap ${
                    activeFilter === cat.name 
                      ? 'bg-gold text-white shadow-lg shadow-gold/20' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-forest'
                  }`}
                >
                  <span className={activeFilter === cat.name ? 'text-white' : 'text-gray-300'}>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* New Arrivals Banner (Sidebar Decor) */}
          <div className="hidden lg:block bg-forest rounded-[32px] p-6 text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700"></div>
            <h4 className="text-gold font-black text-[10px] uppercase tracking-widest mb-2">Heritage</h4>
            <p className="text-xl font-bold leading-tight mb-4 text-white">100% Organic Trust</p>
            <Sparkles className="text-gold/30 mb-2" size={24} />
          </div>
        </aside>

        {/* Product Grid - Right Column */}
        <main className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((prod) => (
                <div 
                  key={prod.id} 
                  className="product-card bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 border border-gray-100/50 flex flex-col group h-full relative"
                >
                  {/* Top Image Section - Editorial Style */}
                  <div className="relative aspect-square overflow-hidden bg-[#fafaf9] flex items-center justify-center p-6">
                    <img 
                      src={prod.img} 
                      alt={prod.name} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000" 
                    />
                    
                    {/* Pill Badge - Top Left */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-forest/90 backdrop-blur-md text-white text-[8px] font-black px-3 py-1 rounded-full tracking-widest uppercase shadow-xl">
                        New
                      </span>
                    </div>
                  </div>

                  {/* Body Section - Clean & Balanced */}
                  <div className="p-5 pt-4 flex flex-col flex-grow text-center items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
                      {prod.category}
                    </span>
                    
                    <h3 className="text-base font-black text-forest mb-2 leading-tight group-hover:text-gold transition-colors">
                      {prod.name}
                    </h3>
                    
                    {/* Rating Section */}
                    <div className="flex items-center gap-1.5 mb-5">
                      <div className="flex text-gold">
                        {[...Array(5)].map((_, i) => (
                          <Sparkles key={i} size={8} fill={i < Math.floor(prod.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(prod.rating) ? 0 : 2} />
                        ))}
                      </div>
                      <span className="text-[9px] font-bold text-gray-300">({prod.reviews})</span>
                    </div>

                    <div className="mt-auto w-full">
                      {/* Price Section */}
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-xl font-black text-forest tracking-tighter">₹{prod.price}</span>
                        <span className="text-[10px] font-bold text-gray-300 line-through">₹{parseInt(prod.price) + 150}</span>
                      </div>
                      
                      <button 
                        onClick={() => addToCart(prod)}
                        className="w-full bg-forest text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-all shadow-[0_10px_20px_rgba(26,58,26,0.15)] active:scale-95 flex items-center justify-center gap-3 group/btn"
                      >
                        <ShoppingCart size={14} className="group-hover/btn:rotate-12 transition-transform" />
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[40px] shadow-sm border border-gray-100">
              <Sparkles className="mx-auto text-gray-200 mb-6" size={48} />
              <h3 className="text-xl font-black text-gray-400 uppercase tracking-widest">No Products Found</h3>
              <p className="text-gray-300 mt-2 text-sm italic">Try a different search or category filter.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
