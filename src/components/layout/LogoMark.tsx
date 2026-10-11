import Image from "next/image";

// Exact supplied brand artwork (cropped to remove excess canvas padding only —
// no redesign, redraw, or distortion of the mark itself). See
// public/brand/zaimex-logo-{light,dark}.png and README "Logo assets".
const LOGO_ASPECT_RATIO = 1413 / 966;

type LogoMarkProps = {
  /** Display height in pixels — width is derived from the source aspect ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
  /**
   * Set true when a visible "ZAIMEX" text label already sits next to the mark
   * (e.g. navbar, footer) — the image becomes decorative (empty alt) so
   * screen readers don't announce "ZAIMEX" twice for the same link. Leave
   * false when the mark is the link's only accessible label.
   */
  decorative?: boolean;
};

export function LogoMark({ height = 28, className, priority = false, decorative = false }: LogoMarkProps) {
  const width = Math.round(height * LOGO_ASPECT_RATIO);
  const alt = decorative ? "" : "ZAIMEX";

  return (
    <span className={className} style={{ display: "inline-flex" }} aria-hidden={decorative || undefined}>
      {/* Blue-on-white variant — shown on the light theme */}
      <Image
        src="/brand/zaimex-logo-light.png"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="block dark:hidden"
        style={{ height, width: "auto" }}
      />
      {/* White-on-blue variant — shown on the dark theme */}
      <Image
        src="/brand/zaimex-logo-dark.png"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="hidden dark:block"
        style={{ height, width: "auto" }}
      />
    </span>
  );
}
