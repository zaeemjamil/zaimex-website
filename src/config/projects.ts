// Central portfolio configuration.
// Every work card and case-study page is generated from this array.
//
// HONESTY RULES
// - Never fabricate clients, results or metrics.
// - Every project carries an honest label. `verifiedClientWork: true` is the ONLY
//   way a project is shown as client work — set it only once a project is a
//   confirmed, attributable client deliverable. Otherwise `status` says what the
//   project really is: an internal build, a build on sample data, or a concept.
//
// ADDING REAL SCREENSHOTS LATER (no component changes needed)
// 1. Put the images in /public/images/work/<slug>/ (for example cover.png).
// 2. Set `media` on the project: { src, alt, width, height }. It replaces the
//    outline diagram on cards, the homepage and the top of the case study.
// 3. Optionally add `screenshots: [...]` for extra views at the bottom of the
//    case study. Nothing is rendered there until at least one exists.

import { getOffering, type OfferingId } from "@/config/services";

export type ProjectStatus = "internal-build" | "sample-data" | "concept";

/** Which outline diagram is shown until real media exists. */
export type ArtifactKind = "dashboard" | "analysis" | "website" | "report" | "workflow";

export type ProjectMedia = {
  src: string;
  /** Describe what the image shows (for screen readers). */
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  /** The offering this project demonstrates (see services.ts). */
  offering: OfferingId;
  tagline: string;
  description: string;
  techStack: string[];
  /**
   * Whether this is verified, completed work for a real client. When false the
   * card and case study show the honest `status` label instead.
   */
  verifiedClientWork: boolean;
  status: ProjectStatus;
  kind: ArtifactKind;
  /** Shown in the homepage "Selected work" section (keep to 2–3). */
  featured?: boolean;
  media?: ProjectMedia;
  screenshots?: ProjectMedia[];
  caseStudy: {
    overview: string;
    /** The problem and what the project set out to do about it. */
    problem: string;
    approach: string[];
    /** One or two sentences on what was built. */
    built: string;
    /** What the project consists of / delivers. */
    deliverables: string[];
  };
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  "internal-build": "Internal build",
  "sample-data": "Sample data",
  concept: "Concept",
};

/** The honest label shown on every card and case study. */
export function getProjectLabel(project: Project): string {
  return project.verifiedClientWork ? "Verified client work" : projectStatusLabels[project.status];
}

export function getProjectOfferingTitle(project: Project): string {
  return getOffering(project.offering).title;
}

