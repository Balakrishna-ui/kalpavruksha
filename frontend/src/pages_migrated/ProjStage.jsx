import React from 'react';

const ProjStage = () => {
  return (
    <>
      <section className="page" id="page-proj-stage">
    <div className="page-hero" style={{ background: '#34495e' }}>
      <div className="page-hero-content">
        <h1>Live <span className="gold">Progress</span></h1>
        <p>Real-time updates on our current construction sites.</p>
      </div>
    </div>
    <div className="page-body">
      <div className="standalone-content">
        <div className="progress-bar-wrap"
          style={{ background: '#eee', height: '30px', borderRadius: '15px', marginBottom: '20px' }}>
          <div className="progress-fill"
            style={{ background: 'var(--gold)', height: '100%', width: '68%', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            68% Complete</div>
        </div>
        <p>Phase 1 utility infrastructure is fully laid out. Individual house construction has begun on 42 plots.</p>
      </div>
    </div>
  </section>

  
    </>
  );
};

export default ProjStage;
