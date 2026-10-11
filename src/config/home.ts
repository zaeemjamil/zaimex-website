// Homepage + About content that is not a service or a project.
// Edit here — no component changes needed.

import { siteConfig } from "@/config/site";

export type MediaImage = { src: string; alt: string; width: number; height: number };

/**
 * The hero. Written for the first five seconds: what ZAIMEX does, and what to
 * do next. The visual is <ConceptFlow> (ZAIMEX's own five-stage framing, not
 * a project mockup) — deliberately not a dashboard/screenshot slot, so it
 * needs no "not a client result" caption. Real project evidence belongs on
 * the Work page and in service pages (via <ArtifactFrame>), not the hero.
 */
export const heroContent = {
  title: "Technology that turns business problems into practical solutions.",
  lead: "ZAIMEX combines data analysis, business intelligence, automation, AI workflows and web development to solve specific business problems — not technology for its own sake.",
  primaryCta: { label: siteConfig.ctas.primary, href: "/contact" },
  secondaryCta: { label: "Explore Services", href: "/services" },
  /** Only concrete tools that appear in services.ts / projects.ts. */
  toolsLabel: "Tools we work in",
  tools: ["Excel", "Power BI", "Power Query", "Python", "SQL", "n8n", "Next.js"],
};

/** Section copy for the six homepage sections. */
export const homeSections = {
  whatWeDo: {
    title: "What we do",
    description: "Four areas of work. Each starts from a problem a business already has.",
  },
  work: {
    title: "Selected work",
    description: "Each build is labeled for what it is: an internal build, sample data, a concept or verified client work.",
    linkLabel: "View all work",
  },
};

/**
 * "Who is behind ZAIMEX". Only facts that exist today. Add `people` when real
 * information is available — each entry renders automatically on the homepage
 * and /about, and nothing renders for an empty list.
 */
export type Person = {
  name: string;
  role: string;
  bio?: string;
  photo?: MediaImage;
};

export const aboutContent = {
  heading: "Who is behind ZAIMEX",
  summary:
    "ZAIMEX is a technology and digital solutions startup. It combines data analysis, business intelligence, automation, AI workflows and web development to solve specific business problems.",
  /** Extra paragraphs used on /about only. */
  details: [
    "The projects on the Work page are labeled for what they are: internal builds, builds on sample data and concept work. Anything that is verified client work is labeled as such.",
  ],
  location: siteConfig.contact.country,
  people: [] as Person[],
  /**
   * Industries are listed only where a project provides evidence. Remove or add
   * entries as real work changes; entries whose project slug doesn't exist are ignored.
   */
  industries: [{ name: "Retail", evidence: ["retail-sales-intelligence"] }] as { name: string; evidence: string[] }[],
};
