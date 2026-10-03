import { MapPin } from "lucide-react";
import { aboutContent } from "@/config/home";
import { getProjectBySlug } from "@/config/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PeopleGrid } from "@/components/home/PeopleGrid";

// Compact, factual homepage version. The fuller version lives on /about.
export function WhoIsBehindZaimex() {
  const industries = aboutContent.industries.filter((industry) =>
    industry.evidence.some((slug) => getProjectBySlug(slug)),
  );

  return (
    <section className="border-b border-border">
      <div className="container-page py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <SectionHeading
            eyebrow="About"
            title={aboutContent.heading}
            description={aboutContent.summary}
            className="max-w-xl"
          />

          <div className="flex shrink-0 flex-col gap-5 md:w-64 md:pt-1">
            {aboutContent.location ? (
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <MapPin size={16} strokeWidth={1.8} className="shrink-0 text-muted" aria-hidden="true" />
                {aboutContent.location}
              </div>
            ) : null}
            {industries.length > 0 ? (
              <div>
                <p className="text-xs font-medium text-muted">Industries we&apos;ve worked in</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <span
                      key={industry.name}
                      className="text-data rounded-full border border-border px-3 py-1 text-xs text-muted"
                    >
                      {industry.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10">
          <PeopleGrid people={aboutContent.people} />
        </div>
      </div>
    </section>
  );
}
