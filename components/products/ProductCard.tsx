"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getCategoryLabel } from "@/lib/catalog-localization";
import { formatINR } from "@/lib/format";
import { pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  compact,
}: {
  product: Product;
  compact?: boolean;
}) {
  const { language } = useAppPreferences();
  const [variantId, setVariantId] = useState<string>(() => product.variants[0]?.id ?? "");

  const variant = useMemo(() => {
    return product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  }, [product.variants, variantId]);

  const benefits = useMemo(() => product.benefits.slice(0, compact ? 2 : 3), [product, compact]);

  const priceLabel =
    variant?.price != null
      ? formatINR(variant.price, language)
      : product.priceFrom > 0
        ? formatINR(product.priceFrom, language)
        : pick(language, {
            en: "Ask for price",
            hi: "कीमत पूछें",
            gu: "કિંમત પૂછો",
          });

  return (
    <Card className="group h-full overflow-hidden">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-primary/12 via-transparent to-secondary/10 p-4">
        <div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_34%)]" />
        <div className="relative flex items-start justify-between gap-3">
          <Badge variant="soft" className="shrink-0 bg-background/80">
            {getCategoryLabel(language, product.category)}
          </Badge>
          {product.featured ? (
            <Badge variant="brand" className="gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              {pick(language, {
                en: "Featured",
                hi: "फीचर्ड",
                gu: "ફીચર્ડ",
              })}
            </Badge>
          ) : null}
        </div>

        <div className="relative mx-2 mt-4 aspect-[11/10] overflow-hidden rounded-[22px] bg-white/94 p-2 shadow-sm ring-1 ring-border/40 dark:bg-white">
          <Image
            src={variant?.image ?? "/images/handwash-500ml.jpeg"}
            alt={product.title}
            fill
            className="object-contain p-2 transition duration-300 group-hover:scale-[1.14] scale-[1.18]"
            sizes="(max-width: 768px) 92vw, 520px"
          />
        </div>
      </div>

      <div className="flex h-full flex-col p-6">
        <h3 className="text-xl font-semibold tracking-tight">{product.title}</h3>
        {product.tagline ? (
          <p className="mt-1 text-sm font-semibold text-primary/90">{product.tagline}</p>
        ) : null}

        <p className="mt-3 text-sm leading-relaxed text-foreground/72">
          {product.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.variants.map((v) => {
            const active = v.id === variant?.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                  active
                    ? "border-primary bg-primary/12 text-primary"
                    : "border-border bg-background/70 text-foreground/70 hover:bg-muted",
                )}
                aria-pressed={active}
              >
                {v.size}
              </button>
            );
          })}
        </div>

        <ul className="mt-5 grid gap-2 text-sm text-foreground/70">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-[24px] border border-border bg-background/72 p-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/52">
                {pick(language, {
                  en: "Visible Price",
                  hi: "स्पष्ट कीमत",
                  gu: "સ્પષ્ટ કિંમત",
                })}
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">{priceLabel}</p>
              <p className="mt-1 text-xs text-foreground/60">
                {variant?.size
                  ? `${pick(language, {
                      en: "Selected size",
                      hi: "चयनित साइज़",
                      gu: "પસંદ કરેલ સાઇઝ",
                    })}: ${variant.size}`
                  : pick(language, {
                      en: "Starting price",
                      hi: "शुरुआती कीमत",
                      gu: "શરૂઆતની કિંમત",
                    })}
              </p>
            </div>

            <Link
              href={`/products/${product.id}?variant=${encodeURIComponent(variant?.id ?? product.variants[0]?.id ?? "")}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-slate-950 shadow-[0_16px_34px_rgba(13,148,136,0.24)] transition hover:bg-primary-2"
              aria-label={`View details for ${product.title}`}
            >
              {pick(language, {
                en: "View",
                hi: "देखें",
                gu: "જુઓ",
              })}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
