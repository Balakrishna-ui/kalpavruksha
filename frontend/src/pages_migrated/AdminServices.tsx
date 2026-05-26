import { useState, useEffect } from 'react';
import { Search, Phone, Clock, Mail, MapPin, Trash2, CheckCircle } from 'lucide-react';


import { adminApi } from '../api';

const AdminServices = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEnquiries();
    const interval = setInterval(fetchEnquiries, 15000);
    return () => clearInterval(interval);
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await adminApi.getServices();
      setEnquiries(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching service enquiries:', error);
      setLoading(false);
    }
  };



  const filteredEnquiries = enquiries.filter(enquiry => 
    enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    enquiry.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-800">Service Enquiries Management</h1>
        <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          Live Updates Active
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search Name / Phone" 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-[11px] focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
             <button className="bg-slate-50 border border-slate-200 text-slate-600 px-4 py-2 rounded text-[11px] font-bold hover:bg-slate-100 transition-all">
                Export CSV
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact Detail</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Requested Service</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center text-slate-400 font-medium italic">Loading service requests...</td>
                </tr>
              ) : filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center text-slate-400 font-medium">No service enquiries found.</td>
                </tr>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-6 py-4 text-[11px] font-bold text-slate-800">{enquiry.name}</td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] text-slate-600 font-bold">
                          <Phone size={12} className="text-blue-500" /> {enquiry.phone}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <Mail size={12} /> {enquiry.email || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[11px] text-slate-600">
                        <MapPin size={12} className="text-slate-400" /> {enquiry.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter border ${
                        enquiry.service.includes('Social') 
                          ? 'bg-blue-50 text-blue-600 border-blue-100' 
                          : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {enquiry.service}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[11px] text-slate-500 italic max-w-xs truncate" title={enquiry.message}>
                      {enquiry.message || 'No message provided'}
                    </td>
                    <td className="px-6 py-4 text-[11px] text-slate-400">
                      <div className="flex items-center gap-2">
                        <Clock size={12} />
                        {new Date(enquiry.createdAt).toLocaleDateString('en-GB')}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-3">
                          <button className="text-slate-400 hover:text-emerald-500" title="Mark Done">
                            <CheckCircle size={14} />
                          </button>
                          <button className="text-slate-400 hover:text-red-500" title="Delete">
                            <Trash2 size={14} />
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
    </div>
  );
};

export default AdminServices;
