import { createClient } from "@supabase/supabase-js";
import { PRODUCTS } from "./data";
import type { Product } from "./types";

/**
 * Server-side product fetch (SSR).
 * Falls back to local mock catalogue when Supabase env vars
 * are missing or the query fails, so previews never break.
 */
export async function getProducts(): Promise<Product[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    console.warn("[products] Supabase env vars missing — using mock catalogue.");
    return PRODUCTS;
  }

  try {
    const sb = createClient(url, anon);
    const { data, error } = await sb.from("products").select("*").order("id");
    if (error) {
      console.warn(`[products] Supabase query failed (${error.message}) — using mock catalogue.`);
      return PRODUCTS;
    }
    if (!data?.length) {
      console.warn("[products] Supabase returned 0 rows — using mock catalogue.");
      return PRODUCTS;
    }

    return data.map((row, i) => ({
      id: String(row.id ?? `supabase-${i}`),
      name: row.name ?? "Untitled",
      code: row.code ?? "001",
      price: Number(row.price ?? 140),
      category: (row.category ?? "New Drop") as Product["category"],
      image: row.image ?? PRODUCTS[i % PRODUCTS.length].image,
      colors: Array.isArray(row.colors) && row.colors.length > 0 ? row.colors : ["#1a1a1a"],
    }));
  } catch {
    return PRODUCTS;
  }
}
