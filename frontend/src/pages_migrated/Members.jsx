import React, { useState, useEffect, useMemo } from 'react';
import { Search, Calendar, FileSpreadsheet, FileText, CheckCircle2, AlertCircle, X, Loader2, Users, TrendingUp, Clock, Eye, MoreVertical, Phone, Mail, FileImage, Download } from 'lucide-react';
import { adminApi, API_URL } from '../api';
import * as XLSX from 'xlsx';
import MemberDetailModal from './MemberDetailModal';

const avatarColors = [
  { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
  { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
  { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
  { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
  { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
  { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' },
  { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-100' },
  { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' }
];

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [viewingDocumentsFor, setViewingDocumentsFor] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [membershipTypeFilter, setMembershipTypeFilter] = useState('All Types');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('All Status');
  const [kycStatusFilter, setKycStatusFilter] = useState('All Status');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [toast, setToast] = useState(null);

  const stats = useMemo(() => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth(), 1);

    const activeMembers = members.filter(m => m.applicationStatus !== 'REJECTED');

    return {
      total: activeMembers.length,
      thisWeek: activeMembers.filter(m => new Date(m.createdAt) >= oneWeekAgo).length,
      thisMonth: activeMembers.filter(m => new Date(m.createdAt) >= oneMonthAgo).length,
      active: activeMembers.length, // Mock active members
      revenue: activeMembers.length * 120 // Mock revenue
    };
  }, [members]);

  useEffect(() => {
    fetchMembers();
    
    // Real-time auto refresh (poll every 3 seconds)
    const interval = setInterval(() => {
      fetchMembers(true);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [startDate, endDate]);

  const fetchMembers = async (isBackground = false) => {
    if (!isBackground) setLoading(true);
    try {
      const response = await adminApi.getMembers({ startDate, endDate });
      const enrichedMembers = (response.data || [])
        .map((m) => ({
          ...m,
          documentsCount: 5 // Default for now
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setMembers(enrichedMembers);
    } catch (error) {
      console.error('Error fetching members:', error);
      if (!isBackground) showToast('error', 'Failed to fetch members');
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  const handleMemberUpdated = (updatedMember) => {
    if (!updatedMember) {
      fetchMembers(true);
      return;
    }
    // Instantly sync local state without refresh
    setMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
    // Keep modal state fresh
    setViewingDocumentsFor(updatedMember);
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
      case 'year':
        const firstDayYear = new Date(now.getFullYear(), 0, 1);
        start = firstDayYear.toISOString().split('T')[0];
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
        'Member ID': m.memberId,
        'Full Name': m.fullName,
        'Phone': m.mobileNumber || m.phone || '-',
        'Email': m.email || '-',
        'Address': m.address || m.location || '-',
        'Membership Type': m.membershipType || '-',
        'Payment Status': m.paymentStatus,
        'KYC Status': m.kycStatus,
        'Joined Date': new Date(m.createdAt).toLocaleDateString(),
        'Status': m.status
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

  const filteredMembers = members.filter(m => {
    const matchesSearch = (m.fullName && m.fullName.toLowerCase().includes(searchTerm.toLowerCase())) || 
                          (m.mobileNumber && m.mobileNumber.includes(searchTerm)) ||
                          (m.memberId && m.memberId.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (m.email && m.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesMembership = membershipTypeFilter === 'All Types' || (m.membershipType || 'Regular Member') === membershipTypeFilter;
    const matchesPayment = paymentStatusFilter === 'All Status' || m.paymentStatus === paymentStatusFilter;
    
    const matchesKyc = (() => {
      if (kycStatusFilter === 'All Status' || !kycStatusFilter) return true;
      const filterNorm = kycStatusFilter.toUpperCase().replace(/\s+/g, '_');
      const memberKyc = (m.kycStatus || 'PENDING').toUpperCase().replace(/\s+/g, '_');

      if (filterNorm === 'VERIFIED' || filterNorm === 'APPROVED') {
        return memberKyc === 'VERIFIED' || memberKyc === 'APPROVED';
      }
      if (filterNorm === 'PENDING') {
        return memberKyc === 'PENDING';
      }
      if (filterNorm === 'UNDER_REVIEW' || filterNorm === 'UNDERREVIEW') {
        return memberKyc === 'UNDER_REVIEW' || memberKyc === 'UNDERREVIEW';
      }
      if (filterNorm === 'REJECTED') {
        return memberKyc === 'REJECTED';
      }
      return memberKyc === filterNorm;
    })();

    const isNotRejected = m.applicationStatus !== 'REJECTED';

    return matchesSearch && matchesMembership && matchesPayment && matchesKyc && isNotRejected;
  });

  const totalPages = Math.ceil(filteredMembers.length / perPage);
  const currentMembers = filteredMembers.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="space-y-6 min-h-screen pb-10 bg-[#F0F2F5]">
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

      <div className="flex flex-col gap-1">
        <h1 className="text-[22px] font-black text-[#0B1F4D] tracking-tight">Membership Management</h1>
        <p className="text-slate-400 text-[13px] font-medium">Manage and export your community database</p>
      </div>

      {/* Stats Cards - 5 columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Members', value: stats.total, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', sub: 'All time members' },
          { label: 'Joined This Week', value: stats.thisWeek, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50', sub: 'New members' },
          { label: 'Joined This Month', value: stats.thisMonth, icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50', sub: 'New members' },
          { label: 'Active Members', value: stats.active, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', sub: 'Currently active' },
          { label: 'Total Revenue', value: `₹ ${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: 'text-teal-500', bg: 'bg-teal-50', sub: 'From memberships' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex gap-4 transition-all">
            <div className={`${stat.bg} w-12 h-12 rounded-xl flex shrink-0 items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-xl font-black text-[#0B1F4D] leading-none mb-1">{stat.value}</h3>
              <p className="text-[10px] text-slate-400">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-[1.5rem] shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden">
        {/* Filter Section */}
        <div className="p-6 border-b border-slate-50">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-6">
            
            <div className="flex flex-wrap items-end gap-6 w-full">
              {/* Date Filters */}
              <div>
                <label className="text-[10px] font-black text-[#0B1F4D] uppercase tracking-widest ml-1 mb-2 block">Filter by Date Range</label>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-[#0B1F4D] focus:outline-none focus:ring-1 focus:ring-blue-500 w-36"
                    />
                  </div>
                  <span className="text-slate-300 font-bold text-xs">-</span>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-[#0B1F4D] focus:outline-none focus:ring-1 focus:ring-blue-500 w-36"
                    />
                  </div>
                  <button onClick={() => { setStartDate(''); setEndDate(''); }} className="text-slate-400 hover:text-rose-500">
                    <X size={16} />
                  </button>
                </div>
                
                <div className="flex gap-2 mt-2">
                  {[
                    { label: 'Today', key: 'today' },
                    { label: 'Last 7 Days', key: 'week' },
                    { label: 'Last 30 Days', key: 'month' },
                    { label: 'This Month', key: 'thisMonth' },
                    { label: 'This Year', key: 'year' },
                  ].map(f => (
                    <button key={f.key} onClick={() => handleQuickFilter(f.key)} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-slate-500 hover:border-blue-500 hover:text-blue-500 transition-all">
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dropdowns */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Membership Type</label>
                <select value={membershipTypeFilter} onChange={e => setMembershipTypeFilter(e.target.value)} className="w-40 py-2.5 px-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:outline-none">
                  <option>All Types</option>
                  <option>Regular Member</option>
                  <option>Associate Member</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Payment Status</label>
                <select value={paymentStatusFilter} onChange={e => setPaymentStatusFilter(e.target.value)} className="w-36 py-2.5 px-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:outline-none">
                  <option>All Status</option>
                  <option>Paid</option>
                  <option>Pending</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">KYC Status</label>
                <select value={kycStatusFilter} onChange={e => { setKycStatusFilter(e.target.value); setCurrentPage(1); }} className="w-36 py-2.5 px-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:outline-none">
                  <option value="All Status">All Status</option>
                  <option value="VERIFIED">Verified</option>
                  <option value="PENDING">Pending</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Search</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search member..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:outline-none placeholder:text-slate-300"
                  />
                  <div className="absolute right-1 top-1 bottom-1 bg-[#123C73] w-8 rounded-md flex items-center justify-center text-white cursor-pointer hover:bg-[#0B1F4D]">
                    <Search size={14} />
                  </div>
                </div>
              </div>

              {/* Export Buttons */}
              <div className="flex flex-col items-end shrink-0 ml-auto">
                <label className="text-[10px] font-black text-[#0B1F4D] uppercase tracking-widest mb-2">Export Database</label>
                <div className="flex gap-2">
                  <button onClick={() => exportData('excel')} disabled={exportLoading} className="flex items-center gap-2 bg-[#123C73] text-white px-4 py-2.5 rounded-lg text-[10px] font-bold uppercase hover:bg-[#0B1F4D] transition-all">
                    {exportLoading ? <Loader2 size={14} className="animate-spin" /> : <FileSpreadsheet size={14} />} Excel
                  </button>
                  <button onClick={() => exportData('csv')} disabled={exportLoading} className="flex items-center gap-2 bg-[#C9A13B] text-white px-4 py-2.5 rounded-lg text-[10px] font-bold uppercase hover:bg-[#A6832F] transition-all">
                    {exportLoading ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />} CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Header Row */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="text-xs font-black text-[#0B1F4D] uppercase tracking-wider">
            Active Members List <span className="text-slate-400 font-medium normal-case tracking-normal ml-2">Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, filteredMembers.length)} of {filteredMembers.length} members</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
            Show 
            <select value={perPage} onChange={e => {setPerPage(Number(e.target.value)); setCurrentPage(1);}} className="border border-slate-200 rounded px-2 py-1 focus:outline-none">
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            per page
          </div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50/50">
                <th className="pl-6 pr-2 py-4 w-[280px]">Member Info</th>
                <th className="pl-2 pr-6 py-4 w-[160px]">Contact Details</th>
                <th className="px-6 py-4 min-w-[200px]">Address</th>
                <th className="px-6 py-4">Membership & Payment</th>
                <th className="px-6 py-4">Membership & Payment</th>
                <th className="px-6 py-4">Status & KYC</th>
                <th className="px-6 py-4">Documents</th>
                <th className="px-6 py-4">Joining Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-[11px]">
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 size={30} className="text-blue-500 animate-spin" />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading members...</span>
                    </div>
                  </td>
                </tr>
              ) : currentMembers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-20 text-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">No members found</span>
                  </td>
                </tr>
              ) : (
                currentMembers.map((member, idx) => {
                  const avatarStyle = avatarColors[idx % avatarColors.length];
                  return (
                  <tr key={member.id} className="hover:bg-slate-50/80 transition-colors group bg-white border-b border-slate-50">
                    {/* Member Info */}
                    <td className="pl-6 pr-2 py-4 w-[280px]">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2.5 w-32 shrink-0">
                          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-500 shadow-sm shrink-0">
                            {(member.fullName || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col max-w-[190px]">
                            <span className="font-black text-[#0B1F4D] text-[11px] truncate">{member.fullName || 'Unknown'}</span>
                            <span className="text-[10px] text-slate-500 font-medium">{member.gender || 'N/A'}, {member.age || 'N/A'} Years</span>
                          </div>
                        </div>
                        <div className="flex flex-col pl-3 border-l border-slate-100 min-w-[120px]">
                          <span className="font-bold text-slate-800 text-xs truncate max-w-[130px]">{member.fullName}</span>
                          <span className="text-[10px] text-slate-500 font-medium">{member.gender || 'Male'}, {member.age || '32'} Years</span>
                          <span className="text-[10px] text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                            <Calendar size={10} className="text-slate-400 shrink-0" />
                            {member.dob ? new Date(member.dob).toLocaleDateString() : '01/01/1992'}
                          </span>
                        </div>
                      </div>
                    </td>
                    
                    {/* Contact */}
                    <td className="pl-2 pr-6 py-4 w-[160px]">
                      <div className="flex flex-col gap-1.5 text-slate-600 font-semibold text-[11px]">
                        <div className="flex items-center gap-2">
                          <Phone size={12} className="text-slate-400 shrink-0"/> 
                          <span className="truncate">{member.mobileNumber || member.phone || '-'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={12} className="text-slate-400 shrink-0"/> 
                          <span className="truncate max-w-[160px]">{member.email || '-'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Address */}
                    <td className="px-6 py-4 min-w-[200px]">
                      <div className="flex flex-col text-slate-600 text-[11px] font-medium max-w-[220px] whitespace-normal leading-snug">
                        <span>H.No: {member.houseNo || '-'}, Street: {member.street || '-'}</span>
                        <span>Mandal: {member.mandal || '-'}, District: {member.district || '-'}</span>
                        <span>State: {member.state || 'Telangana'}, PIN: {member.pinCode || '-'}</span>
                      </div>
                    </td>

                    {/* Membership & Payment */}
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-6">
                        <div className="flex flex-col">
                          <span className="text-[#1a73e8] font-bold text-[11px]">{member.membershipType || 'Standard'}</span>
                          <span className="text-[10px] text-[#1a73e8]/80 font-medium">Reg. No: {member.memberId || '-'}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-extrabold text-slate-800 text-xs">₹{member.totalAmount || '120'}</span>
                          <span className={`text-[10px] font-extrabold ${member.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-500'}`}>{member.paymentStatus || 'Pending'}</span>
                          <span className="text-[9px] text-slate-400 font-medium">{member.paymentDate ? new Date(member.paymentDate).toLocaleDateString() : '-'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Status & KYC Combined Column */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2 items-start">
                        <span className={`px-2.5 py-1 rounded border text-[9px] font-extrabold uppercase tracking-wider shadow-2xs ${
                          member.applicationStatus === 'APPROVED' 
                            ? 'border-emerald-300 text-emerald-600 bg-emerald-50' 
                            : member.applicationStatus === 'REJECTED' 
                              ? 'border-rose-300 text-rose-600 bg-rose-50'
                              : member.applicationStatus === 'REQUEST_MORE_DOCUMENTS'
                                ? 'border-amber-300 text-amber-600 bg-amber-50'
                                : 'border-orange-300 text-orange-600 bg-orange-50'
                        }`} title="Application Status">
                          App: {member.applicationStatus === 'REQUEST_MORE_DOCUMENTS' ? 'MORE DOCS REQ' : member.applicationStatus || 'PENDING'}
                        </span>
                        
                        <span className={`px-2.5 py-1 rounded border text-[9px] font-extrabold uppercase tracking-wider shadow-2xs ${
                          member.kycStatus === 'VERIFIED' || member.kycStatus === 'APPROVED'
                            ? 'border-blue-300 text-blue-600 bg-blue-50' 
                            : member.kycStatus === 'REJECTED'
                              ? 'border-rose-300 text-rose-600 bg-rose-50'
                              : member.kycStatus === 'UNDER_REVIEW'
                                ? 'border-purple-300 text-purple-600 bg-purple-50'
                                : 'border-amber-300 text-amber-600 bg-amber-50'
                        }`} title="KYC Status">
                          KYC: {member.kycStatus || 'PENDING'}
                        </span>
                      </div>
                    </td>

                    {/* Documents */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-extrabold text-[#0B1F4D] text-[11px]">{member.documentsCount || 5} Documents</span>
                        <div className="flex gap-1 items-center cursor-pointer my-0.5" onClick={() => setViewingDocumentsFor(member)}>
                          <div className="w-5 h-5 rounded bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center shadow-xs"><FileText size={10} /></div>
                          <div className="w-5 h-5 rounded bg-emerald-50 border border-emerald-100 text-emerald-500 flex items-center justify-center shadow-xs"><FileImage size={10} /></div>
                          <div className="w-5 h-5 rounded bg-blue-50 border border-blue-100 text-blue-500 flex items-center justify-center shadow-xs"><FileText size={10} /></div>
                          <div className="w-5 h-5 rounded bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center shadow-xs"><FileText size={10} /></div>
                          <div className="px-1.5 h-5 rounded bg-blue-50 border border-blue-200 text-blue-600 font-extrabold text-[9px] flex items-center justify-center shadow-xs">+1</div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1a73e8] underline cursor-pointer hover:text-blue-800" onClick={() => setViewingDocumentsFor(member)}>View & Verify All</span>
                      </div>
                    </td>

                    {/* Joining & Updated Date */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-slate-700 font-bold text-[11px]">{member.createdAt ? new Date(member.createdAt).toLocaleDateString() : '-'}</span>
                        <span className="text-[9px] text-slate-400 mt-1">
                          Upd: {member.updatedAt ? new Date(member.updatedAt).toLocaleString() : '-'}
                        </span>
                        <span className="text-[9px] text-blue-500 font-medium">By: {member.lastUpdatedBy || 'System'}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setViewingDocumentsFor(member)} title="View Documents" className="w-7 h-7 rounded-full border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-500 hover:text-blue-600 flex items-center justify-center transition-all shadow-xs">
                          <Eye size={13} />
                        </button>
                        <button className="w-7 h-7 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-all shadow-xs">
                          <MoreVertical size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center bg-white">
            <span className="text-[10px] text-slate-400 font-bold">Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, filteredMembers.length)} of {filteredMembers.length} members</span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
              >
                &lt;
              </button>
              {Array.from({length: totalPages}).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-7 h-7 flex items-center justify-center rounded text-[10px] font-bold ${
                    currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>

      {viewingDocumentsFor && (
        <MemberDetailModal 
          member={viewingDocumentsFor} 
          onClose={() => setViewingDocumentsFor(null)} 
          onStatusUpdate={handleMemberUpdated} 
        />
      )}

    </div>
  );
};

export default Members;
