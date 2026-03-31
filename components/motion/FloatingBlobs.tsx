"use client";

import { motion } from "framer-motion";

export function FloatingBlobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl"
        animate={{ x: [0, 26, -8, 0], y: [0, 18, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-24 -right-24 h-80 w-80 rounded-full bg-secondary/18 blur-3xl"
        animate={{ x: [0, -18, 10, 0], y: [0, 18, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-140px] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/18 blur-3xl"
        animate={{ scale: [1, 1.08, 0.98, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

