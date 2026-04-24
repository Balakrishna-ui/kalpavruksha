import React from 'react';
import { Mail, Phone, MapPin, Clock, Linkedin, Instagram } from 'lucide-react';

const Contact = () => {
  return (
    <div className="page bg-[#fcfbf9] !pt-0">
      <div className="relative h-[50vh] md:h-[400px] flex items-center justify-center overflow-hidden pt-[80px] md:pt-0">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: 'url("/assets/contact_banner_premium_1776491517390.png")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-forest/80 to-forest/40 backdrop-blur-[2px]"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 py-6 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 md:mb-4 tracking-tighter drop-shadow-2xl">
            Contact <span className="text-gold">Us</span>
          </h1>
          <p className="text-white/80 text-sm md:text-xl font-medium max-w-2xl mx-auto drop-shadow-lg leading-relaxed px-4 md:px-0">
            Reach out to our team and leadership for collaboration, support, or inquiries
          </p>
        </div>
      </div>

      <div className="page-body !py-8 md:!py-16">
        {/* Leadership Section */}
        <section className="mb-12 md:mb-24">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-gold font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Our Leadership</span>
            <h2 className="text-3xl md:text-5xl font-black text-forest mb-6 tracking-tight">Guided by <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-gold">Excellence</span></h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
          </div>

          {/* Leadership Grid / Carousel */}
          <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-8 md:pb-0 scrollbar-hide px-4 md:px-0">
            
            {/* Dr. R. Ramachandra */}
            <div className="min-w-[280px] md:min-w-0 snap-center bg-white rounded-[32px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-3 border border-gray-100 flex flex-col items-center text-center group">
              <div className="relative mb-6 md:mb-8">
                <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full scale-0 group-hover:scale-125 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 group-hover:border-gold/20 transition-all duration-500">
                  <img src="/img/leader_chairman.png" alt="Dr. R. Ramachandra" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-forest mb-1 group-hover:text-gold transition-colors">Dr. R. Ramachandra</h3>
              <span className="text-[10px] md:text-xs font-black text-gold uppercase tracking-[0.2em] mb-4">Chairman</span>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium">Visionary leader dedicated to sustainable rural development and cooperative growth.</p>
              <div className="flex gap-3 md:gap-4">
                <a href="#" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-white hover:bg-[#0077b5] rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-sm">
                  <Linkedin size={18} className="md:w-5 md:h-5" />
                </a>
                <a href="#" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-white hover:bg-[#E4405F] rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-sm">
                  <Instagram size={18} className="md:w-5 md:h-5" />
                </a>
              </div>
            </div>

            {/* Mr. S. K. Murthy */}
            <div className="min-w-[280px] md:min-w-0 snap-center bg-white rounded-[32px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-3 border border-gray-100 flex flex-col items-center text-center group">
              <div className="relative mb-6 md:mb-8">
                <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full scale-0 group-hover:scale-125 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 group-hover:border-gold/20 transition-all duration-500">
                  <img src="/img/leader_ceo.png" alt="Mr. S. K. Murthy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-forest mb-1 group-hover:text-gold transition-colors">Mr. S. K. Murthy</h3>
              <span className="text-[10px] md:text-xs font-black text-gold uppercase tracking-[0.2em] mb-4">CEO</span>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium">Strategic expert with 20+ years of experience in cooperative finance and management.</p>
              <div className="flex gap-3 md:gap-4">
                <a href="#" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-white hover:bg-[#0077b5] rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-sm">
                  <Linkedin size={18} className="md:w-5 md:h-5" />
                </a>
                <a href="#" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-white hover:bg-[#E4405F] rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-sm">
                  <Instagram size={18} className="md:w-5 md:h-5" />
                </a>
              </div>
            </div>

            {/* Ms. Lakshmi Devi */}
            <div className="min-w-[280px] md:min-w-0 snap-center bg-white rounded-[32px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-3 border border-gray-100 flex flex-col items-center text-center group">
              <div className="relative mb-6 md:mb-8">
                <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full scale-0 group-hover:scale-125 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 group-hover:border-gold/20 transition-all duration-500">
                  <img src="/img/leader_coo.png" alt="Ms. Lakshmi Devi" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-forest mb-1 group-hover:text-gold transition-colors">Ms. Lakshmi Devi</h3>
              <span className="text-[10px] md:text-xs font-black text-gold uppercase tracking-[0.2em] mb-4">COO</span>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium">Operational specialist focused on optimizing community-driven service ecosystems.</p>
              <div className="flex gap-3 md:gap-4">
                <a href="#" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-white hover:bg-[#0077b5] rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-sm">
                  <Linkedin size={18} className="md:w-5 md:h-5" />
                </a>
                <a href="#" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-white hover:bg-[#E4405F] rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-sm">
                  <Instagram size={18} className="md:w-5 md:h-5" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Contact Info Grid - Full Width Layout */}
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <div className="bg-white p-8 md:p-16 rounded-[32px] md:rounded-[48px] border border-gray-100 shadow-[0_10px_50px_rgba(0,0,0,0.03)] grid md:grid-cols-3 gap-8 md:gap-12">
            
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-forest/5 text-forest rounded-2xl flex items-center justify-center mb-6 group-hover:bg-forest group-hover:text-white transition-all duration-500">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-forest mb-2">Phone & Email</h3>
                <p className="text-sm md:text-base text-gray-500 font-medium">+91 98765 43210</p>
                <p className="text-sm md:text-base text-gray-500 font-medium">info@kalpavruksha.coop</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-forest/5 text-forest rounded-2xl flex items-center justify-center mb-6 group-hover:bg-forest group-hover:text-white transition-all duration-500">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-forest mb-2">Office Address</h3>
                <p className="text-sm md:text-base text-gray-500 font-medium">Kalpavruksha Cooperative Bhavan</p>
                <p className="text-sm md:text-base text-gray-500 font-medium">Survey No. 45, Eco Village Road, Hyderabad</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-forest/5 text-forest rounded-2xl flex items-center justify-center mb-6 group-hover:bg-forest group-hover:text-white transition-all duration-500">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-forest mb-2">Working Hours</h3>
                <p className="text-sm md:text-base text-gray-500 font-medium">Mon – Sat: 9:00 AM – 6:00 PM</p>
                <p className="text-sm md:text-base text-gray-500 font-medium">Sunday: Closed</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
