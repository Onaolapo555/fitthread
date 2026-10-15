export type Product = {
  id: string;
  name: string;
  code: string;
  price: number;
  category: "Hoodies" | "Trousers" | "Outerwear" | "New Drop";
  image: string;
  colors: string[];
};

export type CartItem = Product & { quantity: number; size?: string };
