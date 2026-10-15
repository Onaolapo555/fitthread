"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { CartItem } from "@/lib/types";

export default function SuccessPage() {
  const [order, setOrder] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("fitthread-last-order");
      if (raw) setOrder(JSON.parse(raw));
      localStorage.removeItem("fitthread-last-order");
      localStorage.removeItem("fitthread-cart");
    } catch {
      /* ignore */
    }
  }, []);

  const total = order.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="min-h-screen bg-ink text-bone flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <h1 className="font-display text-5xl">ORDER CONFIRMED!</h1>
        <p className="text-smoke font-signal text-sm mt-2">Thank you for shopping with FitThread</p>
        {order.length > 0 && (
          <div className="bg-coal border border-white/10 p-8 mt-8 text-left">
            <h3 className="font-signal text-xs tracking-[0.2em] mb-5">ORDER SUMMARY</h3>
            {order.map((i) => (
              <div key={i.id} className="flex justify-between py-2 text-sm">
                <span>
                  {i.name} <span className="text-smoke">× {i.quantity}</span>
                </span>
                <span className="font-bold">${i.price * i.quantity}</span>
              </div>
            ))}
            <div className="border-t border-white/10 mt-4 pt-4 flex justify-between font-bold">
              <span>Total Paid</span>
              <span>${total}</span>
            </div>
          </div>
        )}
        <Link
          href="/"
          className="block w-full bg-lime text-black font-signal font-bold text-sm py-4 mt-8 hover:bg-bone transition"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  );
}
