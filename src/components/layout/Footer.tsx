import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { socials } from "@/config/socials";
import { getWhatsAppHref } from "@/lib/social";
import { LogoMark } from "@/components/layout/LogoMark";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/layout/BrandIcons";

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappHref = getWhatsAppHref();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr] md:py-20">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-2.5 text-foreground">
            <LogoMark height={26} decorative />
            <span className="font-display text-[1.05rem] font-semibold tracking-tight">ZAIMEX</span>
          </Link>
          <p className="mt-4 text-sm font-medium text-foreground/90">{siteConfig.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{siteConfig.description}</p>

          <div className="mt-6 flex items-center gap-3">
            {socials.linkedin !== "#" ? (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ZAIMEX on LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-accent hover:text-accent-text"
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-accent hover:text-accent-text"
              >
                <InstagramIcon size={16} />
              </a>
            ) : null}
            {socials.github !== "#" ? (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ZAIMEX on GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-accent hover:text-accent-text"
              >
                <GitHubIcon size={16} />
              </a>
            ) : null}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message ZAIMEX on WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-accent hover:text-accent-text"
            >
              <MessageCircle size={16} strokeWidth={1.75} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-label text-muted">Site</p>
            <ul className="mt-2 flex flex-col">
              {footerNav.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-10 items-center text-sm text-foreground/80 transition-colors hover:text-accent-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-label text-muted">Company</p>
            <ul className="mt-2 flex flex-col">
              {footerNav.slice(4).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-10 items-center text-sm text-foreground/80 transition-colors hover:text-accent-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          {/* sm:mr-20 (margin, not padding) shifts this flex item's own box
              away from the container's right edge, clearing the fixed
              WhatsApp button at the widths where the two would otherwise
              overlap. Padding would only grow the box outward instead of
              moving it. Applied to the <p> itself, not the container-page
              div above: container-page sets its own padding-inline, and a
              same-element layered pr-* utility can be a confusing way to
              fight over the same box's right edge even once layer order
              is correct. */}
          <p className="sm:mr-20">{siteConfig.contact.email}</p>
        </div>
      </div>
    </footer>
  );
}
