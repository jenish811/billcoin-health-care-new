import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3", className)}
      aria-label="Billcoin Health Care"
    >
      {/* Replace logo file at `public/images/web_logo.png` */}
      <span className="rounded-[22px] bg-white/96 px-3 py-2.5 shadow-[var(--shadow-soft)] ring-1 ring-border/80 backdrop-blur sm:px-4 sm:py-3.5">
        <span className="relative block h-8 w-28 sm:h-11 sm:w-40">
          <Image
            src="/images/web_logo.png"
            alt="Billcoin"
            fill
            className="object-contain"
            sizes="160px"
            priority
          />
        </span>
      </span>
      <span className="sr-only">Billcoin Health Care</span>
    </Link>
  );
}
