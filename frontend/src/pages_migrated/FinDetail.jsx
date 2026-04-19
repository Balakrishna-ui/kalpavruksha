import React from 'react';
import { useNavigate } from 'react-router-dom';

const FinDetail = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="page" id="page-fin-detail">
    <div id="detailContainer" className="detail-page"></div>
  </section>

  

  
  <div className="page" id="page-srf">
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
      <div className="collab-tags reveal">
        <span className="collab-tag">Thrift Services</span><span className="collab-tag">Savings Schemes</span><span
          className="collab-tag">Fixed Deposits</span><span className="collab-tag">Member Loans</span><span
          className="collab-tag">Credit Operations</span><span className="collab-tag">Cooperative Banking</span><span
          className="collab-tag">Financial Planning</span>
      </div>
      <div className="two-col reveal">
        <div className="about-card">
          <h4>Why This Partnership Matters</h4>
          <p>Sri Ramalingeshwara Federation's institutional knowledge and regulatory compliance expertise ensures
            KalpaVruksha's Financial Services Division operates with full cooperative legal standing and member trust.
          </p>
          <ul>
            <li>Regulatory compliance assurance</li>
            <li>Cooperative finance best practices</li>
            <li>Member financial literacy support</li>
            <li>Long-term institutional credibility</li>
          </ul>
        </div>
        <div className="about-card">
          <h4>Scope of Collaboration</h4>
          <p>The partnership covers the entire financial services vertical — from thrift collection to loan disbursement
            — making the federation an end-to-end financial operations partner for KalpaVruksha.</p>
          <ul>
            <li>Thrift &amp; savings operations</li>
            <li>Loan product design &amp; disbursement</li>
            <li>Financial audit support</li>
            <li>Member financial counselling</li>
          </ul>
        </div>
      </div>
      <div className="partner-cta reveal">
        <div>
          <h3>Interested in Financial Services?</h3>
          <p>Access thrift, savings, fixed deposits, and low-interest member loans through the KalpaVruksha Financial
            Services Division — backed by Sri Ramalingeshwara Federation since 2013.</p>
        </div>
        <button className="btn-gold" onClick={() => navigate("/")}>Open a Member Account →</button>
      </div>
    </div>
  </div>

  
  <div className="page" id="page-sb">
    <div className="partner-hero ph-bg-sb">
      <svg className="ph-geo" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
        <polygon points="500,20 900,220 900,380 500,460 100,380 100,220" fill="none" stroke="rgba(201,168,76,0.08)"
          stroke-width="1" />
        <circle cx="800" cy="100" r="120" fill="none" stroke="rgba(201,168,76,0.06)" stroke-width="1" />
      </svg>
      <div className="ph-content">
        <div className="ph-back" onClick={() => navigate("/")}>← Back to Partners</div>
        <div className="ph-top">
          <div className="ph-logo-big" style={{ background: '#fdf6e0' }}><svg viewBox="0 0 64 64" width="52" height="52">
              <path d="M32 8 L54 22 L54 44 L32 56 L10 44 L10 22 Z" fill="none" stroke="#c9a84c" stroke-width="2" />
              <path d="M32 16 L48 26 L48 42 L32 50 L16 42 L16 26 Z" fill="rgba(201,168,76,0.12)" /><text x="32" y="37"
                text-anchor="middle" font-size="15" font-family="serif" fill="#c9a84c" font-weight="bold">SB</text>
            </svg></div>
          <div>
            <div className="ph-name">Sahakara Bharathi NGO</div>
            <div className="ph-type">National Cooperative Development Organisation</div>
            <div className="ph-badges"><span className="ph-badge pb-div">Governance</span><span className="ph-badge pb-active">●
                Active Partner</span><span className="ph-badge pb-loc">📍 Pan India · Mahabubnagar</span></div>
          </div>
        </div>
        <div className="ph-divider"></div>
        <div className="ph-desc">"Sahakara Bharathi has been instrumental in shaping the cooperative governance framework of
          KalpaVruksha — ensuring every division operates with full MACS compliance and cooperative movement values."
        </div>
      </div>
    </div>
    <div className="partner-body">
      <div className="key-facts reveal">
        <div className="kf-card">
          <div className="kf-icon">🌍</div>
          <div className="kf-val">Pan India</div>
          <div className="kf-label">Reach</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">🏛️</div>
          <div className="kf-val">MACS</div>
          <div className="kf-label">Advisory Focus</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">🎓</div>
          <div className="kf-val">All 8</div>
          <div className="kf-label">Divisions Supported</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">⚖️</div>
          <div className="kf-val">Byelaw 11</div>
          <div className="kf-label">Coverage Guided</div>
        </div>
      </div>
      <div className="sec-lbl reveal">About the Partner</div>
      <h2 className="sec-h reveal">Who is <span>Sahakara Bharathi?</span></h2>
      <p className="sec-p reveal">Sahakara Bharathi is one of India's premier cooperative development organisations,
        promoting the cooperative movement across all states. As KalpaVruksha's governance partner, they provide MACS
        regulatory advisory, cooperative education programs, member training, and help ensure our eight-division
        structure is fully compliant with cooperative law. Their national network and policy influence make them a
        powerful governance anchor for KalpaVruksha's long-term institutional credibility.</p>
      <div className="sec-lbl reveal">What They Mainly Work On</div>
      <div className="works-grid">
        <div className="work-card reveal">
          <div className="wc-icon">📜</div>
          <h4 className="wc-title">MACS Advisory</h4>
          <p className="wc-desc">Regulatory guidance ensuring KalpaVruksha's Multipurpose Cooperative Society structure and
            all eight divisions are fully compliant with MACS Act requirements.</p>
          <ul className="wc-points">
            <li>Byelaw structuring &amp; review</li>
            <li>MACS Act compliance checks</li>
            <li>Registration advisory</li>
            <li>Legal structuring support</li>
          </ul>
        </div>
        <div className="work-card reveal">
          <div className="wc-icon">🎓</div>
          <h4 className="wc-title">Cooperative Education</h4>
          <p className="wc-desc">Training programs for cooperative governance, member rights, democratic decision-making,
            and building a culture of cooperative ownership across KalpaVruksha.</p>
          <ul className="wc-points">
            <li>Member awareness programs</li>
            <li>Board governance training</li>
            <li>Cooperative principles education</li>
            <li>Leadership development</li>
          </ul>
        </div>
        <div className="work-card reveal">
          <div className="wc-icon">⚖️</div>
          <h4 className="wc-title">Policy Advocacy</h4>
          <p className="wc-desc">National-level advocacy for cooperative-friendly policies, government scheme access, and
            representing cooperative interests at state and central government levels.</p>
          <ul className="wc-points">
            <li>Government liaison support</li>
            <li>Cooperative policy updates</li>
            <li>Scheme facilitation</li>
            <li>National cooperative network access</li>
          </ul>
        </div>
      </div>
      <div className="collab-tags reveal"><span className="collab-tag">MACS Compliance</span><span className="collab-tag">Byelaw
          Advisory</span><span className="collab-tag">Cooperative Training</span><span className="collab-tag">Member
          Education</span><span className="collab-tag">Policy Support</span><span className="collab-tag">Governance
          Framework</span></div>
      <div className="partner-cta reveal">
        <div>
          <h3>Governed by the Best</h3>
          <p>KalpaVruksha's cooperative structure is shaped and guided by Sahakara Bharathi — giving members the
            confidence of legally sound, nationally recognised cooperative governance.</p>
        </div><button className="btn-gold" onClick={() => navigate("/")}>Learn About Our Legal Framework →</button>
      </div>
    </div>
  </div>

  
  <div className="page" id="page-kirya">
    <div className="partner-hero ph-bg-kirya">
      <svg className="ph-geo" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
        <rect x="600" y="40" width="120" height="280" rx="2" fill="none" stroke="rgba(32,80,184,0.1)"
          stroke-width="1" />
        <rect x="760" y="0" width="180" height="320" rx="2" fill="none" stroke="rgba(32,80,184,0.08)"
          stroke-width="1" />
        <line x1="0" y1="340" x2="1000" y2="340" stroke="rgba(32,80,184,0.07)" stroke-width="1" />
      </svg>
      <div className="ph-content">
        <div className="ph-back" onClick={() => navigate("/")}>← Back to Partners</div>
        <div className="ph-top">
          <div className="ph-logo-big" style={{ background: '#eaf0fd' }}><svg viewBox="0 0 64 64" width="52" height="52">
              <path d="M10 54 L10 28 L26 14 L42 28 L42 54Z" fill="none" stroke="#2050b8" stroke-width="2" />
              <path d="M42 54 L42 34 L52 24 L62 34 L62 54Z" fill="none" stroke="#2050b8" stroke-width="1.5"
                opacity=".6" />
              <line x1="6" y1="54" x2="58" y2="54" stroke="#2050b8" stroke-width="1.8" opacity=".4" />
              <rect x="18" y="36" width="8" height="14" rx="1" fill="rgba(32,80,184,0.2)" />
            </svg></div>
          <div>
            <div className="ph-name">Kirya Architecture Company</div>
            <div className="ph-type">Architecture &amp; Construction · MoU Partner · Started 2025</div>
            <div className="ph-badges"><span className="ph-badge pb-div">Land &amp; Housing · Mana Palle</span><span
                className="ph-badge pb-mou">◆ MoU Signed 2025</span><span className="ph-badge pb-loc">📍 Mahabubnagar</span>
            </div>
          </div>
        </div>
        <div className="ph-divider"></div>
        <div className="ph-desc">"Kirya Architecture is turning the Mana Palle dream into reality — designing sustainable,
          community-centred homes and eco-village infrastructure that will house hundreds of cooperative families."
        </div>
      </div>
    </div>
    <div className="partner-body">
      <div className="key-facts reveal">
        <div className="kf-card">
          <div className="kf-icon">📄</div>
          <div className="kf-val">MoU</div>
          <div className="kf-label">Partnership Type</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">📅</div>
          <div className="kf-val">2025</div>
          <div className="kf-label">Started</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">🏘️</div>
          <div className="kf-val">2</div>
          <div className="kf-label">Active Projects</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">🏗️</div>
          <div className="kf-val">Eco Design</div>
          <div className="kf-label">Specialisation</div>
        </div>
      </div>
      <div className="sec-lbl reveal">About the Partner</div>
      <h2 className="sec-h reveal">Who is <span>Kirya Architecture Company?</span></h2>
      <p className="sec-p reveal">Kirya Architecture Company is a professional architecture and construction firm engaged by
        KalpaVruksha through a formal MoU for the Land &amp; Housing Development Division and the Mana Palle Eco Village
        flagship project. They bring professional expertise in residential layout planning, sustainable
        eco-architecture, and construction management — making the cooperative housing vision a built reality for member
        families in Mahabubnagar.</p>
      <div className="sec-lbl reveal">What They Mainly Work On</div>
      <div className="works-grid">
        <div className="work-card reveal">
          <div className="wc-icon">📐</div>
          <h4 className="wc-title">Layout Planning</h4>
          <p className="wc-desc">Professional residential plot and layout planning for cooperative housing projects —
            RERA-compliant designs with road access, drainage, and community spaces.</p>
          <ul className="wc-points">
            <li>Site survey &amp; feasibility</li>
            <li>Residential plot design</li>
            <li>Road &amp; drainage planning</li>
            <li>RERA compliance support</li>
          </ul>
        </div>
        <div className="work-card reveal">
          <div className="wc-icon">🏘️</div>
          <h4 className="wc-title">Eco Village Design</h4>
          <p className="wc-desc">Sustainable architecture design for the Mana Palle cooperative eco-village — integrating
            solar energy, rainwater harvesting, and green building principles.</p>
          <ul className="wc-points">
            <li>Eco-friendly home design</li>
            <li>Solar integration planning</li>
            <li>Rainwater harvesting systems</li>
            <li>Green building certification</li>
          </ul>
        </div>
        <div className="work-card reveal">
          <div className="wc-icon">🔨</div>
          <h4 className="wc-title">Construction Management</h4>
          <p className="wc-desc">End-to-end construction oversight for member housing schemes — ensuring quality, cost
            control, and timely delivery of cooperative housing projects.</p>
          <ul className="wc-points">
            <li>Project management</li>
            <li>Quality control oversight</li>
            <li>Contractor management</li>
            <li>Progress reporting to society</li>
          </ul>
        </div>
      </div>
      <div className="collab-tags reveal"><span className="collab-tag">Land Pooling</span><span className="collab-tag">Layout
          Development</span><span className="collab-tag">Eco Village</span><span className="collab-tag">Housing
          Construction</span><span className="collab-tag">Mana Palle Project</span><span className="collab-tag">Green
          Architecture</span></div>
      <div className="partner-cta reveal">
        <div>
          <h3>Interested in Cooperative Housing?</h3>
          <p>The Land &amp; Housing Division is accepting early member registrations for priority allotment in
            cooperative housing and Mana Palle eco-village projects designed by Kirya Architecture.</p>
        </div><button className="btn-gold" onClick={() => navigate("/")}>Register Early Interest →</button>
      </div>
    </div>
  </div>

  
  <div className="page" id="page-prds">
    <div className="partner-hero ph-bg-prds">
      <svg className="ph-geo" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
        <path d="M500 20 Q600 120 550 220 Q500 320 550 400" stroke="rgba(60,160,40,0.1)" stroke-width="2" fill="none" />
        <path d="M500 20 Q400 120 450 220 Q500 320 450 400" stroke="rgba(60,160,40,0.07)" stroke-width="1.5"
          fill="none" />
        <ellipse cx="800" cy="300" rx="200" ry="120" fill="rgba(60,160,40,0.05)" />
      </svg>
      <div className="ph-content">
        <div className="ph-back" onClick={() => navigate("/")}>← Back to Partners</div>
        <div className="ph-top">
          <div className="ph-logo-big" style={{ background: '#eaf5e4' }}><svg viewBox="0 0 64 64" width="52" height="52">
              <path d="M32 54 L32 18" stroke="#3a7a20" stroke-width="2.5" stroke-linecap="round" />
              <path d="M32 36 Q18 26 14 10 Q26 8 32 24" fill="rgba(60,160,40,0.5)" stroke="#3a7a20"
                stroke-width="1.3" />
              <path d="M32 26 Q46 16 50 2 Q38 2 32 22" fill="rgba(60,160,40,0.4)" stroke="#3a7a20" stroke-width="1.3" />
              <path d="M32 46 Q20 40 16 26 Q28 24 32 38" fill="rgba(60,160,40,0.45)" stroke="#3a7a20"
                stroke-width="1.3" />
            </svg></div>
          <div>
            <div className="ph-name">Palamuru Rythu Development Society</div>
            <div className="ph-type">Farmer Development Society · Mahabubnagar, Telangana</div>
            <div className="ph-badges"><span className="ph-badge pb-div">Agriculture Division</span><span
                className="ph-badge pb-active">● Agriculture Partner</span><span className="ph-badge pb-loc">📍
                Mahabubnagar</span></div>
          </div>
        </div>
        <div className="ph-divider"></div>
        <div className="ph-desc">"Palamuru Rythu Development Society connects our 500+ farmer members to markets, adds value
          to their produce, and powers the Custard Apple Kulfi manufacturing initiative — bringing real income uplift to
          farming families."</div>
      </div>
    </div>
    <div className="partner-body">
      <div className="key-facts reveal">
        <div className="kf-card">
          <div className="kf-icon">👨🌾</div>
          <div className="kf-val">500+</div>
          <div className="kf-label">Farmer Members</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">🥦</div>
          <div className="kf-val">3</div>
          <div className="kf-label">Service Areas</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">🍦</div>
          <div className="kf-val">Kulfi</div>
          <div className="kf-label">Signature Product</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">📍</div>
          <div className="kf-val">Mahabubnagar</div>
          <div className="kf-label">Region</div>
        </div>
      </div>
      <div className="sec-lbl reveal">About the Partner</div>
      <h2 className="sec-h reveal">Who is <span>Palamuru Rythu Development Society?</span></h2>
      <p className="sec-p reveal">Palamuru Rythu Development Society is a farmer-focused development organisation serving
        the Mahabubnagar region of Telangana. As KalpaVruksha's primary agriculture partner, they power the produce
        trading network, support agri value addition, and are a key manufacturing partner for the Custard Apple Kulfi —
        our signature food processing product made entirely from member-farmed sitaphal.</p>
      <div className="sec-lbl reveal">What They Mainly Work On</div>
      <div className="works-grid">
        <div className="work-card reveal">
          <div className="wc-icon">🥦</div>
          <h4 className="wc-title">Produce Trading</h4>
          <p className="wc-desc">Cooperative marketing of fruits and vegetables from member farms — connecting KalpaVruksha
            farmers directly to urban markets, retailers, and bulk buyers for better price realisation.</p>
          <ul className="wc-points">
            <li>Fruits &amp; vegetable marketing</li>
            <li>Retail &amp; wholesale linkages</li>
            <li>Market price advisory</li>
            <li>Cooperative bulk trading</li>
          </ul>
        </div>
        <div className="work-card reveal">
          <div className="wc-icon">🌿</div>
          <h4 className="wc-title">Agri Value Addition</h4>
          <p className="wc-desc">Processing and packaging farm produce into value-added products — increasing the income
            margin for member farmers beyond raw commodity prices.</p>
          <ul className="wc-points">
            <li>Farm produce processing</li>
            <li>Packaging &amp; branding support</li>
            <li>Storage &amp; cold chain</li>
            <li>Higher margin realisation</li>
          </ul>
        </div>
        <div className="work-card reveal">
          <div className="wc-icon">🍦</div>
          <h4 className="wc-title">Custard Apple Kulfi</h4>
          <p className="wc-desc">KalpaVruksha's signature manufactured product — artisanal kulfi made from locally grown
            sitaphal sourced from our member farmers through Palamuru Rythu Development Society.</p>
          <ul className="wc-points">
            <li>Sitaphal sourcing from members</li>
            <li>Kulfi manufacturing &amp; packaging</li>
            <li>100% natural ingredients</li>
            <li>Retail &amp; wholesale distribution</li>
          </ul>
        </div>
      </div>
      <div className="collab-tags reveal"><span className="collab-tag">Produce Trading</span><span className="collab-tag">Farmer
          Network</span><span className="collab-tag">Agri Value Addition</span><span className="collab-tag">Kulfi
          Manufacturing</span><span className="collab-tag">Cooperative Marketing</span><span className="collab-tag">Food
          Processing</span></div>
      <div className="partner-cta reveal">
        <div>
          <h3>Are You a Farmer?</h3>
          <p>Join our Agriculture Division — backed by Palamuru Rythu Development Society — to access cooperative
            markets, value-addition infrastructure, and better prices for your produce.</p>
        </div><button className="btn-gold" onClick={() => navigate("/")}>Join as Farmer Member →</button>
      </div>
    </div>
  </div>

  
  <div className="page" id="page-bks">
    <div className="partner-hero ph-bg-bks">
      <svg className="ph-geo" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
        <circle cx="800" cy="200" r="200" fill="none" stroke="rgba(90,122,26,0.08)" stroke-width="1" />
        <circle cx="800" cy="200" r="140" fill="none" stroke="rgba(90,122,26,0.06)" stroke-width="1" />
        <circle cx="800" cy="200" r="80" fill="rgba(90,122,26,0.04)" />
      </svg>
      <div className="ph-content">
        <div className="ph-back" onClick={() => navigate("/")}>← Back to Partners</div>
        <div className="ph-top">
          <div className="ph-logo-big" style={{ background: '#f4f8ec' }}><svg viewBox="0 0 64 64" width="52" height="52">
              <circle cx="32" cy="32" r="22" fill="none" stroke="#5a7a1a" stroke-width="2" />
              <path d="M32 12 L36 24 L48 24 L38 32 L42 44 L32 36 L22 44 L26 32 L16 24 L28 24Z" fill="none"
                stroke="#5a7a1a" stroke-width="1.5" />
              <circle cx="32" cy="32" r="5" fill="rgba(90,122,26,0.25)" />
            </svg></div>
          <div>
            <div className="ph-name">Bharath Kisan Sangh</div>
            <div className="ph-type">National Farmers' Organisation · Pan India</div>
            <div className="ph-badges"><span className="ph-badge pb-div">Agriculture Division</span><span
                className="ph-badge pb-active">● Farmer Network Partner</span><span className="ph-badge pb-loc">📍 Pan India ·
                Mahabubnagar</span></div>
          </div>
        </div>
        <div className="ph-divider"></div>
        <div className="ph-desc">"Bharath Kisan Sangh gives our farmer members the collective voice, national market reach,
          and policy influence of one of India's largest farmers' organisations — amplifying every rupee they earn."
        </div>
      </div>
    </div>
    <div className="partner-body">
      <div className="key-facts reveal">
        <div className="kf-card">
          <div className="kf-icon">🌍</div>
          <div className="kf-val">Pan India</div>
          <div className="kf-label">Network Reach</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">🏛️</div>
          <div className="kf-val">National</div>
          <div className="kf-label">Organisation Scale</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">📣</div>
          <div className="kf-val">Policy</div>
          <div className="kf-label">Advocacy Strength</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">🛒</div>
          <div className="kf-val">Markets</div>
          <div className="kf-label">Linkage Type</div>
        </div>
      </div>
      <div className="sec-lbl reveal">About the Partner</div>
      <h2 className="sec-h reveal">Who is <span>Bharath Kisan Sangh?</span></h2>
      <p className="sec-p reveal">Bharath Kisan Sangh is one of India's largest and most respected farmers' organisations,
        with a pan-India presence and deep policy influence. Through this strategic partnership, KalpaVruksha's
        Agriculture Division members gain access to a national farmer network, collective bargaining power, government
        scheme facilitation, and market linkages that would otherwise be inaccessible to small cooperative farmers in
        Mahabubnagar district.</p>
      <div className="sec-lbl reveal">What They Mainly Work On</div>
      <div className="works-grid">
        <div className="work-card reveal">
          <div className="wc-icon">👨🌾</div>
          <h4 className="wc-title">Farmer Network Access</h4>
          <p className="wc-desc">Pan-India farmer network connecting KalpaVruksha members to fellow cooperative farmers for
            knowledge sharing, peer support, and collective market access.</p>
          <ul className="wc-points">
            <li>National farmer connectivity</li>
            <li>Knowledge sharing programs</li>
            <li>Peer cooperative support</li>
            <li>Farmer capacity building</li>
          </ul>
        </div>
        <div className="work-card reveal">
          <div className="wc-icon">📣</div>
          <h4 className="wc-title">Agricultural Policy</h4>
          <p className="wc-desc">Policy advocacy and government scheme facilitation ensuring KalpaVruksha farmer members
            access every available government benefit, subsidy, and support scheme.</p>
          <ul className="wc-points">
            <li>Government scheme access</li>
            <li>Agricultural subsidy guidance</li>
            <li>Policy representation</li>
            <li>Farmer rights advocacy</li>
          </ul>
        </div>
        <div className="work-card reveal">
          <div className="wc-icon">🛒</div>
          <h4 className="wc-title">Market Linkages</h4>
          <p className="wc-desc">Cooperative access to pan-India agricultural markets — giving KalpaVruksha farmers
            collective bargaining power for better commodity prices and premium market channels.</p>
          <ul className="wc-points">
            <li>Bulk buyer connections</li>
            <li>Market price intelligence</li>
            <li>Collective negotiation support</li>
            <li>Export market facilitation</li>
          </ul>
        </div>
      </div>
      <div className="collab-tags reveal"><span className="collab-tag">Farmer Network</span><span className="collab-tag">Market
          Linkages</span><span className="collab-tag">Agricultural Policy</span><span className="collab-tag">Collective
          Bargaining</span><span className="collab-tag">Pan-India Reach</span><span className="collab-tag">Government
          Schemes</span></div>
      <div className="partner-cta reveal">
        <div>
          <h3>Join the Farmer Network</h3>
          <p>As a KalpaVruksha Agriculture member, you automatically gain access to the Bharath Kisan Sangh network —
            collective market power, policy benefits, and pan-India connectivity.</p>
        </div><button className="btn-gold" onClick={() => navigate("/")}>Become a Farmer Member →</button>
      </div>
    </div>
  </div>

  
  <div className="page" id="page-ecolimits">
    <div className="partner-hero ph-bg-ecolimits">
      <svg className="ph-geo" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
        <path d="M100 350 Q300 200 500 220 Q700 240 900 100" stroke="rgba(26,138,74,0.1)" stroke-width="2"
          fill="none" />
        <circle cx="850" cy="100" r="100" fill="rgba(26,138,74,0.05)" />
      </svg>
      <div className="ph-content">
        <div className="ph-back" onClick={() => navigate("/")}>← Back to Partners</div>
        <div className="ph-top">
          <div className="ph-logo-big" style={{ background: '#eafaf0' }}><svg viewBox="0 0 64 64" width="52" height="52">
              <circle cx="32" cy="32" r="22" fill="none" stroke="#1a8a4a" stroke-width="2" />
              <path d="M22 42 C22 26 32 18 44 20" stroke="#1a8a4a" stroke-width="2" fill="none"
                stroke-linecap="round" />
              <path d="M44 20 C46 32 42 44 32 46" stroke="#1a8a4a" stroke-width="2" fill="none"
                stroke-linecap="round" />
              <path d="M32 46 C26 46 22 42 22 42" stroke="#1a8a4a" stroke-width="2" fill="none"
                stroke-linecap="round" />
              <circle cx="32" cy="32" r="5" fill="rgba(26,138,74,0.2)" />
            </svg></div>
          <div>
            <div className="ph-name">Ecolimits</div>
            <div className="ph-type">Eco Products Manufacturer · MoU Partner</div>
            <div className="ph-badges"><span className="ph-badge pb-div">Manufacturing Division</span><span
                className="ph-badge pb-mou">◆ MoU Collaboration Stage</span><span className="ph-badge pb-loc">📍
                Mahabubnagar</span></div>
          </div>
        </div>
        <div className="ph-divider"></div>
        <div className="ph-desc">"Ecolimits brings the technical expertise to turn our biodegradable carry bag vision into a
          cooperative manufacturing reality — eco-conscious products that create employment and protect the
          environment."</div>
      </div>
    </div>
    <div className="partner-body">
      <div className="key-facts reveal">
        <div className="kf-card">
          <div className="kf-icon">📄</div>
          <div className="kf-val">MoU</div>
          <div className="kf-label">Partnership Type</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">♻️</div>
          <div className="kf-val">Eco</div>
          <div className="kf-label">Product Focus</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">⚙️</div>
          <div className="kf-val">Tech</div>
          <div className="kf-label">Expertise Provided</div>
        </div>
        <div className="kf-card">
          <div className="kf-icon">🏅</div>
          <div className="kf-val">Certified</div>
          <div className="kf-label">Eco Standards</div>
        </div>
      </div>
      <div className="sec-lbl reveal">About the Partner</div>
      <h2 className="sec-h reveal">Who is <span>Ecolimits?</span></h2>
      <p className="sec-p reveal">Ecolimits is a specialised eco-products manufacturing company engaged by KalpaVruksha
        through a formal MoU for the biodegradable carry bags production unit within the Manufacturing Division. They
        provide the full package of technical expertise — production line setup, eco-material sourcing, manufacturing
        machinery knowledge, and eco-certification support — enabling KalpaVruksha to establish a cooperative
        manufacturing unit that is both commercially viable and environmentally responsible.</p>
      <div className="sec-lbl reveal">What They Mainly Work On</div>
      <div className="works-grid">
        <div className="work-card reveal">
          <div className="wc-icon">🛍️</div>
          <h4 className="wc-title">Biodegradable Carry Bags</h4>
          <p className="wc-desc">100% biodegradable carry bags manufactured using natural jute and cotton fibres — an
            eco-friendly alternative to plastic bags for retailers across Telangana.</p>
          <ul className="wc-points">
            <li>Jute &amp; cotton fibre sourcing</li>
            <li>Bag design &amp; manufacturing</li>
            <li>Custom printing for retailers</li>
            <li>Bulk supply to supermarkets</li>
          </ul>
        </div>
        <div className="work-card reveal">
          <div className="wc-icon">⚙️</div>
          <h4 className="wc-title">Manufacturing Technology</h4>
          <p className="wc-desc">Complete production line setup — from machinery selection to operator training — enabling
            KalpaVruksha to run a self-sufficient cooperative manufacturing unit.</p>
          <ul className="wc-points">
            <li>Production line design</li>
            <li>Machinery selection &amp; setup</li>
            <li>Operator skill training</li>
            <li>Quality control systems</li>
          </ul>
        </div>
        <div className="work-card reveal">
          <div className="wc-icon">🏅</div>
          <h4 className="wc-title">Eco Certification</h4>
          <p className="wc-desc">Eco-certification and quality compliance support — ensuring KalpaVruksha's manufactured
            products meet national eco-standards and government biodegradable product requirements.</p>
          <ul className="wc-points">
            <li>Eco-certification process guidance</li>
            <li>Government compliance support</li>
            <li>Quality audit framework</li>
            <li>Certification maintenance</li>
          </ul>
        </div>
      </div>
      <div className="collab-tags reveal"><span className="collab-tag">Biodegradable Bags</span><span
          className="collab-tag">Manufacturing Setup</span><span className="collab-tag">Technical Training</span><span
          className="collab-tag">Eco Certification</span><span className="collab-tag">Custom Printing</span><span
          className="collab-tag">Retail Supply</span></div>
      <div className="partner-cta reveal">
        <div>
          <h3>Partner with Our Manufacturing Unit</h3>
          <p>Retailers, supermarkets, and bulk buyers — our eco-friendly biodegradable carry bags are available for bulk
            supply. Powered by the Ecolimits MoU partnership.</p>
        </div><button className="btn-gold" onClick={() => navigate("/")}>Enquire for Bulk Orders →</button>
      </div>
    </div>
  </div>
    </>
  );
};

export default FinDetail;
