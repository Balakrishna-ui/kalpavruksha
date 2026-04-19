import React from 'react';
import { Mail, Phone, MapPin, Clock, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="page bg-[#fcfbf9]">
      <div className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: 'url("/assets/contact_banner_premium_1776491517390.png")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-forest/80 to-forest/40 backdrop-blur-[2px]"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl">
            Contact <span className="text-gold">Us</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
            Reach out to our team and leadership for collaboration, support, or inquiries
          </p>
        </div>
      </div>

      <div className="page-body">
        {/* Leadership Section */}
        <section className="mb-12">
          <div className="text-center mb-10">
            <span className="sec-lbl">Our Leadership</span>
            <h2 className="sec-h">Guided by <span>Excellence</span></h2>
          </div>

          <div className="leader-grid">
            <div className="leader-card group">
              <div className="leader-img-wrap">
                <img src="/img/leader_chairman.png" alt="Dr. R. Ramachandra" className="group-hover:scale-110 duration-700" />
              </div>
              <div className="leader-info">
                <h3 className="leader-name">Dr. R. Ramachandra</h3>
                <span className="leader-title">Chairman</span>
                <p className="text-sm text-gray-500 mt-4 leading-relaxed">Visionary leader dedicated to sustainable rural development and cooperative growth.</p>
                <div className="mt-6 flex gap-3">
                  <a href="#" className="p-2 bg-gray-50 text-gray-400 hover:text-gold hover:bg-gold/5 rounded-xl transition-all"><Linkedin size={18} /></a>
                </div>
              </div>
            </div>

            <div className="leader-card group">
              <div className="leader-img-wrap">
                <img src="/img/leader_ceo.png" alt="Mr. S. K. Murthy" className="group-hover:scale-110 duration-700" />
              </div>
              <div className="leader-info">
                <h3 className="leader-name">Mr. S. K. Murthy</h3>
                <span className="leader-title">CEO</span>
                <p className="text-sm text-gray-500 mt-4 leading-relaxed">Strategic expert with 20+ years of experience in cooperative finance and management.</p>
                <div className="mt-6 flex gap-3">
                  <a href="#" className="p-2 bg-gray-50 text-gray-400 hover:text-gold hover:bg-gold/5 rounded-xl transition-all"><Linkedin size={18} /></a>
                </div>
              </div>
            </div>

            <div className="leader-card group">
              <div className="leader-img-wrap">
                <img src="/img/leader_coo.png" alt="Ms. Lakshmi Devi" className="group-hover:scale-110 duration-700" />
              </div>
              <div className="leader-info">
                <h3 className="leader-name">Ms. Lakshmi Devi</h3>
                <span className="leader-title">COO</span>
                <p className="text-sm text-gray-500 mt-4 leading-relaxed">Operational specialist focused on optimizing community-driven service ecosystems.</p>
                <div className="mt-6 flex gap-3">
                  <a href="#" className="p-2 bg-gray-50 text-gray-400 hover:text-gold hover:bg-gold/5 rounded-xl transition-all"><Linkedin size={18} /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-10">
            <div className="flex gap-6 items-start">
              <div className="p-4 bg-forest/5 text-forest rounded-2xl"><Phone size={24} /></div>
              <div>
                <h3 className="text-lg font-black text-forest mb-1">Phone & Email</h3>
                <p className="text-sm text-gray-500">+91 98765 43210</p>
                <p className="text-sm text-gray-500">info@kalpavruksha.coop</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="p-4 bg-forest/5 text-forest rounded-2xl"><MapPin size={24} /></div>
              <div>
                <h3 className="text-lg font-black text-forest mb-1">Office Address</h3>
                <p className="text-sm text-gray-500 line-clamp-1">Kalpavruksha Cooperative Bhavan</p>
                <p className="text-sm text-gray-500">Survey No. 45, Eco Village Road, Hyderabad, Telangana</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="p-4 bg-forest/5 text-forest rounded-2xl"><Clock size={24} /></div>
              <div>
                <h3 className="text-lg font-black text-forest mb-1">Working Hours</h3>
                <p className="text-sm text-gray-500">Mon – Sat: 9:00 AM – 6:00 PM</p>
                <p className="text-sm text-gray-500">Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="relative group rounded-[40px] overflow-hidden border border-gray-100 shadow-sm">
            <div className="absolute inset-0 bg-forest/20 backdrop-blur-sm z-10 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
              <button className="bg-white text-forest px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-xl">Interactive Map Coming Soon</button>
            </div>
            <div 
              className="h-full min-h-[400px] w-full bg-cover bg-center grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              style={{ backgroundImage: 'url("/img/banner.jpeg")' }}
            ></div>
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <button className="w-full bg-forest text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gold transition-all shadow-xl">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
