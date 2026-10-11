// The ZAIMEX process: used by <ProcessSteps> on the homepage ("How we work")
// and on every service page. Edit here — no component changes needed.

export type ProcessStep = {
  title: string;
  icon: string; // lucide-react icon name
  /** What happens in this step and what ZAIMEX produces, in a sentence or two. */
  body: string;
  /** How the client moves forward from this step. */
  next: string;
};

export const processIntro = {
  title: "How we work",
  lead: "We begin with the problem, not the technology.",
};

export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    icon: "Search",
    body: "We learn how the work is done today and where time or data is lost, and turn it into a short written scope.",
    next: "You confirm the scope.",
  },
  {
    title: "Plan",
    icon: "Compass",
    body: "We choose the approach and tools that fit the problem, and agree what to build first.",
    next: "You approve the plan before building starts.",
  },
  {
    title: "Build",
    icon: "Hammer",
    body: "We build in stages and show working dashboards, workflows or pages as we go.",
    next: "You review each stage and give feedback.",
  },
  {
    title: "Deliver",
    icon: "Rocket",
    body: "We finish, document the result and hand everything over.",
    next: "You decide what to refine, extend or leave as is.",
  },
];
