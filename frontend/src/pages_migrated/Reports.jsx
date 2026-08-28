import React, { useState } from 'react';
import { 
  FileText, 
  Download,
  Users,
  Briefcase,
  Landmark,
  ShoppingBag,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { adminApi } from '../api';

const Reports = () => {
  const [downloading, setDownloading] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDownload = async (type, apiFunc, filename) => {
    setDownloading(type);
    try {
      const blob = await apiFunc();
      
      // The backend now returns a Blob directly
      if (blob.size === 0) {
        showToast('warning', `No records found for ${type}`);
        return;
      }
      
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", downloadUrl);
      link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      
      showToast('success', `${type} exported successfully`);
    } catch (error) {
      console.error(`Error exporting ${type}:`, error);
      showToast('error', error.message || `Failed to export ${type}`);
    } finally {
      setDownloading(null);
    }
  };

  const reportModules = [
    {
      id: 'members',
      title: 'Membership Directory',
      description: 'Export all approved, pending, and rejected member applications.',
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      bgColor: 'bg-emerald-50',
      action: () => handleDownload('Memberships', adminApi.exportMembers, 'memberships_report')
    },
    {
      id: 'enquiries',
      title: 'Service Enquiries (Leads)',
      description: 'Export all business and service enquiry leads.',
      icon: <Briefcase className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
      action: () => handleDownload('Enquiries', adminApi.exportEnquiries, 'enquiries_report')
    },
    {
      id: 'financial',
      title: 'Financial Enquiries',
      description: 'Export all financial scheme enquiries.',
      icon: <Landmark className="w-6 h-6 text-amber-600" />,
      bgColor: 'bg-amber-50',
      action: () => handleDownload('Financial Enquiries', adminApi.exportFinancialEnquiries, 'financial_report')
    },
    {
      id: 'services',
      title: 'Services Requests',
      description: 'Export detailed service requests and their current statuses.',
      icon: <ShoppingBag className="w-6 h-6 text-purple-600" />,
      bgColor: 'bg-purple-50',
      action: () => handleDownload('Services Requests', adminApi.exportServices, 'services_report')
    }
  ];

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
        <h1 className="text-2xl font-black text-[#0B1F4D] tracking-tight">Data Reports</h1>
        <p className="text-slate-400 text-sm font-medium">Export and download platform data for external analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportModules.map((module) => (
          <div key={module.id} className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className={`${module.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center shrink-0`}>
                {module.icon}
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0B1F4D]">{module.title}</h3>
                <p className="text-slate-500 text-xs font-semibold mt-1 leading-relaxed">
                  {module.description}
                </p>
              </div>
            </div>
            
            <button 
              onClick={module.action}
              disabled={downloading === module.title}
              className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                downloading === module.title 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-[#123C73] text-white hover:bg-[#0B1F4D] shadow-lg shadow-blue-900/20 active:scale-95'
              }`}
            >
              {downloading === module.title ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download size={16} />
                  Download CSV
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
