import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Trash2, 
  Phone, 
  Mail, 
  Check, 
  Clock,
  Calendar,
  X,
  Loader2,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileText as FileIcon
} from 'lucide-react';
import { adminApi } from '../api';
import * as XLSX from 'xlsx';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterScheme, setFilterScheme] = useState('All');
  const [toast, setToast] = useState(null);

  // Stats calculation
  const stats = useMemo(() => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return {
      total: enquiries.length,
      new: enquiries.filter(e => e.status === 'new').length,
      thisWeek: enquiries.filter(e => new Date(e.createdAt) >= oneWeekAgo).length
    };
  }, [enquiries]);

  useEffect(() => {
    fetchEnquiries();
  }, [startDate, endDate]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getEnquiries({ startDate, endDate });
      setEnquiries(response.data || []);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      showToast('error', 'Failed to fetch enquiries');
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
      default:
        start = '';
        end = '';
    }
    setStartDate(start);
    setEndDate(end);
  };

  const updateStatus = async (id, status) => {
    try {
      await adminApi.updateEnquiryStatus(id, status);
      fetchEnquiries();
      showToast('success', 'Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      showToast('error', 'Failed to update status');
    }
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await adminApi.deleteEnquiry(id);
      fetchEnquiries();
      showToast('success', 'Enquiry deleted successfully');
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      showToast('error', 'Failed to delete enquiry');
    }
  };

  const exportData = async (format) => {
    if (enquiries.length === 0) {
      showToast('warning', 'No enquiries found for selected range');
      return;
    }

    setExportLoading(true);
    try {
      const exportItems = enquiries.map(e => ({
        'Date': new Date(e.createdAt).toLocaleDateString(),
        'Name': e.name,
        'Phone': e.phone,
        'Email': e.email || '-',
        'Location': e.location,
        'Scheme': e.plan,
        'Status': e.status === 'new' ? 'New' : 'Contacted',
        'Message': e.message || ''
      }));

      if (format === 'csv') {
        const headers = Object.keys(exportItems[0]);
        const csvContent = "data:text/csv;charset=utf-8," 
          + headers.join(",") + "\n"
          + exportItems.map(row => headers.map(h => `"${row[h]}"`).join(",")).join("\n");
        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", `enquiries_${new Date().getTime()}.csv`);
        document.body.appendChild(link);
        link.click();
      } else {
        const ws = XLSX.utils.json_to_sheet(exportItems);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Enquiries");
        XLSX.writeFile(wb, `enquiries_${new Date().getTime()}.xlsx`);
      }
      showToast('success', 'Data exported successfully');
    } catch (error) {
      showToast('error', 'Export failed');
    } finally {
      setExportLoading(false);
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          enquiry.phone.includes(searchTerm);
    const matchesScheme = filterScheme === 'All' || enquiry.plan === filterScheme;
    return matchesSearch && matchesScheme;
  });

  return (
    <div className="space-y-8 pb-20">
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
        <h1 className="text-2xl font-black text-[#0B1F4D] tracking-tight">General Enquiries</h1>
        <p className="text-slate-400 text-sm font-medium">Monitor and manage organic website leads</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Leads', value: stats.total, icon: FileIcon, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'New Enquiries', value: stats.new, icon: Clock, color: 'text-[#C9A13B]', bg: 'bg-[#C9A13B]/10' },
          { label: 'Received This Week', value: stats.thisWeek, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
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
      
      <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(11,31,77,0.06)] border border-slate-100 overflow-hidden">
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
                <button onClick={() => { setStartDate(''); setEndDate(''); }} className="p-3 text-slate-400 hover:text-rose-500"><X size={18} /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {['today', 'week', 'month'].map((f) => (
                  <button key={f} onClick={() => handleQuickFilter(f)} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 hover:border-[#C9A13B] hover:text-[#C9A13B] transition-all uppercase tracking-wider">
                    {f === 'week' ? 'Last 7 Days' : f === 'month' ? 'Last 30 Days' : 'Today'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-end gap-3 lg:border-l lg:border-slate-100 lg:pl-8">
              <div className="flex flex-col gap-4 w-full">
                <label className="text-[10px] font-black text-[#0B1F4D] uppercase tracking-widest ml-1 text-right">Export Database</label>
                <div className="flex gap-2">
                  <button onClick={() => exportData('excel')} className="flex-1 flex items-center justify-center gap-2 bg-[#123C73] text-white px-6 py-4 rounded-2xl text-[11px] font-black uppercase hover:bg-[#0B1F4D] transition-all shadow-lg shadow-blue-900/20">
                    <FileSpreadsheet size={16} /> Excel
                  </button>
                  <button onClick={() => exportData('csv')} className="flex-1 flex items-center justify-center gap-2 bg-[#C9A13B] text-white px-6 py-4 rounded-2xl text-[11px] font-black uppercase hover:bg-[#A6832F] transition-all shadow-lg shadow-amber-900/20">
                    <FileText size={16} /> CSV
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
              placeholder="Search Name / Phone..." 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-xs font-bold text-[#0B1F4D] focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="bg-slate-50 border-none rounded-2xl px-6 py-4 text-[10px] font-black text-[#0B1F4D] uppercase tracking-widest"
            value={filterScheme}
            onChange={(e) => setFilterScheme(e.target.value)}
          >
            <option value="All">All Schemes</option>
            <option value="Sri Nithya Daily Deposit (SD)">Daily Deposit</option>
            <option value="Sanghamithra Savings Plan">Savings Plan</option>
            <option value="Kamadhenu Fixed Deposit (KFD)">Fixed Deposit</option>
            <option value="Kamadhenu Term Deposit">Term Deposit</option>
          </select>
        </div>

        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="px-6 py-6">Lead Source</th>
                <th className="px-6 py-6">Contact Info</th>
                <th className="px-6 py-6">Location</th>
                <th className="px-6 py-6">Scheme</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-6 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-32 text-center"><Loader2 size={40} className="text-[#C9A13B] animate-spin mx-auto" /></td></tr>
              ) : filteredEnquiries.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-32 text-center font-bold text-slate-300 uppercase">No leads found</td></tr>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-[#0B1F4D] uppercase">{enquiry.name}</span>
                        <span className="text-[9px] text-slate-400 font-bold">{new Date(enquiry.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <div className="text-[11px] text-[#0B1F4D] font-black">{enquiry.phone}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{enquiry.email || '-'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-[10px] text-slate-600 font-bold uppercase">{enquiry.location}</td>
                    <td className="px-6 py-6 text-[10px] font-black text-[#C9A13B] uppercase">{enquiry.plan}</td>
                    <td className="px-6 py-6">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${enquiry.status === 'new' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {enquiry.status === 'new' ? 'New' : 'Contacted'}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => updateStatus(enquiry.id, enquiry.status === 'new' ? 'contacted' : 'new')} className="text-slate-400 hover:text-emerald-500"><Check size={16} /></button>
                        <button onClick={() => deleteEnquiry(enquiry.id)} className="text-slate-400 hover:text-rose-500"><Trash2 size={14} /></button>
                      </div>
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

export default Enquiries;
