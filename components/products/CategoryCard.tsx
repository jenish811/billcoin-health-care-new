"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { products, type ProductCategory } from "@/data/products";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getCategoryDescription, getCategoryLabel } from "@/lib/catalog-localization";
import { formatINR } from "@/lib/format";
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
  const priceLabel =
    selectedVariant?.price != null
      ? formatINR(selectedVariant.price, language)
      : selectedProduct?.priceFrom
        ? formatINR(selectedProduct.priceFrom, language)
        : pick(language, {
          en: "Ask for price",
          hi: "à¤•à¥€à¤®à¤¤ à¤ªà¥‚à¤›à¥‡à¤‚",
          gu: "àª•àª¿àª‚àª®àª¤ àªªà«‚àª›à«‹",
        });

  const detailHref = selectedProduct
    ? `/products/${selectedProduct.id}?variant=${encodeURIComponent(selectedVariant?.id ?? selectedProduct.variants[0]?.id ?? "")}`
    : `/products?category=${encodeURIComponent(category)}`;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="group h-full overflow-hidden">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 p-5">
          <div className="absolute inset-0 opacity-50 [background:radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_32%)]" />
          <div className="relative flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                {pick(language, {
                  en: "Category",
                  hi: "à¤•à¥ˆà¤Ÿà¥‡à¤—à¤°à¥€",
                  gu: "àª•à«‡àªŸà«‡àª—àª°à«€",
                })}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                {getCategoryLabel(language, categoryKey)}
              </h3>
            </div>
            <div className="rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground/70">
              {sizes.length} {pick(language, { en: "sizes", hi: "à¤¸à¤¾à¤‡à¤œà¤¼", gu: "àª¸àª¾àª‡àª" })}
            </div>
          </div>

          <Link
            href={detailHref}
            className="relative mx-2 mt-5 block aspect-[11/10] w-auto overflow-hidden rounded-[22px] bg-white/94 p-2 shadow-sm ring-1 ring-border/40 transition hover:shadow-md dark:bg-white"
          >
            <Image
              src={imageSource}
              alt={getCategoryLabel(language, categoryKey)}
              fill
              className="object-contain p-2 transition duration-300 group-hover:scale-[1.14] scale-[1.18]"
              sizes="(max-width: 768px) 92vw, 520px"
              priority={false}
            />
          </Link>
        </div>

        <div className="p-6">
          <p className="text-sm leading-relaxed text-foreground/72">
            {getCategoryDescription(language, categoryKey, description)}
          </p>

          <div className="mt-5 rounded-[20px] border border-border bg-background/72 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/52">
              {pick(language, {
                en: "Home Price",
                hi: "à¤¹à¥‹à¤® à¤ªà¥à¤°à¤¾à¤‡à¤¸",
                gu: "àª¹à«‹àª® àªªà«àª°àª¾àª‡àª¸",
              })}
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{priceLabel}</p>
            <p className="mt-1 text-xs text-foreground/60">
              {selectedVariant?.size
                ? `${pick(language, {
                  en: "Selected size",
                  hi: "à¤šà¤¯à¤¨à¤¿à¤¤ à¤¸à¤¾à¤‡à¤œà¤¼",
                  gu: "àªªàª¸àª‚àª¦ àª•àª°à«‡àª² àª¸àª¾àª‡àª",
                })}: ${selectedVariant.size}`
                : pick(language, {
                  en: "Tap a size below",
                  hi: "à¤¨à¥€à¤šà¥‡ à¤¸à¤¾à¤‡à¤œà¤¼ à¤Ÿà¥ˆà¤ª à¤•à¤°à¥‡à¤‚",
                  gu: "àª¨à«€àªšà«‡ àª¸àª¾àª‡àª àªŸà«‡àªª àª•àª°à«‹",
                })}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
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
                hi: "à¤µà¤¿à¤µà¤°à¤£ à¤¦à¥‡à¤–à¥‡à¤‚",
                gu: "àªµàª¿àª—àª¤ àªœà«àª“",
              })}{" "}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
