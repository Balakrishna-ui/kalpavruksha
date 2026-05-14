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
} from 'lucide-react';

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

  const colors = {
    deepBlue: '#001a3d', 
    gold: '#c5a059',
    offWhite: '#fdfdfd',
  };

  const services = [
    { icon: <Megaphone size={28} />, title: 'Business Promotion', desc: 'We promote member businesses within our ecosystem, increasing visibility and connecting them with the right customers.' },
    { icon: <PenTool size={28} />, title: 'Content Creation & Branding', desc: 'We design high-quality content that reflects your brand identity with consistent visuals, tone, and messaging.' },
    { icon: <MessageSquare size={28} />, title: 'Social Media Management', desc: 'End-to-end management including content planning, posting, and audience engagement to keep your business active and relevant.' },
    { icon: <Target size={28} />, title: 'Paid Advertising', desc: 'Targeted ad campaigns on platforms like Facebook & Instagram to generate leads and drive real business results.' },
    { icon: <Handshake size={28} />, title: 'Influencer & Collaboration Support', desc: 'We connect businesses with local influencers and create collaboration opportunities to expand reach and build credibility.' },
    { icon: <PlayCircle size={28} />, title: 'Short Video & Reels Strategy', desc: 'We help businesses leverage short-form videos to capture attention, increase engagement, and grow faster.' },
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
      <section className="relative h-[480px] md:h-[550px] flex items-start pt-20 md:items-center justify-center md:justify-start overflow-hidden bg-[#001a3d]">
        <div className="absolute inset-0 flex justify-end">
          <div 
            className="w-full md:w-3/4 h-full bg-cover parallax-bg opacity-40 md:opacity-100 transition-transform duration-[10s] hover:scale-105"
            style={{ 
              backgroundImage: 'url("/img/consultancy_hero.png")',
              maskImage: 'linear-gradient(to right, transparent, black 40%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)'
            }}
          />
        </div>



        <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full flex flex-col items-center md:items-start">
          <div className="flex items-center gap-4 mb-6 reveal-on-scroll">
            <div className="w-12 h-[1px] bg-gold" />
            <div className="flex gap-1">
               <div className="w-1 h-1 rounded-full bg-gold" />
               <Leaf className="w-4 h-4 text-gold" />
               <div className="w-1 h-1 rounded-full bg-gold" />
            </div>
            <div className="w-12 h-[1px] bg-gold" />
          </div>

          <h1 className="text-5xl md:text-[4.5rem] font-bold text-white leading-tight mb-6 tracking-tight text-center md:text-left reveal-on-scroll">
            Build. Grow. <br />
            <span className="text-gold">Succeed.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-xl font-medium leading-relaxed drop-shadow-md text-center md:text-left mb-10 reveal-on-scroll delay-200">
            Strategic solutions and expert guidance to help your business grow within our cooperative ecosystem.
          </p>

          <div className="flex flex-row gap-2 md:gap-4 reveal-on-scroll delay-400 w-full justify-center md:justify-start">
             <button 
               onClick={() => navigate('/service-enquiry?type=business-consultancy')}
               className="bg-gold text-[#001a3d] px-4 md:px-10 py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest flex items-center gap-2 md:gap-3 hover:bg-white hover:scale-[1.03] hover:text-gold transition-all duration-300 shadow-2xl shadow-gold/20 group whitespace-nowrap"
             >
               Consultation <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
             </button>
             <Link to="/membership" className="bg-transparent border-2 border-gold text-gold px-6 md:px-10 py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest hover:bg-gold/10 hover:scale-[1.03] transition-all duration-300 flex items-center justify-center whitespace-nowrap">
               Join Us
             </Link>
          </div>
        </div>

        <div 
          className="absolute bottom-0 left-0 right-0 h-16 bg-[#fdfdfd]"
          style={{ clipPath: 'ellipse(70% 100% at 50% 100%)', borderTop: '3px solid #c5a059' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold opacity-50 blur-[2px]" />
      </section>

      {/* ── SECTION 2: INTRO & PHILOSOPHY (Overlapping) ────────────── */}
      <section className="relative z-30 -mt-10 md:-mt-16 px-6 pt-10 md:pt-[10px]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-10">
          <div className="bg-white rounded-2xl md:rounded-[3rem] p-5 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center reveal-on-scroll">
            <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gold/10 flex items-center justify-center mb-4 md:mb-6 hover:scale-110 transition-transform duration-300">
              <Users className="w-5 h-5 md:w-8 md:h-8 text-gold" />
            </div>
            <h2 className="text-base md:text-2xl font-bold text-[#0B1F4D] mb-2 md:mb-4 tracking-tight reveal-fade delay-100">Introduction</h2>
            <p className="text-gray-500 text-[10px] md:text-sm font-medium leading-relaxed reveal-fade delay-200">
              Helping businesses scale through member collaborations and strategic promotion within our trusted network.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl md:rounded-[3rem] p-5 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center reveal-slide-right delay-200">
            <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gold/10 flex items-center justify-center mb-4 md:mb-6 hover:scale-110 transition-transform duration-300">
              <Leaf className="w-5 h-5 md:w-8 md:h-8 text-gold" />
            </div>
            <h2 className="text-base md:text-2xl font-bold text-[#0B1F4D] mb-2 md:mb-4 tracking-tight reveal-fade delay-300">Our Philosophy</h2>
            <p className="text-gray-500 text-[10px] md:text-sm font-medium leading-relaxed reveal-fade delay-400">
              We believe in sustainable growth that empowers both individual businesses and the community as a whole.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: OUR SERVICES ────────────────────────────────── */}
      <section className="pt-8 md:pt-[10px] pb-8 md:pb-12 max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 reveal-on-scroll">
          <span className="text-gold font-black tracking-[0.5em] uppercase text-[11px] block mb-4">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F4D] leading-tight tracking-tight">
            Strategic <span className="text-gold">Solutions</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-12 h-[1px] bg-gold" />
            <div className="flex gap-1">
               <div className="w-1 h-1 rounded-full bg-gold" />
               <Leaf className="w-4 h-4 text-gold" />
               <div className="w-1 h-1 rounded-full bg-gold" />
            </div>
            <div className="w-12 h-[1px] bg-gold" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {services.map((s, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: `${idx * 100}ms` }}
              className="group reveal-on-scroll bg-white rounded-2xl md:rounded-[3rem] p-4 md:p-10 border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-[2rem] bg-gold flex items-center justify-center mb-4 md:mb-8 shadow-lg shadow-gold/20 group-hover:scale-110 transition-transform duration-300">
                <div className="text-[#001a3d] group-hover:text-white transition-colors duration-300 scale-75 md:scale-100">{s.icon}</div>
              </div>
              <h3 className="text-xs md:text-xl font-bold text-[#0B1F4D] mb-2 md:mb-4 tracking-tight group-hover:text-gold transition-colors duration-300 line-clamp-1">{s.title}</h3>
              <p className="text-gray-500 text-[9px] md:text-[13px] font-medium leading-relaxed line-clamp-3 md:line-clamp-none">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: OUR APPROACH ────────────────────────────────── */}
      <section className="pt-8 md:pt-[10px] pb-8 md:pb-12 bg-[#001a3d] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold rounded-full blur-[100px]" />
           <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold rounded-full blur-[100px]" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20 reveal-on-scroll">
            <span className="text-gold font-black tracking-[0.5em] uppercase text-[11px] block mb-4">Our Approach</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              The <span className="text-gold">Process</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {steps.map((step, idx) => (
              <div key={idx} style={{ transitionDelay: `${idx * 150}ms` }} className="relative group flex flex-col items-center text-center reveal-on-scroll">
                <div className="relative mb-6 md:mb-10 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-gold/30 flex items-center justify-center bg-white/5 shadow-2xl group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                    <div className="text-gold group-hover:text-[#001a3d] transition-colors scale-75 md:scale-100">{step.icon}</div>
                  </div>
                  <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-10 md:h-10 bg-gold text-[#001a3d] text-[10px] md:text-xs font-black rounded-full flex items-center justify-center shadow-xl border-2 md:border-4 border-[#001a3d] reveal-fade delay-300 group-hover:scale-110 transition-transform">
                    {step.num}
                  </span>
                </div>
                <h4 className="text-sm md:text-xl font-bold text-white mb-2 md:mb-4 tracking-tight">{step.label}</h4>
                <p className="text-white/40 text-[10px] md:text-[13px] font-medium leading-relaxed max-w-[140px] md:max-w-none">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: OUR IMPACT ─────────────────────────────────── */}
      <section className="pt-8 md:pt-[10px] pb-8 md:pb-12 max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-10 md:mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0B1F4D] leading-tight tracking-tight">
            Our <span className="text-gold">Impact</span>
          </h2>
          <div className="w-12 md:w-16 h-1 bg-gold mx-auto mt-4 md:mt-6 rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} style={{ transitionDelay: `${idx * 100}ms` }} className="reveal-on-scroll bg-white rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.05)] text-center hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gold/5 text-gold flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <div className="scale-75 md:scale-100">{stat.icon}</div>
              </div>
              <div className="text-2xl md:text-4xl font-bold text-[#0B1F4D] mb-1 md:mb-2">
                <AnimatedCounter value={stat.val} />
              </div>
              <div className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight reveal-fade delay-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 6: WHY CHOOSE US ──────────────────────────────── */}
      <section className="pt-8 md:pt-[10px] pb-12 md:pb-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F4D] tracking-tight leading-tight mb-8 md:mb-16 reveal-on-scroll">
              Why Choose <span className="text-gold">Kalpavruksha?</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full">
              {[
                { icon: Trophy, title: 'Experienced Team', desc: 'Experts with proven experience in digital growth and strategy.' },
                { icon: Users, title: 'Client-Centric', desc: 'Your goals are our priority. We grow when you grow.' },
                { icon: CheckCircle2, title: 'Proven Results', desc: 'Delivering measurable impact and long-term business growth.' },
              ].map((item, idx) => (
                <div key={idx} style={{ transitionDelay: `${idx * 150}ms` }} className="flex flex-col items-center group reveal-on-scroll hover:-translate-y-3 transition-transform duration-300">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] bg-gold/5 text-gold flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gold group-hover:text-[#001a3d] group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <item.icon className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <h4 className="text-base md:text-xl font-bold text-[#0B1F4D] mb-2 md:mb-4 tracking-tight">{item.title}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed text-xs md:text-sm max-w-[280px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BusinessConsultancy;

