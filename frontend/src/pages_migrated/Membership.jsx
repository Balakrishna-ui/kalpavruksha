import React from 'react';

const Membership = () => {
  return (
    <>
      <section className="page" id="page-membership">
    <div className="page-hero" style={{ background: 'linear-gradient(135deg, #1a1000 0%, #2a2000 50%, #1e1800 100%)' }}>
      <div className="page-hero-content">
        <h1>Join the <span className="gold">Kalpavruksha</span> Family</h1>
        <p>Become a member and grow together with thousands of empowered families</p>
      </div>
    </div>
    <div className="page-body">
      <div className="membership-plans">
        <div className="plan-card">
          <div className="plan-badge">Basic</div>
          <div className="plan-price">₹500<span>/year</span></div>
          <ul>
            <li>✅ Cooperative savings account</li>
            <li>✅ Access to micro-credit</li>
            <li>✅ Annual general meeting voting rights</li>
            <li>✅ Community newsletter</li>
            <li>❌ Eco-village access</li>
            <li>❌ Industrial services</li>
          </ul>
          <button className="btn-plan" onClick={() => openMemberForm('Basic')}>Join Now</button>
        </div>
        <div className="plan-card featured">
          <div className="plan-badge">Standard ⭐ Popular</div>
          <div className="plan-price">₹2,000<span>/year</span></div>
          <ul>
            <li>✅ All Basic benefits</li>
            <li>✅ Agriculture program access</li>
            <li>✅ Health camp access</li>
            <li>✅ Training programs</li>
            <li>✅ Eco-village visit rights</li>
            <li>❌ Industrial shareholding</li>
          </ul>
          <button className="btn-plan gold-plan" onClick={() => openMemberForm('Standard')}>Join Now</button>
        </div>
        <div className="plan-card">
          <div className="plan-badge">Premium</div>
          <div className="plan-price">₹5,000<span>/year</span></div>
          <ul>
            <li>✅ All Standard benefits</li>
            <li>✅ Eco-village residential rights</li>
            <li>✅ Industrial co-ownership share</li>
            <li>✅ Priority credit access</li>
            <li>✅ Board election eligibility</li>
            <li>✅ Annual profit sharing</li>
          </ul>
          <button className="btn-plan" onClick={() => openMemberForm('Premium')}>Join Now</button>
        </div>
      </div>

      
      <div className="modal" id="memberModal">
        <div className="modal-box">
          <button className="modal-close" onClick={() => closeMemberForm()}>✕</button>
          <h3>Membership Application</h3>
          <p id="modal-plan-label" className="modal-plan-label"></p>
          <div className="form-group"><label>Full Name</label><input type="text" id="f-name" placeholder="Your full name" />
          </div>
          <div className="form-group"><label>Mobile Number</label><input type="tel" id="f-phone"
              placeholder="+91 XXXXX XXXXX" /></div>
          <div className="form-group"><label>Email Address</label><input type="email" id="f-email"
              placeholder="your@email.com" /></div>
          <div className="form-group"><label>Village / City</label><input type="text" id="f-location"
              placeholder="Your location" /></div>
          <div className="form-group"><label>District</label><input type="text" id="f-district"
              placeholder="Your district" /></div>
          <div className="form-row">
            <button className="btn-cancel" onClick={() => closeMemberForm()}>Cancel</button>
            <button className="btn-submit" onClick={() => submitMembership()}>Submit Application</button>
          </div>
          <div id="form-success" className="form-success" style={{ display: 'none' }}>
            🎉 Thank you! Your application has been submitted. Our team will contact you within 48 hours.
          </div>
        </div>
      </div>
    </div>
  </section>

  
  
    </>
  );
};

export default Membership;
