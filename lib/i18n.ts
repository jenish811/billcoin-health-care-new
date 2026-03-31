export type AppLanguage = "en" | "hi" | "gu";
export type ThemeMode = "light" | "dark";

export type LocalizedText = {
  en: string;
  hi: string;
  gu: string;
};

export const languageOptions: Array<{
  value: AppLanguage;
  shortLabel: string;
  label: LocalizedText;
}> = [
  {
    value: "en",
    shortLabel: "EN",
    label: { en: "English", hi: "अंग्रेज़ी", gu: "અંગ્રેજી" },
  },
  {
    value: "hi",
    shortLabel: "हिं",
    label: { en: "Hindi", hi: "हिंदी", gu: "હિન્દી" },
  },
  {
    value: "gu",
    shortLabel: "ગુ",
    label: { en: "Gujarati", hi: "गुजराती", gu: "ગુજરાતી" },
  },
];

export function pick(language: AppLanguage, text: LocalizedText) {
  return text[language];
}

export function getDocumentLang(language: AppLanguage) {
  if (language === "hi") return "hi-IN";
  if (language === "gu") return "gu-IN";
  return "en-IN";
}

