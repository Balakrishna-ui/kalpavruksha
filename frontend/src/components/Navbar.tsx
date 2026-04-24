import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Close dropdown when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'Divisions',
      path: '/divisions',
      dropdown: [
        { name: 'Agriculture', path: '/div-agri' },
        { name: 'Financial', path: '/divisions/financial' },
        { name: 'Manufacturing', path: '/div-mfg' },
        { name: 'Education', path: '/div-edu' },
      ]
    },
    { name: 'Products', path: '/products' },
    { name: 'Projects', path: '/projects' },
    {
      name: 'Services',
      path: '/services',
      dropdown: [
        { name: 'Consultancy', path: '/svc-consultancy' },
        { name: 'Digital', path: '/svc-digital' },
        { name: 'Agri Services', path: '/svc-agri' },
      ]
    },
    { name: 'Contact', path: '/contact' },
    { name: 'Allied Services', path: '/allied-services' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isProductsPage = location.pathname === '/products';

  return (
    <nav className="fixed w-full z-50 top-0 left-0">
      {/* Top Contact Bar */}
      <div className="bg-[#0B3D2E] text-white py-1.5 px-6 flex justify-between items-center text-xs">
        <span>Empowering Communities Through Agriculture &amp; Finance</span>
        <div className="hidden md:flex items-center gap-4">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
            Hyderabad, Telangana
          </span>
          <span className="w-px h-3 bg-white/40"></span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            info@kalpavruksha.co
          </span>
        </div>
      </div>

      {/* Main White Navbar */}
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-[1700px] mx-auto px-4 md:px-6 lg:px-16">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative">
                <img src="/img/logoo.PNG" alt="Logo" className="h-9 w-9 object-contain transition-transform group-hover:scale-110 duration-500" />
                <div className="absolute inset-0 bg-gold/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="leading-tight">
                <div className="font-black text-sm md:text-base text-forest tracking-tighter uppercase">KALPAVRUKSHA</div>
                <div className="text-[8px] text-gray-400 font-black uppercase tracking-[0.2em]">COOPERATIVE SOCIETY</div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {navLinks.map((link) => {
                // Suppress Products dropdown when on the /products page
                const suppressDropdown = isProductsPage && link.name === 'PRODUCTS';
                return (
                  <div
                    key={link.name}
                    className="relative group h-16 flex items-center"
                    onMouseEnter={() => !suppressDropdown && setOpenDropdown(link.name)}
                    onMouseLeave={() => !suppressDropdown && setOpenDropdown(null)}
                  >
                    {link.name === 'Divisions' ? (
                      <span
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-[16px] xl:text-[17px] font-semibold tracking-tight transition-all duration-300 whitespace-nowrap rounded-lg cursor-default
                          ${isActive(link.path)
                            ? 'bg-[#E8F0EE] text-black shadow-sm'
                            : 'text-black hover:bg-[#E8F0EE] hover:text-black hover:shadow-sm'
                          }`}
                      >
                        {link.name}
                        {link.dropdown && !suppressDropdown && (
                          <ChevronDown 
                            size={14} 
                            className={`mt-0.5 text-black transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`} 
                          />
                        )}
                      </span>
                    ) : (
                      <Link
                        to={link.path}
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-[16px] xl:text-[17px] font-semibold tracking-tight transition-all duration-300 whitespace-nowrap rounded-lg
                          ${isActive(link.path)
                            ? 'bg-[#E8F0EE] text-black shadow-sm'
                            : 'text-black hover:bg-[#E8F0EE] hover:text-black hover:shadow-sm'
                          }`}
                      >
                        {link.name}
                        {link.dropdown && !suppressDropdown && (
                          <ChevronDown 
                            size={14} 
                            className={`mt-0.5 text-black transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`} 
                          />
                        )}
                      </Link>
                    )}

                    {link.dropdown && !suppressDropdown && openDropdown === link.name && (
                      <div className="absolute top-[64px] left-1/2 -translate-x-1/2 bg-white shadow-2xl rounded-2xl py-3 min-w-[220px] z-50 border border-gray-100 animate-fadeInUp">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="block px-6 py-2.5 text-[16px] font-semibold text-black hover:bg-gold/5 hover:text-black transition-all"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1 lg:gap-6">
              {/* Desktop Actions (lg and up) */}
              <div className="hidden lg:flex items-center gap-6">
                <div className="flex items-center bg-white rounded-full px-1.5 py-1 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500">
                  <button className="w-8 h-8 flex items-center justify-center text-forest/40 hover:text-gold hover:bg-gold/5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95">
                    <Search size={16} strokeWidth={2.5} />
                  </button>
                  <div className="w-px h-4 bg-gray-100 mx-1"></div>
                  <Link to="/cart" className="w-8 h-8 flex items-center justify-center text-forest/40 hover:text-gold hover:bg-gold/5 rounded-full relative transition-all duration-300 hover:scale-110 active:scale-95">
                    <ShoppingCart size={16} strokeWidth={2.5} />
                    {totalItems > 0 && (
                      <span className="absolute top-1 right-1 bg-gold text-forest text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg ring-1 ring-white">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                  <div className="w-px h-4 bg-gray-100 mx-1"></div>
                  <button className="w-8 h-8 flex items-center justify-center text-forest/40 hover:text-gold hover:bg-gold/5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95">
                    <User size={16} strokeWidth={2.5} />
                  </button>
                </div>
                <Link
                  to="/membership"
                  className="bg-forest text-white text-[14px] xl:text-[15px] font-bold px-5 xl:px-6 py-2.5 rounded-lg hover:bg-[#124d3b] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-2 whitespace-nowrap"
                >
                  Become a Member
                </Link>
              </div>

              {/* Mobile Actions (Visible only on mobile) */}
              <div className="flex lg:hidden items-center gap-1">
                {/* Cart Icon */}
                <Link to="/cart" className="p-2 text-gray-700 relative hover:bg-gray-50 rounded-full transition-all">
                  <ShoppingCart size={22} strokeWidth={2} />
                  {totalItems > 0 && (
                    <span className="absolute top-1 right-1 bg-gold text-forest text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                      {totalItems}
                    </span>
                  )}
                </Link>

                {/* User Profile Pill */}
                <div className="flex items-center gap-0.5 bg-gray-50 hover:bg-gray-100 transition-colors rounded-full pl-2 pr-3 py-1.5 border border-gray-100 shadow-sm ml-1 cursor-pointer">
                  <div className="bg-white rounded-full p-1 shadow-sm">
                    <User size={16} className="text-gray-500" />
                  </div>
                  <ChevronDown size={14} className="text-gray-400" />
                </div>

                {/* Hamburger Menu */}
                <button
                  className="p-2 text-gray-700 hover:bg-gray-50 rounded-full transition-colors ml-1"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Accordion UI Upgrade */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-2xl fixed w-full left-0 top-[112px] md:top-[112px] z-40 max-h-[calc(100vh-112px)] overflow-y-auto animate-fadeInDown">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => {
              const hasDropdown = link.dropdown && link.dropdown.length > 0;
              const isOpen = openDropdown === link.name;
              
              return (
                <div key={link.name} className="border-b border-gray-50 last:border-0 pb-1.5 mb-1.5 last:mb-0 last:pb-0">
                  {hasDropdown ? (
                    <div className="flex flex-col">
                      <button
                        onClick={() => setOpenDropdown(isOpen ? null : link.name)}
                        className={`flex items-center justify-between py-2.5 px-6 font-bold text-[17px] tracking-tight rounded-xl transition-all w-full text-left
                          ${isOpen ? 'bg-gold/5 text-forest' : 'text-black hover:bg-gray-50'}`}
                      >
                        <span className="flex items-center gap-3">
                          {link.name}
                        </span>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold' : 'text-gray-400'}`} 
                        />
                      </button>

                      {/* Accordion Content */}
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out pl-6
                          ${isOpen ? 'max-h-[500px] opacity-100 mt-1 pb-2' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="space-y-0.5">

                          
                          {link.dropdown?.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className={`block py-2 px-6 text-[15px] font-semibold transition-all rounded-lg
                                ${isActive(item.path) ? 'text-gold bg-gold/5' : 'text-black/70 hover:text-black hover:bg-gray-50'}`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block py-2.5 px-6 font-bold text-[17px] tracking-tight rounded-xl transition-all
                        ${isActive(link.path) ? 'bg-[#E8F0EE] text-black' : 'text-black hover:bg-gray-50'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              );
            })}
            
            <div className="pt-4 border-t border-gray-100 flex flex-col items-center gap-6">
              {/* Mobile Search Bar */}
              <div className="w-[90%]">
                <div className="relative group">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-[16px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-gold/20 focus:border-gold/30 transition-all"
                  />
                </div>
              </div>

              <Link
                to="/membership"
                className="flex items-center justify-center gap-3 bg-forest text-white font-black py-3.5 rounded-xl shadow-lg active:scale-95 transition-all text-[16px] uppercase tracking-widest w-[90%] mb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
