// Central SEO configuration for static pages.
// Dynamic routes (service and work detail pages) generate their
// metadata directly from /config/services.ts and /config/projects.ts.

export const seoDefaults = {
  titleTemplate: "%s | ZAIMEX",
  siteName: "ZAIMEX",
  locale: "en_US",
  // 1200x630 PNG: the official ZAIMEX logo mark on the brand blue background.
  // PNG (not SVG) because several social platforms don't reliably render SVG og:image tags.
  ogImage: "/images/brand/og-cover.png",
  twitterHandle: "", // TODO: add X/Twitter handle if applicable
} as const;

export const pageSeo = {
  home: {
    title: "ZAIMEX | Dashboards, Automation, AI Workflows & Websites",
    description:
      "ZAIMEX is a technology and digital solutions company building dashboards, automation, AI workflows and websites for growing businesses.",
  },
  services: {
    title: "Services | Dashboards, Data Analysis, Automation, Websites",
    description:
      "ZAIMEX services: dashboards and reporting, data preparation and analysis, automation and AI workflows, and websites with digital strategy.",
  },
  portfolio: {
    title: "Work | Dashboards, Analysis & Web Projects",
    description:
      "Selected ZAIMEX work: dashboards, data analysis and web projects, each labeled as an internal build, sample-data build, concept or verified client work.",
  },
  about: {
    title: "About | Who Is Behind ZAIMEX",
    description:
      "ZAIMEX is a technology and digital solutions startup working across data analysis, dashboards, automation, AI workflows and web development.",
  },
  contact: {
    title: "Contact | Start a Project",
    description:
      "Tell ZAIMEX what you're trying to achieve and we'll help identify the right technology, data or automation solution.",
  },
  privacy: {
    title: "Privacy Policy",
    description: "How ZAIMEX collects, uses and protects information submitted through this website.",
  },
  terms: {
    title: "Terms of Service",
    description: "The terms that govern use of the ZAIMEX website and engagement with ZAIMEX services.",
  },
} as const;

export type PageSeoKey = keyof typeof pageSeo;
