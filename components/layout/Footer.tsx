"use client";

import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { pick } from "@/lib/i18n";

export function Footer() {
  const { language } = useAppPreferences();

  return (
    <footer className="surface-video border-t border-white/10 text-white">
      <Container className="grid gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:[&>*]:min-w-0">
        <div>
          <Logo />
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/72">
            {pick(language, {
              en: "Billcoin Health Care manufactures its own home-care range in Rajkot, Gujarat. Better control, better quality, and better confidence for customers and distributors.",
              hi: "Billcoin Health Care राजकोट, गुजरात में अपना होम-केयर रेंज खुद बनाता है। बेहतर कंट्रोल, बेहतर क्वालिटी और ग्राहकों व डिस्ट्रीब्यूटर्स के लिए बेहतर भरोसा।",
              gu: "Billcoin Health Care રાજકોટ, ગુજરાતમાં પોતાનું હોમ-કેર રેન્જ પોતે બનાવે છે. વધુ કંટ્રોલ, વધુ ક્વોલિટી અને ગ્રાહકો તથા ડિસ્ટ્રિબ્યુટર્સ માટે વધુ વિશ્વાસ.",
            })}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
            <span>{pick(language, { en: "Own Manufacturing", hi: "अपना मैन्युफैक्चरिंग", gu: "પોતાનું મેન્યુફેક્ચરિંગ" })}</span>
            <span>{pick(language, { en: "Transparent Pricing", hi: "पारदर्शी प्राइसिंग", gu: "સ્પષ્ટ પ્રાઇસિંગ" })}</span>
            <span>{pick(language, { en: "Fast Support", hi: "तेज़ सपोर्ट", gu: "ઝડપી સપોર્ટ" })}</span>
          </div>
        </div>

        <div className="surface-panel rounded-[32px] p-6">
          <h3 className="text-sm font-semibold text-foreground">
            {pick(language, {
              en: "Contact Billcoin",
              hi: "Billcoin से संपर्क",
              gu: "Billcoin સંપર્ક",
            })}
          </h3>
          <ul className="mt-5 grid gap-4 text-sm text-foreground/72">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-primary" />
              <a className="hover:text-foreground" href={`tel:${siteConfig.contact.phone}`}>
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-primary" />
              <a className="hover:text-foreground" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              <span>{siteConfig.contact.address}</span>
            </li>
            <li className="flex gap-3">
              <Globe className="mt-0.5 h-4 w-4 text-primary" />
              <a
                className="hover:text-foreground"
                href={`https://${siteConfig.contact.website}`}
                target="_blank"
                rel="noreferrer"
              >
                {siteConfig.contact.website}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-sm text-white/58 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>
            {pick(language, {
              en: "No footer menu, only brand and contact details.",
              hi: "फूटर में मेन्यू हटाकर सिर्फ ब्रांड और संपर्क रखा गया है।",
              gu: "ફૂટરમાં મેનુ કાઢીને ફક્ત બ્રાન્ડ અને સંપર્ક રાખ્યા છે.",
            })}
          </p>
        </Container>
      </div>
    </footer>
  );
}

