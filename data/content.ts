import type { ProductCategory } from "./products";

export const whyChoose = [
  {
    title: "Trusted Brand",
    description:
      "A brand customers can rely on for everyday hygiene and consistent performance.",
  },
  {
    title: "High-Quality Products",
    description:
      "Manufactured with a quality-first approach and consumer-friendly formulations.",
  },
  {
    title: "Growing Market Demand",
    description:
      "Home hygiene is a repeat-purchase category with strong demand across segments.",
  },
  {
    title: "Comprehensive Support",
    description:
      "Partner guidance for product positioning, marketing support, and supply coordination.",
  },
  {
    title: "Attractive Margins",
    description:
      "Distributor programs designed for healthy profitability and long-term growth.",
  },
  {
    title: "Efficient Supply Chain",
    description:
      "Reliable supply planning to support fast-moving SKUs and consistent availability.",
  },
] as const;

export const testimonials = [
  {
    name: "Retail Partner",
    role: "Local Store Owner",
    quote:
      "Clean packaging, strong performance, and customers love the fragrance options. Great repeat purchases.",
  },
  {
    name: "Distributor",
    role: "Rajkot, Gujarat",
    quote:
      "Smooth support and reliable supply. The range is easy to explain and sells well across categories.",
  },
  {
    name: "Home User",
    role: "Family Household",
    quote:
      "The hand wash feels premium and the cleaners leave a fresh finish. Perfect for daily use at home.",
  },
] as const;

export const trustStats = [
  { label: "Multiple Product Categories", value: 6, suffix: "+" },
  { label: "Trusted Quality", value: 99, suffix: "%" },
  { label: "Hygienic Home Care", value: 24, suffix: "/7" },
  { label: "Fast Supply Support", value: 7, suffix: "d" },
] as const;

export const aboutValues = [
  {
    title: "Safety First",
    description:
      "We prioritize family-safe formulations and trustworthy hygiene for daily use.",
  },
  {
    title: "Performance",
    description:
      "Powerful cleaning that feels premium — from grease cutting to streak-free shine.",
  },
  {
    title: "Consistency",
    description:
      "Reliable quality and supply so homes and partners can count on us every time.",
  },
  {
    title: "Care",
    description:
      "A brand built around comfort, cleanliness, and the joy of a happy home.",
  },
] as const;

export const productCategoryOrder: ProductCategory[] = [
  "Hand Wash",
  "Dish Wash Liquid",
  "Liquid Detergent",
  "Toilet Cleaner",
  "Glass Cleaner",
  "Surface Cleaner",
  "Shampoo",
  "Hair Oil",
];
