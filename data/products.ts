export type ProductCategory =
  | "Hand Wash"
  | "Dish Wash Liquid"
  | "Liquid Detergent"
  | "Toilet Cleaner"
  | "Glass Cleaner"
  | "Surface Cleaner"
  | "Shampoo"
  | "Hair Oil";

export type ProductVariant = {
  /**
   * Stable id for the variant. Use the same value as `size` unless you need
   * separate ids (e.g. 500ml-front vs 500ml-back).
   */
  id: string;
  size: string;
  image: string; // Place images in `/public/images/` and update these paths.
  /**
   * Optional per-variant price (INR). If omitted, UI falls back to Product.priceFrom.
   */
  price?: number;
};

export type Product = {
  id: string;
  category: ProductCategory;
  title: string;
  tagline?: string;
  description: string;
  benefits: string[];
  /**
   * Display price (INR) on product cards.
   * Replace these numbers from your brochure/price list.
   */
  priceFrom: number;
  variants: ProductVariant[];
  featured?: boolean;
};

export const productCategories: Array<{
  category: ProductCategory;
  title: string;
  description: string;
  image: string;
  sizes: string[];
}> = [
  {
    category: "Hand Wash",
    title: "Hand Wash",
    description: "Gentle on skin. Tough on germs. Everyday freshness.",
    image: "/images/handwash-500ml.jpeg",
    sizes: ["200ml", "500ml", "5L"],
  },
  {
    category: "Dish Wash Liquid",
    title: "Dish Wash Liquid",
    description: "Cuts grease fast for a sparkling, residue-free shine.",
    image: "/images/dishwash-500ml.jpeg",
    sizes: ["500ml", "750ml", "4.5kg"],
  },
  {
    category: "Liquid Detergent",
    title: "Liquid Detergent",
    description: "Fabric care + stain removal with lasting freshness.",
    image: "/images/detergent-1l.jpeg",
    sizes: ["1L", "5L", "5Kg"],
  },
  {
    category: "Toilet Cleaner",
    title: "Toilet Cleaner",
    description: "Eliminates stains, odors, and germs for a sparkling bowl.",
    image: "/images/toilet-cleaner-500ml.jpeg",
    sizes: ["250ml", "500ml", "1L", "5L"],
  },
  {
    category: "Glass Cleaner",
    title: "Glass Cleaner",
    description: "Streak-free clarity for mirrors, windows, and glass surfaces.",
    image: "/images/glass-cleaner-500ml.jpeg",
    sizes: ["500ml"],
  },
  {
    category: "Surface Cleaner",
    title: "Surface Cleaner",
    description: "Fresh fragrances with a clean you can feel — daily comfort.",
    image: "/images/surface-cleaner-lemon-500ml.jpeg",
    sizes: ["500ml", "1L"],
  },
  {
    category: "Shampoo",
    title: "Shampoo",
    description: "Gentle care with nourishing cleansing for everyday use.",
    image: "/images/shampoo-rosemary-200ml.jpeg",
    sizes: ["200ml"],
  },
  {
    category: "Hair Oil",
    title: "Hair Oil",
    description: "Herbal oil blend for healthier-looking hair and scalp comfort.",
    image: "/images/hair-oil-herbal-100ml.jpeg",
    sizes: ["100ml"],
  },
];

