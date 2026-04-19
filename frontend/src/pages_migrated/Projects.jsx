import React from 'react';

const Projects = () => {
  return (
    <>
      <section className="page" id="page-projects">
        <div className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
            style={{ backgroundImage: 'url("/img/pro.png")' }}
          ></div>
          {/* Dark Green/Blue Gradient Overlay with Subtle Blur & Brightness reduction */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2015]/40 to-[#102030]/30 backdrop-blur-[2px] brightness-95"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl">
              Our <span className="text-gold">Projects</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
              Transforming communities through purposeful action
            </p>
          </div>
        </div>
        
        <div className="page-body">
          {/* Project Showcase Section */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-24 font-inter">
            {/* Left Side - Text */}
            <div className="flex-1 w-full space-y-6">
              <div>
                <span className="inline-block px-4 py-1.5 bg-[#c9a84c]/10 text-[#c9a84c] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
                  Ongoing Project
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-[#1a3a1a] leading-tight">
                  Mana Palle <span className="text-[#c9a84c]">Phase 1</span>
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed text-base md:text-lg pb-6 border-b border-gray-100">
                <p>
                  <strong>Vision & Concept:</strong> A self-sustaining eco-village combining modern amenities with rural serenity.
                </p>
                <p>
                  Construction of 120 eco-friendly homes in the first phase of our sustainable village project.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-[#1a3a1a]">Development Stage</span>
                  <span className="text-[#c9a84c]">68% Complete</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <div className="bg-[#c9a84c] h-3 rounded-full transition-all duration-1000 ease-out" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex-1 w-full">
              <div className="relative group">
                {/* Soft decorative backdrop */}
                <div className="absolute inset-0 bg-[#c9a84c]/20 rounded-3xl translate-x-4 translate-y-4 pointer-events-none transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5"></div>
                <img 
                  src="/img/mana_hero.png" 
                  alt="Mana Palle Eco Village" 
                  loading="lazy"
                  className="relative w-full h-[350px] md:h-[450px] object-cover rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-10 transition-transform duration-500 group-hover:-translate-y-1"
                />
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="font-inter pt-8 border-t border-gray-100">
            <h3 className="text-2xl md:text-3xl font-black text-[#1a3a1a] mb-10 text-center tracking-tight">
              Project Gallery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                <img 
                  src="/img/mana_eco.png" 
                  alt="Village homes" 
                  loading="lazy"
                  className="w-full h-[280px] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                <img 
                  src="/img/mana_agri.png" 
                  alt="Agriculture land" 
                  loading="lazy"
                  className="w-full h-[280px] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                <img 
                  src="/img/pro2.jpg" 
                  alt="Modern tractor farming" 
                  loading="lazy"
                  className="w-full h-[280px] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
