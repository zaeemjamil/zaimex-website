import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { offerings } from "@/config/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Consultancy-style "problem → answer" section. Each prompt and answer is
 * drawn directly from the real offerings in services.ts (see `problemPrompt`
 * on each one) — nothing here is a scenario ZAIMEX doesn't actually cover.
 */
export function BusinessProblems() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page py-14 md:py-20">
        <SectionHeading
          eyebrow="Where to start"
          title="Which of these sounds familiar?"
          description="Four common starting points. Each leads to the ZAIMEX service built for it."
        />
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
          {offerings.map((offering) => (
            <Link
              key={offering.id}
              href={`/services/${offering.primaryService}`}
              className="group flex items-center justify-between gap-4 border-b border-border py-6 sm:py-7"
            >
              <span className="text-base font-medium text-foreground sm:text-lg">{offering.problemPrompt}</span>
              <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted transition-colors group-hover:text-accent-text">
                {offering.title}
                <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
