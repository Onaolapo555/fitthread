"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
  onSelect: (p: Product) => void;
  priority?: boolean;
  sizes: string;
  className?: string;
};

/**
 * Shared product tile — duotone imagery with a frosted-glass
 * (backdrop-blur) info bar, matching the design reference.
 */
export default function ProductTile({ product, onSelect, priority, sizes, className = "" }: Props) {
  const { add } = useCart();
  const [grey, setGrey] = useState(true);
  const accent = product.colors[0] ?? "#b03a2e";

  const dot = (active: boolean) =>
    `w-4 h-4 rounded-full transition ${
      active ? "ring-2 ring-bone ring-offset-2 ring-offset-black" : "border border-white/50 hover:border-bone"
    }`;

  return (
    <article
      onClick={() => onSelect(product)}
      className={`group relative cursor-pointer bg-coal ${className}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          className={`object-cover transition duration-500 group-hover:scale-105 ${
            grey ? "img-duotone" : ""
          }`}
          sizes={sizes}
        />
        {/* Glass info bar */}
        <div className="absolute bottom-0 inset-x-0 backdrop-blur-xl bg-black/40 border-t border-white/15 p-4 flex items-end justify-between gap-3">
          <div className="text-left">
            <p className="text-bone/90 text-[13px] font-medium">
              {product.name} / {product.code}
            </p>
            <p className="text-bone font-bold text-lg mt-0.5">${product.price}</p>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                title="Grey version"
                aria-label={`${product.name} in grey`}
                aria-pressed={grey}
                onClick={(e) => {
                  e.stopPropagation();
                  setGrey(true);
                }}
                className={dot(grey)}
                style={{ background: "#808080" }}
              />
              <button
                type="button"
                title="Original color"
                aria-label={`${product.name} in original color`}
                aria-pressed={!grey}
                onClick={(e) => {
                  e.stopPropagation();
                  setGrey(false);
                }}
                className={dot(!grey)}
                style={{ background: accent }}
              />
            </div>
          </div>
          <button
            aria-label={`Add ${product.name} to bag`}
            onClick={(e) => {
              e.stopPropagation();
              add(product);
            }}
            className="w-10 h-10 bg-bone/90 backdrop-blur text-black flex items-center justify-center hover:bg-lime transition shrink-0"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </article>
  );
}
