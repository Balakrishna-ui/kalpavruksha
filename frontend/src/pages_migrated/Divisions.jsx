import React from 'react';

const Divisions = () => {
  return (
    <>
      <section className="page" id="page-divisions">
    <div className="page-hero" style={{ background: 'linear-gradient(135deg, #1a2a0d 0%, #0d1a0d 100%)' }}>
      <div className="page-hero-content">
        <h1>Our <span className="gold">Divisions</span></h1>
        <p>A multi-sectoral ecosystem driving collective prosperity.</p>
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
