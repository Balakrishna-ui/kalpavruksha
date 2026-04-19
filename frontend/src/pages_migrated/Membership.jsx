import React, { useState } from 'react';
import { Shield, Star, Crown, Check, ArrowRight, X } from 'lucide-react';

const Membership = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    district: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const openMemberForm = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    setIsSuccess(false);
    setError('');
  };

  const closeMemberForm = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const keyMap = {
      'f-name': 'fullName',
      'f-phone': 'phone',
      'f-email': 'email',
      'f-location': 'location',
      'f-district': 'district'
    };
    setFormData(prev => ({ ...prev, [keyMap[id]]: value }));
  };

  const submitMembership = async () => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/membership`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          membershipType: selectedPlan
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application. Please try again.');
      }

      setIsSuccess(true);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        location: '',
        district: ''
      });
      
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="page" id="page-membership">
        <div className="page-hero" style={{ background: 'linear-gradient(135deg, #0a0b1e 0%, #1a234d 100%)' }}>
          <div className="page-hero-content">
            <h1 className="animate-fadeIn">Join the <span className="text-blue-400">Kalpavruksha</span> Family</h1>
            <p className="text-white/40 font-medium max-w-lg mx-auto">Become a member and grow together with thousands of empowered families</p>
          </div>
        </div>
        
        <div className="page-body !py-20">
          <div className="membership-plans">
            {/* Basic Plan */}
            <div className="plan-card">
              <div className="text-center">
                <div className="plan-badge">Basic</div>
                <div className="plan-icon-wrap">
                  <div className="plan-icon-inner">
                    <Shield size={28} />
                  </div>
                </div>
                <div className="plan-price">₹500<span>/year</span></div>
                <span className="plan-sub">Essential for individuals</span>
              </div>
              <ul>
                <li className="plan-feature-item">
                  <div className="plan-feature-icon"><Check size={12} /></div>
                  Cooperative savings account
                </li>
                <li className="plan-feature-item">
                  <div className="plan-feature-icon"><Check size={12} /></div>
                  Access to micro-credit
                </li>
                <li className="plan-feature-item">
                  <div className="plan-feature-icon"><Check size={12} /></div>
                  Annual general meeting voting
                </li>
                <li className="plan-feature-item">
                  <div className="plan-feature-icon"><Check size={12} /></div>
                  Community newsletter
                </li>
                <li className="plan-feature-item opacity-30">
                  <div className="plan-feature-icon bg-gray-500/20 text-gray-500"><X size={12} /></div>
                  Eco-village access
                </li>
              </ul>
              <button className="btn-plan" onClick={() => openMemberForm('Basic')}>
                Get Started <ArrowRight size={18} className="btn-icon" />
              </button>
            </div>
            
            {/* Standard Plan */}
            <div className="plan-card featured">
              <div className="text-center">
                <div className="plan-badge">Standard ⭐ Popular</div>
                <div className="plan-icon-wrap">
                  <div className="plan-icon-inner !text-emerald-400 !bg-emerald-400/10">
                    <Star size={28} />
                  </div>
                </div>
                <div className="plan-price">₹2,000<span>/year</span></div>
                <span className="plan-sub">Expanded community benefits</span>
              </div>
              <ul>
                <li className="plan-feature-item">
                  <div className="plan-feature-icon !bg-emerald-400/20 !text-emerald-400"><Check size={12} /></div>
                  All Basic benefits
                </li>
                <li className="plan-feature-item">
                  <div className="plan-feature-icon !bg-emerald-400/20 !text-emerald-400"><Check size={12} /></div>
                  Agriculture program access
                </li>
                <li className="plan-feature-item">
                  <div className="plan-feature-icon !bg-emerald-400/20 !text-emerald-400"><Check size={12} /></div>
                  Health camp access
                </li>
                <li className="plan-feature-item">
                  <div className="plan-feature-icon !bg-emerald-400/20 !text-emerald-400"><Check size={12} /></div>
                  Training programs
                </li>
                <li className="plan-feature-item">
                  <div className="plan-feature-icon !bg-emerald-400/20 !text-emerald-400"><Check size={12} /></div>
                  Eco-village visit rights
                </li>
              </ul>
              <button className="btn-plan !bg-emerald-600 hover:!bg-emerald-500 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)]" onClick={() => openMemberForm('Standard')}>
                Get Started <ArrowRight size={18} className="btn-icon" />
              </button>
            </div>
            
            {/* Premium Plan */}
            <div className="plan-card">
              <div className="text-center">
                <div className="plan-badge">Premium</div>
                <div className="plan-icon-wrap">
                  <div className="plan-icon-inner !text-purple-400 !bg-purple-400/10">
                    <Crown size={28} />
                  </div>
                </div>
                <div className="plan-price">₹5,000<span>/year</span></div>
                <span className="plan-sub">Full ownership & shareholding</span>
              </div>
              <ul>
                <li className="plan-feature-item">
                  <div className="plan-feature-icon !bg-purple-400/20 !text-purple-400"><Check size={12} /></div>
                  All Standard benefits
                </li>
                <li className="plan-feature-item">
                  <div className="plan-feature-icon !bg-purple-400/20 !text-purple-400"><Check size={12} /></div>
                  Eco-village residential rights
                </li>
                <li className="plan-feature-item">
                  <div className="plan-feature-icon !bg-purple-400/20 !text-purple-400"><Check size={12} /></div>
                  Industrial co-ownership share
                </li>
                <li className="plan-feature-item">
                  <div className="plan-feature-icon !bg-purple-400/20 !text-purple-400"><Check size={12} /></div>
                  Annual profit sharing
                </li>
                <li className="plan-feature-item">
                  <div className="plan-feature-icon !bg-purple-400/20 !text-purple-400"><Check size={12} /></div>
                  Board election eligibility
                </li>
              </ul>
              <button className="btn-plan !bg-purple-600 hover:!bg-purple-500 shadow-[0_10px_30px_-10px_rgba(147,51,234,0.5)]" onClick={() => openMemberForm('Premium')}>
                Get Started <ArrowRight size={18} className="btn-icon" />
              </button>
            </div>
          </div>

          {isModalOpen && (
            <div className="modal">
              <div className="modal-box animate-fadeIn">
                <button className="modal-close" onClick={closeMemberForm}>✕</button>
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-forest">Membership Application</h3>
                  <p className="text-gold font-bold text-xs uppercase tracking-widest mt-1">Plan: {selectedPlan}</p>
                </div>

                {!isSuccess ? (
                  <>
                    <div className="space-y-4">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" id="f-name" placeholder="Your full name" value={formData.fullName} onChange={handleInputChange} />
                      </div>
                      <div className="form-group">
                        <label>Mobile Number</label>
                        <input type="tel" id="f-phone" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleInputChange} />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" id="f-email" placeholder="your@email.com" value={formData.email} onChange={handleInputChange} />
                      </div>
                      <div className="form-group">
                        <label>Village / City</label>
                        <input type="text" id="f-location" placeholder="Your location" value={formData.location} onChange={handleInputChange} />
                      </div>
                      <div className="form-group">
                        <label>District</label>
                        <input type="text" id="f-district" placeholder="Your district" value={formData.district} onChange={handleInputChange} />
                      </div>
                    </div>

                    {error && <p className="mt-4 text-red-500 text-xs font-bold">{error}</p>}

                    <div className="form-row">
                      <button className="btn-cancel" onClick={closeMemberForm}>Cancel</button>
                      <button 
                        className="btn-submit disabled:opacity-50" 
                        onClick={submitMembership}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-10 text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h4 className="text-xl font-black text-forest">Application Submitted!</h4>
                    <p className="text-gray-500 mt-2">Thank you! Our team will contact you within 48 hours.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Membership;
