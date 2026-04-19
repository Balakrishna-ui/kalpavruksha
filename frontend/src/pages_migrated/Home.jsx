import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, UtensilsCrossed, Sparkles, HeartPulse, 
  Search, TrendingUp, Award, Shield, Users, 
  Briefcase, CheckCircle, Zap, ArrowRight} from 'lucide-react';

// Slide 1: Ecosystem Tree (im1.PNG) — main brand story
// Slide 2: Grameenam Products (gra1.png) — product showcase
// Slide 3: Farmland Agriculture (gra2.png) — agriculture services
const slides = [
  {
    id: 'ecosystem',
    bg: '/img/im1.PNG',
    overlay: 'rgba(0,0,0,0.25)',
    tag: 'Join Our Family',
    heading: 'Kalpavruksha Co-operative Ecosystem',
    description: 'Empowering members through finance, agriculture, community living, industry, and sustainable development',
    cta1: { text: 'Become a Member', to: '/membership' },
    cta2: { text: 'Contact Us', to: '/contact' },
    showIcons: true,
  },
  {
    id: 'grameenam',
    bg: '/img/gra1.png',
    overlay: 'rgba(0,0,0,0.35)',
    tag: 'Pure • Traditional • Natural',
    heading: 'Grameenam Products',
    description: 'Authentic village products crafted with care and delivered with trust',
    cta1: { text: 'Shop Now', to: '/products' },
    cta2: { text: 'Explore Products', to: '/products' },
    showIcons: false,
  },
  {
    id: 'agriculture',
    bg: '/img/gra2.png',
    overlay: 'rgba(0,0,0,0.25)',
    tag: 'Agriculture Strength',
    heading: 'Empowering Agriculture',
    description: 'From farms to families – delivering freshness and sustainability through modern solutions and organic practices',
    cta1: { text: 'Learn More', to: '/div-agri' },
    cta2: { text: 'Join Our Network', to: '/membership' },
    showIcons: false,
  },
];

