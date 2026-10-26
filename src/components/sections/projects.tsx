import type { CSSProperties } from "react";
import { ArrowUpRightIcon, GitHubIcon } from "@/components/icons";
import { CAROUSEL_VISUALS, ProjectVisual } from "@/components/project-visuals";
import { SectionHeader } from "@/components/section-header";
import { projects, type Project } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

function ProjectLinks({ project }: { project: Project }) {
  // Buttons render only for verified URLs; nothing is shown otherwise.
  if (!project.repositoryUrl && !project.demoUrl) return null;
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Live demo
          <ArrowUpRightIcon width={16} height={16} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
      {project.repositoryUrl && (
        <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          <GitHubIcon width={16} height={16} />
          Repository
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  // Undocumented projects get a compact row so they don't read as empty showcases.
  const compact = project.comingSoon === true;
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal
      as="article"
      aria-labelledby={`project-${project.id}`}
      style={{ "--accent": project.accent } as CSSProperties}
      className="group panel grid overflow-hidden transition-[border-color] duration-(--duration-slow) ease-out-expo hover:border-line-strong lg:grid-cols-12"
    >
      {/* Illustration */}
      <figure
        className={`relative isolate overflow-hidden border-line ${compact ? "lg:col-span-5" : "lg:col-span-7"} ${
          flip ? "border-b lg:order-2 lg:border-b-0 lg:border-l" : "border-b lg:border-r lg:border-b-0"
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background: `radial-gradient(70% 60% at ${flip ? "70%" : "30%"} 40%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)`,
          }}
        />
        <div
          className={`p-3 transition-transform duration-(--duration-cinematic) ease-out-expo group-hover:scale-[1.015] sm:p-6 ${
            CAROUSEL_VISUALS.has(project.visual) ? "" : "sm:pb-11"
          } ${
            compact ? "mx-auto max-w-[26rem] lg:py-4" : ""
          }`}
        >
          <ProjectVisual kind={project.visual} />
        </div>
{CAROUSEL_VISUALS.has(project.visual) ? (
          <figcaption className="sr-only">{project.title} artwork — photo and designed concept, not actual application screenshots</figcaption>
        ) : (
          <figcaption className="label-mono px-4 pb-3 text-fg-subtle sm:absolute sm:bottom-4 sm:left-6 sm:p-0">
            {project.artworkLabel ?? "Concept illustration"}
            <span className="sr-only"> — designed artwork, not an actual application screenshot</span>
          </figcaption>
        )}
      </figure>

      {/* Content */}
      <div className={`flex flex-col p-5 sm:p-7 lg:p-8 ${compact ? "lg:col-span-7 lg:justify-center" : "lg:col-span-5"}`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="label-mono" style={{ color: "var(--accent)" }}>
            {number}
          </p>
          {project.kind && <p className="label-mono text-fg-muted">{project.kind}</p>}
        </div>

        <h3 id={`project-${project.id}`} className="mt-3 text-card text-fg">
          {project.title}
          {project.badge && (
            <span
              className="label-mono ml-3 inline-block translate-y-[-0.35em] rounded-sm border px-2 py-1 align-middle"
              style={{ borderColor: "color-mix(in srgb, var(--accent) 55%, transparent)", color: "var(--accent)" }}
            >
              {project.badge}
            </span>
          )}
        </h3>

        {project.reference && (
          <p className="mt-3 inline-flex w-fit items-center gap-2 rounded-sm border border-line bg-raised px-3 py-2 text-small text-fg-muted">
            <span className="label-mono text-fg-subtle">Reference project</span>
            <span aria-hidden="true">·</span>
            <span>
              by{" "}
              <a
                href={project.reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-cobalt"
              >
                {project.reference.author}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </span>
          </p>
        )}

        <p className={`mt-4 text-fg-muted ${project.comingSoon ? "font-mono text-small" : ""}`}>{project.summary}</p>

        {project.highlights && (
          <ul className="mt-5 space-y-2 border-t border-line pt-5">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-small text-fg-muted">
                <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0" style={{ background: "var(--accent)" }} />
                {item}
              </li>
            ))}
          </ul>
        )}

        {project.tech.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Technologies">
            {project.tech.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        )}

        <ProjectLinks project={project} />
      </div>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="shell py-section">
      <SectionHeader
        index="02"
        eyebrow="Projects"
        titleId="projects-title"
        title="Featured Projects"
      />
      <div className="mt-stack space-y-5">
        {projects.map((project, i) => (
          <ProjectShowcase key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
