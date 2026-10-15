"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import type { Product } from "@/lib/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductModal from "@/components/ProductModal";
import ProductTile from "@/components/ProductTile";

export default function ShopClient({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<(typeof CATEGORIES)[number]>("New Drop");
  const [selected, setSelected] = useState<Product | null>(null);

  const items = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchTab = tab === "New Drop" ? true : p.category === tab;
      const matchSearch = q ? p.name.toLowerCase().includes(q) : true;
      return matchTab && matchSearch;
    });
  }, [products, tab, search]);

  return (
    <div className="min-h-screen bg-ink text-bone">
      <Header onSearch={setSearch} />
      <main className="mx-auto max-w-[1400px] px-5 md:px-8 pt-12 md:pt-16 pb-20">
        <h1 className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.9]">ALL BUILDS</h1>
        <p className="font-signal text-[12px] tracking-[0.2em] text-smoke mt-4">
          FULL STORE — {items.length} PRODUCTS
        </p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center mt-8">
          <label className="flex items-center gap-2 bg-bone text-black px-3 h-11 sm:w-72">
            <Search className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search builds..."
              className="bg-transparent outline-none text-[13px] w-full placeholder:text-black/60 font-signal"
            />
          </label>
          <label className="relative inline-flex items-center">
            <span className="sr-only">Filter by category</span>
            <select
              value={tab}
              onChange={(e) => setTab(e.target.value as typeof tab)}
              className="appearance-none w-full sm:w-auto bg-coal text-bone font-signal text-[12px] tracking-[0.14em] pl-5 pr-12 py-3 border border-white/15 hover:border-bone/60 focus:border-lime outline-none cursor-pointer transition h-11"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-coal">
                  {c.toUpperCase()}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-smoke pointer-events-none absolute right-4" />
          </label>
        </div>

        {/* Grid */}
        {items.length === 0 ? (
          <p className="text-center text-smoke font-signal text-sm py-24">
            No builds match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[3px] mt-8">
            {items.map((p, i) => (
              <ProductTile
                key={p.id}
                product={p}
                onSelect={setSelected}
                priority={i < 3}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
