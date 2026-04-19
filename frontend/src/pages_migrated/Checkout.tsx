import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Truck, CreditCard, Lock } from 'lucide-react';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      navigate('/success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-forest mb-4">SECURE <span className="text-gold">CHECKOUT</span></h1>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Details */}
          <div className="space-y-8">
            {/* Shipping Section */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl border border-gray-50 transition-all hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-forest/5 rounded-2xl flex items-center justify-center text-forest">
                  <Truck size={24} />
                </div>
                <h2 className="text-2xl font-black text-forest">Shipping Address</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-gold/30 transition-all font-medium text-forest" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                  <input required type="tel" placeholder="+91 98765 43210" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-gold/30 transition-all font-medium text-forest" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Street Address</label>
                  <input required type="text" placeholder="Plot No 123, Village Heritage Lane" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-gold/30 transition-all font-medium text-forest" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">City</label>
                  <input required type="text" placeholder="Hyderabad" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-gold/30 transition-all font-medium text-forest" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Pincode</label>
                  <input required type="text" placeholder="500001" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-gold/30 transition-all font-medium text-forest" />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl border border-gray-50 transition-all hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-forest/5 rounded-2xl flex items-center justify-center text-forest">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-2xl font-black text-forest">Payment Method</h2>
              </div>
              
              <div className="space-y-4">
                {['UPI / QR', 'Credit / Debit Card', 'Net Banking', 'Cash on Delivery'].map((method) => (
                  <label key={method} className="flex items-center justify-between p-5 rounded-2xl border-2 border-gray-50 bg-gray-50/30 cursor-pointer hover:border-gold/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-gold"></div>
                      <span className="font-bold text-forest">{method}</span>
                    </div>
                    <Lock size={16} className="text-gray-300" />
                    <input type="radio" name="payment" className="hidden" />
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[40px] p-10 shadow-2xl border border-gray-50 sticky top-32">
              <h2 className="text-2xl font-black text-forest mb-8 border-b border-gray-50 pb-4 uppercase tracking-widest">Your Order</h2>
              
              <div className="max-h-60 overflow-y-auto space-y-4 mb-8 pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-black text-gold">x{item.quantity}</span>
                      <span className="font-bold text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-black text-forest">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8 pt-6 border-t border-gray-50">
                <div className="flex justify-between text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                  <span>Shipping Fee</span>
                  <span className="text-green-500">FREE</span>
                </div>
                <div className="pt-4 flex justify-between text-2xl font-black text-forest">
                  <span>Total Payable</span>
                  <span className="text-gold">₹{totalPrice}</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className={`w-full flex items-center justify-center gap-3 bg-forest text-white py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-xl hover:bg-gold ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? 'Processing...' : 'Pay & Place Order'}
                {!isProcessing && <ShieldCheck size={18} />}
              </button>

              <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                <div className="flex items-center gap-1"><Lock size={12} /> SSL Encrypted</div>
                <div className="flex items-center gap-1"><ShieldCheck size={12} /> Secure Gateway</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
