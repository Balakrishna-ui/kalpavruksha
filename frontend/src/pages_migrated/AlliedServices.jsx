import React from 'react';

const AlliedServices = () => {
  return (
    <>
      <section className="page active !pt-0" id="page-allied">
        <div className="page-hero py-12 md:py-24" style={{ background: 'linear-gradient(135deg, #0d1f0d 0%, #1a3a1a 100%)' }}>
          <div className="page-hero-content text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">Allied <span className="text-gold">Services</span></h1>
            <p className="text-base md:text-lg text-white opacity-90 max-w-2xl mx-auto leading-relaxed">Empowering our community through specialized growth programs and collaborative platforms.</p>
          </div>
        </div>

        <div className="page-body py-8 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            
            {/* Member Business Promotion */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
              <div className="h-32 md:h-48 bg-forest overflow-hidden flex items-center justify-center p-6 md:p-8">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gold/20 flex items-center justify-center">
                   <svg width="32" height="32" className="md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                   </svg>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-forest mb-2 md:mb-4">Member Business Promotion</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 md:mb-6">
                  We provide a dedicated ecosystem for our members to showcase their businesses. Leverage our 5,000+ strong member network to grow your reach and build trusted local partnerships.
                </p>
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  <span className="bg-gold/10 text-gold-dark px-3 py-1 rounded-full text-xs md:text-sm font-medium">B2B Networking</span>
                  <span className="bg-gold/10 text-gold-dark px-3 py-1 rounded-full text-xs md:text-sm font-medium">Market Access</span>
                </div>
                <button className="w-full bg-forest text-white font-bold py-3 rounded-xl hover:bg-gold transition-colors duration-300 text-sm md:text-base" onClick={() => window.location.hash = 'contact'}>Enquire Now</button>
              </div>
            </div>

            {/* Advertisement Platform */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
              <div className="h-32 md:h-48 bg-forest-mid overflow-hidden flex items-center justify-center p-6 md:p-8">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gold/20 flex items-center justify-center">
                   <svg width="32" height="32" className="md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
                   </svg>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-forest mb-2 md:mb-4">Advertisement Platform</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 md:mb-6">
                  Reach the right audience through our multi-channel advertising platforms. From digital banners to physical community notice boards, we help your product get the visibility it deserves.
                </p>
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  <span className="bg-gold/10 text-gold-dark px-3 py-1 rounded-full text-xs md:text-sm font-medium">Digital Ads</span>
                  <span className="bg-gold/10 text-gold-dark px-3 py-1 rounded-full text-xs md:text-sm font-medium">Direct Marketing</span>
                </div>
                <button className="w-full bg-forest text-white font-bold py-3 rounded-xl hover:bg-gold transition-colors duration-300 text-sm md:text-base" onClick={() => window.location.hash = 'contact'}>View Packages</button>
              </div>
            </div>

            {/* Skill Development Programs */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
              <div className="h-32 md:h-48 bg-forest overflow-hidden flex items-center justify-center p-6 md:p-8">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gold/20 flex items-center justify-center">
                   <svg width="32" height="32" className="md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                   </svg>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-forest mb-2 md:mb-4">Skill Development Programs</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 md:mb-6">
                  Knowledge is the root of prosperity. We offer vocational training, financial literacy workshops, and modern agricultural workshops to keep our members ahead in their respective fields.
                </p>
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  <span className="bg-gold/10 text-gold-dark px-3 py-1 rounded-full text-xs md:text-sm font-medium">Workshops</span>
                  <span className="bg-gold/10 text-gold-dark px-3 py-1 rounded-full text-xs md:text-sm font-medium">Certifications</span>
                </div>
                <button className="w-full bg-forest text-white font-bold py-3 rounded-xl hover:bg-gold transition-colors duration-300 text-sm md:text-base" onClick={() => window.location.hash = 'contact'}>Learn More</button>
              </div>
            </div>

            {/* Partnership Opportunities */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
              <div className="h-32 md:h-48 bg-forest-mid overflow-hidden flex items-center justify-center p-6 md:p-8">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gold/20 flex items-center justify-center">
                   <svg width="32" height="32" className="md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>
                   </svg>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-forest mb-2 md:mb-4">Partnership Opportunities</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 md:mb-6">
                  We are always looking for organizations and individuals who share our vision. Partner with Kalpavruksha to drive social impact and economic growth at the grassroots level.
                </p>
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  <span className="bg-gold/10 text-gold-dark px-3 py-1 rounded-full text-xs md:text-sm font-medium">Strategic Ties</span>
                  <span className="bg-gold/10 text-gold-dark px-3 py-1 rounded-full text-xs md:text-sm font-medium">CSR Projects</span>
                </div>
                <button className="w-full bg-forest text-white font-bold py-3 rounded-xl hover:bg-gold transition-colors duration-300 text-sm md:text-base" onClick={() => window.location.hash = 'contact'}>Partner with Us</button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default AlliedServices;
