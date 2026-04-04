"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Store } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { FloatingBlobs } from "@/components/motion/FloatingBlobs";
import { easing } from "@/lib/motion";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
      <FloatingBlobs />

      <Container className="section-y relative">
        <div className="mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            Premium Home Care • Rajkot, Gujarat
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: easing, delay: 0.05 }}
            className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Advanced Cleaning for a{" "}
            <span className="bg-gradient-to-r from-primary via-primary-2 to-secondary bg-clip-text text-transparent">
              Safe & Happy Home
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing, delay: 0.12 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg"
          >
            Billcoin Health Care creates safe, hygienic, and effective home care
            solutions — designed for family comfort, everyday performance, and a
            premium brand feel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing, delay: 0.18 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="/products" variant="primary" size="lg">
              Explore Products
            </Button>
            <Button href="/contact?type=distributor" variant="outline" size="lg">
              Become a Distributor <Store className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: easing, delay: 0.24 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Badge variant="brand" className="gap-2">
              <ShieldCheck className="h-4 w-4" /> 99.9% Germ Protection
            </Badge>
            <Badge variant="soft">Trusted Home Care</Badge>
            <Badge variant="success">Safe & Effective</Badge>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}


