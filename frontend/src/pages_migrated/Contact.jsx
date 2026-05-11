import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Linkedin,
  Globe,
  Handshake,
  Leaf,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight
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

const Contact = () => {
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
      <section ref={heroRef} className="relative min-h-[450px] md:h-[550px] flex items-center pt-[20px] overflow-hidden bg-[#001a3d]">
        <motion.div style={{ y: heroBgY, opacity: heroOpacity }} className="absolute inset-0 flex justify-end">
          <div
            className="w-full md:w-3/4 h-full bg-cover bg-center opacity-40 md:opacity-100"
            style={{
              backgroundImage: 'url("/img/contact_hero.png")',
              maskImage: 'linear-gradient(to right, transparent, black 40%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)'
            }}
          />
        </motion.div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full flex flex-col items-center md:items-start">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="w-full flex flex-col items-center md:items-start"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold" />
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-gold" />
                <Leaf className="w-4 h-4 text-gold" />
                <div className="w-1 h-1 rounded-full bg-gold" />
              </div>
              <div className="w-12 h-[1px] bg-gold" />
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-[5rem] font-bold text-white leading-tight mb-6 tracking-tight text-center md:text-left">
              Contact <span className="text-gold">Us</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
              <div className="w-12 h-[1px] bg-gold" />
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-gold" />
                <Leaf className="w-4 h-4 text-gold" />
                <div className="w-1 h-1 rounded-full bg-gold" />
              </div>
              <div className="w-12 h-[1px] bg-gold" />
            </motion.div>

            <motion.p variants={fadeUp} className="text-base md:text-xl text-white/80 max-w-xl font-medium leading-relaxed drop-shadow-md text-center md:text-left px-4 md:px-0">
              Reach out to our team and leadership for collaboration, support, or inquiries.
            </motion.p>
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-[#fdfdfd]"
          style={{
            clipPath: 'ellipse(70% 100% at 50% 100%)',
            borderTop: '3px solid #c5a059'
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold opacity-50 blur-[2px]" />
      </section>

      {/* ── SECTION 2: LEADERSHIP ──────────────────────────────────── */}
      <section className="pt-[20px] pb-12 max-w-[1200px] mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-8"
        >
          <span className="text-gold font-black tracking-[0.5em] uppercase text-[11px] block mb-4">Our Leadership</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F4D] leading-tight tracking-tight">
            Guided by <span className="text-gold">Excellence</span>
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
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {[
            {
              name: 'Dr. R. Ramachandra',
              role: 'Chairman',
              img: '/img/leader_chairman.png',
              bio: 'Visionary leader dedicated to sustainable rural development and cooperative growth.'
            },
            {
              name: 'Mr. S. K. Murthy',
              role: 'CEO',
              img: '/img/leader_ceo.png',
              bio: 'Strategic expert with 20+ years of experience in cooperative finance and management.'
            },
            {
              name: 'Ms. Lakshmi Devi',
              role: 'COO',
              img: '/img/leader_coo.png',
              bio: 'Operational specialist focused on optimizing community-driven service ecosystems.'
            }
          ].map((leader, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeUp}
              whileHover={{ y: -6, shadow: "0 40px 80px -20px rgba(0,0,0,0.1)", borderColor: "rgba(197, 160, 89, 0.2)" }}
              className="group bg-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center transition-all duration-500"
            >
              <div className="relative mb-8">
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10 group-hover:border-gold/20 transition-all duration-500">
                  <motion.img 
                    src={leader.img} 
                    alt={leader.name} 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
              <h3 className="text-2xl font-bold text-[#0B1F4D] mb-2 tracking-tight">{leader.name}</h3>
              <span className="text-xs font-black text-gold uppercase tracking-[0.3em] mb-4 block">{leader.role}</span>
              <div className="w-8 h-[1px] bg-gold mb-6 opacity-30" />
              <p className="text-gray-500 text-[13px] leading-relaxed font-medium mb-8 max-w-[240px]">
                {leader.bio}
              </p>
              <div className="flex gap-4">
                <motion.a whileHover={{ scale: 1.1, backgroundColor: "#001a3d", color: "#fff" }} href="#" className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 transition-all shadow-sm">
                  <Linkedin size={20} />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1, backgroundColor: "#001a3d", color: "#fff" }} href="#" className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 transition-all shadow-sm">
                  <Instagram size={20} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── SECTION 3: CONTACT GRID ────────────────────────────────── */}
      <section className="pt-[20px] pb-12 max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Left: Get In Touch */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-[#001a3d] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10 space-y-10">
            <div className="flex items-center gap-6">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-lg"
              >
                <Phone className="w-7 h-7 text-[#001a3d]" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white tracking-tight">Get In Touch</h2>
            </div>

            <p className="text-white/60 font-medium leading-relaxed max-w-md text-sm">
              We're here to help and answer any questions you may have. Feel free to reach out to us through any of the following.
            </p>

            <motion.div 
              variants={staggerChildren}
              className="space-y-4"
            >
              {[
                { icon: Phone, label: 'Phone & Email', val: ['+91 98765 43210', 'info@kalpavruksha.coop'] },
                { icon: MapPin, label: 'Office Address', val: ['Kalpavruksha Cooperative Bhavan', 'Survey No. 45, Eco Village Road, Hyderabad'] },
                { icon: Clock, label: 'Working Hours', val: ['Mon – Sat: 9:00 AM – 6:00 PM', 'Sunday: Closed'] }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUp}
                  whileHover={{ y: -4, backgroundColor: '#c5a059' }}
                  className="bg-white rounded-[2rem] p-6 flex items-center gap-6 group transition-all duration-500 cursor-default shadow-lg"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-[#001a3d] transition-all">
                    <item.icon className="w-6 h-6 text-[#001a3d] group-hover:text-gold transition-all" />
                  </div>
                  <div>
                    <p className="text-forest text-[11px] font-black uppercase tracking-[0.2em] mb-1 group-hover:text-white transition-all">{item.label}</p>
                    {item.val.map((v, idx) => (
                      <p key={idx} className="text-forest font-bold text-sm leading-snug group-hover:text-white transition-all">{v}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Send Message */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-gray-100 relative"
        >
          <div className="flex flex-col mb-10">
            <div className="flex items-center gap-6 mb-4">
              <motion.div 
                whileHover={{ rotate: -15, scale: 1.1 }}
                className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-sm"
              >
                <Mail className="w-7 h-7 text-[#001a3d]" />
              </motion.div>
              <h2 className="text-4xl font-bold text-[#0B1F4D] tracking-tight">Send Us a Message</h2>
            </div>
            <div className="w-16 h-[2px] bg-gold ml-20" />
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input type="text" className="w-full bg-[#f8f9fa] border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all shadow-inner" placeholder="Your Name" />
              <input type="email" className="w-full bg-[#f8f9fa] border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all shadow-inner" placeholder="Your Email" />
            </div>
            <input type="text" className="w-full bg-[#f8f9fa] border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all shadow-inner" placeholder="Subject" />
            <textarea rows={4} className="w-full bg-[#f8f9fa] border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all resize-none shadow-inner" placeholder="Your Message"></textarea>

            <motion.button 
              whileHover={{ scale: 1.03, backgroundColor: "#001a3d", color: "#fff" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#f7b955] text-forest py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-gold/20 group"
            >
              Send Message <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* ── SECTION 3.5: WHATSAPP BANNER ───────────────────────────────────── */}
      <section className="px-6 pt-[20px] pb-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-[1200px] mx-auto bg-[#f0f9f4] rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-lg border border-emerald-100"
        >
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <motion.div 
              variants={fadeUp}
              className="inline-block bg-[#25D366] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm"
            >
              Instant Chat
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-[#0B1F4D] tracking-tight text-center md:text-left">
              Chat with us on WhatsApp
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-sm md:text-base font-medium">
              Click the button or icon to start an instant conversation with the Kalpavruksha team.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
              <motion.a
                whileHover={{ y: -3, backgroundColor: "#1ebc59" }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] text-white px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#25D366]/20 w-max"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12.031 6.172c-2.32 0-4.519.903-6.16 2.544-1.64 1.64-2.542 3.841-2.542 6.162 0 1.564.433 3.134 1.253 4.513l-1.341 4.904 5.025-1.319c1.328.727 2.812 1.11 4.316 1.11 2.321 0 4.519-.903 6.16-2.544 1.64-1.64 2.542-3.841 2.542-6.163 0-4.789-3.891-8.717-8.753-8.717zm4.49 12.33c-.66.66-1.538 1.023-2.47 1.023-.604 0-1.202-.152-1.729-.44l-.24-.132-2.83.742.754-2.758-.145-.23c-.347-.549-.53-1.184-.53-1.838 0-.932.363-1.81 1.023-2.47.66-.66 1.538-1.023 2.47-1.023.931 0 1.81.363 2.47 1.023.66.66 1.023 1.538 1.023 2.47 0 .933-.363 1.811-1.023 2.471z" />
                </svg>
                Open WhatsApp
              </motion.a>
              <span className="text-gray-400 text-sm font-medium">or click the icon</span>
            </motion.div>
          </div>

          {/* Right WhatsApp Icon Card */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={zoomIn}
            className="bg-white p-5 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col items-center shrink-0 border border-gray-50"
          >
            <motion.a 
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              className="bg-[#25D366] p-4 rounded-2xl mb-4 cursor-pointer flex items-center justify-center w-32 h-32 md:w-40 md:h-40"
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-16 h-16 md:w-20 md:h-20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </motion.a>
            <p className="text-[#001a3d] font-black tracking-widest text-[13px] mb-1">+91 00000 00000</p>
            <p className="text-gray-400 text-[10px] font-medium tracking-wide uppercase">Click to chat on WhatsApp</p>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
};

export default Contact;
