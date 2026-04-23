import React from 'react';
import { useNavigate } from 'react-router-dom';

const Divisions = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="page" id="page-divisions">
    {/* Premium Image Banner */}
    <div className="relative h-[60vh] md:h-[400px] flex items-center justify-center text-center overflow-hidden">
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
        <span className="inline-block text-gold font-black tracking-[0.4em] uppercase text-[10px] md:text-[12px] mb-3 md:mb-4">Kalpavruksha Ecosystem</span>
        <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-tight drop-shadow-2xl">Our <span className="text-gold">Divisions</span></h1>
        <p className="text-white/90 text-sm md:text-lg mt-3 md:mt-4 font-medium drop-shadow-lg px-4 md:px-0 leading-relaxed md:leading-normal">A multi-sectoral ecosystem driving collective prosperity.</p>
      </div>
    </div>
    <div className="page-body" style={{ paddingTop: '20px' }}>
      <div className="divisions-overview-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '0' }}>
        <div className="div-overview-card cursor-pointer" onClick={() => navigate("/div-agri")}>
          <h3>Agriculture</h3>
          <p>Powering the foundation of our cooperative.</p>
        </div>
        <div className="div-overview-card cursor-pointer" onClick={() => navigate("/divisions/financial")}>
          <h3>Financial</h3>
          <p>Empowering members through fiscal independence.</p>
        </div>
        <div className="div-overview-card cursor-pointer" onClick={() => navigate("/div-mfg")}>
          <h3>Manufacturing</h3>
          <p>Adding value through industrial cooperative units.</p>
        </div>
        <div className="div-overview-card cursor-pointer" onClick={() => navigate("/div-edu")}>
          <h3>Education</h3>
          <p>Building the knowledge base of our community.</p>
        </div>
        <div className="div-overview-card cursor-pointer" onClick={() => navigate("/div-svc")}>
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
