import React from 'react';

const Services = () => {
  return (
    <>
      <section className="page" id="page-services">
    <div className="page-hero" style={{ background: '#1a1a2a' }}>
      <div className="page-hero-content">
        <h1>Member <span className="gold">Services</span></h1>
        <p>Professional expertise at your service.</p>
      </div>
    </div>
    <div className="page-body">
      <div className="services-nav-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <button className="btn-gold-outline" onClick={() => showPage("svc-cons")}>Consultancy</button>
        <button className="btn-gold-outline" onClick={() => showPage("svc-digi")}>Digital Marketing</button>
        <button className="btn-gold-outline" onClick={() => showPage("svc-agri")}>Agri Services</button>
      </div>
    </div>
  </section>

  
    </>
  );
};

export default Services;
