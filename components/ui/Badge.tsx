import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "soft" | "brand" | "success";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default:
      "inline-flex items-center rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur dark:bg-white/5",
    soft:
      "inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground",
    brand:
      "inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20",
    success:
      "inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary ring-1 ring-secondary/20",
  };

  return <span className={cn(variants[variant], className)} {...props} />;
}

