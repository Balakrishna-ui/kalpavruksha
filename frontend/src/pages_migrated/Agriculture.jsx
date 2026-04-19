import React from 'react';
import { useNavigate } from 'react-router-dom';

const Agriculture = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="page" id="page-agriculture">
    <div className="page-hero"
      style={{ background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(\'/img/ag1.png\') center/cover' }}>
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
          <button className="btn-gold-outline" onClick={() => navigate("/div-agri")}>Farmer Network</button>
          <button className="btn-gold-outline" onClick={() => navigate("/products")}>Agri Products</button>
          <button className="btn-gold-outline" onClick={() => navigate("/proj-mana")}>Business Model</button>
          <button className="btn-gold-outline" onClick={() => navigate("/membership")}>Join the Network</button>
        </div>
      </div>
    </div>
  </section>

  
    </>
  );
};

export default Agriculture;
