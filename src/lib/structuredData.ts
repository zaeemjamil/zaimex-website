import { siteConfig } from "@/config/site";
import { socials } from "@/config/socials";

export function organizationSchema() {
  const sameAs = [socials.linkedin, socials.instagram, socials.github].filter((url) => url && url !== "#");

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function serviceSchema(params: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: params.name,
    name: params.name,
    description: params.description,
    url: new URL(params.path, siteConfig.url).toString(),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}

/** Renders a <script type="application/ld+json"> tag for the given schema object(s).
 * Escapes '<' so a value can never prematurely close the surrounding </script> tag. */
export function jsonLd(schema: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
  };
}
