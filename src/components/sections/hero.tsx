import type { CSSProperties } from "react";
import { FocusRotator } from "@/components/focus-rotator";
import { ArrowDownIcon, socialIcons } from "@/components/icons";
import { SystemDiagram } from "@/components/system-diagram";
import { profile, socialLinks } from "@/content/site";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  const heroLinks = socialLinks.filter((l) => l.id !== "instagram");

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="shell grid items-center gap-x-12 gap-y-14 pt-[calc(var(--nav-height)+3.5rem)] pb-section lg:min-h-svh lg:grid-cols-12 lg:pt-[calc(var(--nav-height)+2rem)] lg:pb-16"
    >
      <div className="min-w-0 lg:col-span-7">
        <p
          className="enter label-mono inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pr-3.5 pl-2.5 text-fg-muted"
          style={stagger(0)}
        >
          <span aria-hidden="true" className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-cobalt opacity-60" />
            <span className="relative size-2 rounded-full bg-cobalt" />
          </span>
          Currently at {profile.current.company}
        </p>

        <h1 id="hero-title" className="enter mt-7 text-display font-bold text-fg" style={stagger(1)}>
          {profile.firstName}
          <br />
          <span className="text-gradient">{profile.lastName}</span>
        </h1>

        <p
          className="enter mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-heading font-semibold text-fg"
          style={stagger(2)}
        >
          {profile.role}
          <span aria-hidden="true" className="h-px w-6 translate-y-[-0.3em] bg-line-strong" />
          <span className="font-mono text-body font-normal">
            <span className="sr-only">working with </span>
            <FocusRotator items={profile.focusAreas} />
          </span>
        </p>

        <p className="enter mt-6 max-w-[34rem] text-lead text-fg-muted" style={stagger(3)}>
          {profile.intro}
        </p>

        <div className="enter mt-9 flex flex-wrap items-center gap-3" style={stagger(4)}>
          <a href="#projects" className="btn btn-primary">
            View projects
            <ArrowDownIcon width={16} height={16} />
          </a>
          <a href="#contact" className="btn btn-ghost">
            Get in touch
          </a>
        </div>

        <div className="enter mt-10 flex items-center gap-5" style={stagger(5)}>
          <ul className="flex items-center gap-2">
            {heroLinks.map((link) => {
              const Icon = socialIcons[link.id];
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="icon-btn"
                    aria-label={link.external ? `${link.label} (opens in a new tab)` : `${link.label}: ${link.handle}`}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          <p className="label-mono text-fg-subtle">{profile.location}</p>
        </div>
      </div>

      <div className="enter mx-auto w-full max-w-[34rem] min-w-0 lg:col-span-5 lg:max-w-none" style={stagger(4)}>
        <SystemDiagram />
      </div>
    </section>
  );
}
