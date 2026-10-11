import { ArrowRight } from "lucide-react";

const STAGES = ["Data", "Analysis", "Automation", "Digital solution", "Business outcome"];

/**
 * The hero visual: ZAIMEX's own five-stage framing, not a project mockup —
 * deliberately plain shapes and words, nothing that could be mistaken for a
 * dashboard or a client result, so it needs no "not a client result" caption.
 */
export function ConceptFlow() {
  return (
    <div
      role="img"
      aria-label="ZAIMEX's approach: data, analysis, automation, digital solution, business outcome"
      className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2"
    >
      {STAGES.map((stage, index) => {
        const isLast = index === STAGES.length - 1;
        return (
          <div key={stage} className="flex items-center gap-3 sm:gap-2">
            <div
              className={
                isLast
                  ? "rounded-lg border border-accent bg-accent-soft px-4 py-3 text-sm font-semibold text-accent-text"
                  : "rounded-lg border border-border px-4 py-3 text-sm text-foreground/80"
              }
            >
              {stage}
            </div>
            {!isLast ? (
              <ArrowRight size={16} strokeWidth={2} className="shrink-0 rotate-90 text-muted sm:rotate-0" aria-hidden="true" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
