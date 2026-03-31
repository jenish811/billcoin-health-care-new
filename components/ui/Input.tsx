import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground shadow-sm outline-none placeholder:text-foreground/40 focus:border-primary/40 focus:ring-2 focus:ring-primary/15",
        className,
      )}
      {...props}
    />
  );
}
