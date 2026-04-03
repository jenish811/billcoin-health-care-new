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
      <section className="section-y">
        <Container className="grid items-start gap-10 lg:grid-cols-12 lg:[&>*]:min-w-0">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow={pick(language, {
                en: "Our Story",
                hi: "à¤¹à¤®à¤¾à¤°à¥€ à¤•à¤¹à¤¾à¤¨à¥€",
                gu: "àª…àª®àª¾àª°à«€ àª•àª¹àª¾àª¨à«€",
              })}
              title={pick(language, {
                en: "A brand built around hygiene, trust, and own manufacturing",
                hi: "à¤¹à¤¾à¤‡à¤œà¥€à¤¨, à¤­à¤°à¥‹à¤¸à¤¾ à¤”à¤° à¤…à¤ªà¤¨à¥‡ à¤®à¥ˆà¤¨à¥à¤¯à¥à¤«à¥ˆà¤•à¥à¤šà¤°à¤¿à¤‚à¤— à¤ªà¤° à¤¬à¤¨à¤¾ à¤¬à¥à¤°à¤¾à¤‚à¤¡",
                gu: "àª¹àª¾àª‡àªœàª¿àª¨, àªµàª¿àª¶à«àªµàª¾àª¸ àª…àª¨à«‡ àªªà«‹àª¤àª¾àª¨àª¾ àª®à«‡àª¨à«àª¯à«àª«à«‡àª•à«àªšàª°àª¿àª‚àª— àªªàª° àª¬àª¨à«‡àª²à«àª‚ àª¬à«àª°àª¾àª¨à«àª¡",
              })}
              description={pick(language, {
                en: `${siteConfig.name} from ${siteConfig.locationShort} focuses on quality-controlled home care products that feel modern, safe, and dependable.`,
                hi: `${siteConfig.locationShort} à¤¸à¥‡ ${siteConfig.name} à¤à¤¸à¥‡ à¤¹à¥‹à¤®-à¤•à¥‡à¤¯à¤° à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤¬à¤¨à¤¾à¤¤à¤¾ à¤¹à¥ˆ à¤œà¥‹ à¤•à¥à¤µà¤¾à¤²à¤¿à¤Ÿà¥€-à¤•à¤‚à¤Ÿà¥à¤°à¥‹à¤²à¥à¤¡, à¤®à¥‰à¤¡à¤°à¥à¤¨, à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤”à¤° à¤­à¤°à¥‹à¤¸à¥‡à¤®à¤‚à¤¦ à¤¹à¥‹à¤‚à¥¤`,
                gu: `${siteConfig.locationShort} àª®àª¾àª‚àª¥à«€ ${siteConfig.name} àªàªµàª¾ àª¹à«‹àª®-àª•à«‡àª° àªªà«àª°à«‹àª¡àª•à«àªŸ àª¬àª¨àª¾àªµà«‡ àª›à«‡ àªœà«‡ àª•à«àªµà«‹àª²àª¿àªŸà«€-àª•àª‚àªŸà«àª°à«‹àª²à«àª¡, àª†àª§à«àª¨àª¿àª•, àª¸à«àª°àª•à«àª·àª¿àª¤ àª…àª¨à«‡ àªµàª¿àª¶à«àªµàª¸àª¨à«€àª¯ àª²àª¾àª—à«‡.`,
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
                      {pick(language, { en: "Mission", hi: "à¤®à¤¿à¤¶à¤¨", gu: "àª®àª¿àª¶àª¨" })}
                    </p>
                    <p className="mt-2 text-sm text-foreground/72">
                      {pick(language, {
                        en: "Create home-care products that are easy to trust, easy to sell, and strong in daily performance.",
                        hi: "à¤à¤¸à¥‡ à¤¹à¥‹à¤®-à¤•à¥‡à¤¯à¤° à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤¬à¤¨à¤¾à¤¨à¤¾ à¤œà¥‹ à¤­à¤°à¥‹à¤¸à¥‡à¤®à¤‚à¤¦ à¤¹à¥‹à¤‚, à¤¬à¥‡à¤šà¤¨à¤¾ à¤†à¤¸à¤¾à¤¨ à¤¹à¥‹ à¤”à¤° à¤°à¥‹à¤œà¤¼à¤®à¤°à¥à¤°à¤¾ à¤•à¥‡ à¤‰à¤ªà¤¯à¥‹à¤— à¤®à¥‡à¤‚ à¤®à¤œà¤¬à¥‚à¤¤ à¤¹à¥‹à¤‚à¥¤",
                        gu: "àªàªµàª¾ àª¹à«‹àª®-àª•à«‡àª° àªªà«àª°à«‹àª¡àª•à«àªŸ àª¬àª¨àª¾àªµàªµà«àª‚ àªœà«‡ àªµàª¿àª¶à«àªµàª¾àª¸àªªàª¾àª¤à«àª° àª¹à«‹àª¯, àªµà«‡àªšàªµàª¾àª®àª¾àª‚ àª¸àª°àª³ àª¹à«‹àª¯ àª…àª¨à«‡ àª¦à«ˆàª¨àª¿àª• àª‰àªªàª¯à«‹àª—àª®àª¾àª‚ àª®àªœàª¬à«‚àª¤ àª¹à«‹àª¯.",
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
                      {pick(language, { en: "Vision", hi: "à¤µà¤¿à¤œà¤¨", gu: "àªµàª¿àªàª¨" })}
                    </p>
                    <p className="mt-2 text-sm text-foreground/72">
                      {pick(language, {
                        en: "A cleaner, safer, and better-presented home-care experience in every household.",
                        hi: "à¤¹à¤° à¤˜à¤° à¤®à¥‡à¤‚ à¤…à¤§à¤¿à¤• à¤¸à¤¾à¤«, à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤”à¤° à¤¬à¥‡à¤¹à¤¤à¤° à¤¢à¤‚à¤— à¤¸à¥‡ à¤ªà¥à¤°à¤¸à¥à¤¤à¥à¤¤ à¤¹à¥‹à¤®-à¤•à¥‡à¤¯à¤° à¤…à¤¨à¥à¤­à¤µà¥¤",
                        gu: "àª¦àª°à«‡àª• àª˜àª°àª®àª¾àª‚ àªµàª§à« àª¸à«àªµàªšà«àª›, àª¸à«àª°àª•à«àª·àª¿àª¤ àª…àª¨à«‡ àªµàª§à« àª¸àª¾àª°à«€ àª°à«€àª¤à«‡ àª°àªœà«‚ àª¥àª¯à«‡àª²à«‹ àª¹à«‹àª®-àª•à«‡àª° àª…àª¨à«àª­àªµ.",
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
              hi: "à¤ªà¥à¤°à¤¤à¤¿à¤¬à¤¦à¥à¤§à¤¤à¤¾",
              gu: "àªªà«àª°àª¤àª¿àª¬àª¦à«àª§àª¤àª¾",
            })}
            title={pick(language, {
              en: "What Billcoin wants customers and distributors to feel",
              hi: "Billcoin à¤—à¥à¤°à¤¾à¤¹à¤•à¥‹à¤‚ à¤”à¤° à¤¡à¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€à¤¬à¥à¤¯à¥‚à¤Ÿà¤°à¥à¤¸ à¤•à¥‹ à¤•à¥à¤¯à¤¾ à¤®à¤¹à¤¸à¥‚à¤¸ à¤•à¤°à¤¾à¤¨à¤¾ à¤šà¤¾à¤¹à¤¤à¤¾ à¤¹à¥ˆ",
              gu: "Billcoin àª—à«àª°àª¾àª¹àª•à«‹ àª…àª¨à«‡ àª¡àª¿àª¸à«àªŸà«àª°àª¿àª¬à«àª¯à«àªŸàª°à«àª¸àª¨à«‡ àª¶à«àª‚ àª…àª¨à«àª­àªµàª¾àªµàªµà«àª‚ àª®àª¾àª‚àª—à«‡ àª›à«‡",
            })}
            description={pick(language, {
              en: "The brand promise is simple: consistency, hygiene, support, and a premium feel without confusion.",
              hi: "à¤¬à¥à¤°à¤¾à¤‚à¤¡ à¤•à¤¾ à¤µà¤¾à¤¦à¤¾ à¤¸à¤°à¤² à¤¹à¥ˆ: à¤•à¤‚à¤¸à¤¿à¤¸à¥à¤Ÿà¥‡à¤‚à¤¸à¥€, à¤¹à¤¾à¤‡à¤œà¥€à¤¨, à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤”à¤° à¤¬à¤¿à¤¨à¤¾ à¤‰à¤²à¤à¤¨ à¤•à¤¾ à¤ªà¥à¤°à¥€à¤®à¤¿à¤¯à¤® à¤…à¤¨à¥à¤­à¤µà¥¤",
              gu: "àª¬à«àª°àª¾àª¨à«àª¡àª¨à«àª‚ àªµàªšàª¨ àª¸àª°àª³ àª›à«‡: àª•àª¨à«àª¸àª¿àª¸à«àªŸàª¨à«àª¸à«€, àª¹àª¾àª‡àªœàª¿àª¨, àª¸àªªà«‹àª°à«àªŸ àª…àª¨à«‡ àª—à«‚àª‚àªšàªµàª£ àªµàª—àª°àª¨à«‹ àªªà«àª°à«€àª®àª¿àª¯àª® àª…àª¨à«àª­àªµ.",
            })}
            className="mb-10"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: {
                  en: "Quality control",
                  hi: "à¤•à¥à¤µà¤¾à¤²à¤¿à¤Ÿà¥€ à¤•à¤‚à¤Ÿà¥à¤°à¥‹à¤²",
                  gu: "àª•à«àªµà«‹àª²àª¿àªŸà«€ àª•àª‚àªŸà«àª°à«‹àª²",
                },
                text: {
                  en: "Products are positioned to look dependable from formulation to packaging.",
                  hi: "à¤«à¥‰à¤°à¥à¤®à¥‚à¤²à¥‡à¤¶à¤¨ à¤¸à¥‡ à¤ªà¥ˆà¤•à¥‡à¤œà¤¿à¤‚à¤— à¤¤à¤• à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤­à¤°à¥‹à¤¸à¥‡à¤®à¤‚à¤¦ à¤¦à¤¿à¤–à¥‡à¤‚, à¤‡à¤¸à¥€ à¤ªà¤° à¤«à¥‹à¤•à¤¸ à¤¹à¥ˆà¥¤",
                  gu: "àª«à«‹àª°à«àª®à«àª¯à«àª²à«‡àª¶àª¨àª¥à«€ àªªà«‡àª•à«‡àªœàª¿àª‚àª— àª¸à«àª§à«€ àªªà«àª°à«‹àª¡àª•à«àªŸ àªµàª¿àª¶à«àªµàª¾àª¸àªªàª¾àª¤à«àª° àª²àª¾àª—à«‡ àª¤à«‡àª¨àª¾ àªªàª° àª«à«‹àª•àª¸ àª›à«‡.",
                },
              },
              {
                icon: HeartHandshake,
                title: {
                  en: "Support that responds",
                  hi: "à¤¤à¥‡à¤œà¤¼ à¤”à¤° à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ",
                  gu: "àªàª¡àªªà«€ àª…àª¨à«‡ àª¸à«àªªàª·à«àªŸ àª¸àªªà«‹àª°à«àªŸ",
                },
                text: {
                  en: "Quick communication matters when a customer or distributor is ready to act.",
                  hi: "à¤œà¤¬ à¤—à¥à¤°à¤¾à¤¹à¤• à¤¯à¤¾ à¤¡à¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€à¤¬à¥à¤¯à¥‚à¤Ÿà¤° à¤¤à¥ˆà¤¯à¤¾à¤° à¤¹à¥‹, à¤¤à¤¬ à¤¤à¥‡à¤œà¤¼ à¤¸à¤‚à¤µà¤¾à¤¦ à¤¬à¤¹à¥à¤¤ à¤®à¤¾à¤¯à¤¨à¥‡ à¤°à¤–à¤¤à¤¾ à¤¹à¥ˆà¥¤",
                  gu: "àªœà«àª¯àª¾àª°à«‡ àª—à«àª°àª¾àª¹àª• àª…àª¥àªµàª¾ àª¡àª¿àª¸à«àªŸà«àª°àª¿àª¬à«àª¯à«àªŸàª° àª¤à«ˆàª¯àª¾àª° àª¹à«‹àª¯, àª¤à«àª¯àª¾àª°à«‡ àªàª¡àªªàª¥à«€ àªµàª¾àª¤àªšà«€àª¤ àª–à«‚àª¬ àª®àª¹àª¤à«àªµàªªà«‚àª°à«àª£ àª¬àª¨à«‡ àª›à«‡.",
                },
              },
              {
                icon: Sparkles,
                title: {
                  en: "A cleaner presentation",
                  hi: "à¤•à¥à¤²à¥€à¤¨ à¤ªà¥à¤°à¥‡à¤œà¤¼à¥‡à¤‚à¤Ÿà¥‡à¤¶à¤¨",
                  gu: "àª•à«àª²à«€àª¨ àªªà«àª°à«‡àªàª¨à«àªŸà«‡àª¶àª¨",
                },
                text: {
                  en: "A good product deserves a website that feels modern instead of outdated.",
                  hi: "à¤…à¤šà¥à¤›à¥‡ à¤ªà¥à¤°à¥‹à¤¡à¤•à¥à¤Ÿ à¤•à¥‹ à¤à¤¸à¥€ à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤®à¤¿à¤²à¤¨à¥€ à¤šà¤¾à¤¹à¤¿à¤ à¤œà¥‹ à¤ªà¥à¤°à¤¾à¤¨à¥€ à¤¨à¤¹à¥€à¤‚, à¤†à¤§à¥à¤¨à¤¿à¤• à¤²à¤—à¥‡à¥¤",
                  gu: "àª¸àª¾àª°àª¾ àªªà«àª°à«‹àª¡àª•à«àªŸàª¨à«‡ àªàªµà«€ àªµà«‡àª¬àª¸àª¾àª‡àªŸ àª®àª³àªµà«€ àªœà«‹àªˆàª àªœà«‡ àªœà«‚àª¨à«€ àª¨àª¹à«€àª‚ àªªàª°àª‚àª¤à« àª†àª§à«àª¨àª¿àª• àª²àª¾àª—à«‡.",
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


