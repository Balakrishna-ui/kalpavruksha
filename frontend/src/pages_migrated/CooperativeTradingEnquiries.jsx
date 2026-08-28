import React, { useState, useEffect } from 'react';
import { Download, Search, AlertCircle, RefreshCw, Eye, CheckCircle, Clock, XCircle, MoreVertical, FileText, Trash2, X, Store } from 'lucide-react';
import { adminApi } from '../api';

const StatusBadge = ({ status }) => {
  const styles = {
    'New': 'bg-blue-100 text-blue-800 border-blue-200',
    'Contacted': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'In Progress': 'bg-orange-100 text-orange-800 border-orange-200',
    'Closed': 'bg-green-100 text-green-800 border-green-200'
  };

  const currentStyle = styles[status] || 'bg-gray-100 text-gray-800 border-gray-200';

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${currentStyle}`}>
      {status}
    </span>
  );
};

const CooperativeTradingEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchEnquiries = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await adminApi.getCooperativeTradingEnquiries();
      setEnquiries(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch cooperative trading enquiries');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const blob = await adminApi.exportCooperativeTradingEnquiries();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cooperative-trading-enquiries-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message || 'Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setIsUpdating(true);
      await adminApi.put(`/admin/cooperative-trading-enquiries/${id}/status`, { status: newStatus });
      await fetchEnquiries();
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
    } catch (err) {
      alert(err.message || 'Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      return;
    }

    try {
      setIsUpdating(true);
      await adminApi.deleteCooperativeTradingEnquiry(id);
      setEnquiries(enquiries.filter(e => e.id !== id));
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
    } catch (err) {
      alert(err.message || 'Failed to delete enquiry');
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredEnquiries = enquiries.filter(item => {
    const matchesTab = activeTab === 'All' || item.status === activeTab;
    const matchesSearch = 
      (item.fullName && item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.businessName && item.businessName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.mobileNumber && item.mobileNumber.includes(searchTerm)) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.memberId && item.memberId.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const stats = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === 'New').length,
    inProgress: enquiries.filter(e => e.status === 'In Progress').length,
    closed: enquiries.filter(e => e.status === 'Closed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Cooperative Trading Enquiries</h1>
          <p className="text-sm text-gray-500 mt-1">Manage partner requests for cooperative trading & marketplace.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchEnquiries}
            disabled={isLoading}
            className="p-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition-all shadow-sm"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting || enquiries.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-xl transition-all shadow-sm disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Exporting...' : 'Export CSV'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Enquiries</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{stats.total}</p>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">New</p>
            <p className="text-2xl font-black text-blue-600 mt-1">{stats.new}</p>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">In Progress</p>
            <p className="text-2xl font-black text-orange-600 mt-1">{stats.inProgress}</p>
          </div>
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Closed</p>
            <p className="text-2xl font-black text-green-600 mt-1">{stats.closed}</p>
          </div>
          <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-1 w-full md:w-auto p-1 bg-gray-50 rounded-xl">
          {['All', 'New', 'Contacted', 'In Progress', 'Closed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search enquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-green-500/20 text-gray-900"
          />
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold">Error loading data</p>
            <p className="text-xs">{error}</p>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Full Name</th>
                <th className="py-4 px-6">Business Name</th>
                <th className="py-4 px-6">Mobile & Email</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Member ID</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-gray-400 font-medium">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-gray-300" />
                      <span>Loading records...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-gray-400 font-medium">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Store className="w-8 h-8 text-gray-200" />
                      <span>No enquiries found</span>
                      <p className="text-xs text-gray-400">Try adjusting your filters or search term</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-xs text-gray-500 font-medium whitespace-nowrap">
                      {new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">{enquiry.fullName}</td>
                    <td className="py-4 px-6 font-medium text-gray-700">{enquiry.businessName}</td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-900">{enquiry.mobileNumber}</div>
                      <div className="text-xs text-gray-400">{enquiry.email}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-semibold">
                        {enquiry.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500">
                      {enquiry.memberId || '-'}
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleUpdateStatus(enquiry.id, e.target.value)}
                        disabled={isUpdating}
                        className="text-xs font-semibold bg-transparent border-0 cursor-pointer focus:ring-0 text-gray-700"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(enquiry.id)}
                          className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-green-600">Trading Partner Details</span>
                <h3 className="text-xl font-black text-gray-900 mt-1">{selectedEnquiry.businessName}</h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-gray-50 rounded-2xl">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact Person</span>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{selectedEnquiry.fullName}</p>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-2xl">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</span>
                  <p className="text-sm font-bold text-green-700 mt-0.5">{selectedEnquiry.category}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-gray-50 rounded-2xl">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mobile Number</span>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{selectedEnquiry.mobileNumber}</p>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-2xl">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Member ID</span>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{selectedEnquiry.memberId || 'N/A'}</p>
                </div>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</span>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{selectedEnquiry.email}</p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Message / Details</span>
                <p className="text-sm font-medium text-gray-700 mt-1 whitespace-pre-wrap leading-relaxed">
                  {selectedEnquiry.message || 'No additional message provided.'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500">Status:</span>
                  <StatusBadge status={selectedEnquiry.status} />
                </div>
                <div className="text-xs text-gray-400">
                  Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CooperativeTradingEnquiries;
