import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send, 
  ArrowLeft,
  CheckCircle,
  Landmark,
  CircleDollarSign,
  Shield,
  ArrowRight
} from 'lucide-react';

const FinancialEnquiry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const typeFromQuery = queryParams.get('type') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    city: '',
    investmentAmount: '',
    selectedScheme: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);

  useEffect(() => {
    const schemeMap = {
      'sri-nithya': 'SRI NITHYA DAILY DEPOSIT',
      'sanghamithra': 'SANGHAMITHRA SAVINGS PLAN',
      'kfd': 'KAMADHENU FIXED DEPOSIT (KFD)',
      'term-deposit': 'KAMADHENU TERM DEPOSIT'
    };
    
    if (typeFromQuery && schemeMap[typeFromQuery]) {
      setFormData(prev => ({ ...prev, selectedScheme: schemeMap[typeFromQuery] }));
    }
  }, [typeFromQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/financial-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);
        window.scrollTo(0, 0);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Error connecting to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
        <div className="max-w-xl w-full bg-white rounded-[32px] p-12 text-center shadow-xl border border-gray-100 animate-fadeIn">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold text-[#0B1F4D] mb-4 tracking-tight">Enquiry Submitted!</h2>
          <p className="text-slate-500 mb-8 font-medium leading-relaxed">
            Thank you for your interest. Our financial advisors will contact you shortly to discuss your investment goals.
          </p>
          <button 
            onClick={() => navigate('/divisions/financial')}
            className="w-full bg-[#002d1d] text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#c5a059] transition-all shadow-xl"
          >
            Back to Financial Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7F3E8] min-h-screen font-inter pb-20 pt-28">
      <div className="max-w-4xl mx-auto px-6 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 md:p-16 border border-white/50 backdrop-blur-sm">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-[#C9A13B]/10 text-[#C9A13B] rounded-full flex items-center justify-center mx-auto mb-6">
              <Landmark className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F4D] mb-4 tracking-tight">Financial Enquiry</h2>
            <div className="w-20 h-1 bg-[#C9A13B]/40 mx-auto rounded-full"></div>
            <p className="text-gray-500 font-medium mt-6">Please fill the details below and our team will get back to you.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                  <input 
                    required
                    type="text" 
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                  <input 
                    required
                    type="tel" 
                    placeholder="Enter your mobile number"
                    value={formData.phoneNumber}
                    onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium"
                  />
                </div>
              </div>

              {/* City / Location */}
              <div className="space-y-2">
                <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                  City / Location <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Hyderabad, Telangana"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium"
                  />
                </div>
              </div>

              {/* Investment Amount */}
              <div className="space-y-2">
                <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                  Investment Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <CircleDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. ₹50,000"
                    value={formData.investmentAmount}
                    onChange={e => setFormData({...formData, investmentAmount: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium"
                  />
                </div>
              </div>

              {/* Selected Scheme */}
              <div className="space-y-2">
                <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                  Selected Scheme <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                  <select 
                    required
                    className="w-full pl-12 pr-10 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium appearance-none"
                    value={formData.selectedScheme}
                    onChange={e => setFormData({...formData, selectedScheme: e.target.value})}
                  >
                    <option value="">Select a Scheme</option>
                    <option value="SRI NITHYA DAILY DEPOSIT">SRI NITHYA DAILY DEPOSIT</option>
                    <option value="SANGHAMITHRA SAVINGS PLAN">SANGHAMITHRA SAVINGS PLAN</option>
                    <option value="KAMADHENU FIXED DEPOSIT (KFD)">KAMADHENU FIXED DEPOSIT (KFD)</option>
                    <option value="KAMADHENU TERM DEPOSIT">KAMADHENU TERM DEPOSIT</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message / Notes */}
              <div className="space-y-2">
                <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                  Message / Notes
                </label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                  <textarea 
                    rows="4"
                    placeholder="Any specific questions or requirements?"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium resize-none"
                  ></textarea>
                </div>
              </div>

            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0B1F4D] text-white py-5 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-[#123C73] transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 group"
            >
              {isSubmitting ? 'Submitting...' : (
                <>
                  Submit Enquiry <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-center text-gray-400 text-[11px] font-medium flex items-center justify-center gap-2">
              <Shield size={14} className="text-[#C9A13B]" />
              Your information is safe with us and will only be used for enquiry purposes.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinancialEnquiry;
