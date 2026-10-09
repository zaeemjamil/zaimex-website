"use client";

import { useEffect, useRef, useState, type FocusEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { offerings, getServicesForOffering } from "@/config/services";
import { cn } from "@/lib/utils";

/**
 * Desktop dropdown for the "Services" nav item: the offering groups, each
 * with its real services underneath. Uses the standard disclosure pattern
 * (not role="menu"): "Services" stays a normal link to /services, and a
 * separate chevron button toggles the panel. Mouse users can also open it by
 * hovering. Keyboard users tab past it unless they choose to open it, then
 * Tab through the links; Escape closes and returns focus to the button.
 * Mobile uses the accordion in MobileMenu.tsx instead.
 */
export function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pathname = usePathname();

  // Close on navigation (same pattern Navbar uses for the mobile menu).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  function openNow() {
    clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function closeSoon() {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }
  function onBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.relatedTarget || !containerRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
  }

  const active = pathname.startsWith("/services");

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-1"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onBlur={onBlur}
    >
      <Link
        href="/services"
        className={cn(
          "text-sm font-medium transition-colors",
          active ? "text-accent-text" : "text-foreground/80 hover:text-foreground",
        )}
        aria-current={active ? "page" : undefined}
      >
        Services
      </Link>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="services-menu-panel"
        aria-label="Services menu"
        className="flex h-6 w-6 items-center justify-center rounded text-foreground/60 transition-colors hover:text-foreground"
      >
        <ChevronDown size={14} strokeWidth={2} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open ? (
        <div
          id="services-menu-panel"
          className="absolute left-1/2 top-full z-50 mt-4 w-[34rem] -translate-x-1/2 rounded-xl border border-border bg-surface p-5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            {offerings.map((offering) => (
              <div key={offering.id}>
                <Link
                  href={`/services#${offering.id}`}
                  className="text-sm font-semibold text-foreground transition-colors hover:text-accent-text"
                >
                  {offering.title}
                </Link>
                <p className="mt-1 text-xs leading-relaxed text-muted">{offering.shortDescription}</p>
                <ul className="mt-2.5 flex flex-col gap-1.5">
                  {getServicesForOffering(offering.id).map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-xs text-foreground/70 transition-colors hover:text-accent-text"
                      >
                        {service.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link
            href="/services"
            className="mt-5 flex items-center gap-1 border-t border-border pt-4 text-sm font-semibold text-foreground transition-colors hover:text-accent-text"
          >
            View all services
            <ChevronRight size={14} strokeWidth={2} />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