export const products: Product[] = [
  {
    id: "skin-detox-hand-wash",
    category: "Hand Wash",
    title: "Skin Detox Hand Wash",
    tagline: "Wash & Protect",
    description:
      "Gentle yet effective hand wash that removes dirt and germs while helping keep skin soft and nourished.",
    benefits: [
      "Kills 99.99% germs",
      "Deep moisturizing",
      "Naturally derived",
      "100% soap free",
    ],
    priceFrom: 99,
    variants: [
      { id: "200ml", size: "200ml", image: "/images/handwash-200ml.jpeg", price: 99 },
      { id: "500ml", size: "500ml", image: "/images/handwash-500ml.jpeg", price: 179 },
      { id: "5l", size: "5L", image: "/images/handwash-5l.jpeg", price: 699 },
    ],
    featured: true,
  },
  {
    id: "lemons-dish-wash-liquid",
    category: "Dish Wash Liquid",
    title: "Lemons Dish Wash Liquid",
    description:
      "A powerful dish wash formula that cuts grease and grime, leaving dishes sparkling clean and residue-free.",
    benefits: ["Powerful grease cutting", "Sparkling clean dishes", "Residue free"],
    priceFrom: 109,
    variants: [
      { id: "500ml", size: "500ml", image: "/images/dishwash-500ml.jpeg", price: 109 },
      { id: "750ml", size: "750ml", image: "/images/dishwash-750ml.jpeg", price: 149 },
      { id: "4_5kg", size: "4.5kg", image: "/images/dishwash-4_5l.jpeg", price: 449 },
    ],
    featured: true,
  },
  {
    id: "liquid-detergent",
    category: "Liquid Detergent",
    title: "Liquid Detergent",
    description:
      "Designed for both front load and top load machines for thorough stain removal and fabric care.",
    benefits: [
      "Front load and top load compatible",
      "Stain removal",
      "Fabric care",
      "Long-lasting freshness",
    ],
    priceFrom: 219,
    variants: [
      { id: "1l", size: "1L", image: "/images/detergent-1l.jpeg", price: 219 },
      { id: "5l", size: "5L", image: "/images/detergent-5l.jpeg", price: 799 },
    ],
    featured: true,
  },
  {
    id: "liquid-detergent-matic",
    category: "Liquid Detergent",
    title: "Advance Liquid Detergent — Matic (5Kg)",
    description:
      "A high-performance liquid detergent for bucket wash and washing machines, designed to remove tough stains in one wash.",
    benefits: [
      "Bucket wash + machine wash",
      "Top load and front load compatible",
      "Removes tough stains",
      "Long-lasting freshness",
    ],
    priceFrom: 499,
    variants: [
      {
        id: "5kg",
        size: "5Kg",
        image: "/images/detergent-matic-5l.jpeg",
        price: 499,
      },
    ],
  },
  {
    id: "toilet-cleaner",
    category: "Toilet Cleaner",
    title: "Toilet Cleaner",
    description:
      "Effectively helps eliminate stains, germs, and odors for a sparkling clean, fresh toilet bowl.",
    benefits: [
      "Eliminates stains",
      "Eliminates germs",
      "Eliminates odors",
      "Sparkling clean toilet",
    ],
    priceFrom: 49,
    variants: [
      {
        id: "250ml",
        size: "250ml",
        image: "/images/toilet-cleaner-500ml.jpeg",
        price: 49,
      },
      { id: "500ml", size: "500ml", image: "/images/toilet-cleaner-500ml.jpeg", price: 79 },
      { id: "1l", size: "1L", image: "/images/toilet-cleaner-500ml.jpeg", price: 129 },
      { id: "5l", size: "5L", image: "/images/toilet-cleaner-5l.jpeg", price: 699 },
    ],
    featured: true,
  },
  {
    id: "glass-cleaner",
    category: "Glass Cleaner",
    title: "Glass Cleaner",
    description:
      "A streak-free formula that removes smudges, fingerprints, and dirt for crystal-clear glass.",
    benefits: [
      "Streak-free",
      "Removes smudges",
      "Removes fingerprints",
      "Crystal-clear shine",
    ],
    priceFrom: 119,
    variants: [{ id: "500ml", size: "500ml", image: "/images/glass-cleaner-500ml.jpeg", price: 119 }],
    featured: true,
  },
  {
    id: "surface-cleaner-rose",
    category: "Surface Cleaner",
    title: "Surface Cleaner — Rose",
    description:
      "All-in-1 disinfectant surface cleaner with a premium rose fragrance for daily home hygiene.",
    benefits: [
      "10X cleaning power",
      "Triple germ action",
      "Removes stains",
      "Refreshing fragrance",
    ],
    priceFrom: 95,
    variants: [
      // Front images for Rose were not available in `D:\\images` in this demo setup.
      // Replace these with correct front images when available.
      { id: "500ml", size: "500ml", image: "/images/surface-cleaner-rose.jpeg", price: 95 },
      { id: "1l", size: "1L", image: "/images/surface-cleaner-rose.jpeg", price: 169 },
    ],
  },
  {
    id: "surface-cleaner-lemon",
    category: "Surface Cleaner",
    title: "Surface Cleaner — Lemon",
    description: "Citrus-clean freshness with powerful everyday surface cleaning.",
    benefits: [
      "10X cleaning power",
      "Triple germ action",
      "Removes stains",
      "Refreshing fragrance",
    ],
    priceFrom: 95,
    variants: [
      { id: "500ml", size: "500ml", image: "/images/surface-cleaner-lemon-500ml.jpeg", price: 95 },
      { id: "1l", size: "1L", image: "/images/surface-cleaner-lemon-1l.jpeg", price: 169 },
    ],
  },
  {
    id: "surface-cleaner-lavender",
    category: "Surface Cleaner",
    title: "Surface Cleaner — Lavender",
    description: "A calm lavender profile with a premium clean for daily spaces.",
    benefits: [
      "10X cleaning power",
      "Triple germ action",
      "Removes stains",
      "Refreshing fragrance",
    ],
    priceFrom: 95,
    variants: [
      { id: "500ml", size: "500ml", image: "/images/surface-cleaner-lavender-500ml.jpeg", price: 95 },
      { id: "1l", size: "1L", image: "/images/surface-cleaner-lavender-1l.jpeg", price: 169 },
    ],
  },
  {
    id: "surface-cleaner-jasmine",
    category: "Surface Cleaner",
    title: "Surface Cleaner — Jasmine",
    description: "A soft jasmine fragrance designed for an inviting, hygienic home.",
    benefits: [
      "10X cleaning power",
      "Triple germ action",
      "Removes stains",
      "Refreshing fragrance",
    ],
    priceFrom: 95,
    variants: [
      { id: "500ml", size: "500ml", image: "/images/surface-cleaner-jasmine-500ml.jpeg", price: 95 },
      { id: "1l", size: "1L", image: "/images/surface-cleaner-jasmine-1l.jpeg", price: 169 },
    ],
  },
  {
    id: "rosemary-shampoo",
    category: "Shampoo",
    title: "Rosemary Shampoo",
    description: "Strengthening + repairing care. Suitable for all hair types.",
    benefits: ["Nourishing formula", "Hydrated, soft feel", "Everyday cleansing"],
    priceFrom: 199,
    variants: [
      {
        id: "200ml",
        size: "200ml",
        image: "/images/shampoo-rosemary-200ml.jpeg",
        price: 199,
      },
    ],
  },
  {
    id: "herbal-hair-oil",
    category: "Hair Oil",
    title: "Herbal Hair Oil",
    description: "Herbal hair oil for long hair growth and healthy-looking shine.",
    benefits: ["Herbal blend", "Suitable for all hair types", "Everyday nourishment"],
    priceFrom: 199,
    variants: [
      { id: "100ml", size: "100ml", image: "/images/hair-oil-herbal-100ml.jpeg", price: 199 },
    ],
  },
];
