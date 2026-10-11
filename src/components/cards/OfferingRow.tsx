import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Offering } from "@/config/services";
import { getServiceBySlug } from "@/config/services";

/**
 * One row in the homepage/services "What we do" list. Deliberately plain
 * (title + copy + a couple of tags) rather than another icon-badged card —
 * this is the hairline-row pattern from the old SolutionCard, not a grid.
 * The whole row is a single link to the offering's primary service page, so
 * there is no repeated "Explore X" text, just a trailing arrow.
 */
export function OfferingRow({ offering }: { offering: Offering }) {
  const service = getServiceBySlug(offering.primaryService);
  const tags = service?.cardList.slice(0, 2) ?? [];

  return (
    <Link
      href={`/services/${offering.primaryService}`}
      className="group flex flex-col gap-4 border-b border-border py-7 first:pt-0 last:border-b-0 md:flex-row md:items-start md:gap-10 md:py-8"
    >
      <div className="md:w-72 md:shrink-0">
        <h3 className="text-h3 text-foreground">{offering.title}</h3>
        <p className="mt-1.5 text-sm text-muted">{offering.forWhom}</p>
      </div>

      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm leading-relaxed text-foreground/80 md:max-w-lg">{offering.outcome}</p>
          {tags.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="text-data rounded-full border border-border px-3 py-1 text-xs text-muted">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <ArrowRight
          size={18}
          strokeWidth={2}
          aria-hidden="true"
          className="shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent-text"
        />
      </div>
    </Link>
  );
}
