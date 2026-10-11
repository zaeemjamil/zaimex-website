import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Service, OfferingId } from "@/config/services";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";
import { ctaContent } from "@/config/cta";
import { projects, getProjectLabel } from "@/config/projects";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/CTASection";
import { FAQ } from "@/components/ui/FAQ";
import { ProcessSteps } from "@/components/process/ProcessSteps";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ArtifactFrame, type ArtifactKind } from "@/components/visuals/ArtifactFrame";
import { getIcon } from "@/lib/icons";

// Which honest outline diagram represents each offering area until a real
// product screenshot is attached to a service (see ArtifactFrame).
const OFFERING_ARTIFACT_KIND: Record<OfferingId, ArtifactKind> = {
  dashboards: "dashboard",
  analysis: "analysis",
  automation: "workflow",
  web: "website",
};

export function ServiceDetailTemplate({ service }: { service: Service }) {
  const Icon = getIcon(service.icon);
  const related = services.filter((s) => service.relatedServices.includes(s.slug));
  const relatedWork = projects.filter((project) => project.offering === service.offering);

  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-10">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: service.shortTitle, href: `/services/${service.slug}` },
            ]}
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page grid items-center gap-14 py-12 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <p className="text-label text-muted">{service.heroEyebrow}</p>
            <h1 className="text-h1 text-balance mt-5 max-w-xl text-foreground">{service.heroTitle}</h1>
            <p className="text-lead mt-5 max-w-lg">{service.heroDescription}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                {siteConfig.ctas.primary}
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent-text"
              >
                {siteConfig.ctas.secondary}
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface">
            <span className="absolute left-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-foreground/70">
              {/* eslint-disable-next-line react-hooks/static-components -- getIcon returns a stable reference to a module-level icon component, not a new component created on each render */}
              <Icon size={20} strokeWidth={1.6} />
            </span>
            <ArtifactFrame
              kind={OFFERING_ARTIFACT_KIND[service.offering]}
              label={`Illustrative outline for ${service.shortTitle}`}
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-h3 text-foreground">{service.problem.heading}</h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-foreground/80">{service.problem.body}</p>
          </div>
          <div>
            <h2 className="text-h3 text-foreground">{service.whyItMatters.heading}</h2>
            <div className="mt-5 flex flex-col gap-5">
              {service.whyItMatters.points.map((point) => (
                <div key={point.title} className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{point.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="container-page py-16 md:py-20">
          <SectionHeading title={service.approach.heading} description={service.approach.body} />
          <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {service.approach.points.map((point, index) => (
              <li key={point} className="flex items-start gap-3 rounded-lg border border-border bg-background p-5">
                <span className="text-data text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm leading-relaxed text-foreground/85">{point}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="text-h3 text-foreground">{service.deliverables.heading}</h2>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {service.deliverables.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                  <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-foreground/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-h3 text-foreground">Technology Stack</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {service.techStack.map((tech) => (
                <span key={tech} className="text-data rounded-full border border-border px-3 py-1.5 text-xs text-muted">
                  {tech}
                </span>
              ))}
            </div>

            <h2 className="text-h3 mt-8 text-foreground">Who It&apos;s For</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {service.whoItsFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/40" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="container-page py-16 md:py-20">
          <SectionHeading eyebrow="How We Work" title="Our Process" />
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page py-16 md:py-20">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="mt-8 max-w-3xl">
            <FAQ items={service.faq} />
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-b border-border">
          <div className="container-page py-16 md:py-20">
            <SectionHeading eyebrow="Related" title="Related Services" />
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {related.map((relatedService) => (
                <ServiceCard
                  key={relatedService.slug}
                  icon={relatedService.icon}
                  title={relatedService.shortTitle}
                  description={relatedService.cardDescription}
                  href={`/services/${relatedService.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relatedWork.length > 0 ? (
        <section className="border-b border-border">
          <div className="container-page py-12 md:py-16">
            <SectionHeading title="Related work" description="Projects built in this area. Each is labeled for what it is." />
            <div className="mt-8 flex flex-col">
              {relatedWork.map((project) => (
                <Link
                  key={project.slug}
                  href={`/portfolio/${project.slug}`}
                  className="group flex items-center justify-between gap-4 border-b border-border py-5 last:border-b-0"
                >
                  <div>
                    <span className="text-base font-medium text-foreground">{project.title}</span>
                    <span className="ml-3 text-sm text-muted">{getProjectLabel(project)}</span>
                  </div>
                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent-text"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection {...ctaContent.service(service.shortTitle)} />
    </>
  );
}
