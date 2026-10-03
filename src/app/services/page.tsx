import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { pageSeo } from "@/config/seo";
import { offerings, getServicesForOffering } from "@/config/services";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/cards/ServiceCard";
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

      {offerings.map((offering) => (
        <section key={offering.id} className="border-b border-border">
          <div className="container-page py-14 md:py-16">
            <h2 className="text-h3 text-foreground">{offering.title}</h2>
            <p className="mt-2 max-w-xl text-sm text-muted">{offering.forWhom}</p>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {getServicesForOffering(offering.id).map((service) => (
                <ServiceCard
                  key={service.slug}
                  icon={service.icon}
                  title={service.shortTitle}
                  description={service.cardDescription}
                  list={service.cardList}
                  href={`/services/${service.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTASection />
    </>
  );
}
