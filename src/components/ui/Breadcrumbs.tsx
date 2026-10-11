import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = {
  name: string;
  href: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-foreground/80">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-accent-text">
                  {item.name}
                </Link>
              )}
              {!isLast ? <ChevronRight size={13} className="text-muted" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
