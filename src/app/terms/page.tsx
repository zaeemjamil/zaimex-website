import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { pageSeo } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: pageSeo.terms.title,
  description: pageSeo.terms.description,
  path: "/terms",
});

const LAST_UPDATED = "September 2026";

export default function TermsPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-10">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms", href: "/terms" }]} />
        </div>
      </section>

      <section>
      <div className="container-page max-w-3xl pb-20">
        <h1 className="text-h1 text-foreground">Terms of Service</h1>
        <p className="mt-3 text-sm text-muted">Last updated: {LAST_UPDATED}</p>

        <div className="mt-6 rounded-lg border border-dashed border-border bg-surface p-4 text-sm text-muted">
          This is a starting template. It should be reviewed by qualified legal counsel and updated to reflect your
          actual engagement terms, jurisdiction and business practices before this site goes live.
        </div>

        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-foreground/85">
          <div>
            <h2 className="text-h3 text-foreground">1. Use of This Website</h2>
            <p className="mt-3">
              This website is provided to share information about {siteConfig.name}&apos;s services and to allow
              prospective clients to get in touch. By using this site, you agree to use it only for lawful purposes.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-foreground">2. No Guarantee of Outcomes</h2>
            <p className="mt-3">
              Content on this website — including service descriptions and portfolio case studies — is provided for
              informational purposes. It does not constitute a guarantee of specific results, rankings, revenue or
              performance for any engagement.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-foreground">3. Intellectual Property</h2>
            <p className="mt-3">
              The content, design and branding of this website belong to {siteConfig.name} unless otherwise noted.
              Portfolio work shown remains subject to any applicable client or licensing agreements.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-foreground">4. Project Engagements</h2>
            <p className="mt-3">
              Submitting the contact form or requesting a consultation does not create a binding agreement. The
              scope, timeline, fees and terms of any engagement will be defined in a separate agreement between{" "}
              {siteConfig.name} and the client before work begins.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-foreground">5. Limitation of Liability</h2>
            <p className="mt-3">
              {siteConfig.name} is not liable for any indirect, incidental or consequential damages arising from the
              use of this website or reliance on its content.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-foreground">6. Changes to These Terms</h2>
            <p className="mt-3">
              These terms may be updated from time to time. Continued use of this website after changes are posted
              constitutes acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-foreground">7. Contact</h2>
            <p className="mt-3">Questions about these terms can be sent to {siteConfig.contact.email}.</p>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
