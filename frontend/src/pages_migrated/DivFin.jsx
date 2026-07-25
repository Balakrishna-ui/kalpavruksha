import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { 
  Shield, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Settings,
  Building2,
  Users,
  FileText,
  Sprout,
  Leaf,
  User,
  Wallet,
  IndianRupee,
  Briefcase,
  Banknote,
  ShieldCheck,
  Clock,
  Award,
  Search,
  PiggyBank,
  Monitor,
  HeartHandshake,
  TrendingUp,
  BookOpen,
  Scale,
  CreditCard,
  LifeBuoy,
  RotateCw,
  Lock,
  GraduationCap,
  Coins,
  LineChart,
  Activity,
  Smartphone,
  ArrowRightLeft,
  Landmark,
  ChevronRight,
  Percent,
  Tag,
  Home,
  Car,
  Gift,
  FileBadge,
  ScanLine,
  ChevronDown,
  Download,
  File,
  UserPlus,
  FileCheck,
  ClipboardCheck,
  ThumbsUp,
  HelpCircle,
  FileDigit,
  Camera,
  MapPin,
  Phone,
  PieChart
} from 'lucide-react';

// --- Animation Variants ---
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.15 } }
};

// --- Data for New Sections ---
const topFeatures = [
  { icon: Users, title: 'Member Owned', desc: 'Owned by members, for members.', color: 'text-[#0B1F4D]', bg: 'bg-[#0B1F4D]/5', border: 'border-[#0B1F4D]/10' },
  { icon: Search, title: 'Transparent', desc: '100% transparency in operations.', color: 'text-[#1f5e16]', bg: 'bg-[#1f5e16]/5', border: 'border-[#1f5e16]/10' },
  { icon: PiggyBank, title: 'Affordable', desc: 'Low cost, maximum benefits.', color: 'text-[#d49622]', bg: 'bg-[#d49622]/5', border: 'border-[#d49622]/10' },
  { icon: ShieldCheck, title: 'Secure', desc: 'Your money is safe with us.', color: 'text-[#1f5e16]', bg: 'bg-[#1f5e16]/5', border: 'border-[#1f5e16]/10' },
  { icon: Monitor, title: 'Digital', desc: 'Modern banking at your fingertips.', color: 'text-[#0B1F4D]', bg: 'bg-[#0B1F4D]/5', border: 'border-[#0B1F4D]/10' },
  { icon: Users, title: 'Community Driven', desc: 'Stronger together, prosper forever.', color: 'text-[#d49622]', bg: 'bg-[#d49622]/5', border: 'border-[#d49622]/10' },
];

const whatIsFeatures = [
  { icon: PiggyBank, title: 'Savings', desc: 'Build your wealth' },
  { icon: Coins, title: 'Credit', desc: 'Affordable loans' },
  { icon: TrendingUp, title: 'Financial Growth', desc: 'Secure your future' },
  { icon: Briefcase, title: 'Business Support', desc: 'Empower your dreams' },
  { icon: HeartHandshake, title: 'Community Prosperity', desc: 'Grow together' },
];

const purposeObjectives = [
  { icon: BookOpen, title: 'Promote Savings', color: 'text-[#1f5e16]', bg: 'bg-[#1f5e16]/5', border: 'border-[#1f5e16]/10' },
  { icon: Scale, title: 'Financial Discipline', color: 'text-[#d49622]', bg: 'bg-[#d49622]/5', border: 'border-[#d49622]/10' },
  { icon: CreditCard, title: 'Affordable Credit', color: 'text-[#1f5e16]', bg: 'bg-[#1f5e16]/5', border: 'border-[#1f5e16]/10' },
  { icon: LifeBuoy, title: 'Emergency Support', color: 'text-[#d49622]', bg: 'bg-[#d49622]/5', border: 'border-[#d49622]/10' },
  { icon: TrendingUp, title: 'Long Term Wealth', color: 'text-[#1f5e16]', bg: 'bg-[#1f5e16]/5', border: 'border-[#1f5e16]/10' },
  { icon: ShieldCheck, title: 'Member Ownership Development', color: 'text-[#1f5e16]', bg: 'bg-[#1f5e16]/5', border: 'border-[#1f5e16]/10' },
];

