import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProdVeg = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="page" id="page-prod-veg">
    <div className="page-hero" style={{ background: 'linear-gradient(135deg, #1b5e20, #2e7d32)' }}>
      <div className="page-hero-content">
        <h1>🥦 Organic <span className="gold">Vegetables</span></h1>
        <p>Certified organic, farm fresh, zero chemicals.</p>
      </div>
    </div>
    <div className="page-body">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        <button className="btn-view-all" onClick={() => navigate("/products")} style={{ marginBottom: '32px' }}>← Back to All
          Products</button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          <div>
            <div
              style={{ borderRadius: '16px', overflow: 'hidden', height: '380px', background: 'url(\'/assets/prod_veg_1773805467767.png\') center/cover' }}>
            </div>
          </div>
          <div>
            <span
              style={{ fontSize: '0.75rem', fontWeight: '700', color: '#c9a84c', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Cooperative
              Farm Produce</span>
            <h2 style={{ fontFamily: '\'Cinzel\',serif', fontSize: '2rem', color: '#1a1a0a', margin: '12px 0' }}>Organic Vegetables</h2>
            <div style={{ height: '2px', background: '#c9a84c', width: '60px', marginBottom: '24px' }}></div>
            <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>Our cooperative-grown organic vegetables are
              cultivated by over 500 member farmers using zero chemical pesticides. Grown in the fertile lands of
              Mahabubnagar using traditional and sustainable farming methods, every vegetable is hand-picked at peak
              freshness and delivered directly to your table.</p>
            <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '28px' }}>From leafy greens and root vegetables to gourds
              and beans — our range covers seasonal and year-round varieties, all certified organic by our cooperative
              quality board.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#e8f5e9', border: '1px solid #a5d6a7', fontSize: '0.78rem', color: '#2e7d32', fontWeight: '600' }}>✓
                Zero Chemicals</span>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#e8f5e9', border: '1px solid #a5d6a7', fontSize: '0.78rem', color: '#2e7d32', fontWeight: '600' }}>✓
                Farm to Door</span>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#e8f5e9', border: '1px solid #a5d6a7', fontSize: '0.78rem', color: '#2e7d32', fontWeight: '600' }}>✓
                Hybrid-Free</span>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#e8f5e9', border: '1px solid #a5d6a7', fontSize: '0.78rem', color: '#2e7d32', fontWeight: '600' }}>✓
                Cooperative Grown</span>
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

export default ProdVeg;
