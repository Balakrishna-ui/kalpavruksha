import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, UserPlus, Shield, Bell, Save, Mail, KeyRound, Lock, Clock } from 'lucide-react';
import { adminApi } from '../api';

const Settings = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/admin/auth/me' || 'http://localhost:5000/api/admin/auth/me', { credentials: 'include' }).then(res => res.json()).then(data => {
      if(data.admin) setEmail(data.admin.email);
    });
  }, []);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [notifications, setNotifications] = useState({
    leads: true,
    orders: false,
    updates: true
  });

  // OTP Timer Countdown
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setErrorMsg('OTP expired. Please request a new one.');
      setStep(1);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, timer]);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await adminApi.requestOtp(email);
      if (res.data?.success) {
        setSuccessMsg(res.data.message);
        setStep(2);
        setTimer(300); // Reset timer to 5 minutes
      } else {
        setErrorMsg('Failed to send OTP.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setErrorMsg('Please enter the OTP sent to your email.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await adminApi.verifyOtp(email, otp);
      if (res.data?.success) {
        setSuccessMsg(res.data.message);
        setStep(3);
      } else {
        setErrorMsg('Failed to verify OTP.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error verifying OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await adminApi.resetPassword(email, otp, newPassword);
      if (res.data?.success) {
        setSuccessMsg('Password reset successfully!');
        // Reset state
        setStep(1);
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setErrorMsg('Failed to reset password.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error resetting password.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold text-slate-800">System Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Change Password Section */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Change Admin Password</h3>
              <p className="text-[11px] text-slate-400 font-medium">OTP Verified Secure Password Reset</p>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-lg border border-red-100">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-100">
              {successMsg}
            </div>
          )}

          {/* STEP 1: REQUEST OTP */}
          {step === 1 && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Registered Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 font-medium" 
                    placeholder="admin@kalpavruksha.co" 
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#11213F] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {loading ? 'Sending OTP...' : 'Send Verification OTP'}
              </button>
            </form>
          )}

          {/* STEP 2: VERIFY OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase text-slate-400">Enter verification OTP</label>
                  <span className="text-[10px] font-black text-amber-600 flex items-center gap-1">
                    <Clock size={12} /> Expires in: {formatTime(timer)}
                  </span>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    required 
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 font-mono text-center tracking-widest font-black" 
                    placeholder="000000" 
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: RESET PASSWORD */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="password" 
                    required 
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="password" 
                    required 
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                <Save size={14} />
                {loading ? 'Updating Password...' : 'Save New Password'}
              </button>
            </form>
          )}
        </div>

        {/* Notifications Section */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Bell size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Notification Preferences</h3>
              <p className="text-[11px] text-slate-400 font-medium">Control how you receive system alerts</p>
            </div>
          </div>
          
          <div className="space-y-4 pt-2">
            {[
              { id: 'leads', label: 'New Lead Alerts', desc: 'Get notified when a user submits an enquiry' },
              { id: 'orders', label: 'Order Notifications', desc: 'Receive alerts for new product orders' },
              { id: 'updates', label: 'System Updates', desc: 'Stay informed about platform changes' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-700">{item.label}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                </div>
                <div 
                  onClick={() => setNotifications(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                  className={`w-10 h-5 rounded-full relative cursor-pointer shadow-inner transition-colors duration-300 ${notifications[item.id] ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 ${notifications[item.id] ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
            ))}
            <button className="w-full bg-white border border-slate-200 text-slate-600 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <Save size={14} />
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
