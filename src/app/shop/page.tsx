import type { Metadata } from "next";
import { getProducts } from "@/lib/products";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop All Builds — FitThread",
  description: "Full FitThread store. Oversized streetwear, no default.",
};

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopClient products={products} />;
}
