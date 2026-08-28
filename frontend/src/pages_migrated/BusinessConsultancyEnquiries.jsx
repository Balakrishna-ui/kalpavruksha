import React, { useState, useEffect } from 'react';
import { Download, Search, AlertCircle, RefreshCw, Eye, CheckCircle, Clock, XCircle, MoreVertical, FileText } from 'lucide-react';
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

const BusinessConsultancyEnquiries = () => {
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
      const response = await adminApi.getBusinessConsultancyEnquiries();
      setEnquiries(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch business consultancy enquiries');
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
      const blob = await adminApi.exportBusinessConsultancyEnquiries();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `business-consultancy-enquiries-${new Date().toISOString().split('T')[0]}.csv`;
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
      await adminApi.put(`/admin/business-consultancy-enquiries/${id}/status`, { status: newStatus });
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
      await adminApi.deleteBusinessConsultancyEnquiry(id);
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

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = 
      enquiry.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.mobile?.includes(searchTerm);
      
    const matchesTab = activeTab === 'All' ? true : enquiry.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === 'New').length,
    inProgress: enquiries.filter(e => e.status === 'Contacted' || e.status === 'In Progress').length,
    closed: enquiries.filter(e => e.status === 'Closed').length
  };

  return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Business Consultancy Enquiries</h1>
            <p className="text-gray-500 text-sm mt-1">Manage requests for business services and consultancy.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={fetchEnquiries}
              className="p-2 text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || enquiries.length === 0}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
            >
              <Download size={18} />
              {isExporting ? 'Exporting...' : 'Export CSV'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Enquiries</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <FileText size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">New</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.new}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Clock size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.inProgress}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <RefreshCw size={20} className="text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Closed</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.closed}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle size={20} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
              {['All', 'New', 'Contacted', 'In Progress', 'Closed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                    activeTab === tab 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search enquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <div>
              <h3 className="font-medium">Error loading data</h3>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Table Content */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Business Name</th>
                  <th className="px-6 py-4">Contact Person</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-forest" />
                      Loading enquiries...
                    </td>
                  </tr>
                ) : filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="w-10 h-10 text-gray-300 mb-3" />
                        <p className="text-base font-medium text-gray-900">No enquiries found</p>
                        <p className="text-sm mt-1">Try adjusting your filters or search term</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {enquiry.businessName}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{enquiry.contactPerson}</div>
                        <div className="text-gray-500 text-xs">{enquiry.mobile}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{enquiry.serviceRequired}</div>
                        <div className="text-gray-500 text-xs">{enquiry.industry}</div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={enquiry.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="text-forest hover:text-forest-dark font-medium text-sm inline-flex items-center gap-1 bg-forest/5 hover:bg-forest/10 px-3 py-1.5 rounded-md transition-colors"
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* Background overlay */}
              <div 
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm" 
                aria-hidden="true"
                onClick={() => setSelectedEnquiry(null)}
              ></div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              {/* Modal panel */}
              <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-gray-100">
                
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900" id="modal-title">
                      Enquiry Details
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none bg-white rounded-full p-1 border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    <XCircle size={24} />
                  </button>
                </div>

                {/* Content */}
                <div className="px-6 py-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Business Info */}
                    <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">Business Information</h4>
                      
                      <div>
                        <span className="block text-xs font-medium text-gray-500 mb-1">Business Name</span>
                        <span className="block text-sm text-gray-900 font-medium">{selectedEnquiry.businessName}</span>
                      </div>
                      
                      <div>
                        <span className="block text-xs font-medium text-gray-500 mb-1">Industry / Type</span>
                        <span className="block text-sm text-gray-900">{selectedEnquiry.industry}</span>
                      </div>
                      
                      <div>
                        <span className="block text-xs font-medium text-gray-500 mb-1">Service Required</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-forest/10 text-forest border border-forest/20">
                          {selectedEnquiry.serviceRequired}
                        </span>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">Contact Details</h4>
                      
                      <div>
                        <span className="block text-xs font-medium text-gray-500 mb-1">Contact Person</span>
                        <span className="block text-sm text-gray-900 font-medium">{selectedEnquiry.contactPerson}</span>
                      </div>
                      
                      <div>
                        <span className="block text-xs font-medium text-gray-500 mb-1">Mobile Number</span>
                        <span className="block text-sm text-gray-900">{selectedEnquiry.mobile}</span>
                      </div>
                      
                      <div>
                        <span className="block text-xs font-medium text-gray-500 mb-1">Email Address</span>
                        <span className="block text-sm text-gray-900">{selectedEnquiry.email || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message/Description */}
                  <div className="mt-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <span className="block text-xs font-semibold text-blue-800 mb-2 uppercase tracking-wider">Business Description</span>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {selectedEnquiry.businessDescription || <span className="text-gray-400 italic">No description provided.</span>}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <label className="text-sm font-medium text-gray-700">Update Status:</label>
                    <select
                      value={selectedEnquiry.status}
                      onChange={(e) => handleUpdateStatus(selectedEnquiry.id, e.target.value)}
                      disabled={isUpdating}
                      className="border border-gray-300 rounded-md text-sm py-1.5 pl-3 pr-8 focus:ring-forest focus:border-forest disabled:opacity-50 font-medium bg-white"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => handleDelete(selectedEnquiry.id)}
                      disabled={isUpdating}
                      className="w-full sm:w-auto inline-flex justify-center items-center rounded-md border border-red-200 border-transparent px-4 py-2 bg-white text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setSelectedEnquiry(null)}
                      className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default BusinessConsultancyEnquiries;
