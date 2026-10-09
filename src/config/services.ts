// Central services configuration.
// Every service page (/services/[slug]) is rendered from this file through
// <ServiceDetailTemplate>. Add a new object here to add a new service —
// no component changes required.

export type ServiceFaq = {
  question: string;
  answer: string;
};

/**
 * ONE taxonomy for the whole site. Every place that names or groups services —
 * the homepage "What we do" section, /services, service page eyebrows and
 * breadcrumbs, the contact form's service list and the portfolio filter —
 * reads from `offerings` below. Do not hardcode offering names anywhere else.
 */
export type OfferingId = "dashboards" | "analysis" | "automation" | "web";

export type Offering = {
  id: OfferingId;
  /** Visible name of the offering. */
  title: string;
  /** "For businesses that…" opener — the situation this offering is for. */
  forWhom: string;
  /** One concise statement of what the offering delivers. */
  outcome: string;
  /** Slug of the service page the homepage row links to. */
  primaryService: string;
  /** Short one-line descriptor for compact UI (mega menu). */
  shortDescription: string;
  /** The business-problem framing of `forWhom`, as a question — used in the homepage "Business problems" section. */
  problemPrompt: string;
};

export type Service = {
  slug: string;
  icon: string; // lucide-react icon name
  /** Short label used in nav, lists and breadcrumbs */
  shortTitle: string;
  /** Which offering this service belongs to (see `offerings`) */
  offering: OfferingId;
  /** Eyebrow shown above the hero heading, kept neutral (not accent-colored) in the template */
  heroEyebrow: string;
  /** Large hero heading, e.g. "Turn Data Into Decisions." */
  heroTitle: string;
  heroDescription: string;
  /** One-line description shown in service lists */
  cardDescription: string;
  /** Up to three concrete capabilities shown under the description in service lists */
  cardList: string[];
  problem: {
    heading: string;
    body: string;
  };
  whyItMatters: {
    heading: string;
    points: { title: string; description: string }[];
  };
  approach: {
    heading: string;
    body: string;
    points: string[];
  };
  deliverables: {
    heading: string;
    items: string[];
  };
  techStack: string[];
  whoItsFor: string[];
  faq: ServiceFaq[];
  relatedServices: string[];
};

export const offerings: Offering[] = [
  {
    id: "dashboards",
    title: "Business Intelligence",
    forWhom: "For businesses that need clearer visibility into sales, revenue, finance, customers and operations.",
    outcome:
      "We bring performance data together in Excel and Power BI dashboards that show what's happening across the whole business.",
    primaryService: "business-intelligence",
    shortDescription: "Dashboards and reporting across sales, finance and operations.",
    problemPrompt: "Need clearer visibility into business performance?",
  },
  {
    id: "analysis",
    title: "Data & Analytics",
    forWhom: "For businesses struggling with disconnected, messy or underused data.",
    outcome:
      "We clean, structure and connect scattered data so it becomes something the business can rely on and build with, then analyze it with the right statistical methods.",
    primaryService: "data-analytics",
    shortDescription: "Cleaning, structuring and analyzing data that isn't being used.",
    problemPrompt: "Working with disconnected or messy data?",
  },
  {
    id: "automation",
    title: "AI & Automation",
    forWhom: "For businesses spending time on repetitive manual processes.",
    outcome:
      "We find where time is lost to manual work and replace it with reliable, monitored automation between the tools you already use. We apply AI to specific, well-defined workflows — where it measurably helps — rather than adding it for its own sake.",
    primaryService: "ai-automation",
    shortDescription: "Automated, monitored workflows between the tools you use.",
    problemPrompt: "Spending too much time on repetitive manual work?",
  },
  {
    id: "web",
    title: "Web & Digital",
    forWhom: "For companies that need a strong website and a clear digital strategy behind it.",
    outcome:
      "We design and build business websites and web applications, and plan the SEO, content and customer journey around them.",
    primaryService: "web-development",
    shortDescription: "Business websites, web apps and the strategy behind them.",
    problemPrompt: "Need a stronger business website?",
  },
];

