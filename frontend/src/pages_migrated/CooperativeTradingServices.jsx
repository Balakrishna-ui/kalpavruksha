import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, Store, Handshake, Factory, Wheat, Briefcase, 
  Truck, Leaf, ShoppingBag, Shirt, Home, GraduationCap, 
  HeartPulse, Building2, User, Grid, Package, Settings,
  FileText, CheckCircle, ClipboardList, Megaphone, Headphones, 
  TrendingUp, Send, Phone, CheckCircle2, Users, ArrowRight,
  AlertCircle
} from 'lucide-react';
import { publicApi } from '../api';

const CooperativeTradingServices = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    mobileNumber: '',
    email: '',
    category: '',
    memberId: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business Name is required.';
    } else if (formData.businessName.trim().length < 2) {
      newErrors.businessName = 'Business Name must be at least 2 characters.';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required.';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.category || formData.category === 'Product / Service Category') {
      newErrors.category = 'Please select a Product / Service Category.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage({ type: '', text: '' });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await publicApi.submitCooperativeTradingEnquiry({
        fullName: formData.fullName.trim(),
        businessName: formData.businessName.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        email: formData.email.trim(),
        category: formData.category,
        memberId: formData.memberId.trim() || undefined,
        message: formData.message.trim() || undefined
      });

      setSubmitMessage({
        type: 'success',
        text: 'Thank you! Your marketplace partner enquiry has been submitted successfully. Our team will contact you shortly.'
      });

      setFormData({
        fullName: '',
        businessName: '',
        mobileNumber: '',
        email: '',
        category: '',
        memberId: '',
        message: ''
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      setSubmitMessage({
        type: 'error',
        text: err.message || 'Failed to submit enquiry. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const whatYouCanDo = [
    { title: 'Buy\nProducts', icon: ShoppingCart, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Sell\nProducts', icon: Factory, color: 'text-green-700', bg: 'bg-green-50' },
    { title: 'Sell\nAgricultural Produce', icon: Wheat, color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Offer\nProfessional Services', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Become a\nDistributor', icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Earn\nReferral Rewards', icon: Handshake, color: 'text-orange-600', bg: 'bg-orange-50' }
  ];

  const categories = [
    { title: 'Agriculture', sub: '12+ Subcategories', icon: Leaf, color: 'text-green-500' },
    { title: 'Dairy & Livestock', sub: '9+ Subcategories', icon: Package, color: 'text-orange-800' },
    { title: 'Food & Grocery', sub: '11+ Subcategories', icon: ShoppingBag, color: 'text-orange-500' },
    { title: 'Manufacturing', sub: '7+ Subcategories', icon: Factory, color: 'text-teal-600' },
    { title: 'Fashion & Lifestyle', sub: '8+ Subcategories', icon: Shirt, color: 'text-purple-500' },
    { title: 'Home & Construction', sub: '10+ Subcategories', icon: Home, color: 'text-yellow-500' },
    { title: 'Business Services', sub: '10+ Subcategories', icon: Briefcase, color: 'text-blue-600' },
    { title: 'Education', sub: '8+ Subcategories', icon: GraduationCap, color: 'text-blue-800' },
    { title: 'Healthcare', sub: '7+ Subcategories', icon: HeartPulse, color: 'text-cyan-500' },
    { title: 'Logistics', sub: '5+ Subcategories', icon: Truck, color: 'text-red-500' },
    { title: 'Real Estate', sub: '5+ Subcategories', icon: Building2, color: 'text-teal-500' },
    { title: 'Professional Services', sub: '9+ Subcategories', icon: User, color: 'text-blue-400' }
  ];

  const sellerSteps = [
    { num: 1, title: 'Submit\nRequest', icon: FileText },
    { num: 2, title: 'Verification', icon: CheckCircle },
    { num: 3, title: 'Catalogue\nListing', icon: ClipboardList },
    { num: 4, title: 'Marketing &\nPromotion', icon: Megaphone },
    { num: 5, title: 'Receive\nOrders', icon: ShoppingCart },
    { num: 6, title: 'Delivery &\nSettlement', icon: Truck },
    { num: 7, title: 'Customer\nSupport', icon: Headphones },
    { num: 8, title: 'Continue\nGrowing', icon: TrendingUp }
  ];

  const bannerStats = [
    { title: 'Large Customer\nNetwork', icon: Users },
    { title: 'Digital Marketing\nSupport', icon: Megaphone },
    { title: 'Verified\nMarketplace', icon: CheckCircle2 },
    { title: 'Logistics\nCoordination', icon: Truck },
    { title: 'Business\nConsultancy', icon: Briefcase },
    { title: 'Sales & Order\nSupport', icon: Headphones }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* ── HERO BANNER ────────────────────────────── */}
      <section className="relative w-full min-h-[550px] flex items-center bg-gray-50 overflow-hidden">
        {/* Background Image Setup */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/img/tra.png" 
            alt="Trading Services Background" 
            className="w-full h-full object-cover object-right lg:object-center"
            onError={(e) => {
              // Fallback if image doesn't exist yet
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          {/* Gradient placeholder fallback */}
          <div className="hidden absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50"></div>
          {/* Overlay to ensure text readability on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent w-full md:w-2/3 lg:w-1/2"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 w-full py-16">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
              <span className="block text-[#0B1F4D]">Cooperative</span>
              <span className="block text-[#1B5E20]">Trading Services</span>
            </h1>
            
            <h2 className="text-[16px] md:text-[18px] lg:text-[20px] font-bold text-[#D97706] mb-4">
              From Producers to Markets. From Members to Opportunities.
            </h2>
            
            <p className="text-[13px] md:text-[15px] text-gray-700 font-medium mb-8 leading-relaxed max-w-xl">
              One trusted marketplace where farmers, manufacturers, entrepreneurs, 
              professionals, and service providers can connect with thousands of 
              cooperative members and customers.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              {/* Button 1 */}
              <button className="flex items-center gap-2 bg-gradient-to-r from-[#4CA154] to-[#2E7D32] text-white px-5 py-3 rounded-md font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <ShoppingCart className="w-4 h-4" strokeWidth={2.5} />
                Browse Marketplace
              </button>
              
              {/* Button 2 */}
              <button className="flex items-center gap-2 bg-[#0A3D1C] text-white px-5 py-3 rounded-md font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <Store className="w-4 h-4" strokeWidth={2.5} />
                Sell Your Products
              </button>
              
              {/* Button 3 */}
              <button className="flex items-center gap-2 bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white px-5 py-3 rounded-md font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <Handshake className="w-4 h-4" strokeWidth={2.5} />
                Become a Trading Partner
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW SECTION ────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="w-full bg-[#F6FAF6] rounded-xl flex flex-col lg:flex-row items-stretch overflow-hidden border border-gray-100 shadow-sm"
        >
          {/* Icon Area */}
          <div className="p-6 lg:p-8 xl:p-10 flex justify-center items-center shrink-0">
            <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
              {/* Arcs Design */}
              <div className="absolute inset-0 rounded-full border-[8px] border-transparent border-l-green-200 border-r-green-200 opacity-80 transform rotate-[25deg]"></div>
              <div className="absolute inset-2 rounded-full border-[6px] border-transparent border-t-green-200/60 border-b-green-200/60 opacity-80 transform -rotate-[15deg]"></div>
              <div className="absolute inset-4 rounded-full border-[4px] border-green-100 opacity-50"></div>
              
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0A6C32] flex items-center justify-center relative z-10 shadow-lg">
                <ShoppingCart className="text-white w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="py-8 px-6 lg:py-12 lg:px-0 lg:pr-10 flex-1 flex flex-col justify-center">
            <h3 className="text-[#0B6E32] font-black text-lg md:text-xl mb-4 tracking-wide uppercase">OVERVIEW</h3>
            <p className="text-[#222222] font-medium text-[14px] md:text-[15px] leading-relaxed mb-5">
              Kalpavruksha Cooperative Trading Services is a cooperative marketplace and business facilitation platform. 
              The cooperative helps connect sellers with buyers by providing product promotion, supplier verification, 
              logistics coordination, marketing, and member referrals. 
            </p>
            <p className="text-[#222222] font-medium text-[14px] md:text-[15px] leading-relaxed">
              Rather than manufacturing every product, the cooperative acts as a trusted coordination platform for 
              quality suppliers and service providers.
            </p>
          </div>
          
          {/* Image Area */}
          <div className="w-full lg:w-[35%] xl:w-[400px] shrink-0 relative min-h-[250px] lg:min-h-full">
            <img 
              src="/img/trade1.png" 
              alt="Team Overview" 
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── WHAT YOU CAN DO SECTION ────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-[#0B1F4D] mb-2 uppercase tracking-wide text-center">What You Can Do</h2>
          <div className="w-16 h-1 bg-green-700 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {whatYouCanDo.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${item.bg} rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer min-h-[160px]`}
            >
              <item.icon className={`w-12 h-12 ${item.color} mb-4`} strokeWidth={1.5} />
              <span className="text-[#0B1F4D] font-bold text-sm whitespace-pre-line leading-tight">
                {item.title}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MARKETPLACE CATALOGUE SECTION ────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[#0B1F4D] mb-1 uppercase tracking-wide">Marketplace Catalogue</h2>
          <p className="text-[#0B1F4D] font-bold text-sm">Browse by Category</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
          {categories.map((cat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <cat.icon className={`w-10 h-10 ${cat.color} mb-3`} strokeWidth={1.5} />
              <h4 className="text-[#0B1F4D] font-bold text-[13px] mb-1">{cat.title}</h4>
              <span className="text-gray-500 text-[10px] font-medium">{cat.sub}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="flex items-center gap-2 bg-[#0A6C32] text-white px-6 py-3 rounded-md font-bold shadow-md hover:bg-[#085a29] transition-colors">
            <Grid className="w-5 h-5" />
            View All Categories
          </button>
        </div>
      </section>

      {/* ── HOW IT WORKS FOR SELLERS ────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-[#0B1F4D] mb-2 uppercase tracking-wide text-center">How It Works For Sellers</h2>
        </div>
        
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-start w-full relative">
          {sellerSteps.map((step, index) => (
            <div key={index} className="flex items-center mb-8 lg:mb-0 w-1/4 lg:w-auto shrink-0 relative">
              <div className="flex flex-col items-center z-10 mx-auto lg:mx-0 w-[100px]">
                {/* Circle Icon */}
                <div className="w-14 h-14 rounded-full border border-green-200 bg-green-50 flex items-center justify-center mb-2 shadow-sm text-green-700">
                  <step.icon className="w-6 h-6" strokeWidth={2} />
                </div>
                {/* Number & Text */}
                <span className="text-green-700 font-bold text-sm mb-1">{step.num}</span>
                <span className="text-center text-[11px] font-bold text-[#0B1F4D] whitespace-pre-line leading-tight">
                  {step.title}
                </span>
              </div>
              
              {/* Connector Arrow (Hide on last item or mobile flow) */}
              {index < sellerSteps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center w-[40px] xl:w-[60px] translate-y-[-20px]">
                  <div className="w-full border-t border-dashed border-green-600 relative">
                    <ArrowRight className="absolute -right-2 -top-[10px] w-5 h-5 text-green-600" strokeWidth={1} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── BECOME A MARKETPLACE PARTNER ────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Form Side */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <h2 className="text-2xl font-black text-[#0B1F4D] mb-2">Become a Marketplace Partner</h2>
            <p className="text-gray-600 text-sm font-medium mb-8 max-w-md">
              Interested in selling through Kalpavruksha? Fill in your details and our team will contact you.
            </p>
            
            {submitMessage.text && (
              <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-start gap-3 ${
                submitMessage.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitMessage.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <span>{submitMessage.text}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full flex flex-col">
                  <input 
                    type="text" 
                    placeholder="Full Name *" 
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full p-3 rounded-md border ${errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-gray-200'} text-sm focus:outline-none focus:border-green-600 transition-colors`} 
                  />
                  {errors.fullName && <p className="text-red-500 text-xs font-semibold mt-1 pl-1">{errors.fullName}</p>}
                </div>
                <div className="w-full flex flex-col">
                  <input 
                    type="text" 
                    placeholder="Business Name *" 
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className={`w-full p-3 rounded-md border ${errors.businessName ? 'border-red-400 bg-red-50/20' : 'border-gray-200'} text-sm focus:outline-none focus:border-green-600 transition-colors`} 
                  />
                  {errors.businessName && <p className="text-red-500 text-xs font-semibold mt-1 pl-1">{errors.businessName}</p>}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full flex flex-col">
                  <input 
                    type="tel" 
                    placeholder="Mobile Number *" 
                    value={formData.mobileNumber}
                    maxLength={10}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      handleInputChange('mobileNumber', val);
                    }}
                    className={`w-full p-3 rounded-md border ${errors.mobileNumber ? 'border-red-400 bg-red-50/20' : 'border-gray-200'} text-sm focus:outline-none focus:border-green-600 transition-colors`} 
                  />
                  {errors.mobileNumber && <p className="text-red-500 text-xs font-semibold mt-1 pl-1">{errors.mobileNumber}</p>}
                </div>
                <div className="w-full flex flex-col">
                  <input 
                    type="email" 
                    placeholder="Email Address *" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full p-3 rounded-md border ${errors.email ? 'border-red-400 bg-red-50/20' : 'border-gray-200'} text-sm focus:outline-none focus:border-green-600 transition-colors`} 
                  />
                  {errors.email && <p className="text-red-500 text-xs font-semibold mt-1 pl-1">{errors.email}</p>}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full flex flex-col">
                  <select 
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className={`w-full p-3 rounded-md border ${errors.category ? 'border-red-400 bg-red-50/20' : 'border-gray-200'} text-sm ${!formData.category ? 'text-gray-400' : 'text-gray-900'} focus:outline-none focus:border-green-600 bg-white transition-colors`}
                  >
                    <option value="" disabled>Product / Service Category *</option>
                    <option value="Agriculture" className="text-gray-900">Agriculture</option>
                    <option value="Dairy & Livestock" className="text-gray-900">Dairy & Livestock</option>
                    <option value="Food & Grocery" className="text-gray-900">Food & Grocery</option>
                    <option value="Manufacturing" className="text-gray-900">Manufacturing</option>
                    <option value="Fashion & Lifestyle" className="text-gray-900">Fashion & Lifestyle</option>
                    <option value="Home & Construction" className="text-gray-900">Home & Construction</option>
                    <option value="Business Services" className="text-gray-900">Business Services</option>
                    <option value="Professional Services" className="text-gray-900">Professional Services</option>
                  </select>
                  {errors.category && <p className="text-red-500 text-xs font-semibold mt-1 pl-1">{errors.category}</p>}
                </div>

                <div className="w-full flex flex-col">
                  <input 
                    type="text" 
                    placeholder="Member ID (Optional)" 
                    value={formData.memberId}
                    onChange={(e) => handleInputChange('memberId', e.target.value)}
                    className="w-full p-3 rounded-md border border-gray-200 text-sm focus:outline-none focus:border-green-600 transition-colors" 
                  />
                </div>
              </div>

              <div className="w-full flex flex-col">
                <textarea 
                  placeholder="Message (Optional)" 
                  rows={3} 
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-200 text-sm focus:outline-none focus:border-green-600 transition-colors"
                ></textarea>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-[#0A6C32] text-white px-6 py-3 rounded-md font-bold shadow-md hover:bg-[#085a29] transition-colors text-sm disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                  <Send className="w-4 h-4" />
                </button>
                <a 
                  href="/contact" 
                  className="flex items-center gap-2 bg-white text-green-700 border border-green-600 px-6 py-3 rounded-md font-bold shadow-sm hover:bg-green-50 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Contact Our Team
                </a>
              </div>
            </form>
          </div>
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative min-h-[400px]">
            <img 
              src="/img/trade.png" 
              alt="Marketplace Partner" 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            {/* Overlay Box */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#0B3D1B]/95 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-green-800">
              <ul className="space-y-4">
                {['Verified Marketplace', 'Secure Registration', 'Cooperative Support', 'Business Growth\nAssistance'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <span className="text-white font-bold text-sm whitespace-pre-line leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM BANNER ────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 pb-24">
        <div className="bg-[#0B4D21] rounded-2xl w-full p-6 md:p-8 flex flex-wrap justify-between items-center gap-6 shadow-xl">
          {bannerStats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 w-[45%] md:w-auto">
              <stat.icon className="w-8 h-8 text-green-400 shrink-0 opacity-80" strokeWidth={1.5} />
              <span className="text-white font-bold text-[12px] leading-tight whitespace-pre-line opacity-90">{stat.title}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default CooperativeTradingServices;