const financialProducts = [
  { icon: Landmark, title: 'Savings Accounts', color: 'text-[#0B1F4D]' },
  { icon: Coins, title: 'Flexible Savings Plans', color: 'text-[#d49622]' },
  { icon: RotateCw, title: 'Recurring Deposits', color: 'text-[#1f5e16]' },
  { icon: Lock, title: 'Fixed Deposits', color: 'text-[#0B1F4D]' },
  { icon: LifeBuoy, title: 'Emergency Savings', color: 'text-[#0B1F4D]' },
  { icon: User, title: 'Personal Loans', color: 'text-[#d49622]' },
  { icon: Sprout, title: 'Agriculture Loans', color: 'text-[#1f5e16]' },
  { icon: Briefcase, title: 'Business Loans', color: 'text-[#0B1F4D]' },
  { icon: GraduationCap, title: 'Education Loans', color: 'text-[#1f5e16]' },
  { icon: Coins, title: 'Gold Loans', color: 'text-[#d49622]' },
  { icon: Shield, title: 'Insurance Facilitation', color: 'text-[#0B1F4D]' },
  { icon: LineChart, title: 'Financial Planning', color: 'text-[#1f5e16]' },
  { icon: Activity, title: 'KMC-CBIL Credit Score', color: 'text-[#d49622]' },
  { icon: Smartphone, title: 'Digital Banking', color: 'text-[#0B1F4D]' },
  { icon: FileText, title: 'E-Statements', color: 'text-[#0B1F4D]' },
  { icon: ArrowRightLeft, title: 'Fund Transfer', color: 'text-[#0B1F4D]' },
];

const whyChooseFeatures = [
  { icon: Percent, title: 'Lower Interest\nRates' },
  { icon: TrendingUp, title: 'Member\nOwnership' },
  { icon: ShieldCheck, title: 'Transparent\nPricing' },
  { icon: Tag, title: 'No Hidden\nCharges' },
  { icon: Banknote, title: 'Higher Loan\nEligibility' },
  { icon: Monitor, title: 'Digital\nRecords' },
  { icon: HeartHandshake, title: 'Professional\nSupport' },
  { icon: ScanLine, title: 'CBIL Reward\nSystem' },
];

const loanProcessSteps = [
  { icon: UserPlus, label: 'Become\nMember' },
  { icon: PiggyBank, label: 'Regular\nSavings' },
  { icon: Activity, label: 'Good\nCBIL Score' },
  { icon: FileCheck, label: 'KYC\nComplete' },
  { icon: ClipboardCheck, label: 'Loan\nAssessment' },
  { icon: ThumbsUp, label: 'Approval' },
  { icon: IndianRupee, label: 'Disbursement' },
];

const cbilBenefits = [
  'Better interest rates',
  'Priority processing',
  'Higher loan eligibility',
  'Faster approvals'
];

const memberBenefits = [
  { icon: Activity, title: 'Dividend\nEligibility', color: 'text-blue-700' },
  { icon: Users, title: 'Referral\nBenefits', color: 'text-green-700' },
  { icon: Landmark, title: 'Marketplace\nAccess', color: 'text-green-700' },
  { icon: Briefcase, title: 'Business\nNetwork', color: 'text-green-700' },
  { icon: GraduationCap, title: 'Financial\nEducation', color: 'text-blue-700' },
  { icon: ShieldCheck, title: 'Insurance\nFacilitation', color: 'text-green-700' },
  { icon: Award, title: 'Priority\nServices', color: 'text-blue-700' },
  { icon: Coins, title: 'Gold/Agri\nAccess', color: 'text-orange-600' },
  { icon: TrendingUp, title: 'Investment\nOpportunities', color: 'text-green-700' },
  { icon: Smartphone, title: 'Digital\nBanking', color: 'text-blue-700' },
];

const howItWorksSteps = [
  { icon: UserPlus, label: 'Become\nMember' },
  { icon: PiggyBank, label: 'Monthly\nSavings' },
  { icon: Activity, label: 'CBIL\nGrowth' },
  { icon: ShieldCheck, label: 'Loan\nEligibility' },
  { icon: Briefcase, label: 'Business\nGrowth' },
  { icon: TrendingUp, label: 'Investment' },
  { icon: Landmark, label: 'Marketplace' },
  { icon: Coins, label: 'Financial\nProsperity' },
];