export const services: Service[] = [
  {
    slug: "data-analytics",
    icon: "ChartScatter",
    shortTitle: "Data Analytics",
    offering: "analysis",
    heroEyebrow: "DATA & ANALYTICS",
    heroTitle: "Turn Data Into Decisions.",
    heroDescription:
      "We clean, connect and analyze messy, disconnected data so decisions rest on evidence instead of guesswork.",
    cardDescription: "Clean, explore and analyze business data so decisions rest on evidence.",
    cardList: ["Data Cleaning", "Exploratory Data Analysis", "Business Analytics"],
    problem: {
      heading: "Data that exists but doesn't help",
      body: "Most businesses aren't short on data — they're short on time to make sense of it. Numbers sit in spreadsheets, exports and disconnected systems, and by the time someone pulls them together, the decision has already been made on instinct.",
    },
    whyItMatters: {
      heading: "Why it matters",
      points: [
        {
          title: "Faster answers",
          description: "Clear analysis shortens the distance between a question and a confident answer.",
        },
        {
          title: "Fewer blind spots",
          description: "Structured analysis surfaces patterns and risks that raw exports hide.",
        },
        {
          title: "A foundation for everything else",
          description: "Reporting, automation and AI all depend on data that has been cleaned and understood first.",
        },
      ],
    },
    approach: {
      heading: "Our approach",
      body: "We start with the business question, not the dataset — then work backward to the data, tools and analysis needed to answer it properly.",
      points: [
        "Understand the business question behind the request",
        "Audit, clean and structure the underlying data",
        "Explore the data to identify patterns, outliers and gaps",
        "Apply the right statistical or analytical method",
        "Present findings in a format decision-makers can act on",
      ],
    },
    deliverables: {
      heading: "What we deliver",
      items: [
        "Cleaned and structured datasets",
        "Exploratory data analysis (EDA) reports",
        "Statistical analysis and hypothesis testing",
        "Business analytics summaries",
        "Clear data visualizations",
        "Documented methodology and assumptions",
      ],
    },
    techStack: ["Python", "SQL", "R", "Pandas", "Excel", "Power Query"],
    whoItsFor: [
      "Teams making decisions from incomplete or messy data",
      "Businesses that need a one-off analysis, not a full BI system",
      "Organizations preparing data for dashboards or automation",
    ],
    faq: [
      {
        question: "Do you work with data we already have, or help us collect it too?",
        answer:
          "Both — but most engagements start with the data you already have. We assess what exists, what's missing, and what's realistic to analyze within scope before recommending anything additional.",
      },
      {
        question: "What format do we receive the results in?",
        answer:
          "It depends on the goal — a written report, a set of visualizations, a cleaned dataset, or a combination. We agree on the output format before work begins.",
      },
      {
        question: "How is this different from a Business Intelligence dashboard?",
        answer:
          "Data analytics answers a specific question with a defined analysis. Business intelligence builds an ongoing, interactive system for monitoring performance over time. Many clients start with the former and move to the latter.",
      },
    ],
    relatedServices: ["statistical-analysis", "business-intelligence"],
  },
  {
    slug: "business-intelligence",
    icon: "LayoutDashboard",
    shortTitle: "Custom BI Dashboards",
    offering: "dashboards",
    heroEyebrow: "BUSINESS INTELLIGENCE",
    heroTitle: "Make Business Performance Visible.",
    heroDescription:
      "We build interactive dashboards and reporting systems that make sales, operations and financial performance visible in one place — updated, not static.",
    cardDescription: "Make business performance visible with interactive dashboards and reporting.",
    cardList: ["KPI Dashboards", "Interactive Reports", "Operational Reporting"],
    problem: {
      heading: "Reporting that takes longer than the decision it supports",
      body: "Performance data is often scattered across spreadsheets, tools and departments, rebuilt manually every week or month. By the time a report is ready, it already reflects the past rather than the present.",
    },
    whyItMatters: {
      heading: "Why it matters",
      points: [
        {
          title: "One source of truth",
          description: "Consistent numbers across teams instead of competing spreadsheets.",
        },
        {
          title: "Less manual reporting work",
          description: "A well-built dashboard replaces hours of repeated manual report-building.",
        },
        {
          title: "Performance visible at a glance",
          description: "KPIs, trends and exceptions surface immediately instead of being buried in rows of data.",
        },
      ],
    },
    approach: {
      heading: "Our approach",
      body: "We design dashboards around the decisions they need to support, not around every metric that could technically be shown.",
      points: [
        "Identify the KPIs that actually drive decisions",
        "Connect and model the underlying data sources",
        "Design a clear, uncluttered dashboard layout",
        "Build interactivity — filters, drill-downs, comparisons",
        "Hand over documentation so the dashboard stays maintainable",
      ],
    },
    deliverables: {
      heading: "What we deliver",
      items: [
        "Interactive Power BI or Excel dashboards",
        "KPI tracking and performance scorecards",
        "Sales and revenue analytics views",
        "Operational reporting dashboards",
        "Data models connecting multiple sources",
        "Handover documentation",
      ],
    },
    techStack: ["Power BI", "Excel", "DAX", "Power Query", "SQL"],
    whoItsFor: [
      "Businesses tracking sales, revenue, customers or operations manually",
      "Teams that rebuild the same report every reporting cycle",
      "Leaders who need performance visibility without waiting on someone else",
    ],
    faq: [
      {
        question: "Excel or Power BI — which one do we need?",
        answer:
          "It depends on your data volume, how many people need access, and whether the dashboard needs to update automatically. We recommend the right tool for your situation rather than defaulting to one.",
      },
      {
        question: "Can the dashboard connect to our existing systems?",
        answer:
          "In most cases, yes — Power BI and Excel can connect to a wide range of databases, spreadsheets and exports. We confirm feasibility for your specific systems during discovery.",
      },
      {
        question: "Who maintains the dashboard afterward?",
        answer:
          "We hand over clear documentation so your team can maintain it internally. Ongoing support can also be scoped separately if preferred.",
      },
    ],
    relatedServices: ["excel-dashboards", "power-bi", "data-analytics"],
  },
  {
    slug: "excel-dashboards",
    icon: "Table",
    shortTitle: "Excel Dashboards",
    offering: "dashboards",
    heroEyebrow: "EXCEL DASHBOARDS",
    heroTitle: "Dashboards Built on the Tool You Already Use.",
    heroDescription:
      "Interactive, well-structured Excel dashboards for teams that need clear reporting without introducing new software.",
    cardDescription: "Interactive dashboards and reporting systems built natively in Excel.",
    cardList: ["KPI Dashboards", "Power Query Data Models", "Automated Data Refresh"],
    problem: {
      heading: "Spreadsheets that outgrew their structure",
      body: "Excel is often where business reporting starts — and stays, long after the spreadsheet has become slow, manually updated and difficult for anyone but its original author to follow.",
    },
    whyItMatters: {
      heading: "Why it matters",
      points: [
        {
          title: "No new software to learn",
          description: "Your team already knows Excel — a well-built dashboard simply makes better use of it.",
        },
        {
          title: "Faster reporting cycles",
          description: "Power Query and structured models remove repetitive manual data entry.",
        },
        {
          title: "Accessible to everyone",
          description: "No licensing barriers — anyone with Excel can open and use the dashboard.",
        },
      ],
    },
    approach: {
      heading: "Our approach",
      body: "We rebuild the reporting logic properly rather than layering more formulas onto an existing spreadsheet.",
      points: [
        "Review the current spreadsheet and reporting process",
        "Model the data using Power Query and structured tables",
        "Design a clean dashboard layout with clear visual hierarchy",
        "Build interactivity with slicers, filters and dynamic charts",
        "Test with real data and document the file structure",
      ],
    },
    deliverables: {
      heading: "What we deliver",
      items: [
        "A structured, interactive Excel workbook",
        "Power Query-based data connections",
        "Pivot tables and dynamic charts",
        "KPI summary and trend views",
        "A short guide to updating and maintaining the file",
      ],
    },
    techStack: ["Excel", "Power Query", "Power Pivot", "DAX", "VBA"],
    whoItsFor: [
      "Teams standardized on Excel without access to BI licensing",
      "Businesses with a working spreadsheet that needs restructuring",
      "Smaller teams that need a lightweight, portable reporting file",
    ],
    faq: [
      {
        question: "Will this work with our existing spreadsheets?",
        answer:
          "Usually, yes. We typically start from your existing data and structure rather than starting over, unless the current file has structural issues that make that impractical.",
      },
      {
        question: "Does the dashboard update automatically?",
        answer:
          "Data refresh can be set up through Power Query for supported data sources. The exact setup depends on where your source data lives.",
      },
      {
        question: "Can this later move to Power BI?",
        answer:
          "Yes — the data modeling work carries over conceptually, which makes a future move to Power BI more straightforward if your needs grow.",
      },
    ],
    relatedServices: ["business-intelligence", "power-bi"],
  },
  {
    slug: "power-bi",
    icon: "BarChart3",
    shortTitle: "Power BI",
    offering: "dashboards",
    heroEyebrow: "POWER BI",
    heroTitle: "Enterprise-Grade Dashboards, Built Right.",
    heroDescription:
      "Power BI dashboards and data models built for businesses that need interactive reporting at scale, with governed, reusable data.",
    cardDescription: "Interactive Power BI dashboards backed by a properly modeled data layer.",
    cardList: ["Data Modeling", "DAX Measures", "Scheduled Refresh"],
    problem: {
      heading: "Dashboards that look good but don't hold up",
      body: "A Power BI report is only as reliable as the data model behind it. Without proper modeling, dashboards become slow, inconsistent, and difficult to extend as the business grows.",
    },
    whyItMatters: {
      heading: "Why it matters",
      points: [
        {
          title: "Scales with the business",
          description: "A properly modeled dataset supports new reports without rebuilding from scratch.",
        },
        {
          title: "Consistent numbers everywhere",
          description: "Centralized measures mean every report calculates KPIs the same way.",
        },
        {
          title: "Controlled access",
          description: "Row-level security ensures people see only the data relevant to them.",
        },
      ],
    },
    approach: {
      heading: "Our approach",
      body: "We invest in the data model first, because that's what determines whether the dashboard stays fast, accurate and maintainable.",
      points: [
        "Map data sources and define the reporting requirements",
        "Build a clean star-schema data model",
        "Write reusable DAX measures instead of one-off calculations",
        "Design report pages around real decision-making workflows",
        "Configure refresh schedules and access controls",
      ],
    },
    deliverables: {
      heading: "What we deliver",
      items: [
        "A governed Power BI data model",
        "Interactive multi-page reports",
        "Reusable DAX measures",
        "Row-level security configuration",
        "Scheduled data refresh setup",
        "Technical documentation",
      ],
    },
    techStack: ["Power BI", "DAX", "Power Query", "SQL", "Azure"],
    whoItsFor: [
      "Businesses that have outgrown spreadsheet-based reporting",
      "Teams needing role-based access to sensitive reporting data",
      "Organizations with multiple data sources to unify",
    ],
    faq: [
      {
        question: "Do we need a Power BI Pro or Premium license?",
        answer:
          "It depends on how many people need access and how the reports will be shared. We'll help you understand the licensing implications before committing to an approach.",
      },
      {
        question: "Can you connect to our existing databases?",
        answer:
          "Power BI connects to most common databases, cloud warehouses and APIs. We confirm compatibility with your specific systems during discovery.",
      },
      {
        question: "How is this different from an Excel dashboard?",
        answer:
          "Power BI is built for larger data volumes, multiple users, scheduled refresh and governed access — where Excel is better suited to lighter, more portable reporting needs.",
      },
    ],
    relatedServices: ["business-intelligence", "excel-dashboards"],
  },
  {
    slug: "statistical-analysis",
    icon: "Sigma",
    shortTitle: "Statistical Analysis",
    offering: "analysis",
    heroEyebrow: "STATISTICAL ANALYSIS",
    heroTitle: "Answer Questions With Evidence, Not Assumptions.",
    heroDescription:
      "Rigorous statistical analysis — from hypothesis testing to modeling — for decisions that need more than a quick look at the numbers.",
    cardDescription: "Rigorous statistical methods applied to real business and research questions.",
    cardList: ["Hypothesis Testing", "Regression Analysis", "A/B Test Analysis"],
    problem: {
      heading: "Conclusions drawn from patterns that aren't real",
      body: "It's easy to spot a trend in a spreadsheet and act on it. It's harder to know whether that trend is statistically meaningful — or noise. Decisions made on the latter are expensive.",
    },
    whyItMatters: {
      heading: "Why it matters",
      points: [
        {
          title: "Confidence in the conclusion",
          description: "Proper testing tells you whether a result is meaningful or coincidental.",
        },
        {
          title: "Defensible results",
          description: "A documented method holds up to scrutiny from stakeholders or reviewers.",
        },
        {
          title: "Better forecasts",
          description: "Statistical models produce more reliable forward-looking estimates than intuition.",
        },
      ],
    },
    approach: {
      heading: "Our approach",
      body: "We choose the statistical method to fit the question and the data — not the other way around.",
      points: [
        "Clarify the question and the hypothesis being tested",
        "Assess the data for suitability and required assumptions",
        "Apply the appropriate statistical test or model",
        "Interpret results in plain, business-relevant language",
        "Document the method so the analysis can be reproduced",
      ],
    },
    deliverables: {
      heading: "What we deliver",
      items: [
        "Written statistical analysis report",
        "Hypothesis test results and interpretation",
        "Regression or forecasting models",
        "Data visualizations supporting the findings",
        "Documented methodology and assumptions",
      ],
    },
    techStack: ["Python", "R", "SciPy", "statsmodels", "Excel"],
    whoItsFor: [
      "Businesses testing whether a change actually made a difference",
      "Teams building forecasts or projections",
      "Researchers and analysts needing a second, rigorous review",
    ],
    faq: [
      {
        question: "What kind of questions can statistical analysis answer?",
        answer:
          "Common examples include whether a campaign, price change or process change had a measurable effect, whether two variables are meaningfully related, and what a reasonable forecast looks like given historical data.",
      },
      {
        question: "Do you need raw data or is a summary enough?",
        answer:
          "Raw, unaggregated data produces more reliable results. We can advise on what's usable once we see what's available.",
      },
      {
        question: "Will the analysis include visuals, or just numbers?",
        answer:
          "Both. Statistical results are paired with visualizations so findings are easy to interpret and present internally.",
      },
    ],
    relatedServices: ["data-analytics", "business-intelligence"],
  },
  {
    slug: "ai-automation",
    icon: "Workflow",
    shortTitle: "AI Workflows",
    offering: "automation",
    heroEyebrow: "AI & AUTOMATION",
    heroTitle: "Automate the Repetitive Work.",
    heroDescription:
      "We design automated workflows and AI-assisted processes that remove repetitive manual work and connect the tools your business already uses.",
    cardDescription: "Automate repetitive work, and apply AI to specific workflows where it measurably helps.",
    cardList: ["AI-Powered Workflows", "Process Automation", "API Integrations"],
    problem: {
      heading: "Time lost to work that doesn't need a person",
      body: "Copying data between tools, formatting reports, sending routine follow-ups — this kind of work adds up, and it's rarely why anyone was hired in the first place.",
    },
    whyItMatters: {
      heading: "Why it matters",
      points: [
        {
          title: "Time back for higher-value work",
          description: "Automation removes repetitive tasks so people can focus on decisions, not data entry.",
        },
        {
          title: "Fewer manual errors",
          description: "Automated workflows follow the same steps every time, without fatigue-driven mistakes.",
        },
        {
          title: "Tools that work together",
          description: "API integrations connect systems that currently require manual handoffs.",
        },
      ],
    },
    approach: {
      heading: "Our approach",
      body: "We map the current process before automating it — automating a broken process just makes it break faster.",
      points: [
        "Map the current manual process end to end",
        "Identify where automation and AI genuinely add value",
        "Design the workflow and required integrations",
        "Build, test and refine using real data and edge cases",
        "Document the workflow so it can be maintained internally",
      ],
    },
    deliverables: {
      heading: "What we deliver",
      items: [
        "Automated workflows (e.g. via n8n)",
        "AI-assisted process steps where appropriate",
        "API integrations between existing tools",
        "Error handling and monitoring for critical workflows",
        "Workflow documentation and handover",
      ],
    },
    techStack: ["n8n", "Python", "APIs", "Webhooks", "AI Models"],
    whoItsFor: [
      "Teams repeating the same manual process across tools",
      "Businesses wanting to connect disconnected software",
      "Organizations exploring scoped, well-defined uses of AI",
    ],
    faq: [
      {
        question: "Do we need to replace our current tools?",
        answer:
          "Usually not. Most automation work connects and extends the tools you already use rather than replacing them.",
      },
      {
        question: "Is this the same as building a custom AI product?",
        answer:
          "No — this is about applying automation and AI to specific, defined workflows inside your business, not building a standalone AI product.",
      },
      {
        question: "What happens if a workflow fails?",
        answer:
          "Critical workflows are built with error handling and, where appropriate, monitoring or alerts so failures are visible rather than silent.",
      },
    ],
    relatedServices: ["n8n-automation", "digital-solutions"],
  },
  {
    slug: "n8n-automation",
    icon: "GitBranch",
    shortTitle: "n8n Automation",
    offering: "automation",
    heroEyebrow: "N8N AUTOMATION",
    heroTitle: "Workflow Automation Built on n8n.",
    heroDescription:
      "Custom automation workflows built on n8n — connecting apps, APIs and data sources into a single reliable process.",
    cardDescription: "Custom automation workflows built specifically on n8n.",
    cardList: ["Custom Workflow Design", "App-to-App Automation", "Error Handling & Alerts"],
    problem: {
      heading: "Manual steps between tools that should talk to each other",
      body: "Many businesses use several tools that were never designed to work together — so someone ends up manually moving data between them, on a schedule, indefinitely.",
    },
    whyItMatters: {
      heading: "Why it matters",
      points: [
        {
          title: "Open, flexible automation",
          description: "n8n supports custom logic and self-hosting, avoiding lock-in to a single closed platform.",
        },
        {
          title: "Connects almost anything with an API",
          description: "From common SaaS tools to internal systems, if it has an API, it can usually be automated.",
        },
        {
          title: "Reliable, repeatable execution",
          description: "Workflows run the same way every time, on a schedule or trigger.",
        },
      ],
    },
    approach: {
      heading: "Our approach",
      body: "We design the workflow logic first, then build it in n8n with proper error handling, so it keeps running after the demo.",
      points: [
        "Define the trigger, steps and desired outcome",
        "Map required API connections and authentication",
        "Build the workflow in n8n with clear logic",
        "Test against real data and realistic edge cases",
        "Add error handling and, where useful, alerts",
      ],
    },
    deliverables: {
      heading: "What we deliver",
      items: [
        "Working n8n workflow(s)",
        "API and app connections configured",
        "Error handling for critical steps",
        "Workflow documentation",
        "Handover and walkthrough",
      ],
    },
    techStack: ["n8n", "APIs", "Webhooks", "JavaScript", "JSON"],
    whoItsFor: [
      "Businesses already using or considering n8n",
      "Teams needing to connect SaaS tools without custom development",
      "Organizations wanting self-hostable, flexible automation",
    ],
    faq: [
      {
        question: "Do we need to self-host n8n?",
        answer:
          "No — n8n can be self-hosted or used via its cloud offering. We can advise on which fits your technical setup and requirements.",
      },
      {
        question: "Can you automate tools without a public API?",
        answer:
          "It depends on the tool. Most modern SaaS platforms expose an API; for tools that don't, we'll assess feasible alternatives during discovery.",
      },
      {
        question: "What if our workflow needs change later?",
        answer:
          "n8n workflows are visual and modular, which makes them straightforward to extend or adjust as requirements evolve.",
      },
    ],
    relatedServices: ["ai-automation", "digital-solutions"],
  },
  {
    slug: "web-development",
    icon: "Code2",
    shortTitle: "Web Development",
    offering: "web",
    heroEyebrow: "WEB DEVELOPMENT",
    heroTitle: "Websites and Web Apps That Do Their Job.",
    heroDescription:
      "Well-structured, fast websites and web applications that represent the business properly and work well for the people using them.",
    cardDescription: "Business websites, landing pages and web applications for growing businesses.",
    cardList: ["Business Websites", "Landing Pages", "Web Applications"],
    problem: {
      heading: "A website that doesn't reflect the business behind it",
      body: "An outdated, slow or generic website undersells a business before a prospective client has read a single word about what it actually does.",
    },
    whyItMatters: {
      heading: "Why it matters",
      points: [
        {
          title: "First impressions are structural",
          description: "Speed, clarity and design quality signal credibility before any copy is read.",
        },
        {
          title: "Clear paths to action",
          description: "Every page gives the visitor a clear path to contact or action.",
        },
        {
          title: "Technology that can grow",
          description: "A properly built site can be extended with new pages, features or integrations later.",
        },
      ],
    },
    approach: {
      heading: "Our approach",
      body: "We build with modern, maintainable technology and structure the site so it can be extended later without a rebuild.",
      points: [
        "Understand the business, audience and objective",
        "Plan the site structure and content",
        "Design a clean, credible visual identity",
        "Build using modern, performant web technology",
        "Test across devices, connect integrations and launch",
      ],
    },
    deliverables: {
      heading: "What we deliver",
      items: [
        "A fully responsive website or web application",
        "Clean, maintainable codebase",
        "SEO fundamentals implemented",
        "API or third-party integrations where required",
        "Deployment support",
      ],
    },
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "APIs"],
    whoItsFor: [
      "Businesses with an outdated or underperforming website",
      "Startups launching their first professional web presence",
      "Teams needing a custom web application, not a template",
    ],
    faq: [
      {
        question: "Do you work with existing designs, or design from scratch?",
        answer:
          "Both. We can build from an existing brand and design direction, or lead the design process as part of the project.",
      },
      {
        question: "Will the website be easy to update afterward?",
        answer:
          "Yes — content is structured to be editable without needing to rebuild components, and we document the setup at handover.",
      },
      {
        question: "Do you also handle hosting and domains?",
        answer:
          "We prepare the project for deployment on modern hosting platforms and can guide you through the setup. Domain and hosting ownership stays with you.",
      },
    ],
    relatedServices: ["digital-solutions", "ai-automation"],
  },
  {
    slug: "digital-solutions",
    icon: "Layers",
    shortTitle: "Digital Strategy",
    offering: "web",
    heroEyebrow: "DIGITAL STRATEGY",
    heroTitle: "Connect Technology to a Clear Objective.",
    heroDescription:
      "We connect digital strategy, infrastructure and execution so every part of the digital presence works toward the same goal.",
    cardDescription: "Search, content and customer-journey planning around your website and business goals.",
    cardList: ["SEO", "Content Strategy", "Customer Journey"],
    problem: {
      heading: "Digital pieces that don't add up to a strategy",
      body: "A website, some content and a few tools rarely amount to a digital strategy on their own. Without a plan connecting them, each piece works in isolation.",
    },
    whyItMatters: {
      heading: "Why it matters",
      points: [
        {
          title: "Consistent digital presence",
          description: "Strategy, content and technology working from the same objective, not separate efforts.",
        },
        {
          title: "Findable by the right people",
          description: "SEO and content strategy help the right people find what the business offers.",
        },
        {
          title: "A clearer path to growth",
          description: "Digital transformation planning connects day-to-day execution to longer-term goals.",
        },
      ],
    },
    approach: {
      heading: "Our approach",
      body: "We look at the full digital picture — strategy, content, technology and journey — before recommending where to focus.",
      points: [
        "Assess the current digital presence and gaps",
        "Define the digital strategy and priorities",
        "Map the customer journey across digital touchpoints",
        "Plan SEO and content direction",
        "Sequence execution against business goals",
      ],
    },
    deliverables: {
      heading: "What we deliver",
      items: [
        "A defined digital strategy and roadmap",
        "SEO recommendations and implementation",
        "Content strategy direction",
        "Customer journey mapping",
        "Digital transformation planning support",
      ],
    },
    techStack: ["SEO Tooling", "Analytics", "Content Systems", "Web Technologies"],
    whoItsFor: [
      "Businesses with digital pieces that don't feel connected",
      "Companies planning a broader digital transformation",
      "Teams that need direction as much as execution",
    ],
    faq: [
      {
        question: "Is this a strategy engagement, or does it include execution?",
        answer:
          "Both are available — some clients want a defined strategy and roadmap, others want us to execute against it as well. Scope is agreed upfront.",
      },
      {
        question: "Do you guarantee SEO rankings?",
        answer:
          "No credible provider can guarantee specific rankings. We focus on sound SEO fundamentals and a defensible strategy rather than promises we can't verify.",
      },
      {
        question: "How does this relate to the Web Development service?",
        answer:
          "Web Development covers building the site or application itself. Digital Strategy covers the broader plan connecting that build to content, SEO and business goals.",
      },
    ],
    relatedServices: ["web-development", "ai-automation"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getOffering(id: OfferingId): Offering {
  const offering = offerings.find((item) => item.id === id);
  if (!offering) throw new Error(`Unknown offering id: ${id}`);
  return offering;
}

/** Services that belong to an offering, in the order they appear in `services`. */
export function getServicesForOffering(id: OfferingId): Service[] {
  return services.filter((service) => service.offering === id);
}
