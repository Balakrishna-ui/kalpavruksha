import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {{
  return (
    <footer className="bg-forest text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white rounded-full p-1">
              <img src="/img/logoo.PNG" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Kalpavruksha</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            A cooperative ecosystem rooted in community, growing towards prosperity through agriculture, finance, and industrial innovation.
          </p>
        </div>

        <div>
          <h5 className="text-gold font-bold mb-6 italic">Quick Links</h5>
          <ul className="space-y-4 text-gray-300">
            <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link to="/divisions" className="hover:text-gold transition-colors">Divisions</Link></li>
            <li><Link to="/services" className="hover:text-gold transition-colors">Services</Link></li>
            <li><Link to="/projects" className="hover:text-gold transition-colors">Projects</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-gold font-bold mb-6 italic">Member Services</h5>
          <ul className="space-y-4 text-gray-300">
            <li><Link to="/membership" className="hover:text-gold transition-colors">Join Us</Link></li>
            <li><a href="#" className="hover:text-gold transition-colors">Member Login</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Annual Reports</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Grievance</a></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-gold font-bold mb-6 italic">Newsletter</h5>
          <p className="text-gray-300 mb-6">Stay updated with our latest missions and village development programs.</p>
          <div className="flex bg-white/10 rounded-lg p-1">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-transparent border-none focus:ring-0 flex-1 px-4 text-sm"
            />
            <button className="bg-gold text-white px-4 py-2 rounded-md hover:bg-white hover:text-forest transition-all font-semibold">
              Join
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Kalpavruksha Cooperative Ecosystem. All rights reserved.</p>
      </div>
    </footer>
  );
}};

export default Footer;
