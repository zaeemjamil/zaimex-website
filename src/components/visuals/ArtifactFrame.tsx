import Image from "next/image";
import type { ArtifactKind, ProjectMedia } from "@/config/projects";
import { cn } from "@/lib/utils";

// Re-exported so ServiceDetailTemplate.tsx (and anything else reaching for
// the type via this component) can `import { type ArtifactKind } from
// "@/components/visuals/ArtifactFrame"` — a plain `import type` above makes
// the name available only within this file, not to other modules.
export type { ArtifactKind };

type ArtifactFrameProps = {
  /** Which outline to draw when there is no real image. */
  kind: ArtifactKind;
  /** A real screenshot or image. When present it replaces the outline. */
  media?: ProjectMedia;
  /** Describes the outline for screen readers. Ignored when `decorative`. */
  label?: string;
  /** Hide the outline from assistive tech (use where nearby text already says what it is). */
  decorative?: boolean;
  /** Draw one element in the accent color. Use at most once per page. */
  highlight?: boolean;
  priority?: boolean;
  sizes?: string;
  /** Sizing / border classes, e.g. "aspect-[16/10] rounded-xl border border-border". */
  className?: string;
};

/*
 * The outline is a plain line drawing of the TYPE of project: panels, rows and
 * labels only. It deliberately contains no numbers, charts, status text or
 * customer data, so it cannot be mistaken for a real result. It is replaced
 * automatically as soon as `media` is set on the project (see config/projects.ts).
 */

function DashboardOutline({ highlight }: { highlight?: boolean }) {
  return (
    <>
      <rect x="20" y="16" width="280" height="168" rx="4" />
      <line x1="20" y1="34" x2="300" y2="34" />
      <line x1="30" y1="25" x2="70" y2="25" />
      {[30, 97, 165, 232].map((x, index) => (
        <rect
          key={x}
          x={x}
          y="44"
          width="58"
          height="34"
          rx="2"
          style={highlight && index === 0 ? { stroke: "var(--accent)" } : undefined}
        />
      ))}
      <rect x="30" y="88" width="160" height="86" rx="2" />
      {[106, 124, 142, 160].map((y) => (
        <line key={y} x1="40" y1={y} x2="180" y2={y} />
      ))}
      <rect x="200" y="88" width="90" height="86" rx="2" />
      {[102, 116, 130, 144].map((y) => (
        <line key={y} x1="210" y1={y} x2="280" y2={y} />
      ))}
    </>
  );
}

function AnalysisOutline() {
  const steps = ["Clean", "Explore", "Test", "Report"];
  return (
    <>
      {steps.map((step, index) => {
        const x = 24 + index * 70;
        return (
          <g key={step}>
            <rect x={x} y="48" width="56" height="36" rx="2" />
            <text x={x + 28} y="70" textAnchor="middle" fontSize="9" fill="currentColor" stroke="none">
              {step}
            </text>
            {index < steps.length - 1 ? <path d={`M${x + 56} 66 h14`} /> : null}
          </g>
        );
      })}
      <rect x="24" y="106" width="262" height="70" rx="2" />
      <line x1="36" y1="122" x2="270" y2="122" />
      <line x1="36" y1="136" x2="270" y2="136" />
      <line x1="36" y1="150" x2="160" y2="150" />
    </>
  );
}

function WebsiteOutline() {
  return (
    <>
      <rect x="20" y="16" width="280" height="168" rx="4" />
      <line x1="20" y1="34" x2="300" y2="34" />
      <rect x="80" y="21" width="160" height="8" rx="4" />
      <rect x="30" y="44" width="260" height="52" rx="2" />
      <line x1="44" y1="62" x2="150" y2="62" />
      <line x1="44" y1="74" x2="118" y2="74" />
      {[30, 120, 210].map((x) => (
        <rect key={x} x={x} y="106" width="80" height="62" rx="2" />
      ))}
    </>
  );
}

function ReportOutline() {
  return (
    <>
      <rect x="92" y="12" width="136" height="176" rx="3" />
      <line x1="106" y1="30" x2="172" y2="30" />
      <line x1="106" y1="40" x2="150" y2="40" />
      {[60, 70, 80, 90].map((y) => (
        <line key={y} x1="106" y1={y} x2="214" y2={y} />
      ))}
      <rect x="106" y="106" width="108" height="56" rx="2" />
      <line x1="106" y1="124" x2="214" y2="124" />
      <line x1="106" y1="143" x2="214" y2="143" />
      <line x1="160" y1="106" x2="160" y2="162" />
    </>
  );
}

function WorkflowOutline() {
  const nodes = [
    { x: 24, y: 82 },
    { x: 98, y: 40 },
    { x: 98, y: 124 },
    { x: 180, y: 82 },
    { x: 256, y: 82 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
  ];
  return (
    <>
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
      ))}
      {nodes.map((node, index) => (
        <rect key={index} x={node.x - 20} y={node.y - 16} width="40" height="32" rx="6" />
      ))}
    </>
  );
}

export function ArtifactFrame({
  kind,
  media,
  label,
  decorative = false,
  highlight = false,
  priority = false,
  sizes,
  className,
}: ArtifactFrameProps) {
  return (
    <div className={cn("relative overflow-hidden bg-background", className)}>
      {media ? (
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          sizes={sizes}
          priority={priority}
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <svg
          viewBox="0 0 320 200"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full text-foreground/30"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          role={decorative ? undefined : "img"}
          aria-label={decorative ? undefined : label}
          aria-hidden={decorative ? true : undefined}
        >
          {kind === "dashboard" ? <DashboardOutline highlight={highlight} /> : null}
          {kind === "analysis" ? <AnalysisOutline /> : null}
          {kind === "website" ? <WebsiteOutline /> : null}
          {kind === "report" ? <ReportOutline /> : null}
          {kind === "workflow" ? <WorkflowOutline /> : null}
        </svg>
      )}
    </div>
  );
}
