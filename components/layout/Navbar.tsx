"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Globe2, Menu, MessageCircle, MoonStar, SunMedium, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { navLinks, siteConfig } from "@/data/site";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { languageOptions, pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/",
    label: { en: "Home", hi: "होम", gu: "હોમ" },
  },
  {
    href: "/about",
    label: { en: "About", hi: "हमारे बारे में", gu: "અમારા વિશે" },
  },
  {
    href: "/products",
    label: { en: "Products", hi: "प्रोडक्ट्स", gu: "પ્રોડક્ટ્સ" },
  },
  {
    href: "/brochure",
    label: { en: "Brochure", hi: "ब्रोशर", gu: "બ્રોશર" },
  },
  {
    href: "/contact",
    label: { en: "Contact", hi: "संपर्क", gu: "સંપર્ક" },
  },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, theme, setTheme } = useAppPreferences();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const activeHref = useMemo(() => {
    if (pathname === "/") return "/";
    const match = navLinks.find(
      (link) => link.href !== "/" && pathname.startsWith(link.href),
    );
    return match?.href ?? "/";
  }, [pathname]);

  const whatsAppHref = useMemo(() => {
    return createWhatsAppLink({
      phone: siteConfig.contact.phone,
      text: pick(language, {
        en: "Hi Billcoin Health Care, I want details about your products.",
        hi: "नमस्ते Billcoin Health Care, मुझे आपके प्रोडक्ट्स की जानकारी चाहिए।",
        gu: "નમસ્તે Billcoin Health Care, મને તમારા પ્રોડક્ટ્સ વિશે માહિતી જોઈએ છે.",
      }),
    });
  }, [language]);

  const themeLabel = theme === "dark"
    ? pick(language, {
        en: "Dark",
        hi: "डार्क",
        gu: "ડાર્ક",
      })
    : pick(language, {
        en: "Light",
        hi: "लाइट",
        gu: "લાઇટ",
      });

  const menuLabel = pick(language, {
    en: "Menu",
    hi: "मेन्यू",
    gu: "મેનુ",
  });

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b transition duration-200 backdrop-blur-2xl",
          scrolled
            ? "bg-background/95 shadow-[var(--shadow-soft)]"
            : "bg-background/90",
        )}
      >
        <Container className="flex min-h-18 items-center justify-between gap-3 py-3 sm:gap-4">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navItems.map((link) => {
              const active = activeHref === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition",
                    active
                      ? "bg-primary/12 text-primary glow-ring"
                      : "text-foreground/70 hover:bg-card hover:text-foreground",
                  )}
                >
                  {pick(language, link.label)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold text-foreground transition hover:bg-background/90"
              aria-label={pick(language, {
                en: "Toggle dark mode",
                hi: "डार्क मोड बदलें",
                gu: "ડાર્ક મોડ બદલો",
              })}
            >
              {theme === "dark" ? (
                <MoonStar className="h-4 w-4 text-primary" />
              ) : (
                <SunMedium className="h-4 w-4 text-secondary" />
              )}
              {themeLabel}
            </button>
            <Button href={whatsAppHref} target="_blank" rel="noreferrer" size="sm">
              {pick(language, {
                en: "Buy on WhatsApp",
                hi: "व्हाट्सऐप पर पूछें",
                gu: "વોટ્સએપ પર પૂછો",
              })}
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition hover:bg-background/90"
              aria-label={pick(language, {
                en: "Toggle dark mode",
                hi: "डार्क मोड बदलें",
                gu: "ડાર્ક મોડ બદલો",
              })}
            >
              {theme === "dark" ? (
                <MoonStar className="h-4 w-4 text-primary" />
              ) : (
                <SunMedium className="h-4 w-4 text-secondary" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition hover:bg-background/90"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[59] bg-slate-950/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-label={pick(language, {
                en: "Close side menu",
                hi: "साइड मेन्यू बंद करें",
                gu: "સાઇડ મેનુ બંધ કરો",
              })}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="fixed left-0 top-0 z-[60] flex h-dvh w-[min(88vw,360px)] flex-col border-r border-border bg-background shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                    {menuLabel}
                  </p>
                  <p className="mt-1 text-sm text-foreground/70">
                    {pick(language, {
                      en: "Explore products and contact Billcoin fast.",
                      hi: "प्रोडक्ट्स देखें और Billcoin से जल्दी जुड़ें।",
                      gu: "પ્રોડક્ટ્સ જુઓ અને Billcoin સાથે ઝડપથી જોડાઓ.",
                    })}
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card"
                  onClick={() => setOpen(false)}
                  aria-label={pick(language, {
                    en: "Close menu",
                    hi: "मेन्यू बंद करें",
                    gu: "મેનુ બંધ કરો",
                  })}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6">
                <div className="grid gap-2">
                  {navItems.map((link) => {
                    const active = activeHref === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                          active
                            ? "border-primary/20 bg-primary/12 text-primary"
                            : "border-border bg-card text-foreground/80 hover:bg-muted",
                        )}
                      >
                        {pick(language, link.label)}
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-[28px] border border-border bg-card p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Globe2 className="h-4 w-4 text-primary" />
                    {pick(language, {
                      en: "Language",
                      hi: "भाषा",
                      gu: "ભાષા",
                    })}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {languageOptions.map((option) => {
                      const active = language === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setLanguage(option.value)}
                          className={cn(
                            "rounded-full border px-4 py-2 text-sm font-semibold transition",
                            active
                              ? "border-primary bg-primary/12 text-primary"
                              : "border-border bg-background text-foreground/70",
                          )}
                        >
                          {option.shortLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 rounded-[28px] border border-border bg-card p-4">
                  <button
                    type="button"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex w-full items-center justify-between gap-3 rounded-2xl bg-background px-4 py-3 text-left"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {pick(language, {
                          en: "Theme",
                          hi: "थीम",
                          gu: "થીમ",
                        })}
                      </p>
                      <p className="mt-1 text-xs text-foreground/60">{themeLabel}</p>
                    </div>
                    {theme === "dark" ? (
                      <MoonStar className="h-5 w-5 text-primary" />
                    ) : (
                      <SunMedium className="h-5 w-5 text-secondary" />
                    )}
                  </button>
                </div>

                <div className="mt-6 grid gap-3">
                  <Button
                    href={whatsAppHref}
                    target="_blank"
                    rel="noreferrer"
                    fullWidth
                    onClick={() => setOpen(false)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {pick(language, {
                      en: "Buy on WhatsApp",
                      hi: "व्हाट्सऐप पर पूछें",
                      gu: "વોટ્સએપ પર પૂછો",
                    })}
                  </Button>
                  <div className="rounded-[28px] border border-border bg-card p-4 text-sm text-foreground/70">
                    <p className="font-semibold text-foreground">
                      {pick(language, {
                        en: "Direct contact",
                        hi: "सीधा संपर्क",
                        gu: "સીધો સંપર્ક",
                      })}
                    </p>
                    <a className="mt-2 block hover:text-foreground" href={`tel:${siteConfig.contact.phone}`}>
                      {siteConfig.contact.phone}
                    </a>
                    <a
                      className="mt-1 block hover:text-foreground"
                      href={`mailto:${siteConfig.contact.email}`}
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function LanguageSwitcher() {
  const { language, setLanguage } = useAppPreferences();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
      {languageOptions.map((option) => {
        const active = option.value === language;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLanguage(option.value)}
            className={cn(
              "rounded-full px-3 py-2 text-xs font-semibold transition",
              active
                ? "bg-primary/12 text-primary"
                : "text-foreground/65 hover:bg-muted hover:text-foreground",
            )}
            aria-pressed={active}
          >
            {option.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
