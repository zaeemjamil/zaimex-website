// Call-to-action copy per page type, so no two pages end with the same ask.
// Spread into <CTASection {...ctaContent.home} />. The secondary action
// (WhatsApp) defaults inside CTASection.

export const ctaContent = {
  home: {
    title: "Let's Build Something Useful.",
    description:
      "Tell us what you're trying to achieve and we'll help identify the right technology, data or automation solution.",
    primaryLabel: "Start a Project",
  },
  services: {
    title: "Not sure which service fits?",
    description: "Describe the problem you're working on and we'll point you to the right starting point.",
    primaryLabel: "Start a Project",
  },
  work: {
    title: "Need something similar?",
    description: "If one of these builds is close to what you need, tell us what you would change.",
    primaryLabel: "Build Something Similar",
  },
  about: {
    title: "Work with ZAIMEX",
    description: "Tell us about the problem you're working on and where you'd like to get to.",
    primaryLabel: "Work With ZAIMEX",
  },
  service: (serviceName: string) => ({
    title: `Discuss your ${serviceName} project.`,
    description: "Tell us what you're trying to achieve and we'll suggest where to start.",
    primaryLabel: "Discuss This Solution",
  }),
};
