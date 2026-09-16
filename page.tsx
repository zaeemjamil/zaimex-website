import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { pageSeo } from "@/config/seo";
import { Hero } from "@/components/home/Hero";
import { CapabilitiesStrip } from "@/components/home/CapabilitiesStrip";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { ZaimexFramework } from "@/components/home/ZaimexFramework";
import { WhyZaimex } from "@/components/home/WhyZaimex";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { CTASection } from "@/components/ui/CTASection";

export const metadata: Metadata = buildMetadata({
  title: pageSeo.home.title,
  description: pageSeo.home.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilitiesStrip />
      <ServicesPreview />
      <SolutionsSection />
      <ZaimexFramework />
      <WhyZaimex />
      <FeaturedWork />
      <CTASection />
    </>
  );
}
