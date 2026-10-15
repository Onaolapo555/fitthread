"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import ProductTile from "@/components/ProductTile";

export default function LatestSkins({
  products,
  search,
  onSelect,
}: {
  products: Product[];
  search: string;
  onSelect: (p: Product) => void;
}) {
  const items = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? products.filter((p) => p.name.toLowerCase().includes(q)) : products;
  }, [search, products]);

  return (
    <section id="latest" className="bg-ink pt-14 md:pt-20 scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 text-center">
        <h2 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] text-bone">
          LATEST SKINS
        </h2>
        <p className="font-signal text-[12px] tracking-[0.2em] text-smoke mt-4">
          SELECTED BUILDS
        </p>
      </div>

      {/* Carousel */}
      <div className="relative mt-4">
        <div className="flex gap-[3px] overflow-x-auto no-scrollbar snap-x snap-mandatory px-0">
          {items.length === 0 && (
            <p className="w-full text-center text-smoke font-signal text-sm py-20">
              No builds match your search.
            </p>
          )}
          {items.map((p, i) => (
            <ProductTile
              key={p.id}
              product={p}
              onSelect={onSelect}
              priority={i === 0}
              sizes="(max-width: 768px) 62vw, 23vw"
              className="shrink-0 w-[62vw] sm:w-[38vw] lg:w-[23vw] snap-start"
            />
          ))}
        </div>

        {/* Drag pill */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:flex">
          <span className="w-24 h-24 rounded-full bg-bone text-black font-signal text-[12px] flex items-center justify-center gap-1">
            ← Drag →
          </span>
        </div>
      </div>

      {/* Big store CTA */}
      <div className="flex justify-center mt-10 pb-14 px-5">
        <Link
          href="/shop"
          className="flex items-center gap-4 bg-lime text-black font-signal font-bold text-base md:text-lg tracking-wide px-10 md:px-14 py-4 md:py-5 hover:bg-bone transition"
        >
          TO THE STORE <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
        </Link>
      </div>
    </section>
  );
}
