import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Handshake, 
  ArrowRight,
  Leaf
} from 'lucide-react';

const Projects = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="w-full selection:bg-[#C9A13B]/30 selection:text-[#0B1F4D]">
      <section className="page !pt-0 bg-[#F7F3E8] overflow-x-hidden" id="page-projects">
        {/* SECTION 1 — HERO / PAGE INTRO */}
        <div ref={heroRef} className="relative h-[40vh] md:h-[320px] flex items-center justify-center overflow-hidden pt-[80px] md:pt-0 bg-[#0B1F4D]">
          {/* Parallax Background Image */}
          <motion.div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-60"
            style={{ 
              backgroundImage: 'url("/img/pro.png")',
              y: heroBgY
            }}
          ></motion.div>
          {/* Deep Navy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F4D]/40 to-[#0B1F4D]/80 backdrop-blur-[1px]"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center px-6 py-6 max-w-4xl mx-auto flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-3xl md:text-6xl font-bold text-white mb-2 md:mb-4 tracking-tight drop-shadow-2xl"
            >
              Our <span className="text-[#C9A13B]">Projects</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              className="text-sm md:text-xl text-white/80 font-medium max-w-2xl mx-auto drop-shadow-lg leading-relaxed"
            >
              Transforming communities through purposeful action
            </motion.p>
          </div>
        </div>
        
        <div className="page-body px-6 md:px-20 py-12">
          {/* SECTION 2 — ONGOING PROJECT */}
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center mb-12 font-inter">
            {/* Left Side - Text */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 w-full space-y-6"
            >
              <div>
                <span className="inline-block px-4 py-1.5 bg-[#C9A13B]/10 text-[#C9A13B] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 border border-[#C9A13B]/20">
                  Ongoing Project
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#0B1F4D] leading-tight tracking-tight">
                  Mana Palle <span className="text-[#C9A13B]">Phase 1</span>
                </h2>
              </div>
              
              <div className="space-y-4 text-[#6B7280] leading-relaxed text-base md:text-lg pb-6 border-b border-[#EFE7D2]">
                <p>
                  <strong className="text-[#1E1E1E]">Vision & Concept:</strong> A self-sustaining eco-village combining modern amenities with rural serenity.
                </p>
                <p>
                  Construction of 120 eco-friendly homes in the first phase of our sustainable village project.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-[#0B1F4D]">Development Stage</span>
                  <span className="text-[#C9A13B]">68% Complete</span>
                </div>
                {/* Animated Progress Bar */}
                <div className="w-full bg-[#EFE7D2] rounded-full h-3 overflow-hidden shadow-inner relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '68%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="bg-[#123524] h-3 rounded-full relative"
                  >
                    {/* Gold Gradient Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-[#C9A13B]/30 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Image with Hover Effect */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 w-full"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative group p-2 bg-white rounded-3xl border border-[#C9A13B]/20 shadow-xl shadow-[#C9A13B]/5 transition-all duration-500 hover:shadow-2xl hover:shadow-[#C9A13B]/10 hover:border-[#C9A13B]"
              >
                <img 
                  src="/img/mana_hero.png" 
                  alt="Mana Palle Eco Village" 
                  loading="lazy"
                  className="w-full h-[200px] md:h-[280px] object-cover rounded-2xl transition-transform duration-700"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* SECTION 3 — PROJECT GALLERY */}
          <div className="max-w-7xl mx-auto font-inter pt-8 border-t border-[#EFE7D2] mb-12">
            <motion.h3 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-2xl md:text-3xl font-bold text-[#0B1F4D] mb-10 text-center tracking-tight flex items-center justify-center gap-4"
            >
              <span className="w-10 h-px bg-[#D8B45A]"></span>
              Project Gallery
              <span className="w-10 h-px bg-[#D8B45A]"></span>
            </motion.h3>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8"
            >
              {[
                { src: "/img/mana_eco.png", alt: "Village homes" },
                { src: "/img/mana_agri.png", alt: "Agriculture land" },
                { src: "/img/pro2.jpg", alt: "Modern tractor farming" }
              ].map((img, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="overflow-hidden rounded-2xl shadow-sm hover:shadow-xl hover:shadow-[#C9A13B]/10 transition-all duration-500 group border border-[#C9A13B]/20 bg-white p-1"
                >
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={img.src} 
                    alt={img.alt} 
                    loading="lazy"
                    className="w-full h-[160px] md:h-[280px] object-cover rounded-xl transition-transform duration-500 ease-out"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* SECTION 4 — “BUILDING A BETTER TOMORROW” */}
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#0B1F4D] to-[#123524] rounded-[2.5rem] py-6 px-10 md:px-16 flex flex-col lg:flex-row items-center gap-8 mb-10 shadow-2xl relative overflow-hidden group">
            {/* Decorative Patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-[#C9A13B]/5 transition-colors duration-1000"></div>
            
            <div className="lg:w-1/3 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-[#D8B45A]/20 pb-4 lg:pb-0 lg:pr-8 relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight tracking-tight">
                  Building a <br />Better Tomorrow
                </h3>
                <div className="w-12 h-1 bg-[#D8B45A] my-4 rounded-full"></div>
                <p className="text-[#C9A13B] text-lg md:text-2xl font-bold mt-2">
                  Through Sustainable Projects
                </p>
              </motion.div>

              {/* SECTION 5 — CTA / BUTTONS (Enhanced) */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="pt-4"
              >
                <button className="bg-[#123524] text-[#FFFDF8] px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-[#1E5631] hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(30,86,49,0.3)] transition-all duration-300 group shadow-lg">
                  Explore Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 relative z-10"
            >
              {[
                { icon: ShieldCheck, title: 'Environment Protection', desc: 'Preserving natural resources for future generations.' },
                { icon: Users, title: 'Community Empowerment', desc: 'Creating opportunities and improving quality of life.' },
                { icon: TrendingUp, title: 'Economic Growth', desc: 'Driving sustainable development and local prosperity.' },
                { icon: Handshake, title: 'Long-term Impact', desc: 'Projects designed to create lasting positive change.' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center text-center space-y-2 px-4 group/card"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#FFFDF8] flex items-center justify-center shadow-lg transition-all duration-500 group-hover/card:bg-[#EFE7D2] group-hover/card:scale-110">
                    <item.icon className="w-7 h-7 text-[#C9A13B] group-hover/card:text-[#1E5631] transition-colors duration-300" />
                  </div>
                  <h4 className="text-[11px] font-black text-white tracking-widest uppercase transition-colors duration-300 group-hover/card:text-[#C9A13B]">{item.title}</h4>
                  <p className="text-[11px] text-white/50 font-medium leading-relaxed max-w-[150px] transition-colors duration-300 group-hover/card:text-white/80">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>


        </div>
      </section>
    </div>
  );
};

export default Projects;
