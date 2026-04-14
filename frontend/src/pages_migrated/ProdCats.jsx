import React from 'react';

const ProdCats = () => {
  return (
    <>
      <section className="page" id="page-prod-cats">
    <div className="page-hero" style={{ background: '#34495e' }}>
      <div className="page-hero-content">
        <h1>Product <span className="gold">Categories</span></h1>
        <p>Diverse range of sustainable offerings.</p>
      </div>
    </div>
    <div className="page-body">
      <div className="cats-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div className="cat-chip" style={{ background: '#f0f0f0', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>🥦
          Vegetables</div>
        <div className="cat-chip" style={{ background: '#f0f0f0', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>🍎
          Fruits</div>
        <div className="cat-chip" style={{ background: '#f0f0f0', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>🍯
          Natural Honey</div>
      </div>
    </div>
  </section>

  
    </>
  );
};

export default ProdCats;
