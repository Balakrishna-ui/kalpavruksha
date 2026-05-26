import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Phone, 
  Calendar, 
  Briefcase, 
  MessageSquare,
  X,
  Loader2,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  LayoutGrid,
  Clock,
  ArrowUpRight,
  Filter,
  User,
  Mail,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import { adminApi } from '../api';
import * as XLSX from 'xlsx';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toast, setToast] = useState(null);

  const categories = [
    'All',
    'Business Consultancy Services',
    'Social Media & Branding Services'
  ];

  const statusOptions = ['New', 'In Progress', 'Completed', 'Rejected'];
  const today = new Date().toISOString().split('T')[0];

  // Stats calculation
  const stats = useMemo(() => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return {
      total: services.length,
      new: services.filter(s => s.status === 'New').length,
      thisWeek: services.filter(s => new Date(s.createdAt) >= oneWeekAgo).length
    };
  }, [services]);

  useEffect(() => {
    fetchServices();
  }, [startDate, endDate, selectedCategory]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getServices({ 
        startDate, 
        endDate, 
        category: selectedCategory 
      });
      setServices(response.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      showToast('error', 'Failed to fetch service requests');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await adminApi.updateServiceStatus(id, newStatus);
      setServices(services.map(s => s.id === id ? { ...s, status: newStatus } : s));
      showToast('success', `Status updated to ${newStatus}`);
    } catch (error) {
      showToast('error', 'Failed to update status');
    }
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    if (value > today) {
      showToast('error', 'Future dates are not allowed');
      return;
    }
    setStartDate(value);
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    if (value > today) {
      showToast('error', 'Future dates are not allowed');
      return;
    }
    setEndDate(value);
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

  const exportData = async (format) => {
    if (services.length === 0) {
      showToast('warning', 'No records found for selected range');
      return;
    }

    setExportLoading(true);
    try {
      const exportItems = services.map(s => ({
        'Date': new Date(s.createdAt).toLocaleDateString(),
        'Customer Name': s.fullName,
        'Mobile': s.mobile,
        'Email': s.email || 'N/A',
        'Category': s.serviceCategory,
        'Service Selected': s.selectedService,
        'Status': s.status,
        'Notes': s.notes || 'No message'
      }));

      if (format === 'csv') {
        const headers = Object.keys(exportItems[0]);
        const csvContent = "data:text/csv;charset=utf-8," 
          + headers.join(",") + "\n"
          + exportItems.map(row => headers.map(h => `"${row[h]}"`).join(",")).join("\n");
        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", `service_requests_${new Date().getTime()}.csv`);
        document.body.appendChild(link);
        link.click();
      } else {
        const ws = XLSX.utils.json_to_sheet(exportItems);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Services");
        XLSX.writeFile(wb, `service_requests_${new Date().getTime()}.xlsx`);
      }
      showToast('success', 'Data exported successfully');
    } catch (error) {
      showToast('error', 'Export failed');
    } finally {
      setExportLoading(false);
    }
  };

  const filteredServices = services.filter(service => 
    service.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.mobile.includes(searchTerm) ||
    service.selectedService.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-2xl font-black text-[#0B1F4D] tracking-tight">Services Management</h1>
        <p className="text-slate-400 text-sm font-medium">Manage and track customer service requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Requests', value: stats.total, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'New Requests', value: stats.new, icon: Clock, color: 'text-[#C9A13B]', bg: 'bg-[#C9A13B]/10' },
          { label: 'Activity This Week', value: stats.thisWeek, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
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
            <div className="flex-1 space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-[#0B1F4D] uppercase tracking-widest ml-1">Filter by Date Range</label>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-[140px]">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="date" 
                      value={startDate}
                      onChange={handleStartDateChange}
                      max={today}
                      className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-[#0B1F4D] focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 transition-all w-full"
                    />
                  </div>
                  <span className="text-slate-300 font-bold">to</span>
                  <div className="relative flex-1 min-w-[140px]">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="date" 
                      value={endDate}
                      onChange={handleEndDateChange}
                      max={today}
                      className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-[#0B1F4D] focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 transition-all w-full"
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

              <div className="space-y-4">
                <label className="text-[10px] font-black text-[#0B1F4D] uppercase tracking-widest ml-1">Service Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button 
                      key={cat} 
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2.5 rounded-xl text-[10px] font-black transition-all border uppercase tracking-widest ${
                        selectedCategory === cat 
                          ? 'bg-[#123C73] text-white border-[#123C73] shadow-lg shadow-blue-900/20' 
                          : 'bg-white text-slate-500 border-slate-200 hover:border-[#123C73] hover:text-[#123C73]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
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

        <div className="p-8 bg-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search Name / Mobile / Service..." 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-xs font-bold text-[#0B1F4D] focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Showing {filteredServices.length} Active Requests
            </span>
          </div>
        </div>

        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="px-6 py-6">Customer Details</th>
                <th className="px-6 py-6">Service Selected</th>
                <th className="px-6 py-6">Submission Details</th>
                <th className="px-6 py-6">Status Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan="4" className="px-6 py-32 text-center"><Loader2 size={40} className="text-[#C9A13B] animate-spin mx-auto" /></td></tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-40 text-center">
                    <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
                      <div className="w-32 h-32 bg-[#F7F3E8] rounded-full flex items-center justify-center text-[#C9A13B]/30 relative">
                        <Briefcase size={64} />
                        <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-rose-300">
                          <X size={24} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-black text-[#0B1F4D] uppercase tracking-tighter">No Service Requests Found</h3>
                        <p className="text-slate-400 text-xs font-bold max-w-xs mx-auto">There are currently no customer inquiries matching your active filters.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <User size={12} className="text-[#C9A13B]" />
                          <span className="text-xs font-black text-[#0B1F4D] uppercase">{service.fullName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={12} className="text-blue-500" />
                          <span className="text-[11px] font-black text-slate-500">{service.mobile}</span>
                        </div>
                        {service.email && (
                          <div className="flex items-center gap-2">
                            <Mail size={12} className="text-slate-300" />
                            <span className="text-[10px] font-bold text-slate-400 italic">{service.email}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                            <LayoutGrid size={14} />
                          </div>
                          <span className="text-[11px] font-black text-[#0B1F4D] uppercase tracking-tight">{service.selectedService}</span>
                        </div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-9">{service.serviceCategory}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <Calendar size={14} className="text-[#C9A13B]" />
                          {new Date(service.createdAt).toLocaleDateString('en-GB')}
                        </div>
                        {service.notes && (
                          <div className="flex items-start gap-2 max-w-[250px] bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                            <MessageSquare size={12} className="text-slate-300 shrink-0 mt-0.5" />
                            <span className="text-[10px] text-slate-500 font-bold uppercase leading-relaxed line-clamp-3 italic">"{service.notes}"</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="relative group/status w-44">
                        <select 
                          value={service.status}
                          onChange={(e) => handleStatusUpdate(service.id, e.target.value)}
                          className={`w-full appearance-none px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            service.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-200 focus:ring-blue-500' :
                            service.status === 'In Progress' ? 'bg-amber-50 text-amber-600 border-amber-200 focus:ring-amber-500' :
                            service.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 focus:ring-emerald-500' :
                            'bg-rose-50 text-rose-600 border-rose-200 focus:ring-rose-500'
                          }`}
                        >
                          {statusOptions.map(opt => (
                            <option key={opt} value={opt} className="bg-white text-slate-800">{opt}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-50" />
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

export default Services;
