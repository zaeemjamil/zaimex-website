import { offerings } from "@/config/services";
import { homeSections } from "@/config/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OfferingRow } from "@/components/cards/OfferingRow";

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="border-b border-border">
      <div className="container-page py-14 md:py-20">
        <SectionHeading title={homeSections.whatWeDo.title} description={homeSections.whatWeDo.description} />
        <div className="mt-10">
          {offerings.map((offering) => (
            <OfferingRow key={offering.id} offering={offering} />
          ))}
        </div>
      </div>
    </section>
  );
}
