import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Youtube,
  Globe,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerChildren: any = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-16 pb-12 text-[#001a3d] overflow-hidden border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 md:gap-x-12 md:gap-y-16 lg:gap-16 mb-20"
        >
          {/* Brand Column */}
          <motion.div variants={fadeUp} className="space-y-8 col-span-2 md:col-span-1">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-gray-100 p-2">
                <img src="/img/logoo.PNG" alt="Kalpavruksha Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tighter block leading-none uppercase">Kalpavruksha</span>
                <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.2em]">Co-operative Society Ltd.</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Building communities, empowering growth, and enriching lives across South Telangana through collective effort and innovation.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube, Globe].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  whileHover={{ scale: 1.1, backgroundColor: "#c5a059", color: "#fff" }}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#001a3d]/5 border border-[#001a3d]/10 flex items-center justify-center text-gray-400 transition-all shadow-sm"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="col-span-1">
            <h4 className="text-xs font-black text-[#c5a059] uppercase tracking-[0.2em] mb-6 md:mb-10">Quick Links</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-500">
              {['Home', 'About Us', 'Divisions', 'Products', 'Projects', 'Services', 'Contact'].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`} 
                    className="hover:text-[#c5a059] transition-colors relative group"
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeUp} className="col-span-1">
            <h4 className="text-xs font-black text-[#c5a059] uppercase tracking-[0.2em] mb-6 md:mb-10">Our Services</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-500">
              {['Business Promotion', 'Content & Branding', 'Social Media Management', 'Paid Advertising', 'Influencer Support', 'Video & Reels Strategy'].map((link, i) => (
                <li key={i}>
                  <Link to="#" className="hover:text-[#c5a059] transition-colors relative group">
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div variants={fadeUp} className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-black text-[#c5a059] uppercase tracking-[0.2em] mb-6 md:mb-10">Contact Us</h4>
            <ul className="space-y-6 text-sm font-medium text-gray-500">
              <li className="flex gap-4 group">
                <MapPin className="w-5 h-5 text-[#c5a059] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-[#c5a059] transition-colors leading-relaxed">
                  First Floor, Ganesh Bhavan - VHP Office, Near Delhi Olympiad School, Shiva Shakti Nagar, Palamuru – 509001
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <Phone className="w-5 h-5 text-[#c5a059] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-[#c5a059] transition-colors">+91 00000 00000</span>
              </li>
              <li className="flex items-center gap-4 group">
                <Mail className="w-5 h-5 text-[#c5a059] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-[#c5a059] transition-colors">info@kalpavruksha.coop</span>
              </li>
              <li className="flex items-center gap-4 group">
                <Globe className="w-5 h-5 text-[#c5a059] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-[#c5a059] transition-colors">www.kalpavruksha.coop</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]"
        >
          <p>© {new Date().getFullYear()} Kalpavruksha Co-operative Society Ltd. All Rights Reserved.</p>
          <div className="flex gap-10">
            <Link to="#" className="hover:text-[#c5a059] transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-[#c5a059] transition-colors">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
