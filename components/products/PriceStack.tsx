"use client";

import type { AppLanguage } from "@/lib/i18n";
import { formatINR } from "@/lib/format";
import { pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function PriceStack({
  retailPrice,
  wholesalePrice,
  language,
  compact,
  className,
  reserveSecondaryRow,
}: {
  retailPrice?: number | null;
  wholesalePrice?: number | null;
  language: AppLanguage;
  compact?: boolean;
  className?: string;
  reserveSecondaryRow?: boolean;
}) {
  if (retailPrice == null && wholesalePrice == null) {
    return null;
  }

  const valueClassName = compact ? "text-lg" : "text-2xl";
  const rowClassName = compact ? "min-h-[3.5rem]" : "min-h-[4.5rem]";

  return (
    <div className={cn("space-y-3", className)}>
      {retailPrice != null ? (
        <div className={rowClassName}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/52">
            {pick(language, {
              en: "Retail Price",
              hi: "Retail Price",
              gu: "Retail Price",
            })}
          </p>
          <p className={cn("mt-1 font-semibold tracking-tight", valueClassName)}>
            {formatINR(retailPrice, language)}
          </p>
        </div>
      ) : null}

      {wholesalePrice != null ? (
        <div className={rowClassName}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/80">
            {pick(language, {
              en: "Wholesale Price",
              hi: "Wholesale Price",
              gu: "Wholesale Price",
            })}
          </p>
          <p className={cn("mt-1 font-semibold tracking-tight text-primary", valueClassName)}>
            {formatINR(wholesalePrice, language)}
          </p>
        </div>
      ) : reserveSecondaryRow ? (
        <div className={cn("invisible", rowClassName)} aria-hidden="true">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">Wholesale Price</p>
          <p className={cn("mt-1 font-semibold tracking-tight", valueClassName)}>₹0</p>
        </div>
      ) : null}
    </div>
  );
}
