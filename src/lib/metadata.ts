import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { seoDefaults } from "@/config/seo";

type BuildMetadataInput = {
  title: string;
  description: string;
  /** Path only, e.g. "/services" or "/portfolio/statflow-ai" */
  path: string;
  /** Set false for pages that should not be indexed (rare) */
  index?: boolean;
};

export function buildMetadata({ title, description, path, index = true }: BuildMetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url,
      siteName: seoDefaults.siteName,
      locale: seoDefaults.locale,
      type: "website",
      images: [{ url: seoDefaults.ogImage, width: 1200, height: 630, alt: seoDefaults.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seoDefaults.ogImage],
    },
  };
}
