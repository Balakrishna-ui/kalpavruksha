import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Membership = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    mobileNumber: '',
    address: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await addDoc(collection(db, 'members'), {
        ...formData,
        membershipType: 'Standard',
        createdAt: new Date().toISOString()
      });

      setIsSuccess(true);
      setFormData({
        fullName: '',
        fatherName: '',
        mobileNumber: '',
        address: '',
        email: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F7F3E8] min-h-screen font-inter pb-20 pt-20">
      {/* Form Section */}
      <section id="membership-form" className="max-w-4xl mx-auto px-6 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 md:p-16 border border-white/50 backdrop-blur-sm">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-[#C9A13B]/10 text-[#C9A13B] rounded-full flex items-center justify-center mx-auto mb-6">
              <UserCheck className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F4D] mb-4">Become a Member</h2>
            <div className="w-20 h-1 bg-[#C9A13B]/40 mx-auto rounded-full"></div>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                    <input 
                      type="text"
                      name="fullName"
                      required
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium"
                    />
                  </div>
                </div>

                {/* Father Name */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                    Father Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                    <input 
                      type="text"
                      name="fatherName"
                      required
                      placeholder="Enter your father name"
                      value={formData.fatherName}
                      onChange={handleInputChange}
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
                      type="tel"
                      name="mobileNumber"
                      required
                      placeholder="Enter your mobile number"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                    <textarea 
                      name="address"
                      required
                      rows="4"
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium resize-none"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-[#0B1F4D] flex items-center gap-2">
                    Email Address (Optional)
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#C9A13B] transition-colors" />
                    <input 
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A13B]/20 focus:bg-white transition-all text-gray-700 font-medium"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#0B1F4D] text-white py-5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#123C73] transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 group"
              >
                {isSubmitting ? 'Processing...' : 'Submit Request'}
                {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>

              <p className="text-center text-gray-400 text-xs font-medium flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A13B]" />
                Your information is safe with us and will only be used for membership purposes.
              </p>
            </form>
          ) : (
            <div className="text-center py-20 animate-fadeIn">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <UserCheck className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold text-[#0B1F4D] mb-4 tracking-tight">Application Submitted!</h3>
              <p className="text-gray-500 text-lg font-medium max-w-md mx-auto">
                Thank you for choosing to join the Kalpavruksha family. Our team will review your application and contact you within 48 hours.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-10 text-[#C9A13B] font-bold hover:underline"
              >
                Back to form
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 mt-20 md:mt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-white shadow-lg rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Users className="w-10 h-10 text-[#C9A13B]" />
            </div>
            <h4 className="text-xl font-bold text-[#0B1F4D] mb-4">Trusted Community</h4>
            <p className="text-gray-500 font-medium leading-relaxed">
              Be part of a strong and supportive community working for mutual growth.
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-white shadow-lg rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border-x-4 border-transparent border-t-[#C9A13B]/20">
              <ShieldCheck className="w-10 h-10 text-[#C9A13B]" />
            </div>
            <h4 className="text-xl font-bold text-[#0B1F4D] mb-4">Secure Membership</h4>
            <p className="text-gray-500 font-medium leading-relaxed">
              Your information and membership are safe and protected.
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-white shadow-lg rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <TrendingUp className="w-10 h-10 text-[#C9A13B]" />
            </div>
            <h4 className="text-xl font-bold text-[#0B1F4D] mb-4">Sustainable Growth</h4>
            <p className="text-gray-500 font-medium leading-relaxed">
              Grow with sustainable opportunities designed for a better tomorrow.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
