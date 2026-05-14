
import { useState } from 'react';
import { stripePromise } from '../lib/stripe';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  updateQuantity, 
  removeFromCart 
}) {
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

const handleCheckout = async () => {
  if (cart.length === 0) return;

  setLoading(true);

  try {
    // === ADD THIS LINE ===
    localStorage.setItem('fitthread-last-order', JSON.stringify(cart));  // Save for Success page
    localStorage.removeItem('fitthread-cart');                         // Clear current cart immediately

    const stripe = await stripePromise;

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${import.meta.env.VITE_STRIPE_SECRET_KEY}`,
      },
      body: new URLSearchParams({
        'payment_method_types[0]': 'card',
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': 'FitThread Order',
        'line_items[0][price_data][unit_amount]': Math.round(totalPrice * 100),
        'line_items[0][quantity]': '1',
        'mode': 'payment',
        'success_url': `${window.location.origin}/success`,
        'cancel_url': window.location.origin,
      }),
    });


    const session = await response.json();

    if (session.error) {
      alert(session.error.message);
      return;
    }

    // New way - Use redirect instead of old method
    window.location.href = session.url;

  } catch (error) {
    console.error('Checkout error:', error);
    alert('Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex justify-end">
          <div className="bg-zinc-900 w-full max-w-md h-full overflow-auto">
            <div className="p-6 border-b border-zinc-700 flex justify-between items-center sticky top-0 bg-zinc-900">
              <h2 className="text-2xl font-semibold">Your Cart ({totalItems})</h2>
              <button 
                onClick={onClose}
                className="text-3xl hover:text-orange-500"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <p className="text-center text-zinc-400 py-12">Your cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 mb-8 border-b border-zinc-800 pb-8 last:border-none">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                    />
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-lg">{item.name}</h4>
                      <p className="text-orange-500 font-bold">${item.price}</p>

                      <div className="flex items-center gap-4 mt-4">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-zinc-700 rounded-lg hover:bg-zinc-800"
                        >
                          −
                        </button>
                        <span className="font-medium w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-zinc-700 rounded-lg hover:bg-zinc-800"
                        >
                          +
                        </button>

                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-500 text-sm hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="font-bold text-right">
                      ${(item.price * item.quantity).toFixed(0)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-zinc-700 sticky bottom-0 bg-zinc-900">
                <div className="flex justify-between text-xl mb-6">
                  <span>Total</span>
                  <span className="font-bold">${totalPrice}</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-orange-500 py-4 rounded-2xl font-medium text-lg hover:bg-orange-600 transition disabled:opacity-70"
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
                </button>

                <p className="text-center text-xs text-zinc-500 mt-4">
                  Secure payment powered by Stripe
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}