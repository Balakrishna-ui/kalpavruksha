import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { 
  Sprout, 
  Leaf,
  ArrowRight,
  CheckCircle2,
  Recycle,
  Handshake
} from 'lucide-react';

import { HERO_FEATURES, CORE_SERVICES, IMPACT_STATS, FOOTER_FEATURES, ABOUT_POINTS } from '../constants/divAgriData';

// --- Animation Variants ---
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.15 } }
};

// --- Helper Component: Count Up ---
const CountUp = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
      const controls = animate(0, numericValue, {
        duration,
        onUpdate: (latest) => setCount(Math.floor(latest)),
        ease: "easeOut"
      });
      return () => controls.stop();
    }
  }, [inView, value, duration]);

  return <span ref={ref}>{count}{value.includes('+') ? '+' : ''}</span>;
};

const DivAgri = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="w-full font-inter bg-[#fdfdfd] overflow-x-hidden selection:bg-gold/30 selection:text-forest">
      {/* ── Hero Section ───────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[85vh] md:h-[95vh] flex items-center overflow-hidden">
        <motion.div style={{ y: heroBgY, opacity: heroOpacity }} className="absolute inset-0">
          <img 
            src="/img/mana_hero.png" 
            alt="Agriculture Field" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-8"
          >
            <Leaf className="w-3.5 h-3.5 text-gold" />
            <span className="text-white font-bold text-[10px] uppercase tracking-widest">Agriculture Division</span>
          </motion.div>
          
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight"
          >
            <span className="text-white">Growing Prosperity,</span><br />
            <span className="text-gold">Nurturing Nature</span>
          </motion.h1>
          
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mb-10 font-medium leading-relaxed"
          >
            Empowering farmers with sustainable practices, modern solutions, and direct market access for a better tomorrow.
          </motion.p>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="flex flex-wrap gap-4"
          >
            <motion.button 
              variants={fadeUp}
              whileHover={{ scale: 1.03, y: -4, boxShadow: "0 20px 25px -5px rgba(201, 163, 74, 0.2)" }}
              className="bg-[#1a3b2a] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-[#132c1f] transition-all shadow-lg border border-white/10 group"
            >
              Explore Our Initiatives 
              <motion.span transition={{ duration: 0.3 }} className="group-hover:translate-x-1">
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.button>
            <motion.button 
              variants={fadeUp}
              whileHover={{ scale: 1.03, y: -4, backgroundColor: "rgba(255, 255, 255, 1)", color: "#0F4D2E" }}
              className="bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white hover:text-forest transition-all shadow-lg shadow-white/10"
            >
              Join Our Network <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        {/* Floating Features Bar */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 bg-[#0b2118]/90 backdrop-blur-md border-t border-white/10 py-8"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {HERO_FEATURES.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, backgroundColor: "#C9A34A" }}
                    className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30 transition-all duration-500 shrink-0"
                  >
                    <item.icon className="w-6 h-6 text-gold group-hover:text-forest transition-colors" />
                  </motion.div>
                  <div className="text-white">
                    <div className="text-xs md:text-sm font-black uppercase tracking-wider group-hover:text-gold transition-colors">{item.title}</div>
                    <div className="text-[10px] md:text-xs font-medium text-white/60">{item.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── About Division ────────────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-[#F7F3E8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeLeft}
            >
              <span className="text-[#C9A13B] font-black tracking-[0.3em] uppercase text-xs mb-6 block">About the Division</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F4D] mb-8 leading-tight tracking-tight">
                Cultivating Sustainability<br />
                & Prosperity
              </h2>
              <motion.p variants={fadeUp} className="text-[#6B7280] text-lg leading-relaxed mb-10 font-medium">
                Our Agriculture Division is the heart of the Kalpavruksha ecosystem. We work hand-in-hand with farmers to promote innovation, improve productivity and ensure long-term sustainability.
              </motion.p>

              <motion.div 
                variants={staggerChildren}
                className="space-y-4 mb-10"
              >
                {ABOUT_POINTS.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    variants={fadeLeft}
                    className="flex items-center gap-4 group"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.2, backgroundColor: "#C9A13B", color: "#fff" }}
                      className="w-6 h-6 rounded-full bg-forest/10 flex items-center justify-center shrink-0 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4 text-forest group-hover:text-white" />
                    </motion.div>
                    <span className="text-[#1E1E1E] font-bold text-sm group-hover:text-[#123524] transition-colors">{item}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#C9A13B" }}
                className="bg-[#0B1F4D] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gold hover:text-forest transition-all shadow-xl"
              >
                Learn More About Us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeRight}
              className="relative group"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-gray-50 group-hover:shadow-gold/10 transition-shadow duration-500"
              >
                <motion.img 
                  src="/img/ag1.png" 
                  alt="Sustainability Illustration" 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover" 
                />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -right-6 md:right-10 bg-forest p-8 rounded-3xl shadow-2xl border-4 border-white/10 max-w-[200px] text-center"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/30">
                  <Sprout className="w-6 h-6 text-gold" />
                </div>
                <div className="text-white text-2xl font-bold mb-1">
                  <CountUp value="5+" /> Years
                </div>
                <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest">of Positive Impact</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Services ─────────────────────────────────────────── */}
      <section className="py-10 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F4D] tracking-tight mb-4">Core Services</h2>
            <div className="flex justify-center">
              <div className="w-24 h-px bg-gold/30 self-center" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <Sprout className="w-6 h-6 text-[#C9A13B] mx-4" />
              </motion.div>
              <div className="w-24 h-px bg-gold/30 self-center" />
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-4 gap-8"
          >
            {CORE_SERVICES.map((svc, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: "0 30px 60px -12px rgba(15, 77, 46, 0.12)", borderColor: "#C9A34A" }}
                className="bg-white p-10 rounded-[32px] shadow-xl shadow-forest/5 border border-gray-100 transition-all duration-500 flex flex-col items-center text-center group"
              >
                <motion.div 
                  className="w-20 h-20 rounded-3xl bg-forest/5 flex items-center justify-center mb-8 group-hover:bg-forest group-hover:rotate-[10deg] transition-all duration-500 shadow-inner"
                >
                  <svc.icon className="w-8 h-8 text-forest group-hover:text-white transition-all" />
                </motion.div>
                <h3 className="text-xl font-bold text-[#0B1F4D] mb-4 leading-tight tracking-tight group-hover:text-gold transition-colors">{svc.title}</h3>
                <p className="text-[#6B7280] text-sm font-medium leading-relaxed mb-8 flex-grow">{svc.desc}</p>
                <motion.div 
                  whileHover={{ scale: 1.1, backgroundColor: "#C9A34A", color: "#fff", borderColor: "#C9A34A" }}
                  className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gold transition-all"
                >
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Impact Stats Bar ──────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0B1F4D] to-[#123524] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-4 gap-12"
          >
            {IMPACT_STATS.map((stat, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col md:flex-row items-center gap-6 group"
              >
                <motion.div 
                  whileHover={{ rotate: 15, backgroundColor: "#C9A34A", boxShadow: "0 0 20px rgba(201, 163, 74, 0.4)" }}
                  className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 transition-all duration-500"
                >
                  <stat.icon className="w-8 h-8 text-gold group-hover:text-white transition-colors" />
                </motion.div>
                <div className="text-center md:text-left">
                  <div className="text-white text-4xl font-bold mb-1 drop-shadow-lg">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="text-[#C9A13B] text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Join Network Banner ───────────────────────────────────── */}
      <section className="py-6 px-6 bg-[#F7F3E8]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={zoomIn}
          className="max-w-7xl mx-auto relative rounded-[40px] md:rounded-[50px] overflow-hidden bg-[#0B1F4D] flex flex-col md:flex-row items-stretch min-h-[320px] border border-gray-100 shadow-2xl"
        >
          
          {/* Left Content Side */}
          <div className="w-full md:w-[45%] p-8 md:py-8 md:px-12 relative z-10 flex flex-col justify-center bg-gradient-to-r from-[#0B1F4D] via-[#0B1F4D] to-transparent">
            <motion.span variants={fadeUp} className="text-[#C9A13B] font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Together we grow</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              Join Our<br />
              Agriculture Network
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#F7F3E8]/70 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-md">
              Whether you are a farmer looking for support or a consumer wanting quality products, be part of a growing ecosystem that builds sustainable prosperity for all.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/membership" className="bg-[#123524] text-[#FFFDF8] px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-[#1E5631] transition-all shadow-lg shadow-[#123524]/20 group">
                  Join Now <motion.span transition={{ duration: 0.3 }} className="group-hover:translate-x-1"><ArrowRight className="w-4 h-4 text-white" /></motion.span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/contact" className="bg-transparent border-2 border-[#C9A13B] text-[#C9A13B] px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-[#C9A13B] hover:text-white transition-all group shadow-lg">
                  Contact Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Image Side with Fade Effect */}
          <div className="w-full md:w-[55%] relative h-[250px] md:h-auto overflow-hidden">
            <motion.img 
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 1.5 }}
              src="/img/agri_network.png" 
              alt="Join Network" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            {/* Soft fade transition from left to right */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#0B1F4D] via-[#0B1F4D]/60 to-transparent" />
            
            {/* Floating Features Card - Overlapping Bottom Right */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-0 right-0 bg-[#FFFDF8]/95 backdrop-blur-md p-6 md:px-10 md:py-8 rounded-tl-[40px] flex items-center gap-6 md:gap-12 border-t border-l border-white/20 shadow-2xl"
            >
              {[
                { icon: Leaf, label: "Sustainable Practices" },
                { icon: Handshake, label: "Stronger Community" },
                { icon: Recycle, label: "Better Future Together" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center gap-3 text-center group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#123524]/5 flex items-center justify-center border border-[#123524]/5 shadow-sm group-hover:bg-[#C9A13B] transition-all duration-300">
                    <item.icon className="w-5 h-5 text-[#123524] group-hover:text-white" />
                  </div>
                  <span className="text-[9px] font-black uppercase text-[#1E1E1E] tracking-tighter leading-tight max-w-[70px] group-hover:text-[#C9A13B] transition-colors">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer Features ───────────────────────────────────────── */}
      <section className="bg-[#F7F3E8] py-12 border-t border-[#EFE7D2]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {FOOTER_FEATURES.map((feature, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                whileHover={{ y: -4, color: "#C9A34A" }}
                className="flex items-center gap-4 group cursor-default"
              >
                <div className="group-hover:rotate-[15deg] transition-transform">
                  <feature.icon className="w-6 h-6 text-[#0B1F4D] shrink-0 group-hover:text-[#C9A13B] transition-colors" />
                </div>
                <span className="text-[#0B1F4D] text-[10px] font-black uppercase tracking-widest group-hover:text-[#C9A13B] transition-colors">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DivAgri;
