import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { pageSeo } from "@/config/seo";
import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { HowWeWork } from "@/components/home/HowWeWork";
import { WhoIsBehindZaimex } from "@/components/home/WhoIsBehindZaimex";
import { CTASection } from "@/components/ui/CTASection";

export const metadata: Metadata = buildMetadata({
  title: pageSeo.home.title,
  description: pageSeo.home.description,
  path: "/",
});

// Six sections, each with one job: Hero (what/who), What we do (offerings),
// Selected work (proof), How we work (process), Who is behind ZAIMEX
// (credibility), CTA (ask). See config/home.ts, config/process.ts, config/cta.ts.
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <FeaturedWork />
      <HowWeWork />
      <WhoIsBehindZaimex />
      <CTASection />
    </>
  );
}
