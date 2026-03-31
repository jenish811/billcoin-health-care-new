import type { AppLanguage } from "@/lib/i18n";

const locales: Record<AppLanguage, string> = {
  en: "en-IN",
  hi: "hi-IN",
  gu: "gu-IN",
};

export function formatINR(value: number, language: AppLanguage = "en") {
  return new Intl.NumberFormat(locales[language], {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
