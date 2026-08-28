import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight, Mail, Eye, EyeOff } from 'lucide-react';
import { adminApi } from '../api';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, isCheckingAuth, setIsAuthenticated } = useAdminAuth();

  useEffect(() => {
    if (isAuthenticated && !isCheckingAuth) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, isCheckingAuth, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setError('');
    
    try {
      const response = await adminApi.login(email, password);
      if (response.data?.authenticated) {
        setIsAuthenticated(true);
        navigate('/admin');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return <div className="h-screen w-full flex items-center justify-center bg-white font-bold">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0B1F4D] flex items-center justify-center p-6 font-inter">
      <div className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-2xl relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>

        <div className="relative z-10">
          <div className="w-20 h-20 bg-[#F3EAD3] rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-inner">
            <Shield className="w-10 h-10 text-[#0B1F4D]" />
          </div>

          <h2 className="text-3xl font-black text-[#0B1F4D] text-center mb-2 tracking-tight">Admin Secure Login</h2>
          <p className="text-gray-500 text-center mb-10 text-sm font-medium">Please enter your credentials to access the dashboard.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A13B] ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kalpavruksha.co"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#C9A13B]/30 transition-all text-[#0B1F4D]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A13B] ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#C9A13B]/30 transition-all text-[#0B1F4D]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0B1F4D] transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {error && <p className="text-red-500 text-[10px] font-bold mt-2 ml-1">{error}</p>}
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0B1F4D] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#C9A13B] hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Enter Dashboard'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-[#0B1F4D] text-xs font-bold transition-colors"
            >
              Back to Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
