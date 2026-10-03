// Central site configuration.
// Change company-wide details (name, tagline, contact info, WhatsApp number,
// production URL) here — nothing below should be hardcoded elsewhere.

/**
 * Resolves the canonical site URL without ever silently shipping a fake
 * production domain:
 * 1. NEXT_PUBLIC_SITE_URL — set this explicitly once a real domain exists.
 * 2. Vercel's own deployment URL (auto-injected, no setup required) — used
 *    so a fresh deploy without a custom domain still gets correct, real
 *    canonical/OG/sitemap URLs instead of a placeholder.
 * 3. localhost — local development only.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "ZAIMEX",
  tagline: "Data. AI. Automation. Built for Business.",
  description:
    "ZAIMEX is a technology and digital solutions company building dashboards, automation, AI workflows and websites for growing businesses.",

  url: resolveSiteUrl(),

  // Real, confirmed business contact details. Still overridable via env vars
  // (e.g. a different inbox for staging) without touching any component.
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "zaimexteam@gmail.com",
    // WhatsApp number in international format, digits only, no "+" — this is
    // the exact format wa.me links require. This is the single source of
    // truth: WhatsAppButton, the contact page and the footer all read from it.
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923287768285",
    // Human-readable form for display text (not used in the wa.me link itself).
    whatsappDisplay: "+92 328 7768285",
    whatsappMessage: "Hi ZAIMEX, I'd like to discuss a project.",
    country: "Pakistan",
  },

  ctas: {
    primary: "Start a Project",
    secondary: "Get a Free Consultation",
  },
} as const;

// Fails loudly in the server logs (not the build, not the UI) if this deploys
// to production without ever configuring a real domain — the site still works
// correctly (falls back to Vercel's own deployment URL), this is just a
// reminder that canonical URLs/sitemap/JSON-LD would look better on a custom
// domain once one exists.
if (process.env.NODE_ENV === "production" && typeof window === "undefined") {
  const warnedFlag = globalThis as unknown as { __zaimexSiteUrlWarned?: boolean };
  if (!process.env.NEXT_PUBLIC_SITE_URL && !process.env.VERCEL_URL && !warnedFlag.__zaimexSiteUrlWarned) {
    warnedFlag.__zaimexSiteUrlWarned = true;
    console.warn(
      "[zaimex/config] NEXT_PUBLIC_SITE_URL is not set. Falling back to localhost — " +
        "set it to your real domain in Vercel once one exists. See README.md.",
    );
  }
}

export type SiteConfig = typeof siteConfig;
