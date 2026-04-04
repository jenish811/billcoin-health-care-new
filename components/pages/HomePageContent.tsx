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
import { PriceStack } from "@/components/products/PriceStack";
import { ProductCard } from "@/components/products/ProductCard";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productCategories, products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { pick } from "@/lib/i18n";
import { createWhatsAppLink } from "@/lib/whatsapp";

const heroStatCards = [
  {
    value: 8,
    suffix: "+",
    label: {
      en: "core product categories",
      hi: "मुख्य प्रोडक्ट कैटेगरी",
      gu: "મુખ્ય પ્રોડક્ટ કેટેગરી",
    },
  },
  {
    value: 99,
    suffix: "%",
    label: {
      en: "visible pricing and cleaner trust",
      hi: "स्पष्ट कीमत और मजबूत भरोसा",
      gu: "સ્પષ્ટ કિંમત અને મજબૂત વિશ્વાસ",
    },
  },
  {
    value: 24,
    suffix: "/7",
    label: {
      en: "sales-ready support",
      hi: "सेल्स-रेडी सपोर्ट",
      gu: "સેલ્સ-રેડી સપોર્ટ",
    },
  },
] as const;

export function HomePageContent() {
  const { language } = useAppPreferences();
  const featuredProducts = products.filter((product) => product.featured).slice(0, 6);
  const heroProducts = featuredProducts.slice(0, 3);
  const leadProduct = heroProducts[0];

  const getWholesaleFrom = (product: (typeof products)[number] | undefined) =>
    product?.variants.reduce<number | undefined>((lowest, entry) => {
      if (entry.wholesalePrice == null) {
        return lowest;
      }

      return lowest == null ? entry.wholesalePrice : Math.min(lowest, entry.wholesalePrice);
    }, undefined);

  const leadWholesalePrice = getWholesaleFrom(leadProduct);

  const whatsAppHref = createWhatsAppLink({
    phone: siteConfig.contact.phone,
    text: pick(language, {
      en: "Hi Billcoin Health Care, I want to buy your products. Please share product and price details.",
      hi: "नमस्ते Billcoin Health Care, मैं आपके प्रोडक्ट खरीदना चाहता हूँ। कृपया प्रोडक्ट और कीमत की जानकारी भेजें।",
      gu: "નમસ્તે Billcoin Health Care, હું તમારા પ્રોડક્ટ ખરીદવા માંગું છું. કૃપા કરીને પ્રોડક્ટ અને કિંમતની વિગતો મોકલો.",
    }),
  });

  return (
    <div>
      <section className="relative overflow-hidden">
        <Container className="section-y relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:[&>*]:min-w-0">
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
                hi: "राजकोट, गुजरात में निर्मित",
                gu: "રાજકોટ, ગુજરાતમાં બનેલું",
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
                hi: "अपना मैन्युफैक्चरिंग। मजबूत भरोसा। एक होम-केयर वेबसाइट जो अब सच में बेचने के लिए तैयार लगती है।",
                gu: "પોતાનું મેન્યુફેક્ચરિંગ. વધુ વિશ્વાસ. હવે ખરેખર વેચાણ માટે તૈયાર લાગતી હોમ-કેર વેબસાઇટ.",
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
                hi: "Billcoin Health Care किसी व्होलसेलर का रीसेल ब्रांड नहीं है। हम अपना रेंज खुद बनाते हैं, क्वालिटी कंट्रोल करते हैं और प्रोडक्ट्स को स्पष्ट कीमत के साथ दिखाते हैं ताकि ग्राहक भरोसे से पूछताछ और खरीद कर सकें।",
                gu: "Billcoin Health Care કોઈ wholesaler પાસેથી resell કરતું બ્રાન્ડ નથી. અમે આપણી રેન્જ પોતે બનાવીએ છીએ, ક્વોલિટી કંટ્રોલ કરીએ છીએ અને સ્પષ્ટ કિંમતો સાથે પ્રોડક્ટ રજૂ કરીએ છીએ જેથી ગ્રાહકો વિશ્વાસથી પૂછપરછ અને ખરીદી કરી શકે.",
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
                  hi: "प्रोडक्ट कीमत देखें",
                  gu: "પ્રોડક્ટ કિંમતો જુઓ",
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
                  hi: "व्हाट्सऐप पर पूछें",
                  gu: "વોટ્સએપ પર પૂછો",
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
              <div className="surface-showcase group relative overflow-hidden rounded-[30px] p-5 shadow-sm ring-1 ring-border/40">
                <div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_34%)]" />
                <div className="relative flex justify-end">
                  <div className="rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
                    {pick(language, {
                      en: "Best Seller",
                      hi: "बेस्ट सेलर",
                      gu: "બેસ્ટ સેલર",
                    })}
                  </div>
                </div>
                <div className="surface-media-frame relative mx-2 mt-4 aspect-[11/10] overflow-hidden rounded-[22px] p-2 shadow-sm ring-1 ring-border/40">
                  <Image
                    src={leadProduct?.variants[0]?.image ?? "/images/hero-cleaning.png"}
                    alt={leadProduct?.title ?? "Billcoin product"}
                    fill
                    className="object-contain object-center p-4 transition duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 92vw, (max-width: 1024px) 100vw, 42vw"
                    priority
                  />
                </div>
                <div className="surface-inset relative mt-4 rounded-[24px] border border-border p-4">
                  <PriceStack
                    retailPrice={leadProduct?.priceFrom ?? 55}
                    wholesalePrice={leadWholesalePrice}
                    language={language}
                  />
                  <p className="mt-2 text-sm text-foreground/72">{leadProduct?.title}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {heroProducts.map((product) => (
                  <Card key={product.id} className="p-4">
                    <p className="text-sm font-semibold">{product.title}</p>
                    <div className="mt-3">
                      <PriceStack
                        retailPrice={product.priceFrom}
                        wholesalePrice={getWholesaleFrom(product)}
                        language={language}
                        compact
                      />
                    </div>
                    <p className="mt-2 text-xs text-foreground/60">
                      {pick(language, {
                        en: "Retail and wholesale shown together",
                        hi: "रिटेल और होलसेल साथ में दिखाए गए हैं",
                        gu: "રિટેલ અને હોલસેલ સાથે બતાવ્યા છે",
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
        <Container className="relative">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Factory,
                title: {
                  en: "Own manufacturing",
                  hi: "अपना मैन्युफैक्चरिंग",
                  gu: "પોતાનું મેન્યુફેક્ચરિંગ",
                },
                text: {
                  en: "We formulate and build our own products instead of buying from outside wholesalers.",
                  hi: "हम बाहर के व्होलसेलर से खरीदकर नहीं बेचते, हम अपने प्रोडक्ट खुद बनाते हैं।",
                  gu: "અમે બહારના wholesaler પાસેથી ખરીદી કરીને વેચતા નથી, અમે અમારા પ્રોડક્ટ્સ જાતે બનાવીએ છીએ.",
                },
              },
              {
                icon: ShieldCheck,
                title: {
                  en: "Visible trust",
                  hi: "स्पष्ट भरोसा",
                  gu: "સ્પષ્ટ વિશ્વાસ",
                },
                text: {
                  en: "Clear product cards, prices, and cleaner navigation remove friction from buying.",
                  hi: "स्पष्ट प्रोडक्ट कार्ड, कीमत और क्लीन नेविगेशन खरीदारी की रुकावट कम करते हैं।",
                  gu: "સ્પષ્ટ પ્રોડક્ટ કાર્ડ, કિંમતો અને ક્લીન નેવિગેશન ખરીદીની અટકાણ ઘટાડે છે.",
                },
              },
              {
                icon: CheckCircle2,
                title: {
                  en: "Fast enquiry flow",
                  hi: "तेज़ पूछताछ फ्लो",
                  gu: "ઝડપી પૂછપરછ ફ્લો",
                },
                text: {
                  en: "WhatsApp-first CTAs help a user act the moment they feel interested.",
                  hi: "व्हाट्सऐप-फर्स्ट CTA ग्राहक के इंटरेस्ट आते ही एक्शन लेना आसान बनाते हैं।",
                  gu: "વોટ્સએપ-ફર્સ્ટ CTA ગ્રાહકને રસ પડે તે ક્ષણે એક્શન લેવો સરળ બનાવે છે.",
                },
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title.en} className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/12 ring-1 ring-primary/15">
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
        <Container className="relative">
          <SectionHeading
            eyebrow={pick(language, {
              en: "Best Sellers",
              hi: "बेस्ट सेलर्स",
              gu: "બેસ્ટ સેલર્સ",
            })}
            title={pick(language, {
              en: "Products that now show their price clearly on the home screen",
              hi: "ऐसे प्रोडक्ट जो अब होम स्क्रीन पर अपनी कीमत साफ दिखाते हैं",
              gu: "હવે હોમ સ્ક્રીન પર પોતાની કિંમત સ્પષ્ટ બતાવતા પ્રોડક્ટ્સ",
            })}
            description={pick(language, {
              en: "This section is designed to make users feel ready to buy, not just browse.",
              hi: "यह सेक्शन सिर्फ ब्राउज़ नहीं, बल्कि खरीदने की तैयारी महसूस करवाने के लिए बनाया गया है।",
              gu: "આ વિભાગ ફક્ત બ્રાઉઝ નહીં પરંતુ ખરીદવાની તૈયારી અનુભવાવવા માટે બનાવ્યો છે.",
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

      <section className="section-y">
        <Container className="relative">
          <SectionHeading
            eyebrow={pick(language, {
              en: "Categories",
              hi: "कैटेगरी",
              gu: "કેટેગરી",
            })}
            title={pick(language, {
              en: "Clean layout, better category browsing",
              hi: "क्लीन लेआउट, बेहतर कैटेगरी ब्राउज़िंग",
              gu: "ક્લીન લેઆઉટ, વધુ સારી કેટેગરી બ્રાઉઝિંગ",
            })}
            description={pick(language, {
              en: "The card structure is rebuilt so customers can understand the range faster.",
              hi: "कार्ड स्ट्रक्चर को फिर से बनाया गया है ताकि ग्राहक रेंज को जल्दी समझ सकें।",
              gu: "કાર્ડ સ્ટ્રક્ચરને ફરીથી બનાવ્યું છે જેથી ગ્રાહકો રેન્જને વધુ ઝડપથી સમજી શકે.",
            })}
            className="mb-10"
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
            {productCategories.map((category) => {
              return (
                <div key={category.category} className="xl:col-span-2">
                  <CategoryCard
                    title={category.title}
                    description={category.description}
                    image={category.image}
                    sizes={category.sizes}
                    category={category.category}
                  />
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:[&>*]:min-w-0">
          <div className="surface-panel rounded-[36px] p-5">
            <div className="surface-video relative overflow-hidden rounded-[30px]">
              <Image
                src="/images/about-brand.png"
                alt="Billcoin manufacturing story"
                width={1200}
                height={900}
                className="h-full w-full object-cover opacity-75"
              />
              <div className="surface-video-fade absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
                  <Video className="h-3.5 w-3.5" />
                  {pick(language, {
                    en: "Product Video Story",
                    hi: "प्रोडक्ट वीडियो स्टोरी",
                    gu: "પ્રોડક્ટ વિડિયો સ્ટોરી",
                  })}
                </div>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
                  {pick(language, {
                    en: "When you add your factory video later, use this section to show that Billcoin makes its own products and does not buy from wholesalers.",
                    hi: "जब आप बाद में अपना फैक्ट्री वीडियो जोड़ें, तो इस सेक्शन में दिखाएँ कि Billcoin अपने प्रोडक्ट खुद बनाता है और व्होलसेलर से खरीदकर नहीं बेचता।",
                    gu: "તમે આગળ ફેક્ટરી વિડિયો ઉમેરો ત્યારે આ વિભાગમાં બતાવો કે Billcoin પોતાના પ્રોડક્ટ્સ જાતે બનાવે છે અને wholesaler પાસેથી ખરીદી કરીને વેચતું નથી.",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow={pick(language, {
                en: "Video Brief",
                hi: "वीडियो ब्रीफ",
                gu: "વિડિયો બ્રીફ",
              })}
              title={pick(language, {
                en: "What the product video should say in a few clear steps",
                hi: "प्रोडक्ट वीडियो को कुछ साफ स्टेप्स में क्या कहना चाहिए",
                gu: "પ્રોડક્ટ વિડિયો થોડા સ્પષ્ટ સ્ટેપ્સમાં શું કહેવું જોઈએ",
              })}
              description={pick(language, {
                en: "Keep the script short, visual, and trust-building.",
                hi: "स्क्रिप्ट छोटी, विज़ुअल और भरोसा बढ़ाने वाली रखें।",
                gu: "સ્ક્રિપ્ટ ટૂંકી, વિઝ્યુઅલ અને વિશ્વાસ વધારતી રાખો.",
              })}
            />

            <div className="mt-8 grid gap-4">
              {[
                {
                  title: {
                    en: "Start with the plant or mixing area",
                    hi: "शुरुआत प्लांट या मिक्सिंग एरिया से करें",
                    gu: "શરૂઆત પ્લાન્ટ અથવા મિક્સિંગ એરિયાથી કરો",
                  },
                  text: {
                    en: "Show real production visuals and open with: We do not source finished goods from wholesalers. We create our own Billcoin range.",
                    hi: "रीयल प्रोडक्शन विज़ुअल दिखाएँ और शुरुआत करें: हम व्होलसेलर से तैयार माल नहीं लेते। हम अपना Billcoin रेंज खुद बनाते हैं।",
                    gu: "વાસ્તવિક પ્રોડક્શન વિઝ્યુઅલ બતાવો અને શરૂઆત કરો: અમે wholesaler પાસેથી તૈયાર માલ લઈએ નથી. અમે અમારી Billcoin રેન્જ જાતે બનાવીએ છીએ.",
                  },
                },
                {
                  title: {
                    en: "Show filling, packaging, and finished products",
                    hi: "फिलिंग, पैकेजिंग और फिनिश्ड प्रोडक्ट दिखाएँ",
                    gu: "ફિલિંગ, પેકેજિંગ અને તૈયાર પ્રોડક્ટ બતાવો",
                  },
                  text: {
                    en: "Move from raw process to filled bottles so the buyer sees control, cleanliness, and consistency.",
                    hi: "रॉ प्रोसेस से भरी हुई बोतलों तक जाएँ ताकि खरीदार को कंट्रोल, सफाई और कंसिस्टेंसी दिखे।",
                    gu: "રૉ પ્રોસેસથી ભરેલી બોટલ સુધી જાઓ જેથી ખરીદનારને કંટ્રોલ, સફાઈ અને કન્સિસ્ટન્સી દેખાય.",
                  },
                },
                {
                  title: {
                    en: "Close with trust + action",
                    hi: "अंत भरोसा और एक्शन के साथ करें",
                    gu: "અંત વિશ્વાસ અને એક્શન સાથે કરો",
                  },
                  text: {
                    en: "End with product lineup, visible prices, and a WhatsApp CTA: Ask for price list, dealership, or bulk supply today.",
                    hi: "अंत में प्रोडक्ट लाइनअप, कीमत और व्हाट्सऐप CTA रखें: आज ही प्राइस लिस्ट, डीलरशिप या बल्क सप्लाई पूछें।",
                    gu: "અંતે પ્રોડક્ટ લાઇનઅપ, કિંમત અને વોટ્સએપ CTA રાખો: આજે જ પ્રાઇસ લિસ્ટ, ડીલરશિપ અથવા બલ્ક સપ્લાય પૂછો.",
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

      <section className="section-y">
        <Container className="relative">
          <Card className="overflow-hidden p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/80">
                  {pick(language, {
                    en: "Final CTA",
                    hi: "फाइनल CTA",
                    gu: "ફાઇનલ CTA",
                  })}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  {pick(language, {
                    en: "If the customer lands here, the next step should feel obvious",
                    hi: "अगर ग्राहक यहाँ पहुँचे, तो अगला कदम बिल्कुल साफ लगना चाहिए",
                    gu: "ગ્રાહક અહીં પહોંચે, તો આગળનું પગલું સ્પષ્ટ લાગવું જોઈએ",
                  })}
                </h2>
                <p className="mt-3 max-w-2xl text-base text-foreground/72">
                  {pick(language, {
                    en: "Ask for the price list, distributorship, or bulk supply directly from Billcoin Health Care.",
                    hi: "Billcoin Health Care से सीधे प्राइस लिस्ट, डिस्ट्रीब्यूटर्शिप या बल्क सप्लाई की जानकारी लें।",
                    gu: "Billcoin Health Care પાસેથી સીધી પ્રાઇસ લિસ્ટ, ડિસ્ટ્રિબ્યુટર્શિપ અથવા બલ્ક સપ્લાયની માહિતી મેળવો.",
                  })}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button href={whatsAppHref} target="_blank" rel="noreferrer" size="lg">
                  {pick(language, {
                    en: "Get Price List",
                    hi: "प्राइस लिस्ट लें",
                    gu: "પ્રાઇસ લિસ્ટ લો",
                  })}
                </Button>
                <Button href="/contact?type=distributor" variant="outline" size="lg">
                  {pick(language, {
                    en: "Talk Dealership",
                    hi: "डीलरशिप बात करें",
                    gu: "ડિલરશિપ વાત કરો",
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


















