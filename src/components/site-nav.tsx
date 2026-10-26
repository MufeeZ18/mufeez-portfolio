"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { navItems, profile, type SectionId } from "@/content/site";
import { duration, ease, spring } from "@/lib/motion";

/** Tracks which section sits in the reading band just below the nav. */
function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        // First section (in document order) currently inside the band wins.
        const current = sections.find((s) => visible.get(s.id));
        setActive((current?.id as SectionId | undefined) ?? null);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    for (const s of sections) observer.observe(s);
    return () => observer.disconnect();
  }, []);

  return active;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-linear-to-r from-cobalt-deep via-cobalt to-cyan"
      style={{ scaleX }}
    />
  );
}

export function SiteNav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Mobile menu: Escape closes, focus moves into the menu on open.
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  return (
    <>
      <ScrollProgress />
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-gutter">
        <nav
          aria-label="Primary"
          className={`mx-auto flex h-14 max-w-content items-center justify-between gap-4 rounded-full border pr-2 pl-5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-(--duration-slow) ease-out-expo ${
            scrolled || open
              ? "border-line-strong bg-overlay shadow-[0_12px_40px_-12px_rgb(0_0_0/0.7)]"
              : "border-line bg-overlay/40"
          }`}
        >
          <a
            href="#top"
            className="group flex items-center gap-3 rounded-full"
            aria-label={`${profile.name} — back to top`}
            onClick={() => setOpen(false)}
          >
            <span className="flex size-8 items-center justify-center rounded-md border border-line-strong font-display text-[0.8125rem] font-bold tracking-tight transition-colors duration-(--duration-base) group-hover:border-cobalt">
              M<span className="text-cobalt">S</span>
            </span>
            <span className="hidden font-display text-[0.9375rem] font-semibold tracking-tight lg:inline">
              {profile.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative z-10 block rounded-full px-4 py-2 text-small transition-colors duration-(--duration-base) ${
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-line-strong bg-raised"
                      transition={spring.snappy}
                    >
                      <span className="absolute -bottom-px left-1/2 h-px w-5 -translate-x-1/2 bg-cyan" />
                    </motion.span>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn btn-primary hidden min-h-10! sm:inline-flex">
              Get in touch
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="icon-btn md:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-px w-4 bg-current transition-all duration-(--duration-base) ease-out-expo ${
                    open ? "top-1.5 rotate-45" : "top-0.5"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-4 bg-current transition-all duration-(--duration-base) ease-out-expo ${
                    open ? "top-1.5 -rotate-45" : "top-2.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              id={menuId}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: duration.base, ease: ease.outExpo }}
              className="panel mx-auto mt-2 max-w-content origin-top overflow-hidden bg-overlay! p-2 backdrop-blur-xl md:hidden"
            >
              <ul>
                {navItems.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={active === item.id ? "location" : undefined}
                      onClick={() => close(false)}
                      className="flex items-center justify-between rounded-md px-4 py-3.5 font-display text-heading font-semibold tracking-tight transition-colors hover:bg-raised aria-[current]:text-cobalt"
                    >
                      {item.label}
                      <span className="label-mono text-fg-subtle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
