"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { productCategoryOrder } from "@/data/content";
import { products, type ProductCategory } from "@/data/products";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { ProductCard } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/Input";
import { getCategoryLabel } from "@/lib/catalog-localization";
import { pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const allLabel = "All" as const;
type Tab = typeof allLabel | ProductCategory;

export function ProductsExplorer({ initialCategory }: { initialCategory?: string }) {
  const { language } = useAppPreferences();
  const initial: ProductCategory | undefined = productCategoryOrder.includes(
    initialCategory as ProductCategory,
  )
    ? (initialCategory as ProductCategory)
    : undefined;

  const [category, setCategory] = useState<Tab>(initial ?? allLabel);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const categoryOk = category === allLabel ? true : product.category === category;
      const querySource = `${product.title} ${product.description} ${product.benefits.join(" ")}`;
      const queryOk = !q ? true : querySource.toLowerCase().includes(q);
      return categoryOk && queryOk;
    });
  }, [category, query]);

  const tabs: Tab[] = [allLabel, ...productCategoryOrder];
  const remainder = filtered.length % 3;

  return (
    <div className="grid gap-8">
      <div className="surface-panel rounded-[32px] p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/80">
              {pick(language, {
                en: "Product Catalog",
                hi: "प्रोडक्ट कैटलॉग",
                gu: "પ્રોડક્ટ કેટલોગ",
              })}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {pick(language, {
                en: "Transparent pricing and a cleaner layout",
                hi: "पारदर्शी कीमत और ज्यादा साफ लेआउट",
                gu: "સ્પષ્ટ કિંમત અને વધુ સ્વચ્છ લેઆઉટ",
              })}
            </h1>
            <p className="mt-3 text-base text-foreground/72">
              {pick(language, {
                en: "Filter by category, search fast, and open any product for direct buying enquiry.",
                hi: "कैटेगरी के हिसाब से फ़िल्टर करें, जल्दी सर्च करें और किसी भी प्रोडक्ट से सीधे खरीदारी पूछताछ करें।",
                gu: "કેટેગરી પ્રમાણે ફિલ્ટર કરો, ઝડપથી સર્ચ કરો અને કોઈપણ પ્રોડક્ટ માટે સીધી ખરીદી પૂછપરછ કરો.",
              })}
            </p>
          </div>

          <div className="w-full lg:w-[420px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={pick(language, {
                  en: "Search products...",
                  hi: "प्रोडक्ट खोजें...",
                  gu: "પ્રોડક્ટ શોધો...",
                })}
                className="pl-9"
                aria-label="Search products"
              />
            </div>
            <p className="mt-2 text-xs text-foreground/60">
              {pick(language, {
                en: "Showing",
                hi: "दिख रहे हैं",
                gu: "દર્શાઈ રહ્યા છે",
              })}{" "}
              <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
              {pick(language, {
                en: "products",
                hi: "प्रोडक्ट्स",
                gu: "પ્રોડક્ટ્સ",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => {
          const active = tab === category;
          const tabLabel =
            tab === allLabel
              ? pick(language, { en: "All", hi: "सभी", gu: "બધા" })
              : getCategoryLabel(language, tab);

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setCategory(tab)}
              className={cn(
                "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition",
                active
                  ? "border-primary bg-primary text-slate-950 shadow-[0_16px_34px_rgba(13,148,136,0.22)]"
                  : "border-border bg-card text-foreground/72 hover:bg-muted",
              )}
              aria-pressed={active}
            >
              {tabLabel}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((product, index) => (
            <motion.div
              key={product.id}
              className={
                remainder === 1 && index === filtered.length - 1
                  ? "xl:col-span-6"
                  : remainder === 2 && index >= filtered.length - 2
                    ? "xl:col-span-3"
                    : "xl:col-span-2"
              }
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}



