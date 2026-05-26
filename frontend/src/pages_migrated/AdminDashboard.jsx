import React, { useState } from 'react';
import { 
  LogOut,
  LayoutDashboard,
  TrendingUp,
  FileText,
  Users,
  ShoppingBag,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  Landmark,
  Mail
} from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <TrendingUp size={18} /> },
    { name: 'Financial Enquiries', path: '/admin/financial-enquiries', icon: <Landmark size={18} /> },
    { name: 'Memberships', path: '/admin/members', icon: <Users size={18} /> },
    { name: 'Service', path: '/admin/services', icon: <ShoppingBag size={18} /> },
    { name: 'Contact Messages', path: '/admin/contact-requests', icon: <Mail size={18} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_api_key');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex font-sans text-slate-700">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#11213F] text-slate-300 fixed h-full flex flex-col transition-all duration-300 z-50`}>
        <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'hidden'}`}>
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider leading-tight">Kalpavruksha Multi<br/>Cooperative Ecosystem</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/10 rounded transition-colors">
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} className="mx-auto" />}
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                location.pathname === item.path 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={18} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8 min-h-screen`}>
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search data..." 
              className="w-full pl-11 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-red-100">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Real-time Leads
            </span>
            <div className="relative">
              <Bell size={20} className="text-slate-500 cursor-pointer hover:text-blue-500 transition-colors" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-[#F0F2F5]">1</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-9 h-9 bg-slate-200 rounded-full overflow-hidden border border-slate-300 shadow-sm">
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="User" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-slate-800">Admin User</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
