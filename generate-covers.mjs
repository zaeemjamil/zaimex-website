// One-off generator for local placeholder cover art. Run with:
//   node scripts/generate-covers.mjs
// Produces abstract, on-brand "data network" line-art SVGs — never fake
// dashboards, stock photography, or fabricated client screenshots.
// Replace any of the generated files at /public/images/** with real
// project imagery whenever it becomes available; the file paths stay the same.

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public", "images");

const LINE = "#8a92a0";
const LINE_SOFT = "rgba(138,146,160,0.35)";
// Balanced tint of the brand blue (#1b17ff) — readable as an accent dot on
// both the light (off-white) and dark (near-black) card backgrounds these
// SVGs render on, since the canvas itself has no background fill.
const ACCENT = "#5f5cff";

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateCover(seedStr, width = 900, height = 640) {
  const rng = mulberry32(hash(seedStr));
  const nodeCount = 8 + Math.floor(rng() * 4);
  const nodes = Array.from({ length: nodeCount }, () => ({
    x: 60 + rng() * (width - 120),
    y: 60 + rng() * (height - 120),
    r: 2.5 + rng() * 3.5,
    accent: rng() > 0.78,
  }));

  // Connect each node to its nearest 1–2 neighbours for a clean, non-chaotic network.
  const edges = [];
  nodes.forEach((node, i) => {
    const distances = nodes
      .map((other, j) => ({ j, d: Math.hypot(node.x - other.x, node.y - other.y) }))
      .filter((entry) => entry.j !== i)
      .sort((a, b) => a.d - b.d);
    const connections = 1 + Math.floor(rng() * 2);
    for (let k = 0; k < connections; k++) {
      const target = distances[k];
      if (target) edges.push([i, target.j]);
    }
  });

  const edgeLines = edges
    .map(([a, b]) => {
      const n1 = nodes[a];
      const n2 = nodes[b];
      return `<line x1="${n1.x.toFixed(1)}" y1="${n1.y.toFixed(1)}" x2="${n2.x.toFixed(1)}" y2="${n2.y.toFixed(
        1,
      )}" stroke="${LINE_SOFT}" stroke-width="1" />`;
    })
    .join("\n      ");

  const nodeCircles = nodes
    .map(
      (n) =>
        `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${n.r.toFixed(1)}" fill="${
          n.accent ? ACCENT : LINE
        }" fill-opacity="${n.accent ? 1 : 0.55}" />`,
    )
    .join("\n      ");

  // Subtle background grid for the "schematic" identity.
  const gridLines = [];
  for (let x = 0; x <= width; x += 60) {
    gridLines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="${LINE}" stroke-opacity="0.06" />`);
  }
  for (let y = 0; y <= height; y += 60) {
    gridLines.push(`<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="${LINE}" stroke-opacity="0.06" />`);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <g>
      ${gridLines.join("\n      ")}
      ${edgeLines}
      ${nodeCircles}
  </g>
</svg>
`;
}

const projectSlugs = [
  "statflow-ai",
  "retail-sales-intelligence",
  "business-performance-analytics",
  "northfield-digital-presence",
  "market-signal-data-study",
];

const serviceSlugs = [
  "data-analytics",
  "business-intelligence",
  "excel-dashboards",
  "power-bi",
  "statistical-analysis",
  "ai-automation",
  "n8n-automation",
  "web-development",
  "digital-solutions",
];

mkdirSync(join(publicDir, "projects"), { recursive: true });
mkdirSync(join(publicDir, "services"), { recursive: true });

projectSlugs.forEach((slug) => {
  writeFileSync(join(publicDir, "projects", `${slug}.svg`), generateCover(slug));
});

serviceSlugs.forEach((slug) => {
  writeFileSync(join(publicDir, "services", `${slug}.svg`), generateCover(slug, 900, 500));
});

console.log("Generated placeholder cover art for", projectSlugs.length, "projects and", serviceSlugs.length, "services.");
