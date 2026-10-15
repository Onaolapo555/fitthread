"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/types";

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [size, setSize] = useState("M");
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative bg-coal border border-white/10 max-w-3xl w-full max-h-[90vh] overflow-auto grid md:grid-cols-2">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-2xl text-smoke hover:text-bone"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="relative aspect-square md:aspect-auto md:min-h-[520px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover img-duotone"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-8">
          <p className="font-signal text-[11px] tracking-[0.2em] text-lime">{product.category.toUpperCase()}</p>
          <h2 className="font-display text-4xl text-bone mt-2">
            {product.name} / {product.code}
          </h2>
          <p className="text-2xl font-bold text-bone mt-3">${product.price}</p>
          <p className="text-smoke text-sm leading-relaxed mt-5">
            Oversized {product.category.toLowerCase()} cut for alternate selves. Heavyweight
            fabric, boxy fit, holds its shape through moods and worlds.
          </p>
          <h3 className="font-signal text-xs tracking-[0.18em] text-bone mt-7 mb-3">SIZE</h3>
          <div className="flex gap-2">
            {["S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`w-11 h-11 border font-signal text-sm transition ${
                  size === s ? "bg-bone text-black border-bone" : "border-white/20 text-bone hover:border-bone"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              add(product);
              onClose();
            }}
            className="w-full bg-lime text-black font-signal font-bold text-sm py-4 mt-8 hover:bg-bone transition"
          >
            ADD TO BAG — {size}
          </button>
          <p className="text-center font-signal text-[11px] text-smoke mt-4">
            Free shipping over $100 • 30-day returns
          </p>
        </div>
      </div>
    </div>
  );
}
