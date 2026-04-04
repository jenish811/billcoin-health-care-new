"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getDocumentLang,
  type AppLanguage,
  type ThemeMode,
} from "@/lib/i18n";

type AppPreferencesValue = {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  mounted: boolean;
};

const AppPreferencesContext = createContext<AppPreferencesValue | null>(null);

const languageStorageKey = "billcoin-language";
const themeStorageKey = "billcoin-theme-v3";

export function AppPreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<AppLanguage>("en");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(languageStorageKey);
    const nextLanguage =
      savedLanguage === "hi" || savedLanguage === "gu" || savedLanguage === "en"
        ? savedLanguage
        : "en";

    const savedTheme = window.localStorage.getItem(themeStorageKey);
    const nextTheme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : "dark";

    setLanguage(nextLanguage);
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(languageStorageKey, language);
    document.documentElement.lang = getDocumentLang(language);
  }, [language, mounted]);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(themeStorageKey, theme);
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, mounted]);

  const value = useMemo(
    () => ({ language, setLanguage, theme, setTheme, mounted }),
    [language, theme, mounted],
  );

  return (
    <AppPreferencesContext.Provider value={value}>
      {children}
    </AppPreferencesContext.Provider>
  );
}

export function useAppPreferences() {
  const context = useContext(AppPreferencesContext);

  if (!context) {
    throw new Error("useAppPreferences must be used within AppPreferencesProvider");
  }

  return context;
}
