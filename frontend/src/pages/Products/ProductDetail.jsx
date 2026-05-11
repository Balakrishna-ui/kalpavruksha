// src/pages/Products/ProductDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import Button from '../../components/ui/Button';
import { Section } from '../../components/ui/Section';

import SEO from '../../components/common/SEO';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(slug);

  if (loading) return <div className="py-20 text-center font-bold">Loading...</div>;
  if (error || !product) return <div className="py-20 text-center font-bold text-red-500">Product not found</div>;

  return (
    <div className="w-full font-inter">
      <SEO 
        title={product.name} 
        description={product.tagline || product.description} 
        image={product.mainImg}
      />
      {/* Dynamic Hero Section */}
      <section 
        className="page-hero" 
        style={{ background: product.heroBg || 'linear-gradient(135deg, #1a4a00, #2d7a00)' }}
      >
        <div className="page-hero-content">
          <h1>{product.emoji} {product.titlePrefix} <span className="gold">{product.name}</span></h1>
          <p>{product.tagline}</p>
        </div>
      </section>

      {/* Dynamic Body Section */}
      <div className="page-body">
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
          <button 
            className="btn-view-all" 
            onClick={() => navigate("/products")} 
            style={{ marginBottom: '32px' }}
          >
            ← Back to All Products
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
            {/* Left: Image */}
            <div>
              <div
                style={{ 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  height: '380px', 
                  background: `url('${product.mainImg}') center/cover` 
                }}
              >
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <span
                style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: '700', 
                  color: '#c9a84c', 
                  letterSpacing: '0.12em', 
                  textTransform: 'uppercase' 
                }}
              >
                {product.badgeLabel || 'Farm Fresh • Organic'}
              </span>
              <h2 style={{ fontFamily: '\'Cinzel\',serif', fontSize: '2rem', color: '#1a1a0a', margin: '12px 0' }}>
                {product.name}
              </h2>
              <div style={{ height: '2px', background: '#c9a84c', width: '60px', marginBottom: '24px' }}></div>
              
              <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>
                {product.description}
              </p>
              
              {product.extraInfo && (
                <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '28px' }}>
                  {product.extraInfo}
                </p>
              )}

              {/* Dynamic Badges */}
              {product.features && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
                  {product.features.map((feature, i) => (
                    <span
                      key={i}
                      style={{ padding: '6px 16px', borderRadius: '20px', background: '#e8f5e9', border: '1px solid #a5d6a7', fontSize: '0.78rem', color: '#2e7d32', fontWeight: '600' }}
                    >
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              )}

              <Button to="/membership" variant="primary">
                Order Now →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
