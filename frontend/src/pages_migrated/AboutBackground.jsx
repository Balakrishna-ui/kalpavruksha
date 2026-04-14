import React from 'react';

const AboutBackground = () => {
  return (
    <>
      <section className="page" id="page-about-background">
    <div className="page-hero" style={{ background: 'url(\'assets/forest_bg_premium.jpg\') center/cover' }}>
      <div className="page-hero-content">
        <h1>Society <span className="gold">Background</span></h1>
        <p>Tracing our roots and the story of our growth.</p>
      </div>
    </div>
    <div className="page-body">
      <div className="standalone-content">
        <h2 className="sec-lbl">Our Story</h2>
        <h2 className="sec-h">From Vision to <span>Reality</span></h2>
        <p>Kalpavruksha — named after the mythological wish-fulfilling tree — is a community-driven cooperative
          ecosystem that transforms lives through integrated economic development. Founded on the principles of mutual
          aid, transparency, and sustainability, we bring together members from diverse backgrounds to build a
          prosperous future together.</p>
        <p>Our cooperative model integrates finance, agriculture, eco-village living, industrial services, knowledge
          sharing, and sustainable development into a cohesive ecosystem where every member benefits and contributes.
        </p>
        <div className="story-img-placeholder"
          style={{ width: '100%', height: '300px', background: '#f0f0f0', borderRadius: '15px', margin: '30px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
          [Legacy Growth Image]</div>
      </div>
    </div>
  </section>

  
    </>
  );
};

export default AboutBackground;
