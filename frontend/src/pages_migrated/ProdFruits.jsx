import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProdFruits = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="page" id="page-prod-fruits">
    <div className="page-hero" style={{ background: 'linear-gradient(135deg, #1a4a00, #2d7a00)' }}>
      <div className="page-hero-content">
        <h1>🍎 Natural <span className="gold">Ripped Fruits</span></h1>
        <p>Tree-ripened, bursting with natural sweetness.</p>
      </div>
    </div>
    <div className="page-body">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        <button className="btn-view-all" onClick={() => navigate("/products")} style={{ marginBottom: '32px' }}>← Back to All
          Products</button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          <div>
            <div
              style={{ borderRadius: '16px', overflow: 'hidden', height: '380px', background: 'url(\'/assets/prod_fruits_natural.png\') center/cover' }}>
            </div>
          </div>
          <div>
            <span
              style={{ fontSize: '0.75rem', fontWeight: '700', color: '#c9a84c', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Naturally
              Ripened · Farm Fresh</span>
            <h2 style={{ fontFamily: '\'Cinzel\',serif', fontSize: '2rem', color: '#1a1a0a', margin: '12px 0' }}>Natural Ripped Fruits
            </h2>
            <div style={{ height: '2px', background: '#c9a84c', width: '60px', marginBottom: '24px' }}></div>
            <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>Our seasonal fruits are grown by cooperative
              member farmers using natural farming practices. Allowed to ripen fully on the tree — never artificially
              ripened with carbide or chemicals — each fruit is packed with natural sugar, flavour, and nutrition that
              commercially grown fruits simply cannot match.</p>
            <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '28px' }}>Mangoes, custard apples, papayas, pomegranates,
              bananas, and seasonal offerings — fresher than the market because we cut out every middleman between our
              farm and your home.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#e8f5e9', border: '1px solid #a5d6a7', fontSize: '0.78rem', color: '#2e7d32', fontWeight: '600' }}>✓
                No Artificial Ripening</span>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#e8f5e9', border: '1px solid #a5d6a7', fontSize: '0.78rem', color: '#2e7d32', fontWeight: '600' }}>✓
                Naturally Sweet</span>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#e8f5e9', border: '1px solid #a5d6a7', fontSize: '0.78rem', color: '#2e7d32', fontWeight: '600' }}>✓
                Seasonal Varieties</span>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#e8f5e9', border: '1px solid #a5d6a7', fontSize: '0.78rem', color: '#2e7d32', fontWeight: '600' }}>✓
                Pesticide Free</span>
            </div>
            <button className="btn-gold" style={{ padding: '14px 36px', fontSize: '1rem' }} onClick={() => navigate("/membership")}>Order
              Now →</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  
    </>
  );
};

export default ProdFruits;
