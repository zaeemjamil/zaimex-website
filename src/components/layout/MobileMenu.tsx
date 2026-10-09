"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { offerings, getServicesForOffering } from "@/config/services";
import { LogoMark } from "@/components/layout/LogoMark";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  // Collapse the Services accordion each time the drawer closes so it doesn't
  // reopen already-expanded. Derived during render (same pattern Navbar uses
  // for route changes) rather than setState inside an effect.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) setServicesExpanded(false);
  }

  // Move focus into the dialog when it opens, and handle Escape-to-close plus
  // a basic focus trap so keyboard/screen-reader users can't tab out to the
  // (visually hidden) page behind it while it's open — required for a
  // role="dialog" aria-modal="true" element.
  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={dialogRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col justify-between border-l border-border bg-surface p-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <div className="flex items-center justify-between">
                <Link href="/" onClick={onClose} aria-label="ZAIMEX home">
                  <LogoMark height={22} />
                </Link>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent-text"
                >
                  <X size={18} strokeWidth={1.75} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {mainNav.map((item) => {
                  if (item.href !== "/services") {
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="text-h3 border-b border-border py-4 text-foreground transition-colors hover:text-accent-text"
                      >
                        {item.label}
                      </Link>
                    );
                  }
                  return (
                    <div key={item.href} className="border-b border-border">
                      <button
                        type="button"
                        onClick={() => setServicesExpanded((v) => !v)}
                        aria-expanded={servicesExpanded}
                        aria-controls="mobile-services-panel"
                        className="flex w-full items-center justify-between py-4 text-left"
                      >
                        <span className="text-h3 text-foreground">{item.label}</span>
                        <Plus
                          size={20}
                          strokeWidth={1.75}
                          className={cn(
                            "shrink-0 text-foreground/60 transition-transform duration-200",
                            servicesExpanded && "rotate-45 text-accent-text",
                          )}
                        />
                      </button>
                      {servicesExpanded ? (
                        <div id="mobile-services-panel" className="flex flex-col gap-5 pb-5">
                          {offerings.map((offering) => (
                            <div key={offering.id}>
                              <p className="text-label text-muted">{offering.title}</p>
                              <ul className="mt-2 flex flex-col gap-2.5">
                                {getServicesForOffering(offering.id).map((service) => (
                                  <li key={service.slug}>
                                    <Link
                                      href={`/services/${service.slug}`}
                                      onClick={onClose}
                                      className="text-sm text-foreground/80 transition-colors hover:text-accent-text"
                                    >
                                      {service.shortTitle}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <Link
                            href="/services"
                            onClick={onClose}
                            className="text-sm font-semibold text-accent-text"
                          >
                            View all services →
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                {siteConfig.ctas.primary}
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-label text-muted">Appearance</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
