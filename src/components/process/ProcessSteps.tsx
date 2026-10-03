import { ArrowRight } from "lucide-react";
import { processSteps } from "@/config/process";
import { getIcon } from "@/lib/icons";

export function ProcessSteps() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step, index) => {
        const Icon = getIcon(step.icon);
        return (
          <div key={step.title}>
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border text-foreground/70">
                {/* eslint-disable-next-line react-hooks/static-components -- getIcon returns a stable reference to a module-level icon component, not a new component created on each render */}
                <Icon size={19} strokeWidth={1.6} />
              </span>
              <span className="text-data text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="text-h3 mt-5 text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-foreground/70">
              <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
              {step.next}
            </p>
          </div>
        );
      })}
    </div>
  );
}
