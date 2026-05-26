import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  Clock, 
  Users, 
  FileText, 
  ShoppingBag, 
  Mail, 
  Landmark, 
  Layers, 
  ArrowUpRight 
} from 'lucide-react';
import { adminApi } from '../api';

const Analytics = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [members, setMembers] = useState([]);
  const [financialEnquiries, setFinancialEnquiries] = useState([]);
  const [services, setServices] = useState([]);
  const [contactRequests, setContactRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [enqRes, memRes, finRes, svcRes, conRes, ordRes] = await Promise.all([
        adminApi.getEnquiries(),
        adminApi.getMembers(),
        adminApi.getFinancialEnquiries(),
        adminApi.getServices(),
        adminApi.getContactRequests(),
        adminApi.getOrders()
      ]);
      
      setEnquiries(enqRes.data || []);
      setMembers(memRes.data || []);
      setFinancialEnquiries(finRes.data || []);
      setServices(svcRes.data || []);
      setContactRequests(conRes.data || []);
      setOrders(ordRes.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setLoading(false);
    }
  };

  // Combine and sort all submissions for the Latest Feed
  const combinedSubmissions = [
    ...enquiries.map(e => ({ 
      id: e.id, 
      type: 'Service Enquiry', 
      title: e.name || 'Anonymous', 
      subtitle: e.plan || 'General Service',
      date: new Date(e.createdAt), 
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-100'
    })),
    ...members.map(m => ({ 
      id: m.id, 
      type: 'Membership', 
      title: m.fullName || 'Anonymous', 
      subtitle: m.membershipType || 'Standard',
      date: new Date(m.createdAt), 
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    })),
    ...financialEnquiries.map(f => ({ 
      id: f.id, 
      type: 'Financial Enquiry', 
      title: f.fullName || 'Anonymous', 
      subtitle: f.selectedScheme || 'Finance Option',
      date: new Date(f.createdAt), 
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-100'
    })),
    ...services.map(s => ({ 
      id: s.id, 
      type: 'Service Request', 
      title: s.fullName || 'Anonymous', 
      subtitle: s.selectedService || 'Service Option',
      date: new Date(s.createdAt), 
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-100'
    })),
    ...contactRequests.map(c => ({ 
      id: c.id, 
      type: 'Contact Request', 
      title: c.name || 'Anonymous', 
      subtitle: c.subject || 'No Subject',
      date: new Date(c.createdAt), 
      badgeColor: 'bg-pink-50 text-pink-700 border-pink-100'
    })),
    ...orders.map(o => ({ 
      id: o.id, 
      type: 'Order', 
      title: o.customerName || 'Anonymous', 
      subtitle: o.productName || 'Product',
      date: new Date(o.createdAt), 
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-100'
    }))
  ].sort((a, b) => b.date - a.date);

  const totalSubmissions = combinedSubmissions.length;

  // Weekly and Monthly statistics computation
  const getSubmissionsInLastNDays = (days) => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return combinedSubmissions.filter(s => s.date >= cutoff).length;
  };

  const stats = [
    { label: 'Total Submissions', value: totalSubmissions, icon: <Layers size={18} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Today\'s Submissions', value: getSubmissionsInLastNDays(1), icon: <Clock size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'This Week\'s Growth', value: getSubmissionsInLastNDays(7), icon: <TrendingUp size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'This Month\'s Activity', value: getSubmissionsInLastNDays(30), icon: <Clock size={18} />, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Centralized Analytics</h1>
          <p className="text-slate-400 text-xs font-semibold mt-1">Combined real-time activity and stats aggregation across all platform channels.</p>
        </div>
        <span className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          Live Aggregator Enabled
        </span>
      </div>

      {/* Grid overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-800 mt-2">{stat.value}</h3>
            </div>
            <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left / Middle: Category breakdown & distributions */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
              <PieChart size={16} className="text-orange-500" />
              Submission Distribution by Form Category
            </h3>
            <div className="space-y-5">
              {[
                { name: 'Membership Forms', count: members.length, color: 'bg-emerald-500' },
                { name: 'Financial Enquiries', count: financialEnquiries.length, color: 'bg-amber-500' },
                { name: 'Services Requests', count: services.length, color: 'bg-purple-500' },
                { name: 'Service Enquiries (Leads)', count: enquiries.length, color: 'bg-blue-500' },
                { name: 'Contact Form Submissions', count: contactRequests.length, color: 'bg-pink-500' },
                { name: 'Product Orders', count: orders.length, color: 'bg-teal-500' }
              ].map((category, i) => {
                const percentage = totalSubmissions > 0 ? ((category.count / totalSubmissions) * 100) : 0;
                return (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-600">{category.name}</span>
                      <span className="text-slate-400">{category.count} submissions ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className={`${category.color} h-2 rounded-full transition-all duration-1000`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
              <BarChart3 size={16} className="text-indigo-500" />
              Category Growth Trends
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Members Growth', value: `+${getSubmissionsInLastNDays(7)} this week`, color: 'border-emerald-100 bg-emerald-50/20 text-emerald-800' },
                { label: 'Finance Leads', value: `${financialEnquiries.length} entries`, color: 'border-amber-100 bg-amber-50/20 text-amber-800' },
                { label: 'Contact Requests', value: `${contactRequests.length} submissions`, color: 'border-pink-100 bg-pink-50/20 text-pink-800' }
              ].map((trend, i) => (
                <div key={i} className={`p-4 rounded-xl border ${trend.color} text-center`}>
                  <p className="text-[10px] font-bold uppercase tracking-wider">{trend.label}</p>
                  <p className="text-sm font-black mt-1">{trend.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Latest Submissions Feed */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col h-[520px]">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 shrink-0">
            <Clock size={16} className="text-blue-500 animate-pulse" />
            Live Submissions Feed
          </h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
            {combinedSubmissions.map((sub, idx) => (
              <div key={idx} className="p-3 bg-slate-50 hover:bg-slate-100/70 border border-slate-100 rounded-lg transition-colors flex flex-col gap-1.5">
                <div className="flex justify-between items-start gap-2">
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${sub.badgeColor} uppercase tracking-wider`}>
                    {sub.type}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400">
                    {sub.date.toLocaleDateString()} {sub.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 truncate">{sub.title}</h4>
                  <p className="text-[10px] font-semibold text-slate-500 truncate mt-0.5">{sub.subtitle}</p>
                </div>
              </div>
            ))}
            {totalSubmissions === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 py-10 gap-2">
                <Clock size={32} className="text-slate-300" />
                <p className="text-xs font-bold uppercase tracking-wider">No Submissions Yet</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
