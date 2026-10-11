import { testimonials } from "@/config/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/cards/TestimonialCard";

// Renders nothing at all while `testimonials` is empty — no "feedback will
// appear here" placeholder. A missing section is better than a visibly
// unfinished one. Add real, verified testimonials to config/testimonials.ts
// and this section appears automatically; nothing here needs to change.
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-b border-border">
      <div className="container-page py-16 md:py-20">
        <SectionHeading eyebrow="Client Feedback" title="What Clients Say" />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
