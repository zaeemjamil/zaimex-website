// Testimonials configuration.
// No testimonials are fabricated. Add real, verified testimonials here as
// they become available — the <Testimonials> component renders nothing at
// all while this list is empty, and the section appears automatically the
// moment a first entry is added.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [];
