"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroContent } from "@/config/home";
import { ConceptFlow } from "@/components/home/ConceptFlow";

// One-shot entrance only. No looping animation anywhere in the hero.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const { title, lead, primaryCta, secondaryCta, tools, toolsLabel } = heroContent;

  return (
    <section className="border-b border-border">
      <div className="container-page py-16 md:py-24 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.h1 variants={item} className="text-display text-balance max-w-[40rem] text-foreground">
              {title}
            </motion.h1>
            <motion.p variants={item} className="text-lead mt-6 max-w-xl">
              {lead}
            </motion.p>
            <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                {primaryCta.label}
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40"
              >
                {secondaryCta.label}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:pt-2"
          >
            <p className="text-label text-muted">How we think about it</p>
            <div className="mt-4">
              <ConceptFlow />
            </div>
          </motion.div>
        </div>

        <div className="mt-14 flex flex-col gap-x-8 gap-y-2 border-t border-border pt-6 md:mt-16 sm:flex-row sm:items-baseline">
          <p className="text-xs text-muted">{toolsLabel}</p>
          <p className="text-data text-[0.8125rem] leading-relaxed text-foreground/75">{tools.join("  ·  ")}</p>
        </div>
      </div>
    </section>
  );
}
