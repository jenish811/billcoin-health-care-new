"use client";

import { Suspense } from "react";
import { Globe, Mail, MapPin, Phone, Store } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import { pick } from "@/lib/i18n";

function ContactPageContent() {
  const { language } = useAppPreferences();
  const searchParams = useSearchParams();
  const defaultType = searchParams.get("type") === "distributor" ? "distributor" : "general";

  return (
    <section className="section-y">
      <Container className="grid gap-10 lg:grid-cols-12 lg:[&>*]:min-w-0">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow={pick(language, {
              en: "Contact",
              hi: "संपर्क",
              gu: "સંપર્ક",
            })}
            title={pick(language, {
              en: "Talk directly with Billcoin Health Care",
              hi: "Billcoin Health Care से सीधे बात करें",
              gu: "Billcoin Health Care સાથે સીધી વાત કરો",
            })}
            description={pick(language, {
              en: "Use the form, call, email, or WhatsApp us for product details and dealership enquiry.",
              hi: "प्रोडक्ट डिटेल्स और डीलरशिप पूछताछ के लिए फॉर्म, कॉल, ईमेल या व्हाट्सऐप का उपयोग करें।",
              gu: "પ્રોડક્ટ વિગતો અને ડીલરશિપ પૂછપરછ માટે ફોર્મ, કૉલ, ઈમેલ અથવા વોટ્સએપનો ઉપયોગ કરો.",
            })}
          />

          <div className="mt-8 grid gap-4">
            {[
              {
                icon: Phone,
                label: { en: "Phone", hi: "फोन", gu: "ફોન" },
                value: siteConfig.contact.phone,
                href: `tel:${siteConfig.contact.phone}`,
              },
              {
                icon: Mail,
                label: { en: "Email", hi: "ईमेल", gu: "ઈમેલ" },
                value: siteConfig.contact.email,
                href: `mailto:${siteConfig.contact.email}`,
              },
              {
                icon: MapPin,
                label: { en: "Address", hi: "पता", gu: "સરનામું" },
                value: siteConfig.contact.address,
              },
              {
                icon: Globe,
                label: { en: "Website", hi: "वेबसाइट", gu: "વેબસાઇટ" },
                value: siteConfig.contact.website,
                href: `https://${siteConfig.contact.website}`,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.label.en} className="p-6">
                  <div className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">{pick(language, item.label)}</p>
                      {item.href ? (
                        <a
                          className="mt-1 block text-sm text-foreground/72 hover:text-foreground"
                          href={item.href}
                          target={item.href.startsWith("https") ? "_blank" : undefined}
                          rel={item.href.startsWith("https") ? "noreferrer" : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-foreground/72">{item.value}</p>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="mt-8 overflow-hidden">
            <div className="relative p-6">
              <div className="surface-accent absolute inset-0" />
              <div className="relative flex items-start gap-3">
                <Store className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold">
                    {pick(language, {
                      en: "Distributor Enquiry",
                      hi: "डिस्ट्रीब्यूटर पूछताछ",
                      gu: "ડિસ્ટ્રિબ્યુટર પૂછપરછ",
                    })}
                  </p>
                  <p className="mt-1 text-sm text-foreground/72">
                    {pick(language, {
                      en: "Share your city, area, and expected monthly demand to start the dealership conversation.",
                      hi: "डीलरशिप बातचीत शुरू करने के लिए अपना शहर, एरिया और अपेक्षित मासिक डिमांड बताइए।",
                      gu: "ડિલરશિપ ચર્ચા શરૂ કરવા માટે તમારું શહેર, વિસ્તાર અને અંદાજીત માસિક માંગ જણાવો.",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-7">
          <Card className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold tracking-tight">
              {defaultType === "distributor"
                ? pick(language, {
                  en: "Distributor Enquiry Form",
                  hi: "डिस्ट्रीब्यूटर पूछताछ फॉर्म",
                  gu: "ડિસ્ટ્રિબ્યુટર પૂછપરછ ફોર્મ",
                })
                : pick(language, {
                  en: "Contact Form",
                  hi: "संपर्क फॉर्म",
                  gu: "સંપર્ક ફોર્મ",
                })}
            </h2>
            <p className="mt-2 text-sm text-foreground/72">
              {pick(language, {
                en: "This form prepares a quick email flow now and can be connected to a backend later.",
                hi: "यह फॉर्म अभी तेज़ ईमेल फ्लो तैयार करता है और बाद में बैकएंड से जोड़ा जा सकता है।",
                gu: "આ ફોર્મ હાલમાં ઝડપી ઈમેલ ફ્લો તૈયાર કરે છે અને પછી બેકએન્ડ સાથે જોડાઈ શકે છે.",
              })}
            </p>
            <div className="mt-6">
              <ContactForm defaultType={defaultType} />
            </div>
          </Card>

          <Card className="mt-6 overflow-hidden">
            <div className="relative aspect-[16/6] w-full bg-muted">
              <div className="absolute inset-0 grid place-items-center p-6 text-center">
                <div>
                  <p className="text-sm font-semibold">
                    {pick(language, {
                      en: "Map Placeholder",
                      hi: "मैप प्लेसहोल्डर",
                      gu: "મેપ પ્લેસહોલ્ડર",
                    })}
                  </p>
                  <p className="mt-2 text-sm text-foreground/72">
                    {pick(language, {
                      en: `Add your live map embed here for ${siteConfig.contact.address}.`,
                      hi: `${siteConfig.contact.address} के लिए यहाँ लाइव मैप एम्बेड जोड़ें।`,
                      gu: `${siteConfig.contact.address} માટે અહીં લાઇવ મેપ એમ્બેડ ઉમેરો.`,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageContent />
    </Suspense>
  );
}


