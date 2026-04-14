import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, Calendar, ArrowRight, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const Success = () => {
  useEffect(() => {
    // Trigger celebration
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#1a3a1a', '#c9a84c', '#ffffff']
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f8faf8] pt-32 pb-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Celebration Icon */}
        <div className="relative inline-block mb-12">
          <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <div className="relative z-10 w-32 h-32 bg-forest rounded-[40px] flex items-center justify-center text-white shadow-2xl animate-bounce">
            <CheckCircle2 size={64} />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-forest mb-6 tracking-tight">
          ORDER <span className="text-gold">CONFIRMED!</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-16">
          Thank you for choosing Kalpavruksha. Your support directly empowers our village communities and promotes sustainable living.
        </p>

        {/* Order Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-[35px] shadow-xl border border-gray-50 text-left transition-all hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <Package size={20} />
              </div>
              <h3 className="text-lg font-black text-forest uppercase tracking-widest">Order Status</h3>
            </div>
            <p className="text-gray-400 font-medium mb-1 uppercase text-[10px] tracking-widest">Transaction ID</p>
            <p className="text-forest font-black font-mono text-lg mb-4">#KV-829104756</p>
            <div className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
              Processing
            </div>
          </div>

          <div className="bg-white p-8 rounded-[35px] shadow-xl border border-gray-50 text-left transition-all hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                <Calendar size={20} />
              </div>
              <h3 className="text-lg font-black text-forest uppercase tracking-widest">Estimated Arrival</h3>
            </div>
            <p className="text-gray-400 font-medium mb-1 uppercase text-[10px] tracking-widest">Expected Delivery</p>
            <p className="text-forest font-black text-lg mb-4">April 18th - 20th, 2026</p>
            <p className="text-gray-300 text-xs font-bold leading-tight">Our village logistics team is carefully preparing your organic products.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            to="/products"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-forest text-white px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-gold transition-all shadow-xl group"
          >
            Continue Shopping <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="w-full sm:w-auto flex items-center justify-center gap-3 border-2 border-forest/10 bg-white text-forest px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-forest hover:text-white transition-all">
            Share Experience <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
