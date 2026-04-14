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
    { name: 'HOME', path: '/' },
    {
      name: 'DIVISIONS',
      path: '/divisions',
      dropdown: [
        { name: 'Agriculture', path: '/div-agri' },
        { name: 'Financial', path: '/divisions/financial' },
        { name: 'Manufacturing', path: '/div-mfg' },
        { name: 'Education', path: '/div-edu' },
        { name: 'Services', path: '/div-svc' },
      ]
    },
    {
      name: 'PRODUCTS',
      path: '/products',
      dropdown: [
        { name: 'Categories', path: '/prod-cats' },
        { name: 'Descriptions', path: '/prod-descs' },
        { name: 'Pricing', path: '/prod-pricing' },
        { name: 'Benefits', path: '/prod-benefits' },
      ]
    },
    {
      name: 'PROJECTS',
      path: '/projects',
      dropdown: [
        { name: 'Mana Palle', path: '/proj-mana' },
        { name: 'Vision', path: '/proj-vision' },
        { name: 'Stage', path: '/proj-stage' },
      ]
    },
    {
      name: 'SERVICES',
      path: '/services',
      dropdown: [
        { name: 'Consultancy', path: '/svc-consultancy' },
        { name: 'Digital', path: '/svc-digital' },
        { name: 'Agri Services', path: '/svc-agri' },
      ]
    },
    { name: 'CONTACT', path: '/contact' },
    { name: 'ALLIED SERVICES', path: '/allied-services' },
  ];

  const isActive = (path: string) => location.pathname === path;

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
        <div className="max-w-[1700px] mx-auto px-6 lg:px-16">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative">
                <img src="/img/logoo.PNG" alt="Logo" className="h-10 w-10 object-contain transition-transform group-hover:scale-110 duration-500" />
                <div className="absolute inset-0 bg-gold/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="leading-tight">
                <div className="font-black text-sm md:text-base text-forest tracking-tighter uppercase">KALPAVRUKSHA</div>
                <div className="text-[8px] text-gray-400 font-black uppercase tracking-[0.2em]">COOPERATIVE SOCIETY</div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group h-20 flex items-center"
                  onMouseEnter={() => setOpenDropdown(link.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-0.5 px-1.5 xl:px-2 py-2 text-[12.5px] font-black tracking-widest transition-all duration-300 whitespace-nowrap uppercase
                      ${isActive(link.path)
                        ? 'text-gold border-b-2 border-gold pt-1'
                        : 'text-forest/80 hover:text-gold'
                      }`}
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown size={13} className={`mt-0.5 transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`} />}
                  </Link>

                  {link.dropdown && openDropdown === link.name && (
                    <div className="absolute top-[80px] left-1/2 -translate-x-1/2 bg-white shadow-2xl rounded-2xl py-3 min-w-[200px] z-50 border border-gray-100 animate-fadeInUp">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-6 py-3 text-xs font-bold text-gray-600 hover:bg-gold/5 hover:text-forest transition-all"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center bg-gray-50 rounded-full px-2 py-1.5 border border-gray-200/50 shadow-inner">
                <button className="p-2 text-gray-400 hover:text-forest transition-all hover:scale-110">
                  <Search size={16} />
                </button>
                <div className="w-px h-4 bg-gray-200 mx-1"></div>
                <Link to="/cart" className="p-2 text-gray-400 hover:text-forest relative transition-all hover:scale-110">
                  <ShoppingCart size={16} />
                  {totalItems > 0 && (
                    <span className="absolute top-1 right-1 bg-gold text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg animate-pulse ring-2 ring-white">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <div className="w-px h-4 bg-gray-200 mx-1"></div>
                <button className="p-2 text-gray-400 hover:text-forest transition-all hover:scale-110">
                  <User size={16} />
                </button>
              </div>
              <Link
                to="/membership"
                className="bg-forest text-white text-[10px] font-black px-8 py-3.5 rounded-full hover:bg-gold hover:scale-105 transition-all uppercase tracking-[0.2em] shadow-xl hover:shadow-gold/20 whitespace-nowrap"
              >
                Become a Member
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  to={link.path}
                  className={`block py-2 font-bold text-sm tracking-wider ${isActive(link.path) ? 'text-[#c9a84c]' : 'text-gray-700'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block py-1.5 text-sm text-gray-500"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-2 border-t">
              <Link
                to="/membership"
                className="block text-center bg-[#c9a84c] text-white font-bold py-2.5 rounded-full"
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
