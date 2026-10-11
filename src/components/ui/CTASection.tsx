import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ctaContent } from "@/config/cta";
import { getWhatsAppHref } from "@/lib/social";

type CTASectionProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

// Defaults match the homepage CTA (config/cta.ts). Every other page passes
// its own {title, description, primaryLabel} from the same file so no two
// pages end with identical copy — see config/cta.ts for each page's wording.
export function CTASection({
  title = ctaContent.home.title,
  description = ctaContent.home.description,
  primaryLabel = ctaContent.home.primaryLabel,
  primaryHref = "/contact",
  secondaryLabel = siteConfig.ctas.secondary,
  secondaryHref = getWhatsAppHref(),
}: CTASectionProps) {
  const isExternal = secondaryHref.startsWith("http");

  return (
    <section className="border-t border-border">
      <div className="container-page py-16 md:py-28">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface px-8 py-14 md:px-16 md:py-20">
          <div className="bg-schematic pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true" />
          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-h1 text-foreground">{title}</h2>
              <p className="text-lead mt-4">{description}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                {primaryLabel}
                <ArrowUpRight size={16} strokeWidth={2} />
              </Link>
              <Link
                href={secondaryHref}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-transparent px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent-text"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
