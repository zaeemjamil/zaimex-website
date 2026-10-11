import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/config/services";

/**
 * One numbered editorial row for a service on the /services directory —
 * deliberately not another card grid (see ServiceCard, still used for the
 * smaller "related services" block on individual service pages).
 */
export function ServiceRow({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex items-center gap-5 border-b border-border py-5 first:pt-0 last:border-b-0 sm:gap-8"
    >
      <span className="text-data w-6 shrink-0 text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
      <span className="w-40 shrink-0 text-base font-medium text-foreground sm:w-56 sm:text-lg">
        {service.shortTitle}
      </span>
      <span className="hidden flex-1 text-sm text-muted sm:block">{service.cardDescription}</span>
      <ArrowRight
        size={16}
        strokeWidth={2}
        className="ml-auto shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent-text"
      />
    </Link>
  );
}
