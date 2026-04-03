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
import { PriceStack } from "@/components/products/PriceStack";
import { WholesalePricingSection } from "@/components/products/WholesalePricingSection";
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

  const retailPrice = variant?.price ?? (product.priceFrom > 0 ? product.priceFrom : undefined);
  const wholesalePrice = variant?.wholesalePrice;

  const selectedPriceLabel =
    variant?.price != null
      ? formatINR(variant.price, language)
      : product.priceFrom > 0
        ? `${pick(language, {
            en: "From",
            hi: "à¤¸à¥‡ à¤¶à¥à¤°à¥‚",
            gu: "àª¥à«€ àª¶àª°à«‚",
          })} ${formatINR(product.priceFrom, language)}`
        : pick(language, {
            en: "Contact for price",
            hi: "à¤•à¥€à¤®à¤¤ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¤°à¥‡à¤‚",
            gu: "àª•àª¿àª‚àª®àª¤ àª®àª¾àªŸà«‡ àª¸àª‚àªªàª°à«àª• àª•àª°à«‹",
          });

  const pricePillLabel = variant?.size ? `${variant.size} - ${selectedPriceLabel}` : selectedPriceLabel;

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
                    className="rounded-[24px] object-contain object-center p-4"
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
                hi: "à¤«à¥€à¤šà¤°à¥à¤¡",
                gu: "àª«à«€àªšàª°à«àª¡",
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

        <Card className="mt-6 p-6">
          <PriceStack retailPrice={retailPrice} wholesalePrice={wholesalePrice} language={language} />
          <p className="mt-2 text-xs text-foreground/60">
            {variant?.size
              ? `${pick(language, {
                  en: "Selected size",
                  hi: "à¤šà¤¯à¤¨à¤¿à¤¤ à¤¸à¤¾à¤‡à¤œà¤¼",
                  gu: "àªªàª¸àª‚àª¦ àª•àª°à«‡àª² àª¸àª¾àª‡àª",
                })}: ${variant.size}`
              : null}
          </p>
        </Card>

        {sizes.length > 1 ? (
          <Card className="mt-6 p-6">
            <p className="text-sm font-semibold">
              {pick(language, {
                en: "Choose size",
                hi: "à¤¸à¤¾à¤‡à¤œà¤¼ à¤šà¥à¤¨à¥‡à¤‚",
                gu: "àª¸àª¾àª‡àª àªªàª¸àª‚àª¦ àª•àª°à«‹",
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
              hi: "à¤µà¥à¤¹à¤¾à¤Ÿà¥à¤¸à¤à¤ª à¤ªà¤° à¤–à¤°à¥€à¤¦ à¤ªà¥‚à¤›à¥‡à¤‚",
              gu: "àªµà«‹àªŸà«àª¸àªàªª àªªàª° àª–àª°à«€àª¦à«€ àªªà«‚àª›à«‹",
            })}
            title={pick(language, {
              en: "Buy on WhatsApp",
              hi: "à¤µà¥à¤¹à¤¾à¤Ÿà¥à¤¸à¤à¤ª à¤ªà¤° à¤–à¤°à¥€à¤¦ à¤ªà¥‚à¤›à¥‡à¤‚",
              gu: "àªµà«‹àªŸà«àª¸àªàªª àªªàª° àª–àª°à«€àª¦à«€ àªªà«‚àª›à«‹",
            })}
          >
            <WhatsAppIcon className="h-5 w-5" />
            {pick(language, {
              en: "Buy on WhatsApp",
              hi: "à¤µà¥à¤¹à¤¾à¤Ÿà¥à¤¸à¤à¤ª à¤ªà¤° à¤–à¤°à¥€à¤¦à¥‡à¤‚",
              gu: "àªµà«‹àªŸà«àª¸àªàªª àªªàª° àª–àª°à«€àª¦à«‹",
            })}
          </Button>
          <Button
            href={`/products?category=${encodeURIComponent(product.category)}`}
            variant="outline"
            size="lg"
          >
            {pick(language, {
              en: "Back to Products",
              hi: "à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿà¥à¤¸ à¤ªà¤° à¤µà¤¾à¤ªà¤¸",
              gu: "àªªà«àª°à«‹àª¡àª•à«àªŸà«àª¸ àªªàª° àªªàª¾àª›àª¾",
            })}
          </Button>
          <Link href={productUrl} className="sr-only">
            {productUrl}
          </Link>
        </div>

        <WholesalePricingSection product={product} variant={variant} productUrl={productUrl} />

        <Card className="mt-6 p-6">
          <p className="text-sm font-semibold">
            {pick(language, {
              en: "Key benefits",
              hi: "à¤®à¥à¤–à¥à¤¯ à¤«à¤¾à¤¯à¤¦à¥‡",
              gu: "àª®à«àª–à«àª¯ àª«àª¾àª¯àª¦àª¾",
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




