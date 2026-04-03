"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Factory,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";
import { CountUp } from "@/components/CountUp";
import { CategoryCard } from "@/components/products/CategoryCard";
import { ProductCard } from "@/components/products/ProductCard";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productCategories, products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { formatINR } from "@/lib/format";
import { pick } from "@/lib/i18n";
import { createWhatsAppLink } from "@/lib/whatsapp";

const heroStatCards = [
  {
    value: 8,
    suffix: "+",
    label: {
      en: "core product categories",
      hi: "à¤®à¥à¤–à¥à¤¯ à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤•à¥ˆà¤Ÿà¥‡à¤—à¤°à¥€",
      gu: "àª®à«àª–à«àª¯ àªªà«àª°à«‹àª¡àª•à«àªŸ àª•à«‡àªŸà«‡àª—àª°à«€",
    },
  },
  {
    value: 99,
    suffix: "%",
    label: {
      en: "visible pricing and cleaner trust",
      hi: "à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤•à¥€à¤®à¤¤ à¤”à¤° à¤®à¤œà¤¬à¥‚à¤¤ à¤­à¤°à¥‹à¤¸à¤¾",
      gu: "àª¸à«àªªàª·à«àªŸ àª•àª¿àª‚àª®àª¤ àª…àª¨à«‡ àª®àªœàª¬à«‚àª¤ àªµàª¿àª¶à«àªµàª¾àª¸",
    },
  },
  {
    value: 24,
    suffix: "/7",
    label: {
      en: "sales-ready support",
      hi: "à¤¸à¥‡à¤²à¥à¤¸-à¤°à¥‡à¤¡à¥€ à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ",
      gu: "àª¸à«‡àª²à«àª¸-àª°à«‡àª¡à«€ àª¸àªªà«‹àª°à«àªŸ",
    },
  },
] as const;

