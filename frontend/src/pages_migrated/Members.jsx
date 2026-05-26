import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Mail, Phone, Calendar, User, Download, FileSpreadsheet, FileText, CheckCircle2, AlertCircle, X, Loader2, Users, TrendingUp, Clock, MapPin } from 'lucide-react';
import { adminApi } from '../api';
import * as XLSX from 'xlsx';
import { db } from '../api/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [toast, setToast] = useState(null);

  // Stats calculation
  const stats = useMemo(() => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      total: members.length,
      thisWeek: members.filter(m => new Date(m.createdAt) >= oneWeekAgo).length,
      thisMonth: members.filter(m => new Date(m.createdAt) >= oneMonthAgo).length
    };
  }, [members]);

  useEffect(() => {
    fetchMembers();
  }, [startDate, endDate]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "members"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const docData = { id: change.doc.id, ...change.doc.data() };
        if (change.type === "added") {
          setMembers(prev => {
            if (prev.some(m => m.id === docData.id)) return prev;
            return [docData, ...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          });
        }
        if (change.type === "modified") {
          setMembers(prev => prev.map(m => m.id === docData.id ? docData : m));
        }
        if (change.type === "removed") {
          setMembers(prev => prev.filter(m => m.id !== docData.id));
        }
      });
    }, (error) => {
      console.warn("Firestore snapshot listener failed:", error);
    });

    return () => unsubscribe();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getMembers({ startDate, endDate });
      setMembers(response.data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
      showToast('error', 'Failed to fetch members');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleQuickFilter = (type) => {
    const now = new Date();
    let start = '';
    let end = now.toISOString().split('T')[0];

    switch (type) {
      case 'today':
        start = end;
        break;
      case 'week':
        const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        start = lastWeek.toISOString().split('T')[0];
        break;
      case 'month':
        const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        start = lastMonth.toISOString().split('T')[0];
        break;
      case 'thisMonth':
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        start = firstDay.toISOString().split('T')[0];
        break;
      default:
        start = '';
        end = '';
    }
    setStartDate(start);
    setEndDate(end);
  };

  const exportData = async (format) => {
    if (members.length === 0) {
      showToast('warning', 'No members found for selected date range');
      return;
    }

    setExportLoading(true);
    try {
      const exportItems = members.map(m => ({
        'Full Name': m.fullName,
        'Father Name': m.fatherName || '-',
        'Phone': m.mobileNumber || m.phone || '-',
        'Email': m.email || '-',
        'Address': m.address || m.location || '-',
        'Joined Date': new Date(m.createdAt).toLocaleDateString(),
        'Status': 'Active'
      }));

      if (format === 'csv') {
        const headers = Object.keys(exportItems[0]);
        const csvContent = "data:text/csv;charset=utf-8," 
          + headers.join(",") + "\n"
          + exportItems.map(row => headers.map(h => `"${row[h]}"`).join(",")).join("\n");
        
        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", `members_${new Date().getTime()}.csv`);
        document.body.appendChild(link);
        link.click();
      } else {
        const ws = XLSX.utils.json_to_sheet(exportItems);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Members");
        XLSX.writeFile(wb, `members_${new Date().getTime()}.xlsx`);
      }
      showToast('success', 'Members exported successfully');
    } catch (error) {
      showToast('error', 'Export failed');
    } finally {
      setExportLoading(false);
    }
  };

  const filteredMembers = members.filter(member => 
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (member.phone && member.phone.includes(searchTerm)) ||
    (member.mobileNumber && member.mobileNumber.includes(searchTerm))
  );

  return (
    <div className="space-y-8 min-h-screen pb-20">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-right duration-300 border ${
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 
          toast.type === 'warning' ? 'bg-amber-50 border-amber-100 text-amber-700' :
          'bg-rose-50 border-rose-100 text-rose-700'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : 
           toast.type === 'warning' ? <AlertCircle size={18} /> : <X size={18} />}
          <span className="text-sm font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-black text-[#0B1F4D] tracking-tight">Membership Management</h1>
        <p className="text-slate-400 text-sm font-medium">Manage and export your community database</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Members', value: stats.total, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Joined This Week', value: stats.thisWeek, icon: TrendingUp, color: 'text-[#C9A13B]', bg: 'bg-[#C9A13B]/10' },
          { label: 'Joined This Month', value: stats.thisMonth, icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center gap-5 group hover:shadow-xl transition-all duration-500">
            <div className={`${stat.bg} w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-[#0B1F4D]">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(11,31,77,0.06)] border border-slate-100 overflow-hidden transition-all duration-500">
        {/* Filter Section */}
        <div className="p-8 border-b border-slate-50 bg-[#F7F3E8]/30">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <label className="text-[10px] font-black text-[#0B1F4D] uppercase tracking-widest ml-1">Filter by Date Range</label>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-[#0B1F4D] focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 transition-all w-44"
                  />
                </div>
                <span className="text-slate-300 font-bold">to</span>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-[#0B1F4D] focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 transition-all w-44"
                  />
                </div>
                <button 
                  onClick={() => { setStartDate(''); setEndDate(''); }}
                  className="p-3 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Clear Filters"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Today', key: 'today' },
                  { label: 'Last 7 Days', key: 'week' },
                  { label: 'Last 30 Days', key: 'month' },
                  { label: 'This Month', key: 'thisMonth' },
                ].map((f) => (
                  <button 
                    key={f.key}
                    onClick={() => handleQuickFilter(f.key)}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 hover:border-[#C9A13B] hover:text-[#C9A13B] transition-all uppercase tracking-wider"
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-end gap-3 lg:border-l lg:border-slate-100 lg:pl-8">
              <div className="flex flex-col gap-4 w-full">
                <label className="text-[10px] font-black text-[#0B1F4D] uppercase tracking-widest ml-1 text-right">Export Database</label>
                <div className="flex gap-2">
                  <button 
                    disabled={exportLoading}
                    onClick={() => exportData('excel')}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#123C73] text-white px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#0B1F4D] transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 group"
                  >
                    {exportLoading ? <Loader2 size={16} className="animate-spin" /> : <FileSpreadsheet size={16} className="group-hover:scale-110 transition-transform" />}
                    Excel
                  </button>
                  <button 
                    disabled={exportLoading}
                    onClick={() => exportData('csv')}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#C9A13B] text-white px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#A6832F] transition-all shadow-lg shadow-amber-900/20 disabled:opacity-50 group"
                  >
                    {exportLoading ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} className="group-hover:scale-110 transition-transform" />}
                    CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white flex justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Quick search members..." 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-xs font-bold text-[#0B1F4D] focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
            Showing {filteredMembers.length} Members
          </div>
        </div>

        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="px-6 py-6">Member Profile</th>
                <th className="px-6 py-6">Relationship</th>
                <th className="px-6 py-6">Contact Details</th>
                <th className="px-6 py-6">Residential Address</th>
                <th className="px-6 py-6">Registration</th>
                <th className="px-6 py-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-32 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 size={40} className="text-[#C9A13B] animate-spin" />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading secure database...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-32 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Users size={40} className="text-slate-200" />
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">No members found in this range</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0B1F4D]/5 flex items-center justify-center text-[#0B1F4D] font-black text-sm">
                          {member.fullName.charAt(0)}
                        </div>
                        <span className="text-xs font-black text-[#0B1F4D] uppercase">{member.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-xs font-bold text-slate-500 uppercase">{member.fatherName || '-'}</td>
                    <td className="px-6 py-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[11px] text-[#0B1F4D] font-black">
                          <Phone size={12} className="text-[#C9A13B]" /> {member.mobileNumber || member.phone}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                          <Mail size={12} /> {member.email || '-'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-start gap-2 max-w-[240px]">
                        <MapPin size={12} className="text-slate-300 shrink-0 mt-0.5" />
                        <span className="text-[10px] text-slate-600 font-bold uppercase leading-relaxed line-clamp-2">{member.address || member.location || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black">
                        <Calendar size={12} />
                        {new Date(member.createdAt).toLocaleDateString('en-GB')}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-black uppercase tracking-widest">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Members;
