// Homepage + About content that is not a service or a project.
// Edit here — no component changes needed.

import { siteConfig } from "@/config/site";

export type MediaImage = { src: string; alt: string; width: number; height: number };

/** The hero. Written for the first five seconds: what ZAIMEX builds, for whom, and what to do next. */
export const heroContent = {
  title: "Dashboards, automation and websites for growing businesses.",
  lead: "ZAIMEX turns scattered data and repetitive manual work into dashboards, automated workflows and websites a growing business can rely on.",
  primaryCta: { label: siteConfig.ctas.primary, href: "/contact" },
  secondaryCta: { label: "See our work", href: "/portfolio" },
  /** Only concrete tools that appear in services.ts / projects.ts. */
  toolsLabel: "Tools we work in",
  tools: ["Excel", "Power BI", "Power Query", "Python", "SQL", "n8n", "Next.js"],
  /**
   * OPTIONAL real hero image (a dashboard, workflow or project screenshot).
   * Leave undefined to show the honest outline diagram instead. Example:
   *   { src: "/images/work/retail-sales-intelligence/cover.png", alt: "…", width: 1600, height: 1000 }
   */
  media: undefined as MediaImage | undefined,
  /** Caption shown under the outline diagram (never shown for a real image). */
  fallbackCaption: "Illustrative layout, not a client result.",
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
