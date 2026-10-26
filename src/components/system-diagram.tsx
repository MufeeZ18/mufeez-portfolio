"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { diagramNodes, type DiagramNodeId } from "@/content/site";
import { spring } from "@/lib/motion";

/* ── Geometry (viewBox 0 0 400 360) ───────────────────────────────────── */

const NODE_W = 150;
const NODE_H = 54;

const positions: Record<DiagramNodeId, { x: number; y: number }> = {
  interface: { x: 88, y: 58 },
  api: { x: 304, y: 58 },
  services: { x: 304, y: 182 },
  database: { x: 304, y: 306 },
  cloud: { x: 88, y: 244 },
};

type Edge = {
  id: string;
  from: DiagramNodeId;
  to: DiagramNodeId;
  d: string;
  /** Request path (solid, carries signals) vs. platform relationship (dashed). */
  kind: "flow" | "platform";
  /** Midpoint, for the static signal shown under reduced motion. */
  mid: [number, number];
};

const edges: readonly Edge[] = [
  { id: "e-interface-api", from: "interface", to: "api", d: "M163 58 H229", kind: "flow", mid: [196, 58] },
  { id: "e-api-services", from: "api", to: "services", d: "M304 85 V155", kind: "flow", mid: [304, 120] },
  { id: "e-services-database", from: "services", to: "database", d: "M304 209 V279", kind: "flow", mid: [304, 244] },
  {
    id: "e-cloud-services",
    from: "cloud",
    to: "services",
    d: "M88 217 V196 Q88 182 102 182 H229",
    kind: "platform",
    mid: [165, 182],
  },
  {
    id: "e-cloud-database",
    from: "cloud",
    to: "database",
    d: "M88 271 V292 Q88 306 102 306 H229",
    kind: "platform",
    mid: [165, 306],
  },
];

const isConnected = (edge: Edge, node: DiagramNodeId | null) =>
  node !== null && (edge.from === node || edge.to === node);

/* ── Node glyphs, drawn in a 16×16 box ────────────────────────────────── */

function Glyph({ id }: { id: DiagramNodeId }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "interface":
      return (
        <>
          <rect x="1" y="2.5" width="14" height="11" rx="2" {...common} />
          <path d="M1 5.5h14" {...common} />
        </>
      );
    case "api":
      return <path d="M5.5 2.5C3.5 2.5 4 7 2 8c2 1 1.5 5.5 3.5 5.5M10.5 2.5c2 0 1.5 4.5 3.5 5.5-2 1-1.5 5.5-3.5 5.5" {...common} />;
    case "services":
      return (
        <>
          <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.2" {...common} />
          <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.2" {...common} />
          <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.2" {...common} />
          <rect x="9" y="9" width="5.5" height="5.5" rx="1.2" {...common} />
        </>
      );
    case "database":
      return (
        <>
          <ellipse cx="8" cy="3.5" rx="6" ry="2" {...common} />
          <path d="M2 3.5v9c0 1.1 2.7 2 6 2s6-.9 6-2v-9M2 8c0 1.1 2.7 2 6 2s6-.9 6-2" {...common} />
        </>
      );
    case "cloud":
      return <path d="M4.5 12.5h7.5a3 3 0 0 0 .4-5.97A4.5 4.5 0 0 0 3.8 6.6 3 3 0 0 0 4.5 12.5Z" {...common} />;
  }
}

/* ── Component ────────────────────────────────────────────────────────── */

