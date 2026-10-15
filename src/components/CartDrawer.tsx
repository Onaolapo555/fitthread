"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

export default function CartDrawer() {
  const { cart, total, count, isOpen, setOpen, updateQty, remove } = useCart();
  const { user, openAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  async function checkout() {
    if (cart.length === 0) return;
    if (!user) {
      setNotice("Sign in or create an account to check out.");
      openAuth();
      return;
    }
    setNotice("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (data.url) {
        localStorage.setItem("fitthread-last-order", JSON.stringify(cart));
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Checkout failed");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
      <aside className="relative bg-coal w-full max-w-md h-full flex flex-col border-l border-white/10">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="font-display text-2xl text-bone">YOUR BAG ({count})</h2>
          <button onClick={() => setOpen(false)} className="text-2xl text-smoke hover:text-bone">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {cart.length === 0 ? (
            <p className="text-center text-smoke font-signal text-sm py-12">Your bag is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 mb-7 border-b border-white/10 pb-7">
                <div className="relative w-20 h-24 shrink-0 overflow-hidden bg-ink">
                  <Image src={item.image} alt={item.name} fill className="object-cover img-duotone" sizes="80px" />
                </div>
                <div className="flex-1">
                  <h4 className="text-bone text-[15px] font-medium">{item.name}</h4>
                  <p className="text-lime font-bold mt-0.5">${item.price}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-7 h-7 border border-white/20 text-bone hover:bg-white/10"
                    >
                      −
                    </button>
                    <span className="text-bone text-sm w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-7 h-7 border border-white/20 text-bone hover:bg-white/10"
                    >
                      +
                    </button>
                    <button onClick={() => remove(item.id)} className="ml-auto text-ember text-xs font-signal">
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-bone font-bold text-sm">${item.price * item.quantity}</div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10">
            <div className="flex justify-between text-bone text-lg mb-5">
              <span className="font-signal text-sm text-smoke">TOTAL</span>
              <span className="font-bold">${total}</span>
            </div>
            <button
              onClick={checkout}
              disabled={loading}
              className="w-full bg-lime text-black font-signal font-bold text-sm py-4 hover:bg-bone transition disabled:opacity-60"
            >
              {loading ? "PROCESSING..." : user ? "PROCEED TO CHECKOUT" : "SIGN IN TO CHECKOUT"}
            </button>
            {notice && !user && (
              <p className="text-center font-signal text-[11px] text-ember mt-3">{notice}</p>
            )}
            <p className="text-center font-signal text-[11px] text-smoke mt-3">
              Secure payment powered by Stripe
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
