import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  Settings, 
  PlayCircle, 
  Leaf, 
  Recycle, 
  ShieldCheck, 
  Landmark, 
  Globe,
  Users,
  Factory,
  Package
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

const DivMfg = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const statsBar = [
    { icon: Leaf, text: 'Eco-Friendly Production' },
    { icon: Recycle, text: '100% Sustainable Materials' },
    { icon: ShieldCheck, text: 'ISIRI & MSME Supported' },
    { icon: Landmark, text: 'Ministry Backed Units' },
    { icon: Globe, text: 'Service to Planet' },
  ];

  const checklist = [
    '100% Biodegradable',
    'Eco-Friendly & Recyclable',
    'Durable & Reliable',
    'Better for You, Better for Earth',
  ];

  const productionLine = [
    {
      num: '01',
      title: 'Raw Material Preparation',
      desc: 'Carefully selected biodegradable materials for superior quality.',
      img: '/img/m1.jpeg'
    },
    {
      num: '02',
      title: 'Mixing & Compounding',
      desc: 'Advanced blending for consistency and strength.',
      img: '/img/m2.jpeg'
    },
    {
      num: '03',
      title: 'Film & Bag Formation',
      desc: 'Precision film blowing and bag manufacturing.',
      img: '/img/m3.jpeg'
    },
    {
      num: '04',
      title: 'Quality Check & Packaging',
      desc: 'Rigorous quality checks and eco-friendly packaging for distribution.',
      img: '/img/qu1.png'
    }
  ];

  const bottomStats = [
    { icon: Users, val: '100+', label: 'Team Members' },
    { icon: Factory, val: '1+', label: 'Manufacturing Unit' },
    { icon: Package, val: '50L+', label: 'Bags Produced Monthly' },
    { icon: Leaf, val: '100%', label: 'Sustainable Materials' },
    { icon: Globe, val: '1', label: 'Planet Our Only Home' },
  ];

  return (
    <div className="w-full font-inter bg-[#F7F3E8] overflow-x-hidden selection:bg-[#C9A13B]/30 selection:text-[#0B1F4D]">
      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[500px] md:h-[600px] flex items-start pt-16 md:items-center justify-start overflow-hidden bg-[#0B1F4D]">
        <motion.div style={{ y: heroBgY, opacity: heroOpacity }} className="absolute inset-0">
          <img 
            src="/img/manufacturing_hero.jpg" 
            alt="Manufacturing Facility" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F4D]/80 via-[#0B1F4D]/40 to-transparent backdrop-blur-[1px]" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-8 md:pt-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-8"
          >
            <Settings className="w-3.5 h-3.5 text-[#C9A13B]" />
            <span className="text-white font-bold text-[10px] uppercase tracking-widest">Manufacturing Division</span>
          </motion.div>
          
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-2xl md:text-7xl font-bold text-white leading-[1.1] mb-4 md:mb-6 tracking-tight"
          >
            Sustainable Products.<br />
            <span className="bg-gradient-to-r from-[#C9A13B] to-[#D8B45A] bg-clip-text text-transparent">Better Planet.</span>
          </motion.h1>
          
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-[13px] md:text-xl text-[#F7F3E8]/80 max-w-xl mb-6 md:mb-10 font-medium leading-relaxed"
          >
            Industrial units dedicated to value-added production for a greener, cleaner and stronger tomorrow.
          </motion.p>

        </div>

        {/* Floating Icons Bar */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 bg-[#0B1F4D]/90 backdrop-blur-lg border-t border-white/10 py-6"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {statsBar.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-3 group cursor-default"
                >
                  <item.icon className="w-6 h-6 text-[#C9A13B] shrink-0 group-hover:text-white transition-colors" />
                  <span className="text-[10px] md:text-xs text-white/90 font-bold uppercase tracking-wider leading-tight group-hover:text-[#C9A13B] transition-colors">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Product Focus Section ────────────────────────────────── */}
      <section className="py-10 md:py-24 bg-[#F7F3E8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeLeft}
            >
              <span className="text-[#C9A13B] font-black tracking-[0.3em] uppercase text-xs mb-6 block">Product Focus</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F4D] mb-8 leading-tight tracking-tight">
                Eco-Friendly <br />
                <span className="text-[#123524]">Biodegradable</span> <br />
                Cover Manufacturing
              </h2>
              
              <div className="w-16 h-1 bg-[#C9A13B]/30 mb-8 flex items-center">
                <motion.div
                  animate={{ x: [0, 40, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Leaf className="w-5 h-5 text-[#C9A13B] -mt-2 ml-4" />
                </motion.div>
              </div>

              <motion.p variants={fadeUp} className="text-[#6B7280] text-lg leading-relaxed mb-10 font-medium">
                Under the visionary "EcoLimits" brand, we manufacture high-quality biodegradable covers that are strong, sustainable, and safe for the environment.
              </motion.p>

              <motion.div 
                variants={staggerChildren}
                className="grid sm:grid-cols-2 gap-4"
              >
                {checklist.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={fadeLeft}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#EFE7D2] hover:border-[#C9A13B] hover:shadow-lg transition-all duration-300 group"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#123524] group-hover:text-[#C9A13B] transition-colors" />
                    <span className="text-[#1E1E1E] font-bold text-sm">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6 relative">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative group"
              >
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <motion.img 
                    src="/img/biodegradable_covers_1.png" 
                    alt="Eco-Friendly Bags" 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F4D]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white font-bold text-xl mb-1">Eco-Friendly Bags</h3>
                    <p className="text-white/70 text-xs font-medium uppercase tracking-widest">Strong. Sustainable.</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: 0.2 }}
                className="relative group mt-12"
              >
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <motion.img 
                    src="/img/qu1.png" 
                    alt="Ecolimits Bioplastics" 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#123524]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white font-bold text-xl mb-1">Ecolimits</h3>
                    <p className="text-white/70 text-xs font-medium uppercase tracking-widest">100% Compostable</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Excellence ─────────────────────────────────── */}
      <section className="py-12 md:py-24 bg-[#FFFDF8] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F4D] tracking-tight">
              Technical Excellence in Bioplastics
            </h2>
            <div className="flex justify-center mt-4 items-center gap-6">
              <div className="w-20 h-px bg-[#C9A13B]/30" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Leaf className="w-6 h-6 text-[#C9A13B]" />
              </motion.div>
              <div className="w-20 h-px bg-[#C9A13B]/30" />
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-12 text-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeLeft}
              className="shrink-0"
            >
              <div className="w-32 h-32 rounded-full bg-white shadow-xl flex flex-col items-center justify-center p-4 border border-[#EFE7D2] hover:border-[#C9A13B] transition-colors duration-500 group">
                <Leaf className="w-8 h-8 text-[#123524] mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase text-[#1E1E1E] leading-tight tracking-tighter">Sustainable Materials</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex-1"
            >
              <p className="text-[#6B7280] text-lg md:text-xl leading-relaxed font-medium">
                Our manufacturing process utilizes <span className="text-[#123524] font-bold">"100% sustainable materials"</span>, ensuring that every cover produced is naturally compostable and safe for the ecosystem. These covers are versatile and robust, suitable for diverse applications including agriculture, soil packaging, and everyday consumer use.
              </p>
              <p className="text-[#6B7280] text-lg md:text-xl leading-relaxed font-medium mt-6">
                By choosing <span className="text-[#C9A13B] font-bold">"EcoLimits"</span>, businesses and individuals transition toward a circular economy that prioritizes the health of our planet.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeRight}
              className="shrink-0"
            >
              <div className="w-32 h-32 rounded-full bg-white shadow-xl flex flex-col items-center justify-center p-4 border border-[#EFE7D2] hover:border-[#C9A13B] transition-colors duration-500 group">
                <Recycle className="w-8 h-8 text-[#123524] mb-2 group-hover:rotate-180 transition-transform duration-700" />
                <span className="text-[10px] font-black uppercase text-[#1E1E1E] leading-tight tracking-tighter">Compostable & Safe</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Production Line ──────────────────────────────────────── */}
      <section className="py-6 md:py-12 bg-[#F7F3E8]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-8 md:mb-12"
          >
            <span className="text-[#C9A13B] font-black tracking-[0.4em] uppercase text-xs mb-4 block">Manufacturing Excellence</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F4D] mb-4 tracking-tight">
              Our <span className="text-[#C9A13B]">Production</span> Line
            </h2>
            <p className="text-[#6B7280] font-medium text-lg uppercase tracking-widest">
              Modern machinery. Skilled workforce. Sustainable impact.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mb-4 md:mb-8"
          >
            {productionLine.map((step, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                whileHover={{ y: -10, shadow: "0 30px 60px -12px rgba(11, 31, 77, 0.15)" }}
                className="bg-white rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-xl border border-[#EFE7D2] group transition-all duration-500"
              >
                <div className="h-32 md:h-52 overflow-hidden relative">
                  <motion.img 
                    src={step.img} 
                    alt={step.title} 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 w-6 h-6 md:w-10 md:h-10 bg-[#0B1F4D] text-white rounded-full flex items-center justify-center font-black text-[10px] md:text-sm border-2 border-white/20 shadow-lg">
                    {step.num}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F4D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-3 md:p-8">
                  <h3 className="text-xs md:text-xl font-bold text-[#0B1F4D] mb-2 md:mb-4 leading-tight tracking-tight group-hover:text-[#C9A13B] transition-colors line-clamp-1">{step.title}</h3>
                  <p className="text-[#6B7280] text-[10px] md:text-sm leading-relaxed font-medium line-clamp-2 md:line-clamp-none">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>


      {/* ── Bottom Stats ────────────────────────────────────────── */}
      <section className="bg-[#0B1F4D] py-8 md:py-16 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12"
          >
            {bottomStats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center gap-2 md:gap-4 group"
              >
                <motion.div 
                  whileHover={{ rotate: 15, backgroundColor: "#C9A13B" }}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center transition-all duration-500 border border-white/10 shadow-xl"
                >
                  <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-[#C9A13B] group-hover:text-white" />
                </motion.div>
                <div>
                  <div className="text-white text-2xl md:text-3xl font-bold mb-1 drop-shadow-lg">
                    <CountUp value={stat.val} />
                  </div>
                  <div className="text-[#C9A13B] text-[10px] font-black uppercase tracking-widest">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DivMfg;
