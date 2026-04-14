import React from 'react';

const AboutMission = () => {
  return (
    <>
      <section className="page" id="page-about-mission">
    <div className="page-hero"
      style={{ background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(\'assets/mission_bg.jpg\') center/cover' }}>
      <div className="page-hero-content">
        <h1>Mission & <span className="gold">Vision</span></h1>
        <p>The guiding principles that drive our movement.</p>
      </div>
    </div>
    <div className="page-body">
      <div className="mission-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div className="mission-box"
          style={{ background: '#fdfbf5', padding: '40px', borderRadius: '20px', borderLeft: '5px solid #d4af37' }}>
          <h3 className="gold">Our Vision</h3>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>To build self-reliant, prosperous communities where every
            individual has access to resources, opportunities, and a dignified life — rooted in cooperation, not
            competition.</p>
        </div>
        <div className="mission-box"
          style={{ background: '#f0f7f0', padding: '40px', borderRadius: '20px', borderLeft: '5px solid #2e7d32' }}>
          <h3 style={{ color: '#2e7d32' }}>Our Mission</h3>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>Empowering members through integrated cooperative services
            that foster economic independence, environmental sustainability, and social well-being across rural and
            semi-urban communities.</p>
        </div>
      </div>
    </div>
  </section>

  
    </>
  );
};

export default AboutMission;
