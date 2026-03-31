"use client";

import Image from "next/image";
import { HeartHandshake, ShieldCheck, Sparkles, Target } from "lucide-react";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import { pick } from "@/lib/i18n";

export default function AboutPage() {
  const { language } = useAppPreferences();

  return (
    <div>
      <section className="section-y bg-muted/35">
        <Container className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow={pick(language, {
                en: "Our Story",
                hi: "हमारी कहानी",
                gu: "અમારી કહાની",
              })}
              title={pick(language, {
                en: "A brand built around hygiene, trust, and own manufacturing",
                hi: "हाइजीन, भरोसा और अपने मैन्युफैक्चरिंग पर बना ब्रांड",
                gu: "હાઇજિન, વિશ્વાસ અને પોતાના મેન્યુફેક્ચરિંગ પર બનેલું બ્રાન્ડ",
              })}
              description={pick(language, {
                en: `${siteConfig.name} from ${siteConfig.locationShort} focuses on quality-controlled home care products that feel modern, safe, and dependable.`,
                hi: `${siteConfig.locationShort} से ${siteConfig.name} ऐसे होम-केयर प्रोडक्ट बनाता है जो क्वालिटी-कंट्रोल्ड, मॉडर्न, सुरक्षित और भरोसेमंद हों।`,
                gu: `${siteConfig.locationShort} માંથી ${siteConfig.name} એવા હોમ-કેર પ્રોડક્ટ બનાવે છે જે ક્વોલિટી-કંટ્રોલ્ડ, આધુનિક, સુરક્ષિત અને વિશ્વસનીય લાગે.`,
              })}
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
                    <Target className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">
                      {pick(language, { en: "Mission", hi: "मिशन", gu: "મિશન" })}
                    </p>
                    <p className="mt-2 text-sm text-foreground/72">
                      {pick(language, {
                        en: "Create home-care products that are easy to trust, easy to sell, and strong in daily performance.",
                        hi: "ऐसे होम-केयर प्रोडक्ट बनाना जो भरोसेमंद हों, बेचना आसान हो और रोज़मर्रा के उपयोग में मजबूत हों।",
                        gu: "એવા હોમ-કેર પ્રોડક્ટ બનાવવું જે વિશ્વાસપાત્ર હોય, વેચવામાં સરળ હોય અને દૈનિક ઉપયોગમાં મજબૂત હોય.",
                      })}
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 ring-1 ring-secondary/15">
                    <Sparkles className="h-5 w-5 text-secondary" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">
                      {pick(language, { en: "Vision", hi: "विजन", gu: "વિઝન" })}
                    </p>
                    <p className="mt-2 text-sm text-foreground/72">
                      {pick(language, {
                        en: "A cleaner, safer, and better-presented home-care experience in every household.",
                        hi: "हर घर में अधिक साफ, सुरक्षित और बेहतर ढंग से प्रस्तुत होम-केयर अनुभव।",
                        gu: "દરેક ઘરમાં વધુ સ્વચ્છ, સુરક્ષિત અને વધુ સારી રીતે રજૂ થયેલો હોમ-કેર અનુભવ.",
                      })}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Card className="glass overflow-hidden">
              <div className="relative aspect-[4/3] w-full bg-muted">
                <Image
                  src="/images/about-brand.png"
                  alt="About Billcoin Health Care"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <SectionHeading
            eyebrow={pick(language, {
              en: "Commitment",
              hi: "प्रतिबद्धता",
              gu: "પ્રતિબદ્ધતા",
            })}
            title={pick(language, {
              en: "What Billcoin wants customers and distributors to feel",
              hi: "Billcoin ग्राहकों और डिस्ट्रीब्यूटर्स को क्या महसूस कराना चाहता है",
              gu: "Billcoin ગ્રાહકો અને ડિસ્ટ્રિબ્યુટર્સને શું અનુભવાવવું માંગે છે",
            })}
            description={pick(language, {
              en: "The brand promise is simple: consistency, hygiene, support, and a premium feel without confusion.",
              hi: "ब्रांड का वादा सरल है: कंसिस्टेंसी, हाइजीन, सपोर्ट और बिना उलझन का प्रीमियम अनुभव।",
              gu: "બ્રાન્ડનું વચન સરળ છે: કન્સિસ્ટન્સી, હાઇજિન, સપોર્ટ અને ગૂંચવણ વગરનો પ્રીમિયમ અનુભવ.",
            })}
            className="mb-10"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: {
                  en: "Quality control",
                  hi: "क्वालिटी कंट्रोल",
                  gu: "ક્વોલિટી કંટ્રોલ",
                },
                text: {
                  en: "Products are positioned to look dependable from formulation to packaging.",
                  hi: "फॉर्मूलेशन से पैकेजिंग तक प्रोडक्ट भरोसेमंद दिखें, इसी पर फोकस है।",
                  gu: "ફોર્મ્યુલેશનથી પેકેજિંગ સુધી પ્રોડક્ટ વિશ્વાસપાત્ર લાગે તેના પર ફોકસ છે.",
                },
              },
              {
                icon: HeartHandshake,
                title: {
                  en: "Support that responds",
                  hi: "तेज़ और स्पष्ट सपोर्ट",
                  gu: "ઝડપી અને સ્પષ્ટ સપોર્ટ",
                },
                text: {
                  en: "Quick communication matters when a customer or distributor is ready to act.",
                  hi: "जब ग्राहक या डिस्ट्रीब्यूटर तैयार हो, तब तेज़ संवाद बहुत मायने रखता है।",
                  gu: "જ્યારે ગ્રાહક અથવા ડિસ્ટ્રિબ્યુટર તૈયાર હોય, ત્યારે ઝડપથી વાતચીત ખૂબ મહત્વપૂર્ણ બને છે.",
                },
              },
              {
                icon: Sparkles,
                title: {
                  en: "A cleaner presentation",
                  hi: "क्लीन प्रेज़ेंटेशन",
                  gu: "ક્લીન પ્રેઝન્ટેશન",
                },
                text: {
                  en: "A good product deserves a website that feels modern instead of outdated.",
                  hi: "अच्छे प्रोडक्ट को ऐसी वेबसाइट मिलनी चाहिए जो पुरानी नहीं, आधुनिक लगे।",
                  gu: "સારા પ્રોડક્ટને એવી વેબસાઇટ મળવી જોઈએ જે જૂની નહીં પરંતુ આધુનિક લાગે.",
                },
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title.en} className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-base font-semibold">{pick(language, item.title)}</p>
                      <p className="mt-2 text-sm text-foreground/72">{pick(language, item.text)}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
