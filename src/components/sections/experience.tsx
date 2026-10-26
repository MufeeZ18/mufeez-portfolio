import { SectionHeader } from "@/components/section-header";
import { experience } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-y border-line bg-surface/50">
      <div className="shell grid gap-x-12 gap-y-12 py-section lg:grid-cols-12">
        <SectionHeader
          className="lg:sticky lg:top-[calc(var(--nav-height)+3rem)] lg:col-span-4 lg:self-start"
          index="03"
          eyebrow="Experience"
          titleId="experience-title"
          title="Where I've worked."
        />

        <ol className="relative lg:col-span-8">
          {/* Timeline spine */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-line-strong md:left-[calc(11rem+5px)]" />
          {experience.map((job, i) => (
            <Reveal
              as="li"
              key={`${job.company}-${job.role}`}
              index={i}
              className="relative grid gap-2 pb-12 pl-9 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-0 md:pl-0"
            >
              <span
                aria-hidden="true"
                className={`absolute top-[0.45rem] left-0 size-[11px] rounded-full border-2 md:left-44 ${
                  job.current
                    ? "border-cobalt bg-cobalt shadow-[0_0_0_5px_var(--color-cobalt-glow)]"
                    : "border-line-strong bg-ink"
                }`}
              />
              <p className="label-mono pt-1 text-fg-subtle md:pr-6">
                <time>{job.start}</time>
                <span aria-label=" to "> — </span>
                <time className={job.current ? "text-cobalt" : undefined}>{job.end}</time>
              </p>
              <div className="md:pl-10">
                <h3 className="text-heading text-fg">{job.company}</h3>
                <p className="mt-1.5 text-fg-muted">{job.role}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