export function HomePageContent() {
  const { language } = useAppPreferences();
  const featuredProducts = products.filter((product) => product.featured).slice(0, 6);
  const heroProducts = featuredProducts.slice(0, 3);
  const leadProduct = heroProducts[0];

  const whatsAppHref = createWhatsAppLink({
    phone: siteConfig.contact.phone,
    text: pick(language, {
      en: "Hi Billcoin Health Care, I want to buy your products. Please share product and price details.",
      hi: "à¤¨à¤®à¤¸à¥à¤¤à¥‡ Billcoin Health Care, à¤®à¥ˆà¤‚ à¤†à¤ªà¤•à¥‡ à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤–à¤°à¥€à¤¦à¤¨à¤¾ à¤šà¤¾à¤¹à¤¤à¤¾ à¤¹à¥‚à¤à¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤”à¤° à¤•à¥€à¤®à¤¤ à¤•à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤­à¥‡à¤œà¥‡à¤‚à¥¤",
      gu: "àª¨àª®àª¸à«àª¤à«‡ Billcoin Health Care, àª¹à«àª‚ àª¤àª®àª¾àª°àª¾ àªªà«àª°à«‹àª¡àª•à«àªŸ àª–àª°à«€àª¦àªµàª¾ àª®àª¾àª‚àª—à«àª‚ àª›à«àª‚. àª•à«ƒàªªàª¾ àª•àª°à«€àª¨à«‡ àªªà«àª°à«‹àª¡àª•à«àªŸ àª…àª¨à«‡ àª•àª¿àª‚àª®àª¤àª¨à«€ àªµàª¿àª—àª¤à«‹ àª®à«‹àª•àª²à«‹.",
    }),
  });

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-soft opacity-45" />
        <Container className="section-y relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              {pick(language, {
                en: "Made in Rajkot, Gujarat",
                hi: "à¤°à¤¾à¤œà¤•à¥‹à¤Ÿ, à¤—à¥à¤œà¤°à¤¾à¤¤ à¤®à¥‡à¤‚ à¤¨à¤¿à¤°à¥à¤®à¤¿à¤¤",
                gu: "àª°àª¾àªœàª•à«‹àªŸ, àª—à«àªœàª°àª¾àª¤àª®àª¾àª‚ àª¬àª¨à«‡àª²à«àª‚",
              })}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {pick(language, {
                en: "Own manufacturing. Stronger trust. A home-care site that finally feels ready to sell.",
                hi: "à¤…à¤ªà¤¨à¤¾ à¤®à¥ˆà¤¨à¥à¤¯à¥à¤«à¥ˆà¤•à¥à¤šà¤°à¤¿à¤‚à¤—à¥¤ à¤®à¤œà¤¬à¥‚à¤¤ à¤­à¤°à¥‹à¤¸à¤¾à¥¤ à¤à¤• à¤¹à¥‹à¤®-à¤•à¥‡à¤¯à¤° à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤œà¥‹ à¤…à¤¬ à¤¸à¤š à¤®à¥‡à¤‚ à¤¬à¥‡à¤šà¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¤à¥ˆà¤¯à¤¾à¤° à¤²à¤—à¤¤à¥€ à¤¹à¥ˆà¥¤",
                gu: "àªªà«‹àª¤àª¾àª¨à«àª‚ àª®à«‡àª¨à«àª¯à«àª«à«‡àª•à«àªšàª°àª¿àª‚àª—. àªµàª§à« àªµàª¿àª¶à«àªµàª¾àª¸. àª¹àªµà«‡ àª–àª°à«‡àª–àª° àªµà«‡àªšàª¾àª£ àª®àª¾àªŸà«‡ àª¤à«ˆàª¯àª¾àª° àª²àª¾àª—àª¤à«€ àª¹à«‹àª®-àª•à«‡àª° àªµà«‡àª¬àª¸àª¾àª‡àªŸ.",
              })}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/72 sm:text-lg"
            >
              {pick(language, {
                en: "Billcoin Health Care is not reselling from a wholesaler. We build our own range, control quality, and present products with visible pricing so customers feel confident to enquire and buy.",
                hi: "Billcoin Health Care à¤•à¤¿à¤¸à¥€ à¤µà¥à¤¹à¥‹à¤²à¤¸à¥‡à¤²à¤° à¤•à¤¾ à¤°à¥€à¤¸à¥‡à¤² à¤¬à¥à¤°à¤¾à¤‚à¤¡ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤ à¤¹à¤® à¤…à¤ªà¤¨à¤¾ à¤°à¥‡à¤‚à¤œ à¤–à¥à¤¦ à¤¬à¤¨à¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚, à¤•à¥à¤µà¤¾à¤²à¤¿à¤Ÿà¥€ à¤•à¤‚à¤Ÿà¥à¤°à¥‹à¤² à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚ à¤”à¤° à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿà¥à¤¸ à¤•à¥‹ à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤•à¥€à¤®à¤¤ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤¦à¤¿à¤–à¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚ à¤¤à¤¾à¤•à¤¿ à¤—à¥à¤°à¤¾à¤¹à¤• à¤­à¤°à¥‹à¤¸à¥‡ à¤¸à¥‡ à¤ªà¥‚à¤›à¤¤à¤¾à¤› à¤”à¤° à¤–à¤°à¥€à¤¦ à¤•à¤° à¤¸à¤•à¥‡à¤‚à¥¤",
                gu: "Billcoin Health Care àª•à«‹àªˆ wholesaler àªªàª¾àª¸à«‡àª¥à«€ resell àª•àª°àª¤à«àª‚ àª¬à«àª°àª¾àª¨à«àª¡ àª¨àª¥à«€. àª…àª®à«‡ àª†àªªàª£à«€ àª°à«‡àª¨à«àªœ àªªà«‹àª¤à«‡ àª¬àª¨àª¾àªµà«€àª àª›à«€àª, àª•à«àªµà«‹àª²àª¿àªŸà«€ àª•àª‚àªŸà«àª°à«‹àª² àª•àª°à«€àª àª›à«€àª àª…àª¨à«‡ àª¸à«àªªàª·à«àªŸ àª•àª¿àª‚àª®àª¤à«‹ àª¸àª¾àª¥à«‡ àªªà«àª°à«‹àª¡àª•à«àªŸ àª°àªœà«‚ àª•àª°à«€àª àª›à«€àª àªœà«‡àª¥à«€ àª—à«àª°àª¾àª¹àª•à«‹ àªµàª¿àª¶à«àªµàª¾àª¸àª¥à«€ àªªà«‚àª›àªªàª°àª› àª…àª¨à«‡ àª–àª°à«€àª¦à«€ àª•àª°à«€ àª¶àª•à«‡.",
              })}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="/products" size="lg">
                {pick(language, {
                  en: "See Product Prices",
                  hi: "à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤•à¥€à¤®à¤¤ à¤¦à¥‡à¤–à¥‡à¤‚",
                  gu: "àªªà«àª°à«‹àª¡àª•à«àªŸ àª•àª¿àª‚àª®àª¤à«‹ àªœà«àª“",
                })}
              </Button>
              <Button
                href={whatsAppHref}
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="lg"
              >
                <MessageCircleMore className="h-4 w-4" />
                {pick(language, {
                  en: "Enquire on WhatsApp",
                  hi: "à¤µà¥à¤¹à¤¾à¤Ÿà¥à¤¸à¤à¤ª à¤ªà¤° à¤ªà¥‚à¤›à¥‡à¤‚",
                  gu: "àªµà«‹àªŸà«àª¸àªàªª àªªàª° àªªà«‚àª›à«‹",
                })}
              </Button>
            </motion.div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroStatCards.map((item) => (
                <Card key={item.label.en} className="p-4">
                  <p className="text-2xl font-semibold tracking-tight">
                    <CountUp to={item.value} suffix={item.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-foreground/68">{pick(language, item.label)}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="surface-panel rounded-[36px] p-5 sm:p-6">
            <div className="grid gap-4">
              <div className="group relative overflow-hidden rounded-[30px] bg-gradient-to-br from-primary/12 via-background/95 to-secondary/10 p-5 shadow-sm ring-1 ring-border/40">
                <div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_34%)]" />
                <div className="relative flex justify-end">
                  <div className="rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
                    {pick(language, {
                      en: "Best Seller",
                      hi: "à¤¬à¥‡à¤¸à¥à¤Ÿ à¤¸à¥‡à¤²à¤°",
                      gu: "àª¬à«‡àª¸à«àªŸ àª¸à«‡àª²àª°",
                    })}
                  </div>
                </div>
                <div className="relative mx-2 mt-4 aspect-[11/10] overflow-hidden rounded-[22px] bg-white/94 p-2 shadow-sm ring-1 ring-border/40 dark:bg-white">
                  <Image
                    src={leadProduct?.variants[0]?.image ?? "/images/hero-cleaning.png"}
                    alt={leadProduct?.title ?? "Billcoin product"}
                    fill
                    className="scale-[1.18] object-contain p-2 transition duration-300 group-hover:scale-[1.14]"
                    sizes="(max-width: 768px) 92vw, (max-width: 1024px) 100vw, 42vw"
                    priority
                  />
                </div>
                <div className="relative mt-4 rounded-[24px] border border-border bg-background/72 p-4">
                  <p className="text-sm font-semibold text-foreground/65">
                    {pick(language, {
                      en: "Starting from",
                      hi: "à¤¶à¥à¤°à¥à¤†à¤¤",
                      gu: "àª¶àª°à«‚àª†àª¤",
                    })}
                  </p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight">
                    {leadProduct ? formatINR(leadProduct.priceFrom, language) : formatINR(55, language)}
                  </p>
                  <p className="mt-2 text-sm text-foreground/72">{leadProduct?.title}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {heroProducts.map((product) => (
                  <Card key={product.id} className="p-4">
                    <p className="text-sm font-semibold">{product.title}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">
                      {formatINR(product.priceFrom, language)}
                    </p>
                    <p className="mt-1 text-xs text-foreground/60">
                      {pick(language, {
                        en: "Visible home pricing",
                        hi: "à¤¹à¥‹à¤® à¤ªà¤° à¤•à¥€à¤®à¤¤ à¤¦à¤¿à¤– à¤°à¤¹à¥€ à¤¹à¥ˆ",
                        gu: "àª¹à«‹àª® àªªàª° àª•àª¿àª‚àª®àª¤ àª¦à«‡àª–àª¾àª¯ àª›à«‡",
                      })}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Factory,
                title: {
                  en: "Own manufacturing",
                  hi: "à¤…à¤ªà¤¨à¤¾ à¤®à¥ˆà¤¨à¥à¤¯à¥à¤«à¥ˆà¤•à¥à¤šà¤°à¤¿à¤‚à¤—",
                  gu: "àªªà«‹àª¤àª¾àª¨à«àª‚ àª®à«‡àª¨à«àª¯à«àª«à«‡àª•à«àªšàª°àª¿àª‚àª—",
                },
                text: {
                  en: "We formulate and build our own products instead of buying from outside wholesalers.",
                  hi: "à¤¹à¤® à¤¬à¤¾à¤¹à¤° à¤•à¥‡ à¤µà¥à¤¹à¥‹à¤²à¤¸à¥‡à¤²à¤° à¤¸à¥‡ à¤–à¤°à¥€à¤¦à¤•à¤° à¤¨à¤¹à¥€à¤‚ à¤¬à¥‡à¤šà¤¤à¥‡, à¤¹à¤® à¤…à¤ªà¤¨à¥‡ à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤–à¥à¤¦ à¤¬à¤¨à¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤",
                  gu: "àª…àª®à«‡ àª¬àª¹àª¾àª°àª¨àª¾ wholesaler àªªàª¾àª¸à«‡àª¥à«€ àª–àª°à«€àª¦à«€ àª•àª°à«€àª¨à«‡ àªµà«‡àªšàª¤àª¾ àª¨àª¥à«€, àª…àª®à«‡ àª…àª®àª¾àª°àª¾ àªªà«àª°à«‹àª¡àª•à«àªŸà«àª¸ àªœàª¾àª¤à«‡ àª¬àª¨àª¾àªµà«€àª àª›à«€àª.",
                },
              },
              {
                icon: ShieldCheck,
                title: {
                  en: "Visible trust",
                  hi: "à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤­à¤°à¥‹à¤¸à¤¾",
                  gu: "àª¸à«àªªàª·à«àªŸ àªµàª¿àª¶à«àªµàª¾àª¸",
                },
                text: {
                  en: "Clear product cards, prices, and cleaner navigation remove friction from buying.",
                  hi: "à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤•à¤¾à¤°à¥à¤¡, à¤•à¥€à¤®à¤¤ à¤”à¤° à¤•à¥à¤²à¥€à¤¨ à¤¨à¥‡à¤µà¤¿à¤—à¥‡à¤¶à¤¨ à¤–à¤°à¥€à¤¦à¤¾à¤°à¥€ à¤•à¥€ à¤°à¥à¤•à¤¾à¤µà¤Ÿ à¤•à¤® à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤",
                  gu: "àª¸à«àªªàª·à«àªŸ àªªà«àª°à«‹àª¡àª•à«àªŸ àª•àª¾àª°à«àª¡, àª•àª¿àª‚àª®àª¤à«‹ àª…àª¨à«‡ àª•à«àª²à«€àª¨ àª¨à«‡àªµàª¿àª—à«‡àª¶àª¨ àª–àª°à«€àª¦à«€àª¨à«€ àª…àªŸàª•àª¾àª£ àª˜àªŸàª¾àª¡à«‡ àª›à«‡.",
                },
              },
              {
                icon: CheckCircle2,
                title: {
                  en: "Fast enquiry flow",
                  hi: "à¤¤à¥‡à¤œà¤¼ à¤ªà¥‚à¤›à¤¤à¤¾à¤› à¤«à¥à¤²à¥‹",
                  gu: "àªàª¡àªªà«€ àªªà«‚àª›àªªàª°àª› àª«à«àª²à«‹",
                },
                text: {
                  en: "WhatsApp-first CTAs help a user act the moment they feel interested.",
                  hi: "à¤µà¥à¤¹à¤¾à¤Ÿà¥à¤¸à¤à¤ª-à¤«à¤°à¥à¤¸à¥à¤Ÿ CTA à¤—à¥à¤°à¤¾à¤¹à¤• à¤•à¥‡ à¤‡à¤‚à¤Ÿà¤°à¥‡à¤¸à¥à¤Ÿ à¤†à¤¤à¥‡ à¤¹à¥€ à¤à¤•à¥à¤¶à¤¨ à¤²à¥‡à¤¨à¤¾ à¤†à¤¸à¤¾à¤¨ à¤¬à¤¨à¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤",
                  gu: "àªµà«‹àªŸà«àª¸àªàªª-àª«àª°à«àª¸à«àªŸ CTA àª—à«àª°àª¾àª¹àª•àª¨à«‡ àª°àª¸ àªªàª¡à«‡ àª¤à«‡ àª•à«àª·àª£à«‡ àªàª•à«àª¶àª¨ àª²à«‡àªµà«‹ àª¸àª°àª³ àª¬àª¨àª¾àªµà«‡ àª›à«‡.",
                },
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title.en} className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 ring-1 ring-primary/15">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-base font-semibold">{pick(language, item.title)}</p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/72">
                        {pick(language, item.text)}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <SectionHeading
            eyebrow={pick(language, {
              en: "Best Sellers",
              hi: "à¤¬à¥‡à¤¸à¥à¤Ÿ à¤¸à¥‡à¤²à¤°à¥à¤¸",
              gu: "àª¬à«‡àª¸à«àªŸ àª¸à«‡àª²àª°à«àª¸",
            })}
            title={pick(language, {
              en: "Products that now show their price clearly on the home screen",
              hi: "à¤à¤¸à¥‡ à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤œà¥‹ à¤…à¤¬ à¤¹à¥‹à¤® à¤¸à¥à¤•à¥à¤°à¥€à¤¨ à¤ªà¤° à¤…à¤ªà¤¨à¥€ à¤•à¥€à¤®à¤¤ à¤¸à¤¾à¤« à¤¦à¤¿à¤–à¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚",
              gu: "àª¹àªµà«‡ àª¹à«‹àª® àª¸à«àª•à«àª°à«€àª¨ àªªàª° àªªà«‹àª¤àª¾àª¨à«€ àª•àª¿àª‚àª®àª¤ àª¸à«àªªàª·à«àªŸ àª¬àª¤àª¾àªµàª¤àª¾ àªªà«àª°à«‹àª¡àª•à«àªŸà«àª¸",
            })}
            description={pick(language, {
              en: "This section is designed to make users feel ready to buy, not just browse.",
              hi: "à¤¯à¤¹ à¤¸à¥‡à¤•à¥à¤¶à¤¨ à¤¸à¤¿à¤°à¥à¤« à¤¬à¥à¤°à¤¾à¤‰à¤œà¤¼ à¤¨à¤¹à¥€à¤‚, à¤¬à¤²à¥à¤•à¤¿ à¤–à¤°à¥€à¤¦à¤¨à¥‡ à¤•à¥€ à¤¤à¥ˆà¤¯à¤¾à¤°à¥€ à¤®à¤¹à¤¸à¥‚à¤¸ à¤•à¤°à¤µà¤¾à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤",
              gu: "àª† àªµàª¿àª­àª¾àª— àª«àª•à«àª¤ àª¬à«àª°àª¾àª‰àª àª¨àª¹à«€àª‚ àªªàª°àª‚àª¤à« àª–àª°à«€àª¦àªµàª¾àª¨à«€ àª¤à«ˆàª¯àª¾àª°à«€ àª…àª¨à«àª­àªµàª¾àªµàªµàª¾ àª®àª¾àªŸà«‡ àª¬àª¨àª¾àªµà«àª¯à«‹ àª›à«‡.",
            })}
            className="mb-10"
          />

          <div className="grid gap-5 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-muted/35">
        <Container>
          <SectionHeading
            eyebrow={pick(language, {
              en: "Categories",
              hi: "à¤•à¥ˆà¤Ÿà¥‡à¤—à¤°à¥€",
              gu: "àª•à«‡àªŸà«‡àª—àª°à«€",
            })}
            title={pick(language, {
              en: "Clean layout, better category browsing",
              hi: "à¤•à¥à¤²à¥€à¤¨ à¤²à¥‡à¤†à¤‰à¤Ÿ, à¤¬à¥‡à¤¹à¤¤à¤° à¤•à¥ˆà¤Ÿà¥‡à¤—à¤°à¥€ à¤¬à¥à¤°à¤¾à¤‰à¤œà¤¼à¤¿à¤‚à¤—",
              gu: "àª•à«àª²à«€àª¨ àª²à«‡àª†àª‰àªŸ, àªµàª§à« àª¸àª¾àª°à«€ àª•à«‡àªŸà«‡àª—àª°à«€ àª¬à«àª°àª¾àª‰àªàª¿àª‚àª—",
            })}
            description={pick(language, {
              en: "The card structure is rebuilt so customers can understand the range faster.",
              hi: "à¤•à¤¾à¤°à¥à¤¡ à¤¸à¥à¤Ÿà¥à¤°à¤•à¥à¤šà¤° à¤•à¥‹ à¤«à¤¿à¤° à¤¸à¥‡ à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆ à¤¤à¤¾à¤•à¤¿ à¤—à¥à¤°à¤¾à¤¹à¤• à¤°à¥‡à¤‚à¤œ à¤•à¥‹ à¤œà¤²à¥à¤¦à¥€ à¤¸à¤®à¤ à¤¸à¤•à¥‡à¤‚à¥¤",
              gu: "àª•àª¾àª°à«àª¡ àª¸à«àªŸà«àª°àª•à«àªšàª°àª¨à«‡ àª«àª°à«€àª¥à«€ àª¬àª¨àª¾àªµà«àª¯à«àª‚ àª›à«‡ àªœà«‡àª¥à«€ àª—à«àª°àª¾àª¹àª•à«‹ àª°à«‡àª¨à«àªœàª¨à«‡ àªµàª§à« àªàª¡àªªàª¥à«€ àª¸àª®àªœà«€ àª¶àª•à«‡.",
            })}
            className="mb-10"
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {productCategories.map((category) => (
              <CategoryCard
                key={category.category}
                title={category.title}
                description={category.description}
                image={category.image}
                sizes={category.sizes}
                category={category.category}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="surface-panel rounded-[36px] p-5">
            <div className="relative overflow-hidden rounded-[30px] bg-slate-950">
              <Image
                src="/images/about-brand.png"
                alt="Billcoin manufacturing story"
                width={1200}
                height={900}
                className="h-full w-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
                  <Video className="h-3.5 w-3.5" />
                  {pick(language, {
                    en: "Product Video Story",
                    hi: "à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤µà¥€à¤¡à¤¿à¤¯à¥‹ à¤¸à¥à¤Ÿà¥‹à¤°à¥€",
                    gu: "àªªà«àª°à«‹àª¡àª•à«àªŸ àªµàª¿àª¡àª¿àª¯à«‹ àª¸à«àªŸà«‹àª°à«€",
                  })}
                </div>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
                  {pick(language, {
                    en: "When you add your factory video later, use this section to show that Billcoin makes its own products and does not buy from wholesalers.",
                    hi: "à¤œà¤¬ à¤†à¤ª à¤¬à¤¾à¤¦ à¤®à¥‡à¤‚ à¤…à¤ªà¤¨à¤¾ à¤«à¥ˆà¤•à¥à¤Ÿà¥à¤°à¥€ à¤µà¥€à¤¡à¤¿à¤¯à¥‹ à¤œà¥‹à¤¡à¤¼à¥‡à¤‚, à¤¤à¥‹ à¤‡à¤¸ à¤¸à¥‡à¤•à¥à¤¶à¤¨ à¤®à¥‡à¤‚ à¤¦à¤¿à¤–à¤¾à¤à¤ à¤•à¤¿ Billcoin à¤…à¤ªà¤¨à¥‡ à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤–à¥à¤¦ à¤¬à¤¨à¤¾à¤¤à¤¾ à¤¹à¥ˆ à¤”à¤° à¤µà¥à¤¹à¥‹à¤²à¤¸à¥‡à¤²à¤° à¤¸à¥‡ à¤–à¤°à¥€à¤¦à¤•à¤° à¤¨à¤¹à¥€à¤‚ à¤¬à¥‡à¤šà¤¤à¤¾à¥¤",
                    gu: "àª¤àª®à«‡ àª†àª—àª³ àª«à«‡àª•à«àªŸàª°à«€ àªµàª¿àª¡àª¿àª¯à«‹ àª‰àª®à«‡àª°à«‹ àª¤à«àª¯àª¾àª°à«‡ àª† àªµàª¿àª­àª¾àª—àª®àª¾àª‚ àª¬àª¤àª¾àªµà«‹ àª•à«‡ Billcoin àªªà«‹àª¤àª¾àª¨àª¾ àªªà«àª°à«‹àª¡àª•à«àªŸà«àª¸ àªœàª¾àª¤à«‡ àª¬àª¨àª¾àªµà«‡ àª›à«‡ àª…àª¨à«‡ wholesaler àªªàª¾àª¸à«‡àª¥à«€ àª–àª°à«€àª¦à«€ àª•àª°à«€àª¨à«‡ àªµà«‡àªšàª¤à«àª‚ àª¨àª¥à«€.",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow={pick(language, {
                en: "Video Brief",
                hi: "à¤µà¥€à¤¡à¤¿à¤¯à¥‹ à¤¬à¥à¤°à¥€à¤«",
                gu: "àªµàª¿àª¡àª¿àª¯à«‹ àª¬à«àª°à«€àª«",
              })}
              title={pick(language, {
                en: "What the product video should say in a few clear steps",
                hi: "à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤µà¥€à¤¡à¤¿à¤¯à¥‹ à¤•à¥‹ à¤•à¥à¤› à¤¸à¤¾à¤« à¤¸à¥à¤Ÿà¥‡à¤ªà¥à¤¸ à¤®à¥‡à¤‚ à¤•à¥à¤¯à¤¾ à¤•à¤¹à¤¨à¤¾ à¤šà¤¾à¤¹à¤¿à¤",
                gu: "àªªà«àª°à«‹àª¡àª•à«àªŸ àªµàª¿àª¡àª¿àª¯à«‹ àª¥à«‹àª¡àª¾ àª¸à«àªªàª·à«àªŸ àª¸à«àªŸà«‡àªªà«àª¸àª®àª¾àª‚ àª¶à«àª‚ àª•àª¹à«‡àªµà«àª‚ àªœà«‹àªˆàª",
              })}
              description={pick(language, {
                en: "Keep the script short, visual, and trust-building.",
                hi: "à¤¸à¥à¤•à¥à¤°à¤¿à¤ªà¥à¤Ÿ à¤›à¥‹à¤Ÿà¥€, à¤µà¤¿à¤œà¤¼à¥à¤…à¤² à¤”à¤° à¤­à¤°à¥‹à¤¸à¤¾ à¤¬à¤¢à¤¼à¤¾à¤¨à¥‡ à¤µà¤¾à¤²à¥€ à¤°à¤–à¥‡à¤‚à¥¤",
                gu: "àª¸à«àª•à«àª°àª¿àªªà«àªŸ àªŸà«‚àª‚àª•à«€, àªµàª¿àªà«àª¯à«àª…àª² àª…àª¨à«‡ àªµàª¿àª¶à«àªµàª¾àª¸ àªµàª§àª¾àª°àª¤à«€ àª°àª¾àª–à«‹.",
              })}
            />

            <div className="mt-8 grid gap-4">
              {[
                {
                  title: {
                    en: "Start with the plant or mixing area",
                    hi: "à¤¶à¥à¤°à¥à¤†à¤¤ à¤ªà¥à¤²à¤¾à¤‚à¤Ÿ à¤¯à¤¾ à¤®à¤¿à¤•à¥à¤¸à¤¿à¤‚à¤— à¤à¤°à¤¿à¤¯à¤¾ à¤¸à¥‡ à¤•à¤°à¥‡à¤‚",
                    gu: "àª¶àª°à«‚àª†àª¤ àªªà«àª²àª¾àª¨à«àªŸ àª…àª¥àªµàª¾ àª®àª¿àª•à«àª¸àª¿àª‚àª— àªàª°àª¿àª¯àª¾àª¥à«€ àª•àª°à«‹",
                  },
                  text: {
                    en: "Show real production visuals and open with: We do not source finished goods from wholesalers. We create our own Billcoin range.",
                    hi: "à¤°à¥€à¤¯à¤² à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤¶à¤¨ à¤µà¤¿à¤œà¤¼à¥à¤…à¤² à¤¦à¤¿à¤–à¤¾à¤à¤ à¤”à¤° à¤¶à¥à¤°à¥à¤†à¤¤ à¤•à¤°à¥‡à¤‚: à¤¹à¤® à¤µà¥à¤¹à¥‹à¤²à¤¸à¥‡à¤²à¤° à¤¸à¥‡ à¤¤à¥ˆà¤¯à¤¾à¤° à¤®à¤¾à¤² à¤¨à¤¹à¥€à¤‚ à¤²à¥‡à¤¤à¥‡à¥¤ à¤¹à¤® à¤…à¤ªà¤¨à¤¾ Billcoin à¤°à¥‡à¤‚à¤œ à¤–à¥à¤¦ à¤¬à¤¨à¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤",
                    gu: "àªµàª¾àª¸à«àª¤àªµàª¿àª• àªªà«àª°à«‹àª¡àª•à«àª¶àª¨ àªµàª¿àªà«àª¯à«àª…àª² àª¬àª¤àª¾àªµà«‹ àª…àª¨à«‡ àª¶àª°à«‚àª†àª¤ àª•àª°à«‹: àª…àª®à«‡ wholesaler àªªàª¾àª¸à«‡àª¥à«€ àª¤à«ˆàª¯àª¾àª° àª®àª¾àª² àª²àªˆàª àª¨àª¥à«€. àª…àª®à«‡ àª…àª®àª¾àª°à«€ Billcoin àª°à«‡àª¨à«àªœ àªœàª¾àª¤à«‡ àª¬àª¨àª¾àªµà«€àª àª›à«€àª.",
                  },
                },
                {
                  title: {
                    en: "Show filling, packaging, and finished products",
                    hi: "à¤«à¤¿à¤²à¤¿à¤‚à¤—, à¤ªà¥ˆà¤•à¥‡à¤œà¤¿à¤‚à¤— à¤”à¤° à¤«à¤¿à¤¨à¤¿à¤¶à¥à¤¡ à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤¦à¤¿à¤–à¤¾à¤à¤",
                    gu: "àª«àª¿àª²àª¿àª‚àª—, àªªà«‡àª•à«‡àªœàª¿àª‚àª— àª…àª¨à«‡ àª¤à«ˆàª¯àª¾àª° àªªà«àª°à«‹àª¡àª•à«àªŸ àª¬àª¤àª¾àªµà«‹",
                  },
                  text: {
                    en: "Move from raw process to filled bottles so the buyer sees control, cleanliness, and consistency.",
                    hi: "à¤°à¥‰ à¤ªà¥à¤°à¥‹à¤¸à¥‡à¤¸ à¤¸à¥‡ à¤­à¤°à¥€ à¤¹à¥à¤ˆ à¤¬à¥‹à¤¤à¤²à¥‹à¤‚ à¤¤à¤• à¤œà¤¾à¤à¤ à¤¤à¤¾à¤•à¤¿ à¤–à¤°à¥€à¤¦à¤¾à¤° à¤•à¥‹ à¤•à¤‚à¤Ÿà¥à¤°à¥‹à¤², à¤¸à¤«à¤¾à¤ˆ à¤”à¤° à¤•à¤‚à¤¸à¤¿à¤¸à¥à¤Ÿà¥‡à¤‚à¤¸à¥€ à¤¦à¤¿à¤–à¥‡à¥¤",
                    gu: "àª°à«‰ àªªà«àª°à«‹àª¸à«‡àª¸àª¥à«€ àª­àª°à«‡àª²à«€ àª¬à«‹àªŸàª² àª¸à«àª§à«€ àªœàª¾àª“ àªœà«‡àª¥à«€ àª–àª°à«€àª¦àª¨àª¾àª°àª¨à«‡ àª•àª‚àªŸà«àª°à«‹àª², àª¸àª«àª¾àªˆ àª…àª¨à«‡ àª•àª¨à«àª¸àª¿àª¸à«àªŸàª¨à«àª¸à«€ àª¦à«‡àª–àª¾àª¯.",
                  },
                },
                {
                  title: {
                    en: "Close with trust + action",
                    hi: "à¤…à¤‚à¤¤ à¤­à¤°à¥‹à¤¸à¤¾ à¤”à¤° à¤à¤•à¥à¤¶à¤¨ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤•à¤°à¥‡à¤‚",
                    gu: "àª…àª‚àª¤ àªµàª¿àª¶à«àªµàª¾àª¸ àª…àª¨à«‡ àªàª•à«àª¶àª¨ àª¸àª¾àª¥à«‡ àª•àª°à«‹",
                  },
                  text: {
                    en: "End with product lineup, visible prices, and a WhatsApp CTA: Ask for price list, dealership, or bulk supply today.",
                    hi: "à¤…à¤‚à¤¤ à¤®à¥‡à¤‚ à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤²à¤¾à¤‡à¤¨à¤…à¤ª, à¤•à¥€à¤®à¤¤ à¤”à¤° à¤µà¥à¤¹à¤¾à¤Ÿà¥à¤¸à¤à¤ª CTA à¤°à¤–à¥‡à¤‚: à¤†à¤œ à¤¹à¥€ à¤ªà¥à¤°à¤¾à¤‡à¤¸ à¤²à¤¿à¤¸à¥à¤Ÿ, à¤¡à¥€à¤²à¤°à¤¶à¤¿à¤ª à¤¯à¤¾ à¤¬à¤²à¥à¤• à¤¸à¤ªà¥à¤²à¤¾à¤ˆ à¤ªà¥‚à¤›à¥‡à¤‚à¥¤",
                    gu: "àª…àª‚àª¤à«‡ àªªà«àª°à«‹àª¡àª•à«àªŸ àª²àª¾àª‡àª¨àª…àªª, àª•àª¿àª‚àª®àª¤ àª…àª¨à«‡ àªµà«‹àªŸà«àª¸àªàªª CTA àª°àª¾àª–à«‹: àª†àªœà«‡ àªœ àªªà«àª°àª¾àª‡àª¸ àª²àª¿àª¸à«àªŸ, àª¡à«€àª²àª°àª¶àª¿àªª àª…àª¥àªµàª¾ àª¬àª²à«àª• àª¸àªªà«àª²àª¾àª¯ àªªà«‚àª›à«‹.",
                  },
                },
              ].map((item) => (
                <Card key={item.title.en} className="p-6">
                  <p className="text-base font-semibold">{pick(language, item.title)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/72">
                    {pick(language, item.text)}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y bg-muted/35">
        <Container>
          <Card className="overflow-hidden p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/80">
                  {pick(language, {
                    en: "Final CTA",
                    hi: "à¤«à¤¾à¤‡à¤¨à¤² CTA",
                    gu: "àª«àª¾àª‡àª¨àª² CTA",
                  })}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  {pick(language, {
                    en: "If the customer lands here, the next step should feel obvious",
                    hi: "à¤…à¤—à¤° à¤—à¥à¤°à¤¾à¤¹à¤• à¤¯à¤¹à¤¾à¤ à¤ªà¤¹à¥à¤à¤šà¥‡, à¤¤à¥‹ à¤…à¤—à¤²à¤¾ à¤•à¤¦à¤® à¤¬à¤¿à¤²à¥à¤•à¥à¤² à¤¸à¤¾à¤« à¤²à¤—à¤¨à¤¾ à¤šà¤¾à¤¹à¤¿à¤",
                    gu: "àª—à«àª°àª¾àª¹àª• àª…àª¹à«€àª‚ àªªàª¹à«‹àª‚àªšà«‡, àª¤à«‹ àª†àª—àª³àª¨à«àª‚ àªªàª—àª²à«àª‚ àª¸à«àªªàª·à«àªŸ àª²àª¾àª—àªµà«àª‚ àªœà«‹àªˆàª",
                  })}
                </h2>
                <p className="mt-3 max-w-2xl text-base text-foreground/72">
                  {pick(language, {
                    en: "Ask for the price list, distributorship, or bulk supply directly from Billcoin Health Care.",
                    hi: "Billcoin Health Care à¤¸à¥‡ à¤¸à¥€à¤§à¥‡ à¤ªà¥à¤°à¤¾à¤‡à¤¸ à¤²à¤¿à¤¸à¥à¤Ÿ, à¤¡à¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€à¤¬à¥à¤¯à¥‚à¤Ÿà¤°à¥à¤¶à¤¿à¤ª à¤¯à¤¾ à¤¬à¤²à¥à¤• à¤¸à¤ªà¥à¤²à¤¾à¤ˆ à¤•à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤²à¥‡à¤‚à¥¤",
                    gu: "Billcoin Health Care àªªàª¾àª¸à«‡àª¥à«€ àª¸à«€àª§à«€ àªªà«àª°àª¾àª‡àª¸ àª²àª¿àª¸à«àªŸ, àª¡àª¿àª¸à«àªŸà«àª°àª¿àª¬à«àª¯à«àªŸàª°à«àª¶àª¿àªª àª…àª¥àªµàª¾ àª¬àª²à«àª• àª¸àªªà«àª²àª¾àª¯àª¨à«€ àª®àª¾àª¹àª¿àª¤à«€ àª®à«‡àª³àªµà«‹.",
                  })}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button href={whatsAppHref} target="_blank" rel="noreferrer" size="lg">
                  {pick(language, {
                    en: "Get Price List",
                    hi: "à¤ªà¥à¤°à¤¾à¤‡à¤¸ à¤²à¤¿à¤¸à¥à¤Ÿ à¤²à¥‡à¤‚",
                    gu: "àªªà«àª°àª¾àª‡àª¸ àª²àª¿àª¸à«àªŸ àª²à«‹",
                  })}
                </Button>
                <Button href="/contact?type=distributor" variant="outline" size="lg">
                  {pick(language, {
                    en: "Talk Dealership",
                    hi: "à¤¡à¥€à¤²à¤°à¤¶à¤¿à¤ª à¤¬à¤¾à¤¤ à¤•à¤°à¥‡à¤‚",
                    gu: "àª¡àª¿àª²àª°àª¶àª¿àªª àªµàª¾àª¤ àª•àª°à«‹",
                  })}
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
}

