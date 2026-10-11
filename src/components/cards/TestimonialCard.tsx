import type { Testimonial } from "@/config/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-7">
      <blockquote className="text-base leading-relaxed text-foreground/90">&ldquo;{testimonial.quote}&rdquo;</blockquote>
      <figcaption className="mt-6 border-t border-border pt-4 text-sm">
        <span className="font-semibold text-foreground">{testimonial.name}</span>
        <span className="text-muted"> — {testimonial.role}, {testimonial.company}</span>
      </figcaption>
    </figure>
  );
}
