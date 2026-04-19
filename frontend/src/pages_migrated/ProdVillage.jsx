import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProdVillage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="page" id="page-prod-village">
    <div className="page-hero" style={{ background: 'linear-gradient(135deg, #3e1a00, #6b3000)' }}>
      <div className="page-hero-content">
        <h1>🏺 Graminam <span className="gold">Village Products</span></h1>
        <p>Handcrafted traditional heritage from rural artisans.</p>
      </div>
    </div>
    <div className="page-body">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        <button className="btn-view-all" onClick={() => navigate("/products")} style={{ marginBottom: '32px' }}>← Back to All
          Products</button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          <div>
            <div
              style={{ borderRadius: '16px', overflow: 'hidden', height: '380px', background: 'url(\'/assets/prod_village_graminam.png\') center/cover' }}>
            </div>
          </div>
          <div>
            <span
              style={{ fontSize: '0.75rem', fontWeight: '700', color: '#c9a84c', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Traditional
              · Handcrafted · Heritage</span>
            <h2 style={{ fontFamily: '\'Cinzel\',serif', fontSize: '2rem', color: '#1a1a0a', margin: '12px 0' }}>Graminam Village Products
            </h2>
            <div style={{ height: '2px', background: '#c9a84c', width: '60px', marginBottom: '24px' }}></div>
            <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>Graminam is our celebration of India's village
              heritage. These products are handcrafted by traditional artisan families in Mahabubnagar — from hand-woven
              baskets and clay pottery to traditional pickles, cold-pressed oils, dried spices, and herbal preparations
              passed down through generations.</p>
            <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '28px' }}>By purchasing Graminam products, you directly
              support rural artisan families, preserve traditional Indian crafts, and bring the authentic taste and
              utility of village wisdom into your home.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#fff3e0', border: '1px solid #ffcc80', fontSize: '0.78rem', color: '#6d4c00', fontWeight: '600' }}>✓
                Handmade by Artisans</span>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#fff3e0', border: '1px solid #ffcc80', fontSize: '0.78rem', color: '#6d4c00', fontWeight: '600' }}>✓
                Heritage Recipes</span>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#fff3e0', border: '1px solid #ffcc80', fontSize: '0.78rem', color: '#6d4c00', fontWeight: '600' }}>✓
                Zero Preservatives</span>
              <span
                style={{ padding: '6px 16px', borderRadius: '20px', background: '#fff3e0', border: '1px solid #ffcc80', fontSize: '0.78rem', color: '#6d4c00', fontWeight: '600' }}>✓
                Rural Livelihood Support</span>
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

export default ProdVillage;
