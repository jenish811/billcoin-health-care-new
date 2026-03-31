import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-border bg-card shadow-[var(--shadow-soft)] backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
