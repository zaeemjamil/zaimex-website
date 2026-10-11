import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { pageSeo } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: pageSeo.privacy.title,
  description: pageSeo.privacy.description,
  path: "/privacy",
});

const LAST_UPDATED = "September 2026";

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-10">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy", href: "/privacy" }]} />
        </div>
      </section>

      <section><div className="container-page max-w-3xl pb-20">
        <h1 className="text-h1 text-foreground">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted">Last updated: {LAST_UPDATED}</p>

        <div className="mt-6 rounded-lg border border-dashed border-border bg-surface p-4 text-sm text-muted">
          This is a starting template describing how this website is intended to handle information. It should be
          reviewed by qualified legal counsel and updated to reflect your actual data practices, jurisdiction and any
          applicable regulations before this site goes live.
        </div>

        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-foreground/85">
          <div>
            <h2 className="text-h3 text-foreground">1. Information We Collect</h2>
            <p className="mt-3">
              When you submit the contact form on this website, we collect the information you provide — including
              your name, email address, company, service interest, project description, and optionally your budget
              and timeline. We do not collect this information through any other means on this site.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-foreground">2. How We Use Information</h2>
            <p className="mt-3">
              Information submitted through the contact form is used solely to respond to your inquiry and evaluate
              a potential project. We do not sell, rent, or share this information with third parties for marketing
              purposes.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-foreground">3. Data Retention</h2>
            <p className="mt-3">
              We retain contact form submissions for as long as reasonably necessary to respond to your inquiry and
              maintain a record of business communications, after which they may be deleted.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-foreground">4. Cookies &amp; Analytics</h2>
            <p className="mt-3">
              This website does not use advertising cookies or third-party ad tracking. If analytics tools are added
              in the future to understand site usage, this policy will be updated to describe what is collected and
              why.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-foreground">5. Third-Party Services</h2>
            <p className="mt-3">
              This site may use third-party infrastructure providers (such as hosting and email delivery services)
              to operate. These providers process data on our behalf and are not authorized to use it for their own
              purposes.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-foreground">6. Your Rights</h2>
            <p className="mt-3">
              You may request access to, correction of, or deletion of any personal information you have submitted
              to us by contacting {siteConfig.contact.email}.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-foreground">7. Contact</h2>
            <p className="mt-3">
              Questions about this policy can be sent to {siteConfig.contact.email}.
            </p>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
