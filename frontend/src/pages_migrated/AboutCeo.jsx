import React from 'react';

const AboutCeo = () => {
  return (
    <>
      <section className="page" id="page-about-ceo">
    <div className="page-hero" style={{ background: '#1a1a1a' }}>
      <div className="page-hero-content">
        <h1>CEO & <span className="gold">Leadership</span></h1>
        <p>Visionsary guidance for a collective future.</p>
      </div>
    </div>
    <div className="page-body">
      <div className="ceo-profile-wrap" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="ceo-card-large"
          style={{ display: 'flex', gap: '40px', background: 'white', padding: '50px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <div className="ceo-img"
            style={{ width: '300px', height: '350px', background: '#eee', borderRadius: '20px', flexShrink: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' }}>
            👨💼</div>
          <div className="ceo-details">
            <h2 className="gold" style={{ marginBottom: '5px' }}>Dr. Ramesh Kumar</h2>
            <p style={{ fontWeight: '600', color: '#666', marginBottom: '20px' }}>Founder & President (CEO)</p>
            <p style={{ lineHeight: '1.8' }}>A visionary leader with over 20 years of experience in cooperative management
              and rural development. Dr. Ramesh has been instrumental in integrating 8 different sectors into one
              unified ecosystem. Under his leadership, Kalpavruksha has grown from a small group into a massive
              cooperative network.</p>
            <div className="ceo-signature"
              style={{ marginTop: '30px', fontFamily: '\'Dancing Script\', cursive', fontSize: '1.5rem', color: '#1a3a1a' }}>Dr.
              Ramesh Kumar</div>
          </div>
        </div>
        <h3 style={{ marginTop: '60px', textAlign: 'center' }}>Board of Directors</h3>
        <div className="leadership-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginTop: '30px' }}>
          <div className="team-card">
            <div className="team-avatar">👩💼</div>
            <h4>Smt. Lakshmi Devi</h4>
            <p>Secretary General</p>
          </div>
          <div className="team-card">
            <div className="team-avatar">👨🌾</div>
            <h4>Sri Venkata Rao</h4>
            <p>Agriculture Director</p>
          </div>
          <div className="team-card">
            <div className="team-avatar">🧬</div>
            <h4>Dr. Priya Sharma</h4>
            <p>Finance Director</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  
    </>
  );
};

export default AboutCeo;
