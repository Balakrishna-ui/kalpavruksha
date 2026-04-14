import React from 'react';

const AboutLegal = () => {
  return (
    <>
      <section className="page" id="page-about-legal">
    <div className="page-hero" style={{ background: '#2c3e50' }}>
      <div className="page-hero-content">
        <h1>Legal <span className="gold">Structure</span></h1>
        <p>Transparency, Accountability, and Compliance.</p>
      </div>
    </div>
    <div className="page-body">
      <div className="legal-wrap"
        style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '60px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <h2 className="sec-h">Trust & <span>Transparency</span></h2>
        <p>Kalpavruksha Mutually Aided Cooperative Thrift and Credit Society Limited is registered under the relevant
          Cooperative Societies Act, ensuring a structured legal framework that protects member interests and maintains
          the highest standards of financial governance.</p>
        <div className="legal-points" style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '40px' }}>
          <div className="l-point" style={{ marginBottom: '25px' }}>
            <h4 className="gold">Regulatory Compliance</h4>
            <p>We adhere to all guidelines set by the Cooperative Department, with regular audits and transparent
              reporting to our members.</p>
          </div>
          <div className="l-point" style={{ marginBottom: '25px' }}>
            <h4 className="gold">Member Ownership</h4>
            <p>Every member is a shareholder, ensuring that the society is run by the people, for the people.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  
    </>
  );
};

export default AboutLegal;
