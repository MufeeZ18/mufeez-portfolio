/**
 * Motion tokens for Motion for React. Mirrors the CSS motion tokens in
 * src/styles/tokens.css so JS- and CSS-driven animation feel identical.
 */

type CubicBezier = [number, number, number, number];

export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as CubicBezier,
  outQuart: [0.25, 1, 0.5, 1] as CubicBezier,
  inOut: [0.65, 0, 0.35, 1] as CubicBezier,
};

/** Seconds — Motion's unit. */
export const duration = {
  fast: 0.16,
  base: 0.32,
  slow: 0.7,
  cinematic: 1.1,
};

export const spring = {
  /** Pointer-follow and indicator movement. */
  soft: { type: "spring", stiffness: 120, damping: 20, mass: 0.6 },
  snappy: { type: "spring", stiffness: 420, damping: 36 },
} as const;
