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
  Leaf
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
      <section ref={heroRef} className="relative h-[420px] md:h-[500px] flex items-center overflow-hidden bg-[#f8f5ec]">
        {/* Background Decorative Patterns */}
        <motion.div style={{ y: heroBgY, opacity: heroOpacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 opacity-20">
            <div className="grid grid-cols-4 gap-2">
              {[...Array(16)].map((_, i) => <div key={i} className="w-1 h-1 bg-[#c9a34a] rounded-full" />)}
            </div>
          </div>
          <div className="absolute bottom-20 left-40 opacity-10 rotate-12">
            <Leaf className="w-40 h-40 text-[#c9a34a]" />
          </div>
        </motion.div>

        {/* Right Side Curved Image Container */}
        <div className="absolute right-0 top-0 h-full w-[60%] lg:w-[55%] hidden md:block">
          {/* Main Curve */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-[#051128] z-0" 
            style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)', borderRadius: '400px 0 0 400px' }} 
          />
          {/* Gold Border Curve */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="absolute inset-0 z-10 translate-x-1" 
            style={{ clipPath: 'polygon(21% 0%, 100% 0%, 100% 100%, 1% 100%)', borderRadius: '400px 0 0 400px', backgroundColor: '#c9a34a' }} 
          />
          {/* Image Curve */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="absolute inset-0 z-20 translate-x-2 overflow-hidden" 
            style={{ clipPath: 'polygon(22% 0%, 100% 0%, 100% 100%, 2% 100%)', borderRadius: '400px 0 0 400px' }}
          >
            <motion.img 
              src="/img/financial_hero_new.png" 
              alt="Financial Growth" 
              style={{ y: heroBgY }}
              className="w-full h-full object-cover"
            />
            {/* Soft overlay on image side if needed */}
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </div>

        <div className="relative z-30 max-w-[1440px] mx-auto px-10 md:px-20 w-full">
          <div className="w-full lg:w-1/2 text-left">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="text-4xl md:text-[3.5rem] font-bold text-[#0B1F4D] leading-[1.1] mb-6 tracking-tight"
            >
              <motion.span variants={fadeUp} className="block">Empowering Your</motion.span>
              <motion.span variants={fadeUp} className="block">Future with</motion.span>
              <motion.span variants={fadeUp} className="text-[#c9a34a] font-medium block">Secure & Strategic</motion.span>
              <motion.span variants={fadeUp} className="block">Financial Solutions</motion.span>
            </motion.h1>
            
            <motion.p 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-base md:text-lg max-w-lg mb-10 font-medium leading-relaxed"
            >
              Smart savings, stable returns, and trusted financial services for a better tomorrow.
            </motion.p>

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              transition={{ delay: 0.5 }}
              className="flex flex-row gap-2 md:gap-6"
            >
              <motion.div variants={fadeUp}>
                <Link to="/financial-enquiry" className="bg-[#0B1F4D] text-[#FFFDF8] px-4 md:px-10 py-3 md:py-4 rounded-2xl font-bold text-[10px] md:text-sm flex items-center gap-2 md:gap-3 hover:opacity-90 transition-all shadow-2xl shadow-navy/20 group relative overflow-hidden">
                  <motion.span whileHover={{ y: -3 }} className="flex items-center gap-2 md:gap-3">
                    KNOW MORE
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#C9A13B] group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                  <motion.div 
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                  />
                </Link>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link to="/membership" className="bg-white/50 border border-[#C9A13B]/30 text-[#0B1F4D] px-4 md:px-10 py-3 md:py-4 rounded-2xl font-bold text-[10px] md:text-sm flex items-center gap-2 md:gap-3 hover:bg-white transition-all shadow-lg hover:shadow-gold/10">
                  <motion.span whileHover={{ y: -3 }} className="flex items-center gap-2 md:gap-3">
                    Become a Member 
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-[#C9A13B]" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: TOP FEATURES STRIP ─────────────────────────── */}
      <section className="pt-[20px] pb-10 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20"
          >
            {[
              { icon: Shield, title: 'Trust & Security', desc: 'Safe and reliable financial services for your peace of mind.', color: 'bg-[#fcf8f1]' },
              { icon: Zap, title: 'Fast Processing', desc: 'Quick approvals and minimal documentation to save your time.', color: 'bg-[#f8f6f2]' },
              { icon: Settings, title: 'Flexible Plans', desc: 'Customized financial solutions that grow with you.', color: 'bg-[#fcf9f4]' }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="flex items-center gap-6 group cursor-default"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, backgroundColor: '#c9a34a' }}
                  className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center shrink-0 border border-[#c5a05922] group-hover:border-[#c5a05955] transition-all duration-500`}
                >
                  <item.icon className="w-7 h-7 text-[#c5a059] group-hover:text-white transition-all duration-300" />
                </motion.div>
                <div>
                  <h4 className="text-xl font-bold text-[#0B1F4D] mb-1 tracking-tight group-hover:text-[#c9a34a] transition-colors">{item.title}</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SCHEME SECTIONS ────────────────────────────────────────── */}
      <div className="bg-white space-y-0">
        
        {/* SECTION 1: SRI NITHYA DAILY DEPOSIT (SD) */}
        <section id="sri-nithya-daily-deposit" className="bg-[#f8f5ec] py-8 md:py-12">
          <div className="max-w-[1440px] mx-auto px-10 md:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className="relative transition-all duration-500 lg:order-2"
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-[16/10] group">
                <motion.img 
                  src="/img/sri.png" 
                  alt="Sri Nithya" 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-6 lg:order-1"
            >
              <div className="space-y-3">
                <span className="text-[#C9A13B] font-bold tracking-[0.2em] uppercase text-[10px] block">Disciplined Savings</span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#0B1F4D] leading-tight tracking-tight">
                  SRI NITHYA DAILY <br />DEPOSIT (SD)
                </h2>
              </div>
              <p className="text-[#6B7280] text-base leading-relaxed font-medium">
                A disciplined daily savings scheme designed for small income groups, allowing deposits from ₹100 to ₹1,000. This flexible plan offers tenure from 1 to 5 years with attractive bonus benefits at maturity.
              </p>
              <motion.div variants={staggerChildren} className="grid grid-cols-2 gap-y-4">
                {['Daily savings', 'Secure investments', 'Growth returns', 'Attractive bonuses'].map((point, pIdx) => (
                  <motion.div key={pIdx} variants={fadeUp} className="flex items-center gap-3 group">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A13B] group-hover:scale-120 transition-transform" />
                    <span className="text-[#1E1E1E] font-semibold text-sm group-hover:text-[#C9A13B] transition-colors">{point}</span>
                  </motion.div>
                ))}
              </motion.div>
              <div className="pt-4">
                <Link to="/financial-enquiry?type=sri-nithya" className="bg-[#123524] text-[#FFFDF8] px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#1E5631] transition-all inline-flex items-center gap-2 group shadow-lg hover:shadow-emerald-900/20">
                  <motion.span whileHover={{ y: -2 }} className="flex items-center gap-2">
                    KNOW MORE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: SANGHAMITHRA SAVINGS PLAN */}
        <section id="sanghamithra-savings-plan" className="bg-white py-8 md:py-12">
          <div className="max-w-[1440px] mx-auto px-10 md:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="relative lg:order-2 transition-all duration-500"
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-[16/10] group">
                <motion.img 
                  src="/img/san.png" 
                  alt="Sanghamithra" 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-[#051128]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-6 lg:order-1"
            >
              <div className="space-y-3">
                <span className="text-[#c9a34a] font-bold tracking-[0.2em] uppercase text-[10px] block">Wealth Creation</span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#0B1F4D] leading-tight tracking-tight">SANGHAMITHRA <br />SAVINGS PLAN</h2>
              </div>
              <p className="text-gray-600 text-base leading-relaxed font-medium">
                Build long-term wealth through structured monthly investments. Designed for families and individuals, this scheme offers high returns and special bonus benefits for consistent savings.
              </p>
              <motion.div variants={staggerChildren} className="grid grid-cols-2 gap-y-4">
                {['Long-term wealth', 'Bonus benefits', 'High returns', 'Disciplined savings'].map((point, pIdx) => (
                  <motion.div key={pIdx} variants={fadeUp} className="flex items-center gap-3 group">
                    <CheckCircle2 className="w-4 h-4 text-[#c9a34a] group-hover:scale-120 transition-transform" />
                    <span className="text-gray-700 font-semibold text-sm group-hover:text-[#c9a34a] transition-colors">{point}</span>
                  </motion.div>
                ))}
              </motion.div>
              <div className="pt-4">
                <Link to="/financial-enquiry?type=sanghamithra" className="bg-[#c9a34a] text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all inline-flex items-center gap-2 group shadow-lg hover:shadow-gold/20">
                  <motion.span whileHover={{ y: -2 }} className="flex items-center gap-2">
                    KNOW MORE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: KAMADHENU FIXED DEPOSIT (KFD) */}
        <section id="kamadhenu-fixed-deposit" className="bg-[#f8f5ec] py-8 md:py-12">
          <div className="max-w-[1440px] mx-auto px-10 md:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className="relative transition-all duration-500 lg:order-2"
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-[16/10] group">
                <motion.img 
                  src="/img/kama.png" 
                  alt="Kamadhenu KFD" 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-6 lg:order-1"
            >
              <div className="space-y-3">
                <span className="text-[#c9a34a] font-bold tracking-[0.2em] uppercase text-[10px] block">Secure Investments</span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#0B1F4D] leading-tight tracking-tight">KAMADHENU FIXED <br />DEPOSIT (KFD)</h2>
              </div>
              <p className="text-gray-600 text-base leading-relaxed font-medium">
                Secure your future with our fixed deposit scheme offering stable returns and minimum investment starting from ₹12,000. Ideal for individuals seeking guaranteed returns and financial security.
              </p>
              <motion.div variants={staggerChildren} className="grid grid-cols-2 gap-y-4">
                {['Assured returns', 'Stable growth', 'Flexible tenure', 'Secure & trusted'].map((point, pIdx) => (
                  <motion.div key={pIdx} variants={fadeUp} className="flex items-center gap-3 group">
                    <CheckCircle2 className="w-4 h-4 text-[#c9a34a] group-hover:scale-120 transition-transform" />
                    <span className="text-gray-700 font-semibold text-sm group-hover:text-[#c9a34a] transition-colors">{point}</span>
                  </motion.div>
                ))}
              </motion.div>
              <div className="pt-4">
                <Link to="/financial-enquiry?type=kfd" className="bg-[#051128] text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all inline-flex items-center gap-2 group shadow-lg hover:shadow-navy/20">
                  <motion.span whileHover={{ y: -2 }} className="flex items-center gap-2">
                    KNOW MORE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: KAMADHENU TERM DEPOSIT */}
        <section id="kamadhenu-term-deposit" className="bg-white py-8 md:py-12">
          <div className="max-w-[1440px] mx-auto px-10 md:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className="relative lg:order-2 transition-all duration-500"
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-[16/10] group">
                <motion.img 
                  src="/img/term.png" 
                  alt="Kamadhenu Term Deposit" 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-[#051128]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-6 lg:order-1"
            >
              <div className="space-y-3">
                <span className="text-[#c9a34a] font-bold tracking-[0.2em] uppercase text-[10px] block">High Returns</span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#0B1F4D] leading-tight tracking-tight">KAMADHENU TERM <br />DEPOSIT</h2>
              </div>
              <p className="text-gray-600 text-base leading-relaxed font-medium">
                Experience superior growth with our high-return term deposit plans offering up to 12% annual interest. Designed for long-term investors aiming for maximum profitability.
              </p>
              <motion.div variants={staggerChildren} className="grid grid-cols-2 gap-y-4">
                {['High returns', 'Secure plan', 'Long-term growth', 'Better future'].map((point, pIdx) => (
                  <motion.div key={pIdx} variants={fadeUp} className="flex items-center gap-3 group">
                    <CheckCircle2 className="w-4 h-4 text-[#c9a34a] group-hover:scale-120 transition-transform" />
                    <span className="text-gray-700 font-semibold text-sm group-hover:text-[#c9a34a] transition-colors">{point}</span>
                  </motion.div>
                ))}
              </motion.div>
              <div className="pt-4">
                <Link to="/financial-enquiry?type=term-deposit" className="bg-[#c9a34a] text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all inline-flex items-center gap-2 group shadow-lg hover:shadow-gold/20">
                  <motion.span whileHover={{ y: -2 }} className="flex items-center gap-2">
                    KNOW MORE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* ── SECTION 7: CALL TO ACTION ─────────────────────────────── */}
      <section className="px-10 md:px-20 pt-[20px] mb-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={zoomIn}
          className="max-w-[1440px] mx-auto bg-gradient-to-br from-[#051128] to-[#123524] rounded-[1.5rem] p-6 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 border border-white/10 shadow-2xl group/cta"
        >
          {/* Animated Background Pulse */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full bg-[#c9a34a]/10 blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
             <motion.div 
               whileHover={{ rotate: 360, scale: 1.1 }}
               transition={{ duration: 0.8, ease: "anticipate" }}
               className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center shrink-0 shadow-inner"
             >
               <Sprout className="w-10 h-10 md:w-16 md:h-16 text-[#c9a34a]" />
             </motion.div>
             <div>
               <motion.p variants={fadeUp} className="text-[#c9a34a] font-bold tracking-[0.2em] uppercase text-[12px] mb-2 font-inter">READY TO GROW?</motion.p>
               <motion.h2 variants={fadeUp} className="text-2xl md:text-[3.5rem] font-bold text-white leading-tight tracking-tight">Secure Your Financial <br className="hidden md:block" />Future with Us</motion.h2>
               <motion.p variants={fadeUp} className="text-white/70 text-[15px] mt-4 max-w-xl leading-relaxed font-medium">
                 Join thousands of members who trust Kalpavruksha for their savings and investment needs. 
                 Transparent policies, secure systems, and expert guidance.
               </motion.p>
             </div>
          </div>

          <motion.div 
            variants={staggerChildren}
            className="relative z-10 flex flex-col sm:flex-row gap-6 w-full md:w-auto shrink-0"
          >
            <motion.div variants={fadeUp}>
              <Link to="/membership" className="bg-[#123524] border-2 border-[#C9A13B] text-[#FFFDF8] px-6 md:px-10 py-3.5 md:py-5 rounded-full font-bold text-xs md:text-sm flex items-center justify-center gap-3 hover:bg-[#1E5631] transition-all shadow-xl group/btn relative overflow-hidden">
                <motion.span whileHover={{ scale: 1.03 }} className="flex items-center gap-3">
                  Get Started Now <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </motion.span>
                <motion.div 
                  className="absolute inset-0 bg-white/10"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </Link>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link to="/legal" className="bg-transparent border-2 border-[#C9A13B] text-white px-6 md:px-10 py-3.5 md:py-5 rounded-full font-bold text-xs md:text-sm flex items-center justify-center gap-3 hover:bg-[#C9A13B]/10 transition-all group/btn">
                <motion.span whileHover={{ scale: 1.03 }} className="flex items-center gap-3">
                  Legal Framework <FileText size={20} className="text-[#C9A13B]" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
};

export default DivFin;
