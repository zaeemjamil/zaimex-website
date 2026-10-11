import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icons";

type ServiceCardProps = {
  number?: string;
  icon: string;
  title: string;
  description: string;
  list?: string[];
  href: string;
  /**
   * Optional trailing label. Omit it (the default on /services, where every
   * card would otherwise repeat "Explore X") so the card shows just an arrow
   * — the whole card is already the link. Pass a label like "Learn more"
   * only where a short, non-repeating word is useful (e.g. related services).
   */
  ctaLabel?: string;
};

export function ServiceCard({ number, icon, title, description, list, href, ctaLabel }: ServiceCardProps) {
  const Icon = getIcon(icon);

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-xl border border-border bg-surface p-7 transition-colors hover:border-foreground/25"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-foreground/70">
          {/* eslint-disable-next-line react-hooks/static-components -- getIcon returns a stable reference to a module-level icon component, not a new component created on each render */}
          <Icon size={20} strokeWidth={1.6} />
        </span>
        {number ? <span className="text-data text-xs text-muted">{number}</span> : null}
      </div>

      <h3 className="text-h3 mt-6 text-foreground">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{description}</p>

      {list && list.length > 0 ? (
        <ul className="mt-5 flex flex-1 flex-col gap-2">
          {list.slice(0, 3).map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-foreground/75">
              <span className="h-1 w-1 shrink-0 rounded-full bg-foreground/40" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-1" />
      )}

      <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-accent-text">
        {ctaLabel}
        <ArrowRight
          size={15}
          strokeWidth={2}
          className="transition-transform group-hover:translate-x-1"
          aria-hidden={ctaLabel ? undefined : true}
        />
      </span>
    </Link>
  );
}
