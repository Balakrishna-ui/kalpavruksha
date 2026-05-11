import React, { useState, useEffect } from 'react';
import { TrendingUp, PieChart, BarChart3, Clock } from 'lucide-react';
import { adminApi } from '../api';

const Analytics = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [enqRes, ordRes] = await Promise.all([
        adminApi.getEnquiries(),
        adminApi.getOrders()
      ]);
      
      setEnquiries(enqRes.data || []);
      setOrders(ordRes.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setLoading(false);
    }
  };

  // Process data for charts
  const schemeCounts = enquiries.reduce((acc, enq) => {
    acc[enq.plan] = (acc[enq.plan] || 0) + 1;
    return acc;
  }, {});

  const totalEnquiries = enquiries.length;
  const totalOrders = orders.length;

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold text-slate-800">Real-time Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Leads Over Time */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={16} className="text-pink-500" />
              Leads Over Time
            </h3>
            <span className="text-[10px] font-bold text-slate-400">Total: {totalEnquiries}</span>
          </div>
          <div className="h-48 relative pt-4 flex items-end gap-2 px-2">
            {[40, 60, 30, 80, 50, 90].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-500/10 rounded-t-sm relative group">
                <div 
                  className="bg-blue-500 rounded-t-sm transition-all duration-500" 
                  style={{ height: `${h}%` }}
                ></div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded transition-all">
                  {h}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          </div>
        </div>

        {/* Scheme Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
            <PieChart size={16} className="text-orange-500" />
            Scheme Distribution
          </h3>
          <div className="space-y-4">
            {Object.entries(schemeCounts).map(([name, count], i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-600">{name}</span>
                  <span className="text-slate-400">{count} ({((count/totalEnquiries)*100).toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000" 
                    style={{ width: `${(count/totalEnquiries)*100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            {totalEnquiries === 0 && <p className="text-center text-slate-400 text-sm py-10">No data available</p>}
          </div>
        </div>

        {/* Orders Stats */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 col-span-1 md:col-span-2">
          <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
            <BarChart3 size={16} className="text-indigo-500" />
            Product Orders Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Total Orders</p>
              <h4 className="text-2xl font-black text-indigo-900">{totalOrders}</h4>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Completed</p>
              <h4 className="text-2xl font-black text-emerald-900">{orders.filter(o => o.status === 'Completed').length}</h4>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">Pending</p>
              <h4 className="text-2xl font-black text-amber-900">{orders.filter(o => o.status === 'Pending').length}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
