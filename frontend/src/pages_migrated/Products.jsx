import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Leaf, UtensilsCrossed, HeartPulse, Sparkles, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { addToCart, cart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Sync state with URL parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveFilter(categoryParam);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveFilter('All');
    }
  }, [searchParams]);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const categories = [
    { name: 'All', icon: <Sparkles size={14} /> },
    { name: 'Ecolimits', icon: <Leaf size={14} /> },
    { name: 'Kulfis', icon: <UtensilsCrossed size={14} /> },
    { name: 'Honey', icon: <Sparkles size={14} /> },
    { name: 'Grameenam', icon: <UtensilsCrossed size={14} /> },
    { name: 'Niramaya', icon: <HeartPulse size={14} /> }
  ];

  const productData = [
    {
      id: 1,
      name: 'Organic Vegetables',
      category: 'Ecolimits',
      group: 'Eco & Sustainability',
      desc: 'Fresh, certified organic vegetables sourced directly from our local member farmers.',
      img: '/img/im1.PNG',
      price: '120',
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'Natural Ripe Fruits',
      category: 'Kulfis',
      group: 'Food & Natural Products',
      desc: 'Naturally ripened seasonal fruits, free from harmful chemicals.',
      img: '/assets/prod_fruits_1773805497331.png',
      price: '280',
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: 'Pure Wild Honey',
      category: 'Honey',
      group: 'Food & Natural Products',
      desc: '100% pure, raw, and unprocessed honey collected from wild forest hives.',
      img: '/assets/prod_honey_1773805513434.png',
      price: '450',
      rating: 5.0,
      reviews: 210
    },
    {
      id: 4,
      name: 'Village Products',
      category: 'Grameenam',
      group: 'Food & Natural Products',
      desc: 'Traditional homemade essentials crafted with care by village artisans.',
      img: '/assets/prod_graminam_1773805557221.png',
      price: '150',
      rating: 4.7,
      reviews: 56
    },
    {
      id: 5,
      name: 'Wellness Range',
      category: 'Niramaya',
      group: 'Health & Wellness',
      desc: 'Authentic Ayurvedic and natural wellness products for a healthy lifestyle.',
      img: '/assets/prod_veg_1773805467767.png',
      price: '580',
      rating: 4.9,
      reviews: 145
    }
  ];

  const getQuantity = (id) => {
    const item = cart.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  const filteredProducts = useMemo(() => {
    return productData.filter(prod => {
      const matchesFilter = activeFilter === 'All' || prod.category === activeFilter;
      const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
                <div 
                  key={prod.id} 
                  className="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col group h-full"
                >
                  {/* Top Image Section */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img 
                      src={prod.img} 
                      alt={prod.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    />
                    {/* NEW Badge */}
                    <div className="absolute top-2 left-2">
                      <span className="bg-[#2d5a27]/90 backdrop-blur-md text-white text-[7px] font-black px-2 py-0.5 rounded-md tracking-widest uppercase shadow-lg">New</span>
                    </div>
                  </div>

                  {/* Body Section */}
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-[8px] font-bold text-forest/30 uppercase tracking-[0.2em] mb-0.5">
                      {prod.category}
                    </span>
                    <h3 className="text-sm font-black text-forest mb-1 leading-tight group-hover:text-gold transition-colors">
                      {prod.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-gold">
                        {[...Array(5)].map((_, i) => (
                          <Sparkles key={i} size={7} fill={i < Math.floor(prod.rating) ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <span className="text-[8px] font-bold text-gray-400">({prod.reviews})</span>
                    </div>

                    <div className="mt-auto pt-2 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-black text-forest">₹{prod.price}</span>
                        <span className="text-[8px] font-bold text-gray-300 line-through">₹{parseInt(prod.price) + 150}</span>
                      </div>
                      
                      <button 
                        onClick={() => addToCart(prod)}
                        className="w-full bg-forest text-white py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-gold transition-all shadow-md active:scale-95"
                      >
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
