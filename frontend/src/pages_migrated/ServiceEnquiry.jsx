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
  Briefcase,
  Share2,
  Shield,
  ArrowRight
} from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ServiceEnquiry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const serviceFromQuery = queryParams.get('service') || queryParams.get('type') || '';
  const source = queryParams.get('source') || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Map URL types to display names
    const serviceMap = {
      'business-promotion': 'Member Business Promotion',
      'partnerships': 'Partnership Opportunities',
      'advertisement': 'Advertisement Platform',
      'skill-dev': 'Skill Development Programs',
      'social-media': 'Social Media Management',
      'business-consultancy': 'Business Growth Strategy'
    };
    
    if (serviceFromQuery) {
      if (serviceMap[serviceFromQuery]) {
        setFormData(prev => ({ ...prev, service: serviceMap[serviceFromQuery] }));
      } else {
        // If it's a direct service name (like from the new consultancy page)
        setFormData(prev => ({ ...prev, service: serviceFromQuery }));
      }
    }
  }, [serviceFromQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'serviceEnquiries'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      setIsSuccess(true);
      window.scrollTo(0, 0);
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
          <h2 className="text-3xl font-bold text-[#0B1F4D] mb-4 tracking-tight">Thank you!</h2>
          <p className="text-slate-500 mb-8 font-medium leading-relaxed">
            Our team will contact you shortly.
          </p>
          <button 
            onClick={() => {
              if (source === 'social-media-services') {
                navigate('/services/social-media');
              } else {
                // Default to business consultancy as per requirements
                navigate('/services/business-consultancy');
              }
            }}
            className="w-full bg-[#0B1F4D] text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#C9A13B] hover:text-white transition-all shadow-xl"
          >
            Back to Services
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
              <Briefcase className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F4D] mb-4 tracking-tight">Service Enquiry</h2>
            <div className="w-20 h-1 bg-[#C9A13B]/40 mx-auto rounded-full"></div>
            <p className="text-gray-500 font-medium mt-6">Fill the form below to get started with our professional services.</p>
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
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                  <input 
                    required
                    type="tel" 
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Hyderabad, Telangana"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium"
                  />
                </div>
              </div>

              {/* Selected Service */}
              <div className="space-y-2">
                <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                  Selected Service <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                  <select 
                    required
                    className="w-full pl-12 pr-10 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium appearance-none"
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="">Select a Service</option>
                    <optgroup label="Business Consultancy">
                      <option value="Member Business Promotion">Member Business Promotion</option>
                      <option value="Partnership & Collaboration Support">Partnership & Collaboration Support</option>
                      <option value="Business Growth Strategy">Business Growth Strategy</option>
                      <option value="Financial Guidance & Funding">Financial Guidance & Funding</option>
                      <option value="Market Access & Sales">Market Access & Sales</option>
                      <option value="Branding & Visibility Support">Branding & Visibility Support</option>
                      <option value="Training & Skill Development">Training & Skill Development</option>
                    </optgroup>
                    <optgroup label="Social Media Services">
                      <option value="Social Media - Business Promotion">Business Promotion (Social Media)</option>
                      <option value="Content Creation & Branding">Content Creation & Branding</option>
                      <option value="Social Media Management">Social Media Management</option>
                      <option value="Paid Advertising">Paid Advertising (Ads)</option>
                      <option value="Influencer & Collaboration Support">Influencer & Collaboration Support</option>
                      <option value="Short Video & Reels Strategy">Short Video & Reels Strategy</option>
                    </optgroup>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Your Message */}
              <div className="space-y-2">
                <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                  Your Message
                </label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                  <textarea 
                    rows="4"
                    placeholder="Tell us more about your requirements..."
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

export default ServiceEnquiry;
