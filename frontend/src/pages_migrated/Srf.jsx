import React from 'react';
import { useNavigate } from 'react-router-dom';

const Srf = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="page" id="page-srf">
    <div className="partner-hero ph-bg-srf">
      <svg className="ph-geo" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
        <rect x="700" y="-30" width="120" height="460" rx="4" fill="rgba(42,138,42,0.06)"
          transform="rotate(12 760 200)" />
        <rect x="760" y="-30" width="60" height="460" rx="4" fill="rgba(42,138,42,0.04)"
          transform="rotate(12 790 200)" />
        <circle cx="850" cy="80" r="150" fill="none" stroke="rgba(42,138,42,0.08)" stroke-width="1" />
      </svg>
      <div className="ph-content">
        <div className="ph-back" onClick={() => navigate("/")}>← Back to Partners</div>
        <div className="ph-top">
          <div className="ph-logo-big" style={{ background: '#eaf5ea' }}>
            <svg viewBox="0 0 64 64" width="52" height="52">
              <rect x="8" y="28" width="8" height="26" rx="2" fill="#2a8a2a" />
              <rect x="20" y="18" width="8" height="36" rx="2" fill="#2a8a2a" />
              <rect x="32" y="10" width="8" height="44" rx="2" fill="#2a8a2a" />
              <rect x="44" y="22" width="8" height="32" rx="2" fill="#2a8a2a" opacity=".8" />
              <line x1="6" y1="56" x2="58" y2="56" stroke="#2a8a2a" stroke-width="2" opacity=".4" />
              <path d="M8 26 L20 16 L32 8 L44 20" stroke="#4ab84a" stroke-width="1.5" fill="none" opacity=".7" />
            </svg>
          </div>
          <div>
            <div className="ph-name">Sri Ramalingeshwara Federation</div>
            <div className="ph-type">Cooperative Credit Federation · Shadnagar, Mahabubnagar, Telangana</div>
            <div className="ph-badges">
              <span className="ph-badge pb-div">Financial Services Division</span>
              <span className="ph-badge pb-active">● Core Partner</span>
              <span className="ph-badge pb-loc">📍 Shadnagar, Mahabubnagar</span>
              <span className="ph-badge pb-active">Since 2013</span>
            </div>
          </div>
        </div>
        <div className="ph-divider"></div>
        <div className="ph-desc">"The financial backbone of KalpaVruksha — empowering thrift, credit, and cooperative
          savings for hundreds of member families across Mahabubnagar district since our founding."</div>
      </div>
    </div>
    <div className="partner-body">
      <div className="key-facts reveal">
        <div className="kf-card">
          <div className="kf-icon">📅</div>
          <div className="kf-val">2013</div>
          <div className="kf-label">Partnership Since</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">🏦</div>
          <div className="kf-val">Core</div>
          <div className="kf-label">Partner Status</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">💰</div>
          <div className="kf-val">4</div>
          <div className="kf-label">Service Areas</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">📍</div>
          <div className="kf-val">Shadnagar</div>
          <div className="kf-label">Location</div>
        </div>
      </div>
      <div className="sec-lbl reveal">About the Partner</div>
      <h2 className="sec-h reveal">Who is <span>Sri Ramalingeshwara Federation?</span></h2>
      <p className="sec-p reveal">Sri Ramalingeshwara Federation is a registered cooperative credit federation that has
        served as the financial backbone of KalpaVruksha Cooperative Society since its founding in 2013. The federation
        brings deep institutional expertise in cooperative finance, thrift management, member credit operations, and
        savings mobilisation across the Mahabubnagar district of Telangana. Their long-standing presence in the
        cooperative finance ecosystem makes them an invaluable cornerstone partner for our Financial Services Division.
      </p>
      <div className="sec-lbl reveal">What They Mainly Work On</div>
      <div className="works-grid">
        <div className="work-card reveal">
          <div className="wc-icon">💰</div>
          <h4 className="wc-title">Thrift Management</h4>
          <p className="wc-desc">Collective thrift collection and management for cooperative member savings, building the
            capital base that powers KalpaVruksha's lending operations.</p>
          <ul className="wc-points">
            <li>Weekly &amp; monthly thrift collection</li>
            <li>Door-step collection service</li>
            <li>Transparent member ledger</li>
            <li>Annual dividend on thrift</li>
          </ul>
        </div>
        <div className="work-card reveal">
          <div className="wc-icon">🏦</div>
          <h4 className="wc-title">Credit Operations</h4>
          <p className="wc-desc">Member credit underwriting and loan portfolio management — enabling KalpaVruksha to offer
            low-interest cooperative loans across agriculture, housing, and education.</p>
          <ul className="wc-points">
            <li>Credit assessment framework</li>
            <li>Loan portfolio management</li>
            <li>Recovery support systems</li>
            <li>NPA management guidance</li>
          </ul>
        </div>
        <div className="work-card reveal">
          <div className="wc-icon">📊</div>
          <h4 className="wc-title">Financial Advisory</h4>
          <p className="wc-desc">Expert cooperative financial planning, deposit scheme design, and savings product
            structuring tailored to member income levels and community needs.</p>
          <ul className="wc-points">
            <li>Fixed deposit scheme design</li>
            <li>Savings product structuring</li>
            <li>Interest rate advisory</li>
            <li>Profit distribution planning</li>
          </ul>
        </div>
      </div>
      <div className="sec-lbl reveal">Collaboration Areas</div>
    </div>
  </section>
    </>
  );
};

export default Srf;
