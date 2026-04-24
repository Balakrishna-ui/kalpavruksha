import React from 'react';

const AlliedServices = () => {
  return (
    <>
    <div className="page bg-[#fcfbf9] !pt-0" id="page-allied">
      <div className="relative h-[50vh] md:h-[400px] flex items-center justify-center overflow-hidden pt-[80px] md:pt-0">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: 'url("/assets/allied_banner.png")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-forest/80 to-forest/40 backdrop-blur-[2px]"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 py-6 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-gold font-black tracking-[0.4em] uppercase text-[10px] mb-2 md:mb-4 block animate-fadeIn">Our Ecosystem</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 md:mb-4 tracking-tighter drop-shadow-2xl">
            Allied <span className="text-gold">Services</span>
          </h1>
          <p className="text-white/80 text-sm md:text-xl font-medium max-w-2xl mx-auto drop-shadow-lg leading-relaxed px-4 md:px-0">
            Empowering our community through specialized growth programs and collaborative platforms
          </p>
        </div>
      </div>

        <div className="page-body py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            
            {/* Member Business Promotion */}
            <div className="bg-white rounded-[40px] p-8 md:p-14 shadow-[0_10px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-4 border border-gray-100 flex flex-col items-center text-center group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex-grow flex flex-col items-center">
                {/* Visual Context Image */}
                <div className="relative mb-8 md:mb-10">
                  <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img src="/img/allied/promotion.png" alt="Promotion Illustration" className="h-16 md:h-24 w-auto object-contain relative z-10 group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-forest mb-4 group-hover:text-gold transition-colors tracking-tight">Member Business Promotion</h3>
                <p className="text-gray-500 text-sm md:text-lg leading-relaxed mb-8 font-medium max-w-sm">
                  We provide a dedicated ecosystem for our members to showcase their businesses. Leverage our 5,000+ strong member network.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-12">
                  <span className="bg-gold/5 text-gold-dark px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-gold/10">B2B Networking</span>
                  <span className="bg-gold/5 text-gold-dark px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-gold/10">Market Access</span>
                </div>
              </div>
              
              <button className="w-full bg-forest text-white font-black py-4 md:py-5 rounded-2xl hover:bg-gold hover:text-forest transition-all duration-300 shadow-xl hover:shadow-gold/20 text-xs md:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 group/btn" onClick={() => window.location.hash = 'contact'}>
                Enquire Now
                <svg className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </button>
            </div>

            {/* Advertisement Platform */}
            <div className="bg-white rounded-[40px] p-8 md:p-14 shadow-[0_10px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-4 border border-gray-100 flex flex-col items-center text-center group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex-grow flex flex-col items-center">
                {/* Visual Context Image */}
                <div className="relative mb-8 md:mb-10">
                  <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img src="/img/allied/ads.png" alt="Ads Illustration" className="h-16 md:h-24 w-auto object-contain relative z-10 group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-forest mb-4 group-hover:text-gold transition-colors tracking-tight">Advertisement Platform</h3>
                <p className="text-gray-500 text-sm md:text-lg leading-relaxed mb-8 font-medium max-w-sm">
                  Reach the right audience through our multi-channel advertising platforms. From digital banners to physical community notice boards.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-12">
                  <span className="bg-gold/5 text-gold-dark px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-gold/10">Digital Ads</span>
                  <span className="bg-gold/5 text-gold-dark px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-gold/10">Direct Marketing</span>
                </div>
              </div>
              
              <button className="w-full bg-forest text-white font-black py-4 md:py-5 rounded-2xl hover:bg-gold hover:text-forest transition-all duration-300 shadow-xl hover:shadow-gold/20 text-xs md:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 group/btn" onClick={() => window.location.hash = 'contact'}>
                View Packages
                <svg className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </button>
            </div>

            {/* Skill Development Programs */}
            <div className="bg-white rounded-[40px] p-8 md:p-14 shadow-[0_10px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-4 border border-gray-100 flex flex-col items-center text-center group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex-grow flex flex-col items-center">
                {/* Visual Context Image */}
                <div className="relative mb-8 md:mb-10">
                  <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img src="/img/allied/skill.png" alt="Skill Illustration" className="h-16 md:h-24 w-auto object-contain relative z-10 group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-forest mb-4 group-hover:text-gold transition-colors tracking-tight">Skill Development Programs</h3>
                <p className="text-gray-500 text-sm md:text-lg leading-relaxed mb-8 font-medium max-w-sm">
                  Knowledge is the root of prosperity. We offer vocational training, financial literacy workshops, and modern agricultural workshops.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-12">
                  <span className="bg-gold/5 text-gold-dark px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-gold/10">Workshops</span>
                  <span className="bg-gold/5 text-gold-dark px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-gold/10">Certifications</span>
                </div>
              </div>
              
              <button className="w-full bg-forest text-white font-black py-4 md:py-5 rounded-2xl hover:bg-gold hover:text-forest transition-all duration-300 shadow-xl hover:shadow-gold/20 text-xs md:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 group/btn" onClick={() => window.location.hash = 'contact'}>
                Learn More
                <svg className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </button>
            </div>

            {/* Partnership Opportunities */}
            <div className="bg-white rounded-[40px] p-8 md:p-14 shadow-[0_10px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-4 border border-gray-100 flex flex-col items-center text-center group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex-grow flex flex-col items-center">
                {/* Visual Context Image */}
                <div className="relative mb-8 md:mb-10">
                  <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img src="/img/allied/partnership.png" alt="Partnership Illustration" className="h-16 md:h-24 w-auto object-contain relative z-10 group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-forest mb-4 group-hover:text-gold transition-colors tracking-tight">Partnership Opportunities</h3>
                <p className="text-gray-500 text-sm md:text-lg leading-relaxed mb-8 font-medium max-w-sm">
                  We are always looking for organizations and individuals who share our vision. Partner with us to drive social impact.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-12">
                  <span className="bg-gold/5 text-gold-dark px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-gold/10">Strategic Ties</span>
                  <span className="bg-gold/5 text-gold-dark px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-gold/10">CSR Projects</span>
                </div>
              </div>
              
              <button className="w-full bg-forest text-white font-black py-4 md:py-5 rounded-2xl hover:bg-gold hover:text-forest transition-all duration-300 shadow-xl hover:shadow-gold/20 text-xs md:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 group/btn" onClick={() => window.location.hash = 'contact'}>
                Partner with Us
                <svg className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </button>
            </div>

          </div>
        </div>
    </div>
    </>
  );
};

export default AlliedServices;
