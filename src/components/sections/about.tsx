import { SectionHeader } from "@/components/section-header";
import { education, profile } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

const facts = [
  { term: "Based in", value: profile.location },
  { term: "Currently", value: profile.current.company },
  { term: "Focus", value: "Java full stack" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="shell py-section">
      <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <SectionHeader
          className="lg:col-span-5"
          index="01"
          eyebrow="About"
          titleId="about-title"
          title={
            <>
              Services underneath,
              <br className="hidden sm:block" /> <span className="text-fg-muted">interfaces on top.</span>
            </>
          }
        />

        <div className="lg:col-span-7 lg:pt-10">
          <Reveal className="space-y-5 text-lead text-fg-muted">
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal as="dl" className="mt-10 grid grid-cols-3 border-y border-line">
            {facts.map((fact) => (
              <div key={fact.term} className="border-l border-line py-5 pl-4 first:border-l-0 first:pl-0 sm:pl-6">
                <dt className="label-mono text-fg-subtle">{fact.term}</dt>
                <dd className="mt-2 font-display text-[clamp(0.9375rem,0.85rem+0.4vw,1.125rem)] font-semibold text-fg">
                  {fact.value}
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      <div className="mt-stack">
        <Reveal as="h3" className="label-mono flex items-center gap-3 text-fg-subtle">
          Education
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </Reveal>
        <ol className="mt-6 grid items-start gap-4 md:grid-cols-2">
          {education.map((entry, i) => (
            <Reveal
              as="li"
              key={entry.institution}
              index={i}
              className="panel p-6 sm:p-7"
            >
              <p className="label-mono text-cobalt">
                {entry.start} — {entry.end}
              </p>
              <p className="mt-4 font-display text-heading font-semibold text-fg">{entry.qualification}</p>
              <p className="mt-1.5 text-fg-muted">
                {entry.institution}
                <span className="text-fg-subtle"> · {entry.location}</span>
              </p>
              {entry.coursework && (
                <div className="mt-6 border-t border-line pt-5">
                  <p className="label-mono text-fg-subtle">Relevant coursework</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {entry.coursework.map((course) => (
                      <li key={course} className="tag">
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
