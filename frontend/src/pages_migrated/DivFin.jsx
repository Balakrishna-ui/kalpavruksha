import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Clock, 
  Settings, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  Lock,
  Zap,
  Briefcase,
  Award,
  Users
} from 'lucide-react';

const DivFin = () => {
  const highlights = [
    { title: 'Trust & Security', desc: 'Safe and reliable financial services for your peace of mind.', icon: <Shield className="w-6 h-6" /> },
    { title: 'Fast Processing', desc: 'Quick approvals and minimal documentation to save your time.', icon: <Zap className="w-6 h-6" /> },
    { title: 'Flexible Plans', desc: 'Customized financial solutions that grow with you.', icon: <Settings className="w-6 h-6" /> },
  ];

  const steps = [
    { title: 'Consultation', desc: 'Discuss your financial needs with our expert team.' },
    { title: 'Documentation', desc: 'Simple submission of necessary records.' },
    { title: 'Verification', desc: 'Rigorous and transparent check for security.' },
    { title: 'Approval', desc: 'Quick turnaround time for all applications.' },
    { title: 'Disbursement', desc: 'Funds transferred directly to your account.' },
  ];

  const benefits = [
    'Trusted financial ecosystem',
    'Secure transactions',
    'Affordable interest rates',
    'Transparent policies',
    'Community-focused services',
  ];

  return (
    <div className="w-full bg-white overflow-hidden font-inter">
      {/* A. TOP HERO / BANNER SECTION */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/finance_division_banner_refine_1776164957953.png" 
            alt="Finance Banner" 
            className="w-full h-full object-cover"
          />
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">
            Financial Empowerment <br /> for a Secure Future
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
            Reliable, transparent, and growth-oriented financial solutions for individuals and communities.
          </p>
        </div>
      </section>

      {/* B. MAIN SERVICE INTRO */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-gold font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Division Overview</span>
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-8">Financial Services</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our Financial Division is dedicated to providing accessible and trustworthy co-operative banking solutions. 
            We believe in fostering economic stability by offering secure savings platforms and transparent credit 
            facilities. At Kalpavruksha, member-centricity is at our core, ensuring that every individual has the 
            tools they need to build wealth and achieve sustainable financial growth.
          </p>
        </div>
      </section>

      {/* C. HIGHLIGHT INFO BOXES */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex items-start gap-4 hover:shadow-xl hover:bg-white transition-all duration-500">
                <div className="p-3 bg-gold/10 rounded-xl text-gold shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-forest mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. DETAILED SERVICE SECTIONS */}
      
      {/* 1. SAVINGS & RD */}
      <section id="savings" className="py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-gold font-black tracking-[0.2em] uppercase text-[10px] mb-4 block">Traditional Trust</span>
              <h2 className="text-3xl font-bold text-forest mb-6">Savings & Recurring Deposits (RD)</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Secure your hard-earned money with our flexible savings plans. Whether you're looking for daily accessibility or 
                disciplined monthly savings via RD, we provide consistent returns and complete transparency.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Safe investment', 'Flexible deposits', 'High returns'].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-video bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 overflow-hidden">
                <img src="/img/gra1.png" alt="Savings" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GOLD LOANS */}
      <section id="gold-loans" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="aspect-video bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 overflow-hidden">
                <img src="/assets/gold_loan_concept_gallery_1776165202207.png" alt="Gold Loan" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
            <div>
              <span className="text-gold font-black tracking-[0.2em] uppercase text-[10px] mb-4 block">Instant Liquidity</span>
              <h2 className="text-3xl font-bold text-forest mb-6">Gold Loans</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Unlock the value of your assets with our instant gold loans. Designed for quick access to credit with minimal 
                paperwork and the absolute highest safety standards for your valuables.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Quick approval', 'Low interest', 'Secure handling'].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MORTGAGE */}
      <section id="mortgage" className="py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-gold font-black tracking-[0.2em] uppercase text-[10px] mb-4 block">Asset Based Growth</span>
              <h2 className="text-3xl font-bold text-forest mb-6">Mortgage Loans</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Empower your business or personal growth using your property as an anchor. Our mortgage solutions offer 
                affordable interest rates and transparent, member-friendly repayment terms.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Property-backed funding', 'Easy repayment', 'Transparent process'].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-video bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 overflow-hidden">
                <img src="/img/gra2.png" alt="Mortgage" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FIXED DEPOSITS */}
      <section id="fixed-deposits" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="aspect-video bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 overflow-hidden">
                <img src="/assets/banking_interior_gallery_1776165084988.png" alt="Fixed Deposit" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
            <div>
              <span className="text-gold font-black tracking-[0.2em] uppercase text-[10px] mb-4 block">Secure Returns</span>
              <h2 className="text-3xl font-bold text-forest mb-6">Fixed Deposits</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                For those looking for stability and guaranteed long-term growth. Our Fixed Deposit schemes provide some of the 
                most competitive interest rates in the cooperative sector, ensuring your capital grows steadily.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Assured returns', 'Low risk', 'Stable growth'].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* F. PROCESS SECTION */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-gold font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Engagement Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4">Our Process</h2>
            <div className="w-20 h-1 bg-gold mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            {/* Horizontal Connection Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gold/20 z-0"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-4 relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="relative mb-8">
                    {/* Step Number Circle */}
                    <div className="w-24 h-24 bg-white text-forest border-2 border-gold/20 shadow-xl rounded-full flex items-center justify-center font-black text-2xl transition-all duration-500 group-hover:bg-forest group-hover:text-gold group-hover:border-forest group-hover:-translate-y-2 ring-8 ring-transparent group-hover:ring-forest/5">
                      {idx + 1}
                    </div>
                    {/* Background indicator for number */}
                    <div className="absolute -inset-2 bg-gold/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  
                  <div className="px-4">
                    <h4 className="font-bold text-forest text-lg mb-3 tracking-tight group-hover:text-gold transition-colors">{step.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>

                  {/* Mobile/Tablet Arrow icon (except last) */}
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden mt-8 text-gold animate-bounce">
                      <ArrowRight className="w-6 h-6 rotate-90 sm:rotate-0" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* H. FINAL CTA SECTION */}
      <section className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-br from-[#c9a84c] via-[#0B3D2E] to-[#0a1a0a] rounded-[40px] p-12 md:p-20 shadow-2xl relative overflow-hidden group">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/10 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full -ml-20 -mb-20 blur-3xl group-hover:bg-gold/20 transition-colors"></div>

            <div className="max-w-3xl mx-auto text-center relative z-10">
              <span className="text-gold font-black tracking-[0.4em] uppercase text-[10px] mb-6 block drop-shadow-sm">Join the Community</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tighter">
                Start Your Financial <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white/80">Journey Today</span>
              </h2>
              <p className="text-white/60 text-lg mb-12 font-medium max-w-xl mx-auto">
                Secure your future with Kalpavruksha's trusted cooperative banking. Transparent, fast, and community-focused.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <Link to="/contact" className="bg-gold text-forest font-black px-12 py-4 rounded-full hover:bg-white hover:scale-105 transition-all shadow-xl text-xs uppercase tracking-widest min-w-[200px] text-center">
                  Apply Now
                </Link>
                <Link to="/contact" className="bg-transparent border-2 border-white/20 text-white font-black px-12 py-4 rounded-full hover:bg-white hover:text-forest hover:border-white hover:scale-105 transition-all text-xs uppercase tracking-widest min-w-[200px] text-center">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DivFin;


