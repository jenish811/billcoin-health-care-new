"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { easing, fadeUp } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function Reveal({ className, delay = 0, ...props }: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, ease: easing, delay }}
      className={cn(className)}
      {...props}
    />
  );
}

