import React from 'react';

const Agriculture = () => {
  return (
    <>
      <section className="page" id="page-agriculture">
    <div className="page-hero"
      style={{ background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(\'assets/agri_fields.jpg\') center/cover' }}>
      <div className="page-hero-content">
        <h1>Agriculture <span className="gold">Ecosystem</span></h1>
        <p>Building a resilient foundation for our farmers.</p>
      </div>
    </div>
    <div className="page-body">
      <div className="agri-overview-content">
        <h2 className="sec-h">Rooted in <span>Community</span></h2>
        <p>Our agriculture suite provides end-to-end support for member farmers, from network building to direct market
          access.</p>
        <div className="agri-nav-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '40px' }}>
          <button className="btn-gold-outline" onClick={() => showPage("agri-network")}>Farmer Network</button>
          <button className="btn-gold-outline" onClick={() => showPage("agri-products")}>Agri Products</button>
          <button className="btn-gold-outline" onClick={() => showPage("agri-biz")}>Business Model</button>
          <button className="btn-gold-outline" onClick={() => showPage("agri-join")}>Join the Network</button>
        </div>
      </div>
    </div>
  </section>

  
    </>
  );
};

export default Agriculture;