export function SystemDiagram() {
  const reduceMotion = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState<DiagramNodeId | null>(null);
  const [pinned, setPinned] = useState<DiagramNodeId | null>(null);
  const [paused, setPaused] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");
  const explanationId = `${uid}-explanation`;

  const active = hovered ?? pinned;
  const activeNode = diagramNodes.find((n) => n.id === active);
  const animating = !reduceMotion && !paused;

  // SMIL signals: pause/resume the whole SVG timeline.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (animating) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [animating]);

  /* Subtle pointer-responsive tilt — fine pointers only, never with reduced motion. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), spring.soft);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), spring.soft);
  const shiftX = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), spring.soft);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const resetTilt = () => {
    px.set(0);
    py.set(0);
  };

  const togglePin = (id: DiagramNodeId) => setPinned((p) => (p === id ? null : id));
  const onNodeKey = (e: KeyboardEvent<SVGGElement>, id: DiagramNodeId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      togglePin(id);
    } else if (e.key === "Escape") {
      setPinned(null);
    }
  };

  return (
    <figure className="panel overflow-hidden" aria-labelledby={`${uid}-title`}>
      {/* Header strip */}
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-cobalt" />
          </span>
          <p id={`${uid}-title`} className="label-mono whitespace-nowrap text-fg-muted">
            Illustrative system
          </p>
        </div>
        {reduceMotion ? (
          <p className="label-mono whitespace-nowrap text-fg-subtle">Motion reduced</p>
        ) : (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="label-mono -mr-2 rounded-sm px-2 py-1 whitespace-nowrap text-fg-subtle transition-colors hover:text-fg"
          >
            {paused ? "Play" : "Pause"}
            <span className="sr-only sm:not-sr-only"> signals</span>
          </button>
        )}
      </div>

      <div
        className="relative px-3 pt-4 pb-2 sm:px-6 [perspective:1100px]"
        onPointerMove={onPointerMove}
        onPointerLeave={resetTilt}
      >
        <motion.div style={reduceMotion ? undefined : { rotateX, rotateY, x: shiftX }}>
          <svg
            ref={svgRef}
            viewBox="0 0 400 360"
            className="block h-auto w-full overflow-visible"
            role="group"
            aria-label="Illustrative system: Interface to API to Services to Database, with Cloud hosting services and data"
          >
            <defs>
              <pattern id={`${uid}-dots`} width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="var(--color-line-strong)" />
              </pattern>
              <radialGradient id={`${uid}-halo`}>
                <stop offset="0%" stopColor="var(--color-cobalt)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--color-cobalt)" stopOpacity="0" />
              </radialGradient>
              {edges.map((edge) => (
                <path key={edge.id} id={`${uid}-${edge.id}`} d={edge.d} />
              ))}
            </defs>

            <rect x="-20" y="-10" width="440" height="380" fill={`url(#${uid}-dots)`} opacity="0.55" />

            {/* Edges */}
            {edges.map((edge) => {
              const lit = isConnected(edge, active);
              const dim = active !== null && !lit;
              return (
                <g key={edge.id}>
                  <path
                    d={edge.d}
                    fill="none"
                    stroke={lit ? "var(--color-cobalt)" : "var(--color-line-strong)"}
                    strokeWidth={lit ? 1.6 : 1.1}
                    strokeDasharray={edge.kind === "platform" ? "3 5" : undefined}
                    opacity={dim ? 0.35 : 1}
                    style={{ transition: "stroke 320ms, opacity 320ms, stroke-width 320ms" }}
                  />
                </g>
              );
            })}

            {/* Travelling signals (hidden entirely under reduced motion) */}
            {!reduceMotion &&
              edges.map((edge, i) => {
                const lit = isConnected(edge, active);
                const dim = active !== null && !lit;
                const isFlow = edge.kind === "flow";
                const dur = isFlow ? 2.4 : 3.6;
                return (
                  <g key={`sig-${edge.id}`} opacity={dim ? 0.2 : 1} style={{ transition: "opacity 320ms" }}>
                    <circle r={isFlow ? 2.6 : 2} fill={isFlow ? "var(--color-cyan)" : "var(--color-cobalt)"}>
                      <animateMotion dur={`${dur}s`} begin={`${i * 0.45}s`} repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.25 1">
                        <mpath href={`#${uid}-${edge.id}`} />
                      </animateMotion>
                    </circle>
                    {isFlow && (
                      // Response travelling back, offset by half a cycle.
                      <circle r="1.8" fill="var(--color-fg-muted)" opacity="0.7">
                        <animateMotion
                          dur={`${dur}s`}
                          begin={`${i * 0.45 + dur / 2}s`}
                          repeatCount="indefinite"
                          keyPoints="1;0"
                          keyTimes="0;1"
                          calcMode="spline"
                          keySplines="0.45 0 0.25 1"
                        >
                          <mpath href={`#${uid}-${edge.id}`} />
                        </animateMotion>
                      </circle>
                    )}
                  </g>
                );
              })}

            {/* Static signal markers when motion is reduced */}
            {reduceMotion &&
              edges
                .filter((e) => e.kind === "flow")
                .map((edge) => (
                  <circle
                    key={`static-${edge.id}`}
                    cx={edge.mid[0]}
                    cy={edge.mid[1]}
                    r="2.4"
                    fill="var(--color-cyan)"
                  />
                ))}

            {/* Nodes */}
            {diagramNodes.map((node) => {
              const { x, y } = positions[node.id];
              const isActive = active === node.id;
              const isNeighbour =
                active !== null &&
                !isActive &&
                edges.some((e) => isConnected(e, active) && isConnected(e, node.id));
              const dim = active !== null && !isActive && !isNeighbour;

              return (
                <g
                  key={node.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={pinned === node.id}
                  aria-label={`${node.label}: ${node.detail}`}
                  aria-describedby={explanationId}
                  className="cursor-pointer outline-none [&:focus-visible_.node-ring]:opacity-100"
                  transform={`translate(${x - NODE_W / 2} ${y - NODE_H / 2})`}
                  opacity={dim ? 0.45 : 1}
                  style={{ transition: "opacity 320ms" }}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(node.id)}
                  onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(null)}
                  onFocus={() => setHovered(node.id)}
                  onBlur={() => setHovered(null)}
                  onClick={() => togglePin(node.id)}
                  onKeyDown={(e) => onNodeKey(e, node.id)}
                >
                  {isActive && (
                    <circle cx={NODE_W / 2} cy={NODE_H / 2} r="70" fill={`url(#${uid}-halo)`} />
                  )}
                  {/* Focus ring (keyboard only) */}
                  <rect
                    className="node-ring opacity-0"
                    x="-4"
                    y="-4"
                    width={NODE_W + 8}
                    height={NODE_H + 8}
                    rx="13"
                    fill="none"
                    stroke="var(--color-cobalt)"
                    strokeWidth="2"
                  />
                  <rect
                    width={NODE_W}
                    height={NODE_H}
                    rx="10"
                    fill={isActive ? "var(--color-raised)" : "var(--color-surface)"}
                    stroke={isActive || isNeighbour ? "var(--color-cobalt)" : "var(--color-line-strong)"}
                    strokeWidth={isActive ? 1.5 : 1}
                    style={{ transition: "stroke 320ms, fill 320ms" }}
                  />
                  <g
                    transform="translate(14 19)"
                    color={isActive ? "var(--color-cyan)" : "var(--color-fg-muted)"}
                    style={{ transition: "color 320ms" }}
                  >
                    <Glyph id={node.id} />
                  </g>
                  <text x="40" y="24" className="font-display" fontSize="15" fontWeight="600" fill="var(--color-fg)">
                    {node.label}
                  </text>
                  <text x="40" y="40" className="font-mono" fontSize="9" fill="var(--color-fg-muted)">
                    {node.detail}
                  </text>
                </g>
              );
            })}

            {/* Edge labels */}
            <text x="196" y="48" textAnchor="middle" className="font-mono" fontSize="9" fill="var(--color-fg-subtle)" letterSpacing="0.12em">
              HTTPS
            </text>
            <text x="165" y="174" textAnchor="middle" className="font-mono" fontSize="9" fill="var(--color-fg-subtle)" letterSpacing="0.12em">
              HOSTS
            </text>
          </svg>
        </motion.div>
      </div>

      {/* Explanation */}
      <figcaption className="border-t border-line px-5 py-4">
        <div id={explanationId} aria-live="polite" className="min-h-[3.25rem]">
          {activeNode ? (
            <p className="text-small text-fg-muted">
              <span className="font-display font-semibold text-fg">{activeNode.label}</span>
              <span className="mx-2 text-cobalt" aria-hidden="true">
                /
              </span>
              {activeNode.explanation}
            </p>
          ) : (
            <p className="text-small text-fg-subtle">
              <span className="hidden sm:inline">Hover or focus</span>
              <span className="sm:hidden">Tap</span> a component to see what it does and how it connects.
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
