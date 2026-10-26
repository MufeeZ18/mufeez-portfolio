"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * App-wide Motion settings. `reducedMotion="user"` honours the OS setting:
 * transform/layout animations are skipped, opacity fades remain.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
