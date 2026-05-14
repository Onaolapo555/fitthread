import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Success() {
  const [orderSummary, setOrderSummary] = useState(null);

  useEffect(() => {
    // Get the last cart before clearing
    const lastCart = localStorage.getItem('fitthread-last-order');
    
    if (lastCart) {
      setOrderSummary(JSON.parse(lastCart));
      // Clear it after showing
      localStorage.removeItem('fitthread-last-order');
    }

    // Clear current cart
    localStorage.removeItem('fitthread-cart');
  }, []);

  const totalPrice = orderSummary ? 
    orderSummary.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className="mb-10">
          <div className="w-28 h-28 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-7xl">🎉</span>
          </div>
          <h1 className="text-5xl font-bold mb-3">Order Confirmed!</h1>
          <p className="text-zinc-400 text-lg">Thank you for shopping with FitThread</p>
        </div>

        {orderSummary && (
          <div className="bg-zinc-900 rounded-3xl p-8 mb-8 text-left">
            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              {orderSummary.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold">${(item.price * item.quantity).toFixed(0)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-700 pt-6 flex justify-between text-xl">
              <span>Total Paid</span>
              <span className="font-bold">${totalPrice}</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Link 
            to="/"
            className="block w-full bg-orange-500 hover:bg-orange-600 py-4 rounded-2xl font-semibold transition text-lg"
          >
            Continue Shopping
          </Link>

          <button 
            onClick={() => window.print()}
            className="w-full border border-zinc-700 hover:bg-zinc-900 py-4 rounded-2xl font-medium transition"
          >
            Download Receipt
          </button>
        </div>

        <p className="text-xs text-zinc-500 mt-10">
          A confirmation email has been sent to your Gmail.
        </p>
      </div>
    </div>
  );
}