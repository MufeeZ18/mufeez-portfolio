"use client";

import { useEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

type RevealTag = "div" | "li" | "article" | "dl" | "h3";
type RevealState = "static" | "pending" | "shown";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: RevealTag;
  /** Position in a group, for staggered reveals. */
  index?: number;
  children?: ReactNode;
};

/**
 * One-time reveal on scroll.
 *
 * Progressive enhancement: server HTML is fully visible ("static"). After
 * hydration, only elements still below the viewport are hidden ("pending")
 * and revealed once they scroll in. Content on screen never flickers, and if
 * JavaScript fails nothing is ever hidden. Styles live in globals.css.
 */
export function Reveal({ as = "div", index = 0, style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setState("pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setState("shown");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // All supported tags share HTMLElement behaviour; typed as div for the ref.
  const Tag = as as "div";
  return (
    <Tag {...rest} ref={ref} data-reveal={state} style={{ ...style, "--i": index } as CSSProperties}>
      {children}
    </Tag>
  );
}
