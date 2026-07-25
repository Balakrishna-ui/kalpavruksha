import React, { useState } from 'react';
import { 
  User, MapPin, ShieldCheck, 
  CheckCircle2, Upload, Phone, Mail, FileText, Briefcase, Landmark, Users, ChevronDown
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

const Membership = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    // Step 1
    fullName: '', fatherName: '', dob: '', age: '', gender: '', 
    occupation: '', annualIncome: '', category: '', 
    mobileNumber: '', whatsappNumber: '', email: '',
    // Step 2
    houseNo: '', street: '', village: '', mandal: '', district: '', state: 'Telangana', pinCode: '', sameAsPermanent: true,
    // Step 3
    aadhaarNumber: '', panNumber: '', form60: false, bankName: '', accountNumber: '', ifscCode: '',
    // Step 4
    membershipType: 'Regular Member', membershipFee: '20', shareCapital: '100', totalAmount: '120',
    // Step 5
    nomineeName: '', nomineeRelationship: '', nomineeDob: '', nomineeMobile: '', nomineeShare: '',
    introducerName: '', introducerMemberId: '', introducerMobile: '',
    // Step 6
    declarationAccepted: false,
    applicantPhoto: null,
    aadhaarProof: null,
    panProof: null,
    addressProof: null,
    signature: null
  });

  const isStep1Completed = Boolean(formData.fullName && formData.fatherName && formData.dob && formData.age && formData.gender && formData.occupation && formData.annualIncome && formData.category && formData.mobileNumber);
  const isStep2Completed = Boolean(formData.houseNo && formData.street && formData.village && formData.mandal && formData.district && formData.state && formData.pinCode);
  const isStep3Completed = Boolean((formData.panNumber || formData.form60) && formData.bankName && formData.accountNumber && formData.ifscCode);
  const isStep4Completed = true;
  const isStep5Completed = Boolean(formData.nomineeName && formData.nomineeRelationship && formData.nomineeDob && formData.nomineeMobile && formData.nomineeShare);
  const isStep6Completed = Boolean(formData.applicantPhoto && formData.aadhaarProof && formData.panProof && formData.signature && formData.declarationAccepted);

  const getStepStatus = (isCompleted, previousCompleted) => {
    if (isCompleted) return 'Completed';
    if (previousCompleted) return 'In Progress';
    return 'Pending';
  };

  const steps = [
    { id: 1, label: 'Personal Info', isCompleted: isStep1Completed, status: getStepStatus(isStep1Completed, true) },
    { id: 2, label: 'Address Details', isCompleted: isStep2Completed, status: getStepStatus(isStep2Completed, isStep1Completed) },
    { id: 3, label: 'KYC & Bank Details', isCompleted: isStep3Completed, status: getStepStatus(isStep3Completed, isStep2Completed) },
    { id: 4, label: 'Membership Details', isCompleted: isStep4Completed, status: getStepStatus(isStep4Completed, isStep3Completed) },
    { id: 5, label: 'Nominee & Introducer', isCompleted: isStep5Completed, status: getStepStatus(isStep5Completed, isStep4Completed) },
    { id: 6, label: 'Upload Documents', isCompleted: isStep6Completed, status: getStepStatus(isStep6Completed, isStep5Completed) }
  ];

  const isFormValid = steps.every(step => step.isCompleted);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Restrict mobile numbers to 10 digits and numbers only
    if (['mobileNumber', 'whatsappNumber', 'nomineeMobile', 'introducerMobile'].includes(name)) {
      if (value && !/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
    
    // Restrict Aadhaar numbers to 12 digits and numbers only
    if (['aadhaarNumber', 'nomineeAadhaar'].includes(name)) {
      if (value && !/^\d*$/.test(value)) return;
      if (value.length > 12) return;
    }
    
    // Restrict Account Number to 16 digits and numbers only
    if (name === 'accountNumber') {
      if (value && !/^\d*$/.test(value)) return;
      if (value.length > 16) return;
    }

    let processedValue = value;
    // Format PAN number: uppercase, alphanumeric, max 10 chars
    if (name === 'panNumber') {
      processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (processedValue.length > 10) return;
    }
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : processedValue
      };

      // Auto-calculate age if dob changes
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
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const payload = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'sameAsPermanent') return;
        if (formData[key] !== null && formData[key] !== undefined) {
          payload.append(key, formData[key]);
        }
      });
      
      await publicApi.submitMembership(payload);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full bg-[#F7F3E8] min-h-screen flex items-center justify-center pt-20 pb-20">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-lg mx-auto">
          <div className="w-24 h-24 bg-forest/5 text-emerald rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h3 className="text-3xl font-bold text-navy mb-4">Application Submitted!</h3>
          <p className="text-gray-500 mb-8">Your membership application has been submitted successfully. Our team will review it and get back to you.</p>
          <button onClick={() => window.location.reload()} className="bg-navy text-white px-8 py-3 rounded-lg font-bold">Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7F3E8] min-h-screen font-inter pb-20">
      
      {/* Hero Banner */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1920&q=80')" }}>
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-navy mb-3 tracking-tight">
            Online Membership <br className="hidden md:block"/>
            <span className="text-emerald">Application</span>
          </h1>
          <p className="text-gray-700 max-w-sm mb-6 font-medium leading-relaxed">
            Become a part of Kalpavruksha family and grow together for a better future
          </p>
          <div className="text-xs font-bold text-gray-800 flex gap-2 items-center">
            <span>Home</span> <span className="text-gray-400">›</span> <span>Membership</span> <span className="text-gray-400">›</span> <span className="text-emerald">Apply Online</span>
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
                step.isCompleted || step.status === 'In Progress' ? 'bg-forest text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {step.isCompleted ? <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" /> : (idx === 3 ? <Users className="w-4 h-4"/> : step.id)}
              </div>
              <span className={`text-[10px] md:text-xs font-bold ${step.isCompleted || step.status === 'In Progress' ? 'text-forest' : 'text-gray-400'}`}>{step.label}</span>
              <span className="hidden md:block text-[9px] text-gray-400 mt-1">{step.status}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal Info Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border-l-4 border-forest">
              <h3 className="text-lg font-bold text-forest flex items-center gap-2 mb-6">
                <div className="bg-forest/5 p-2 rounded-lg text-forest"><User className="w-5 h-5"/></div> 
                Personal Information <span className="text-sm font-normal ml-2">/ వ్యక్తిగత వివరాలు</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="text-xs font-bold text-gray-700">Full Name (as per Aadhaar/PAN) <span className="text-red-500">*</span></label><input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                <div><label className="text-xs font-bold text-gray-700">Father's / Mother's / Spouse Name <span className="text-red-500">*</span></label><input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} placeholder="Enter name" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                <div><label className="text-xs font-bold text-gray-700">Date of Birth <span className="text-red-500">*</span></label><input type="date" name="dob" value={formData.dob} onChange={handleInputChange} onClick={(e) => e.target.showPicker && e.target.showPicker()} max={new Date().toISOString().split('T')[0]} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm cursor-pointer" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-bold text-gray-700">Age <span className="text-red-500">*</span></label><input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Age" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-2">Gender <span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1 text-xs"><input type="radio" name="gender" value="Male" onChange={handleInputChange} checked={formData.gender==='Male'} className="text-forest focus:ring-forest"/> Male</label>
                      <label className="flex items-center gap-1 text-xs"><input type="radio" name="gender" value="Female" onChange={handleInputChange} checked={formData.gender==='Female'} className="text-forest focus:ring-forest"/> Female</label>
                      <label className="flex items-center gap-1 text-xs"><input type="radio" name="gender" value="Other" onChange={handleInputChange} checked={formData.gender==='Other'} className="text-forest focus:ring-forest"/> Other</label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Occupation <span className="text-red-500">*</span></label>
                  <select name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-500">
                    <option value="">Select Occupation</option><option value="Business">Business</option><option value="Salaried">Salaried</option><option value="Farmer">Farmer</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Annual Income <span className="text-red-500">*</span></label>
                  <select name="annualIncome" value={formData.annualIncome} onChange={handleInputChange} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-500">
                    <option value="">Select Income Range</option><option value="Below 2.5L">Below 2.5L</option><option value="2.5L - 5L">2.5L - 5L</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Category <span className="text-red-500">*</span></label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-500">
                    <option value="">Select Category</option><option value="General">General</option><option value="OBC">OBC</option>
                  </select>
                </div>
                <div className="flex gap-2 items-end">
                  <div className="w-1/3">
                    <label className="text-xs font-bold text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                    <select className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-500"><option>+91</option></select>
                  </div>
                  <div className="w-2/3"><input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} placeholder="Enter mobile number" maxLength="10" className="w-full p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                </div>
                <div className="flex gap-2 items-end">
                  <div className="w-1/3">
                    <label className="text-xs font-bold text-gray-700">WhatsApp Number</label>
                    <select className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-500"><option>+91</option></select>
                  </div>
                  <div className="w-2/3"><input type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInputChange} placeholder="Enter WhatsApp number" maxLength="10" className="w-full p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                </div>
                <div><label className="text-xs font-bold text-gray-700">Email ID</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email address" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
              </div>
            </div>

            {/* Address Details Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border-l-4 border-forest">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-forest flex items-center gap-2">
                  <div className="bg-forest/5 p-2 rounded-lg text-forest"><MapPin className="w-5 h-5"/></div> 
                  Address Details <span className="text-sm font-normal ml-2">/ చిరునామా వివరాలు</span>
                </h3>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-600">
                  Same as Permanent Address 
                  <div className={`w-10 h-5 rounded-full p-1 cursor-pointer flex ${formData.sameAsPermanent ? 'bg-forest justify-end' : 'bg-gray-300 justify-start'}`} onClick={() => setFormData({...formData, sameAsPermanent: !formData.sameAsPermanent})}>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div><label className="text-xs font-bold text-gray-700">House No. / Door No. <span className="text-red-500">*</span></label><input type="text" name="houseNo" value={formData.houseNo} onChange={handleInputChange} placeholder="Enter House No." className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                <div className="md:col-span-2"><label className="text-xs font-bold text-gray-700">Street / Locality <span className="text-red-500">*</span></label><input type="text" name="street" value={formData.street} onChange={handleInputChange} placeholder="Enter Street / Locality" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                
                <div>
                  <label className="text-xs font-bold text-gray-700">State <span className="text-red-500">*</span></label>
                  <select name="state" value={formData.state} onChange={handleInputChange} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-500">
                    <option value="">Select State</option>
                    {INDIAN_STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">District <span className="text-red-500">*</span></label>
                  <input type="text" name="district" value={formData.district} onChange={handleInputChange} placeholder="Enter District" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Mandal <span className="text-red-500">*</span></label>
                  <input type="text" name="mandal" value={formData.mandal} onChange={handleInputChange} placeholder="Enter Mandal" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Village / Town / City <span className="text-red-500">*</span></label>
                  <input type="text" name="village" value={formData.village} onChange={handleInputChange} placeholder="Enter Village / City" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" />
                </div>
                <div><label className="text-xs font-bold text-gray-700">PIN Code <span className="text-red-500">*</span></label><input type="text" name="pinCode" value={formData.pinCode} onChange={handleInputChange} placeholder="Enter PIN Code" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
              </div>
            </div>

            {/* KYC and Bank Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-forest">
                <h3 className="text-lg font-bold text-forest flex items-center gap-2 mb-6">
                  <div className="bg-forest/5 p-2 rounded-lg text-forest"><FileText className="w-5 h-5"/></div> 
                  KYC Details <span className="text-sm font-normal ml-2">/ KYC వివరాలు</span>
                </h3>
                <div className="space-y-4">
                  <div><label className="text-xs font-bold text-gray-700">Aadhaar Number (Optional)</label><input type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleInputChange} placeholder="Enter Aadhaar Number" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                  <div><label className="text-xs font-bold text-gray-700">PAN Number <span className="text-red-500">*</span></label><input type="text" name="panNumber" value={formData.panNumber} onChange={handleInputChange} placeholder="Enter PAN Number" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-600">
                    <input type="checkbox" name="form60" checked={formData.form60} onChange={handleInputChange} className="w-4 h-4 text-forest rounded"/> 
                    PAN not available, I will upload Form 60
                  </label>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-forest">
                <h3 className="text-lg font-bold text-forest flex items-center gap-2 mb-6">
                  <div className="bg-forest/5 p-2 rounded-lg text-forest"><Landmark className="w-5 h-5"/></div> 
                  Bank Details <span className="text-sm font-normal ml-2">/ బ్యాంకు వివరాలు</span>
                </h3>
                <div className="space-y-4">
                  <div><label className="text-xs font-bold text-gray-700">Bank Name <span className="text-red-500">*</span></label>
                  <select name="bankName" value={formData.bankName} onChange={handleInputChange} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-500">
                    <option value="">Select Bank</option>
                    {INDIAN_BANKS.map((bank, index) => (
                      <option key={index} value={bank}>{bank}</option>
                    ))}
                  </select>
                  </div>
                  <div><label className="text-xs font-bold text-gray-700">Account Number <span className="text-red-500">*</span></label><input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} placeholder="Enter Account Number" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                  <div><label className="text-xs font-bold text-gray-700">IFSC Code <span className="text-red-500">*</span></label><input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleInputChange} placeholder="Enter IFSC Code" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                </div>
              </div>
            </div>

            {/* Membership Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border-l-4 border-forest">
              <h3 className="text-lg font-bold text-forest flex items-center gap-2 mb-6">
                <div className="bg-forest/5 p-2 rounded-lg text-forest"><Briefcase className="w-5 h-5"/></div> 
                4. MEMBERSHIP DETAILS <span className="text-sm font-normal ml-2">సభ్యత్వ వివరాలు</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                <div>
                  <p className="text-sm font-bold text-forest mb-1">Membership Type</p>
                  <p className="text-xs text-forest mb-2">సభ్యత్వ రకం</p>
                </div>
                <div className="md:col-span-3 bg-forest/5 p-4 rounded-xl border border-forest/10 flex items-center">
                  <label className="flex items-center gap-3 font-bold text-forest text-sm"><input type="radio" checked readOnly className="w-4 h-4 text-forest"/> Regular Member సాధారణ సభ్యుడు</label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
                  <p className="text-gray-600 text-sm font-bold mb-1">Membership Fee</p>
                  <p className="text-xs text-gray-500 mb-2">సభ్యత్వ ఫీజు</p>
                  <p className="text-3xl font-black text-forest">₹20</p>
                </div>
                <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
                  <p className="text-gray-600 text-sm font-bold mb-1">Share Capital Contribution</p>
                  <p className="text-xs text-gray-500 mb-2">షేర్ క్యాపిటల్ విరాళం</p>
                  <p className="text-3xl font-black text-forest">₹100</p>
                </div>
                <div className="bg-white border-2 border-forest/20 rounded-xl p-6 text-center shadow-sm bg-forest/5">
                  <p className="text-forest text-sm font-bold mb-1">Total Joining Amount</p>
                  <p className="text-xs text-forest mb-2">మొత్తం జాయినింగ్</p>
                  <p className="text-3xl font-black text-forest">₹120</p>
                </div>
              </div>
            </div>

            {/* Nominee and Introducer */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border-l-4 border-forest">
              <h3 className="text-lg font-bold text-forest flex items-center gap-2 mb-6">
                <div className="bg-forest/5 p-2 rounded-lg text-forest"><User className="w-5 h-5"/></div> 
                5. NOMINEE & INTRODUCER DETAILS <span className="text-sm font-normal ml-2">నామినీ మరియు పరిచయం వివరాలు</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold text-forest mb-1">Nominee Details</h4>
                  <h4 className="text-xs text-forest mb-4">నామినీ వివరాలు</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2"><label className="text-xs font-bold text-gray-700">Nominee Name <span className="text-red-500">*</span></label><input type="text" name="nomineeName" value={formData.nomineeName} onChange={handleInputChange} placeholder="Enter nominee name" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                    <div><label className="text-xs font-bold text-gray-700">Relationship <span className="text-red-500">*</span></label><input type="text" name="nomineeRelationship" value={formData.nomineeRelationship} onChange={handleInputChange} placeholder="Enter relationship" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                    <div><label className="text-xs font-bold text-gray-700">Date of Birth <span className="text-red-500">*</span></label><input type="date" name="nomineeDob" value={formData.nomineeDob} onChange={handleInputChange} onClick={(e) => e.target.showPicker && e.target.showPicker()} max={new Date().toISOString().split('T')[0]} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm cursor-pointer" /></div>
                    <div className="md:col-span-2 flex gap-2 items-end">
                      <div className="w-1/3">
                        <label className="text-xs font-bold text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                        <select className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-500"><option>+91</option></select>
                      </div>
                      <div className="w-2/3"><input type="tel" name="nomineeMobile" value={formData.nomineeMobile} onChange={handleInputChange} placeholder="Enter mobile number" maxLength="10" className="w-full p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                    </div>
                    <div className="md:col-span-2"><label className="text-xs font-bold text-gray-700">Nominee Share (%) <span className="text-red-500">*</span></label><input type="text" name="nomineeShare" value={formData.nomineeShare} onChange={handleInputChange} placeholder="Enter share percentage" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-forest mb-1">Introducer Details (Optional)</h4>
                  <h4 className="text-xs text-forest mb-4">పరిచయం చేసిన సభ్యుని వివరాలు (ఐచ్ఛికం)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2"><label className="text-xs font-bold text-gray-700">Introducer Name</label><input type="text" name="introducerName" value={formData.introducerName} onChange={handleInputChange} placeholder="Enter introducer name" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                    <div><label className="text-xs font-bold text-gray-700">Member ID</label><input type="text" name="introducerMemberId" value={formData.introducerMemberId} onChange={handleInputChange} placeholder="Enter member ID" className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                    <div className="md:col-span-2 flex gap-2 items-end">
                      <div className="w-1/3">
                        <label className="text-xs font-bold text-gray-700">Mobile Number</label>
                        <select className="w-full mt-1 p-3 border rounded-lg bg-gray-50 text-sm text-gray-500"><option>+91</option></select>
                      </div>
                      <div className="w-2/3"><input type="tel" name="introducerMobile" value={formData.introducerMobile} onChange={handleInputChange} placeholder="Enter mobile number" maxLength="10" className="w-full p-3 border rounded-lg bg-gray-50 text-sm" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents and Declaration */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border-l-4 border-forest">
              <h3 className="text-lg font-bold text-forest flex items-center gap-2 mb-6">
                <div className="bg-forest/5 p-2 rounded-lg text-forest"><Upload className="w-5 h-5"/></div> 
                6. DOCUMENTS UPLOAD & DECLARATION <span className="text-sm font-normal ml-2">పత్రాల అప్లోడ్ మరియు ప్రకటన</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h4 className="text-sm font-bold text-forest mb-1">Upload Documents</h4>
                  <h4 className="text-xs text-forest mb-4">పత్రాలను అప్లోడ్ చేయండి</h4>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {[
                      { label: 'Applicant Photograph *', name: 'applicantPhoto' },
                      { label: 'Aadhaar / ID Proof *', name: 'aadhaarProof' },
                      { label: 'PAN Card / Form 60 *', name: 'panProof' },
                      { label: 'Address Proof (if required)', name: 'addressProof' },
                      { label: 'Signature *', name: 'signature' }
                    ].map((doc, i) => (
                      <div key={i} className="text-center">
                        <p className="text-[10px] font-bold text-gray-700 mb-2 h-6 flex items-end justify-center">{doc.label}</p>
                        <label className={`border-2 border-dashed rounded-lg p-2 cursor-pointer transition-colors h-24 flex flex-col justify-center items-center relative overflow-hidden ${formData[doc.name] ? 'bg-forest/10 border-forest' : 'hover:bg-gray-50'}`}>
                          <input type="file" name={doc.name} onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" className="hidden" />
                          {formData[doc.name] ? (
                            <div className="flex flex-col items-center justify-center">
                              <CheckCircle2 className="w-8 h-8 text-forest mb-1" />
                              <span className="text-[9px] font-bold text-forest truncate w-full px-1">{formData[doc.name].name}</span>
                            </div>
                          ) : (
                            <>
                              <div className="w-10 h-10 bg-gray-200 rounded-full mb-2"></div>
                              <span className="text-[10px] bg-white border px-2 py-1 rounded shadow-sm w-full block">Choose File</span>
                            </>
                          )}
                        </label>
                        <span className="text-[9px] text-gray-400 block mt-1">JPG, PNG, PDF (Max. 2MB)</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-forest/5 p-4 rounded-lg flex items-center gap-3 mt-6 border border-forest/10">
                    <ShieldCheck className="w-6 h-6 text-emerald"/>
                    <div>
                      <p className="text-sm font-bold text-forest">Your information is secure with us.</p>
                      <p className="text-xs text-forest">We follow strict privacy policies.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-forest mb-1">Declaration</h4>
                  <h4 className="text-xs text-forest mb-4">ప్రకటన</h4>
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
                        <div className="bg-forest rounded-sm w-3 h-3 flex items-center justify-center mt-0.5 shrink-0">
                          <CheckCircle2 className="w-2 h-2 text-white" />
                        </div>
                        <span>{text}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-4">
                     <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-forest cursor-pointer" name="declarationAccepted" checked={formData.declarationAccepted} onChange={handleInputChange} />
                        I accept all the terms and declarations.
                     </label>
                     {error && <p className="text-red-500 text-xs font-bold mt-2">{error}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-10 pt-6 flex justify-between bg-forest/5 p-6 rounded-2xl items-center border border-forest/10 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3">
                <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-white bg-white text-sm">← Previous</button>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-forest">Please review all details carefully before final submission.</p>
                <p className="text-[10px] text-gray-500">You will receive a confirmation once your application is submitted.</p>
              </div>
              <button type="button" onClick={handleSubmit} disabled={isSubmitting || !isFormValid} className={`px-8 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${isSubmitting || !isFormValid ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-forest text-white hover:bg-emerald'}`}>
                {isSubmitting ? 'Submitting...' : 'Review & Submit Application'} <span>→</span>
              </button>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#F8FDF9] rounded-2xl shadow-sm p-6 border">
              <h4 className="font-black text-navy text-lg mb-4">Why Join Kalpavruksha?</h4>
              <ul className="space-y-4">
                {['Secure & Transparent', 'Member Focused', 'Community Development', 'Financial Growth', 'Legal & Trusted Society'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-forest/10 flex items-center justify-center relative overflow-hidden bg-white">
                  <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&q=80')"}}></div>
                  <ShieldCheck className="w-12 h-12 text-forest z-10" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h4 className="font-black text-navy text-lg mb-1 relative">Need Help? <div className="absolute right-0 top-0 bg-forest/5 p-2 rounded-full"><Phone className="w-4 h-4 text-forest"/></div></h4>
              <p className="text-xs text-gray-500 mb-6">We are here to help you</p>
              <div className="space-y-4">
                <p className="flex items-center gap-3 text-sm font-bold text-gray-700"><div className="bg-forest/5 p-1.5 rounded-full"><Phone className="w-3 h-3 text-forest"/></div> +91 9632144456</p>
                <p className="flex items-center gap-3 text-sm font-bold text-gray-700"><div className="bg-forest/5 p-1.5 rounded-full"><Mail className="w-3 h-3 text-forest"/></div> info@kalpavruksha.co.in</p>
                <p className="flex items-center gap-3 text-xs text-gray-500"><div className="bg-forest/5 p-1.5 rounded-full"><Briefcase className="w-3 h-3 text-forest"/></div> Mon - Sat : 9:00 AM - 6:00 PM</p>
              </div>
              <button className="w-full mt-6 bg-forest text-white py-2.5 rounded-lg text-sm font-bold">Contact Us</button>
            </div>

            <div className="bg-[#F8FDF9] rounded-2xl shadow-sm p-6 border border-forest/10">
              <h4 className="font-black text-navy text-lg mb-6">Membership Overview</h4>
              <div className="space-y-4 border-b border-forest/20 pb-4 mb-4">
                <div className="flex justify-between text-xs font-bold text-gray-600"><span>Membership Fee</span><span>₹ 20</span></div>
                <div className="flex justify-between text-xs font-bold text-gray-600"><span>Share Capital Contribution</span><span>₹ 100</span></div>
              </div>
              <div className="flex justify-between items-center text-sm font-black text-forest bg-forest/10 p-3 rounded-lg"><span>Total Amount</span><span className="text-lg">₹ 120</span></div>
              <p className="mt-4 text-[10px] font-bold text-gray-600 flex items-start gap-2">
                <div className="bg-forest/10 p-1 rounded-full"><CheckCircle2 className="w-3 h-3 text-emerald"/></div> 
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
