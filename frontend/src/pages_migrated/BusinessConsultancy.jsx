import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  Megaphone,
  PenTool,
  MessageSquare,
  Target,
  Handshake,
  PlayCircle,
  Search,
  ClipboardList,
  Rocket,
  BarChart3,
  Users,
  TrendingUp,
  Star,
  ShieldCheck,
  CheckCircle2,
  Leaf,
  Eye,
  Trophy,
  Factory,
  ShoppingBag,
  Building2,
  User,
  UserCheck,
  Store,
  GraduationCap,
  Laptop,
  Briefcase,
  Lightbulb,
  Building,
  LineChart,
  Calculator,
  Scale,
  Settings,
  Globe,
  Scissors,
  Award,
  Truck,
  Zap,
  Maximize,
  ChevronRight,
  Network,
  Layers,
  Link2,
  FileText,
  Activity,
  Droplets,
  HeartPulse,
  Code,
  HardHat,
  Bed,
  Sun,
  Shirt,
  ShoppingCart,
  MoreHorizontal,
  Landmark,
  Loader2
} from 'lucide-react';
import { publicApi } from '../api';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const increment = numericValue / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= numericValue) {
              setCount(numericValue);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [numericValue, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

const BusinessConsultancy = () => {
  const navigate = useNavigate();

  // Custom hook for intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-on-scroll, .reveal-fade, .reveal-slide-right').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    mobile: '',
    email: '',
    industry: '',
    serviceRequired: '',
    businessDescription: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.businessName.trim()) return 'Business Name is required.';
    if (!formData.contactPerson.trim()) return 'Contact Person is required.';
    if (!formData.mobile.trim()) return 'Mobile Number is required.';
    if (!/^\d{10}$/.test(formData.mobile)) return 'Please enter a valid 10-digit mobile number.';
    if (!formData.email.trim()) return 'Email Address is required.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email address.';
    if (!formData.industry.trim() || formData.industry === 'Select industry') return 'Industry / Business Type is required.';
    if (!formData.serviceRequired.trim() || formData.serviceRequired === 'Select service') return 'Nature of Service Required is required.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });
    
    const error = validateForm();
    if (error) {
      setStatusMessage({ type: 'error', text: error });
      return;
    }

    setIsSubmitting(true);
    try {
      await publicApi.submitBusinessConsultancyEnquiry(formData);
      setStatusMessage({ 
        type: 'success', 
        text: 'Thank you! Your business enquiry has been submitted successfully.' 
      });
      setFormData({
        businessName: '',
        contactPerson: '',
        mobile: '',
        email: '',
        industry: '',
        serviceRequired: '',
        businessDescription: ''
      });
    } catch (err) {
      setStatusMessage({ 
        type: 'error', 
        text: err.message || 'Failed to submit enquiry. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const colors = {
    deepBlue: '#001a3d', 
    gold: '#c5a059',
    offWhite: '#fdfdfd',
  };

  const services = [
    { id: 'business-promotion', icon: <Megaphone size={28} />, title: 'Business Promotion', desc: 'We promote member businesses within our ecosystem, increasing visibility and connecting them with the right customers.' },
    { id: 'content-branding', icon: <PenTool size={28} />, title: 'Content Creation & Branding', desc: 'We design high-quality content that reflects your brand identity with consistent visuals, tone, and messaging.' },
    { id: 'social-media-management', icon: <MessageSquare size={28} />, title: 'Social Media Management', desc: 'End-to-end management including content planning, posting, and audience engagement to keep your business active and relevant.' },
    { id: 'paid-advertising', icon: <Target size={28} />, title: 'Paid Advertising', desc: 'Targeted ad campaigns on platforms like Facebook & Instagram to generate leads and drive real business results.' },
    { id: 'influencer-support', icon: <Handshake size={28} />, title: 'Influencer & Collaboration Support', desc: 'We connect businesses with local influencers and create collaboration opportunities to expand reach and build credibility.' },
    { id: 'video-reels-strategy', icon: <PlayCircle size={28} />, title: 'Short Video & Reels Strategy', desc: 'We help businesses leverage short-form videos to capture attention, increase engagement, and grow faster.' },
  ];

  const steps = [
    { num: '01', label: 'Understand', icon: <Search size={24} />, desc: 'We analyze your business, audience, and goals.' },
    { num: '02', label: 'Plan', icon: <ClipboardList size={24} />, desc: 'We create a customized content and promotion strategy.' },
    { num: '03', label: 'Execute', icon: <Rocket size={24} />, desc: 'We implement campaigns, content, and engagement activities.' },
    { num: '04', label: 'Optimize', icon: <BarChart3 size={24} />, desc: 'We continuously improve performance based on insights and results.' },
  ];

  const stats = [
    { val: '500+', label: 'Businesses Promoted', icon: <Eye size={22} /> },
    { val: '2X+', label: 'Average Engagement Increase', icon: <TrendingUp size={22} /> },
    { val: '100K+', label: 'Leads & Inquiries Generated', icon: <Users size={22} /> },
    { val: '98%', label: 'Client Satisfaction Rate', icon: <Star size={22} /> },
    { val: '40%+', label: 'Average Business Growth', icon: <BarChart3 size={22} /> },
  ];

  return (
    <div className="w-full bg-[#fdfdfd] overflow-hidden font-inter selection:bg-gold/30 selection:text-forest">
      
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-on-scroll.animate-reveal {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-fade {
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }
        .reveal-fade.animate-reveal {
          opacity: 1;
        }
        .reveal-slide-right {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-slide-right.animate-reveal {
          opacity: 1;
          transform: translateX(0);
        }
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
        .delay-400 { transition-delay: 400ms; }
        .parallax-bg {
          background-attachment: fixed;
          background-position: center;
        }
      `}</style>

      {/* ── SECTION 1: HERO BANNER ────────────────────────────────── */}
      <section className="relative h-[550px] md:h-[600px] flex items-center justify-center md:justify-start overflow-hidden bg-white">
        <div className="absolute inset-0 flex justify-end">
          <div 
            className="w-full h-full bg-cover parallax-bg transition-transform duration-[10s] hover:scale-105"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80")',
            }}
          />
        </div>
        
        {/* Gradient overlay to make text readable on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent w-full md:w-3/4"></div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full flex flex-col items-start pt-10">
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 tracking-tight text-left reveal-on-scroll">
            <span className="text-forest">Cooperative</span><br />
            <span className="text-navy">Business Services</span>
          </h1>

          <h3 className="text-lg md:text-xl text-navy font-bold mb-4 reveal-on-scroll delay-100 max-w-2xl">
            Empowering Entrepreneurs. Accelerating Businesses.<br/>
            Building Sustainable Enterprises.
          </h3>

          <p className="text-sm md:text-base text-gray-700 max-w-xl font-medium leading-relaxed text-left mb-8 reveal-on-scroll delay-200">
            A complete Business Growth Ecosystem where entrepreneurs, startups, 
            MSMEs, farmers, professionals, women entrepreneurs, and existing 
            businesses receive end-to-end support—from idea validation to 
            business expansion.
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 reveal-on-scroll delay-400 w-full justify-start">
             <button 
               onClick={() => navigate('/service-enquiry?type=business-consultancy')}
               className="bg-forest text-white px-5 md:px-8 py-3 rounded-lg font-bold text-xs md:text-sm flex items-center gap-2 hover:bg-emerald hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-forest/20"
             >
               <Rocket className="w-4 h-4" /> Start a Business
             </button>
             <button 
               onClick={() => navigate('/service-enquiry?type=business-consultancy')}
               className="bg-gold text-white px-5 md:px-8 py-3 rounded-lg font-bold text-xs md:text-sm flex items-center gap-2 hover:bg-gold-soft hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-gold/20"
             >
               <TrendingUp className="w-4 h-4" /> Grow Your Business
             </button>
             <button 
               onClick={() => navigate('/contact')}
               className="bg-white border-2 border-forest text-forest px-5 md:px-8 py-3 rounded-lg font-bold text-xs md:text-sm flex items-center gap-2 hover:bg-forest/5 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-gray-200"
             >
               Book Free Consultation
             </button>
          </div>
        </div>
      </section>
      {/* ── NEW SECTION: OVERVIEW & WHO WE SERVE ──────────────────── */}
      <section className="relative z-30 w-full max-w-full px-6 lg:px-24 mx-auto py-12">
        {/* Overview Box */}
        <div className="bg-forest/5 rounded-2xl border border-forest/10 p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 mb-16 shadow-sm reveal-on-scroll">
          <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-forest/20">
            <Users className="w-8 h-8 md:w-12 md:h-12 text-forest" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-forest mb-3">Overview</h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
              Kalpavruksha Cooperative Business Services supports entrepreneurs with business planning, registrations, compliance, branding, marketing, finance facilitation, technology, and continuous business development. Instead of approaching multiple consultants, members receive integrated support through a single cooperative platform.
            </p>
          </div>
          <div className="hidden md:block w-48 h-32 bg-contain bg-right bg-no-repeat opacity-80" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=300&q=80")' }}>
            {/* Abstract placeholder for the right-side illustration */}
          </div>
        </div>

        {/* Who We Serve Section */}
        <div className="text-center mb-10 reveal-on-scroll delay-100">
          <div className="flex items-center justify-center gap-4">
            <ArrowRight className="w-5 h-5 text-forest/50 rotate-180" />
            <h2 className="text-2xl md:text-3xl font-bold text-navy">Who We Serve</h2>
            <ArrowRight className="w-5 h-5 text-forest/50" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 reveal-on-scroll delay-200">
          {[
            { name: 'Startups', icon: Rocket },
            { name: 'Manufacturers', icon: Factory },
            { name: 'Farmers', icon: Leaf },
            { name: 'Retail Businesses', icon: ShoppingBag },
            { name: 'MSMEs', icon: Building2 },
            { name: 'Women Entrepreneurs', icon: User },
            { name: 'Professionals', icon: UserCheck },
            { name: 'Traders', icon: Store },
            { name: 'Students', icon: GraduationCap },
            { name: 'Freelancers', icon: Laptop },
            { name: 'Self Help Groups', icon: Users },
            { name: 'Existing Businesses', icon: Briefcase }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <item.icon className="w-8 h-8 md:w-10 md:h-10 text-forest mb-3" />
              <span className="text-xs md:text-sm font-bold text-navy">{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEW SECTION: BUSINESS SERVICE CATALOGUE ──────────────── */}
      <section className="relative z-30 w-full max-w-full px-6 lg:px-24 mx-auto py-16 bg-white">
        <div className="text-center mb-10 reveal-on-scroll">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">Business Service Catalogue</h2>
          <div className="w-10 h-[2px] bg-forest mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 reveal-on-scroll delay-100">
          {[
            { icon: Lightbulb, iconColor: 'text-white', iconBg: 'bg-green-700', title: 'Business Formation', items: ['Business Idea Validation', 'Business Model Development', 'Feasibility Study', 'Market Research', 'Project Planning', 'Business Roadmap', 'Financial Planning'] },
            { icon: Building, iconColor: 'text-white', iconBg: 'bg-green-600', title: 'Business Registration', items: ['Proprietorship', 'Partnership Firm', 'LLP Registration', 'Private Limited Company', 'Producer Company', 'Cooperative Registration Guidance', 'and more...'] },
            { icon: LineChart, iconColor: 'text-white', iconBg: 'bg-yellow-500', title: 'Project Reports & Finance', items: ['Detailed Project Reports (DPR)', 'Bankable Project Reports', 'Financial Projections', 'Loan Documentation', 'PMEGP / PMFME', 'Mudra Loan Guidance', 'and more...'] },
            { icon: Calculator, iconColor: 'text-white', iconBg: 'bg-green-600', title: 'Accounting & Compliance', items: ['GST Filing', 'Income Tax Filing', 'TDS Compliance', 'Payroll', 'Audit & ROC Compliance', 'Labour Law Compliance', 'and more...'] },
            { icon: Megaphone, iconColor: 'text-white', iconBg: 'bg-pink-500', title: 'Branding & Marketing', items: ['Brand Strategy', 'Logo & Brand Identity', 'Packaging Design', 'Brochure & Catalogue', 'Company Profile', 'Corporate Presentations', 'and more...'] },
            { icon: Laptop, iconColor: 'text-white', iconBg: 'bg-purple-600', title: 'Digital Marketing', items: ['Website Development', 'SEO', 'Social Media Marketing', 'Google Ads', 'Content Writing', 'Video & Graphic Design', 'and more...'] },
            { icon: TrendingUp, iconColor: 'text-white', iconBg: 'bg-blue-600', title: 'Sales & Business Growth', items: ['Sales Strategy', 'Lead Generation', 'Distributor & Dealer Network', 'Franchise Development', 'CRM', 'Business Expansion Planning', 'and more...'] },
            { icon: Scale, iconColor: 'text-white', iconBg: 'bg-teal-500', title: 'Legal Services', items: ['Business Agreements', 'Contracts', 'Legal Documentation', 'Trademark Guidance', 'IPR Guidance', 'Legal Notices', 'and more...'] },
            { icon: Users, iconColor: 'text-white', iconBg: 'bg-orange-800', title: 'HR & Org. Development', items: ['Recruitment', 'HR Policies & SOPs', 'Performance Management', 'Payroll Systems', 'Employee Training', 'Organizational Structure', 'and more...'] },
            { icon: Settings, iconColor: 'text-white', iconBg: 'bg-blue-500', title: 'Technology Solutions', items: ['ERP Consultation', 'CRM Implementation', 'Business Automation', 'Inventory Management', 'POS Systems', 'AI Business Solutions', 'and more...'] },
            { icon: GraduationCap, iconColor: 'text-white', iconBg: 'bg-orange-500', title: 'Business Training', items: ['Entrepreneurship Development', 'Leadership Training', 'Sales Training', 'Digital Skills', 'Financial Literacy', 'Team Building', 'and more...'] }
          ].map((cat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200/70 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${cat.iconBg} ${cat.iconColor}`}>
                  <cat.icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-navy text-[13px]">{cat.title}</h3>
              </div>
              <ul className="space-y-2">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] font-medium text-gray-700">
                    <ChevronRight className="w-3 h-3 text-forest mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Business Lifecycle Support Card */}
          <div className="bg-[#104a22] rounded-xl shadow-md p-4 text-white flex flex-col h-full relative overflow-hidden">
            <h3 className="font-semibold text-center text-[12px] mb-3 pb-2 border-b border-white/20">Business Lifecycle Support</h3>
            <div className="flex flex-col gap-1.5 relative z-10 px-2 mt-1">
              {[
                { icon: Lightbulb, text: 'Business Idea' },
                { icon: ClipboardList, text: 'Business Planning' },
                { icon: Building, text: 'Registration' },
                { icon: LineChart, text: 'Funding' },
                { icon: Megaphone, text: 'Brand Development' },
                { icon: Target, text: 'Marketing' },
                { icon: TrendingUp, text: 'Sales' },
                { icon: Globe, text: 'Expansion' },
                { icon: Users, text: 'Scale Up' },
                { icon: Trophy, text: 'Long-term Growth' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2 relative">
                  <div className="w-[18px] h-[18px] rounded-full border border-white/40 flex items-center justify-center bg-transparent shrink-0 z-10">
                    <step.icon className="w-2 h-2 text-white" />
                  </div>
                  {i < 9 && <div className="absolute w-[1px] h-[18px] bg-white/30 left-[9px] top-[14px] z-0"></div>}
                  <span className="text-[9px] text-white/70 font-black">›</span>
                  <span className="text-[10px] font-medium z-10">{step.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grow Your Existing Business */}
        <div className="mt-4 text-center reveal-on-scroll delay-200">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center">
              <div className="w-6 h-[1px] bg-forest/60"></div>
              <ChevronRight className="w-4 h-4 text-forest/60 rotate-180 -ml-1" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-navy">Grow Your Existing Business</h2>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-forest/60 -mr-1" />
              <div className="w-6 h-[1px] bg-forest/60"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { name: 'Increase Sales', icon: TrendingUp },
              { name: 'Expand Markets', icon: Globe },
              { name: 'Digital Transformation', icon: Settings },
              { name: 'Reduce Costs', icon: Scissors },
              { name: 'Improve Branding', icon: Award },
              { name: 'Build Distribution', icon: Truck },
              { name: 'Increase Productivity', icon: Zap },
              { name: 'Scale Operations', icon: Maximize }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200/60 p-3 flex flex-col items-center justify-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-h-[90px]">
                <item.icon className="w-6 h-6 text-forest mb-2" />
                <span className="text-[9px] font-bold text-navy leading-tight">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW SECTION: WHY CHOOSE / PROCESS / PACKAGES ───────────── */}
      <section className="relative z-30 w-full max-w-full px-6 lg:px-24 mx-auto py-12 bg-white border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
           {/* Card 1: Why Choose */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-5 flex flex-col">
              <h3 className="text-center font-bold text-navy mb-4 text-[15px]">Why Choose Kalpavruksha?</h3>
              {/* Table header */}
              <div className="grid grid-cols-2 bg-[#124b22] text-white text-[10px] font-bold rounded-t-lg p-2.5 text-center">
                 <div>Traditional Consultant</div>
                 <div>Kalpavruksha Cooperative</div>
              </div>
              {/* Table rows */}
              <div className="border border-t-0 border-gray-200/60 rounded-b-lg text-[9px] text-gray-700 font-medium">
                 {[
                   { t: 'One-time consultancy', k: 'Long-term business partner', icon: Building },
                   { t: 'Individual services', k: 'Integrated ecosystem', icon: Layers },
                   { t: 'Limited support', k: 'End-to-end assistance', icon: Network },
                   { t: 'No marketplace', k: 'Business promotion opportunities', icon: Store },
                   { t: 'Limited networking', k: 'Cooperative business network', icon: Users },
                   { t: 'No financial ecosystem', k: 'Finance + Business + Trading + Education', icon: Landmark },
                 ].map((row, i) => (
                   <div key={i} className="flex items-center border-b border-gray-100 last:border-0 p-2.5">
                     <row.icon className="w-3.5 h-3.5 text-[#124b22] mr-2 shrink-0" />
                     <div className="flex-1 pr-1">{row.t}</div>
                     <div className="flex-1 pl-1 font-semibold text-[#124b22]">{row.k}</div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Card 2: Process */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-5 flex flex-col justify-center">
              <h3 className="text-center font-bold text-navy mb-8 text-[15px]">Business Consultation Process</h3>
              <div className="grid grid-cols-4 gap-2 mb-10 relative">
                 <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-forest/30 -translate-y-1/2 z-0"></div>
                 {[
                   { name: 'Consultation Request', icon: MessageSquare },
                   { name: 'Business Assessment', icon: ClipboardList },
                   { name: 'Requirement Analysis', icon: BarChart3 },
                   { name: 'Strategy Development', icon: Target },
                 ].map((step, i) => (
                   <div key={i} className="flex flex-col items-center relative z-10 text-center">
                     <div className="w-10 h-10 rounded-full bg-white border border-[#124b22]/40 flex items-center justify-center mb-2 shadow-sm">
                       <step.icon className="w-4 h-4 text-[#124b22]" />
                     </div>
                     <span className="text-[9px] font-bold text-navy leading-tight">{step.name}</span>
                   </div>
                 ))}
              </div>
              <div className="grid grid-cols-4 gap-2 relative">
                 <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-forest/30 -translate-y-1/2 z-0"></div>
                 {[
                   { name: 'Proposal', icon: FileText },
                   { name: 'Execution', icon: Zap },
                   { name: 'Monitoring', icon: Link2 },
                   { name: 'Growth Support', icon: TrendingUp },
                 ].map((step, i) => (
                   <div key={i} className="flex flex-col items-center relative z-10 text-center">
                     <div className="w-10 h-10 rounded-full bg-white border border-[#124b22]/40 flex items-center justify-center mb-2 shadow-sm">
                       <step.icon className="w-4 h-4 text-[#124b22]" />
                     </div>
                     <span className="text-[9px] font-bold text-navy leading-tight">{step.name}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Card 3: Packages */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-5 flex flex-col">
              <h3 className="text-center font-bold text-navy mb-4 text-[15px]">Business Development Packages</h3>
              <div className="grid grid-cols-3 bg-[#f8f9f8] text-navy text-[10px] font-bold rounded-t-lg p-2 text-center border border-gray-200/60 border-b-0">
                 <div>Package</div>
                 <div>Suitable For</div>
                 <div>Includes</div>
              </div>
              <div className="border border-t-0 border-gray-200/60 rounded-b-lg text-[9px] text-gray-700 font-medium space-y-2 p-2">
                 {[
                   { name: 'Startup Launch', color: 'bg-green-700', suitable: 'New Entrepreneurs', includes: 'Registration, DPR, Branding' },
                   { name: 'Growth Package', color: 'bg-yellow-500', suitable: 'Existing Businesses', includes: 'Marketing, Sales, Digital' },
                   { name: 'Enterprise Package', color: 'bg-blue-600', suitable: 'MSMEs', includes: 'Automation, HR, Finance' },
                   { name: 'Corporate Package', color: 'bg-purple-600', suitable: 'Large Organizations', includes: 'End-to-End Consulting' },
                 ].map((pkg, i) => (
                   <div key={i} className="grid grid-cols-3 items-center text-center gap-1 border-b border-gray-100 last:border-0 pb-2 mb-1 last:pb-0 last:mb-0">
                     <div className={`${pkg.color} text-white font-bold py-1.5 px-1 rounded text-[8px]`}>{pkg.name}</div>
                     <div>{pkg.suitable}</div>
                     <div>{pkg.includes}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Industries We Support */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center">
              <div className="w-6 h-[1px] bg-forest/60"></div>
              <ChevronRight className="w-4 h-4 text-forest/60 rotate-180 -ml-1" />
            </div>
            <h2 className="text-xl font-bold text-navy">Industries We Support</h2>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-forest/60 -mr-1" />
              <div className="w-6 h-[1px] bg-forest/60"></div>
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-[repeat(14,minmax(0,1fr))] gap-2">
            {[
              { name: 'Agriculture', icon: Leaf },
              { name: 'Food Processing', icon: Factory },
              { name: 'Dairy', icon: Droplets },
              { name: 'Manufacturing', icon: Building2 },
              { name: 'Retail', icon: ShoppingCart },
              { name: 'Healthcare', icon: HeartPulse },
              { name: 'IT', icon: Code },
              { name: 'Construction', icon: HardHat },
              { name: 'Hospitality', icon: Bed },
              { name: 'Logistics', icon: Truck },
              { name: 'Renewable Energy', icon: Sun },
              { name: 'Textile', icon: Shirt },
              { name: 'E-Commerce', icon: ShoppingBag },
              { name: 'and more...', icon: MoreHorizontal }
            ].map((ind, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200/60 p-2 flex flex-col items-center justify-center text-center hover:shadow-md transition-all min-h-[70px]">
                <ind.icon className={`w-5 h-5 mb-1.5 ${ind.name === 'and more...' ? 'text-forest/60' : 'text-forest'}`} />
                <span className={`text-[7.5px] font-bold leading-tight ${ind.name === 'and more...' ? 'text-forest/60' : 'text-navy'}`}>{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW SECTION: REQUEST FORM BANNER ───────────────────────── */}
      <section className="relative z-30 w-full max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        <div className="bg-[#0b3c1b] rounded-xl p-6 md:p-8 flex flex-col xl:flex-row relative shadow-xl items-center">
          
          {/* Left Content */}
          <div className="w-full xl:w-[35%] text-white relative z-20 flex flex-col justify-start pt-0 mb-8 xl:mb-0">
            <h2 className="text-2xl font-bold mb-3 leading-tight xl:max-w-[180px]">Request a Business Service</h2>
            <p className="text-white/90 text-[11px] mb-6 leading-relaxed max-w-[260px] xl:max-w-[170px]">
              Tell us about your business needs. Our experts will connect with you within 24 hours.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-0.5 mr-3 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#0b3c1b]" />
                </div>
                <span className="text-[11px] font-bold">100% Free Consultation</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white rounded-full p-0.5 mr-3 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#0b3c1b]" />
                </div>
                <span className="text-[11px] font-bold">Confidential & Secure</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white rounded-full p-0.5 mr-3 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#0b3c1b]" />
                </div>
                <span className="text-[11px] font-bold">Expert Business Guidance</span>
              </div>
            </div>
          </div>

          {/* Overlapping Image Circle */}
          <div className="hidden xl:block absolute left-[28%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-[220px] h-[220px] rounded-full border-[8px] border-[#0b3c1b] z-40 bg-cover bg-center shadow-lg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')"}}>
             {/* Decorative rings */}
             <div className="absolute -inset-4 rounded-full border border-green-400/50 pointer-events-none"></div>
             <div className="absolute -inset-8 rounded-full border border-green-400/20 pointer-events-none"></div>
             
             {/* 3 small circle icons around the edge */}
             <div className="absolute -top-4 right-4 w-10 h-10 bg-[#0b3c1b] rounded-full border-2 border-green-500 flex items-center justify-center">
               <Users className="w-5 h-5 text-white" />
             </div>
             <div className="absolute top-1/2 -right-8 -translate-y-1/2 w-10 h-10 bg-[#0b3c1b] rounded-full border-2 border-green-500 flex items-center justify-center">
               <Network className="w-5 h-5 text-white" />
             </div>
             <div className="absolute -bottom-4 right-4 w-10 h-10 bg-[#0b3c1b] rounded-full border-2 border-green-500 flex items-center justify-center">
               <UserCheck className="w-5 h-5 text-white" />
             </div>
          </div>

          {/* Right Form */}
          <div className="w-full xl:w-[65%] relative z-30 xl:pl-12">
              <div className="bg-white rounded-xl p-6 shadow-md w-full">
               <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-5">
                 {statusMessage.text && (
                   <div className={`md:col-span-3 p-3 rounded-md text-sm font-medium ${
                     statusMessage.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'
                   }`}>
                     {statusMessage.text}
                   </div>
                 )}
                 <div>
                   <label className="block text-[10px] font-bold text-navy mb-1.5">Business Name <span className="text-red-500">*</span></label>
                   <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} placeholder="Enter business name" className="w-full border border-gray-200 rounded-md p-2.5 text-[11px] focus:ring-1 focus:ring-forest outline-none placeholder:text-gray-400" />
                 </div>
                 <div>
                   <label className="block text-[10px] font-bold text-navy mb-1.5">Contact Person <span className="text-red-500">*</span></label>
                   <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} placeholder="Enter your name" className="w-full border border-gray-200 rounded-md p-2.5 text-[11px] focus:ring-1 focus:ring-forest outline-none placeholder:text-gray-400" />
                 </div>
                 <div>
                   <label className="block text-[10px] font-bold text-navy mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                   <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Enter mobile number" className="w-full border border-gray-200 rounded-md p-2.5 text-[11px] focus:ring-1 focus:ring-forest outline-none placeholder:text-gray-400" />
                 </div>
                 
                 <div>
                   <label className="block text-[10px] font-bold text-navy mb-1.5">Email Address <span className="text-red-500">*</span></label>
                   <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email address" className="w-full border border-gray-200 rounded-md p-2.5 text-[11px] focus:ring-1 focus:ring-forest outline-none placeholder:text-gray-400" />
                 </div>
                 <div>
                   <label className="block text-[10px] font-bold text-navy mb-1.5">Industry / Business Type <span className="text-red-500">*</span></label>
                   <select name="industry" value={formData.industry} onChange={handleInputChange} className="w-full border border-gray-200 rounded-md p-2.5 text-[11px] focus:ring-1 focus:ring-forest outline-none text-gray-500 bg-white">
                     <option value="">Select industry</option>
                     <option value="Agriculture">Agriculture</option>
                     <option value="Manufacturing">Manufacturing</option>
                     <option value="Retail">Retail</option>
                     <option value="Services">Services</option>
                     <option value="IT & Tech">IT & Tech</option>
                     <option value="Healthcare">Healthcare</option>
                     <option value="Other">Other</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-[10px] font-bold text-navy mb-1.5">Nature of Service Required <span className="text-red-500">*</span></label>
                   <select name="serviceRequired" value={formData.serviceRequired} onChange={handleInputChange} className="w-full border border-gray-200 rounded-md p-2.5 text-[11px] focus:ring-1 focus:ring-forest outline-none text-gray-500 bg-white">
                     <option value="">Select service</option>
                     <option value="Business Formation">Business Formation</option>
                     <option value="Registration & Licensing">Registration & Licensing</option>
                     <option value="Project Reports & Finance">Project Reports & Finance</option>
                     <option value="Accounting & Compliance">Accounting & Compliance</option>
                     <option value="Branding & Marketing">Branding & Marketing</option>
                     <option value="Digital Marketing">Digital Marketing</option>
                     <option value="Sales Growth">Sales Growth</option>
                     <option value="Other">Other</option>
                   </select>
                 </div>

                 <div className="md:col-span-2">
                   <label className="block text-[10px] font-bold text-navy mb-1.5">Business Description</label>
                   <textarea name="businessDescription" value={formData.businessDescription} onChange={handleInputChange} placeholder="Briefly describe your business and requirements" className="w-full h-[60px] border border-gray-200 rounded-md p-2.5 text-[11px] focus:ring-1 focus:ring-forest outline-none resize-none placeholder:text-gray-400"></textarea>
                 </div>
                 <div className="flex items-end">
                   <button type="submit" disabled={isSubmitting} className="bg-[#dfa112] hover:bg-[#c98f0f] disabled:opacity-70 text-white font-bold text-sm py-2 px-4 rounded-md transition-colors flex items-center justify-center w-full h-[60px]">
                     {isSubmitting ? (
                       <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                     ) : (
                       <>Submit Request <Rocket className="w-3.5 h-3.5 ml-2" /></>
                     )}
                   </button>
                 </div>
               </form>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
};

export default BusinessConsultancy;

