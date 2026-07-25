import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Briefcase, 
  Edit3,
  ShieldCheck,
  FileText,
  Users,
  UsersRound,
  Building2,
  Wallet,
  Landmark,
  Clock,
  Award,
  TrendingUp,
  UserCircle,
  UserCog,
  Home,
  Shield,
  PiggyBank,
  TreePine,
  Coins,
  Target,
  PieChart,
  ArrowRight,
  User,
  CheckSquare,
  FileSignature,
  Activity,
  LineChart,
  RefreshCw,
  MapPin,
  Map,
  CheckCircle2,
  Calendar,
  Handshake,
  FolderSearch
} from 'lucide-react';

const CooperativeInvestment = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const bannerHighlights = [
    { icon: ShieldCheck, title: "Secure Investments", desc: "Backed by Real Assets" },
    { icon: FileText, title: "Transparent Process", desc: "Clear Records & Reporting" },
    { icon: Users, title: "Professional Governance", desc: "Board Approved & Audited" }
  ];

  const stats = [
    { icon: UsersRound, value: "25,000+", label: "Members" },
    { icon: Building2, value: "18+", label: "Active Projects" },
    { icon: Wallet, value: "₹150 Cr+", label: "Total Assets Under Management" },
    { icon: Landmark, value: "₹85 Cr+", label: "Member Investments" },
    { icon: Clock, value: "100%", label: "Transparent Reporting" },
    { icon: Award, value: "7+", label: "Years of Trust" }
  ];

  const overviewFeatures = [
    { icon: Users, title: "Collective Resources", desc: "Stronger Together" },
    { icon: Briefcase, title: "Real Asset Focus", desc: "Tangible & Sustainable" },
    { icon: TrendingUp, title: "Long-term Value", desc: "Wealth for Generations" },
    { icon: UserCircle, title: "Member Centric", desc: "Designed for Members" }
  ];

  const philosophyCards = [
    {
      icon: Users,
      title: "Collective Ownership",
      desc: "Pool member resources to access larger opportunities.",
      color: "text-[#d49622]",
      bgColor: "bg-[#d49622]"
    },
    {
      icon: TrendingUp,
      title: "Long-Term Wealth Creation",
      desc: "Focus on asset appreciation and sustainable value creation.",
      color: "text-[#0B1F4D]",
      bgColor: "bg-[#0B1F4D]"
    },
    {
      icon: ShieldCheck,
      title: "Transparency",
      desc: "Independent project accounts, annual reporting, and audit trails.",
      color: "text-[#427a41]",
      bgColor: "bg-[#427a41]"
    },
    {
      icon: UserCog,
      title: "Professional Governance",
      desc: "Projects managed under Board-approved policies and cooperative governance.",
      color: "text-[#673ab7]",
      bgColor: "bg-[#673ab7]"
    }
  ];

  const objectives = [
    { icon: Landmark, title: "Build Community Wealth", desc: "Create long-term assets for members" },
    { icon: Home, title: "Asset Ownership", desc: "Invest in tangible assets" },
    { icon: Shield, title: "Financial Security", desc: "Diversify beyond savings" },
    { icon: PiggyBank, title: "Wealth Preservation", desc: "Reduce dependency on speculative investments" },
    { icon: Users, title: "Collective Strength", desc: "Increase purchasing power" },
    { icon: UserCog, title: "Professional Management", desc: "Centralized administration and compliance" }
  ];

  const servicesList = [
    {
      icon: TreePine,
      iconColor: "text-[#3b7d3f]",
      title: "Cooperative Land Investment",
      desc: "Participate in land acquisition and development projects through pooled member investments."
    },
    {
      icon: Coins,
      iconColor: "text-[#d49622]",
      title: "Goldage Cooperative Wealth Plan",
      desc: "Monthly gold savings and collective purchasing with trusted jewellery partners."
    },
    {
      icon: Target,
      iconColor: "text-[#0B1F4D]",
      title: "Asset Accumulation Plans",
      desc: "Disciplined long-term investment towards tangible assets."
    },
    {
      icon: UsersRound,
      iconColor: "text-[#673ab7]",
      title: "Member Investment Pools",
      desc: "Participate only in projects you choose."
    },
    {
      icon: PieChart,
      iconColor: "text-[#0f766e]",
      title: "Portfolio Diversification",
      desc: "Spread investments across different cooperative projects."
    },
    {
      icon: Building2,
      iconColor: "text-[#d49622]",
      title: "Future Investment Projects",
      desc: "Commercial assets, warehousing, renewable energy, agriculture, infrastructure & more."
    }
  ];

  const comparisonData = [
    { individual: "Limited capital", cooperative: "Collective purchasing power" },
    { individual: "Individual negotiation", cooperative: "Professional negotiation" },
    { individual: "Limited opportunities", cooperative: "Larger projects" },
    { individual: "Separate management", cooperative: "Centralized management" },
    { individual: "Limited reporting", cooperative: "Transparent project reports" },
    { individual: "Individual responsibility", cooperative: "Professional governance" }
  ];

  const modelSteps = [
    { id: 1, icon: User, title: "Step 1", desc: "Become a Member" },
    { id: 2, icon: CheckSquare, title: "Step 2", desc: "Choose an Approved Project" },
    { id: 3, icon: FileSignature, title: "Step 3", desc: "Complete Investment Registration" },
    { id: 4, icon: Landmark, title: "Step 4", desc: "Funds Allocated to Separate Project Account" },
    { id: 5, icon: Building2, title: "Step 5", desc: "Society Acquires the Asset" },
    { id: 6, icon: Activity, title: "Step 6", desc: "Project Management & Monitoring" },
    { id: 7, icon: LineChart, title: "Step 7", desc: "Annual Reporting" },
    { id: 8, icon: RefreshCw, title: "Step 8", desc: "Project Completion / Exit / Reinvestment" }
  ];

  const landFeatures = [
    { icon: Map, title: "Society-Owned", subtitle: "Assets" },
    { icon: Wallet, title: "Separate", subtitle: "Project Fund" },
    { icon: Users, title: "Separate", subtitle: "Investor Register" },
    { icon: FileSignature, title: "Investment", subtitle: "Certificates" },
    { icon: FileText, title: "Independent", subtitle: "Accounting" },
    { icon: LineChart, title: "Transparent", subtitle: "Reporting" },
    { icon: ShieldCheck, title: "Transparent", subtitle: "Exit Policy" },
    { icon: CheckSquare, title: "Audit", subtitle: "Compliance" }
  ];

  const landProjectFlow = [
    "Approved Project",
    "Members Participate",
    "Investment Pool Created",
    "Land Purchased",
    "Development / Lease",
    "Value Appreciation",
    "Annual Reporting",
    "Project Exit / Reinvestment"
  ];

  const goldageJourney = [
    { step: 1, title: "Join Goldage", desc: "Register" },
    { step: 2, title: "Monthly Savings", desc: "Build Gold Fund" },
    { step: 3, title: "Account Tracking", desc: "Digital Passbook" },
    { step: 4, title: "Purchase Request", desc: "Balance Verification" },
    { step: 5, title: "Purchase", desc: "Partner Jeweller" },
    { step: 6, title: "Continue Saving", desc: "Repeat Cycle" }
  ];

  const goldageBenefits = [
    { icon: Users, title: "Collective Purchasing", desc: "Better commercial negotiations." },
    { icon: Wallet, title: "Financial Discipline", desc: "Monthly savings habit." },
    { icon: FileText, title: "Transparent Records", desc: "Every transaction recorded." },
    { icon: Handshake, title: "Trusted Partners", desc: "Approved jewellery network." },
    { icon: Calendar, title: "Flexible Purchase", desc: "Buy whenever eligible." },
    { icon: Target, title: "Long-Term Planning", desc: "Prepare for weddings, festivals & future needs." }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* ── BANNER SECTION ────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-blue-50/30">
        
        {/* Background Image Wrapper */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/img/co.png" 
            alt="Investment Background" 
            className="w-full h-full object-cover object-center"
            onError={(e) => { e.target.src = '/img/co.jpg'; }}
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 pt-12 lg:pt-20 pb-4 flex flex-col lg:flex-row justify-between items-center gap-12">
          
          {/* Left Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex-1 w-full max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-[#0B1F4D] leading-[1.1] mb-5 tracking-tight">
              Cooperative<br/>
              Investment Services
            </h1>
            <h2 className="text-[18px] md:text-[22px] font-bold text-[#d49622] mb-6">
              Collective Wealth Creation Through Real Assets
            </h2>
            <p className="text-[#0B1F4D] text-[13px] md:text-[15px] leading-relaxed mb-8 max-w-[520px] font-medium">
              Create long-term wealth through disciplined, transparent, and professionally managed cooperative investment projects.<br/>
              Members pool resources to participate in larger opportunities that may be difficult to access individually.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#d49622] hover:bg-[#b5801d] text-white px-6 py-3 rounded-md font-bold text-[13px] flex items-center gap-2 transition-all shadow-sm">
                <UserPlus className="w-4 h-4" /> Become a Member
              </button>
              <button className="bg-[#0B1F4D] hover:bg-[#15347a] text-white px-6 py-3 rounded-md font-bold text-[13px] flex items-center gap-2 transition-all shadow-sm">
                <Briefcase className="w-4 h-4" /> Explore Investment Projects
              </button>
              <button className="bg-[#427a41] hover:bg-[#346133] text-white px-6 py-3 rounded-md font-bold text-[13px] flex items-center gap-2 transition-all shadow-sm">
                <Edit3 className="w-4 h-4" /> Register Interest
              </button>
            </div>
          </motion.div>

          {/* Right Content - Highlight Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[280px] bg-white rounded-[20px] shadow-xl border border-white/50"
          >
            <div className="flex flex-col p-6 divide-y divide-gray-100">
              {bannerHighlights.map((item, idx) => (
                <div key={idx} className={`flex gap-5 items-center ${idx === 0 ? 'pb-6' : idx === bannerHighlights.length - 1 ? 'pt-6' : 'py-6'}`}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <item.icon className="w-7 h-7 text-[#d49622]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1F4D] text-[15px] mb-1">{item.title}</h4>
                    <p className="text-[12px] font-medium text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ── STATS STRIP (Floating inside banner) ────────────────────────────── */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 pb-6">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="bg-[#0B1F4D] rounded-xl shadow-lg grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 py-6 px-8 divide-x divide-white/20"
          >
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                className={`flex items-center gap-4 ${idx !== 0 ? 'pl-6' : ''}`}
              >
                <stat.icon className="w-8 h-8 text-white shrink-0 stroke-[1.5]" />
                <div className="flex flex-col justify-center">
                  <h3 className="text-[17px] font-extrabold text-white leading-tight mb-0.5">{stat.value}</h3>
                  <p className="text-[10px] text-gray-300 font-medium leading-tight whitespace-nowrap">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </section>

      {/* ── OVERVIEW & PHILOSOPHY SECTION ────────────────────────────── */}
      <section className="bg-gray-50/50 py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          
          {/* Overview Card */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center"
          >
            {/* Left Content */}
            <div className="flex-1 flex gap-6 md:gap-8">
              <div className="hidden md:flex w-28 h-28 shrink-0 bg-[#0B1F4D] rounded-full items-center justify-center shadow-lg">
                <Landmark className="w-14 h-14 text-white" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[11px] font-black text-[#0B1F4D] uppercase tracking-wider mb-2">Overview</span>
                <h3 className="text-xl md:text-2xl font-bold text-[#0B1F4D] mb-4 leading-tight">
                  One Membership. Multiple Investment Opportunities.
                </h3>
                <p className="text-[13px] text-[#0B1F4D] font-medium leading-relaxed mb-4">
                  The Cooperative Investment Services division enables members to participate in carefully structured investment projects through collective ownership, transparent governance, and professional management.
                </p>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  Unlike speculative investing, every project is backed by documented governance, separate accounting, regular reporting, and member participation as defined by approved policies.
                </p>
              </div>
            </div>

            {/* Right Grid */}
            <div className="w-full lg:w-auto shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              {overviewFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <feat.icon className="w-8 h-8 text-[#d49622] shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-[14px] font-bold text-[#0B1F4D] mb-0.5">{feat.title}</h4>
                    <p className="text-[11px] text-gray-500 font-medium">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Philosophy Title */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <div className="flex items-center gap-1">
              <div className="w-12 h-[1px] bg-[#d49622]/40"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#d49622]"></div>
            </div>
            <h3 className="text-[15px] md:text-[17px] font-black text-[#0B1F4D] uppercase tracking-wider">Our Investment Philosophy</h3>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#d49622]"></div>
              <div className="w-12 h-[1px] bg-[#d49622]/40"></div>
            </div>
          </motion.div>

          {/* Philosophy Cards Grid */}
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {philosophyCards.map((card, idx) => (
              <motion.div 
                key={idx} variants={fadeUp}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className={`w-14 h-14 rounded-full ${card.bgColor} flex items-center justify-center shrink-0 shadow-sm`}>
                    <card.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[14px] font-bold text-[#0B1F4D] leading-tight pt-1">{card.title}</h4>
                </div>
                <p className="text-[12px] text-gray-500 leading-relaxed font-medium">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── PURPOSE & SERVICES SECTION ────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-6">
          
          {/* Left Card: Purpose & Objectives */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full lg:w-[45%] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col"
          >
            <h3 className="text-[15px] font-black text-[#0B1F4D] uppercase tracking-wider mb-6">Purpose & Objectives</h3>
            
            <div className="flex flex-col border border-gray-100 rounded-xl overflow-hidden">
              {/* Header Row */}
              <div className="flex bg-gray-50/50 py-3 px-4 border-b border-gray-100">
                <div className="flex-1 text-[13px] font-bold text-[#0B1F4D]">Objective</div>
                <div className="flex-1 text-[13px] font-bold text-[#0B1F4D]">Description</div>
              </div>
              
              {/* Data Rows */}
              <div className="flex flex-col divide-y divide-gray-100">
                {objectives.map((obj, idx) => (
                  <div key={idx} className="flex py-3 px-4 items-center">
                    <div className="flex-1 flex items-center gap-3 pr-4">
                      <obj.icon className="w-4 h-4 text-[#d49622] shrink-0" strokeWidth={2} />
                      <span className="text-[13px] font-bold text-[#0B1F4D] leading-tight">{obj.title}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[12px] font-medium text-[#0B1F4D] leading-tight">{obj.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Card: Investment Services */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full lg:w-[55%] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[15px] font-black text-[#0B1F4D] uppercase tracking-wider">Investment Services</h3>
              <a href="#" className="text-[12px] font-bold text-[#0B1F4D] flex items-center gap-1 hover:text-[#d49622] transition-colors">
                View All Projects <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {servicesList.map((service, idx) => (
                <div key={idx} className="flex gap-4">
                  <service.icon className={`w-8 h-8 shrink-0 ${service.iconColor}`} strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <h4 className="text-[14px] font-bold text-[#0B1F4D] mb-1.5 leading-tight">{service.title}</h4>
                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── WHY INVEST & HOW IT WORKS SECTION ────────────────────────────── */}
      <section className="bg-gray-50/50 py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-6">
          
          {/* Left Card: Why Invest Through a Cooperative? */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full lg:w-[45%] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col"
          >
            <h3 className="text-[15px] font-black text-[#0B1F4D] uppercase tracking-wider mb-6">Why Invest Through a Cooperative?</h3>
            
            <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden relative">
              {/* Header Row */}
              <div className="flex bg-[#0B1F4D] py-3.5 px-4 relative z-10">
                <div className="flex-1 text-[13px] font-bold text-white text-center">Individual Investment</div>
                <div className="flex-1 text-[13px] font-bold text-white text-center">Cooperative Investment</div>
                
                {/* VS Badge */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-[9px] font-bold text-[#0B1F4D]">VS</span>
                </div>
              </div>
              
              {/* Data Rows */}
              <div className="flex flex-col divide-y divide-gray-100 relative">
                {/* Center divider line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2"></div>
                
                {comparisonData.map((row, idx) => (
                  <div key={idx} className="flex py-3.5 px-4 items-center relative z-10 hover:bg-gray-50/50 transition-colors">
                    <div className="flex-1 text-center pr-4">
                      <span className="text-[12px] font-medium text-gray-600 leading-tight">{row.individual}</span>
                    </div>
                    <div className="flex-1 text-center pl-4">
                      <span className="text-[12px] font-bold text-[#0B1F4D] leading-tight">{row.cooperative}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Card: How the Investment Model Works */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full lg:w-[55%] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col"
          >
            <h3 className="text-[15px] font-black text-[#0B1F4D] uppercase tracking-wider mb-8">How the Investment Model Works</h3>

            <div className="flex flex-col gap-8 lg:gap-12 w-full pt-4">
              
              {/* Top Row (Steps 1-4) */}
              <div className="grid grid-cols-4 gap-2 relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-blue-100 -z-0">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 border-t-2 border-r-2 border-blue-200 rotate-45"></div>
                  <div className="absolute right-[33%] top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 border-t-2 border-r-2 border-blue-200 rotate-45"></div>
                  <div className="absolute right-[66%] top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 border-t-2 border-r-2 border-blue-200 rotate-45"></div>
                </div>

                {modelSteps.slice(0, 4).map((step) => (
                  <div key={step.id} className="flex flex-col items-center text-center relative z-10 group">
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-blue-50 flex items-center justify-center mb-4 shadow-sm group-hover:border-[#0B1F4D] transition-colors">
                      <step.icon className="w-7 h-7 text-[#0B1F4D]" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-bold text-[#0B1F4D] mb-1">{step.title}</span>
                    <span className="text-[11px] font-medium text-gray-500 leading-tight max-w-[100px]">{step.desc}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Row (Steps 5-8) */}
              <div className="grid grid-cols-4 gap-2 relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-blue-100 -z-0">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 border-t-2 border-r-2 border-blue-200 rotate-45"></div>
                  <div className="absolute right-[33%] top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 border-t-2 border-r-2 border-blue-200 rotate-45"></div>
                  <div className="absolute right-[66%] top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 border-t-2 border-r-2 border-blue-200 rotate-45"></div>
                </div>

                {modelSteps.slice(4, 8).map((step) => (
                  <div key={step.id} className="flex flex-col items-center text-center relative z-10 group">
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-blue-50 flex items-center justify-center mb-4 shadow-sm group-hover:border-[#0B1F4D] transition-colors">
                      <step.icon className="w-7 h-7 text-[#0B1F4D]" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-bold text-[#0B1F4D] mb-1">{step.title}</span>
                    <span className="text-[11px] font-medium text-gray-500 leading-tight max-w-[100px]">{step.desc}</span>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ── LAND INVESTMENT & GOLDAGE SECTION ────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-6">
          
          {/* Left Card: Cooperative Land Investment */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col"
          >
            <h3 className="text-[15px] font-black text-[#0B1F4D] uppercase tracking-wider mb-6">Cooperative Land Investment</h3>
            
            {/* Intro Header */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <div className="w-full sm:w-[220px] h-[140px] rounded-xl overflow-hidden relative shrink-0">
                <img 
                  src="/img/land.png" 
                  alt="Land Investment" 
                  className="w-full h-full object-cover"
                  onError={(e) => { 
                    e.target.style.display = 'none'; 
                    e.target.nextSibling.style.display = 'flex'; 
                  }}
                />
                <div className="hidden absolute inset-0 bg-green-100 items-center justify-center">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <p className="text-[12px] font-medium text-[#0B1F4D] leading-relaxed">
                Members voluntarily participate in Board-approved land investment projects. The Cooperative acquires land in its own name while maintaining detailed records of every participating member's contribution through project registers and investment certificates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8">
              {/* Key Features Grid */}
              <div className="flex-1">
                <h4 className="text-[13px] font-black text-[#0B1F4D] uppercase tracking-wider mb-5">Key Features</h4>
                <div className="grid grid-cols-4 gap-x-2 gap-y-6">
                  {landFeatures.map((feat, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-2 shadow-sm relative">
                        <feat.icon className="w-4 h-4 text-green-700 relative z-10" strokeWidth={1.5} />
                        <div className="absolute inset-0 rounded-full border border-yellow-500 opacity-30 transform scale-[0.85]"></div>
                      </div>
                      <span className="text-[10px] font-bold text-[#0B1F4D] leading-[1.1]">{feat.title}</span>
                      <span className="text-[10px] font-medium text-[#0B1F4D] leading-[1.1]">{feat.subtitle}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Land Project Flow */}
              <div className="w-full sm:w-[200px] shrink-0 border border-gray-100 rounded-xl p-5 bg-white shadow-sm">
                <h4 className="text-[13px] font-black text-[#0B1F4D] uppercase tracking-wider mb-5">Land Project Flow</h4>
                <div className="flex flex-col relative">
                  <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gray-200"></div>
                  {landProjectFlow.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 mb-3.5 last:mb-0 relative z-10">
                      <div className="w-[19px] h-[19px] rounded-full bg-white border-2 border-blue-100 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0B1F4D]"></div>
                      </div>
                      <span className="text-[11px] font-bold text-[#0B1F4D]">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Card: Goldage Cooperative Wealth Plan */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col relative overflow-hidden"
          >
            <h3 className="text-[15px] font-black text-[#0B1F4D] uppercase tracking-wider mb-2">Goldage Cooperative Wealth Plan</h3>
            <h4 className="text-[14px] font-bold text-blue-800 mb-3">Save Monthly. Buy Smarter.</h4>
            <p className="text-[12px] font-medium text-[#0B1F4D] leading-relaxed mb-8">
              Goldage helps members accumulate savings for future gold purchases while leveraging the Cooperative's collective purchasing power to negotiate better commercial terms with trusted jewellery partners. Gold remains owned by the member after purchase.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 relative z-10">
              {/* Member Journey */}
              <div className="w-full sm:w-[240px] shrink-0 border border-gray-100 rounded-xl p-5 bg-white shadow-sm">
                <h4 className="text-[13px] font-black text-[#0B1F4D] uppercase tracking-wider mb-5">Member Journey</h4>
                <div className="flex flex-col relative">
                  <div className="absolute left-[13px] top-2 bottom-2 w-px bg-gray-200"></div>
                  {goldageJourney.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-4 mb-3 last:mb-0 relative z-10 bg-white border border-gray-100 rounded-md py-2 px-3 shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-[#d49622] text-white flex items-center justify-center shrink-0 font-bold text-[11px]">
                        {step.step}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-[#0B1F4D] leading-tight mb-0.5">{step.title}</span>
                        <span className="text-[10px] font-medium text-gray-500 leading-tight">{step.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="flex-1 flex flex-col border border-gray-100 rounded-xl p-5 bg-white shadow-sm">
                <h4 className="text-[13px] font-black text-[#0B1F4D] uppercase tracking-wider mb-5">Benefits</h4>
                <div className="flex flex-col gap-4">
                  {goldageBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-3">
                      <benefit.icon className="w-5 h-5 text-[#d49622] shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-[#0B1F4D] leading-tight mb-0.5">{benefit.title}</span>
                        <span className="text-[10px] font-medium text-gray-500 leading-tight">{benefit.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Background Decorative Gold Image */}
            <div className="absolute bottom-0 right-0 opacity-20 pointer-events-none translate-x-1/4 translate-y-1/4">
              <img 
                src="/img/gold.png" 
                alt="Gold Decorative" 
                className="w-48 h-48 object-cover mix-blend-multiply"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── ILLUSTRATIVE EXAMPLES SECTION ────────────────────────────── */}
      <section className="bg-gray-50/50 pt-0 pb-8">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center">
          
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-10 w-full justify-center">
            <div className="w-16 sm:w-24 h-px bg-[#d49622]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#0B1F4D]"></div>
            <h2 className="text-[16px] sm:text-[18px] font-black text-[#0B1F4D] uppercase tracking-wider text-center">Illustrative Examples</h2>
            <div className="w-1.5 h-1.5 rounded-full bg-[#0B1F4D]"></div>
            <div className="w-16 sm:w-24 h-px bg-[#d49622]"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 w-full">
            
            {/* Example 1 Card */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-6"
            >
              {/* Image */}
              <div className="w-full sm:w-[130px] h-[160px] sm:h-full rounded-xl overflow-hidden shrink-0">
                <img 
                  src="/img/coi.png" 
                  alt="Land Appreciation" 
                  className="w-full h-full object-cover"
                  onError={(e) => { 
                    e.target.style.display = 'none'; 
                    e.target.nextSibling.style.display = 'flex'; 
                  }}
                />
                <div className="hidden absolute inset-0 bg-green-50 items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1">
                <h4 className="text-[14px] font-bold text-[#0B1F4D] mb-4">Example 1 - Land Appreciation</h4>
                
                {/* Table */}
                <div className="flex flex-col w-full border border-gray-100 rounded-lg overflow-hidden mb-2">
                  <div className="flex bg-white py-2 px-3 border-b border-gray-100">
                    <div className="flex-1 text-[11px] font-bold text-[#0B1F4D]">Particular</div>
                    <div className="flex-1 text-[11px] font-bold text-[#0B1F4D] text-right">Value</div>
                  </div>
                  <div className="flex bg-gray-50/80 py-2 px-3 border-b border-gray-100">
                    <div className="flex-1 text-[11px] font-medium text-[#0B1F4D]">Investment</div>
                    <div className="flex-1 text-[11px] font-bold text-[#0B1F4D] text-right">₹1,00,000</div>
                  </div>
                  <div className="flex bg-gray-50/80 py-2 px-3">
                    <div className="flex-1 text-[11px] font-medium text-[#0B1F4D]">Value After 5 Years*</div>
                    <div className="flex-1 text-[11px] font-bold text-[#0B1F4D] text-right">₹1,80,000</div>
                  </div>
                </div>
                
                <span className="text-[9px] text-gray-500 italic">*Illustrative example only.</span>
              </div>
            </motion.div>

            {/* Example 2 Card */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 justify-between items-center"
            >
              {/* Content */}
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <UserCog className="w-6 h-6 text-[#0B1F4D] shrink-0" strokeWidth={1.5} />
                  <h4 className="text-[14px] font-bold text-[#0B1F4D]">Example 2 - Lease Income</h4>
                </div>
                <p className="text-[11px] font-medium text-gray-600 leading-relaxed pr-2">
                  Goldage generates lease income. Income is managed according to approved project policy after expenses and statutory obligations.
                </p>
              </div>

              {/* Image */}
              <div className="w-full sm:w-[160px] h-[120px] rounded-xl overflow-hidden shrink-0 mt-4 sm:mt-0">
                <img 
                  src="/img/pen.png" 
                  alt="Lease Income Documents" 
                  className="w-full h-full object-cover"
                  onError={(e) => { 
                    e.target.style.display = 'none'; 
                    e.target.nextSibling.style.display = 'flex'; 
                  }}
                />
                <div className="hidden absolute inset-0 bg-blue-50 items-center justify-center">
                  <FileText className="w-8 h-8 text-[#0B1F4D]" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CTA BANNER SECTION ────────────────────────────── */}
      <section className="bg-gray-50/50 pb-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full bg-[#0B1F4D] rounded-2xl p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-lg relative overflow-hidden"
          >
            {/* Left Content */}
            <div className="flex items-center gap-6 relative z-10">
              {/* Decorative Logo / Icon */}
              <div className="w-16 h-16 rounded-full border border-[#d49622]/30 bg-[#d49622]/10 flex items-center justify-center shrink-0">
                <div className="w-12 h-12 rounded-full border border-[#d49622] flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#d49622]" />
                </div>
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-[20px] md:text-[24px] font-black text-white mb-2 leading-tight">Ready to Grow Your Wealth with Us?</h3>
                <p className="text-[13px] md:text-[14px] font-medium text-blue-100">Join thousands of members building a secure financial future together.</p>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 relative z-10 w-full lg:w-auto">
              <button className="flex items-center gap-2 bg-[#d49622] hover:bg-[#b8801d] text-white px-5 py-3 rounded-lg text-[13px] font-bold transition-all shadow-md">
                <UserPlus className="w-4 h-4" />
                Become a Member
              </button>
              <button className="flex items-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/40 px-5 py-3 rounded-lg text-[13px] font-bold transition-all">
                <FolderSearch className="w-4 h-4" />
                Explore Projects
              </button>
              <button className="flex items-center gap-2 bg-[#3b7d3f] hover:bg-[#2e6332] text-white px-5 py-3 rounded-lg text-[13px] font-bold transition-all shadow-md">
                <Edit3 className="w-4 h-4" />
                Register Interest
              </button>
            </div>

            {/* Background Decorative Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default CooperativeInvestment;
