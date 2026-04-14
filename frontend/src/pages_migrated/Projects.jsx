import React from 'react';

const Projects = () => {
  return (
    <>
      <section className="page" id="page-projects">
    <div className="page-hero" style={{ background: 'linear-gradient(135deg, #0d1a2a 0%, #1a2a3a 50%, #102030 100%)' }}>
      <div className="page-hero-content">
        <h1>Our <span className="gold">Projects</span></h1>
        <p>Transforming communities through purposeful action</p>
      </div>
    </div>
    <div className="page-body">
      <div className="projects-filter">
        <button className="filter-btn active" data-filter="all">All</button>
        <button className="filter-btn" data-filter="ongoing">Ongoing</button>
        <button className="filter-btn" data-filter="completed">Completed</button>
        <button className="filter-btn" data-filter="upcoming">Upcoming</button>
      </div>
      <div className="projects-grid">
        <div className="project-card" data-status="ongoing" id="mana-palle">
          <div className="pc-badge ongoing">Ongoing</div>
          <div className="pc-icon">🏘️</div>
          <h4>Mana Palle Phase 1</h4>
          <div id="proj-vision">
            <p><strong>Vision & Concept:</strong> A self-sustaining eco-village combining modern amenities with rural
              serenity.</p>
          </div>
          <p>Construction of 120 eco-friendly homes in the first phase of our sustainable village project.</p>
          <div id="proj-stage" className="pc-progress">
            <div className="pc-bar" style={{ width: '68%' }}></div>
          </div>
          <span className="pc-progress-label">68% Complete (Development Stage)</span>
        </div>
        
      </div>
    </div>
  </section>

  
    </>
  );
};

export default Projects;
