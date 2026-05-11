import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Share2, 
  Image, 
  Target, 
  TrendingUp, 
  Award,
  Leaf,
  Users,
  Megaphone,
  PenTool,
  MessageSquare,
  PlayCircle,
  Handshake,
  Globe
} from 'lucide-react';

const SocialMediaServices = () => {
  const navigate = useNavigate();

  // Custom hook for lightweight intersection observer animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-on-scroll, .reveal-fade, .reveal-scale').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <Globe size={28} />,
      title: 'Account Setup',
      desc: 'Professional setup and optimization of your business profiles across all major platforms to ensure a consistent brand image.',
    },
    {
      icon: <PenTool size={28} />,
      title: 'Content Creation',
      desc: 'Tailored content including graphic design, photography, and professional copywriting that drives real engagement.',
    },
    {
      icon: <Target size={28} />,
      title: 'Paid Ads',
      desc: 'Maximize reach with targeted advertising campaigns on Facebook and Instagram, managed for optimal ROI.',
    },
    {
      icon: <TrendingUp size={28} />,
      title: 'Lead Generation',
      desc: 'Strategic lead capture campaigns designed to turn your social media followers into high-quality business inquiries.',
    },
    {
      icon: <Award size={28} />,
      title: 'Branding & Awareness',
      desc: 'Build long-term brand equity and establish your business as a trusted authority in your specific industry.',
    },
    {
      icon: <PlayCircle size={28} />,
      title: 'Video Strategy',
      desc: 'Leverage the power of Reels and short-form video content to capture attention and grow your audience faster.',
    },
  ];

  return (
    <div className="w-full bg-[#fdfdfd] overflow-hidden font-inter selection:bg-gold/30 selection:text-forest">

      {/* Global Animation Styles */}
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(20px);
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
        .reveal-scale {
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-scale.animate-reveal {
          opacity: 1;
          transform: scale(1);
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
      <section className="relative h-[550px] flex items-center pt-[10px] overflow-hidden bg-[#001a3d]">
        {/* Background Image on Right */}
        <div className="absolute inset-0 flex justify-end">
          <div 
            className="w-full md:w-3/4 h-full bg-cover parallax-bg opacity-40 md:opacity-100 transition-transform duration-[10s] hover:scale-105"
            style={{ 
              backgroundImage: 'url("/img/social_media_hero.png")',
              maskImage: 'linear-gradient(to right, transparent, black 40%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)'
            }}
          />
        </div>

        {/* Decorative Leaf Patterns */}


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
            Social Media <br />
            <span className="text-gold">Impact.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-xl font-medium leading-relaxed drop-shadow-md text-center md:text-left mb-10 reveal-on-scroll delay-200">
            Elevate your digital presence and reach your target audience through our strategic community-driven marketing.
          </p>

          <div className="flex flex-wrap gap-4 reveal-on-scroll delay-400">
             <button 
               onClick={() => navigate('/service-enquiry?type=social-media')}
               className="bg-gold text-[#001a3d] px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-white hover:text-gold hover:scale-[1.03] transition-all duration-300 shadow-2xl shadow-gold/20 group"
             >
               Get Started Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
             <Link to="/membership" className="bg-transparent border-2 border-gold text-gold px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gold/10 hover:scale-[1.03] transition-all duration-300">
               Our Network
             </Link>
          </div>
        </div>

        {/* Bottom Curve and Gold Border */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-16 bg-[#fdfdfd]"
          style={{ 
            clipPath: 'ellipse(70% 100% at 50% 100%)',
            borderTop: '3px solid #c5a059'
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold opacity-50 blur-[2px]" />
      </section>

      {/* ── SECTION 2: INTRODUCTION ────────────────────────────────── */}
      <section className="pt-[10px] pb-24 max-w-[1200px] mx-auto px-6">
        <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col lg:flex-row gap-16 items-center reveal-on-scroll">
          <div className="lg:w-1/3 text-center lg:text-left">
            <span className="text-gold font-black tracking-[0.5em] uppercase text-[11px] block mb-4 reveal-fade delay-100">Digital Growth</span>
            <h2 className="text-4xl font-bold text-[#0B1F4D] leading-tight tracking-tight reveal-on-scroll delay-200">
              Expand Your <span className="text-gold">Reach</span>
            </h2>
          </div>
          <div className="lg:w-2/3">
            <p className="text-gray-500 text-[17px] font-medium leading-relaxed reveal-fade delay-300">
              In today's digital-first world, your social media presence is often the first point of contact for potential customers. Our division helps businesses establish a professional, and engaging online presence through strategic setup, content creation, and high-impact paid campaigns.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: OUR SERVICES ────────────────────────────────── */}
      <section className="pt-[10px] pb-24 max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 reveal-on-scroll">
          <span className="text-gold font-black tracking-[0.5em] uppercase text-[11px] block mb-4">Expert Services</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F4D] leading-tight tracking-tight">
            Digital <span className="text-gold">Solutions</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: `${idx * 150}ms` }}
              className="group reveal-on-scroll bg-white rounded-[3rem] p-10 border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-[2rem] bg-gold flex items-center justify-center mb-8 shadow-lg shadow-gold/20 group-hover:scale-110 transition-transform duration-300">
                <div className="text-[#001a3d] group-hover:text-white transition-colors duration-300">{s.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F4D] mb-4 tracking-tight group-hover:text-gold transition-colors duration-300">{s.title}</h3>
              <p className="text-gray-500 text-[13px] font-medium leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: CALL TO ACTION ──────────────────────────────── */}
      <section className="w-full bg-gradient-to-br from-[#0B3D2E] to-[#001a3d] min-h-[200px] relative overflow-hidden flex items-center justify-center border-t border-white/10 reveal-scale mt-10">
        <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 opacity-10 pointer-events-none transition-transform duration-[15s] hover:scale-110">
            <Leaf className="w-96 h-96 text-white rotate-[-30deg]" />
        </div>
        <div className="absolute left-[-50px] bottom-[-50px] opacity-10 pointer-events-none transition-transform duration-[15s] hover:scale-110">
            <Leaf className="w-64 h-64 text-white rotate-[15deg]" />
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-6 py-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center gap-6">
             <div className="w-16 h-16 rounded-full border-2 border-gold/50 flex items-center justify-center bg-gold/10 shadow-[0_0_50px_-10px_rgba(197,160,89,0.3)] shrink-0 animate-pulse-slow">
               <Handshake className="w-8 h-8 text-gold" />
             </div>
             <div>
               <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight reveal-on-scroll delay-100">
                 Scale Your Business with <span className="text-gold">Strategic Social Media</span>
               </h2>
               <p className="text-white/50 text-sm font-medium mt-2 leading-relaxed reveal-fade delay-200">
                 Join our community of businesses and start reaching thousands of potential customers today.
               </p>
             </div>
          </div>

          <div className="shrink-0 reveal-on-scroll delay-300">
            <button
              onClick={() => navigate('/service-enquiry?type=social-media')}
              className="bg-gold text-[#001a3d] px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gradient-to-r hover:from-white hover:to-gold hover:scale-[1.03] transition-all duration-300 shadow-[0_20px_50px_-10px_rgba(197,160,89,0.4)] flex items-center gap-3 group"
            >
              Get Free Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SocialMediaServices;
