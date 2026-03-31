"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { stagger } from "@/lib/motion";

export function Stagger(props: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      {...props}
    />
  );
}

