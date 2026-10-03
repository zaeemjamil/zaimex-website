import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { pageSeo } from "@/config/seo";
import { aboutContent } from "@/config/home";
import { getProjectBySlug } from "@/config/projects";
import { ctaContent } from "@/config/cta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PeopleGrid } from "@/components/home/PeopleGrid";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/ui/CTASection";

export const metadata: Metadata = buildMetadata({
  title: pageSeo.about.title,
  description: pageSeo.about.description,
  path: "/about",
});

export default function AboutPage() {
  const industries = aboutContent.industries.filter((industry) =>
    industry.evidence.some((slug) => getProjectBySlug(slug)),
  );

  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-10">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page py-12 md:py-16">
          <SectionHeading level="h1" eyebrow="About" title={aboutContent.heading} description={aboutContent.summary} />

          {aboutContent.details.length > 0 ? (
            <div className="mt-4 flex max-w-2xl flex-col gap-3">
              {aboutContent.details.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-foreground/80">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            {aboutContent.location ? (
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <MapPin size={16} strokeWidth={1.8} className="shrink-0 text-muted" aria-hidden="true" />
                {aboutContent.location}
              </div>
            ) : null}
            {industries.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted">Industries we&apos;ve worked in:</span>
                {industries.map((industry) => (
                  <span
                    key={industry.name}
                    className="text-data rounded-full border border-border px-3 py-1 text-xs text-muted"
                  >
                    {industry.name}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {aboutContent.people.length > 0 ? (
        <section className="border-b border-border bg-surface">
          <div className="container-page py-16 md:py-20">
            <SectionHeading title="Who you'll work with" />
            <div className="mt-10">
              <PeopleGrid people={aboutContent.people} />
            </div>
          </div>
        </section>
      ) : null}

      <Testimonials />

      <CTASection {...ctaContent.about} />
    </>
  );
}
