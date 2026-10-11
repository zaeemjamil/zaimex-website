import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  /** Heading level to render. Defaults to "h2" for in-page section headings —
   * pass "h1" for the single top-of-page heading on pages that don't already
   * render their own <h1> (e.g. list pages like /services, /portfolio). */
  level?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  level = "h2",
}: SectionHeadingProps) {
  const Heading = level;

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className="text-label text-muted">{eyebrow}</p> : null}
      <Heading
        className={cn(level === "h1" ? "text-h1" : "text-h2", "text-balance mt-3 text-foreground", titleClassName)}
      >
        {title}
      </Heading>
      {description ? <p className="text-lead mt-4">{description}</p> : null}
    </div>
  );
}
