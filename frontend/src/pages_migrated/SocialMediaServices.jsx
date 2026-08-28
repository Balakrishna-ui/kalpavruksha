import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Target, 
  TrendingUp, 
  Award,
  PenTool,
  PlayCircle,
  Users,
  Megaphone,
  Briefcase,
  CheckSquare,
  Clock,
  Shield,
  BarChart2,
  FileText,
  Rocket,
  Search
} from 'lucide-react';

const SocialMediaServices = () => {
  const navigate = useNavigate();

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
      icon: <Briefcase size={24} />,
      title: 'Account Setup',
      desc: 'Professional setup and optimization of your social media profiles across all major platforms to establish a strong presence.',
    },
    {
      icon: <PenTool size={24} />,
      title: 'Content Creation',
      desc: 'Engaging, creative, and platform-specific content designed to captivate your audience and strengthen your brand.',
    },
    {
      icon: <Target size={24} />,
      title: 'Paid Ads',
      desc: 'Data-driven ad campaigns that deliver maximum ROI through precise targeting and strategic optimization.',
    },
    {
      icon: <Users size={24} />,
      title: 'Lead Generation',
      desc: 'Generate quality leads and prospects through targeted social campaigns and high-converting content strategies.',
    },
    {
      icon: <Award size={24} />,
      title: 'Branding & Awareness',
      desc: 'Build brand identity, increase visibility, and create lasting impressions in your target market.',
    },
    {
      icon: <PlayCircle size={24} />,
      title: 'Video Strategy',
      desc: 'Leverage the power of video content to engage your audience and communicate your brand message effectively.',
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
      `}</style>

      {/* ── SECTION 1: HERO BANNER ────────────────────────────────── */}
      <section className="relative h-[500px] md:h-[600px] flex items-center overflow-hidden bg-white">
        
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <img src="/img/social_media_hero.png" alt="Social Media Solutions" className="w-full h-full object-cover object-right md:object-center" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
          {/* Fade to white on the left edge */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent w-full md:w-[65%]" />
        </div>
        
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full h-full flex flex-col items-start justify-center pt-24 md:pt-32">
          
          <div className="max-w-2xl text-left">
            <h1 className="text-4xl md:text-[56px] font-extrabold leading-[1.05] tracking-tight mb-4 text-[#001a3d] reveal-on-scroll">
              Social Media
              <br/>
              <span className="text-gold">Services</span>
            </h1>

            <h2 className="text-xl md:text-[22px] font-bold text-[#d4a82b] mb-4 tracking-wide reveal-on-scroll delay-100">
              From Strategy to Impact. From Impressions to Engagement.
            </h2>

            <p className="text-[#333333] font-bold text-[14px] md:text-[15px] mb-8 max-w-[550px] leading-relaxed reveal-on-scroll delay-200">
              One trusted agency where businesses, entrepreneurs, and professionals can connect with thousands of potential customers through data-driven digital campaigns.
            </p>

            <div className="flex flex-wrap gap-3 reveal-on-scroll delay-400">
               <button 
                 onClick={() => navigate('/service-enquiry?type=social-media')}
                 className="bg-gold text-white px-5 py-2.5 rounded-[6px] font-bold text-[13px] flex items-center gap-2 hover:bg-[#c29824] transition-colors shadow-md"
               >
                 <Rocket className="w-4 h-4" strokeWidth={2} /> Get Started
               </button>
               <button className="bg-[#001a3d] text-white px-5 py-2.5 rounded-[6px] font-bold text-[13px] flex items-center gap-2 hover:bg-[#00102a] transition-colors shadow-md">
                 <Search className="w-4 h-4" strokeWidth={2} /> Our Packages
               </button>
               <button 
                 onClick={() => navigate('/service-enquiry?type=social-media')}
                 className="bg-[#d4a82b] text-white px-5 py-2.5 rounded-[6px] font-bold text-[13px] flex items-center gap-2 hover:bg-[#b58b1f] transition-colors shadow-md"
               >
                 <PenTool className="w-4 h-4" strokeWidth={2} /> Book Consultation
               </button>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-[1400px] bg-[#0b1f4d] rounded-2xl py-6 px-4 md:px-10 flex flex-wrap justify-between items-center gap-6 shadow-xl z-20 reveal-on-scroll">
          <div className="flex items-center gap-4 text-white">
            <Users className="w-8 h-8 text-white/80" strokeWidth={1.5} />
            <div>
              <div className="font-extrabold text-lg leading-tight">200+</div>
              <div className="text-[10px] text-white/60 font-semibold uppercase tracking-wider mt-0.5">Campaigns Delivered</div>
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-white/10"></div>
          <div className="flex items-center gap-4 text-white">
            <CheckSquare className="w-8 h-8 text-white/80" strokeWidth={1.5} />
            <div>
              <div className="font-extrabold text-lg leading-tight">150+</div>
              <div className="text-[10px] text-white/60 font-semibold uppercase tracking-wider mt-0.5">Happy Clients</div>
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-white/10"></div>
          <div className="flex items-center gap-4 text-white">
            <Shield className="w-8 h-8 text-white/80" strokeWidth={1.5} />
            <div>
              <div className="font-extrabold text-lg leading-tight">1M+</div>
              <div className="text-[10px] text-white/60 font-semibold uppercase tracking-wider mt-0.5">People Reached</div>
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-white/10"></div>
          <div className="flex items-center gap-4 text-white">
            <TrendingUp className="w-8 h-8 text-white/80" strokeWidth={1.5} />
            <div>
              <div className="font-extrabold text-lg leading-tight">98%</div>
              <div className="text-[10px] text-white/60 font-semibold uppercase tracking-wider mt-0.5">Client Satisfaction</div>
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-white/10"></div>
          <div className="flex items-center gap-4 text-white">
            <Clock className="w-8 h-8 text-white/80" strokeWidth={1.5} />
            <div>
              <div className="font-extrabold text-lg leading-tight">24/7</div>
              <div className="text-[10px] text-white/60 font-semibold uppercase tracking-wider mt-0.5">Support &amp; Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: INTRODUCTION ────────────────────────────────── */}
      <section className="py-8 bg-[#fafafa]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-6">
          <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center reveal-on-scroll">
            <div className="lg:w-1/3 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#001a3d] shrink-0 flex items-center justify-center shadow-sm">
                <BarChart2 className="w-8 h-8 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#001a3d] leading-tight mb-1">
                  Expand Your <br/><span className="text-gold">Reach</span>
                </h3>
              </div>
            </div>
            <div className="lg:w-1/3 border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-8">
              <p className="text-gray-500 text-[12px] md:text-[13px] font-medium leading-relaxed">
                In today's digital-first world, your brand needs a powerful social media presence to stand out. We create data-driven strategies that build engagement, increase visibility, and drive real results across all major social platforms.
              </p>
            </div>
            <div className="lg:w-1/3 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-8 w-full">
              <div className="flex items-center gap-3">
                <Target className="w-4 h-4 text-gold shrink-0" strokeWidth={2} />
                <span className="font-bold text-[12px] lg:text-[13px] text-[#001a3d]">Targeted Audience Reach</span>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-gold shrink-0" strokeWidth={2} />
                <span className="font-bold text-[12px] lg:text-[13px] text-[#001a3d]">Brand Awareness Growth</span>
              </div>
              <div className="flex items-center gap-3">
                <BarChart2 className="w-4 h-4 text-gold shrink-0" strokeWidth={2} />
                <span className="font-bold text-[12px] lg:text-[13px] text-[#001a3d]">Measurable Results</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 text-gold shrink-0" strokeWidth={2} />
                <span className="font-bold text-[12px] lg:text-[13px] text-[#001a3d]">High Engagement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: OUR SERVICES ────────────────────────────────── */}
      <section className="py-8 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-6">
          <div className="text-center md:text-left mb-6 reveal-on-scroll">
            <h3 className="text-xl font-extrabold text-[#001a3d]">
              Digital <span className="text-gold">Solutions</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <div
                key={idx}
                style={{ transitionDelay: `${idx * 100}ms` }}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 reveal-on-scroll flex flex-col items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-gray-100 flex items-center justify-center text-[#001a3d] group-hover:bg-gold transition-colors duration-300 shrink-0">
                  {s.icon}
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-[#001a3d] mb-2">{s.title}</h4>
                  <p className="text-[12px] text-gray-500 font-medium leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHY CHOOSE US ──────────────────────────────── */}
      <section className="py-8 bg-[#fafafa]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-6">
          <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100 flex flex-col reveal-on-scroll">
            <h3 className="text-xl font-extrabold text-[#001a3d] mb-6">Why Choose Us</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#001a3d]" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="font-bold text-[12px] leading-snug text-[#001a3d] block mb-1">Expert Team</span>
                  <p className="text-[11px] text-gray-500">Skilled professionals</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-[#001a3d]" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="font-bold text-[12px] leading-snug text-[#001a3d] block mb-1">Customized Strategies</span>
                  <p className="text-[11px] text-gray-500">Tailored solutions</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#001a3d]" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="font-bold text-[12px] leading-snug text-[#001a3d] block mb-1">Transparent Reporting</span>
                  <p className="text-[11px] text-gray-500">Clear insights</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#001a3d]" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="font-bold text-[12px] leading-snug text-[#001a3d] block mb-1">Results Driven</span>
                  <p className="text-[11px] text-gray-500">Measurable outcomes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: HOW WE WORK ────────────────────────────────── */}
      <section className="py-8 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8 reveal-on-scroll">
            <h3 className="text-xl font-extrabold text-[#001a3d] mb-8">Our Process</h3>
            
            <div className="relative flex justify-between px-2 pt-2 pb-6 overflow-x-auto min-w-[700px] scrollbar-hide">
              {/* Horizontal Line */}
              <div className="absolute top-[20px] left-6 right-6 h-[2px] bg-blue-50 -z-0"></div>
              
              <div className="relative z-10 flex flex-col items-center gap-3 group w-20">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-blue-300 transition-colors">
                  <Users className="w-5 h-5 text-blue-700" strokeWidth={1.5} />
                </div>
                <span className="font-bold text-[10px] text-[#001a3d] text-center leading-tight whitespace-pre-line">Consultation</span>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-3 group w-20">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-blue-300 transition-colors">
                  <Search className="w-5 h-5 text-blue-700" strokeWidth={1.5} />
                </div>
                <span className="font-bold text-[10px] text-[#001a3d] text-center leading-tight whitespace-pre-line">Strategy</span>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-3 group w-20">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-blue-300 transition-colors">
                  <PenTool className="w-5 h-5 text-blue-700" strokeWidth={1.5} />
                </div>
                <span className="font-bold text-[10px] text-[#001a3d] text-center leading-tight whitespace-pre-line">Content<br/>Creation</span>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-3 group w-20">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-blue-300 transition-colors">
                  <Rocket className="w-5 h-5 text-blue-700" strokeWidth={1.5} />
                </div>
                <span className="font-bold text-[10px] text-[#001a3d] text-center leading-tight whitespace-pre-line">Implementation</span>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-3 group w-20">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-blue-300 transition-colors">
                  <BarChart2 className="w-5 h-5 text-blue-700" strokeWidth={1.5} />
                </div>
                <span className="font-bold text-[10px] text-[#001a3d] text-center leading-tight whitespace-pre-line">Monitoring</span>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-3 group w-20">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-blue-300 transition-colors">
                  <FileText className="w-5 h-5 text-blue-700" strokeWidth={1.5} />
                </div>
                <span className="font-bold text-[10px] text-[#001a3d] text-center leading-tight whitespace-pre-line">Reporting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: CALL TO ACTION ──────────────────────────────── */}
      <section className="py-8 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-6">
          <div className="bg-[#001a3d] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 reveal-scale shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-gold/10 shrink-0">
                <Megaphone className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white mb-1">
                  Ready to Grow Your Business?
                </h3>
                <p className="text-white/70 text-[12px] font-medium">
                  Let's create a social media strategy that drives real results for your brand.
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/service-enquiry?type=social-media')}
              className="shrink-0 bg-gold text-[#001a3d] px-5 py-2.5 rounded-[6px] font-bold text-[13px] hover:bg-white transition-colors duration-300 flex items-center gap-2 shadow-md border border-gold"
            >
              Get Free Consultation <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SocialMediaServices;
