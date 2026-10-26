import { SectionHeader } from "@/components/section-header";
import { skillGroups } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

/** Cloud & infrastructure gets the wide, highlighted tile. */
const FEATURED = "cloud";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="shell py-section">
      <SectionHeader
        index="04"
        eyebrow="Skills"
        titleId="skills-title"
        title="Tools I work with."
        intro="From the language and framework through to the container it ships in."
      />

      <ul className="mt-stack grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => {
          const featured = group.id === FEATURED;
          return (
            <Reveal
              as="li"
              key={group.id}
              index={i % 4}
              className={`panel flex flex-col p-5 transition-colors duration-(--duration-slow) hover:border-line-strong sm:p-6 ${
                featured ? "overflow-hidden lg:col-span-2" : ""
              } ${group.id === "backend" ? "lg:col-span-2" : ""}`}
            >
              {featured && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(circle,var(--color-cobalt-glow),transparent_70%)]"
                />
              )}
              <h3 className="label-mono flex items-center justify-between text-fg-subtle">
                {group.label}
                <span className={featured ? "text-cyan" : "text-cobalt"}>{String(i + 1).padStart(2, "0")}</span>
              </h3>
              <ul className={`relative mt-auto flex flex-wrap gap-2 ${featured ? "pt-6 sm:pt-8" : "pt-5"}`}>
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className={`rounded-md border font-display font-medium ${
                      featured
                        ? "border-cobalt/40 bg-cobalt/10 px-4 py-2 text-lead text-fg"
                        : "border-line-strong bg-raised px-3 py-1.5 text-small text-fg"
                    }`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
