import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  ShoppingBag, 
  ArrowUpRight,
  TrendingUp,
  PieChart,
  Clock
} from 'lucide-react';
import { adminApi } from '../api';

const DashboardOverview = () => {
  const [data, setData] = useState({
    enquiries: [],
    members: [],
    orders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [enqRes, memRes, ordRes] = await Promise.all([
        adminApi.getEnquiries(),
        adminApi.getMembers(),
        adminApi.getOrders()
      ]);

      setData({ 
        enquiries: enqRes.data || [], 
        members: memRes.data || [], 
        orders: ordRes.data || [] 
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const stats = [
    { 
      label: 'Total Enquiries', 
      value: data.enquiries.length, 
      trend: '+8%', 
      icon: <FileText className="text-blue-500" />, 
      bg: 'bg-blue-50' 
    },
    { 
      label: 'Total Members', 
      value: data.members.length, 
      trend: '+12%', 
      icon: <Users className="text-sky-500" />, 
      bg: 'bg-sky-50' 
    },
    { 
      label: 'New Leads', 
      value: data.enquiries.filter(e => e.status === 'new').length, 
      trend: '+15%', 
      icon: <Clock className="text-emerald-500" />, 
      bg: 'bg-emerald-50' 
    },
    { 
      label: 'Total Orders', 
      value: data.orders.length, 
      trend: '+4%', 
      icon: <ShoppingBag className="text-indigo-500" />, 
      bg: 'bg-indigo-50' 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.bg} p-2 rounded-md`}>
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-0.5">
                <ArrowUpRight size={10} />
                {stat.trend}
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp size={16} className="text-pink-500" />
            Performance Snapshot
          </h3>
          <div className="h-48 flex items-center justify-center border border-dashed border-slate-100 rounded-lg">
            <p className="text-slate-300 text-[11px] font-bold uppercase tracking-widest italic">Live Trend Analytics Coming Soon</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
            <PieChart size={16} className="text-orange-500" />
            Quick Metrics
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Member Growth</p>
              <div className="flex justify-between items-end mt-1">
                <span className="text-lg font-black text-slate-700">84%</span>
                <span className="text-[10px] text-emerald-500 font-bold tracking-tighter">Target Reached</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
