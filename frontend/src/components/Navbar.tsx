import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Menu, X, ChevronDown, Leaf, MapPin, Mail, Users } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'Divisions',
      path: '#',
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
      path: '#',
      dropdown: [
        { name: 'Business Consultancy', path: '/services/business-consultancy' },
        { name: 'Social Media Services', path: '/services/social-media' },
      ]
    },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isProductsPage = location.pathname === '/products';

  return (
    <nav className="fixed w-full z-50 top-0 left-0 font-sans select-none bg-white">
      {/* Top Contact Bar - Clean Flat Look */}
      <div className="bg-[#0B1F4D] text-white py-2 px-8 flex justify-between items-center text-[11px] font-semibold h-[36px]">
        <div className="flex items-center gap-2">
          <Leaf size={14} className="text-[#C9A13B]" />
          <span>Empowering Communities Through Agriculture &amp; Finance</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#C9A13B]" />
            <span>Hyderabad, Telangana</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-[#C9A13B]" />
            <span className="uppercase">info@kalpavruksha.co</span>
          </div>
        </div>
      </div>

      {/* Main Navbar - Standard Professional Look */}
      <div className="border-b border-gray-200 h-[68px] flex items-center">
        <div className="max-w-[1700px] w-full mx-auto px-6 xl:px-10 h-full flex items-center">
          <div className="flex items-center justify-between lg:justify-start w-full h-full">
            
            {/* 1. Logo - Left Aligned with offset */}
            <div className="flex items-center shrink-0 pl-4 xl:pl-8">
              <Link to="/" className="flex items-center gap-3">
                <img src="/img/logoo.PNG" alt="Logo" className="h-11 w-11 object-contain" />
                <div className="flex flex-col">
                  <div className="text-[20px] font-bold text-[#123524] tracking-tight leading-none">KALPAVRUKSHA</div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="h-[1px] w-2 bg-[#C9A13B]"></div>
                    <div className="text-[9px] text-[#C9A13B] font-bold uppercase tracking-wider">MULTI PURPOSE COOPERATIVE SOCIETY</div>
                    <div className="h-[1px] w-2 bg-[#C9A13B]"></div>
                  </div>
                </div>
              </Link>
            </div>

            {/* 2. Navigation Links - Centered */}
            <div className="hidden lg:flex flex-1 justify-center items-center h-full">
              <div className="flex items-center h-full">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  const suppressDropdown = isProductsPage && link.name === 'PRODUCTS';
                  
                  return (
                    <div
                      key={link.name}
                      className="relative h-full flex items-center"
                      onMouseEnter={() => !suppressDropdown && setOpenDropdown(link.name)}
                      onMouseLeave={() => !suppressDropdown && setOpenDropdown(null)}
                    >
                      <Link
                        to={link.path === '#' ? '#' : link.path}
                        className={`flex items-center gap-1 px-4 py-2 text-[18px] font-bold transition-colors whitespace-nowrap
                          ${active 
                            ? 'text-[#123524] bg-gray-50 rounded-lg' 
                            : 'text-[#0B1F4D] hover:text-[#123524] hover:bg-gray-50 rounded-lg'}`}
                        onClick={(e) => link.path === '#' && e.preventDefault()}
                      >
                        {link.name}
                        {link.dropdown && !suppressDropdown && (
                          <ChevronDown size={14} className="opacity-50" />
                        )}
                      </Link>

                      {/* Dropdown Menu - Compact size */}
                      {link.dropdown && !suppressDropdown && openDropdown === link.name && (
                        <div className="absolute top-[68px] left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-md py-1.5 min-w-[170px] z-50">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className="block px-4 py-1.5 text-[13.5px] font-semibold text-[#0B1F4D] hover:bg-gray-50 hover:text-[#123524] whitespace-nowrap"
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
            </div>

            {/* 3. Action Group Right - Right Aligned */}
            <div className="hidden lg:flex items-center gap-4 shrink-0 h-full">
              
              {/* Search Bar */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const term = (e.target as any).search.value;
                  if (term) navigate(`/products?search=${encodeURIComponent(term)}`);
                }}
                className="relative flex items-center h-[42px] max-w-[240px] border border-gray-300 rounded-lg px-3 bg-white focus-within:border-[#123524]"
              >
                <Search size={16} className="text-gray-400" />
                <input 
                  name="search"
                  type="text" 
                  placeholder="Search products..." 
                  className="bg-transparent border-none w-full px-2 text-[14px] text-[#0B1F4D] focus:outline-none placeholder:text-gray-400"
                />
              </form>

              {/* User Profile */}
              <div className="flex items-center gap-1 px-3 h-[42px] border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <User size={18} className="text-[#0B1F4D]" />
                <ChevronDown size={14} className="text-gray-400" />
              </div>

              {/* Become a Member Button */}
              <Link
                to="/membership"
                className="flex items-center gap-2 bg-[#123524] text-white font-bold px-5 h-[42px] rounded-lg hover:bg-[#1a4b33] transition-colors"
              >
                <Users size={18} />
                <span className="text-[14px]">Become a Member</span>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                className="p-2 text-[#0B1F4D]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 fixed w-full left-0 top-[104px] z-40 max-h-[calc(100vh-104px)] overflow-y-auto">
          <div className="px-6 py-6 space-y-2">
            {navLinks.map((link) => {
              const hasDropdown = link.dropdown && link.dropdown.length > 0;
              const isOpen = openDropdown === link.name;
              const active = isActive(link.path);
              
              return (
                <div key={link.name}>
                  {hasDropdown ? (
                    <div className="flex flex-col">
                      <button
                        onClick={() => setOpenDropdown(isOpen ? null : link.name)}
                        className={`flex items-center justify-between py-3 px-4 font-bold text-[15px] rounded-lg
                          ${isOpen ? 'bg-gray-50 text-[#123524]' : 'text-[#0B1F4D]'}`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="bg-gray-50 rounded-lg mt-1 ml-4">
                          {link.dropdown?.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className="block py-3 px-6 text-[14px] font-semibold text-[#0B1F4D]"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block py-3 px-4 font-bold text-[15px] rounded-lg
                        ${active ? 'bg-gray-50 text-[#123524]' : 'text-[#0B1F4D]'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              );
            })}
            
            <div className="pt-6 border-t border-gray-200 mt-4 flex flex-col gap-4">
              <Link
                to="/membership"
                className="flex items-center justify-center gap-2 bg-[#123524] text-white font-bold py-3.5 rounded-lg"
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
