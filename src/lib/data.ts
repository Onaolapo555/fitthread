import type { Product } from "./types";

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const HERO_IMAGE = img("photo-1591047139829-d91aecb6caea", 1000);

export const PRODUCTS: Product[] = [
  {
    id: "mod-jacket-001",
    name: "Mod Jacket",
    code: "001",
    price: 140,
    category: "Outerwear",
    image: img("photo-1591047139829-d91aecb6caea"),
    colors: ["#6b6b6b", "#1a1a1a", "#b03a2e", "#5d6d2a", "#7a8450"],
  },
  {
    id: "wide-trousers-003",
    name: "Wide Trousers",
    code: "003",
    price: 140,
    category: "Trousers",
    image: img("photo-1624378439575-d8705ad7ae80"),
    colors: ["#6b6b6b", "#1a1a1a"],
  },
  {
    id: "multi-pocket-vest-001",
    name: "Multi-pocket vest",
    code: "001",
    price: 140,
    category: "Outerwear",
    image: img("photo-1521341957697-b93449760f30"),
    colors: ["#1a1a1a"],
  },
  {
    id: "wide-trousers-002",
    name: "Wide Trousers",
    code: "002",
    price: 140,
    category: "Trousers",
    image: img("photo-1509631179647-0177331693ae"),
    colors: ["#6b6b6b", "#1a1a1a"],
  },
  {
    id: "cargo-trousers-001",
    name: "Cargo Trousers",
    code: "001",
    price: 140,
    category: "Trousers",
    image: img("photo-1517438476312-10d79c077509"),
    colors: ["#1a1a1a", "#6b6b6b"],
  },
  {
    id: "alt-hoodie-002",
    name: "Alt Hoodie",
    code: "002",
    price: 140,
    category: "Hoodies",
    image: img("photo-1556821840-3a63f95609a7"),
    colors: ["#1a1a1a", "#b03a2e", "#edeae3"],
  },
];

export const MANIFESTO_IMAGES = [
  img("photo-1529139574466-a303027c1d8b", 900),
  img("photo-1520975954732-35dd22299614", 900),
  img("photo-1483985988355-763728e1935b", 900),
];

export const WORKSHOP_IMAGES = [
  img("photo-1558769132-cb1aea458c5e", 700),
  img("photo-1584992236310-6edddc08acff", 700),
  img("photo-1620799140408-edc6dcb6d633", 900),
  img("photo-1441986300917-64674bd600d8", 900),
  img("photo-1556905055-8f358a7a47b2", 700),
];

export const CATEGORIES = ["New Drop", "Hoodies", "Trousers", "Outerwear"] as const;
