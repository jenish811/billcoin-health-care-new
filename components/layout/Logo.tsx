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
      <span className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm ring-1 ring-border backdrop-blur sm:py-3.5 dark:bg-white">
        <span className="relative block h-10 w-32 sm:h-11 sm:w-40">
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
