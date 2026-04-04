"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};

type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children"> & {
    href: string;
  };

type ButtonAsButton = BaseProps &
  Omit<HTMLMotionProps<"button">, "className" | "children"> & {
    href?: never;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const MotionButton = motion.create("button");

function isLinkProps(props: ButtonProps): props is ButtonAsLink {
  return typeof (props as ButtonAsLink).href === "string";
}

export function Button({
  ...buttonProps
}: ButtonProps) {
  if (isLinkProps(buttonProps)) {
    const {
      href,
      variant = "primary",
      size = "md",
      fullWidth,
      className,
      children,
      ...rest
    } = buttonProps;

    const classes = getButtonClasses({ variant, size, fullWidth, className });
    return (
      <Link
        href={href}
        className={cn(
          classes,
          "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        )}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const {
    variant = "primary",
    size = "md",
    fullWidth,
    className,
    children,
    ...rest
  } = buttonProps;

  const classes = getButtonClasses({ variant, size, fullWidth, className });

  return (
    <MotionButton
      className={classes}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...rest}
    >
      {children}
    </MotionButton>
  );
}

function getButtonClasses({
  variant,
  size,
  fullWidth,
  className,
}: Pick<BaseProps, "variant" | "size" | "fullWidth" | "className">) {
  const base =
    "inline-flex transform-gpu items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

  const sizes: Record<ButtonSize, string> = {
    sm: "h-10 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  };

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-primary text-[#140f22] shadow-[var(--shadow-brand)] hover:bg-primary-2",
    secondary:
      "bg-secondary text-[#140f22] shadow-[var(--shadow-brand-soft)] hover:brightness-105",
    outline:
      "border border-border bg-card text-foreground hover:bg-background/90",
    ghost: "text-foreground hover:bg-muted",
  };

  return cn(
    base,
    sizes[size ?? "md"],
    variants[variant ?? "primary"],
    fullWidth && "w-full",
    className,
  );
}
