import React, { useState } from 'react';
import { publicApi } from '../api';
import {
  GraduationCap,
  Settings,
  Users,
  TrendingUp,
  BookOpen,
  UserPlus,
  Briefcase,
  Leaf,
  User,
  HardHat,
  Factory,
  Rocket,
  UserCircle,
  Store,
  Lightbulb,
  Coins,
  Monitor,
  Cog,
  Target,
  Hammer,
  UserCheck,
  ChevronRight,
  ArrowDown,
  TreePine,
  CheckCircle2,
  ArrowRight,
  ClipboardList,
  Phone
} from 'lucide-react';

const learningCatalogue = [
  {
    title: "Entrepreneurship Development",
    icon: Lightbulb,
    color: "#297B1A",
    items: ["Business Idea Development", "Startup Planning", "Business Model Design", "Business Registration", "Business Finance", "Scaling Strategies", "Family Business Management"]
  },
  {
    title: "Financial Literacy",
    icon: Coins,
    color: "#1b62b3",
    items: ["Personal Finance", "Savings & Budgeting", "Investment Basics", "Cooperative Banking", "Credit Management", "Loan Management", "Insurance Awareness", "Tax Awareness"]
  },
  {
    title: "Digital Skills",
    icon: Monitor,
    color: "#8c3ab8",
    items: ["Computer Fundamentals", "MS Office", "Google Workspace", "Canva Design", "AI Productivity Tools", "Social Media Management", "Website Management", "Cyber Security Basics", "Digital Payments"]
  },
  {
    title: "Professional Courses",
    icon: Briefcase,
    color: "#e67e22",
    items: ["Accounting & Tally", "GST Practical Training", "Income Tax Basics", "HR Management", "Digital Marketing", "Project Management", "Data Analysis", "Business Communication"]
  },
  {
    title: "Agriculture & Rural Development",
    icon: Leaf,
    color: "#4a9611",
    items: ["Natural Farming", "Organic Farming", "Precision Agriculture", "Dairy Management", "Poultry Farming", "Goat Farming", "Fisheries", "Food Processing", "Agri Business", "FPOs"]
  },
  {
    title: "Manufacturing & Technical Skills",
    icon: Cog,
    color: "#0a8f7c",
    items: ["Biodegradable Products", "Packaging Industry", "Quality Control", "Industrial Safety", "Production Management", "Machinery Operations", "Maintenance Skills"]
  },
  {
    title: "Competitive Exam Coaching",
    icon: Target,
    color: "#e74c3c",
    items: ["UPSC", "State PSC", "Banking", "SSC", "Railways", "Police", "Defence", "Cooperative Recruitment", "Teacher Eligibility Tests"]
  },
  {
    title: "Vocational Training",
    icon: Hammer,
    color: "#8d4b36",
    items: ["Electrician", "Plumbing", "Welding", "Carpentry", "Tailoring", "Beautician", "Mobile Repair", "Computer Hardware", "Solar Installation"]
  },
  {
    title: "Leadership Development",
    icon: Users,
    color: "#2980b9",
    items: ["Leadership Skills", "Public Speaking", "Communication", "Team Building", "Decision Making", "Problem Solving", "Time Management", "Conflict Resolution"]
  },
  {
    title: "Career Development",
    icon: UserCheck,
    color: "#9b59b6",
    items: ["Resume Building", "Interview Skills", "Career Counselling", "Soft Skills", "Personality Development", "Workplace Ethics", "Corporate Readiness"]
  }
];

