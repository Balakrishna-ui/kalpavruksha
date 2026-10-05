import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  User, MapPin, ShieldCheck, 
  CheckCircle2, Upload, Phone, Mail, FileText, Briefcase, Landmark, Users, ChevronRight, ArrowRight, CircleDollarSign, Calendar, Sparkles, ChevronDown, ChevronUp, AlertCircle, Info
} from 'lucide-react';
import { publicApi } from '../api';
import { INDIAN_STATES } from '../data/addressData';

const INDIAN_BANKS = [
  "Axis Bank",
  "Bandhan Bank",
  "Bank of Baroda",
  "Bank of India",
  "Bank of Maharashtra",
  "Canara Bank",
  "Central Bank of India",
  "City Union Bank",
  "Federal Bank",
  "HDFC Bank",
  "ICICI Bank",
  "IDBI Bank",
  "IDFC FIRST Bank",
  "Indian Bank",
  "Indian Overseas Bank",
  "IndusInd Bank",
  "Karur Vysya Bank",
  "Kotak Mahindra Bank",
  "Punjab & Sind Bank",
  "Punjab National Bank (PNB)",
  "South Indian Bank",
  "State Bank of India (SBI)",
  "UCO Bank",
  "Union Bank of India",
  "Yes Bank"
];

const SOCIETY_BRANCHES = [
  "Head Office - Hyderabad",
  "Palamuru Branch - Mahabubnagar",
  "Secunderabad Regional Office",
  "Warangal Branch",
  "Nizamabad Branch",
  "Karimnagar Branch"
];

const SAVINGS_TIERS = [
  { amount: "₹200 / Month", value: 200, label: "Starter Saver", desc: "Minimum monthly contribution tier for entry savers" },
  { amount: "₹500 / Month", value: 500, label: "Regular Thrift", desc: "Steady disciplined monthly cooperative savings" },
  { amount: "₹1,000 / Month", value: 1000, label: "Standard Thrift", desc: "Steady savings towards future family goals" },
  { amount: "₹2,500 / Month", value: 2500, label: "Growth Plan", desc: "Most popular tier for disciplined wealth accumulation", recommended: true },
  { amount: "₹5,000 / Month", value: 5000, label: "Wealth Builder", desc: "Maximum allowable monthly cooperative thrift tier" },
  { amount: "Custom Amount", value: 0, label: "Flexible Amount", desc: "Specify custom monthly thrift between ₹200 and ₹5,000" }
];

