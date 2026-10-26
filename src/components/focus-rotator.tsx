"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { duration, ease } from "@/lib/motion";

/** Cycles through focus areas. Static (first item) under reduced motion. */
export function FocusRotator({ items }: { items: readonly string[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || items.length < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % items.length), 2800);
    return () => window.clearInterval(timer);
  }, [reduceMotion, items.length]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {/* Full list for assistive tech; the animated word is decorative. */}
      <span className="sr-only">{items.join(", ")}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={items[index]}
          aria-hidden="true"
          className="col-start-1 row-start-1 whitespace-nowrap text-cyan"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: duration.slow, ease: ease.outExpo }}
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
