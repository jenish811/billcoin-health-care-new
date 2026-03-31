"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { Card } from "@/components/ui/Card";
import { pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function BrochureGrid({
  pages,
}: {
  pages: Array<{ page: number; image: string }>;
}) {
  const { language } = useAppPreferences();
  const [active, setActive] = useState<number | null>(null);
  const activePage = useMemo(
    () => pages.find((page) => page.page === active) ?? null,
    [active, pages],
  );

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <button
            key={page.page}
            type="button"
            onClick={() => setActive(page.page)}
            className="text-left"
          >
            <Card className="group overflow-hidden transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
              <div className="relative aspect-[3/4] w-full bg-muted">
                <Image
                  src={page.image}
                  alt={`Brochure page ${page.page}`}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold">
                  {pick(language, {
                    en: "Page",
                    hi: "पेज",
                    gu: "પેજ",
                  })}{" "}
                  {page.page}
                </p>
                <p className="mt-1 text-xs text-foreground/60">
                  {pick(language, {
                    en: "Tap to view full size",
                    hi: "पूरा देखने के लिए टैप करें",
                    gu: "પૂર્ણ જોવા માટે ટેપ કરો",
                  })}
                </p>
              </div>
            </Card>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activePage ? (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Brochure page ${activePage.page}`}
          >
            <motion.div
              initial={{ scale: 0.98, y: 8, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className={cn(
                "relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl",
              )}
            >
              <button
                type="button"
                className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/20"
                onClick={() => setActive(null)}
                aria-label={pick(language, {
                  en: "Close preview",
                  hi: "प्रीव्यू बंद करें",
                  gu: "પ્રીવ્યૂ બંધ કરો",
                })}
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative aspect-[3/4] w-full bg-black/20">
                <Image
                  src={activePage.image}
                  alt={`Brochure page ${activePage.page}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 900px"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
