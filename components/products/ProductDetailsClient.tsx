"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product, ProductVariant } from "@/data/products";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { siteConfig } from "@/data/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getCategoryLabel } from "@/lib/catalog-localization";
import { formatINR } from "@/lib/format";
import { pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { createWhatsAppLink } from "@/lib/whatsapp";

export function ProductDetailsClient({
  product,
  productUrl,
  initialVariantId,
}: {
  product: Product;
  productUrl: string;
  initialVariantId?: string;
}) {
  const { language } = useAppPreferences();
  const [variantId, setVariantId] = useState<string>(() => {
    if (initialVariantId && product.variants.some((variant) => variant.id === initialVariantId)) {
      return initialVariantId;
    }
    return product.variants[0]?.id ?? "";
  });

  const variant: ProductVariant | undefined = useMemo(() => {
    return product.variants.find((entry) => entry.id === variantId) ?? product.variants[0];
  }, [product.variants, variantId]);

  const sizes = useMemo(
    () => Array.from(new Set(product.variants.map((entry) => entry.size))),
    [product.variants],
  );

  const selectedPriceLabel =
    variant?.price != null
      ? formatINR(variant.price, language)
      : product.priceFrom > 0
        ? `${pick(language, {
            en: "From",
            hi: "से शुरू",
            gu: "થી શરૂ",
          })} ${formatINR(product.priceFrom, language)}`
        : pick(language, {
            en: "Contact for price",
            hi: "कीमत के लिए संपर्क करें",
            gu: "કિંમત માટે સંપર્ક કરો",
          });

  const pricePillLabel = variant?.size ? `${variant.size} • ${selectedPriceLabel}` : selectedPriceLabel;

  const whatsAppHref = useMemo(() => {
    const whatsAppText = [
      `Hi ${siteConfig.name}, I want to buy/enquire about this product:`,
      "",
      `Product: ${product.title}`,
      `Category: ${product.category}`,
      variant ? `Size: ${variant.size}` : undefined,
      `Price: ${selectedPriceLabel}`,
      `Benefits: ${product.benefits.join(", ")}`,
      `Link: ${productUrl}`,
    ]
      .filter(Boolean)
      .join("\n");

    return createWhatsAppLink({
      phone: siteConfig.contact.phone,
      text: whatsAppText,
    });
  }, [product, productUrl, selectedPriceLabel, variant]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <Card className="overflow-hidden bg-white dark:bg-white">
          <div className="relative aspect-[4/5] w-full bg-white">
            <div className="absolute inset-0 p-3 sm:p-4">
              <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-white p-2 shadow-sm ring-1 ring-border/40 sm:p-3">
                <div className="relative h-full w-full">
                  <Image
                    src={variant?.image ?? product.variants[0]?.image ?? "/images/handwash-500ml.jpeg"}
                    alt={product.title}
                    fill
                    className="rounded-[24px] object-contain scale-[1.18]"
                    sizes="(max-width: 1024px) 92vw, 680px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="soft">{getCategoryLabel(language, product.category)}</Badge>
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-foreground ring-1 ring-accent/25">
            {pricePillLabel}
          </span>
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

        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {product.title}
        </h1>
        {product.tagline ? (
          <p className="mt-2 text-base font-semibold text-primary/90">{product.tagline}</p>
        ) : null}

        <p className="mt-4 text-base leading-relaxed text-foreground/72">
          {product.description}
        </p>

        {sizes.length > 1 ? (
          <Card className="mt-6 p-6">
            <p className="text-sm font-semibold">
              {pick(language, {
                en: "Choose size",
                hi: "साइज़ चुनें",
                gu: "સાઇઝ પસંદ કરો",
              })}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.variants.map((entry) => {
                const active = entry.id === variant?.id;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setVariantId(entry.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs font-semibold transition",
                      active
                        ? "border-primary bg-primary/12 text-primary"
                        : "border-border bg-background/70 text-foreground/70 hover:bg-muted",
                    )}
                    aria-pressed={active}
                  >
                    {entry.size}
                  </button>
                );
              })}
            </div>
          </Card>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            href={whatsAppHref}
            target="_blank"
            rel="noreferrer"
            size="lg"
            variant="secondary"
            aria-label={pick(language, {
              en: "Buy on WhatsApp",
              hi: "व्हाट्सऐप पर खरीद पूछें",
              gu: "વોટ્સએપ પર ખરીદી પૂછો",
            })}
            title={pick(language, {
              en: "Buy on WhatsApp",
              hi: "व्हाट्सऐप पर खरीद पूछें",
              gu: "વોટ્સએપ પર ખરીદી પૂછો",
            })}
          >
            <WhatsAppIcon className="h-5 w-5" />
            {pick(language, {
              en: "Buy on WhatsApp",
              hi: "व्हाट्सऐप पर खरीदें",
              gu: "વોટ્સએપ પર ખરીદો",
            })}
          </Button>
          <Button
            href={`/products?category=${encodeURIComponent(product.category)}`}
            variant="outline"
            size="lg"
          >
            {pick(language, {
              en: "Back to Products",
              hi: "प्रोडक्ट्स पर वापस",
              gu: "પ્રોડક્ટ્સ પર પાછા",
            })}
          </Button>
          <Link href={productUrl} className="sr-only">
            {productUrl}
          </Link>
        </div>

        <Card className="mt-6 p-6">
          <p className="text-sm font-semibold">
            {pick(language, {
              en: "Key benefits",
              hi: "मुख्य फायदे",
              gu: "મુખ્ય ફાયદા",
            })}
          </p>
          <ul className="mt-3 grid gap-2 text-sm text-foreground/70">
            {product.benefits.map((benefit) => (
              <li key={benefit} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
