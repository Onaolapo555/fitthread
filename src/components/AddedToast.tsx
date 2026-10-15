"use client";

import { Check } from "lucide-react";
import { useCart } from "@/lib/cart";

/** Bottom toast confirming an add-to-bag. Click opens the bag. */
export default function AddedToast() {
  const { toast, setOpen } = useCart();
  if (!toast) return null;

  return (
    <button
      key={toast.id}
      onClick={() => setOpen(true)}
      className="toast-in fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-3 bg-lime text-black pl-4 pr-5 py-3 font-signal text-[12px] font-bold tracking-wide shadow-2xl hover:bg-bone transition whitespace-nowrap max-w-[92vw]"
    >
      <span className="w-5 h-5 bg-black text-lime flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5" strokeWidth={3} />
      </span>
      <span className="truncate">{toast.message.toUpperCase()} — ADDED TO BAG</span>
    </button>
  );
}
