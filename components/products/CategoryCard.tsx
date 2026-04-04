"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { products, type ProductCategory } from "@/data/products";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { PriceStack } from "@/components/products/PriceStack";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getCategoryDescription, getCategoryLabel } from "@/lib/catalog-localization";
import { pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function CategoryCard({
  description,
  image,
  sizes,
  category,
}: {
  title: string;
  description: string;
  image: string;
  sizes: string[];
  category: string;
}) {
  const { language } = useAppPreferences();
  const categoryKey = category as ProductCategory;

  const categoryProducts = useMemo(
    () => products.filter((product) => product.category === categoryKey),
    [categoryKey],
  );
  const selectedProduct = categoryProducts[0];
  const [variantId, setVariantId] = useState<string>(() => selectedProduct?.variants[0]?.id ?? "");
  const selectedVariant = useMemo(
    () => selectedProduct?.variants.find((variant) => variant.id === variantId) ?? selectedProduct?.variants[0],
    [selectedProduct, variantId],
  );

  const imageSource = selectedVariant?.image ?? selectedProduct?.variants[0]?.image ?? image;
  const retailPrice =
    selectedVariant?.price ?? (selectedProduct?.priceFrom ? selectedProduct.priceFrom : undefined);
  const wholesalePrice = selectedVariant?.wholesalePrice;
  const descriptionBlockClass = "min-h-[4.5rem]";
  const sizeRowClass = "min-h-[3.25rem]";
  const pricePanelClass = "min-h-[10rem]";

  const detailHref = selectedProduct
    ? `/products/${selectedProduct.id}?variant=${encodeURIComponent(selectedVariant?.id ?? selectedProduct.variants[0]?.id ?? "")}`
    : `/products?category=${encodeURIComponent(category)}`;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="group flex h-full flex-col overflow-hidden shadow-[var(--shadow-card)]">
        <div className="surface-category relative overflow-hidden rounded-[28px] border-b border-border/60 p-5">
          <div className="absolute inset-0 opacity-55 [background:radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_34%)]" />
          <div className="relative flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                {pick(language, {
                  en: "Category",
                  hi: "कैटेगरी",
                  gu: "કેટેગરી",
                })}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                {getCategoryLabel(language, categoryKey)}
              </h3>
            </div>
            <div className="rounded-full border border-border/70 bg-card px-3 py-1 text-xs font-semibold text-foreground/75 shadow-sm backdrop-blur">
              {sizes.length} {pick(language, { en: "sizes", hi: "साइज़", gu: "સાઇઝ" })}
            </div>
          </div>

          <Link
            href={detailHref}
            className="surface-media-frame relative mx-2 mt-5 block aspect-[11/10] w-auto overflow-hidden rounded-[22px] p-2 shadow-sm ring-1 ring-border/40 transition hover:shadow-md"
          >
            <Image
              src={imageSource}
              alt={getCategoryLabel(language, categoryKey)}
              fill
              className="object-contain object-center p-4 transition duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 92vw, 520px"
              priority={false}
            />
          </Link>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className={cn("text-sm leading-relaxed text-foreground/72", descriptionBlockClass)}>
            {getCategoryDescription(language, categoryKey, description)}
          </p>

          <div className="mt-auto pt-5">
            <div className={cn("surface-inset rounded-[20px] border border-border p-4", pricePanelClass)}>
              <PriceStack
                retailPrice={retailPrice}
                wholesalePrice={wholesalePrice}
                language={language}
                reserveSecondaryRow
              />
              <p className="mt-2 text-xs text-foreground/60">
                {selectedVariant?.size
                  ? `${pick(language, {
                    en: "Selected size",
                    hi: "चयनित साइज़",
                    gu: "પસંદ કરેલ સાઇઝ",
                  })}: ${selectedVariant.size}`
                  : pick(language, {
                    en: "Tap a size below",
                    hi: "नीचे साइज़ टैप करें",
                    gu: "નીચે સાઇઝ ટેપ કરો",
                  })}
              </p>
            </div>

            <div className={cn("mt-5 flex flex-wrap content-start gap-2", sizeRowClass)}>
              {selectedProduct
                ? selectedProduct.variants.map((variant) => {
                  const active = variant.id === selectedVariant?.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setVariantId(variant.id)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                        active
                          ? "border-primary bg-primary/12 text-primary"
                          : "border-border bg-background/70 text-foreground/72 hover:bg-muted",
                      )}
                      aria-pressed={active}
                    >
                      {variant.size}
                    </button>
                  );
                })
                : sizes.map((size) => (
                  <span
                    key={size}
                    className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-semibold text-foreground/72"
                  >
                    {size}
                  </span>
                ))}
            </div>

            <div className="mt-6">
              <Button href={detailHref} variant="outline" size="sm">
                {pick(language, {
                  en: "View Details",
                  hi: "विवरण देखें",
                  gu: "વિગત જુઓ",
                })}{" "}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}




