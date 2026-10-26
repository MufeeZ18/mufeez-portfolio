"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { duration, ease } from "@/lib/motion";

const INTERVAL_MS = 4500;

export type CarouselSlide = {
  /** Discreet caption, e.g. "Photo · Unsplash" or "UI concept". */
  label: string;
  content: ReactNode;
};

/**
 * Project artwork slideshow: auto-advances, pauses on hover/focus, and never
 * auto-advances under reduced motion (the dots still switch slides).
 *
 * The frame has a fixed height per breakpoint (230px phones, 340px from
 * `sm`), so every slide is the same size and switching never shifts layout.
 * Slides must fill the frame (`h-full`): photos use object-cover, UI concepts
 * provide compact layouts for small frames.
 */
export function ProjectCarousel({ slides }: { slides: readonly CarouselSlide[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, reduceMotion, slides.length]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative h-[230px] overflow-hidden rounded-xl sm:h-[340px]">
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <motion.div
              key={slide.label}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: active ? 1 : 0, x: active ? 0 : i < index ? -16 : 16 }}
              transition={{ duration: duration.slow, ease: ease.outExpo }}
              style={{ pointerEvents: active ? "auto" : "none", zIndex: active ? 1 : 0 }}
              inert={!active}
            >
              {slide.content}
            </motion.div>
          );
        })}
      </div>

      {/* Caption + manual controls */}
      <div className="mt-2.5 flex items-center justify-between gap-3">
        <p className="label-mono text-fg-subtle" aria-live="polite">
          {slides[index].label}
          <span className="sr-only"> — slide {index + 1} of {slides.length}</span>
        </p>
        <span className="-mr-1 flex">
          {slides.map((slide, i) => (
            <button
              key={slide.label}
              type="button"
              aria-label={`Show ${slide.label.toLowerCase()}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
              className="group/dot grid h-6 place-items-center rounded-full px-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-(--duration-base) ${
                  i === index ? "w-5 bg-[var(--accent)]" : "w-1.5 bg-line-strong group-hover/dot:bg-fg-subtle"
                }`}
              />
            </button>
          ))}
        </span>
      </div>
    </div>
  );
}