const DivEdu = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    qualification: '',
    course: '',
    preferredMode: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    // Client-side validation
    if (!formData.fullName.trim() || !formData.mobileNumber.trim() || !formData.email.trim() || !formData.qualification || !formData.course || !formData.preferredMode) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      setStatus({ type: 'error', message: 'Please enter a valid 10-digit mobile number.' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    try {
      setIsSubmitting(true);
      await publicApi.submitEducationEnquiry(formData);
      setStatus({ type: 'success', message: 'Registration submitted successfully!' });
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        qualification: '',
        course: '',
        preferredMode: ''
      });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Failed to submit registration. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full font-inter bg-[#fcfbf9]">
      {/* ── NEW Hero Section ───────────────────────────────────────────── */}
      <section className="relative w-full h-[500px] md:h-[600px] flex items-center overflow-hidden pt-[110px] pb-8 md:pt-[120px] md:pb-8">
        
        {/* Background Image with Blurred Effect */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            filter: 'blur(2px)'
          }}
        />
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#FDFCF7] via-[#FDFCF7] to-transparent w-[65%]"></div>
        <div className="absolute inset-0 z-0 bg-[#FDFCF7]/30"></div>

        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center relative z-10">
          
          {/* Left Content */}
          <div className="w-full lg:w-[55%] relative z-20 py-8 lg:py-0">
            <h4 className="text-[#104a22] font-extrabold text-[12px] tracking-widest uppercase mb-3">
              COOPERATIVE ECOSYSTEM – PILLAR 5
            </h4>
            <h1 className="text-[32px] md:text-[44px] font-extrabold text-[#0B1F4D] leading-[1.15] mb-4">
              Cooperative <span className="text-[#207a30]">Education &</span><br className="hidden md:block"/>
              <span className="text-[#207a30]">Skill Development</span> Services
            </h1>
            <h3 className="text-[16px] md:text-[18px] font-bold text-[#0B1F4D] mb-3">
              Learn Today. Lead Tomorrow. Prosper Together.
            </h3>
            <p className="text-[#4A5568] text-[13px] md:text-[14px] font-medium leading-[1.5] mb-6 max-w-[480px]">
              Empowering every member with knowledge, practical skills, entrepreneurship, financial literacy, and career opportunities through one cooperative learning ecosystem.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="bg-[#0b519d] hover:bg-[#09417d] text-white text-[12px] md:text-[13px] font-bold py-2.5 px-4 md:px-5 rounded-md flex items-center transition-all shadow-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Explore Courses
              </button>
              <button className="bg-[#297B1A] hover:bg-[#206114] text-white text-[12px] md:text-[13px] font-bold py-2.5 px-4 md:px-5 rounded-md flex items-center transition-all shadow-sm">
                <UserPlus className="w-4 h-4 mr-2" />
                Register for Training
              </button>
              <button className="bg-[#D98E04] hover:bg-[#bd7a03] text-white text-[12px] md:text-[13px] font-bold py-2.5 px-4 md:px-5 rounded-md flex items-center transition-all shadow-sm">
                <Briefcase className="w-4 h-4 mr-2" />
                Career & Placement Support
              </button>
            </div>
          </div>

          {/* Right Content / Image Area */}
          <div className="w-full lg:w-[45%] relative z-10 flex justify-center items-center hidden lg:flex mt-8 lg:mt-0">
            
            {/* Wrapper for Image and Cards so they scale together perfectly */}
            <div className="relative inline-block h-[280px] md:h-[320px] my-2 mx-4">
              
              {/* Main students image */}
              <img 
                src="/img/edu_hero_new.png" 
                alt="Students" 
                className="h-full w-auto object-cover object-center z-10 rounded-[2rem] shadow-2xl border-4 border-white/50"
              />
              
              {/* Floating Card 1: Learn */}
              <div className="absolute top-[20px] -left-[30px] z-20 bg-white rounded-xl shadow-[0_12px_25px_rgb(0,0,0,0.12)] p-2.5 pr-6 md:pr-8 flex items-center gap-3 transition-transform hover:-translate-y-1">
                <div className="bg-[#EBF5F0] p-2 rounded-lg text-[#297B1A]">
                  <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0B1F4D] text-[12px] md:text-[13px] leading-tight">Learn</h4>
                  <p className="text-[9px] md:text-[10px] text-gray-500 font-medium mt-0.5">Gain Knowledge</p>
                </div>
              </div>

              {/* Floating Card 2: Skill */}
              <div className="absolute top-[20px] -right-[30px] z-20 bg-white rounded-xl shadow-[0_12px_25px_rgb(0,0,0,0.12)] p-2.5 pr-6 md:pr-8 flex items-center gap-3 transition-transform hover:-translate-y-1">
                <div className="bg-[#EBF5F0] p-2 rounded-lg text-[#297B1A]">
                  <Settings className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0B1F4D] text-[12px] md:text-[13px] leading-tight">Skill</h4>
                  <p className="text-[9px] md:text-[10px] text-gray-500 font-medium mt-0.5">Build Competence</p>
                </div>
              </div>

              {/* Floating Card 3: Lead */}
              <div className="absolute bottom-[20px] -left-[30px] z-20 bg-white rounded-xl shadow-[0_12px_25px_rgb(0,0,0,0.12)] p-2.5 pr-6 md:pr-8 flex items-center gap-3 transition-transform hover:-translate-y-1">
                <div className="bg-[#EBF5F0] p-2 rounded-lg text-[#297B1A]">
                  <Users className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0B1F4D] text-[12px] md:text-[13px] leading-tight">Lead</h4>
                  <p className="text-[9px] md:text-[10px] text-gray-500 font-medium mt-0.5">Create Impact</p>
                </div>
              </div>

              {/* Floating Card 4: Prosper */}
              <div className="absolute bottom-[20px] -right-[30px] z-20 bg-white rounded-xl shadow-[0_12px_25px_rgb(0,0,0,0.12)] p-2.5 pr-6 md:pr-8 flex items-center gap-3 transition-transform hover:-translate-y-1">
                <div className="bg-[#EBF5F0] p-2 rounded-lg text-[#297B1A]">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0B1F4D] text-[12px] md:text-[13px] leading-tight">Prosper</h4>
                  <p className="text-[9px] md:text-[10px] text-gray-500 font-medium mt-0.5">Grow Together</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Overview & Benefits Section ───────────────────────────── */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16">
        
        {/* OVERVIEW Box */}
        <div className="relative bg-[#F4F9F2] rounded-2xl border border-[#DFF0D8] p-6 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 overflow-hidden shadow-sm mb-16">
          
          {/* Faded Background Element (Right) */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none opacity-[0.04] hidden md:flex justify-end items-center pr-10">
            <GraduationCap className="w-64 h-64 text-[#2b8a1c]" />
          </div>

          {/* Left Icon */}
          <div className="flex-shrink-0 relative z-10">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-[#418c35] rounded-full flex items-center justify-center border-[8px] border-white shadow-sm">
              <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex-1">
            <h3 className="text-[#206114] font-extrabold text-[15px] tracking-wide mb-2 uppercase">
              OVERVIEW
            </h3>
            <p className="text-[#3b4b57] text-[14px] md:text-[15px] leading-relaxed max-w-[850px]">
              Education is the foundation of economic growth. Kalpavruksha Cooperative <span className="font-bold text-[#0B1F4D]">Education & Skill Development Services</span> provide affordable, practical, and industry-oriented learning opportunities that help members improve employability, start businesses, enhance professional skills, and achieve financial independence.
            </p>
          </div>
        </div>

        {/* WHO CAN BENEFIT Heading */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px bg-gradient-to-r from-transparent to-[#418c35] w-12 md:w-20 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#418c35]"></div>
          </div>
          <h2 className="text-[#0B1F4D] font-extrabold text-[18px] md:text-[22px] uppercase tracking-wide">
            WHO CAN BENEFIT?
          </h2>
          <div className="h-px bg-gradient-to-l from-transparent to-[#418c35] w-12 md:w-20 relative">
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-[#418c35]"></div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {/* Card 1 */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] py-6 px-4 flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1 cursor-pointer">
            <GraduationCap className="w-8 h-8 text-[#297B1A]" />
            <span className="text-[#0B1F4D] text-[12px] font-bold text-center leading-tight">Students</span>
          </div>
          {/* Card 2 */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] py-6 px-4 flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1 cursor-pointer">
            <Briefcase className="w-8 h-8 text-[#09417d]" />
            <span className="text-[#0B1F4D] text-[12px] font-bold text-center leading-tight">Job Seekers</span>
          </div>
          {/* Card 3 */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] py-6 px-4 flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1 cursor-pointer">
            <Leaf className="w-8 h-8 text-[#54a323]" />
            <span className="text-[#0B1F4D] text-[12px] font-bold text-center leading-tight">Farmers</span>
          </div>
          {/* Card 4 */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] py-6 px-4 flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1 cursor-pointer">
            <User className="w-8 h-8 text-[#8c3ab8]" />
            <span className="text-[#0B1F4D] text-[12px] font-bold text-center leading-tight">Women<br/>Entrepreneurs</span>
          </div>
          {/* Card 5 */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] py-6 px-4 flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1 cursor-pointer">
            <HardHat className="w-8 h-8 text-[#f58d05]" />
            <span className="text-[#0B1F4D] text-[12px] font-bold text-center leading-tight">Skilled Workers</span>
          </div>
          {/* Card 6 */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] py-6 px-4 flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1 cursor-pointer">
            <Factory className="w-8 h-8 text-[#038787]" />
            <span className="text-[#0B1F4D] text-[12px] font-bold text-center leading-tight">MSMEs</span>
          </div>
          {/* Card 7 */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] py-6 px-4 flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1 cursor-pointer">
            <Rocket className="w-8 h-8 text-[#083a99]" />
            <span className="text-[#0B1F4D] text-[12px] font-bold text-center leading-tight">Startups</span>
          </div>
          {/* Card 8 */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] py-6 px-4 flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1 cursor-pointer">
            <UserCircle className="w-8 h-8 text-[#1b62b3]" />
            <span className="text-[#0B1F4D] text-[12px] font-bold text-center leading-tight">Professionals</span>
          </div>
          {/* Card 9 */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] py-6 px-4 flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1 cursor-pointer">
            <Store className="w-8 h-8 text-[#99348c]" />
            <span className="text-[#0B1F4D] text-[12px] font-bold text-center leading-tight">Business Owners</span>
          </div>
          {/* Card 10 */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] py-6 px-4 flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1 cursor-pointer">
            <UserPlus className="w-8 h-8 text-[#d6aa0d]" />
            <span className="text-[#0B1F4D] text-[12px] font-bold text-center leading-tight">Senior Citizens</span>
          </div>
          {/* Card 11 */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] py-6 px-4 flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1 cursor-pointer">
            <Users className="w-8 h-8 text-[#0a8f7c]" />
            <span className="text-[#0B1F4D] text-[12px] font-bold text-center leading-tight">Self Help Groups</span>
          </div>
          {/* Card 12 */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] py-6 px-4 flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1 cursor-pointer">
            <Users className="w-8 h-8 text-[#4a9611]" />
            <span className="text-[#0B1F4D] text-[12px] font-bold text-center leading-tight">Cooperative<br/>Members</span>
          </div>
        </div>

      </section>

      {/* ── Learning Catalogue Section ───────────────────────────── */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16">
        
        {/* LEARNING CATALOGUE Heading */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px bg-gradient-to-r from-transparent to-[#418c35] w-12 md:w-20 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#418c35]"></div>
          </div>
          <h2 className="text-[#0B1F4D] font-extrabold text-[18px] md:text-[22px] uppercase tracking-wide">
            LEARNING CATALOGUE
          </h2>
          <div className="h-px bg-gradient-to-l from-transparent to-[#418c35] w-12 md:w-20 relative">
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-[#418c35]"></div>
          </div>
        </div>

        {/* Catalogue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {learningCatalogue.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="bg-white border border-gray-100 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-5">
                  <Icon className="w-6 h-6 flex-shrink-0" style={{ color: category.color }} />
                  <h4 className="font-extrabold text-[14px] leading-snug" style={{ color: category.color }}>
                    {category.title}
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 group cursor-pointer">
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 mt-0.5 group-hover:text-[#418c35] flex-shrink-0 transition-colors" />
                      <span className="text-[12px] text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Additional Banners ───────────────────────────── */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16 flex flex-col lg:flex-row gap-5">
        
        {/* Employment & Placement */}
        <div className="bg-[#fdf4fa] border border-[#f5c6e5] rounded-xl p-6 lg:w-[35%] flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <Users className="w-6 h-6 text-[#d31897]" />
            <h4 className="font-extrabold text-[16px] text-[#d31897]">Employment & Placement</h4>
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            <div className="flex items-start gap-2">
               <ChevronRight className="w-3.5 h-3.5 text-[#d31897] mt-0.5" />
               <span className="text-[13px] text-gray-700 font-medium">Job Matching</span>
            </div>
            <div className="flex items-start gap-2">
               <ChevronRight className="w-3.5 h-3.5 text-[#d31897] mt-0.5" />
               <span className="text-[13px] text-gray-700 font-medium">Employer Connect</span>
            </div>
            <div className="flex items-start gap-2">
               <ChevronRight className="w-3.5 h-3.5 text-[#d31897] mt-0.5" />
               <span className="text-[13px] text-gray-700 font-medium">Internship Programs</span>
            </div>
            <div className="flex items-start gap-2">
               <ChevronRight className="w-3.5 h-3.5 text-[#d31897] mt-0.5" />
               <span className="text-[13px] text-gray-700 font-medium">Career Fairs</span>
            </div>
            <div className="flex items-start gap-2">
               <ChevronRight className="w-3.5 h-3.5 text-[#d31897] mt-0.5" />
               <span className="text-[13px] text-gray-700 font-medium">Apprenticeship</span>
            </div>
            <div className="flex items-start gap-2">
               <ChevronRight className="w-3.5 h-3.5 text-[#d31897] mt-0.5" />
               <span className="text-[13px] text-gray-700 font-medium">Placement Assistance</span>
            </div>
          </div>
        </div>

        {/* Empowering Minds Banner */}
        <div className="bg-[#f5f6f8] rounded-xl flex-1 relative overflow-hidden flex items-center p-6 md:p-10 border border-gray-200">
           {/* Left Image Mask */}
           <div className="absolute left-0 top-0 bottom-0 w-[45%] opacity-90" style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: 'linear-gradient(to right, black 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, black 50%, transparent 100%)'
           }}></div>

           {/* Watermark right */}
           <div className="absolute right-0 top-0 bottom-0 w-1/4 pointer-events-none opacity-[0.05] flex justify-end items-center pr-6">
              <TreePine className="w-48 h-48 text-[#2b8a1c]" />
           </div>

           {/* Text Content */}
           <div className="relative z-10 w-full flex flex-col justify-center pl-[45%] md:pl-[50%]">
             <h3 className="text-[#0B1F4D] font-extrabold text-[18px] md:text-[22px] mb-2 leading-tight">
               Empowering Minds. Building Skills.
             </h3>
             <p className="text-gray-800 text-[13px] md:text-[14px] font-semibold">
               Creating a stronger, skilled and self-reliant society together.
             </p>
           </div>
        </div>
      </section>

      {/* ── Learning Pathways ───────────────────────────── */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16">
        
        {/* LEARNING PATHWAYS Heading */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px bg-gradient-to-r from-transparent to-[#418c35] w-12 md:w-20 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#418c35]"></div>
          </div>
          <h2 className="text-[#0B1F4D] font-extrabold text-[18px] md:text-[22px] uppercase tracking-wide">
            LEARNING PATHWAYS
          </h2>
          <div className="h-px bg-gradient-to-l from-transparent to-[#418c35] w-12 md:w-20 relative">
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-[#418c35]"></div>
          </div>
        </div>

        {/* Pathways Grid */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 md:gap-5">
           {/* Path 1 */}
           <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] p-6 flex-1 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
             <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-[#297B1A]" />
                <h4 className="font-extrabold text-[15px] text-[#297B1A]">Student Path</h4>
             </div>
             <div className="flex flex-col items-center gap-2.5">
                <span className="text-[12px] text-[#0B1F4D] font-bold">Learning</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span className="text-[12px] text-[#0B1F4D] font-bold">Certification</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span className="text-[12px] text-[#0B1F4D] font-bold">Internship</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span className="text-[12px] text-[#0B1F4D] font-bold">Employment</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span className="text-[12px] text-[#0B1F4D] font-bold">Career Growth</span>
             </div>
           </div>

           {/* Path 2 */}
           <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] p-6 flex-1 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
             <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-5 h-5 text-[#1b62b3]" />
                <h4 className="font-extrabold text-[15px] text-[#1b62b3]">Entrepreneur Path</h4>
             </div>
             <div className="flex flex-col items-center gap-2.5">
                <span className="text-[12px] text-[#0B1F4D] font-bold">Training</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span className="text-[12px] text-[#0B1F4D] font-bold">Business Planning</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span className="text-[12px] text-[#0B1F4D] font-bold">Finance</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span className="text-[12px] text-[#0B1F4D] font-bold">Business Launch</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span className="text-[12px] text-[#0B1F4D] font-bold">Marketplace</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span className="text-[12px] text-[#0B1F4D] font-bold">Expansion</span>
             </div>
           </div>

           {/* Path 3 */}
           <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] p-6 flex-1 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
             <div className="flex items-center gap-2 mb-6">
                <Leaf className="w-5 h-5 text-[#4a9611]" />
                <h4 className="font-extrabold text-[15px] text-[#4a9611]">Farmer Path</h4>
             </div>
             <div className="flex flex-col items-center gap-2.5">
                <span className="text-[12px] text-[#0B1F4D] font-bold">Modern Agriculture</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span className="text-[12px] text-[#0B1F4D] font-bold">Value Addition</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span className="text-[12px] text-[#0B1F4D] font-bold">Trading</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span className="text-[12px] text-[#0B1F4D] font-bold">Income Growth</span>
             </div>
           </div>

           {/* Path 4 */}
           <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] p-6 flex-1 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
             <div className="flex items-center gap-2 mb-6">
                <UserCheck className="w-5 h-5 text-[#8c3ab8]" />
                <h4 className="font-extrabold text-[15px] text-[#8c3ab8]">Professional Path</h4>
             </div>
             <div className="flex flex-col items-center gap-2.5">
                <span className="text-[12px] text-[#0B1F4D] font-bold">Skill Upgrade</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span className="text-[12px] text-[#0B1F4D] font-bold">Certification</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span className="text-[12px] text-[#0B1F4D] font-bold">Higher Opportunities</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span className="text-[12px] text-[#0B1F4D] font-bold">Leadership</span>
             </div>
           </div>

           {/* Image Column */}
           <div className="flex-[0.8] rounded-xl overflow-hidden relative min-h-[350px] hidden lg:block bg-[#eef6e9]">
             <img 
               src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80" 
               alt="Student smiling" 
               className="w-full h-full object-cover object-top"
             />
           </div>
        </div>
      </section>

      {/* ── Footer / CTA Section ───────────────────────────── */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16">
        <div className="flex flex-col lg:flex-row gap-5 items-stretch">
          
          {/* Card 1: Why Learn */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] p-6 lg:w-[40%] flex flex-col">
            <h3 className="font-extrabold text-[15px] text-center uppercase mb-6 tracking-wide text-[#206114]">
              Why Learn With Kalpavruksha?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {/* Left Col items */}
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2b8a1c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[12px] text-[#0B1F4D] leading-none">Practical Learning</h5>
                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">Industry-focused training with real-world applications.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2b8a1c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[12px] text-[#0B1F4D] leading-none">Affordable Education</h5>
                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">Member-friendly training programs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2b8a1c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[12px] text-[#0B1F4D] leading-none">Experienced Trainers</h5>
                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">Industry experts and professionals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2b8a1c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[12px] text-[#0B1F4D] leading-none">Career Guidance</h5>
                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">Continuous mentoring and counselling.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2b8a1c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[12px] text-[#0B1F4D] leading-none">Business Opportunities</h5>
                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">Connect education with entrepreneurship.</p>
                  </div>
                </div>
              </div>
              {/* Right Col items */}
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2b8a1c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[12px] text-[#0B1F4D] leading-none">Cooperative Ecosystem</h5>
                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">Access finance, business services, trading, and investment opportunities.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2b8a1c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[12px] text-[#0B1F4D] leading-none">Placement Support</h5>
                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">Employment and internship assistance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2b8a1c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[12px] text-[#0B1F4D] leading-none">Lifelong Learning</h5>
                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">Continuous skill development for every stage of life.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Training Calendar */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] p-6 lg:w-[28%] flex flex-col items-center">
            <h3 className="font-extrabold text-[15px] text-center uppercase mb-1 tracking-wide text-[#206114]">
              Training Calendar
            </h3>
            <p className="text-[12px] font-bold text-gray-700 mb-5">Upcoming Programs</p>
            
            <div className="w-full text-[11px] flex-1">
              {/* Table header */}
              <div className="grid grid-cols-[3fr_1fr_1.5fr] gap-2 pb-2 border-b border-gray-100 font-bold text-[#0B1F4D]">
                <div>Program</div>
                <div className="text-center">Duration</div>
                <div className="text-right">Mode</div>
              </div>
              
              {/* Rows */}
              {[
                { name: "Entrepreneurship Dev...", duration: "5 Days", mode: "Hybrid" },
                { name: "Financial Literacy", duration: "2 Days", mode: "Online / Offline" },
                { name: "Digital Marketing", duration: "30 Days", mode: "Classroom" },
                { name: "Computer Skills", duration: "45 Days", mode: "Hybrid" },
                { name: "Natural Farming", duration: "3 Days", mode: "Field Training" },
                { name: "Leadership Workshop", duration: "2 Days", mode: "Classroom" },
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-[3fr_1fr_1.5fr] gap-2 py-3 border-b border-gray-50 text-gray-600 font-semibold items-center">
                  <div className="truncate pr-2" title={row.name}>{row.name}</div>
                  <div className="text-center whitespace-nowrap">{row.duration}</div>
                  <div className="text-right whitespace-nowrap">{row.mode}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Form */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] p-6 lg:w-[32%] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#e9f2e7] p-1.5 rounded-md">
                 <ClipboardList className="w-4 h-4 text-[#2b8a1c]" />
              </div>
              <h3 className="text-[#206114] font-extrabold text-[14px] tracking-wide uppercase">
                Course Enquiry & Registration
              </h3>
            </div>
            <p className="text-[#2b8a1c] font-bold text-[12px] mb-4">Student Information</p>
            
            <form className="flex-1 flex flex-col gap-3" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#0B1F4D]">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" className="border border-gray-200 rounded-md px-3 py-2 text-[11px] outline-none focus:border-[#2b8a1c]" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#0B1F4D]">Mobile Number <span className="text-red-500">*</span></label>
                  <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Enter mobile number" className="border border-gray-200 rounded-md px-3 py-2 text-[11px] outline-none focus:border-[#2b8a1c]" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#0B1F4D]">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" className="border border-gray-200 rounded-md px-3 py-2 text-[11px] outline-none focus:border-[#2b8a1c]" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#0B1F4D]">Qualification <span className="text-red-500">*</span></label>
                  <select name="qualification" value={formData.qualification} onChange={handleChange} className="border border-gray-200 rounded-md px-3 py-2 text-[11px] text-gray-600 outline-none focus:border-[#2b8a1c]" required>
                    <option value="">Select qualification</option>
                    <option value="10th/SSC">10th / SSC</option>
                    <option value="12th/Intermediate">12th / Intermediate</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#0B1F4D]">Course Interested In <span className="text-red-500">*</span></label>
                  <select name="course" value={formData.course} onChange={handleChange} className="border border-gray-200 rounded-md px-3 py-2 text-[11px] text-gray-600 outline-none focus:border-[#2b8a1c]" required>
                    <option value="">Select course</option>
                    <option value="Entrepreneurship Development">Entrepreneurship Development</option>
                    <option value="Financial Literacy">Financial Literacy</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Computer Skills">Computer Skills</option>
                    <option value="Natural Farming">Natural Farming</option>
                    <option value="Leadership Workshop">Leadership Workshop</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#0B1F4D]">Preferred Mode <span className="text-red-500">*</span></label>
                  <select name="preferredMode" value={formData.preferredMode} onChange={handleChange} className="border border-gray-200 rounded-md px-3 py-2 text-[11px] text-gray-600 outline-none focus:border-[#2b8a1c]" required>
                    <option value="">Select mode</option>
                    <option value="Classroom">Classroom</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Field Training">Field Training</option>
                  </select>
                </div>
              </div>
              
              {status.message && (
                <div className={`text-[11px] font-semibold text-center p-2 rounded-md ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {status.message}
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="w-full bg-[#3c8c2b] text-white font-bold text-[13px] py-2.5 rounded-md hover:bg-[#2b6b1e] transition-colors flex items-center justify-center gap-2 mt-auto shadow-sm disabled:opacity-70">
                {isSubmitting ? 'Submitting...' : 'Submit Registration'} <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="flex items-center justify-center gap-1.5 mt-2 text-gray-500 text-[11px] font-semibold">
                <Phone className="w-3 h-3 text-[#2b8a1c]" /> Our team will contact you shortly!
              </div>
            </form>
          </div>
          
        </div>
      </section>



    </div>
  );
};

export default DivEdu;

