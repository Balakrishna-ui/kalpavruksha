import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF9F6] text-black py-24 px-6 relative border-t border-forest/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
              <img src="/img/logoo.PNG" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-forest">Kalpavruksha</span>
          </div>
          <p className="text-black/60 leading-relaxed text-sm font-medium">
            A cooperative ecosystem rooted in community, growing towards prosperity through agriculture, finance, and industrial innovation.
          </p>
        </div>

        <div>
          <h5 className="text-black font-black uppercase tracking-[0.3em] text-[10px] mb-8">Quick Links</h5>
          <ul className="space-y-5 text-black/70 font-medium text-sm">
            <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li><Link to="/divisions" className="hover:text-gold transition-colors">Divisions</Link></li>
            <li><Link to="/products" className="hover:text-gold transition-colors">Products</Link></li>
            <li><Link to="/projects" className="hover:text-gold transition-colors">Projects</Link></li>
            <li><Link to="/services" className="hover:text-gold transition-colors">Services</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            <li><Link to="/allied-services" className="hover:text-gold transition-colors">Allied Services</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-black font-black uppercase tracking-[0.3em] text-[10px] mb-8">Member Services</h5>
          <ul className="space-y-5 text-black/70 font-medium text-sm">
            <li><Link to="/membership" className="hover:text-gold transition-colors">Join Us</Link></li>
            <li><a href="#" className="hover:text-gold transition-colors">Member Login</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Annual Reports</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Grievance</a></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-black font-black uppercase tracking-[0.3em] text-[10px] mb-8">Newsletter</h5>
          <p className="text-black/60 mb-8 text-sm font-medium">Stay updated with our latest missions and village development programs.</p>
          <div className="flex bg-forest/5 rounded-full p-1 border border-forest/10 hover:border-gold/30 transition-colors">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-transparent border-none focus:ring-0 flex-1 px-5 text-sm font-medium text-black"
            />
            <button className="bg-forest text-white px-8 py-3 rounded-full hover:bg-gold transition-all font-black text-[10px] uppercase tracking-widest shadow-lg">
              Join
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-forest/10 text-center text-black/40 text-[10px] font-bold uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} Kalpavruksha Cooperative Ecosystem. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
