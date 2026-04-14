import React from 'react';

const AgriJoin = () => {
  return (
    <>
      <section className="page" id="page-agri-join">
    <div className="page-hero" style={{ background: '#cddc39', color: '#333' }}>
      <div className="page-hero-content">
        <h1 style={{ color: '#333' }}>Join the <span className="gold">Movement</span></h1>
        <p style={{ color: '#333' }}>Start your journey towards chemical-free, profitable farming today.</p>
      </div>
    </div>
    <div className="page-body">
      <div className="join-form-standalone"
        style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Farmer Registration</h3>
        <div className="form-group"><label>Land Size (Acres)</label><input type="number" placeholder="e.g. 5" /></div>
        <div className="form-group"><label>Current Crop</label><input type="text" placeholder="e.g. Sitaphal" /></div>
        <button className="btn-submit" style={{ width: '100%' }}>Apply to Join</button>
      </div>
    </div>
  </section>

  
    </>
  );
};

export default AgriJoin;
