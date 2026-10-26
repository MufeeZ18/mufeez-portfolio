import { ArrowUpIcon, socialIcons } from "@/components/icons";
import { copyrightYear, navItems, profile, socialLinks } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md border border-line-strong font-display text-[0.8125rem] font-bold">
              M<span className="text-cobalt">S</span>
            </span>
            <div>
              <p className="font-display font-semibold text-fg">{profile.name}</p>
              <p className="text-small text-fg-subtle">
                {profile.role} · {profile.location}
              </p>
            </div>
          </div>
        </div>

        <nav aria-label="Footer" className="md:col-span-4">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-small text-fg-muted transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-2 md:col-span-3 md:justify-end">
          {socialLinks.map((link) => {
            const Icon = socialIcons[link.id];
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="icon-btn size-10!"
                  aria-label={link.external ? `${link.label} (opens in a new tab)` : `${link.label}: ${link.handle}`}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon width={16} height={16} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="shell flex flex-col-reverse gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label-mono text-fg-subtle">
          © {copyrightYear} {profile.name}
        </p>
        <a href="#top" className="label-mono group inline-flex items-center gap-2 text-fg-subtle transition-colors hover:text-fg">
          Back to top
          <ArrowUpIcon width={14} height={14} className="transition-transform duration-(--duration-base) group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
