import React, { useState, useEffect } from 'react';
import { Calculator, Calendar, Handshake, Users, ShieldCheck, CheckCircle2, ChevronRight, FileText, Clock, CreditCard, Banknote, BadgePercent } from 'lucide-react';

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(36);
  
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);

  useEffect(() => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure;
    
    if (p > 0 && r > 0 && n > 0) {
      const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(Math.round(emiValue));
      const totalRepay = Math.round(emiValue * n);
      setTotalRepayment(totalRepay);
      setTotalInterest(totalRepay - p);
    } else {
      setEmi(p / (n || 1));
      setTotalRepayment(p);
      setTotalInterest(0);
    }
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };
  
  const principalPercent = totalRepayment > 0 ? (loanAmount / totalRepayment) * 100 : 100;
  const interestPercent = totalRepayment > 0 ? (totalInterest / totalRepayment) * 100 : 0;
  
  const circleRadius = 50;
  const circumference = 2 * Math.PI * circleRadius;
  const principalStroke = (principalPercent / 100) * circumference;
  const interestStroke = (interestPercent / 100) * circumference;
  
  return (
    <div className="w-full max-w-7xl mx-auto font-sans px-4 mb-2">
      {/* Banner Section */}
      <div className="relative bg-[#061633] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch justify-between mb-6">
        <div className="z-10 w-full md:w-1/2 text-left p-6 md:p-10 flex flex-col justify-center">
          <div className="inline-block bg-[#D4AF37] text-black font-bold px-4 py-1.5 rounded-sm mb-4 flex items-center w-max text-sm relative after:absolute after:content-[''] after:w-0 after:h-0 after:border-t-[14px] after:border-t-transparent after:border-b-[14px] after:border-b-transparent after:border-l-[14px] after:border-l-[#D4AF37] after:right-[-14px] after:top-0">
            NEW PLAN LAUNCHED <span className="ml-2">✨</span>
          </div>
          <h1 className="text-white text-3xl md:text-5xl font-extrabold mb-4 uppercase tracking-tight">
            LOAN EMI <span className="text-[#D4AF37]">CALCULATOR</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base mb-8 max-w-md leading-relaxed">
            Calculate your Equated Monthly Installment (EMI) and plan your loan with confidence.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-[#D4AF37]">
              <ShieldCheck className="w-6 h-6 mr-3 border border-[#D4AF37] rounded-full p-1" />
              <span className="text-white text-xs md:text-sm font-semibold uppercase leading-tight">LOW INTEREST<br/>RATES</span>
            </div>
            <div className="flex items-center text-[#D4AF37]">
              <Calendar className="w-6 h-6 mr-3 border border-[#D4AF37] rounded-full p-1" />
              <span className="text-white text-xs md:text-sm font-semibold uppercase leading-tight">FLEXIBLE<br/>TENURE</span>
            </div>
            <div className="flex items-center text-[#D4AF37]">
              <Handshake className="w-6 h-6 mr-3 border border-[#D4AF37] rounded-full p-1" />
              <span className="text-white text-xs md:text-sm font-semibold uppercase leading-tight">QUICK LOAN<br/>APPROVAL</span>
            </div>
            <div className="flex items-center text-[#D4AF37]">
              <Users className="w-6 h-6 mr-3 border border-[#D4AF37] rounded-full p-1" />
              <span className="text-white text-xs md:text-sm font-semibold uppercase leading-tight">MEMBER<br/>FOCUSED</span>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 relative min-h-[250px]">
           <img src="/img/emi_calculator_bg.png" alt="Loan EMI" className="w-full h-full object-cover object-center absolute inset-0 opacity-90 md:opacity-100" />
           {/* Left-to-right gradient to blend the image on desktop */}
           <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#061633] to-transparent z-10 hidden md:block"></div>
           {/* Top-to-bottom gradient to blend on mobile */}
           <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#061633] to-transparent z-10 md:hidden"></div>
           
           <div className="z-20 absolute inset-0 flex items-center justify-center">
             <div className="bg-[#D4AF37] rounded-full p-4 w-32 h-32 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(212,175,55,0.4)] transform rotate-12 border-2 border-dashed border-[#8a7222]">
               <span className="text-xs font-bold text-black mb-1">★★★</span>
               <span className="text-[10px] font-black text-black uppercase leading-tight">SECURE LOAN<br/>BETTER FUTURE</span>
               <span className="text-xs font-bold text-black mt-1">★★★</span>
             </div>
           </div>
           <div className="z-20 hidden md:flex flex-col space-y-2 absolute right-6 bottom-6 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/20">
             <div className="flex items-center text-white text-xs font-medium"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] mr-2"/> Trusted & Transparent</div>
             <div className="flex items-center text-white text-xs font-medium"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] mr-2"/> Safe & Secure</div>
             <div className="flex items-center text-white text-xs font-medium"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] mr-2"/> Built for Your Growth</div>
           </div>
        </div>
      </div>

      {/* Main Calculator Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#f8f9fa] rounded-2xl p-6 border border-gray-200">
        
        {/* Left Side: Inputs */}
        <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
            <Calculator className="w-6 h-6 text-[#061633] mr-3" />
            <h2 className="text-lg font-bold text-[#061633] uppercase">Calculate Your EMI</h2>
          </div>
          
          {/* Input Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">Loan Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                <input 
                  type="text" 
                  className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-8 pr-3 text-sm font-bold text-gray-800 outline-none focus:border-[#061633] transition-colors"
                  value={loanAmount.toLocaleString('en-IN')}
                  onChange={(e) => {
                    const val = parseInt(e.target.value.replace(/,/g, ''));
                    if(!isNaN(val)) setLoanAmount(val);
                  }}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">Interest Rate (P.A.)</label>
              <div className="relative">
                <select 
                  className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-3 text-sm font-bold text-gray-800 outline-none focus:border-[#061633] transition-colors appearance-none"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                >
                  <option value="10">10%</option>
                  <option value="12">12%</option>
                  <option value="13">13%</option>
                  <option value="15">15%</option>
                  <option value="18">18%</option>
                </select>
                <ChevronRight className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">Loan Tenure</label>
              <div className="relative">
                <select 
                  className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-3 text-sm font-bold text-gray-800 outline-none focus:border-[#061633] transition-colors appearance-none"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                >
                  <option value="12">12 Months</option>
                  <option value="24">24 Months</option>
                  <option value="36">36 Months</option>
                  <option value="48">48 Months</option>
                  <option value="60">60 Months</option>
                </select>
                <ChevronRight className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" />
              </div>
            </div>
            <div className="flex items-end">
               <button className="w-full bg-[#061633] text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center shadow-md hover:bg-[#0a234f] transition-colors h-[42px]">
                 <Calculator className="w-4 h-4 mr-2" />
                 CALCULATE EMI
               </button>
            </div>
          </div>

          {/* Slider Section */}
          <div className="mb-10 bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-gray-500">Select Loan Amount</span>
              <span className="text-lg font-bold text-[#061633]">{formatCurrency(loanAmount)}</span>
            </div>
            <input 
              type="range" 
              min="50000" 
              max="500000" 
              step="10000"
              value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              style={{
                background: `linear-gradient(to right, #061633 0%, #061633 ${(loanAmount - 50000)/(450000)*100}%, #e5e7eb ${(loanAmount - 50000)/(450000)*100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs font-semibold text-gray-400 mt-2">
              <span>₹ 50,000</span>
              <span>₹ 5,00,000</span>
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <span className="text-xs font-bold text-gray-700 block mb-3">Quick Tenure</span>
              <div className="flex gap-2 flex-wrap">
                {[12, 24, 36, 48, 60].map(m => (
                  <button 
                    key={m} 
                    onClick={() => setTenure(m)}
                    className={`px-3 py-1.5 text-xs font-semibold border rounded transition-colors ${tenure === m ? 'bg-[#061633] text-white border-[#061633]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                  >
                    {m} Months
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-gray-700 block mb-3">Quick Interest Rate</span>
              <div className="flex gap-2 flex-wrap">
                {[10, 12, 13, 15, 18].map(r => (
                  <button 
                    key={r} 
                    onClick={() => setInterestRate(r)}
                    className={`px-3 py-1.5 text-xs font-semibold border rounded transition-colors ${interestRate === r ? 'bg-[#061633] text-white border-[#061633]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                  >
                    {r}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="lg:col-span-5 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
            <Banknote className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-lg font-bold text-green-700 uppercase tracking-tight">Your EMI Results</h2>
          </div>
          
          {/* Top 3 Result Cards */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex flex-col items-center justify-center text-center">
              <Calendar className="w-5 h-5 text-green-600 mb-2" />
              <span className="text-[10px] font-bold text-gray-600 uppercase mb-1">Monthly EMI</span>
              <span className="text-base lg:text-lg font-black text-green-700">{formatCurrency(emi)}</span>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex flex-col items-center justify-center text-center">
              <BadgePercent className="w-5 h-5 text-[#C9A13B] mb-2" />
              <span className="text-[10px] font-bold text-gray-600 uppercase mb-1">Total Interest</span>
              <span className="text-base lg:text-lg font-black text-[#C9A13B]">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex flex-col items-center justify-center text-center">
              <Banknote className="w-5 h-5 text-[#061633] mb-2" />
              <span className="text-[10px] font-bold text-gray-600 uppercase mb-1">Total Repayment</span>
              <span className="text-base lg:text-lg font-black text-[#061633]">{formatCurrency(totalRepayment)}</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row items-center gap-6">
            {/* Donut Chart area */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              <span className="text-[10px] font-bold text-gray-500 uppercase self-start mb-4">EMI Breakdown</span>
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-90">
                  <circle cx="60" cy="60" r={circleRadius} fill="none" stroke="#f3f4f6" strokeWidth="20" />
                  {/* Principal */}
                  <circle 
                    cx="60" cy="60" r={circleRadius} 
                    fill="none" stroke="#061633" strokeWidth="20"
                    strokeDasharray={`${principalStroke} ${circumference}`}
                    className="transition-all duration-500 ease-in-out"
                  />
                  {/* Interest */}
                  <circle 
                    cx="60" cy="60" r={circleRadius} 
                    fill="none" stroke="#D4AF37" strokeWidth="20"
                    strokeDasharray={`${interestStroke} ${circumference}`}
                    strokeDashoffset={-principalStroke}
                    className="transition-all duration-500 ease-in-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Total</span>
                  <span className="text-sm font-black text-[#061633]">{formatCurrency(totalRepayment)}</span>
                </div>
              </div>
            </div>

            {/* Chart Legend & Details */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#061633] rounded-sm mr-3"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-500">Principal Amount</span>
                  <span className="text-xs font-bold text-gray-800">{formatCurrency(loanAmount)} ({principalPercent.toFixed(1)}%)</span>
                </div>
              </div>
              <div className="flex items-center pb-4 border-b border-gray-100">
                <div className="w-3 h-3 bg-[#D4AF37] rounded-sm mr-3"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-500">Total Interest</span>
                  <span className="text-xs font-bold text-gray-800">{formatCurrency(totalInterest)} ({interestPercent.toFixed(1)}%)</span>
                </div>
              </div>

              {/* Extra Details */}
              <div className="flex items-start text-xs pt-2">
                <FileText className="w-4 h-4 text-gray-400 mr-3 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-500">Processing Fee</span>
                  <span className="font-bold text-gray-800">₹ 1,500</span>
                </div>
              </div>
              <div className="flex items-start text-xs">
                <Clock className="w-4 h-4 text-gray-400 mr-3 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-500">Disbursement Time</span>
                  <span className="font-bold text-gray-800">2 - 3 Working Days</span>
                </div>
              </div>
              <div className="flex items-start text-xs">
                <CreditCard className="w-4 h-4 text-gray-400 mr-3 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-500">Repayment Mode</span>
                  <span className="font-bold text-gray-800">Monthly EMI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-4 px-2 mb-6">
           <div className="flex items-center text-xs font-semibold text-[#061633]">
             <ShieldCheck className="w-5 h-5 text-[#D4AF37] mr-2" /> Competitive Interest Rates
           </div>
           <div className="flex items-center text-xs font-semibold text-[#061633]">
             <FileText className="w-5 h-5 text-[#D4AF37] mr-2" /> Easy Documentation
           </div>
           <div className="flex items-center text-xs font-semibold text-[#061633]">
             <Banknote className="w-5 h-5 text-[#D4AF37] mr-2" /> Flexible Repayment Options
           </div>
           <div className="flex items-center text-xs font-semibold text-[#061633]">
             <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mr-2" /> Quick & Hassle Free Process
           </div>
           <div className="flex items-center text-xs font-semibold text-[#061633]">
             <Users className="w-5 h-5 text-[#D4AF37] mr-2" /> Personalized Customer Support
           </div>
        </div>
        
        <div className="bg-[#061633] rounded-t-xl flex flex-col md:flex-row items-center justify-between p-6 relative overflow-hidden">
           {/* Geometric shapes in background */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#0a234f] rounded-full filter blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
           <div className="text-white flex-1 mb-4 md:mb-0 relative z-10">
              <h3 className="text-xl font-bold mb-1">READY TO APPLY?</h3>
              <p className="text-gray-300 text-sm">Get the loan you need to achieve your dreams.</p>
           </div>
           <button className="relative z-10 bg-[#D4AF37] hover:bg-[#c29e2f] text-black font-bold py-3 px-8 rounded-lg shadow-lg flex items-center transition-all duration-300 transform hover:scale-105">
             APPLY NOW <ChevronRight className="ml-2 w-5 h-5" />
           </button>
        </div>
        
        <div className="bg-[#040f24] rounded-b-xl px-6 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 border-t border-[#122345]">
           <div className="flex items-center mb-2 md:mb-0 space-x-2">
             <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
             <span className="font-bold text-white uppercase tracking-wide">Kalpavruksha Financial Services</span>
             <span>|</span>
             <span>Secure Savings</span>
             <span>•</span>
             <span>Flexible Loans</span>
             <span>•</span>
             <span>Bright Future</span>
           </div>
           <div className="flex items-center text-[#D4AF37] font-semibold italic">
             Together We Grow, Together We Prosper <span className="ml-2">🌱</span>
           </div>
        </div>
      </div>
    </div>
  );
}
