import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="page relative min-h-screen overflow-hidden" id="page-about">
        {/* Background Watermark Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <img 
            src="/img/logoo.PNG" 
            alt="Background Watermark" 
            className="w-[60%] max-w-[800px] object-contain"
            style={{ opacity: 0.05, filter: 'grayscale(20%) blur(1px)' }}
          />
        </div>

        <div className="page-hero-premium relative z-10">
          <div className="page-hero-content">
            <span className="sec-tag">Discover Our Story</span>
            <h1>Empowering Communities <br /><span className="gold">Through Cooperation</span></h1>
            <p>A multi-sectoral ecosystem integrated for sustainable prosperity.</p>
          </div>
        </div>

        <div className="about-main-container relative z-10">
      
      <div className="about-section-grid">
        <div className="about-text-card glass-card reveal">
          <h2 className="sec-lbl">Our Philosophy</h2>
          <h2 className="sec-h">More Than Just a <span>Cooperative</span></h2>
          <p>Inspired by the legendary <em>Kalpavruksha</em> — the divine tree of abundance — our society is dedicated
            to being a lifelong pillar of support for every member family. We transcend the boundaries of traditional
            banking by fostering an integrated ecosystem of agriculture, finance, and sustainable living.</p>
          <p>Our core philosophy is rooted in the belief that <strong>collective strength</strong> is the most powerful
            tool for individual prosperity. We operate under a transparent, democratic framework where every member is
            an owner, and every decision is made for the long-term well-being of our villages and communities.</p>
          <p>By blending <strong>traditional wisdom</strong> with <strong>modern innovation</strong>, we ensure that our
            members are not just participants in a society, but architects of a resilient and prosperous future.</p>

          <div className="about-nav-links">
            <button className="btn-gold-outline" onClick={() => navigate("/about-background")}>Our History</button>
            <button className="btn-gold-outline" onClick={() => navigate("/about-mission")}>Mission & Vision</button>
            <button className="btn-gold-outline" onClick={() => navigate("/about-ceo")}>CEO Profile</button>
            <button className="btn-gold-outline" onClick={() => navigate("/about-legal")}>Legal Structure</button>
          </div>
        </div>

        <div className="about-stats-grid reveal">
          <div className="stat-glass-card">
            <div className="stat-num">5000+</div>
            <div className="stat-label">Active Members</div>
          </div>
          <div className="stat-glass-card">
            <div className="stat-num">8</div>
            <div className="stat-label">Integrated Divisions</div>
          </div>
          <div className="stat-glass-card">
            <div className="stat-num">50+</div>
            <div className="stat-label">Partner Villages</div>
          </div>
          <div className="stat-glass-card">
            <div className="stat-num">100%</div>
            <div className="stat-label">Member Owned</div>
          </div>
        </div>
      </div>

      
      <div className="divisions-showcase reveal">
        <h3 className="showcase-title">Our Multi-Sectoral Reach</h3>
        <div className="showcase-grid">
          <div className="showcase-item" onClick={() => navigate("/agriculture")}>
            <div className="s-icon">🌾</div>
            <h4>Agriculture</h4>
            <p>Empowering farmers with modern tech & collective market access.</p>
          </div>
          <div className="showcase-item" onClick={() => navigate("/divisions/financial")}>
            <div className="s-icon">💰</div>
            <h4>Financial</h4>
            <p>Secure cooperative banking, thrift and low-interest credit.</p>
          </div>
          <div className="showcase-item" onClick={() => navigate("/div-mfg")}>
            <div className="s-icon">🏭</div>
            <h4>Manufacturing</h4>
            <p>Value-added production and industrial cooperative units.</p>
          </div>
          <div className="showcase-item" onClick={() => navigate("/div-svc")}>
            <div className="s-icon">🛠️</div>
            <h4>Retail & Services</h4>
            <p>Direct-to-consumer organic products and service platforms.</p>
          </div>
        </div>
      </div>

      
      <div className="about-journey-section reveal">
        <div className="journey-content">
          <h2 className="sec-lbl" style={{ textAlign: 'center' }}>Our Journey</h2>
          <h2 className="sec-h" style={{ textAlign: 'center' }}>Building a <span>Wish-Fulfilling</span> Legacy</h2>

          <div className="journey-grid">
            <div className="journey-item">
              <h3>The Root (2018)</h3>
              <p>Kalpavruksha began as a small group of 50 dedicated farmers and professionals who believed that the
                traditional cooperative model needed a modern, integrated upgrade. Our goal was simple: mutual aid
                combined with professional excellence.</p>
            </div>
            <div className="journey-item">
              <h3>Growth & Synergy</h3>
              <p>Over the years, we expanded from pure agriculture into 8 distinct yet integrated divisions. This
                synergy allows us to support our members at every stage of their lives—from financial thrift to
                high-tech farming and sustainable housing.</p>
            </div>
            <div className="journey-item">
              <h3>5000+ Strong</h3>
              <p>Today, we are a family of over 5000 active members across 50 partner villages. We remain 100%
                member-owned, ensuring that every dividend and every decision serves the community first.</p>
            </div>
            <div className="journey-item">
              <h3>The Vision Ahead</h3>
              <p>As we grow, we are focusing on "Mana Palle" — our flagship eco-village project that represents the
                pinnacle of cooperative living, sustainable technology, and rural prosperity.</p>
            </div>
          </div>

          <p className="about-footer-note">"Like the Kalpavruksha tree of legend, we exist to fulfill the collective
            aspirations of our community."</p>
        </div>
      </div>

      
      <div className="about-cta-card reveal">
        <h3>Ready to be part of our legacy?</h3>
        <div className="cta-actions">
          <button className="btn-gold" onClick={() => navigate("/membership")}>Join the Cooperative</button>
          <button className="btn-outline-white" onClick={() => navigate("/contact")}>Connect With Us</button>
        </div>
      </div>
    </div>
  </section>
    </>
  );
};

export default About;