const requiredDocs = [
  { icon: FileDigit, label: 'Aadhaar Card' },
  { icon: Users, label: 'Nominee Details' },
  { icon: FileDigit, label: 'PAN Card' },
  { icon: FileText, label: 'Membership Form' },
  { icon: Camera, label: 'Passport Size Photo' },
  { icon: PieChart, label: 'Share Capital' },
  { icon: MapPin, label: 'Address Proof' },
  { icon: Phone, label: 'Mobile Number' }
];

const rulesPolicies = [
  'Membership Rules',
  'Savings Rules',
  'Withdrawal Policy',
  'Loan Policy',
  'Interest Policy'
];

const faqs = [
  'Who can become a member?',
  'What is the minimum monthly savings?',
  'Can I change my savings amount?',
  'How is interest calculated?',
  'What is CBIL and how does it work?'
];

const downloadsList = [
  'Membership Form',
  'Savings Brochure',
  'Loan Brochure',
  'Policy Documents',
  'Interest Chart',
  'EMI Chart'
];

const relatedServices = [
  { icon: Activity, title: 'Investment\nServices', desc: 'Grow Your Wealth', color: 'text-green-700' },
  { icon: Briefcase, title: 'Business\nServices', desc: 'Build & Grow Business', color: 'text-[#0B1F4D]' },
  { icon: LineChart, title: 'Trading\nServices', desc: 'Buy • Sell • Grow', color: 'text-orange-500' },
  { icon: GraduationCap, title: 'Education & Skill\nDevelopment', desc: 'Learn • Grow • Lead', color: 'text-orange-500' },
];

const disclaimers = [
  "Savings, loans, and interest are governed by the Society's approved policies, registered bylaws, and applicable law.",
  "Illustrative figures shown on the website are for educational purposes only and do not constitute a guarantee.",
  "Loan approval depends on eligibility, CBIL performance, repayment capacity, liquidity availability, and approval by the competent authority."
];

const savingsPlans = [
  { monthly: '₹200', deposit: '₹12,000', loan: 'Up to 3x (Policy Based)' },
  { monthly: '₹500', deposit: '₹30,000', loan: 'Up to 3x' },
  { monthly: '₹1,000', deposit: '₹60,000', loan: 'Up to 3x' },
  { monthly: '₹2,000', deposit: '₹1,20,000', loan: 'Up to 3x' },
  { monthly: '₹3,000', deposit: '₹1,80,000', loan: 'Up to 3x' },
  { monthly: '₹4,000', deposit: '₹2,40,000', loan: 'Up to 3x' },
  { monthly: '₹5,000', deposit: '₹3,00,000', loan: 'Up to 3x' },
];

const depositInterest = [
  { months: '12 Months', rate: '5.5%' },
  { months: '24 Months', rate: '6%' },
  { months: '36 Months', rate: '7%' },
  { months: '48 Months', rate: '8%' },
  { months: '60 Months', rate: '9%' },
];

const loanServices = [
  { icon: LifeBuoy, title: 'Emergency\nLoan', color: 'text-[#1f5e16]' },
  { icon: GraduationCap, title: 'Education\nLoan', color: 'text-[#0B1F4D]' },
  { icon: Briefcase, title: 'Business\nLoan', color: 'text-[#1f5e16]' },
  { icon: Sprout, title: 'Agriculture\nLoan', color: 'text-[#1f5e16]' },
  { icon: Coins, title: 'Gold\nLoan', color: 'text-[#d49622]' },
  { icon: Home, title: 'Housing\nLoan', color: 'text-[#0B1F4D]' },
  { icon: Car, title: 'Vehicle\nLoan', color: 'text-[#0B1F4D]' },
  { icon: User, title: 'Personal\nLoan', color: 'text-[#0B1F4D]' },
];

