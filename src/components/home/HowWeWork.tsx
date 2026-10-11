import { processIntro } from "@/config/process";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessSteps } from "@/components/process/ProcessSteps";

export function HowWeWork() {
  return (
    <section id="how-we-work" className="border-b border-border">
      <div className="container-page py-14 md:py-20">
        <SectionHeading title={processIntro.title} description={processIntro.lead} />
        <div className="mt-12">
          <ProcessSteps />
        </div>
      </div>
    </section>
  );
}
