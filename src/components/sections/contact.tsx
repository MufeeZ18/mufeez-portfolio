import { CopyEmailButton } from "@/components/copy-email-button";
import { ArrowRightIcon, ArrowUpRightIcon, socialIcons } from "@/components/icons";
import { getSocialLink, profile } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function Contact() {
  const profiles = [getSocialLink("github"), getSocialLink("linkedin")];
  const instagram = getSocialLink("instagram");

  return (
    <section id="contact" aria-labelledby="contact-title" className="shell py-section">
      <Reveal className="panel relative overflow-hidden px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,var(--color-cobalt-glow),transparent_60%),radial-gradient(40%_50%_at_0%_100%,var(--color-cyan-glow),transparent_70%)]"
        />
        <div className="relative grid gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="@container min-w-0 lg:col-span-7">
            <p className="label-mono flex items-center gap-3 text-fg-subtle">
              <span className="text-cobalt">05</span>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              Contact
            </p>
            <h2 id="contact-title" className="mt-5 max-w-[16ch] text-[clamp(2.5rem,1.6rem+3.6vw,4.75rem)] leading-[1.02] tracking-[-0.03em] text-fg">
              Let&apos;s build something <span className="text-gradient">dependable.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-lead text-fg-muted">
              For roles, collaborations or a conversation about engineering, write to me directly.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="group mt-10 inline-flex max-w-full items-center gap-[0.4em] border-b border-line-strong pb-3 font-display text-[clamp(0.9375rem,calc((100cqi-1rem)/13.5),2.5rem)] leading-[1.2] transition-colors duration-(--duration-base) hover:border-cobalt"
            >
              {/* Sized from the column width (cqi) so the address always fits on one line. */}
              <span className="font-semibold tracking-tight whitespace-nowrap text-fg">{profile.email}</span>
              <ArrowRightIcon
                width={28}
                height={28}
                className="size-[0.7em] shrink-0 text-cobalt transition-transform duration-(--duration-base) ease-out-expo group-hover:translate-x-1"
              />
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                Send an email
              </a>
              <CopyEmailButton email={profile.email} />
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-end lg:col-span-5">
            <p className="label-mono text-fg-subtle">Elsewhere</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {profiles.map((link) => {
                const Icon = socialIcons[link.id];
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-md border border-line bg-ink/40 p-4 transition-colors duration-(--duration-base) hover:border-line-strong hover:bg-raised"
                  >
                    <span className="grid size-10 place-items-center rounded-md border border-line text-fg-muted transition-colors group-hover:text-fg">
                      <Icon />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display font-semibold text-fg">{link.label}</span>
                      <span className="block truncate font-mono text-small text-fg-subtle">{link.handle}</span>
                    </span>
                    <ArrowUpRightIcon
                      width={16}
                      height={16}
                      className="text-fg-subtle transition-[color,translate] duration-(--duration-base) ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cobalt"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                );
              })}
            </div>

            <p className="mt-5 text-small text-fg-subtle">
              Also on{" "}
              <a
                href={instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-cobalt"
              >
                Instagram
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