const DivFin = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="w-full bg-[#fdfdfd] overflow-hidden font-inter selection:bg-gold/30 selection:text-forest">
      
      {/* ── SECTION 1: HERO BANNER ────────────────────────────────── */}
      <section className="relative h-[500px] md:h-[600px] flex items-center overflow-hidden bg-white">
        {/* Full-width Background Image side */}
        <div className="absolute inset-0 z-0">
           {/* Image */}
           <img src="/img/fin.png" alt="City Skyline Sunset" className="w-full h-full object-cover object-right" />
           {/* Fade to white on the left edge */}
           <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent w-full md:w-[60%]" />
           {/* Overlay text card */}
           <div className="absolute top-[20%] lg:top-[25%] left-1/2 lg:left-[65%] -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-xl shadow-xl px-6 py-5 flex items-center gap-5 border border-white">
             <div className="bg-white p-2 rounded-full border border-gray-100 shadow-sm">
               <Users className="w-8 h-8 text-[#0B1F4D]" strokeWidth={1.5} />
             </div>
             <div className="flex flex-col gap-1 pr-4">
               <span className="font-extrabold text-[#946927] text-[13px] leading-tight">Member Owned</span>
               <span className="font-extrabold text-[#0B1F4D] text-[13px] leading-tight">Community Driven</span>
               <span className="font-extrabold text-[#0B1F4D] text-[13px] leading-tight">Built on Trust</span>
             </div>
           </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full pt-32 lg:pt-40 pb-44">
           <div className="max-w-2xl">
             <h1 className="text-4xl md:text-[56px] font-extrabold leading-[1.05] tracking-tight mb-3 text-black">
               Cooperative
               <br/>
               <span className="text-[#0B1F4D]">Financial Services</span>
             </h1>
             <h2 className="text-xl md:text-[22px] font-bold text-[#c78222] mb-6 tracking-wide">
               Building Financial Security Together
             </h2>
             <p className="text-[#0B1F4D] font-bold text-[14px] md:text-[15px] mb-8 max-w-[450px] leading-relaxed">
               Empowering Members Through Savings, Credit,<br/>Financial Security and Responsible Banking.
             </p>
             <div className="flex flex-wrap gap-3">
               <Link to="/membership" className="bg-[#0B1F4D] text-white px-5 py-2.5 rounded-[6px] font-bold text-[13px] flex items-center gap-2 hover:bg-[#071638] transition-colors shadow-md border border-[#0B1F4D]">
                 <User className="w-4 h-4" strokeWidth={2} /> Become a Member
               </Link>
               <Link to="#savings" className="bg-[#cf9023] text-white px-5 py-2.5 rounded-[6px] font-bold text-[13px] flex items-center gap-2 hover:bg-[#b57f1b] transition-colors shadow-md border border-[#cf9023]">
                 <Wallet className="w-4 h-4" strokeWidth={2} /> Explore Savings Plans
               </Link>
               <Link to="#loans" className="bg-[#247318] text-white px-5 py-2.5 rounded-[6px] font-bold text-[13px] flex items-center gap-2 hover:bg-[#16420f] transition-colors shadow-md border border-[#247318]">
                 <IndianRupee className="w-4 h-4" strokeWidth={2} /> Apply for Loan
               </Link>
             </div>
           </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-[1400px] bg-[#0B1F4D] border-t border-b border-l border-r border-[#193370] rounded-[8px] shadow-2xl py-5 px-6 z-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-white divide-x divide-white/10">
            {/* Stat 1 */}
            <div className="flex items-center justify-center gap-3 px-2">
               <Users className="w-6 h-6 shrink-0 text-white" strokeWidth={1.5} />
               <div className="flex flex-col">
                 <span className="font-extrabold text-[15px] leading-tight">25,000+</span>
                 <span className="text-[10px] font-semibold text-white/60 tracking-wide mt-0.5">Happy Members</span>
               </div>
            </div>
            {/* Stat 2 */}
            <div className="flex items-center justify-center gap-3 px-2">
               <Briefcase className="w-6 h-6 shrink-0 text-white" strokeWidth={1.5} />
               <div className="flex flex-col">
                 <span className="font-extrabold text-[15px] leading-tight">₹150 Cr+</span>
                 <span className="text-[10px] font-semibold text-white/60 tracking-wide mt-0.5">Total Deposits</span>
               </div>
            </div>
            {/* Stat 3 */}
            <div className="flex items-center justify-center gap-3 px-2">
               <Banknote className="w-6 h-6 shrink-0 text-white" strokeWidth={1.5} />
               <div className="flex flex-col">
                 <span className="font-extrabold text-[15px] leading-tight">₹85 Cr+</span>
                 <span className="text-[10px] font-semibold text-white/60 tracking-wide mt-0.5">Loans Disbursed</span>
               </div>
            </div>
            {/* Stat 4 */}
            <div className="flex items-center justify-center gap-3 px-2">
               <ShieldCheck className="w-6 h-6 shrink-0 text-white" strokeWidth={1.5} />
               <div className="flex flex-col">
                 <span className="font-extrabold text-[15px] leading-tight">99.5%</span>
                 <span className="text-[10px] font-semibold text-white/60 tracking-wide mt-0.5">Member Trust</span>
               </div>
            </div>
            {/* Stat 5 */}
            <div className="flex items-center justify-center gap-3 px-2">
               <Clock className="w-6 h-6 shrink-0 text-white" strokeWidth={1.5} />
               <div className="flex flex-col">
                 <span className="font-extrabold text-[15px] leading-tight">24/7</span>
                 <span className="text-[10px] font-semibold text-white/60 tracking-wide mt-0.5">Digital Access</span>
               </div>
            </div>
            {/* Stat 6 */}
            <div className="flex items-center justify-center gap-3 px-2">
               <Award className="w-6 h-6 shrink-0 text-white" strokeWidth={1.5} />
               <div className="flex flex-col">
                 <span className="font-extrabold text-[15px] leading-tight">12+</span>
                 <span className="text-[10px] font-semibold text-white/60 tracking-wide mt-0.5">Years of Service</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: NEW DASHBOARD / FEATURES SECTION ─────────────────────────── */}
      <section className="pt-16 pb-16 bg-[#fafafa]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-6">
          
          {/* Top Row Strip */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 lg:p-0"
          >
            <div className="grid grid-cols-2 lg:grid-cols-6 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
              {topFeatures.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 lg:p-6 hover:bg-gray-50/50 transition-colors">
                  <div className={`p-2.5 rounded-full border ${item.border} ${item.bg} shrink-0`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[13px] lg:text-[14px] text-[#0B1F4D] leading-tight mb-1">{item.title}</span>
                    <span className="text-[11px] lg:text-[12px] text-gray-500 font-medium leading-relaxed">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Main 3-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Card 1: What is Cooperative... */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-3 flex flex-col"
            >
              <h3 className="text-xl font-extrabold text-[#0B1F4D] mb-6 leading-tight pr-4">What is Cooperative<br/>Financial Services?</h3>
              <div className="relative flex-1 flex flex-col justify-between py-2">
                {/* Vertical Line connecting icons */}
                <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-gray-100 -z-0"></div>
                
                {whatIsFeatures.map((item, idx) => (
                  <div key={idx} className="relative z-10 flex items-center justify-between group cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors -mx-2">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0 group-hover:border-green-200 transition-colors">
                        <item.icon className="w-5 h-5 text-[#1f5e16]" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[14px] text-[#0B1F4D] group-hover:text-[#1f5e16] transition-colors">{item.title}</span>
                        <span className="text-[12px] text-gray-500 font-medium">{item.desc}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card 2: Purpose & Objectives */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-4"
            >
              <h3 className="text-xl font-extrabold text-[#0B1F4D] mb-6">Purpose & Objectives</h3>
              <div className="grid grid-cols-2 gap-4 h-[calc(100%-3rem)]">
                {purposeObjectives.map((item, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
                    <div className={`p-2 rounded-full border ${item.border} ${item.bg} shrink-0`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} strokeWidth={2} />
                    </div>
                    <span className="font-bold text-[12px] lg:text-[13px] text-[#0B1F4D] leading-tight break-words">{item.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card 3: Financial Products & Services */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-5 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold text-[#0B1F4D]">Financial Products & Services</h3>
                <Link to="/services" className="text-[#0B1F4D] font-bold text-[12px] flex items-center gap-1 hover:text-[#d49622] transition-colors">
                  View All Services <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 flex-1">
                {financialProducts.map((item, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2.5 hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                      <item.icon className={`w-5 h-5 ${item.color}`} strokeWidth={2} />
                    </div>
                    <span className="font-bold text-[11px] leading-tight text-[#0B1F4D]">{item.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: OVERVIEW & TABLES ─────────────────────────── */}
      <section className="pb-16 bg-[#fafafa]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Top Left: Why Choose Kalpavruksha? */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#0B1F4D] rounded-xl shadow-sm p-6 lg:p-8 flex flex-col"
            >
              <h3 className="text-xl font-extrabold text-white mb-6">Why Choose Kalpavruksha?</h3>
              <div className="bg-white rounded-xl p-4 lg:p-6 flex-1 border border-gray-100 shadow-inner">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {whyChooseFeatures.map((item, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-[#0B1F4D]" strokeWidth={2} />
                      </div>
                      <span className="font-bold text-[11px] leading-snug text-[#0B1F4D] whitespace-pre-line">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Top Right: Flexible Savings Plans */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col"
            >
              <h3 className="text-xl font-extrabold text-[#0B1F4D] mb-4">Flexible Savings Plans <span className="text-sm font-medium text-gray-500">(Illustrative)</span></h3>
              <div className="overflow-x-auto flex-1 flex flex-col">
                <table className="w-full min-w-[500px] border-collapse flex-1">
                  <thead>
                    <tr className="bg-[#0B1F4D] text-white">
                      <th className="py-3 px-4 text-center font-bold text-[13px] rounded-tl-lg">Monthly Saving</th>
                      <th className="py-3 px-4 text-center font-bold text-[13px] border-x border-white/20">5-Year Deposit <span className="font-normal opacity-80">(Illustrative)</span></th>
                      <th className="py-3 px-4 text-center font-bold text-[13px] rounded-tr-lg">Illustrative Loan Potential</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savingsPlans.map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                        <td className="py-2.5 px-4 text-center font-bold text-[#0B1F4D] text-[13px]">{row.monthly}</td>
                        <td className="py-2.5 px-4 text-center font-bold text-[#0B1F4D] text-[13px] border-x border-gray-100">{row.deposit}</td>
                        <td className="py-2.5 px-4 text-center font-medium text-gray-700 text-[13px]">{row.loan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-500 mt-4 text-right">* Illustrative figures only. Subject to Board-approved policy.</p>
            </motion.div>

            {/* Bottom Left: Deposit Interest */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col"
            >
              <h3 className="text-xl font-extrabold text-[#0B1F4D] mb-6">Deposit Interest <span className="text-sm font-medium text-gray-500">(Illustrative)</span></h3>
              <div className="flex flex-wrap md:flex-nowrap gap-3 flex-1 justify-between items-center mb-4">
                {depositInterest.map((item, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-shadow flex-1 min-w-[80px]">
                    <span className="font-bold text-[11px] text-[#0B1F4D]">{item.months}</span>
                    <span className="text-3xl font-extrabold text-[#0B1F4D] leading-none">{item.rate}</span>
                    <span className="font-bold text-[10px] text-gray-500">p.a.</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-500 mt-auto text-left">* Illustrative rates only. Subject to change as per Board-approved policy.</p>
            </motion.div>

            {/* Bottom Right: Loan Services */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold text-[#0B1F4D]">Loan Services</h3>
                <Link to="/services" className="text-[#0B1F4D] font-bold text-[12px] flex items-center gap-1 hover:text-[#d49622] transition-colors">
                  View All Loans <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 flex-1">
                {loanServices.map((item, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                      <item.icon className={`w-5 h-5 ${item.color}`} strokeWidth={2} />
                    </div>
                    <span className="font-bold text-[11px] leading-tight text-[#0B1F4D] whitespace-pre-line">{item.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SECTION 4: DETAILED PROCESSES & INFO ─────────────────────────── */}
      <section className="pb-16 bg-[#fafafa]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-6">
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Loan Eligibility Process Timeline */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-extrabold text-[#0B1F4D] mb-8">Loan Eligibility Process</h3>
              <div className="relative flex justify-between px-2 pt-2 pb-6 overflow-x-auto min-w-[600px] scrollbar-hide">
                {/* Horizontal Line */}
                <div className="absolute top-[20px] left-8 right-8 h-[2px] bg-blue-100 -z-0"></div>
                {loanProcessSteps.map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center gap-3 group w-20">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center shadow-sm group-hover:bg-blue-50 transition-colors">
                      <step.icon className="w-5 h-5 text-blue-700" strokeWidth={2} />
                    </div>
                    <span className="font-bold text-[10px] text-[#0B1F4D] text-center leading-tight whitespace-pre-line">{step.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* KMC-CBIL Credit System */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-extrabold text-[#0B1F4D] mb-6">KMC-CBIL Credit System</h3>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Gauge Section */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative w-48 h-24 overflow-hidden mb-2">
                    {/* SVG Gauge */}
                    <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="50%" stopColor="#eab308" />
                          <stop offset="100%" stopColor="#22c55e" />
                        </linearGradient>
                      </defs>
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#gaugeGrad)" strokeWidth="12" strokeLinecap="round" />
                      <circle cx="82" cy="46" r="4" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                    </svg>
                    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end">
                      <span className="text-3xl font-extrabold text-[#0B1F4D] leading-none">850</span>
                      <span className="text-[12px] font-bold text-[#0B1F4D]">Excellent</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between px-2">
                    <span className="text-[11px] font-bold text-gray-500">300</span>
                    <span className="text-[11px] font-bold text-gray-500">900</span>
                  </div>
                </div>
                
                {/* Text Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="text-[13px] font-bold text-[#0B1F4D] flex items-center gap-1.5"><ChevronRight className="w-4 h-4 text-blue-600"/> What is CBIL?</h4>
                    <p className="text-[12px] text-gray-500 ml-5.5 leading-relaxed">A unique credit score that reflects your savings discipline and financial behavior.</p>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#0B1F4D] flex items-center gap-1.5"><ChevronRight className="w-4 h-4 text-blue-600"/> How Score Improves?</h4>
                    <p className="text-[12px] text-gray-500 ml-5.5 leading-relaxed">Regular savings, timely transactions, responsible credit usage.</p>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#0B1F4D] flex items-center gap-1.5 mb-2"><ChevronRight className="w-4 h-4 text-blue-600"/> Benefits</h4>
                    <div className="grid grid-cols-2 gap-y-2 ml-5.5">
                      {cbilBenefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="text-[11px] font-medium text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Member Benefits */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-5">
              <h3 className="text-xl font-extrabold text-[#0B1F4D] mb-6">Member Benefits</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-6 gap-x-2">
                {memberBenefits.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center gap-2 group">
                    <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:border-blue-200 transition-colors">
                      <item.icon className={`w-4 h-4 ${item.color}`} strokeWidth={2} />
                    </div>
                    <span className="font-bold text-[9px] sm:text-[10px] leading-tight text-gray-700 whitespace-pre-line">{item.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* How It Works Timeline */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-7">
              <h3 className="text-xl font-extrabold text-[#0B1F4D] mb-8">How It Works</h3>
              <div className="relative flex justify-between px-2 pt-2 pb-6 overflow-x-auto min-w-[700px] scrollbar-hide">
                {/* Horizontal Line */}
                <div className="absolute top-[20px] left-6 right-6 h-[2px] bg-blue-50 -z-0"></div>
                {howItWorksSteps.map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center gap-3 group w-20">
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-blue-300 transition-colors">
                      <step.icon className="w-5 h-5 text-blue-700" strokeWidth={1.5} />
                    </div>
                    <span className="font-bold text-[10px] text-[#0B1F4D] text-center leading-tight whitespace-pre-line">{step.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Required Documents */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-[17px] font-extrabold text-[#0B1F4D] mb-5">Required Documents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-2 gap-y-4">
                {requiredDocs.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 group">
                    <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
                      <doc.icon className="w-3.5 h-3.5 text-blue-700" />
                    </div>
                    <span className="text-[11px] font-bold text-[#0B1F4D] group-hover:text-blue-700 transition-colors">{doc.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Rules & Regulations */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
              <h3 className="text-[17px] font-extrabold text-[#0B1F4D] mb-5">Rules & Regulations</h3>
              <div className="space-y-2.5 flex-1">
                {rulesPolicies.map((rule, idx) => (
                  <button key={idx} className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left border border-gray-100">
                    <span className="text-[12px] font-bold text-[#0B1F4D]">{rule}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Link to="#" className="text-[11px] font-bold text-[#0B1F4D] hover:text-blue-600 inline-flex items-center gap-1">View All <ArrowRight className="w-3 h-3"/></Link>
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[17px] font-extrabold text-[#0B1F4D]">Frequently Asked Questions</h3>
                <Link to="#" className="text-[10px] font-bold text-[#0B1F4D] hover:text-blue-600 inline-flex items-center gap-1 shrink-0">View All FAQs <ArrowRight className="w-3 h-3"/></Link>
              </div>
              <div className="space-y-2.5 flex-1">
                {faqs.map((faq, idx) => (
                  <button key={idx} className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left border border-gray-100">
                    <span className="text-[11px] font-bold text-gray-700 pr-4">{faq}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Downloads */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-[17px] font-extrabold text-[#0B1F4D] mb-5">Downloads</h3>
              <div className="space-y-3">
                {downloadsList.map((file, idx) => (
                  <button key={idx} className="w-full flex items-center justify-between group">
                    <div className="flex items-center gap-2.5">
                      <Download className="w-4 h-4 text-blue-600" />
                      <span className="text-[12px] font-bold text-[#0B1F4D] group-hover:text-blue-600 transition-colors">{file}</span>
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">PDF</span>
                  </button>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: RELATED SERVICES & CONTACT ─────────────────────────── */}
      <section className="pb-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-6">
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            
            {/* Left: Related Services */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 xl:col-span-5 flex flex-col overflow-x-auto h-full">
              <h3 className="text-[17px] font-extrabold text-[#0B1F4D]">Related Services</h3>
              <p className="text-[12px] text-gray-500 mb-6">Explore Our Other Services</p>
              
              <div className="flex gap-3 min-w-[450px] items-stretch">
                {relatedServices.map((service, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center justify-start gap-2 hover:shadow-md transition-all flex-1 h-[140px]">
                    <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center shrink-0 mb-2">
                      <service.icon className={`w-4 h-4 ${service.color}`} />
                    </div>
                    <span className="font-bold text-[10px] leading-tight text-[#0B1F4D] whitespace-pre-line">{service.title}</span>
                    <span className="text-[8px] text-gray-400 mt-auto">{service.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-[#184687] rounded-xl shadow-sm p-6 lg:p-8 xl:col-span-7 relative overflow-hidden flex flex-col">
              
              {/* Optional woman image - visible on md+ */}
              <div className="absolute bottom-0 right-0 h-[100%] w-[35%] pointer-events-none hidden md:block">
                <img src="/img/contact_hero.png" alt="Contact Support" className="w-full h-full object-cover object-bottom" onError={(e) => { e.target.src = '/img/pro.png'; }} />
              </div>
              
              <div className="relative z-10 w-full md:w-[70%]">
                <h3 className="text-xl font-extrabold text-white mb-1">Need More Information?</h3>
                <p className="text-[12px] text-blue-200 mb-6">We are here to help you!</p>
                
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-[#0B1F4D] mb-1">Full Name <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="Enter your name" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[11px] focus:outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#0B1F4D] mb-1">Mobile Number <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="Enter mobile number" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[11px] focus:outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#0B1F4D] mb-1">Email Address <span className="text-red-500">*</span></label>
                        <input type="email" placeholder="Enter email" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[11px] focus:outline-none focus:border-blue-500" />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold text-[#0B1F4D] mb-1">Subject <span className="text-red-500">*</span></label>
                        <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[11px] focus:outline-none focus:border-blue-500 text-gray-400 bg-white">
                          <option>Select subject</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#0B1F4D] mb-1">Preferred Service <span className="text-red-500">*</span></label>
                        <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[11px] focus:outline-none focus:border-blue-500 text-gray-400 bg-white">
                          <option>Select service</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#0B1F4D] mb-1">Message <span className="text-red-500">*</span></label>
                        <textarea placeholder="Type your message here..." className="w-full border border-gray-200 rounded-md px-3 py-2 text-[11px] focus:outline-none focus:border-blue-500 h-[36px] resize-none"></textarea>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <button type="button" className="bg-[#d49622] hover:bg-[#b5801d] text-white text-[12px] font-bold px-6 py-2.5 rounded-md flex items-center gap-2 transition-colors">
                        Submit Enquiry <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Disclaimer Row */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6">
            <div className="flex gap-3 shrink-0 md:w-[220px]">
              <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[13px] font-extrabold text-[#0B1F4D] mb-1">Disclaimer</h3>
                <p className="text-[10px] text-gray-600 font-medium leading-snug">Membership required to access all financial services.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 flex-1">
              {disclaimers.map((text, idx) => (
                <div key={idx} className="flex gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-500 leading-relaxed" dangerouslySetInnerHTML={{__html: text.replace('and do not constitute a guarantee.', '<strong class="text-[#0B1F4D]">and do not constitute a guarantee.</strong>')}}></p>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </section>



    </div>
  );
};

export default DivFin;
