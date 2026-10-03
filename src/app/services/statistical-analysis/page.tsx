import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getServiceBySlug } from "@/config/services";
import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/structuredData";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";

const SLUG = "statistical-analysis";

export function generateMetadata(): Metadata {
  const service = getServiceBySlug(SLUG);
  if (!service) return {};
  return buildMetadata({
    title: `${service.shortTitle} Services`,
    description: service.heroDescription,
    path: `/services/${SLUG}`,
  });
}

export default function ServicePage() {
  const service = getServiceBySlug(SLUG);
  if (!service) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          serviceSchema({ name: service.shortTitle, description: service.heroDescription, path: `/services/${SLUG}` }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.shortTitle, path: `/services/${SLUG}` },
          ]),
        ])}
      />
      <ServiceDetailTemplate service={service} />
    </>
  );
}
