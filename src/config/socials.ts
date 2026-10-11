// Centralized social / external links.
// Contact email lives in site.ts (siteConfig.contact.email) — not duplicated here.

export const socials = {
  // Public company page — never the /admin/ dashboard URL.
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/company/zaimex/?viewAsMember=true",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/zaimex.official/",
  // Not yet provided — footer icon stays hidden until this is set.
  github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "#", // TODO: add GitHub URL if/when ZAIMEX has one
} as const;

export type Socials = typeof socials;
