import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf, UtensilsCrossed, Sparkles, HeartPulse,
  Search, TrendingUp, Award, Shield, Users,
  Briefcase, CheckCircle, Zap, ArrowRight,
  Wallet, PiggyBank, Landmark, BarChart3,
  ChevronLeft, ChevronRight, Sprout, IndianRupee, 
  Settings, GraduationCap, Link2
} from 'lucide-react';

import Button from '../components/ui/Button';
import { Section, Heading } from '../components/ui/Section';
import Card from '../components/ui/Card';
import { HERO_SLIDES, CORE_VALUES, FEATURED_PRODUCTS } from '../constants/homeData';

const IMPORTED_PRODUCTS = [
  { name: 'ECOLIMITS Bio-degradable Cover', image: '/img/p1.png', link: '/products?category=ecolimits' },
  { name: 'Opalls Traditional Kulfies', image: '/img/p2.jpg', link: '/products?category=kulfis' },
  { name: 'Organic Honey', image: '/img/h1.png', link: '/products?category=honey' },
  { name: 'Rice Bags', image: '/img/r1.png', link: '/products?category=rice' },
  { name: 'Sapotas', image: '/img/s1.png', link: '/products?category=fruits', comingSoon: true },
  { name: 'Bananas', image: '/img/b1.png', link: '/products?category=fruits', comingSoon: true },
  { name: 'Vegetables', image: '/img/v1.png', link: '/products?category=vegetables' },
  { name: 'Fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800', link: '/products?category=fruits' },
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [partnerIndex, setPartnerIndex] = useState(0);
  const partnerRef = React.useRef(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => prev + 1);
  }, []);

  // Auto-advance every 6 seconds for fluid timing
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const scrollPartners = (idx) => {
    setPartnerIndex(idx);
    if (partnerRef.current) {
      const scrollWidth = partnerRef.current.scrollWidth - partnerRef.current.offsetWidth;
      partnerRef.current.scrollTo({
        left: (scrollWidth / 2) * idx,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      setPartnerIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(autoScroll);
  }, []);

  useEffect(() => {
    scrollPartners(partnerIndex);
  }, [partnerIndex]);

  return (
    <div className="w-full font-inter">
      {/* Hero Carousel Section */}
      {/* Responsive Height */}
      <section className="relative h-[45vh] md:h-[600px] overflow-hidden bg-forest pt-0 md:pt-[112px]">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 blur-[120px] rounded-full pointer-events-none z-10"></div>

        {/* ── Sliding Track: infinite continuous right-to-left ── */}
        <div
          className="absolute inset-0 transition-transform duration-[800ms] ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {HERO_SLIDES.map((slide, idx) => {
            const virtualIndex = Math.round((current - idx) / HERO_SLIDES.length) * HERO_SLIDES.length + idx;

            return (
              <div
                key={idx}
                className="absolute w-full h-full bg-cover bg-[center_70%] md:bg-center"
                style={{
                  backgroundImage: `url('${slide.bg}')`,
                  left: `${virtualIndex * 100}%`
                }}
              >
                {/* Dynamic Overlay */}
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: slide.overlay }}
                ></div>

                {/* Slide Content */}
                <div className="absolute inset-0 z-20 flex items-end justify-center pb-6 md:pb-24">
                  <div className="text-center px-4 md:px-6 w-full max-w-5xl mx-auto flex flex-col items-center overflow-hidden">
                    <div className={`flex flex-row gap-3 justify-center w-full sm:w-auto transition-all duration-700 ease-out delay-200 ${virtualIndex === current ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                      <Button to={slide.ctaPrimary.to} variant="secondary">
                        {slide.ctaPrimary.text}
                      </Button>
                      <Button to={slide.ctaSecondary.to} variant="outline">
                        {slide.ctaSecondary.text}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-5">
          {HERO_SLIDES.map((_, idx) => {
            const activeIdx = ((current % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length;
            return (
              <button
                key={idx}
                onClick={() => {
                  setCurrent(prev => {
                    let target = Math.round((prev - idx) / HERO_SLIDES.length) * HERO_SLIDES.length + idx;
                    if (target <= prev && idx !== activeIdx) {
                      target += HERO_SLIDES.length;
                    }
                    return target;
                  });
                }}
                className={`transition-all duration-[1000ms] rounded-full ${activeIdx === idx ? 'w-12 h-2 bg-gold shadow-[0_0_15px_rgba(201,168,76,0.5)]' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>
      </section>

      {/* About Section - Senior Refactor */}
      <Section bg="pattern">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Side */}
          <div className="flex justify-center relative order-1 lg:order-2">
            <div className="absolute inset-0 bg-gold/5 blur-[120px] rounded-full" />
            <div className="relative p-4 md:p-12 bg-white rounded-[30px] md:rounded-[60px] shadow-2xl border border-gray-100 max-w-[220px] md:max-w-[380px] hover:rotate-2 transition-transform duration-1000 group">
              <img
                src="/img/logoo.PNG"
                alt="Kalpavruksha Logo"
                className="w-full h-auto object-contain group-hover:scale-110 transition-transform duration-1000"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="mb-8">
              <span className="text-[#C9A13B] font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">
                Legacy & Vision
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F4D] leading-tight tracking-tight mb-4">
                About <span className="text-[#C9A13B]">Kalpavruksha</span>
              </h2>
              <div className="w-16 h-1 bg-[#C9A13B] rounded-full"></div>
            </div>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 font-medium">
              Kalpavruksha Mutually Aided Cooperative Thrift and Credit Society Limited is a trusted financial institution dedicated to empowering individuals through responsible finance and sustainable development.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mb-12 max-w-2xl mx-auto lg:mx-0">
              {[
                'Empowering members through tailored support',
                'Ensuring security through rigorous checks',
                'Promoting inclusion across 8 divisions',
                'Building a sustainable heritage together'
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-4 group/item">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover/item:bg-forest group-hover/item:text-white transition-all duration-300">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-gray-600 font-bold text-sm leading-tight transition-colors group-hover/item:text-forest">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link 
                to="/about-kalpavruksha" 
                className="inline-flex items-center justify-center gap-3 bg-[#0B1F4D] text-white py-4 px-10 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-[#C9A13B] hover:scale-105 transition-all duration-300 shadow-xl group"
              >
                Read More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Our Divisions Section */}
      <section className="pt-8 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-[1px] bg-[#C9A13B]"></div>
              <span className="text-[#C9A13B] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs">Our Divisions</span>
              <div className="w-10 h-[1px] bg-[#C9A13B]"></div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-[#C9A13B]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0B1F4D] mb-4 tracking-tight">Building a Sustainable Future</h2>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed">
              Our four key divisions work together to create value, empower communities, and drive long-term sustainable growth.
            </p>
          </div>

          {/* Division Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-10">
            {[
              {
                title: 'Agriculture',
                desc: 'Promoting modern farming, organic practices, and sustainable agriculture for better yields and brighter futures.',
                img: '/img/agri_hero_new.png',
                icon: <Sprout className="w-7 h-7 text-[#C9A13B]" />,
                to: '/div-agri'
              },
              {
                title: 'Financial Services',
                desc: 'Empowering communities through secure savings, smart investments, and flexible financial solutions.',
                img: '/img/fin_hero_new.png',
                icon: <IndianRupee className="w-7 h-7 text-[#C9A13B]" />,
                to: '/divisions/financial'
              },
              {
                title: 'Manufacturing',
                desc: 'Delivering quality products through innovation, technology, and sustainable manufacturing.',
                img: '/img/mfg_hero_new.png',
                icon: <Settings className="w-7 h-7 text-[#C9A13B]" />,
                to: '/div-mfg'
              },
              {
                title: 'Education',
                desc: 'Nurturing knowledge, skills, and values to build a smarter and stronger tomorrow.',
                img: '/img/edu_hero_new.png',
                icon: <GraduationCap className="w-7 h-7 text-[#C9A13B]" />,
                to: '/div-edu'
              }
            ].map((division, idx) => (
              <Link
                key={idx}
                to={division.to}
                className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
              >
                {/* Image */}
                <div className="relative h-28 md:h-44 overflow-hidden">
                  <img 
                    src={division.img} 
                    alt={division.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content - Centered */}
                <div className="pt-4 pb-4 px-3 md:pt-8 md:pb-8 md:px-6 flex flex-col items-center text-center flex-grow">
                  <h4 className="font-bold text-[#0B1F4D] text-sm md:text-lg mb-2 md:mb-3 tracking-tight">{division.title}</h4>
                  <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed font-medium flex-grow mb-3 md:mb-4 line-clamp-2 md:line-clamp-none">{division.desc}</p>
                  <div className="mt-auto flex items-center gap-2 text-[#0B1F4D] font-bold text-[10px] md:text-sm hover:text-[#C9A13B] transition-colors group/link">
                    View More <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Links Bar - Refined */}
          <div className="bg-[#0B1F4D] rounded-[1.5rem] md:rounded-[2rem] px-4 md:px-10 py-4 md:py-6 flex flex-col md:flex-row items-center relative overflow-hidden">
            {/* Background Illustration Pattern (Subtle Overlay) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/img/leaf-pattern.png')] bg-repeat"></div>
            
            {/* Quick Links Label */}
            <div className="flex items-center gap-3 mb-4 md:mb-0 md:mr-8 shrink-0 relative z-10">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F3EAD3] rounded-full flex items-center justify-center shadow-inner">
                <Link2 className="w-5 h-5 md:w-6 md:h-6 text-[#0B1F4D]" />
              </div>
              <span className="text-white font-bold text-base md:text-lg tracking-tight">Quick Links</span>
            </div>

            {/* Main Divider */}
            <div className="hidden md:block w-[1px] h-10 bg-white/10 mx-6 relative z-10"></div>

            {/* Links with Individual Dividers */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-y-2 md:gap-0 flex-grow relative z-10 w-full md:w-auto">
              {[
                { label: 'Agriculture', icon: <Sprout className="w-3.5 h-3.5 md:w-4 md:h-4" />, to: '/div-agri' },
                { label: 'Financial Services', icon: <IndianRupee className="w-3.5 h-3.5 md:w-4 md:h-4" />, to: '/divisions/financial' },
                { label: 'Manufacturing', icon: <Settings className="w-3.5 h-3.5 md:w-4 md:h-4" />, to: '/div-mfg' },
                { label: 'Education', icon: <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4" />, to: '/div-edu' }
              ].map((link, idx, arr) => (
                <React.Fragment key={idx}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 md:gap-3 text-white/90 hover:text-[#C9A13B] px-2 md:px-6 py-2 transition-all duration-300 text-[11px] md:text-sm font-semibold group flex-grow md:flex-grow-0 justify-center"
                  >
                    <span className="text-[#C9A13B]">{link.icon}</span>
                    {link.label}
                    <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                  {idx < arr.length - 1 && (
                    <div className="hidden md:block w-[1px] h-6 bg-white/10"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Bottom Center Leaf Icon */}
          <div className="flex justify-center mt-8">
            <Leaf className="w-6 h-6 text-[#C9A13B]" fill="currentColor" />
          </div>
        </div>
      </section>

      {/* Best Imported Products Section */}
      <section className="pt-12 pb-12 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F4D] mb-2 tracking-tight">Our Organic Products</h2>
            <p className="text-[#C9A13B] font-bold text-xs md:text-sm uppercase tracking-[0.2em]">We deliver within one day</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {IMPORTED_PRODUCTS.map((item, idx) => (
              <Link 
                key={idx} 
                to={item.comingSoon ? '#' : item.link}
                className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group ${item.comingSoon ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className={`w-full h-full object-cover transition-transform duration-500 ${!item.comingSoon ? 'group-hover:scale-105' : 'grayscale opacity-60'}`} 
                  />
                  {item.comingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-[#222222] text-white px-4 py-2 rounded-lg font-bold text-sm md:text-base shadow-xl border border-white/10">
                        Coming Soon
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-6 flex-grow flex items-center justify-center text-center">
                  <h3 className={`font-bold text-sm md:text-[15px] leading-tight ${item.comingSoon ? 'text-gray-400' : 'text-[#1a3a5a]'}`}>
                    {item.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>




      {/* Our Financial Services Section - Updated from Financial Services Request */}
      <section className="pt-[15px] pb-12 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F4D] mb-4 tracking-tight">Our Financial Services</h2>
            <div className="w-16 h-1 bg-[#0B1F4D]/20 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: 'SRI NITHYA DAILY DEPOSIT',
                desc: 'Flexible daily savings plan designed for disciplined investments and secure future growth.',
                icon: <Wallet className="w-8 h-8 md:w-10 md:h-10" />,
                bg: 'bg-[#1a3a5a]',
                to: '/financial-services#sri-nithya-daily-deposit'
              },
              {
                title: 'SANGHAMITHRA SAVINGS PLAN',
                desc: 'Long-term savings solution with structured monthly investments and bonus benefits.',
                icon: <PiggyBank className="w-8 h-8 md:w-10 md:h-10" />,
                bg: 'bg-[#c6a75e]',
                to: '/financial-services#sanghamithra-savings-plan'
              },
              {
                title: 'KAMADHENU FIXED DEPOSIT',
                desc: 'Secure fixed deposit scheme offering stable returns with flexible investment tenure.',
                icon: <Landmark className="w-8 h-8 md:w-10 md:h-10" />,
                bg: 'bg-[#1a3a5a]',
                to: '/financial-services#kamadhenu-fixed-deposit'
              },
              {
                title: 'KAMADHENU TERM DEPOSIT',
                desc: 'High-return term deposit plan designed for long-term wealth creation and financial security.',
                icon: <BarChart3 className="w-8 h-8 md:w-10 md:h-10" />,
                bg: 'bg-[#c6a75e]',
                to: '/financial-services#kamadhenu-term-deposit'
              },
            ].map((service, idx) => (
              <Link
                key={idx}
                to={service.to}
                className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer block"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 ${service.bg} rounded-[1.5rem] flex items-center justify-center text-white mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  {service.icon}
                </div>
                <h4 className="font-bold text-gray-900 text-lg md:text-xl mb-4 leading-tight">{service.title}</h4>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                  {service.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Institutions Partners Section */}
      <section className="py-6 md:py-10 bg-[#fdfcf9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="w-12 h-[1px] bg-[#C9A13B]/20"></div>
              <span className="text-[#C9A13B] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs">Global Network</span>
              <div className="w-12 h-[1px] bg-[#C9A13B]/20"></div>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#0B1F4D] mb-2 tracking-tight">Our Trusted Partners</h2>
            <p className="text-gray-500 text-xs md:text-sm max-w-2xl mx-auto font-medium leading-relaxed">
              Collaborating with leading organizations to drive sustainable impact and community empowerment.
            </p>
          </div>

          {/* Carousel Section */}
          <div className="relative group px-4">
            {/* Carousel Buttons */}
            <button 
              onClick={() => scrollPartners(Math.max(0, partnerIndex - 1))}
              className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-[#0B1F4D] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 hover:bg-[#0B1F4D] hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scrollPartners(Math.min(2, partnerIndex + 1))}
              className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-[#0B1F4D] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 hover:bg-[#0B1F4D] hover:text-white transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div 
              ref={partnerRef}
              className="w-full overflow-x-hidden scroll-smooth py-2 whitespace-nowrap hide-scrollbar"
            >
              <div className="inline-flex gap-4 md:gap-8 py-2">
                {[
                  { name: 'Kriya Architecture', logo: '🏛️' },
                  { name: 'Eco-limits', logo: '🍃' },
                  { name: 'Palamuru Rythu', logo: '🚜' },
                  { name: 'Bharath Kisan Sangh', logo: '🌾' },
                  { name: 'SRF Federation', logo: '🤝' },
                  { name: 'Sahakara Bharathi', logo: '⭐' }
                ].map((partner, idx) => (
                  <div 
                    key={idx}
                    className="inline-flex flex-col items-center justify-center w-[120px] h-[90px] md:w-[180px] md:h-[130px] bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group/card cursor-pointer"
                  >
                    <div className="text-3xl md:text-5xl mb-2 transform group-hover/card:scale-110 transition-transform duration-500">
                      {partner.logo}
                    </div>
                    <span className="text-[9px] md:text-[11px] font-black text-[#0B1F4D] text-center leading-tight uppercase tracking-wider group-hover/card:text-[#C9A13B] transition-colors whitespace-normal">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-6">
              {[0, 1, 2].map((dot) => (
                <button 
                  key={dot} 
                  onClick={() => scrollPartners(dot)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${partnerIndex === dot ? 'bg-[#C9A13B] w-8' : 'bg-gray-200 w-2.5 hover:bg-gray-300'}`}
                  aria-label={`Go to partner slide ${dot + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Section - Ready to grow with us? */}
      <section
        className="relative py-12 md:py-16 overflow-hidden flex flex-col items-center justify-center"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/img/ready_to_grow_hero_1778391714321.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F4D]/80 via-[#0B1F4D]/60 to-[#0B1F4D]/85"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[#C9A13B]"></div>
            <span className="text-[#C9A13B] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs">Join Our Family</span>
            <div className="w-8 h-[1px] bg-[#C9A13B]"></div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Ready to <span className="text-[#C9A13B]">grow</span> with us?
          </h2>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-[#C9A13B]/40"></div>
            <Leaf className="w-5 h-5 text-[#C9A13B]" fill="currentColor" />
            <div className="w-12 h-[1px] bg-[#C9A13B]/40"></div>
          </div>

          <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Join a community that's already benefiting from the Kalpavruksha ecosystem. <br />
            Together, we build sustainable prosperity and create a better future for all.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full sm:w-auto">
            <a
              href="https://wa.me/91XXXXXXXXXX"
              className="flex items-center gap-3 bg-[#0B1F4D] text-white border border-[#C9A13B] px-10 py-4 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-[#123C73] transition-all w-full sm:w-auto justify-center group"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#C9A13B]">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Chat on WhatsApp
            </a>

            <Link
              to="/membership"
              className="flex items-center gap-2 bg-[#C9A13B] text-[#0B1F4D] px-10 py-4 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-[#d9b34e] transition-all w-full sm:w-auto justify-center group"
            >
              Register Today
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
