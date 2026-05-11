import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Leaf, 
  UtensilsCrossed, 
  HeartPulse, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  ShoppingCart, 
  X, 
  Filter,
  ArrowUpDown
} from 'lucide-react';

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
    { name: 'Niramaya', icon: <HeartPulse size={16} /> }
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState('Ecolimits');
  const [sortBy, setSortBy] = useState('Price: Low to High');
  const [minPrice, setMinPrice] = useState('219');
  const [maxPrice, setMaxPrice] = useState('849');

  // Initial demo data if DB is empty
  const demoProducts = [
    { id: 1, name: 'Eco Cover Small', price: 219, category: 'Ecolimits', subcategory: 'Small Size', img: '/img/p1.png' },
    { id: 2, name: 'Eco Pouch Small', price: 229, category: 'Ecolimits', subcategory: 'Small Size', img: '/img/p2.jpg' },
    { id: 3, name: 'Eco Basket Small', price: 249, category: 'Ecolimits', subcategory: 'Small Size', img: '/img/p3.png' },
    { id: 4, name: 'Eco Bag Small', price: 259, category: 'Ecolimits', subcategory: 'Small Size', img: '/img/p4.jpg' },
    { id: 5, name: 'Eco Storage Box Small', price: 279, category: 'Ecolimits', subcategory: 'Small Size', img: '/img/p5.png' },
    { id: 6, name: 'Eco Bin Small', price: 289, category: 'Ecolimits', subcategory: 'Small Size', img: '/img/p6.png' },
    { id: 7, name: 'Eco Tissue Cover Small', price: 299, category: 'Ecolimits', subcategory: 'Small Size', img: '/img/p7.png' },
    { id: 8, name: 'Eco Bottle Bag Small', price: 319, category: 'Ecolimits', subcategory: 'Small Size', img: '/img/p8.png' },
    { id: 9, name: 'Organic Honey', price: 450, category: 'Honey', img: '/img/h1.png' },
    { id: 10, name: 'Rice Premium', price: 1200, category: 'Rice', img: '/img/r1.png' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/products`);
        const data = await response.json();
        if (data && data.length > 0) setProducts(data);
        else setProducts(demoProducts);
      } catch (error) {
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
      const matchesCat = activeCategory === 'All' || prod.category === activeCategory;
      const matchesSub = !activeSubcategory || prod.subcategory === activeSubcategory;
      const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = prod.price >= parseInt(minPrice || 0) && prod.price <= parseInt(maxPrice || 9999);
      return matchesCat && matchesSub && matchesSearch && matchesPrice;
    });
  }, [products, activeCategory, activeSubcategory, searchTerm, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-[#f8f7f5] pt-[120px] pb-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-[320px] space-y-6">
          {/* Search Box */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-[#f8f7f5] border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Categories Card */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8 px-2">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.name} className="space-y-2">
                  <button 
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 ${
                      activeCategory === cat.name 
                      ? 'bg-[#c5a059] text-white shadow-xl shadow-[#c5a059]/20' 
                      : 'text-slate-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={activeCategory === cat.name ? 'text-white' : 'text-gray-400'}>{cat.icon}</span>
                      <span className="text-[14px] font-bold">{cat.name}</span>
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
        <main className="flex-grow space-y-6">
          {/* Top Control Bar */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Sort By:</span>
              <div className="relative flex-grow md:flex-none">
                <select 
                  className="w-full md:w-48 bg-[#f8f7f5] border-none rounded-xl py-2 px-4 text-sm font-bold outline-none cursor-pointer appearance-none pr-10"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Min Price:</span>
                <input 
                  type="text" 
                  className="w-16 bg-[#f8f7f5] border-none rounded-xl py-2 px-3 text-sm font-bold text-center outline-none"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Max Price:</span>
                <input 
                  type="text" 
                  className="w-16 bg-[#f8f7f5] border-none rounded-xl py-2 px-3 text-sm font-bold text-center outline-none"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
              <button 
                onClick={() => {
                  setMinPrice('');
                  setMaxPrice('');
                  setActiveSubcategory(null);
                  setActiveCategory('All');
                }}
                className="w-full md:w-48 bg-[#c5a059] text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[#c5a059]/20"
              >
                Reset Filters
              </button>
            </div>
          </div>

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

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-[24px] h-[360px] animate-pulse border border-gray-100"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="group bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col relative">
                  {/* Heart Icon */}
                  <button className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
                    <Heart size={18} />
                  </button>

                  {/* Image Container */}
                  <div className="aspect-[4/5] overflow-hidden bg-[#fafaf9] p-8 flex items-center justify-center relative">
                    <img 
                      src={prod.img} 
                      alt={prod.name} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>

                  {/* Info Container */}
                  <div className="p-6 space-y-3 flex flex-col flex-grow">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{prod.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-slate-900">₹{prod.price}</span>
                      </div>
                    </div>

                    <button className="w-full bg-[#c5a059] text-white py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 mt-auto hover:bg-[#002d1d] transition-all duration-300 shadow-lg shadow-[#c5a059]/10">
                      <ShoppingCart size={14} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
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