const ecosystemIcons = [
  { label: 'Education services', pos: 'top-[35%] left-[5%]', delay: '0s', icon: 'M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5' },
  { label: 'Business', pos: 'top-[20%] left-[35%]', delay: '0.5s', icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { label: 'Financial services', pos: 'top-[22%] right-[25%]', delay: '1s', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
  { label: 'Real estate', pos: 'top-[42%] right-[5%]', delay: '1.5s', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10' },
  { label: 'Organic farming', pos: 'bottom-[22%] right-[12%]', delay: '2s', icon: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12' },
  { label: 'Agriculture services', pos: 'bottom-[22%] left-[8%]', delay: '0.8s', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
];

const Home = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => prev + 1);
  }, []);

  // Auto-advance every 6 seconds for fluid timing
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="w-full font-inter">
      {/* Hero Carousel Section */}
      {/* Responsive Height */}
      <section className="relative h-[540px] md:h-[600px] overflow-hidden bg-forest">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 blur-[120px] rounded-full pointer-events-none z-10"></div>

        {/* ── Sliding Track: infinite continuous right-to-left ── */}
        <div
          className="absolute inset-0 transition-transform duration-[800ms] ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, idx) => {
            const virtualIndex = Math.round((current - idx) / slides.length) * slides.length + idx;

            return (
              <div
                key={idx}
                className="absolute w-full h-full bg-cover bg-center"
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



                {/* Slide Content - Pill Design Reference Style */}
                {/* Slide Content - Button-Only Bottom Layout */}
                <div className="absolute inset-0 z-20 flex items-end justify-center pb-16 md:pb-24">
                  <div className="text-center px-4 md:px-6 w-full max-w-5xl mx-auto flex flex-col items-center overflow-hidden">
                    {/* Buttons Container - Slide in from right with delay */}
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto transition-all duration-700 ease-out delay-200 ${virtualIndex === current ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                      <Link
                        to={slide.cta1.to}
                        className="bg-white text-forest font-bold py-3 md:py-3.5 px-8 md:px-10 rounded-xl hover:bg-gold hover:text-forest hover:-translate-y-1 hover:shadow-2xl active:scale-95 transition-all duration-300 shadow-xl text-sm md:text-base flex items-center justify-center gap-3"
                      >
                        {slide.cta1.text}
                        <ArrowRight size={18} />
                      </Link>
                      <Link
                        to={slide.cta2.to}
                        className="bg-transparent border border-white/30 text-white font-bold py-3 md:py-3.5 px-8 md:px-10 rounded-xl hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all duration-300 text-sm md:text-base flex items-center justify-center"
                      >
                        {slide.cta2.text}
                      </Link>
                    </div>
                  </div>
                </div>
                </div>
            );
          })}
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-5">
          {slides.map((_, idx) => {
            const activeIdx = ((current % slides.length) + slides.length) % slides.length;
            return (
              <button
                key={idx}
                onClick={() => {
                  setCurrent(prev => {
                    let target = Math.round((prev - idx) / slides.length) * slides.length + idx;
                    if (target <= prev && idx !== activeIdx) {
                      target += slides.length;
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

      {/* About Section - Optimized Height */}
      <section className="relative py-16 w-full bg-[#fcfdfc] overflow-hidden">
        {/* Subtle pattern background */}
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1a3a1a_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Content */}
            <div className="flex flex-col text-left order-2 lg:order-1 relative z-10">
              <span className="text-gold font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Legacy & Vision</span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-forest mb-5 leading-[1.1] tracking-tighter">
                About <span className="text-gold">Kalpavruksha</span> <br />
                Cooperative Society
              </h2>
              
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-6 font-medium">
                Kalpavruksha Mutually Aided Cooperative Thrift and Credit Society Limited is a trusted financial institution dedicated to empowering individuals through responsible finance and sustainable development.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  'Empowering members through tailored support',
                  'Ensuring security through rigorous checks',
                  'Promoting inclusion across 8 divisions',
                  'Building a sustainable heritage together'
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-4 group/item">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover/item:bg-forest group-hover/item:text-gold transition-all">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-gray-700 font-bold text-sm tracking-tight">{point}</span>
                  </div>
                ))}
              </div>
              
              <div>
                <Link to="/about-kalpavruksha" className="inline-flex items-center gap-4 bg-forest text-white font-black px-12 py-4 rounded-full hover:bg-gold hover:scale-105 transition-all shadow-2xl text-xs uppercase tracking-[0.2em] group/btn">
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Logo - Adjusted size */}
            <div className="flex justify-center relative order-1 lg:order-2">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold/5 blur-[120px] rounded-full"></div>
              <div className="relative p-8 md:p-12 bg-white rounded-[60px] shadow-[0_32px_80px_rgba(0,0,0,0.1)] border border-gray-100 max-w-[380px] hover:rotate-2 transition-transform duration-1000 group">
                <img 
                  src="/img/logoo.PNG" 
                  alt="Kalpavruksha Logo" 
                  className="w-full h-auto object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Product Section */}
      <section className="py-20 bg-[#f8f9f7] relative overflow-hidden">
        {/* Decorative Nature Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-3xl rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-forest/5 blur-3xl rounded-full -ml-32 -mb-32"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-gold font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Crafted with Care</span>
            <h2 className="text-4xl md:text-5xl font-black text-forest mb-6 tracking-tight leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-gold">Signature Selection</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                id: 'ecolimits',
                cat: 'ECO LIMITS', 
                name: 'Biodegradable Covers', 
                tagline: 'Eco-friendly protection for a greener tomorrow.',
                img: '/img/p1.jpeg',
                link: '/products?category=ecolimits'
              },
              { 
                id: 'kulfi',
                cat: 'KULFI', 
                name: 'Traditional Kulfi', 
                tagline: 'Authentic flavor, frozen with pure tradition.',
                img: '/img/p2.jpg',
                link: '/products?category=kulfis'
              },
              { 
                id: 'honey',
                cat: 'HONEY', 
                name: 'Wildflower Honey', 
                tagline: 'Golden purity, harvested from the wild.',
                img: '/img/p3.png',
                link: '/products?category=honey'
              },
              { 
                id: 'niramaya',
                cat: 'NIRAMAYA', 
                name: 'Wellness Juice', 
                tagline: 'Natural wellness for a balanced lifestyle.',
                img: '/img/p4.jpg',
                link: '/products?category=niramaya'
              },
            ].map((prod, idx) => (
              <Link 
                key={prod.id} 
                to={prod.link}
                className="group bg-white rounded-[20px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center"
              >
                {/* Image Container with Badge */}
                <div className="relative w-full aspect-square bg-[#fcfdfa] flex items-center justify-center p-8 overflow-hidden">
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-forest text-gold text-[9px] font-black px-3 py-1.5 rounded-lg tracking-widest shadow-lg">
                      {prod.cat}
                    </span>
                  </div>
                  <img 
                    src={prod.img} 
                    alt={prod.name} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-8 w-full flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold text-forest mb-2 group-hover:text-gold transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-gray-400 text-xs font-medium mb-6 line-clamp-1">
                    {prod.tagline}
                  </p>
                  
                  <div className="w-full flex items-center justify-center gap-2 py-3.5 bg-forest text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl group-hover:bg-gold group-hover:text-forest transition-all duration-300">
                    View Details
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Empowerment Section */}
      <section className="pb-10 pt-4 bg-[#fcfdfc] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/5 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-forest/5 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-gold font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Financial Excellence</span>
            <h2 className="text-3xl md:text-5xl font-black text-forest mb-6 tracking-tight">
              Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-gold">Empowerment</span>
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-10 rounded-full"></div>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
              Secure, transparent, and growth-oriented financial services designed for both rural and urban communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Savings & RD', 
                id: 'savings', 
                desc: 'Secure deposits with highly competitive returns.', 
                icon: <Briefcase className="w-6 h-6" />,
                accent: 'bg-gold/10 text-gold'
              },
              { 
                title: 'Gold Loans', 
                id: 'gold-loans', 
                desc: 'Instant liquidity at the lowest possible interest rates.', 
                icon: <Award className="w-6 h-6" />,
                accent: 'bg-forest text-gold'
              },
              { 
                title: 'Mortgage', 
                id: 'mortgage', 
                desc: 'Turning your home and property dreams into reality.', 
                icon: <Search className="w-6 h-6" />,
                accent: 'bg-gold/10 text-gold'
              },
              { 
                title: 'Fixed Deposits', 
                id: 'fixed-deposits', 
                desc: 'Guaranteed and safe growth for your precious capital.', 
                icon: <Shield className="w-6 h-6" />,
                accent: 'bg-forest/5 text-forest'
              },
            ].map((srv, idx) => (
              <Link 
                key={idx} 
                to={`/divisions/financial#${srv.id}`}
                className="group bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Hover Background Layer */}
                <div className="absolute inset-0 bg-forest opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0"></div>
                
                <div className={`relative z-10 w-16 h-16 rounded-2xl ${srv.accent} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-gold group-hover:text-forest transition-all duration-500`}>
                  {srv.icon}
                </div>
                
                <h4 className="relative z-10 font-bold text-forest text-xl mb-4 group-hover:text-white transition-colors">{srv.title}</h4>
                <p className="relative z-10 text-gray-500 text-sm leading-relaxed mb-6 group-hover:text-white/70 transition-colors">
                  {srv.desc}
                </p>
                
                <div className="relative z-10 mt-auto flex items-center gap-2 text-gold font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                  Explore Now <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Trusted Institutions Partners Section — optimized height & filtered list */}
      <section className="py-12 md:py-16 bg-[#f9f9f9]">
        {/* Inject keyframe animation */}
        <style>{`
          @keyframes partnerScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .partner-track {
            animation: partnerScroll 25s linear infinite;
            will-change: transform;
          }
          .partner-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 pt-4">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-3 tracking-tight">
            Our <span className="text-forest">Trusted</span> Partners
          </h2>
          <div className="w-12 h-[3px] bg-gold mx-auto rounded-full"></div>
        </div>

        {/* Scrolling Track */}
        <div className="w-full overflow-hidden relative pb-6 pt-2">
          {/* Left / Right edge fades */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#f9f9f9] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#f9f9f9] to-transparent z-10 pointer-events-none"></div>

          {/* The track — duplicated for seamless loop */}
          <div className="partner-track flex items-center gap-5 md:gap-6 w-max px-6 snap-x snap-mandatory">
            {[
              { name: 'Kirya Architecture', logo: '🏗️', slug: 'kirya-architecture' },
              { name: 'Ecolimits',          logo: '🌍', slug: 'eco-limits' },
              { name: 'Palamuru Rythu',      logo: '🌾', slug: 'palamuru-rythu' },
              { name: 'Bharath Kisan Sangh', logo: '⭐', slug: 'bharath-kisan-sangh' },
              { name: 'SRF Federation',      logo: '📊', slug: 'srf-federation' },
              { name: 'Sahakara Bharathi',   logo: '🛡️', slug: 'sahakara-bharathi' },
              /* Duplicate for seamless loop */
              { name: 'Kirya Architecture', logo: '🏗️', slug: 'kirya-architecture' },
              { name: 'Ecolimits',          logo: '🌍', slug: 'eco-limits' },
              { name: 'Palamuru Rythu',      logo: '🌾', slug: 'palamuru-rythu' },
              { name: 'Bharath Kisan Sangh', logo: '⭐', slug: 'bharath-kisan-sangh' },
              { name: 'SRF Federation',      logo: '📊', slug: 'srf-federation' },
              { name: 'Sahakara Bharathi',   logo: '🛡️', slug: 'sahakara-bharathi' },
            ].map((partner, idx) => (
              <Link
                key={idx}
                to={`/partners/${partner.slug}`}
                className="group flex flex-col items-center justify-center gap-3 bg-white rounded-xl w-[140px] h-[110px] md:w-[200px] md:h-[150px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.12)] hover:-translate-y-[5px] transition-all duration-300 cursor-pointer flex-shrink-0 border border-gray-50/50 snap-center"
              >
                <div className="text-3xl md:text-5xl leading-none drop-shadow-sm grayscale group-hover:grayscale-0 transition-all duration-500">
                  {partner.logo}
                </div>
                <span className="text-[10px] md:text-xs font-bold text-gray-700 text-center px-4 leading-tight">
                  {partner.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section - Optimized Height */}
      <section 
        className="py-16 md:py-24 relative overflow-hidden flex flex-col items-center"
        style={{
          backgroundImage: 'url("/img/bc.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div 
          className="absolute inset-0 z-0"
          style={{
            backdropFilter: 'blur(2px)',
            background: 'linear-gradient(rgba(20, 100, 40, 0.45), rgba(10, 70, 30, 0.6))'
          }}
        ></div>

        {/* Subtle Decorative Background Elements */}
        {/* Changed opacity to match the darker premium feel */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] select-none pointer-events-none z-1">
          <h2 className="text-[12vw] font-black uppercase tracking-[0.2em] text-forest">Grameenam</h2>
        </div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-forest/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <span className="text-gold font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Join Our Family</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tighter">
            Ready to grow <br className="sm:hidden" /> with us?
          </h2>
          
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Join <span className="text-forest font-bold">5,000+ families</span> already benefiting from the Kalpavruksha ecosystem. <br className="hidden md:block" />
            Together, we build sustainable prosperity and community strength.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto">
            <a 
              href="https://wa.me/91XXXXXXXXXX" 
              className="flex items-center gap-3 bg-[#25D366] text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-forest hover:shadow-2xl hover:-translate-y-1 transition-all w-full sm:w-auto justify-center group"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                <path d="M12.031 6.172c-2.32 0-4.519.903-6.16 2.544-1.64 1.64-2.542 3.841-2.542 6.162 0 1.564.433 3.134 1.253 4.513l-1.341 4.904 5.025-1.319c1.328.727 2.812 1.11 4.316 1.11 2.321 0 4.519-.903 6.16-2.544 1.64-1.64 2.542-3.841 2.542-6.163 0-4.789-3.891-8.717-8.753-8.717zm4.49 12.33c-.66.66-1.538 1.023-2.47 1.023-.604 0-1.202-.152-1.729-.44l-.24-.132-2.83.742.754-2.758-.145-.23c-.347-.549-.53-1.184-.53-1.838 0-.932.363-1.81 1.023-2.47.66-.66 1.538-1.023 2.47-1.023.931 0 1.81.363 2.47 1.023.66.66 1.023 1.538 1.023 2.47 0 .933-.363 1.811-1.023 2.471z" />
              </svg>
              Chat on WhatsApp
            </a>
            
            <Link 
              to="/membership" 
              className="flex items-center gap-2 bg-white border-2 border-forest text-forest px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gold hover:text-white hover:border-gold hover:shadow-2xl hover:-translate-y-1 transition-all w-full sm:w-auto justify-center"
            >
              Register Today
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
