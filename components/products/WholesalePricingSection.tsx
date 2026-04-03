"use client";

import { Store } from "lucide-react";
import type { Product, ProductVariant } from "@/data/products";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/data/site";
import { formatINR } from "@/lib/format";
import { pick } from "@/lib/i18n";
import { createWhatsAppLink } from "@/lib/whatsapp";

export function WholesalePricingSection({
  product,
  variant,
  productUrl,
}: {
  product: Product;
  variant?: ProductVariant;
  productUrl: string;
}) {
  const { language } = useAppPreferences();

  if (variant?.wholesalePrice == null) {
    return null;
  }

  const retailPrice = variant.price ?? product.priceFrom;
  const savings = retailPrice > 0 ? retailPrice - variant.wholesalePrice : null;

  const whatsAppText = [
    `Hi ${siteConfig.name}, I want wholesale/dealer pricing for this product:`,
    "",
    `Product: ${product.title}`,
    `Category: ${product.category}`,
    variant ? `Size: ${variant.size}` : undefined,
    `Wholesale Price: ${formatINR(variant.wholesalePrice ?? 0, "en")}`,
    retailPrice > 0 ? `Retail Price: ${formatINR(retailPrice, "en")}` : undefined,
    `Link: ${productUrl}`,
  ]
    .filter(Boolean)
    .join("\n");

  const wholesaleWhatsAppHref = createWhatsAppLink({
    phone: siteConfig.contact.phone,
    text: whatsAppText,
  });

  return (
    <Card className="mt-6 overflow-hidden">
      <div className="border-b border-border bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 p-6">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 ring-1 ring-primary/15">
            <Store className="h-5 w-5 text-primary" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">
              {pick(language, {
                en: "Wholesale Section",
                hi: "Wholesale Section",
                gu: "Wholesale Section",
              })}
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              {pick(language, {
                en: "Wholesale / Dealer Price",
                hi: "Wholesale / Dealer Price",
                gu: "Wholesale / Dealer Price",
              })}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/72">
              {pick(language, {
                en: "Retail pricing stays visible above. This section is only for wholesale, bulk, and distributor enquiries.",
                hi: "Retail pricing stays visible above. This section is only for wholesale, bulk, and distributor enquiries.",
                gu: "Retail pricing stays visible above. This section is only for wholesale, bulk, and distributor enquiries.",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-6 md:grid-cols-2">
        <div className="rounded-[24px] border border-border bg-background/72 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/52">
            {pick(language, {
              en: "Selected Size",
              hi: "Selected Size",
              gu: "Selected Size",
            })}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">{variant.size}</p>
          <p className="mt-2 text-sm text-foreground/65">
            {pick(language, {
              en: "Wholesale price from the PDF D.PRICE list.",
              hi: "Wholesale price from the PDF D.PRICE list.",
              gu: "Wholesale price from the PDF D.PRICE list.",
            })}
          </p>
        </div>

        <div className="rounded-[24px] border border-primary/20 bg-primary/8 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
            {pick(language, {
              en: "Wholesale Price",
              hi: "Wholesale Price",
              gu: "Wholesale Price",
            })}
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">
            {formatINR(variant.wholesalePrice, language)}
          </p>
          <p className="mt-2 text-sm text-foreground/65">
            {retailPrice > 0
              ? `${pick(language, {
                en: "Retail",
                hi: "Retail",
                gu: "Retail",
              })}: ${formatINR(retailPrice, language)}`
              : null}
          </p>
          {savings != null && savings > 0 ? (
            <p className="mt-1 text-sm font-medium text-primary">
              {pick(language, {
                en: `Margin window: ${formatINR(savings, language)} per unit`,
                hi: `Margin window: ${formatINR(savings, language)} per unit`,
                gu: `Margin window: ${formatINR(savings, language)} per unit`,
              })}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-3 px-6 pb-6 sm:flex-row">
        <Button href={wholesaleWhatsAppHref} target="_blank" rel="noreferrer" size="lg">
          {pick(language, {
            en: "Talk Wholesale on WhatsApp",
            hi: "Talk Wholesale on WhatsApp",
            gu: "Talk Wholesale on WhatsApp",
          })}
        </Button>
        <Button href="/contact?type=distributor" variant="outline" size="lg">
          {pick(language, {
            en: "Open Distributor Form",
            hi: "Open Distributor Form",
            gu: "Open Distributor Form",
          })}
        </Button>
      </div>
    </Card>
  );
}
