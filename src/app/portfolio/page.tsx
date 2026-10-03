import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { pageSeo } from "@/config/seo";
import { projects } from "@/config/projects";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { CTASection } from "@/components/ui/CTASection";
import { ctaContent } from "@/config/cta";

export const metadata: Metadata = buildMetadata({
  title: pageSeo.portfolio.title,
  description: pageSeo.portfolio.description,
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-10">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Work", href: "/portfolio" }]} />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page py-12 md:py-16">
          <SectionHeading
            level="h1"
            eyebrow="Work"
            title="Our Work"
            description="Dashboards, data analysis and web projects. Each one is labeled for what it is — an internal build, sample data, a concept, or verified client work."
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page py-16 md:py-20">
          <ProjectGrid projects={projects} />
        </div>
      </section>

      <CTASection {...ctaContent.work} />
    </>
  );
}