export const projects: Project[] = [
  {
    slug: "retail-sales-intelligence",
    title: "Retail Sales Intelligence",
    offering: "dashboards",
    tagline: "Interactive Excel dashboard",
    description:
      "An interactive Excel dashboard consolidating retail sales data into a single view for tracking performance across products and locations.",
    techStack: ["Excel", "Power Query", "PivotTables"],
    verifiedClientWork: false,
    status: "sample-data",
    kind: "dashboard",
    caseStudy: {
      overview:
        "An interactive Excel dashboard that replaces manual, spreadsheet-based sales reporting with a single filterable view.",
      problem:
        "Retail sales data often sits in several exports that are rebuilt by hand for every reporting cycle, which makes updates slow and results easy to get inconsistent. The aim was a single interactive dashboard that can be refreshed and filtered without manual rework.",
      approach: [
        "Mapped a typical spreadsheet-based sales reporting workflow",
        "Modeled the data using Power Query for repeatable transformation",
        "Designed a dashboard layout around key sales and product metrics",
        "Added filters for time period, product category and location",
      ],
      built:
        "The dashboard brings sales, product and location data together in one workbook, with Power Query handling data transformation and pivot-based visuals presenting trends clearly.",
      deliverables: [
        "A structured, interactive Excel dashboard",
        "Sales, product and location data in one workbook",
        "Filters and slicers for period, category and location",
        "Trend and comparison visualizations",
        "Power Query data model with a repeatable refresh",
        "Documented refresh process",
      ],
    },
  },
  {
    slug: "business-performance-analytics",
    title: "Business Performance Analytics",
    offering: "dashboards",
    tagline: "Interactive Power BI dashboard",
    description:
      "A Power BI dashboard bringing together operational and financial KPIs into a single governed reporting layer.",
    techStack: ["Power BI", "DAX", "Data modeling"],
    verifiedClientWork: false,
    status: "sample-data",
    kind: "dashboard",
    featured: true,
    caseStudy: {
      overview:
        "A Power BI reporting project focused on unifying operational and financial performance metrics behind a single, well-modeled data layer.",
      problem:
        "Performance metrics often live in separate systems and spreadsheets, which makes a consistent, business-wide view hard to get. The aim was a governed Power BI data model and dashboard that presents key performance indicators clearly and consistently.",
      approach: [
        "Mapped relevant data sources and reporting requirements",
        "Built a structured data model with reusable DAX measures",
        "Designed report pages around core performance questions",
        "Validated calculations against manual reference figures",
      ],
      built:
        "A multi-page Power BI report presents financial and operational KPIs from a single governed data model, with consistent measures used across every page.",
      deliverables: [
        "A Power BI data model and multi-page report",
        "Reusable, documented DAX measures",
        "Consistent KPI definitions across every page",
        "Drill-down views for deeper analysis",
        "Technical handover documentation",
      ],
    },
  },
  {
    slug: "statflow-ai",
    title: "StatFlow AI",
    offering: "analysis",
    tagline: "Automated statistical analysis platform",
    description:
      "A Python platform that automates common statistical analysis steps, from data cleaning to rule-based test selection, to reduce repetitive analytical work.",
    // No "AI" tag: test selection is rule-based (see the case study), not machine-learned.
    techStack: ["Python", "Statistics", "Automation"],
    verifiedClientWork: false,
    status: "internal-build",
    kind: "analysis",
    featured: true,
    caseStudy: {
      overview:
        "StatFlow AI is a self-directed platform project exploring how statistical analysis workflows can be automated without losing methodological rigor.",
      problem:
        "Standard statistical workflows (cleaning, exploratory analysis, test selection, interpretation) are repetitive and time-consuming, especially across many similar datasets. The aim was a system that automates the repeatable parts while keeping method selection transparent and auditable.",
      approach: [
        "Mapped a typical statistical analysis workflow end to end",
        "Identified which steps could be safely automated versus which required human judgment",
        "Built automated data cleaning and exploratory analysis modules",
        "Implemented rule-based statistical test selection with clear reasoning output",
      ],
      built:
        "A modular pipeline that ingests raw data, applies structured cleaning and exploratory analysis, and recommends appropriate statistical tests with a documented rationale. Test selection is rule-based rather than machine-learned, so every recommendation traces back to a stated rule.",
      deliverables: [
        "A modular Python analysis pipeline",
        "Automated data cleaning and validation",
        "Exploratory analysis with generated summaries",
        "Rule-based statistical test recommendations with a documented rationale",
        "Exportable reports documenting methodology and assumptions",
      ],
    },
  },
  {
    slug: "northfield-digital-presence",
    title: "Northfield Digital Presence",
    offering: "web",
    tagline: "Concept business website",
    description:
      "A concept business website that rebuilds an outdated template site as a clearly structured Next.js platform.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    verifiedClientWork: false,
    status: "concept",
    kind: "website",
    caseStudy: {
      overview:
        "A concept website showing how an outdated, template-based business site can be rebuilt as a structured, custom platform.",
      problem:
        "Outdated template-based sites tend to be slow, hard to update and unclear about what the business offers. The aim was a credible website with a clear structure that can be extended with new pages over time.",
      approach: [
        "Defined the site structure around the business's core offerings",
        "Designed a clean, credible visual identity",
        "Built the site with a modern, component-based architecture",
        "Implemented SEO fundamentals and performance optimization",
      ],
      built:
        "The site is structured around clear content on a component architecture that makes future pages straightforward to add.",
      deliverables: [
        "A responsive Next.js website",
        "Reusable component library",
        "SEO fundamentals and metadata across the site",
        "Performance optimization",
        "A structure that keeps content updates straightforward",
      ],
    },
  },
  {
    slug: "market-signal-data-study",
    title: "Market Signal Data Study",
    offering: "analysis",
    tagline: "Exploratory and statistical data study",
    description:
      "An exploratory and statistical analysis project examining patterns across a market dataset to test a business hypothesis.",
    techStack: ["Python", "Pandas", "Statistics"],
    verifiedClientWork: false,
    status: "internal-build",
    kind: "report",
    caseStudy: {
      overview:
        "A self-directed data analysis project applying exploratory and statistical methods to a market dataset to test a specific hypothesis.",
      problem:
        "Raw market data was available but hadn't been cleaned, explored or tested in a structured way to confirm or reject the hypothesis in question. The aim was to clean and explore the dataset, then apply appropriate statistical testing and document the method.",
      approach: [
        "Cleaned and validated the raw dataset",
        "Conducted exploratory data analysis to identify patterns",
        "Selected and applied an appropriate statistical test",
        "Documented findings and their limitations",
      ],
      built:
        "The analysis produced a documented, reproducible evaluation of the original hypothesis, supported by exploratory visualizations and statistical testing.",
      deliverables: [
        "A written analysis report with the test, result, assumptions and limitations",
        "Structured data cleaning pipeline",
        "Exploratory analysis with visual summaries",
        "Reproducible analysis notebook",
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Projects shown on the homepage. */
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

/** "All" plus every offering actually represented in `projects`, for the /portfolio filter. */
export const portfolioCategories = [
  "All",
  ...Array.from(new Set(projects.map((project) => getProjectOfferingTitle(project)))),
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];
