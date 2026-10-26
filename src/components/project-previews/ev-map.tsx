/*
 * ElectroRoute EV concept illustration: map with charging stations, a
 * geo-search radius and a route. Coloured by the project's --accent.
 */

const C = {
  surface: "var(--color-surface)",
  raised: "var(--color-raised)",
  line: "var(--color-line)",
  lineStrong: "var(--color-line-strong)",
  fg: "var(--color-fg)",
  muted: "var(--color-fg-muted)",
  accent: "var(--accent)",
};

function Bar({ x, y, w, h = 6, fill = C.lineStrong, o = 1 }: { x: number; y: number; w: number; h?: number; fill?: string; o?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} opacity={o} />;
}

const stations: [number, number, boolean][] = [
  [198, 164, true],
  [314, 236, false],
  [262, 118, false],
  [402, 150, false],
  [150, 272, false],
];

export function EvMap() {
  return (
    <svg viewBox="0 0 560 380" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="ev-map-clip">
          <rect x="0" y="0" width="560" height="380" rx="12" />
        </clipPath>
        <radialGradient id="ev-radius">
          <stop offset="0%" stopColor={C.accent} stopOpacity="0.16" />
          <stop offset="100%" stopColor={C.accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="560" height="380" rx="12" fill={C.surface} />
      <g clipPath="url(#ev-map-clip)">
        {/* Street grid */}
        {[40, 104, 168, 232, 296, 360, 424, 488].map((x, i) => (
          <path key={`v${x}`} d={`M${x + (i % 3) * 6} 0 L${x - 20 + (i % 2) * 14} 380`} stroke={C.line} strokeWidth={i % 3 === 0 ? 6 : 2} />
        ))}
        {[50, 120, 190, 260, 330].map((y, i) => (
          <path key={`h${y}`} d={`M0 ${y} L560 ${y + 18 - (i % 2) * 30}`} stroke={C.line} strokeWidth={i % 2 === 0 ? 5 : 2} />
        ))}
        <circle cx="236" cy="200" r="128" fill="url(#ev-radius)" />
        <circle cx="236" cy="200" r="128" fill="none" stroke={C.accent} strokeOpacity="0.45" strokeDasharray="3 6" />
        {/* Route */}
        <path d="M118 330 C150 280 170 255 198 232 S240 190 198 164" fill="none" stroke={C.accent} strokeWidth="3" strokeLinecap="round" />
        <circle cx="118" cy="330" r="7" fill={C.surface} stroke={C.fg} strokeWidth="2" />
      </g>
      {stations.map(([x, y, target]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          {target && <circle r="20" fill={C.accent} opacity="0.18" />}
          <path d="M0 10c-7-7-11-11.5-11-17a11 11 0 0 1 22 0c0 5.5-4 10-11 17Z" transform="translate(0 -8)" fill={target ? C.accent : C.raised} stroke={target ? "none" : C.lineStrong} />
          <path d="M1.5 -20l-5 8h4l-1.5 6 5-8h-4Z" fill={target ? "#09090b" : C.accent} />
        </g>
      ))}
      {/* Search + result card */}
      <rect x="22" y="22" width="166" height="32" rx="16" fill={C.raised} stroke={C.lineStrong} />
      <circle cx="40" cy="38" r="5" fill="none" stroke={C.muted} strokeWidth="1.4" />
      <Bar x={54} y={35} w={96} fill={C.muted} o={0.5} />
      <rect x="372" y="268" width="166" height="90" rx="12" fill={C.raised} stroke={C.lineStrong} />
      <rect x="386" y="284" width="26" height="26" rx="7" fill={C.accent} opacity="0.2" />
      <path d="M400.5 288l-5 8h4l-1.5 6 5-8h-4Z" fill={C.accent} />
      <Bar x={422} y={288} w={90} fill={C.fg} o={0.7} />
      <Bar x={422} y={302} w={56} />
      <rect x="386" y="324" width="138" height="20" rx="10" fill={C.accent} opacity="0.9" />
    </svg>
  );
}
