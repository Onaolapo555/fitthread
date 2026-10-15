"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LatestSkins from "@/components/LatestSkins";
import Manifesto from "@/components/Manifesto";
import Story from "@/components/Story";
import Footer from "@/components/Footer";
import ProductModal from "@/components/ProductModal";

export default function HomeClient({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-ink text-bone">
      <Header onSearch={setSearch} />
      <main>
        <Hero />
        <LatestSkins products={products} search={search} onSelect={setSelected} />
        <Manifesto />
        <Story />
      </main>
      <Footer />
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
