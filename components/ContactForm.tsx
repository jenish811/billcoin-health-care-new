"use client";

import { useMemo, useState } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export function ContactForm({
  defaultType,
}: {
  defaultType?: "distributor" | "general";
}) {
  const { language } = useAppPreferences();
  const [state, setState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message:
      defaultType === "distributor"
        ? pick(language, {
            en: "Hi Billcoin Health Care, I am interested in becoming a distributor. Please share details about margins, support, and onboarding.",
            hi: "नमस्ते Billcoin Health Care, मैं डिस्ट्रीब्यूटर बनना चाहता हूँ। कृपया मार्जिन, सपोर्ट और ऑनबोर्डिंग की जानकारी साझा करें।",
            gu: "નમસ્તે Billcoin Health Care, હું ડિસ્ટ્રિબ્યુટર બનવા ઇચ્છું છું. કૃપા કરીને માર્જિન, સપોર્ટ અને ઓનબોર્ડિંગની વિગતો મોકલો.",
          })
        : "",
  });
  const [submitted, setSubmitted] = useState(false);

  const mailto = useMemo(() => {
    const subject =
      defaultType === "distributor"
        ? pick(language, {
            en: "Distributor Enquiry - Billcoin Health Care",
            hi: "डिस्ट्रीब्यूटर पूछताछ - Billcoin Health Care",
            gu: "ડિસ્ટ્રિબ્યુટર પૂછપરછ - Billcoin Health Care",
          })
        : pick(language, {
            en: "Contact - Billcoin Health Care",
            hi: "संपर्क - Billcoin Health Care",
            gu: "સંપર્ક - Billcoin Health Care",
          });
    const body = [
      `Name: ${state.name}`,
      `Email: ${state.email}`,
      `Phone: ${state.phone}`,
      "",
      state.message,
    ].join("\n");
    return `mailto:billcoinhealthcare@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }, [state, defaultType, language]);

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          required
          placeholder={pick(language, {
            en: "Your name",
            hi: "आपका नाम",
            gu: "તમારું નામ",
          })}
          value={state.name}
          onChange={(event) => onChange("name", event.target.value)}
          aria-label="Name"
        />
        <Input
          required
          type="email"
          placeholder={pick(language, {
            en: "Email",
            hi: "ईमेल",
            gu: "ઈમેલ",
          })}
          value={state.email}
          onChange={(event) => onChange("email", event.target.value)}
          aria-label="Email"
        />
      </div>
      <Input
        placeholder={pick(language, {
          en: "Phone (optional)",
          hi: "फोन (वैकल्पिक)",
          gu: "ફોન (વૈકલ્પિક)",
        })}
        value={state.phone}
        onChange={(event) => onChange("phone", event.target.value)}
        aria-label="Phone"
      />
      <textarea
        required
        className={cn(
          "min-h-32 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-sm outline-none placeholder:text-foreground/40 focus:border-primary/40 focus:ring-2 focus:ring-primary/15",
        )}
        placeholder={
          defaultType === "distributor"
            ? pick(language, {
                en: "Tell us about your area, experience, and expected monthly volume...",
                hi: "अपने एरिया, अनुभव और अनुमानित मासिक वॉल्यूम के बारे में बताएँ...",
                gu: "તમારા વિસ્તાર, અનુભવ અને અંદાજીત માસિક વોલ્યુમ વિશે જણાવો...",
              })
            : pick(language, {
                en: "How can we help you?",
                hi: "हम आपकी कैसे मदद करें?",
                gu: "અમે તમારી કેવી રીતે મદદ કરી શકીએ?",
              })
        }
        value={state.message}
        onChange={(event) => onChange("message", event.target.value)}
        aria-label="Message"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant="primary">
          {pick(language, {
            en: "Submit",
            hi: "सबमिट करें",
            gu: "સબમિટ કરો",
          })}{" "}
          <Send className="h-4 w-4" />
        </Button>
        <Button href={mailto} variant="outline">
          {pick(language, {
            en: "Email Us",
            hi: "ईमेल करें",
            gu: "ઈમેલ કરો",
          })}{" "}
          <Mail className="h-4 w-4" />
        </Button>
        <Button href="tel:+919104999776" variant="ghost">
          {pick(language, {
            en: "Call",
            hi: "कॉल",
            gu: "કૉલ",
          })}{" "}
          <Phone className="h-4 w-4" />
        </Button>
      </div>

      {submitted ? (
        <p className="text-sm text-foreground/70">
          {pick(language, {
            en: "Thanks. This demo form does not send data to a server yet. Use",
            hi: "धन्यवाद। यह डेमो फॉर्म अभी सर्वर पर डेटा नहीं भेजता। कृपया",
            gu: "આભાર. આ ડેમો ફોર્મ હજી સર્વર પર ડેટા મોકલતું નથી. કૃપા કરીને",
          })}{" "}
          <a className="font-semibold text-primary underline" href={mailto}>
            {pick(language, {
              en: "Email Us",
              hi: "ईमेल करें",
              gu: "ઈમેલ કરો",
            })}
          </a>{" "}
          {pick(language, {
            en: "to send your enquiry.",
            hi: "का उपयोग करके अपनी पूछताछ भेजें।",
            gu: "દ્વારા તમારી પૂછપરછ મોકલો.",
          })}
        </p>
      ) : null}
    </form>
  );
}
