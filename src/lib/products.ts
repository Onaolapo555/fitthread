import { PRODUCTS } from "./data";
import type { Product } from "./types";

/**
 * Mock catalogue is the source of truth for now (no backend
 * dependency, no pause risk). To go back to Supabase later,
 * fetch the `products` table here and fall back to PRODUCTS.
 */
export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}
