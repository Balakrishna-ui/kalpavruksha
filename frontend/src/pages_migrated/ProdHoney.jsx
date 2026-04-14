import React from 'react';

const ProdHoney = () => {
  return (
    <>
      <section className="page" id="page-prod-honey">
    <div className="page-hero" style={{ background: 'linear-gradient(135deg, #4a2c00, #7a4f00)' }}>
      <div className="page-hero-content">
        <h1>🍯 Pure Wild <span className="gold">Honey</span></h1>
        <p>Wild-sourced, unprocessed, untouched by chemicals.</p>
      </div>
    </div>
    <div className="page-body">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        <button className="btn-view-all" onClick={() => showPage("products")} style={{ marginBottom: '32px' }}>← Back to All
          Products</button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          <div>
            <div
              style={{ borderRadius: '16px', overflow: 'hidden', height: '380px', background: 'url(\'assets/prod_honey_1773805513434.png\') center/cover' }}>
            </div>
          </div>
          <div>
            <span
              style={{ fontSize: '0.75rem', fontWeight: '700', color: '#c9a84c', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Wild
              Sourced · Unprocessed</span>
            <h2 style={{ fontFamily: '\'Cinzel\',serif', fontSize: '2rem', color: '#1a1a0a', margin: '12px 0' }}>Pure Wild Honey</h2>
            <div style={{ height: '2px', background: '#c9a84c', width: '60px', marginBottom: '24px' }}></div>
            <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>Our wild honey is sourced from natural forest
              hives in the protected hills surrounding Mahabubnagar by traditional beekeeping families. Each batch is
              cold-extracted, preserving all enzymes, antioxidants, and natural nutrients completely intact — no
              heating, no blending, no additives.</p>
            <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '28px' }}>Rich in natural antibacterial properties and a
              complex floral taste profile from the diverse wildflowers of Telangana, this honey is truly one of
              nature's finest offerings.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#fff8e1', border: '1px solid #ffcc02', fontSize: '0.78rem', color: '#6d4c00', fontWeight: '600' }}>✓
                Raw & Unprocessed</span>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#fff8e1', border: '1px solid #ffcc02', fontSize: '0.78rem', color: '#6d4c00', fontWeight: '600' }}>✓
                No Additives</span>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#fff8e1', border: '1px solid #ffcc02', fontSize: '0.78rem', color: '#6d4c00', fontWeight: '600' }}>✓
                Wild Forest Sourced</span>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#fff8e1', border: '1px solid #ffcc02', fontSize: '0.78rem', color: '#6d4c00', fontWeight: '600' }}>✓
                Cold Extracted</span>
            </div>
            <button className="btn-gold" style={{ padding: '14px 36px', fontSize: '1rem' }} onClick={() => showPage("membership")}>Order
              Now →</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  
    </>
  );
};

export default ProdHoney;