const Membership = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const flowParam = queryParams.get('flow');

  const [currentView, setCurrentView] = useState(flowParam === 'ktip' ? 'ktip_form' : 'membership'); // 'membership', 'membership_success', 'ktip_form', 'ktip_success'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isKtipSubmitting, setIsKtipSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [ktipError, setKtipError] = useState('');

  // Rules accordion states
  const [openRules, setOpenRules] = useState({
    rule1: true,
    rule2: false,
    rule3: false,
    rule4: false,
    rule5: false
  });

  const [formData, setFormData] = useState({
    // Step 1 - Personal Information (Mandatory)
    fullName: '', fatherName: '', dob: '', age: '', gender: '', 
    occupation: '', annualIncome: '', category: '', 
    mobileNumber: '', whatsappNumber: '', email: '',
    // Step 2 - Address Details (Optional)
    houseNo: '', street: '', village: '', mandal: '', district: '', state: 'Telangana', pinCode: '', sameAsPermanent: true,
    // Step 3 - KYC & Bank Details (Optional)
    aadhaarNumber: '', panNumber: '', form60: false, bankName: '', accountNumber: '', ifscCode: '',
    // Step 4 - Membership Details
    membershipType: 'Regular Member', membershipFee: '20', shareCapital: '100', totalAmount: '120',
    // Step 5 - Nominee & Introducer (Optional)
    nomineeName: '', nomineeRelationship: '', nomineeDob: '', nomineeMobile: '', nomineeShare: '',
    introducerName: '', introducerMemberId: '', introducerMobile: '',
    // Step 6 - Documents & Declaration
    declarationAccepted: false,
    applicantPhoto: null,
    aadhaarProof: null,
    panProof: null,
    addressProof: null,
    signature: null
  });

  // K-TIP Detailed Official Form State
  const [ktipData, setKtipData] = useState({
    // Section 1: Identification
    membershipRef: `KMC-MEM-${Math.floor(100000 + Math.random() * 900000)}`,
    ktipPlanId: `KTIP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    enrolmentDate: new Date().toISOString().split('T')[0],
    branchOffice: 'Head Office - Hyderabad',
    fullName: '',
    phoneNumber: '',
    email: '',
    city: '',

    // Section 2: Flexible Monthly Savings Tier
    monthlyThrift: '₹2,500 / Month',
    customAmount: '',

    // Section 3: Plan Details
    planStartDate: new Date().toISOString().split('T')[0],
    tenure: '3 Years (36 Months)',
    paymentMode: 'UPI / NACH Auto-Debit',
    contributionFrequency: 'Monthly',
    planCategory: 'K-TIP Balanced Real-Asset Thrift Pool',
    notes: '',

    // Section 6: Member Self-Declaration & Consent (Explicitly false)
    consentByelaws: false,
    consentRegularSavings: false,
    consentAuditRecords: false,
    consentAccurateInfo: false
  });

  // Member status check for K-TIP one-time membership fee waiver
  const [ktipMemberStatus, setKtipMemberStatus] = useState({
    isExistingAndPaid: false,
    memberName: '',
    memberId: '',
    isChecking: false
  });

  // Check member status when mobile number is entered
  useEffect(() => {
    if (ktipData.phoneNumber && ktipData.phoneNumber.length === 10) {
      setKtipMemberStatus(prev => ({ ...prev, isChecking: true }));
      publicApi.checkMemberStatus(ktipData.phoneNumber).then(res => {
        if (res && res.isMember && res.isPaid) {
          setKtipMemberStatus({
            isExistingAndPaid: true,
            memberName: res.fullName || '',
            memberId: res.memberId || '',
            isChecking: false
          });
        } else {
          setKtipMemberStatus({
            isExistingAndPaid: false,
            memberName: '',
            memberId: '',
            isChecking: false
          });
        }
      }).catch(() => {
        setKtipMemberStatus({
          isExistingAndPaid: false,
          memberName: '',
          memberId: '',
          isChecking: false
        });
      });
    } else {
      setKtipMemberStatus({
        isExistingAndPaid: false,
        memberName: '',
        memberId: '',
        isChecking: false
      });
    }
  }, [ktipData.phoneNumber]);

  const getSelectedKtipAmount = () => {
    if (ktipData.monthlyThrift === 'Custom Amount') {
      const num = parseInt(String(ktipData.customAmount || '').replace(/\D/g, ''), 10);
      return isNaN(num) ? 0 : num;
    }
    const found = SAVINGS_TIERS.find(t => t.amount === ktipData.monthlyThrift);
    return found ? found.value : 500;
  };

  const selectedKtipContribution = getSelectedKtipAmount();
  const isKtipContributionValid = selectedKtipContribution >= 200 && selectedKtipContribution <= 5000;
  const ktipMembershipFee = ktipMemberStatus.isExistingAndPaid ? 0 : 120;
  const ktipTotalPayable = isKtipContributionValid ? selectedKtipContribution + ktipMembershipFee : 0;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView, location]);

  // Validation: Only Step 1 (Personal Info) and Declaration are strictly mandatory
  const isStep1Completed = Boolean(
    formData.fullName.trim() && 
    formData.fatherName.trim() && 
    formData.dob && 
    formData.age && 
    formData.gender && 
    formData.occupation && 
    formData.annualIncome && 
    formData.category && 
    formData.mobileNumber.length === 10
  );

  const isStep2Completed = Boolean(formData.houseNo || formData.street || formData.village || formData.district || formData.pinCode);
  const isStep3Completed = Boolean(formData.panNumber || formData.form60 || formData.bankName || formData.accountNumber);
  const isStep4Completed = true;
  const isStep5Completed = Boolean(formData.nomineeName || formData.nomineeRelationship);
  const isStep6Completed = Boolean(formData.declarationAccepted);

  const getStepStatus = (isCompleted, previousCompleted) => {
    if (isCompleted) return 'Completed';
    if (previousCompleted) return 'In Progress';
    return 'Pending';
  };

  const steps = [
    { id: 1, label: 'Personal Info', isCompleted: isStep1Completed, status: getStepStatus(isStep1Completed, true) },
    { id: 2, label: 'Address Details', isCompleted: isStep2Completed, status: getStepStatus(isStep2Completed, isStep1Completed) },
    { id: 3, label: 'KYC & Bank Details', isCompleted: isStep3Completed, status: getStepStatus(isStep3Completed, isStep1Completed) },
    { id: 4, label: 'Membership Details', isCompleted: isStep4Completed, status: 'Completed' },
    { id: 5, label: 'Nominee & Introducer', isCompleted: isStep5Completed, status: getStepStatus(isStep5Completed, isStep1Completed) },
    { id: 6, label: 'Upload & Declaration', isCompleted: isStep6Completed, status: getStepStatus(isStep6Completed, isStep1Completed) }
  ];

  // Only Step 1 and legal Declaration acceptance block submission
  const isFormValid = isStep1Completed && formData.declarationAccepted;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (['mobileNumber', 'whatsappNumber', 'nomineeMobile', 'introducerMobile'].includes(name)) {
      if (value && !/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
    
    if (['aadhaarNumber', 'nomineeAadhaar'].includes(name)) {
      if (value && !/^\d*$/.test(value)) return;
      if (value.length > 12) return;
    }
    
    if (name === 'accountNumber') {
      if (value && !/^\d*$/.test(value)) return;
      if (value.length > 16) return;
    }

    let processedValue = value;
    if (name === 'panNumber') {
      processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (processedValue.length > 10) return;
    }
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : processedValue
      };

      if (name === 'dob' && value) {
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        newData.age = age > 0 ? age : '';
      }

      return newData;
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.declarationAccepted) {
      setError('Please accept the declaration to proceed.');
      return;
    }
    
    if (!isStep1Completed) {
      setError('Please complete all required Personal Information fields.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      const payload = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'sameAsPermanent') return;
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
          payload.append(key, formData[key]);
        }
      });
      
      await publicApi.submitMembership(payload);
      
      // Pre-fill K-TIP data securely from submitted applicant info
      setKtipData(prev => ({
        ...prev,
        fullName: formData.fullName,
        phoneNumber: formData.mobileNumber,
        email: formData.email || '',
        city: formData.village || formData.district || formData.state || 'Hyderabad'
      }));

      setCurrentView('membership_success');
    } catch (err) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKtipSubmit = async (e) => {
    e.preventDefault();

    if (!ktipData.fullName.trim()) {
      setKtipError('Please provide your full name.');
      return;
    }

    if (!ktipData.phoneNumber || ktipData.phoneNumber.length !== 10) {
      setKtipError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!selectedKtipContribution || selectedKtipContribution < 200 || selectedKtipContribution > 5000) {
      setKtipError('Please select or enter a valid monthly contribution amount between ₹200 and ₹5,000.');
      return;
    }

    if (!ktipData.consentByelaws || !ktipData.consentRegularSavings || !ktipData.consentAuditRecords || !ktipData.consentAccurateInfo) {
      setKtipError('Please confirm all required Member Self-Declaration checkboxes before submitting.');
      return;
    }

    setIsKtipSubmitting(true);
    setKtipError('');

    const effectiveAmount = `₹${selectedKtipContribution.toLocaleString('en-IN')} / Month`;

    try {
      const structuredMessage = [
        `Ref ID: ${ktipData.membershipRef}`,
        `K-TIP Plan ID: ${ktipData.ktipPlanId}`,
        `Branch: ${ktipData.branchOffice}`,
        `Start Date: ${ktipData.planStartDate}`,
        `Tenure: ${ktipData.tenure}`,
        `Frequency: ${ktipData.contributionFrequency}`,
        `Payment Mode: ${ktipData.paymentMode}`,
        `Plan Category: ${ktipData.planCategory}`,
        `K-TIP Monthly: ₹${selectedKtipContribution.toLocaleString('en-IN')}`,
        `Membership Fee: ₹${ktipMembershipFee} (${ktipMemberStatus.isExistingAndPaid ? 'Existing Member' : 'New Member'})`,
        `Total Initial Payable: ₹${ktipTotalPayable.toLocaleString('en-IN')}`,
        ktipData.notes ? `Notes: ${ktipData.notes}` : ''
      ].filter(Boolean).join(' | ');

      const response = await publicApi.submitFinancialEnquiry({
        fullName: ktipData.fullName.trim(),
        phoneNumber: ktipData.phoneNumber.trim(),
        email: ktipData.email.trim() || 'not-provided@kalpavruksha.co.in',
        city: ktipData.city.trim() || 'Telangana',
        investmentAmount: `${effectiveAmount} (${ktipData.tenure})`,
        selectedScheme: 'K-TIP (Kalpavruksha Targeted Investment Plan)',
        message: structuredMessage
      });

      // Update confirmed values from server response
      if (response) {
        setKtipData(prev => ({
          ...prev,
          serverVerifiedAmount: response.kTipAmount || selectedKtipContribution,
          serverVerifiedFee: response.membershipFee !== undefined ? response.membershipFee : ktipMembershipFee,
          serverVerifiedTotal: response.totalPayable || ktipTotalPayable
        }));
      }

      setCurrentView('ktip_success');
    } catch (err) {
      setKtipError(err.message || 'Failed to submit K-TIP enrolment. Please check your connection.');
    } finally {
      setIsKtipSubmitting(false);
    }
  };

  // ----------------------------------------------------
  // VIEW: K-TIP SUCCESS SCREEN
  // ----------------------------------------------------
  if (currentView === 'ktip_success') {
    return (
      <div className="w-full bg-[#F7F3E8] min-h-screen flex items-center justify-center pt-28 pb-20 font-inter px-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-14 text-center max-w-xl mx-auto border border-gray-100 animate-fadeIn">
          <div className="w-24 h-24 bg-[#123524]/10 text-[#123524] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Sparkles className="w-12 h-12 text-[#C9A13B]" />
          </div>
          <span className="text-[#C9A13B] font-black text-xs uppercase tracking-[0.25em] mb-2 block">Application Verified &amp; Received</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F4D] mb-3 tracking-tight">K-TIP Enrolment Confirmed!</h2>
          <p className="text-gray-600 mb-6 font-medium text-sm leading-relaxed">
            Your enrolment in the <strong>Kalpavruksha Targeted Investment Plan (K-TIP)</strong> has been logged in our system. A cooperative advisor will contact you to issue your passbook &amp; account certificate.
          </p>

          <div className="bg-[#F8FDF9] border border-[#123524]/15 rounded-2xl p-6 mb-8 text-left space-y-2.5 text-xs">
            <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500 font-bold">K-TIP Plan ID:</span><span className="font-extrabold text-[#123524]">{ktipData.ktipPlanId}</span></div>
            <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500 font-bold">Member Application Ref:</span><span className="font-bold text-[#0B1F4D]">{ktipData.membershipRef}</span></div>
            <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500 font-bold">Applicant Name:</span><span className="font-bold text-[#0B1F4D]">{ktipData.fullName}</span></div>
            <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500 font-bold">Mobile Number:</span><span className="font-bold text-[#0B1F4D]">{ktipData.phoneNumber}</span></div>
            <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500 font-bold">Monthly Contribution Target:</span><span className="font-black text-[#123524]">₹{(ktipData.serverVerifiedAmount || selectedKtipContribution).toLocaleString('en-IN')} / Month</span></div>
            <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500 font-bold">One-Time Membership Fee:</span><span className="font-bold text-[#0B1F4D]">₹{(ktipData.serverVerifiedFee !== undefined ? ktipData.serverVerifiedFee : ktipMembershipFee).toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500 font-bold">Total Initial Amount:</span><span className="font-black text-[#123524] text-sm">₹{(ktipData.serverVerifiedTotal || ktipTotalPayable).toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 font-bold">Branch Office:</span><span className="font-bold text-[#0B1F4D]">{ktipData.branchOffice}</span></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigate('/')} className="flex-1 bg-[#0B1F4D] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#123C73] transition-all shadow-lg">
              Done &amp; Return Home
            </button>
            <button onClick={() => navigate('/divisions/financial')} className="flex-1 bg-white border border-[#C9A13B] text-[#0B1F4D] py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">
              Financial Division
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW: OFFICIAL 6-SECTION K-TIP PLAN FORM
  // ----------------------------------------------------
  if (currentView === 'ktip_form') {
    return (
      <div className="w-full bg-[#F7F3E8] min-h-screen font-inter pb-24 pt-32">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 md:p-12 border border-white/60">
            
            {/* Header / Banner */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#123524]/10 text-[#123524] px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-4">
                <Sparkles className="w-4 h-4 text-[#C9A13B]" /> Kalpavruksha Targeted Investment Plan
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-[#0B1F4D] mb-3 tracking-tight">
                K-TIP Plan <span className="text-[#C9A13B]">Enrolment Form</span>
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm font-medium leading-relaxed">
                Official enrolment application for cooperative flexible monthly thrift, real-asset wealth creation, and community development.
              </p>
              <div className="w-20 h-1 bg-[#C9A13B] mx-auto rounded-full mt-4"></div>
            </div>

            <form onSubmit={handleKtipSubmit} className="space-y-10">

              {/* ========================================================= */}
              {/* SECTION 1 — MEMBER & K-TIP IDENTIFICATION */}
              {/* ========================================================= */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm border-l-4 border-l-[#123524]">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
                  <h3 className="text-base font-black text-[#0B1F4D] uppercase tracking-wider flex items-center gap-2.5">
                    <div className="bg-[#123524]/10 p-2 rounded-lg text-[#123524]"><User className="w-5 h-5"/></div>
                    Section 1: Member &amp; K-TIP Identification
                  </h3>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hidden sm:inline">Official Reference</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Membership Application Ref</label>
                    <input 
                      type="text" 
                      readOnly 
                      value={ktipData.membershipRef} 
                      className="w-full bg-transparent font-extrabold text-sm text-[#0B1F4D] outline-none cursor-default" 
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Generated K-TIP Plan ID</label>
                    <input 
                      type="text" 
                      readOnly 
                      value={ktipData.ktipPlanId} 
                      className="w-full bg-transparent font-extrabold text-sm text-[#123524] outline-none cursor-default" 
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Branch / Registered Office</label>
                    <select 
                      value={ktipData.branchOffice}
                      onChange={(e) => setKtipData({...ktipData, branchOffice: e.target.value})}
                      className="w-full bg-transparent font-bold text-xs text-[#0B1F4D] outline-none cursor-pointer"
                    >
                      {SOCIETY_BRANCHES.map((b, i) => (
                        <option key={i} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Member Full Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required 
                      value={ktipData.fullName} 
                      onChange={(e) => setKtipData({...ktipData, fullName: e.target.value})} 
                      placeholder="Enter Member Name" 
                      className="w-full p-3.5 border rounded-xl bg-gray-50 text-sm font-semibold text-[#0B1F4D]" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Registered Mobile Number <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      required 
                      maxLength="10" 
                      value={ktipData.phoneNumber} 
                      onChange={(e) => setKtipData({...ktipData, phoneNumber: e.target.value.replace(/\D/g, '')})} 
                      placeholder="10-digit Mobile" 
                      className="w-full p-3.5 border rounded-xl bg-gray-50 text-sm font-semibold text-[#0B1F4D]" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Email ID (Optional)</label>
                    <input 
                      type="email" 
                      value={ktipData.email} 
                      onChange={(e) => setKtipData({...ktipData, email: e.target.value})} 
                      placeholder="member@email.com" 
                      className="w-full p-3.5 border rounded-xl bg-gray-50 text-sm font-medium text-gray-700" 
                    />
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 2 — K-TIP FLEXIBLE MONTHLY SAVINGS */}
              {/* ========================================================= */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm border-l-4 border-l-[#C9A13B]">
                <div className="mb-6 pb-3 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-black text-[#0B1F4D] uppercase tracking-wider flex items-center gap-2.5">
                      <div className="bg-[#C9A13B]/10 p-2 rounded-lg text-[#C9A13B]"><CircleDollarSign className="w-5 h-5"/></div>
                      Section 2: K-TIP Flexible Monthly Savings
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Choose any monthly thrift amount between <strong>₹200</strong> and <strong>₹5,000</strong>.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-[#123524]/10 text-[#123524] font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
                      Range: ₹200 – ₹5,000 / mo
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {SAVINGS_TIERS.map((tier, idx) => {
                    const isSelected = ktipData.monthlyThrift === tier.amount;
                    return (
                      <div 
                        key={idx} 
                        onClick={() => setKtipData({...ktipData, monthlyThrift: tier.amount})}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                          isSelected 
                            ? 'border-[#123524] bg-[#F8FDF9] shadow-md scale-[1.02]' 
                            : 'border-gray-100 bg-white hover:border-gray-300'
                        }`}
                      >
                        {tier.recommended && (
                          <span className="absolute -top-2.5 right-4 bg-[#C9A13B] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm">
                            Popular Choice
                          </span>
                        )}
                        <div>
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">{tier.label}</span>
                          <span className="text-xl font-black text-[#0B1F4D] block mb-2">{tier.amount}</span>
                          <p className="text-[11px] text-gray-500 leading-tight font-medium">{tier.desc}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold">
                          <span className={isSelected ? 'text-[#123524]' : 'text-gray-400'}>{isSelected ? 'Selected Plan ✓' : 'Select Plan'}</span>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#123524] bg-[#123524]' : 'border-gray-300'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {ktipData.monthlyThrift === 'Custom Amount' && (
                  <div className="mt-4 p-5 bg-[#F8FDF9] rounded-2xl border-2 border-[#123524]/20 shadow-inner">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold text-[#0B1F4D] block">
                        Enter Custom Monthly Contribution (₹) <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[11px] font-extrabold text-gray-500">Min: ₹200 | Max: ₹5,000</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-black text-[#0B1F4D]">₹</span>
                      <input 
                        type="number" 
                        min="200" 
                        max="5000" 
                        value={ktipData.customAmount} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setKtipData({...ktipData, customAmount: val});
                        }}
                        placeholder="e.g. 750, 1500, 3000..." 
                        className="w-full p-3.5 pl-9 border border-gray-300 rounded-xl bg-white text-base font-black text-[#0B1F4D] focus:ring-2 focus:ring-[#123524] focus:outline-none" 
                      />
                    </div>
                    {/* Inline real-time feedback */}
                    <div className="mt-2 text-xs font-semibold">
                      {!ktipData.customAmount ? (
                        <span className="text-gray-400">Please enter an amount between ₹200 and ₹5,000</span>
                      ) : parseInt(ktipData.customAmount, 10) < 200 ? (
                        <span className="text-amber-600 font-bold">⚠️ Minimum allowed monthly contribution is ₹200</span>
                      ) : parseInt(ktipData.customAmount, 10) > 5000 ? (
                        <span className="text-amber-600 font-bold">⚠️ Maximum allowed monthly contribution is ₹5,000</span>
                      ) : (
                        <span className="text-green-700 font-bold">✓ Valid monthly contribution: ₹{parseInt(ktipData.customAmount, 10).toLocaleString('en-IN')} / Month</span>
                      )}
                    </div>
                  </div>
                )}

                {/* ========================================================= */}
                {/* PAYMENT BREAKDOWN SUMMARY CARD */}
                {/* ========================================================= */}
                <div className="mt-6 bg-gradient-to-br from-white to-[#F8FDF9] rounded-2xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                    <span className="text-xs font-black text-[#0B1F4D] uppercase tracking-wider flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-[#123524]" />
                      Payable Breakdown Summary
                    </span>
                    {ktipMemberStatus.isChecking ? (
                      <span className="text-[10px] text-gray-400 italic">Verifying member status...</span>
                    ) : ktipMemberStatus.isExistingAndPaid ? (
                      <span className="bg-green-100 text-green-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                        Existing Member Verified ✓
                      </span>
                    ) : (
                      <span className="bg-[#C9A13B]/15 text-[#8C6B1F] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                        New Member Registration
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-semibold">K-TIP Monthly Contribution:</span>
                      <span className="font-extrabold text-[#0B1F4D]">
                        {isKtipContributionValid ? `₹${selectedKtipContribution.toLocaleString('en-IN')} / Month` : '—'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-semibold">
                        One-Time Membership Fee (Mandatory):
                      </span>
                      <span className={`font-extrabold ${ktipMembershipFee === 0 ? 'text-green-700' : 'text-[#0B1F4D]'}`}>
                        {ktipMembershipFee === 0 ? '₹0 (Fee Already Paid)' : '₹120'}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-sm">
                      <span className="font-black text-[#0B1F4D]">Total Initial Amount Payable:</span>
                      <span className="text-base font-black text-[#123524]">
                        {isKtipContributionValid ? `₹${ktipTotalPayable.toLocaleString('en-IN')}` : 'Enter valid amount'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-500 leading-relaxed">
                    {ktipMemberStatus.isExistingAndPaid ? (
                      <p className="text-green-700 font-medium">
                        ✓ As a recognized registered member, your one-time ₹120 membership fee has already been settled. You will only contribute your monthly K-TIP amount of <strong>₹{selectedKtipContribution.toLocaleString('en-IN')}</strong>.
                      </p>
                    ) : (
                      <p>
                        ℹ️ <strong>₹120</strong> is a mandatory one-time lifetime membership fee charged only once during initial member registration. Subsequent monthly contributions will only be your recurring K-TIP thrift of <strong>₹{isKtipContributionValid ? selectedKtipContribution.toLocaleString('en-IN') : '...'}</strong>.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 3 — PLAN DETAILS */}
              {/* ========================================================= */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm border-l-4 border-l-[#123524]">
                <div className="mb-6 pb-3 border-b border-gray-100">
                  <h3 className="text-base font-black text-[#0B1F4D] uppercase tracking-wider flex items-center gap-2.5">
                    <div className="bg-[#123524]/10 p-2 rounded-lg text-[#123524]"><Landmark className="w-5 h-5"/></div>
                    Section 3: Plan Details &amp; Frequency
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Plan Start Date <span className="text-red-500">*</span></label>
                    <input 
                      type="date" 
                      value={ktipData.planStartDate} 
                      onChange={(e) => setKtipData({...ktipData, planStartDate: e.target.value})} 
                      className="w-full p-3.5 border rounded-xl bg-gray-50 text-sm font-semibold text-[#0B1F4D]" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Target Plan Tenure <span className="text-red-500">*</span></label>
                    <select 
                      value={ktipData.tenure} 
                      onChange={(e) => setKtipData({...ktipData, tenure: e.target.value})} 
                      className="w-full p-3.5 border rounded-xl bg-gray-50 text-sm font-bold text-[#0B1F4D]"
                    >
                      <option value="1 Year (12 Months)">1 Year (12 Months)</option>
                      <option value="3 Years (36 Months)">3 Years (36 Months) — Standard</option>
                      <option value="5 Years (60 Months)">5 Years (60 Months) — High Yield</option>
                      <option value="10 Years (120 Months)">10 Years (120 Months) — Heritage</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Payment Mode Preference <span className="text-red-500">*</span></label>
                    <select 
                      value={ktipData.paymentMode} 
                      onChange={(e) => setKtipData({...ktipData, paymentMode: e.target.value})} 
                      className="w-full p-3.5 border rounded-xl bg-gray-50 text-sm font-bold text-[#0B1F4D]"
                    >
                      <option value="UPI / NACH Auto-Debit">UPI / NACH Auto-Debit (Direct)</option>
                      <option value="Bank Transfer (NEFT / RTGS / IMPS)">Bank Transfer (NEFT / RTGS)</option>
                      <option value="Cheque / Demand Draft">Cheque / Demand Draft</option>
                      <option value="Cash at Society Branch">Cash at Authorized Society Counter</option>
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <label className="text-xs font-bold text-gray-700 block mb-1">Sector &amp; Real-Asset Pool Allocation</label>
                    <select 
                      value={ktipData.planCategory} 
                      onChange={(e) => setKtipData({...ktipData, planCategory: e.target.value})} 
                      className="w-full p-3.5 border rounded-xl bg-gray-50 text-sm font-medium text-gray-700"
                    >
                      <option value="K-TIP Balanced Real-Asset Thrift Pool">Balanced Cooperative Thrift &amp; Real Asset Pool (Default)</option>
                      <option value="K-TIP Agriculture &amp; Farmer Asset Pool">Agriculture &amp; Farmer Sustainable Asset Pool</option>
                      <option value="K-TIP Goldage Wealth &amp; Gold Plan">Goldage Monthly Gold Accumulation Pool</option>
                      <option value="K-TIP Cooperative Land &amp; Property Pool">Cooperative Land &amp; Commercial Real Asset Pool</option>
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <label className="text-xs font-bold text-gray-700 block mb-1">Additional Notes / Savings Goal (Optional)</label>
                    <textarea 
                      rows="2" 
                      value={ktipData.notes} 
                      onChange={(e) => setKtipData({...ktipData, notes: e.target.value})} 
                      placeholder="e.g. Higher education fund, retirement wealth, agricultural expansion..." 
                      className="w-full p-3.5 border rounded-xl bg-gray-50 text-sm font-medium text-gray-700 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 4 — K-TIP MEMBER GUIDELINES */}
              {/* ========================================================= */}
              <div className="bg-[#F8FDF9] rounded-2xl p-6 md:p-8 border border-[#123524]/15 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-6 h-6 text-[#123524]" />
                  <h3 className="text-base font-black text-[#0B1F4D] uppercase tracking-wider">
                    Section 4: K-TIP Member Guidelines
                  </h3>
                </div>
                <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                  Key guidelines governing member thrift accumulation under Kalpavruksha Mutually Aided Co-operative Society Ltd.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-gray-700">
                  <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#123524] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0B1F4D] block mb-0.5">1. Flexible &amp; Regular Savings</strong>
                      Contributions can be adjusted or topped-up. Regularity ensures compound cooperative returns.
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#123524] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0B1F4D] block mb-0.5">2. Approved Payment Channels</strong>
                      All payments must be made to official Society bank accounts or verified UPI handles.
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#123524] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0B1F4D] block mb-0.5">3. Official Receipts &amp; Ledger</strong>
                      Every transaction is entered into your digital member ledger and physical passbook.
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#123524] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0B1F4D] block mb-0.5">4. Maturity &amp; Cooperative Governance</strong>
                      Funds are deployed into audited, board-approved tangible assets and sustainable projects.
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 5 — K-TIP RULES & REGULATIONS (ACCORDION) */}
              {/* ========================================================= */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
                  <h3 className="text-base font-black text-[#0B1F4D] uppercase tracking-wider flex items-center gap-2.5">
                    <div className="bg-[#0B1F4D]/10 p-2 rounded-lg text-[#0B1F4D]"><FileText className="w-5 h-5"/></div>
                    Section 5: K-TIP Rules &amp; Regulations
                  </h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Byelaw Policy Reference</span>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'rule1', title: '1. Plan Period, Minimum Threshold & Continuity', text: 'The K-TIP plan is open to all registered members with active membership. Members may select a period of 12, 36, 60, or 120 months. Continuity in monthly thrift maintains uninterrupted dividend and bonus eligibility.' },
                    { id: 'rule2', title: '2. Deposit Records & Member Responsibility', text: 'Members are responsible for maintaining official transaction references. Passbooks and digital statement updates are issued at registered branch offices or through the official member portal.' },
                    { id: 'rule3', title: '3. Maturity, Renewal & Exit Conditions', text: 'Upon completion of the tenure, accumulated funds along with declared cooperative appreciation are disbursed or reinvested into approved real-asset projects as requested by the member.' },
                    { id: 'rule4', title: '4. Loan Eligibility Against K-TIP Accumulation', text: 'Active K-TIP holders are eligible to apply for low-interest cooperative credit and emergency loans up to approved percentages of their accumulated thrift balance as per Board policies.' },
                    { id: 'rule5', title: '5. Governance & Statutory Compliance', text: 'All operations strictly adhere to the Mutually Aided Co-operative Societies Act and audited annually by certified statutory chartered accountants.' }
                  ].map((rule) => {
                    const isOpen = openRules[rule.id];
                    return (
                      <div key={rule.id} className="border border-gray-100 rounded-xl overflow-hidden">
                        <button 
                          type="button" 
                          onClick={() => setOpenRules({...openRules, [rule.id]: !isOpen})} 
                          className="w-full flex justify-between items-center p-4 bg-gray-50/70 hover:bg-gray-50 text-left transition-colors"
                        >
                          <span className="text-xs font-bold text-[#0B1F4D]">{rule.title}</span>
                          {isOpen ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
                        </button>
                        {isOpen && (
                          <div className="p-4 bg-white text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                            {rule.text}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 6 — MEMBER SELF-DECLARATION / CONSENT */}
              {/* ========================================================= */}
              <div className="bg-[#F8FDF9] rounded-2xl p-6 md:p-8 border-2 border-[#123524]/20 shadow-sm">
                <div className="mb-4 pb-3 border-b border-[#123524]/10">
                  <h3 className="text-base font-black text-[#0B1F4D] uppercase tracking-wider flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#123524]"/>
                    Section 6: Member Self-Declaration &amp; Consent
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Please read and check all declarations below to complete your K-TIP enrolment.</p>
                </div>

                <div className="space-y-3.5 text-xs text-gray-700">
                  <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-white transition-colors">
                    <input 
                      type="checkbox" 
                      required 
                      checked={ktipData.consentByelaws} 
                      onChange={(e) => setKtipData({...ktipData, consentByelaws: e.target.checked})} 
                      className="w-4 h-4 text-[#123524] rounded mt-0.5 cursor-pointer shrink-0" 
                    />
                    <span>I hereby apply for enrolment in the <strong>Kalpavruksha Targeted Investment Plan (K-TIP)</strong> and agree to abide by the Registered Byelaws and Policies of the Society. <span className="text-red-500 font-bold">*</span></span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-white transition-colors">
                    <input 
                      type="checkbox" 
                      required 
                      checked={ktipData.consentRegularSavings} 
                      onChange={(e) => setKtipData({...ktipData, consentRegularSavings: e.target.checked})} 
                      className="w-4 h-4 text-[#123524] rounded mt-0.5 cursor-pointer shrink-0" 
                    />
                    <span>I commit to making regular monthly contributions through approved cooperative banking and digital payment channels. <span className="text-red-500 font-bold">*</span></span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-white transition-colors">
                    <input 
                      type="checkbox" 
                      required 
                      checked={ktipData.consentAuditRecords} 
                      onChange={(e) => setKtipData({...ktipData, consentAuditRecords: e.target.checked})} 
                      className="w-4 h-4 text-[#123524] rounded mt-0.5 cursor-pointer shrink-0" 
                    />
                    <span>I understand that funds are deployed into Board-approved cooperative real assets and subject to standard statutory audit policies. <span className="text-red-500 font-bold">*</span></span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-white transition-colors">
                    <input 
                      type="checkbox" 
                      required 
                      checked={ktipData.consentAccurateInfo} 
                      onChange={(e) => setKtipData({...ktipData, consentAccurateInfo: e.target.checked})} 
                      className="w-4 h-4 text-[#123524] rounded mt-0.5 cursor-pointer shrink-0" 
                    />
                    <span>I confirm that all information provided in this form is true, correct, and complete to the best of my knowledge. <span className="text-red-500 font-bold">*</span></span>
                  </label>
                </div>

                {ktipError && (
                  <div className="mt-4 bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-2">
                    <AlertCircle size={16} /> {ktipError}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setCurrentView('membership')} 
                  className="px-8 py-4 border border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-50 bg-white text-xs uppercase tracking-wider"
                >
                  ← Back to Membership
                </button>
                <button 
                  type="submit" 
                  disabled={isKtipSubmitting}
                  className="flex-1 bg-[#123524] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#1a4b33] transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50 group"
                >
                  {isKtipSubmitting ? 'Submitting K-TIP Enrolment...' : 'Confirm & Submit K-TIP Application →'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW: MEMBERSHIP SUCCESS (NEXT STEP: K-TIP PROMPT)
  // ----------------------------------------------------
  if (currentView === 'membership_success') {
    return (
      <div className="w-full bg-[#F7F3E8] min-h-screen flex items-center justify-center pt-28 pb-20 font-inter px-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-14 text-center max-w-xl mx-auto border border-gray-100 animate-fadeIn">
          <div className="w-24 h-24 bg-[#123524]/10 text-[#123524] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-[#123524]" />
          </div>
          
          <span className="text-[#123524] font-black text-xs uppercase tracking-[0.25em] mb-2 block">Step 1 Completed</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F4D] mb-3 tracking-tight">Membership Application Completed ✓</h2>
          <p className="text-gray-600 mb-8 font-medium text-sm leading-relaxed">
            Your membership details have been successfully submitted. Welcome to the Kalpavruksha Cooperative family!
          </p>

          {/* Next Step K-TIP Prompt Box */}
          <div className="bg-gradient-to-br from-[#F8FDF9] to-[#F3EAD3]/30 border-2 border-[#C9A13B]/40 rounded-3xl p-6 mb-8 text-left shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-[#C9A13B] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full">Next Step</span>
              <span className="text-xs font-bold text-[#123524]">Official Cooperative Wealth Plan</span>
            </div>
            <h4 className="text-lg font-black text-[#0B1F4D] mb-1">Continue with K-TIP Plan Form</h4>
            <p className="text-xs text-gray-600 mb-5 leading-relaxed">
              Enrol in the <strong>Kalpavruksha Targeted Investment Plan (K-TIP)</strong> to start your disciplined savings and collective wealth-building journey.
            </p>

            <button 
              type="button"
              onClick={() => setCurrentView('ktip_form')}
              className="w-full bg-[#123524] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#1a4b33] transition-all flex items-center justify-center gap-2 shadow-lg group"
            >
              Continue to K-TIP Form <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="text-xs font-bold text-gray-500 hover:text-[#0B1F4D] uppercase tracking-wider py-2"
          >
            I will do this later, Return to Home
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW: MAIN MEMBERSHIP FORM
  // ----------------------------------------------------
  return (
    <div className="w-full bg-[#F7F3E8] min-h-screen font-inter pb-20">
      
      {/* Hero Banner */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="inline-flex items-center gap-2 bg-[#123524]/10 text-[#123524] px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-3">
            <span>Membership &amp; K-TIP Journey</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#0B1F4D] mb-3 tracking-tight">
            Online Membership <br className="hidden md:block"/>
            <span className="text-[#123524]">Application</span>
          </h1>
          <p className="text-gray-700 max-w-sm mb-6 font-medium leading-relaxed">
            Become a part of Kalpavruksha family and grow together for a better future
          </p>
          <div className="text-xs font-bold text-gray-800 flex gap-2 items-center">
            <span>Home</span> <span className="text-gray-400">›</span> <span>Membership</span> <span className="text-gray-400">›</span> <span className="text-[#123524]">Apply Online</span>
          </div>
        </div>
      </div>

      {/* Main Content Area (Stepper + Form) */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-12 relative z-10">
        
        {/* Stepper */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8 flex justify-between relative overflow-hidden">
          <div className="absolute top-[40%] left-10 right-10 h-[2px] bg-gray-100 -z-10"></div>
          {steps.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center bg-white px-2 md:px-4">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm mb-2 transition-colors shadow-sm ${
                step.isCompleted || step.status === 'In Progress' ? 'bg-[#123524] text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {step.isCompleted ? <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" /> : (idx === 3 ? <Users className="w-4 h-4"/> : step.id)}
              </div>
              <span className={`text-[10px] md:text-xs font-bold ${step.isCompleted || step.status === 'In Progress' ? 'text-[#123524]' : 'text-gray-400'}`}>{step.label}</span>
              <span className="hidden md:block text-[9px] text-gray-400 mt-1">{step.status}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal Info Card (Mandatory section - Keep stars) */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border-l-4 border-[#123524]">
              <h3 className="text-lg font-bold text-[#123524] flex items-center gap-2 mb-2">
                <div className="bg-[#123524]/5 p-2 rounded-lg text-[#123524]"><User className="w-5 h-5"/></div> 
                Personal Information <span className="text-sm font-normal ml-2">/ వ్యక్తిగత వివరాలు</span>
              </h3>
              <p className="text-xs text-gray-500 mb-6">Mandatory fields are marked with <span className="text-red-500 font-bold">*</span></p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="text-xs font-bold text-gray-700">Full Name (as per Aadhaar/PAN) <span className="text-red-500">*</span></label><input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                <div><label className="text-xs font-bold text-gray-700">Father's / Mother's / Spouse Name <span className="text-red-500">*</span></label><input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} placeholder="Enter name" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                <div><label className="text-xs font-bold text-gray-700">Date of Birth <span className="text-red-500">*</span></label><input type="date" name="dob" value={formData.dob} onChange={handleInputChange} onClick={(e) => e.target.showPicker && e.target.showPicker()} max={new Date().toISOString().split('T')[0]} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm cursor-pointer" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-bold text-gray-700">Age <span className="text-red-500">*</span></label><input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Age" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-2">Gender <span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1 text-xs cursor-pointer"><input type="radio" name="gender" value="Male" onChange={handleInputChange} checked={formData.gender==='Male'} className="text-[#123524] focus:ring-[#123524]"/> Male</label>
                      <label className="flex items-center gap-1 text-xs cursor-pointer"><input type="radio" name="gender" value="Female" onChange={handleInputChange} checked={formData.gender==='Female'} className="text-[#123524] focus:ring-[#123524]"/> Female</label>
                      <label className="flex items-center gap-1 text-xs cursor-pointer"><input type="radio" name="gender" value="Other" onChange={handleInputChange} checked={formData.gender==='Other'} className="text-[#123524] focus:ring-[#123524]"/> Other</label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Occupation <span className="text-red-500">*</span></label>
                  <select name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-700">
                    <option value="">Select Occupation</option><option value="Business">Business</option><option value="Salaried">Salaried</option><option value="Farmer">Farmer</option><option value="Self-Employed">Self-Employed</option><option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Annual Income <span className="text-red-500">*</span></label>
                  <select name="annualIncome" value={formData.annualIncome} onChange={handleInputChange} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-700">
                    <option value="">Select Income Range</option><option value="Below 2.5L">Below 2.5L</option><option value="2.5L - 5L">2.5L - 5L</option><option value="5L - 10L">5L - 10L</option><option value="Above 10L">Above 10L</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Category <span className="text-red-500">*</span></label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-700">
                    <option value="">Select Category</option><option value="General">General</option><option value="OBC">OBC</option><option value="SC">SC</option><option value="ST">ST</option>
                  </select>
                </div>
                <div className="flex gap-2 items-end">
                  <div className="w-1/3">
                    <label className="text-xs font-bold text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                    <select className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-500"><option>+91</option></select>
                  </div>
                  <div className="w-2/3"><input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} placeholder="10-digit number" maxLength="10" className="w-full p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                </div>
                <div className="flex gap-2 items-end">
                  <div className="w-1/3">
                    <label className="text-xs font-bold text-gray-700">WhatsApp Number</label>
                    <select className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-500"><option>+91</option></select>
                  </div>
                  <div className="w-2/3"><input type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInputChange} placeholder="WhatsApp number" maxLength="10" className="w-full p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                </div>
                <div><label className="text-xs font-bold text-gray-700">Email ID</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email address" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
              </div>
            </div>

            {/* Address Details Card (Optional - Asterisks removed) */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border-l-4 border-[#123524]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#123524] flex items-center gap-2">
                  <div className="bg-[#123524]/5 p-2 rounded-lg text-[#123524]"><MapPin className="w-5 h-5"/></div> 
                  Address Details <span className="text-sm font-normal ml-2">/ చిరునామా వివరాలు (Optional)</span>
                </h3>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-600">
                  Same as Permanent Address 
                  <div className={`w-10 h-5 rounded-full p-1 cursor-pointer flex ${formData.sameAsPermanent ? 'bg-[#123524] justify-end' : 'bg-gray-300 justify-start'}`} onClick={() => setFormData({...formData, sameAsPermanent: !formData.sameAsPermanent})}>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div><label className="text-xs font-bold text-gray-700">House No. / Door No.</label><input type="text" name="houseNo" value={formData.houseNo} onChange={handleInputChange} placeholder="Enter House No." className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                <div className="md:col-span-2"><label className="text-xs font-bold text-gray-700">Street / Locality</label><input type="text" name="street" value={formData.street} onChange={handleInputChange} placeholder="Enter Street / Locality" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                
                <div>
                  <label className="text-xs font-bold text-gray-700">State</label>
                  <select name="state" value={formData.state} onChange={handleInputChange} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-700">
                    <option value="">Select State</option>
                    {INDIAN_STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">District</label>
                  <input type="text" name="district" value={formData.district} onChange={handleInputChange} placeholder="Enter District" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Mandal</label>
                  <input type="text" name="mandal" value={formData.mandal} onChange={handleInputChange} placeholder="Enter Mandal" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Village / Town / City</label>
                  <input type="text" name="village" value={formData.village} onChange={handleInputChange} placeholder="Enter Village / City" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" />
                </div>
                <div><label className="text-xs font-bold text-gray-700">PIN Code</label><input type="text" name="pinCode" value={formData.pinCode} onChange={handleInputChange} placeholder="Enter PIN Code" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
              </div>
            </div>

            {/* KYC and Bank Grid (Optional - Asterisks removed) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-[#123524]">
                <h3 className="text-lg font-bold text-[#123524] flex items-center gap-2 mb-6">
                  <div className="bg-[#123524]/5 p-2 rounded-lg text-[#123524]"><FileText className="w-5 h-5"/></div> 
                  KYC Details <span className="text-sm font-normal ml-2">/ KYC వివరాలు</span>
                </h3>
                <div className="space-y-4">
                  <div><label className="text-xs font-bold text-gray-700">Aadhaar Number (Optional)</label><input type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleInputChange} placeholder="Enter Aadhaar Number" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                  <div><label className="text-xs font-bold text-gray-700">PAN Number</label><input type="text" name="panNumber" value={formData.panNumber} onChange={handleInputChange} placeholder="Enter PAN Number" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
                    <input type="checkbox" name="form60" checked={formData.form60} onChange={handleInputChange} className="w-4 h-4 text-[#123524] rounded"/> 
                    PAN not available, Form 60 applicable
                  </label>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-[#123524]">
                <h3 className="text-lg font-bold text-[#123524] flex items-center gap-2 mb-6">
                  <div className="bg-[#123524]/5 p-2 rounded-lg text-[#123524]"><Landmark className="w-5 h-5"/></div> 
                  Bank Details <span className="text-sm font-normal ml-2">/ బ్యాంకు వివరాలు</span>
                </h3>
                <div className="space-y-4">
                  <div><label className="text-xs font-bold text-gray-700">Bank Name</label>
                  <select name="bankName" value={formData.bankName} onChange={handleInputChange} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-700">
                    <option value="">Select Bank</option>
                    {INDIAN_BANKS.map((bank, index) => (
                      <option key={index} value={bank}>{bank}</option>
                    ))}
                  </select>
                  </div>
                  <div><label className="text-xs font-bold text-gray-700">Account Number</label><input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} placeholder="Enter Account Number" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                  <div><label className="text-xs font-bold text-gray-700">IFSC Code</label><input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleInputChange} placeholder="Enter IFSC Code" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                </div>
              </div>
            </div>

            {/* Membership Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border-l-4 border-[#123524]">
              <h3 className="text-lg font-bold text-[#123524] flex items-center gap-2 mb-6">
                <div className="bg-[#123524]/5 p-2 rounded-lg text-[#123524]"><Briefcase className="w-5 h-5"/></div> 
                4. MEMBERSHIP DETAILS <span className="text-sm font-normal ml-2">సభ్యత్వ వివరాలు</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                <div>
                  <p className="text-sm font-bold text-[#123524] mb-1">Membership Type</p>
                  <p className="text-xs text-[#123524] mb-2">సభ్యత్వ రకం</p>
                </div>
                <div className="md:col-span-3 bg-[#123524]/5 p-4 rounded-xl border border-[#123524]/10 flex items-center">
                  <label className="flex items-center gap-3 font-bold text-[#123524] text-sm"><input type="radio" checked readOnly className="w-4 h-4 text-[#123524]"/> Regular Member సాధారణ సభ్యుడు</label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
                  <p className="text-gray-600 text-sm font-bold mb-1">Membership Fee</p>
                  <p className="text-xs text-gray-500 mb-2">సభ్యత్వ ఫీజు</p>
                  <p className="text-3xl font-black text-[#123524]">₹20</p>
                </div>
                <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
                  <p className="text-gray-600 text-sm font-bold mb-1">Share Capital Contribution</p>
                  <p className="text-xs text-gray-500 mb-2">షేర్ క్యాపిటల్ విరాళం</p>
                  <p className="text-3xl font-black text-[#123524]">₹100</p>
                </div>
                <div className="bg-white border-2 border-[#123524]/20 rounded-xl p-6 text-center shadow-sm bg-[#123524]/5">
                  <p className="text-[#123524] text-sm font-bold mb-1">Total Joining Amount</p>
                  <p className="text-xs text-[#123524] mb-2">మొత్తం జాయినింగ్</p>
                  <p className="text-3xl font-black text-[#123524]">₹120</p>
                </div>
              </div>
            </div>

            {/* Nominee and Introducer (Optional - Asterisks removed) */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border-l-4 border-[#123524]">
              <h3 className="text-lg font-bold text-[#123524] flex items-center gap-2 mb-6">
                <div className="bg-[#123524]/5 p-2 rounded-lg text-[#123524]"><User className="w-5 h-5"/></div> 
                5. NOMINEE & INTRODUCER DETAILS <span className="text-sm font-normal ml-2">నామినీ మరియు పరిచయం వివరాలు (Optional)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold text-[#123524] mb-1">Nominee Details</h4>
                  <h4 className="text-xs text-[#123524] mb-4">నామినీ వివరాలు</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2"><label className="text-xs font-bold text-gray-700">Nominee Name</label><input type="text" name="nomineeName" value={formData.nomineeName} onChange={handleInputChange} placeholder="Enter nominee name" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                    <div><label className="text-xs font-bold text-gray-700">Relationship</label><input type="text" name="nomineeRelationship" value={formData.nomineeRelationship} onChange={handleInputChange} placeholder="Enter relationship" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                    <div><label className="text-xs font-bold text-gray-700">Date of Birth</label><input type="date" name="nomineeDob" value={formData.nomineeDob} onChange={handleInputChange} onClick={(e) => e.target.showPicker && e.target.showPicker()} max={new Date().toISOString().split('T')[0]} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm cursor-pointer" /></div>
                    <div className="md:col-span-2 flex gap-2 items-end">
                      <div className="w-1/3">
                        <label className="text-xs font-bold text-gray-700">Mobile Number</label>
                        <select className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-500"><option>+91</option></select>
                      </div>
                      <div className="w-2/3"><input type="tel" name="nomineeMobile" value={formData.nomineeMobile} onChange={handleInputChange} placeholder="Mobile number" maxLength="10" className="w-full p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                    </div>
                    <div className="md:col-span-2"><label className="text-xs font-bold text-gray-700">Nominee Share (%)</label><input type="text" name="nomineeShare" value={formData.nomineeShare} onChange={handleInputChange} placeholder="Enter share percentage (e.g. 100)" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#123524] mb-1">Introducer Details (Optional)</h4>
                  <h4 className="text-xs text-[#123524] mb-4">పరిచయం చేసిన సభ్యుని వివరాలు</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2"><label className="text-xs font-bold text-gray-700">Introducer Name</label><input type="text" name="introducerName" value={formData.introducerName} onChange={handleInputChange} placeholder="Enter introducer name" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                    <div><label className="text-xs font-bold text-gray-700">Member ID</label><input type="text" name="introducerMemberId" value={formData.introducerMemberId} onChange={handleInputChange} placeholder="Enter member ID" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                    <div className="md:col-span-2 flex gap-2 items-end">
                      <div className="w-1/3">
                        <label className="text-xs font-bold text-gray-700">Mobile Number</label>
                        <select className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-500"><option>+91</option></select>
                      </div>
                      <div className="w-2/3"><input type="tel" name="introducerMobile" value={formData.introducerMobile} onChange={handleInputChange} placeholder="Mobile number" maxLength="10" className="w-full p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents and Declaration */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border-l-4 border-[#123524]">
              <h3 className="text-lg font-bold text-[#123524] flex items-center gap-2 mb-6">
                <div className="bg-[#123524]/5 p-2 rounded-lg text-[#123524]"><Upload className="w-5 h-5"/></div> 
                6. DOCUMENTS UPLOAD & DECLARATION <span className="text-sm font-normal ml-2">పత్రాల అప్లోడ్ మరియు ప్రకటన</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h4 className="text-sm font-bold text-[#123524] mb-1">Upload Documents (Optional)</h4>
                  <h4 className="text-xs text-[#123524] mb-4">పత్రాలను అప్లోడ్ చేయండి</h4>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {[
                      { label: 'Applicant Photograph', name: 'applicantPhoto' },
                      { label: 'Aadhaar / ID Proof', name: 'aadhaarProof' },
                      { label: 'PAN / Form 60', name: 'panProof' },
                      { label: 'Address Proof', name: 'addressProof' },
                      { label: 'Signature', name: 'signature' }
                    ].map((doc, i) => (
                      <div key={i} className="text-center">
                        <p className="text-[10px] font-bold text-gray-700 mb-2 h-6 flex items-end justify-center">{doc.label}</p>
                        <label className={`border-2 border-dashed rounded-lg p-2 cursor-pointer transition-colors h-24 flex flex-col justify-center items-center relative overflow-hidden ${formData[doc.name] ? 'bg-[#123524]/10 border-[#123524]' : 'hover:bg-gray-50'}`}>
                          <input type="file" name={doc.name} onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" className="hidden" />
                          {formData[doc.name] ? (
                            <div className="flex flex-col items-center justify-center">
                              <CheckCircle2 className="w-8 h-8 text-[#123524] mb-1" />
                              <span className="text-[9px] font-bold text-[#123524] truncate w-full px-1">{formData[doc.name].name}</span>
                            </div>
                          ) : (
                            <>
                              <div className="w-10 h-10 bg-gray-200 rounded-full mb-2"></div>
                              <span className="text-[10px] bg-white border px-2 py-1 rounded shadow-sm w-full block">Choose File</span>
                            </>
                          )}
                        </label>
                        <span className="text-[9px] text-gray-400 block mt-1">JPG, PNG, PDF</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#123524]/5 p-4 rounded-lg flex items-center gap-3 mt-6 border border-[#123524]/10">
                    <ShieldCheck className="w-6 h-6 text-[#123524]"/>
                    <div>
                      <p className="text-sm font-bold text-[#123524]">Your information is secure with us.</p>
                      <p className="text-xs text-[#123524]">We follow strict confidentiality and data privacy policies.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#123524] mb-1">Declaration</h4>
                  <h4 className="text-xs text-[#123524] mb-4">ప్రకటన</h4>
                  <div className="space-y-3">
                    {[
                      'I confirm that I have read and understood all the above information.',
                      'I hereby apply for membership of Kalpavruksha Mutually Aided Multipurpose Co-operative Society Ltd.',
                      'I declare that all information furnished by me is true and correct.',
                      'I agree to abide by the Registered Byelaws, Rules, Policies and Resolutions of the Society.',
                      'I consent to KYC verification and lawful processing of my personal information.',
                      'I understand that membership approval is subject to verification and approval by the Society.',
                      'I confirm that I am eligible to become a member under the Society\'s Byelaws.'
                    ].map((text, i) => (
                      <label key={i} className="flex items-start gap-2 text-[10px] text-gray-700 font-medium cursor-pointer">
                        <div className="bg-[#123524] rounded-sm w-3 h-3 flex items-center justify-center mt-0.5 shrink-0">
                          <CheckCircle2 className="w-2 h-2 text-white" />
                        </div>
                        <span>{text}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-4">
                     <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-[#123524] cursor-pointer" name="declarationAccepted" checked={formData.declarationAccepted} onChange={handleInputChange} />
                        I accept all the terms and declarations. <span className="text-red-500">*</span>
                     </label>
                     {error && <p className="text-red-500 text-xs font-bold mt-2">{error}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation & Submit Button */}
            <div className="mt-10 pt-6 flex justify-between bg-[#123524]/5 p-6 rounded-2xl items-center border border-[#123524]/10 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => navigate('/')} className="px-6 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-white bg-white text-sm">Cancel</button>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-[#123524]">Review details carefully before final submission.</p>
                <p className="text-[10px] text-gray-500">You will receive the next-step option to enrol in K-TIP upon submission.</p>
              </div>
              <button 
                type="button" 
                onClick={handleSubmit} 
                disabled={isSubmitting || !isFormValid} 
                className={`px-8 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${isSubmitting || !isFormValid ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#123524] text-white hover:bg-[#1a4b33]'}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'} <span>→</span>
              </button>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* K-TIP Feature Highlight Card */}
            <div className="bg-gradient-to-br from-[#123524] to-[#0B1F4D] rounded-2xl shadow-md p-6 text-white border border-[#C9A13B]/30">
              <div className="flex items-center gap-2 text-[#C9A13B] text-xs font-black uppercase tracking-widest mb-2">
                <Sparkles size={16} /> Cooperative Wealth
              </div>
              <h4 className="font-black text-xl mb-2 text-white">Join K-TIP Plan</h4>
              <p className="text-xs text-gray-200 leading-relaxed mb-4">
                After completing your membership application, continue directly to enrol in the <strong>Kalpavruksha Targeted Investment Plan (K-TIP)</strong>.
              </p>
              <div className="bg-white/10 rounded-xl p-3 text-[11px] font-bold text-[#C9A13B] flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" /> Pre-fills your verified Member info automatically
              </div>
            </div>

            <div className="bg-[#F8FDF9] rounded-2xl shadow-sm p-6 border">
              <h4 className="font-black text-[#0B1F4D] text-lg mb-4">Why Join Kalpavruksha?</h4>
              <ul className="space-y-4">
                {['Secure & Transparent', 'Member Focused', 'Community Development', 'Financial Growth', 'Legal & Trusted Society'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#123524]" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-[#123524]/10 flex items-center justify-center relative overflow-hidden bg-white">
                  <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&q=80')"}}></div>
                  <ShieldCheck className="w-12 h-12 text-[#123524] z-10" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h4 className="font-black text-[#0B1F4D] text-lg mb-1 relative">Need Help? <div className="absolute right-0 top-0 bg-[#123524]/5 p-2 rounded-full"><Phone className="w-4 h-4 text-[#123524]"/></div></h4>
              <p className="text-xs text-gray-500 mb-6">We are here to help you</p>
              <div className="space-y-4">
                <p className="flex items-center gap-3 text-sm font-bold text-gray-700"><div className="bg-[#123524]/5 p-1.5 rounded-full"><Phone className="w-3 h-3 text-[#123524]"/></div> +91 9632144456</p>
                <p className="flex items-center gap-3 text-sm font-bold text-gray-700"><div className="bg-[#123524]/5 p-1.5 rounded-full"><Mail className="w-3 h-3 text-[#123524]"/></div> info@kalpavruksha.co.in</p>
                <p className="flex items-center gap-3 text-xs text-gray-500"><div className="bg-[#123524]/5 p-1.5 rounded-full"><Briefcase className="w-3 h-3 text-[#123524]"/></div> Mon - Sat : 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="bg-[#F8FDF9] rounded-2xl shadow-sm p-6 border border-[#123524]/10">
              <h4 className="font-black text-[#0B1F4D] text-lg mb-6">Membership Overview</h4>
              <div className="space-y-4 border-b border-[#123524]/20 pb-4 mb-4">
                <div className="flex justify-between text-xs font-bold text-gray-600"><span>Membership Fee</span><span>₹ 20</span></div>
                <div className="flex justify-between text-xs font-bold text-gray-600"><span>Share Capital Contribution</span><span>₹ 100</span></div>
              </div>
              <div className="flex justify-between items-center text-sm font-black text-[#123524] bg-[#123524]/10 p-3 rounded-lg"><span>Total Amount</span><span className="text-lg">₹ 120</span></div>
              <p className="mt-4 text-[10px] font-bold text-gray-600 flex items-start gap-2">
                <div className="bg-[#123524]/10 p-1 rounded-full"><CheckCircle2 className="w-3 h-3 text-[#123524]"/></div> 
                <div>
                  <p>One-time payment.</p>
                  <p>No hidden charges.</p>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
