
import { useCart } from '../context/CartContext';
import { ShoppingBag, ChevronRight, Trash2, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  return (
    <div className="min-h-screen bg-[#f8faf8] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-forest mb-4">YOUR <span className="text-gold">CART</span></h1>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-[35px] p-6 shadow-xl border border-gray-50 flex flex-col md:flex-row items-center gap-8 group transition-all hover:shadow-2xl">
                  <div className="w-32 h-32 bg-gray-50 rounded-[25px] overflow-hidden p-4 flex items-center justify-center shrink-0">
                    <img src={item.img} alt={item.name} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  
                  <div className="flex-grow text-center md:text-left">
                    <span className="text-[10px] font-black text-gold/60 tracking-[0.2em] uppercase mb-1 block">{item.category}</span>
                    <h3 className="text-xl font-extrabold text-forest mb-2">{item.name}</h3>
                    <p className="text-forest font-black">₹{item.price}</p>
                  </div>

                  <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm text-forest hover:bg-gold hover:text-white transition-all font-bold"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-black text-forest">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm text-forest hover:bg-gold hover:text-white transition-all font-bold"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-black text-forest mb-2">₹{item.price * item.quantity}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 transition-colors p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-forest rounded-[40px] p-10 text-white shadow-2xl sticky top-32">
                <h2 className="text-2xl font-black mb-8 border-b border-white/10 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-white/70 font-medium">
                    <span>Items ({totalItems})</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-white/70 font-medium">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between text-2xl font-black">
                    <span>Total</span>
                    <span className="text-gold">₹{totalPrice}</span>
                  </div>
                </div>

                <Link 
                  to="/checkout"
                  className="w-full flex items-center justify-center gap-3 bg-gold text-white py-5 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-white hover:text-forest transition-all shadow-xl"
                >
                  Checkout Now <ChevronRight size={18} />
                </Link>
                
                <Link 
                  to="/products"
                  className="w-full block text-center mt-6 text-white/50 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[50px] shadow-sm border-2 border-dashed border-gray-100 max-w-2xl mx-auto">
            <ShoppingBag className="mx-auto text-gray-200 mb-8" size={80} />
            <h2 className="text-3xl font-black text-forest mb-4 uppercase">Your cart is empty</h2>
            <p className="text-gray-400 mb-10 font-medium">Discover our authentic village products and start shopping.</p>
            <Link 
              to="/products"
              className="inline-block bg-forest text-white px-12 py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-gold transition-all shadow-xl"
            >
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
