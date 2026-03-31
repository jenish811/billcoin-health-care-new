"use client";

import { Download } from "lucide-react";
import { BrochureGrid } from "@/components/sections/BrochureGrid";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brochure } from "@/data/brochure";
import { pick } from "@/lib/i18n";

export default function BrochurePage() {
  const { language } = useAppPreferences();

  return (
    <section className="section-y">
      <Container className="grid gap-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={pick(language, {
              en: "Brochure",
              hi: "ब्रोशर",
              gu: "બ્રોશર",
            })}
            title={pick(language, {
              en: "View and download the product brochure",
              hi: "प्रोडक्ट ब्रोशर देखें और डाउनलोड करें",
              gu: "પ્રોડક્ટ બ્રોશર જુઓ અને ડાઉનલોડ કરો",
            })}
            description={pick(language, {
              en: "Use the embedded viewer or download the PDF directly.",
              hi: "एम्बेडेड व्यूअर का उपयोग करें या PDF सीधे डाउनलोड करें।",
              gu: "એમ્બેડેડ વ્યૂઅરનો ઉપયોગ કરો અથવા PDF સીધું ડાઉનલોડ કરો.",
            })}
          />
          <div className="flex gap-3">
            <Button href={brochure.pdf}>
              {pick(language, {
                en: "Download PDF",
                hi: "PDF डाउनलोड करें",
                gu: "PDF ડાઉનલોડ કરો",
              })}{" "}
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
            <div className="relative">
              <iframe
                title="Billcoin Health Care brochure"
                src={brochure.pdf}
                className="h-[70vh] w-full bg-white"
              />
            </div>
          </div>
        </Card>

        <SectionHeading
          eyebrow={pick(language, {
            en: "Grid View",
            hi: "ग्रिड व्यू",
            gu: "ગ્રિડ વ્યૂ",
          })}
          title={pick(language, {
            en: "Tap any page to preview",
            hi: "प्रीव्यू के लिए किसी भी पेज पर टैप करें",
            gu: "પ્રીવ્યૂ માટે કોઈપણ પેજ પર ટેપ કરો",
          })}
          description={pick(language, {
            en: "Quick browsing for mobile, tablet, and desktop.",
            hi: "मोबाइल, टैबलेट और डेस्कटॉप के लिए तेज़ ब्राउज़िंग।",
            gu: "મોબાઇલ, ટેબલેટ અને ડેસ્કટોપ માટે ઝડપી બ્રાઉઝિંગ.",
          })}
        />

        <BrochureGrid pages={brochure.pages} />
      </Container>
    </section>
  );
}
