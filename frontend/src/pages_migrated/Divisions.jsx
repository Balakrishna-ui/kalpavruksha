import React from 'react';

const Divisions = () => {
  return (
    <>
      <section className="page" id="page-divisions">
    {/* Premium Image Banner */}
    <div className="relative h-[300px] md:h-[400px] flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/ag1.png"
          alt="Divisions Background"
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* Dark Green Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0B3D2E]/75 to-[#102030]/60 backdrop-blur-[2px]"></div>
      {/* Text */}
      <div className="relative z-[2] px-6">
        <span className="inline-block text-gold font-black tracking-[0.4em] uppercase text-[10px] md:text-[12px] mb-4">Kalpavruksha Ecosystem</span>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight drop-shadow-2xl">Our <span className="text-gold">Divisions</span></h1>
        <p className="text-white/90 text-lg mt-4 font-medium drop-shadow-lg">A multi-sectoral ecosystem driving collective prosperity.</p>
      </div>
    </div>
    <div className="page-body">
      <div className="divisions-overview-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div className="div-overview-card" onClick={() => showPage("div-agri")}>
          <h3>Agriculture</h3>
          <p>Powering the foundation of our cooperative.</p>
        </div>
        <div className="div-overview-card" onClick={() => showPage("div-fin")}>
          <h3>Financial</h3>
          <p>Empowering members through fiscal independence.</p>
        </div>
        <div className="div-overview-card" onClick={() => showPage("div-mfg")}>
          <h3>Manufacturing</h3>
          <p>Adding value through industrial cooperative units.</p>
        </div>
        <div className="div-overview-card" onClick={() => showPage("div-edu")}>
          <h3>Education</h3>
          <p>Building the knowledge base of our community.</p>
        </div>
        <div className="div-overview-card" onClick={() => showPage("div-svc")}>
          <h3>Services</h3>
          <p>Professional support for sustainable growth.</p>
        </div>
      </div>
    </div>
  </section>

  
    </>
  );
};

export default Divisions;
