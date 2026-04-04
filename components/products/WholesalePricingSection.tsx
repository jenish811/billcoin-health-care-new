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
      <div className="surface-accent border-b border-border p-6">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 ring-1 ring-primary/15">
            <Store className="h-5 w-5 text-primary" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">
              {pick(language, {
                en: "Wholesale Section",
                hi: "होलसेल सेक्शन",
                gu: "હોલસેલ સેક્શન",
              })}
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              {pick(language, {
                en: "Wholesale / Dealer Price",
                hi: "होलसेल / डीलर प्राइस",
                gu: "હોલસેલ / ડીલર પ્રાઇસ",
              })}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/72">
              {pick(language, {
                en: "Retail pricing stays visible above. This section is only for wholesale, bulk, and distributor enquiries.",
                hi: "ऊपर रिटेल कीमत दिखती रहती है। यह सेक्शन सिर्फ होलसेल, बल्क और डिस्ट्रीब्यूटर पूछताछ के लिए है।",
                gu: "ઉપર રિટેલ કિંમત દેખાતી રહે છે. આ વિભાગ ફક્ત હોલસેલ, બલ્ક અને ડિસ્ટ્રિબ્યુટર પૂછપરછ માટે છે.",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-6 md:grid-cols-2">
        <div className="surface-inset rounded-[24px] border border-border p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/52">
            {pick(language, {
              en: "Selected Size",
              hi: "चयनित साइज़",
              gu: "પસંદ કરેલ સાઇઝ",
            })}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">{variant.size}</p>
          <p className="mt-2 text-sm text-foreground/65">
            {pick(language, {
              en: "Wholesale price from the PDF D.PRICE list.",
              hi: "होलसेल कीमत PDF की D.PRICE लिस्ट से ली गई है।",
              gu: "હોલસેલ કિંમત PDF ની D.PRICE યાદીમાંથી લેવામાં આવી છે.",
            })}
          </p>
        </div>

        <div className="rounded-[24px] border border-primary/20 bg-primary/8 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
            {pick(language, {
              en: "Wholesale Price",
              hi: "होलसेल प्राइस",
              gu: "હોલસેલ પ્રાઇસ",
            })}
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">
            {formatINR(variant.wholesalePrice, language)}
          </p>
          <p className="mt-2 text-sm text-foreground/65">
            {retailPrice > 0
              ? `${pick(language, {
                en: "Retail",
                hi: "रिटेल",
                gu: "રિટેલ",
              })}: ${formatINR(retailPrice, language)}`
              : null}
          </p>
          {savings != null && savings > 0 ? (
            <p className="mt-1 text-sm font-medium text-primary">
              {pick(language, {
                en: `Margin window: ${formatINR(savings, language)} per unit`,
                hi: `मार्जिन विंडो: ${formatINR(savings, language)} प्रति यूनिट`,
                gu: `માર્જિન વિન્ડો: ${formatINR(savings, language)} પ્રતિ યુનિટ`,
              })}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-3 px-6 pb-6 sm:flex-row">
        <Button href={wholesaleWhatsAppHref} target="_blank" rel="noreferrer" size="lg">
          {pick(language, {
            en: "Talk Wholesale on WhatsApp",
            hi: "व्हाट्सऐप पर होलसेल बात करें",
            gu: "વોટ્સએપ પર હોલસેલ વાત કરો",
          })}
        </Button>
        <Button href="/contact?type=distributor" variant="outline" size="lg">
          {pick(language, {
            en: "Open Distributor Form",
            hi: "डिस्ट्रीब्यूटर फॉर्म खोलें",
            gu: "ડિસ્ટ્રિબ્યુટર ફોર્મ ખોલો",
          })}
        </Button>
      </div>
    </Card>
  );
}


