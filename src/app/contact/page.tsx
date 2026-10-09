import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { pageSeo } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { socials } from "@/config/socials";
import { getWhatsAppHref } from "@/lib/social";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { LinkedInIcon, InstagramIcon } from "@/components/layout/BrandIcons";

export const metadata: Metadata = buildMetadata({
  title: pageSeo.contact.title,
  description: pageSeo.contact.description,
  path: "/contact",
});

export default function ContactPage() {
  const whatsappHref = getWhatsAppHref();

  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-10">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
        </div>
      </section>

      <section>
        <div className="container-page grid gap-14 py-12 md:py-16 lg:grid-cols-[1fr_0.7fr] lg:gap-16">
          <div>
            <p className="text-label text-muted">Start a project</p>
            <h1 className="text-h1 text-balance mt-5 max-w-lg text-foreground">
              Tell us what you&apos;re trying to improve.
            </h1>
            <p className="text-lead mt-5 max-w-lg">
              Describe the problem and we&apos;ll help identify the right technology, data or automation solution.
            </p>

            <div className="mt-10 max-w-2xl">
              <ContactForm />
            </div>
          </div>

          <aside className="flex flex-col gap-5 lg:pt-24">
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="text-label text-muted">Prefer to message directly?</p>
              <div className="mt-5 flex flex-col gap-4">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 text-sm font-medium text-foreground transition-colors hover:text-accent-text"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border">
                    <Mail size={15} strokeWidth={1.75} />
                  </span>
                  {siteConfig.contact.email}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-foreground transition-colors hover:text-accent-text"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border">
                    <MessageCircle size={15} strokeWidth={1.75} />
                  </span>
                  {siteConfig.contact.whatsappDisplay}
                </a>
                <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border">
                    <MapPin size={15} strokeWidth={1.75} />
                  </span>
                  Based in {siteConfig.contact.country} — working with clients internationally
                </div>
              </div>

              {socials.linkedin !== "#" || socials.instagram !== "#" ? (
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
                  {socials.linkedin !== "#" ? (
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="ZAIMEX on LinkedIn"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-accent hover:text-accent-text"
                    >
                      <LinkedInIcon size={16} />
                    </a>
                  ) : null}
                  {socials.instagram !== "#" ? (
                    <a
                      href={socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="ZAIMEX on Instagram"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-accent hover:text-accent-text"
                    >
                      <InstagramIcon size={16} />
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="text-sm leading-relaxed text-muted">
                We reply to every project request personally. Sharing a bit of detail about your goals, timeline and
                budget upfront helps us respond with something useful rather than a generic reply.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
