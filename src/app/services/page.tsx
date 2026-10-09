import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { pageSeo } from "@/config/seo";
import { offerings, getServicesForOffering } from "@/config/services";
import { ctaContent } from "@/config/cta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceRow } from "@/components/cards/ServiceRow";
import { CTASection } from "@/components/ui/CTASection";

export const metadata: Metadata = buildMetadata({
  title: pageSeo.services.title,
  description: pageSeo.services.description,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-10">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page py-12 md:py-16">
          <SectionHeading
            level="h1"
            eyebrow="Services"
            title="Nine Services, Four Areas of Work."
            description="Each service below can stand alone or combine with others into a complete solution."
          />
        </div>
      </section>

      {offerings.map((offering, groupIndex) => (
        <section key={offering.id} id={offering.id} className="scroll-mt-20 border-b border-border">
          <div className="container-page py-12 md:py-14">
            <div className="flex items-baseline gap-3">
              <span className="text-data text-xs text-muted">{String(groupIndex + 1).padStart(2, "0")}</span>
              <h2 className="text-h3 text-foreground">{offering.title}</h2>
            </div>
            <p className="mt-2 max-w-xl text-sm text-muted">{offering.forWhom}</p>
            <div className="mt-6">
              {getServicesForOffering(offering.id).map((service, serviceIndex) => (
                <ServiceRow key={service.slug} service={service} index={serviceIndex} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTASection {...ctaContent.services} />
    </>
  );
}
