/*
 * SkillSphere — designed UI preview, not a screenshot. Shows the documented
 * features: freelancer discovery, profiles with past work, reviews and
 * ratings, job requests, real-time notifications. All people and projects
 * are fictional.
 *
 * Two layouts, chosen by container width: one profile + a compact request
 * action for small frames (phones), and discovery + request panel for wide
 * frames. Both fill the fixed carousel frame without overflowing it.
 */

type Freelancer = {
  initials: string;
  name: string;
  specialty: string;
  rating: string;
  reviews: number;
  tags: readonly string[];
  tone: string;
};

const freelancers: readonly Freelancer[] = [
  { initials: "AI", name: "Ananya Iyer", specialty: "UI/UX Designer", rating: "4.9", reviews: 38, tags: ["Figma", "Prototyping"], tone: "#c4b5fd" },
  { initials: "RM", name: "Rohan Mehta", specialty: "React Developer", rating: "4.8", reviews: 52, tags: ["React", "Node.js"], tone: "#93c5fd" },
];

function Star() {
  return (
    <svg viewBox="0 0 12 12" className="size-3 text-[#fcd34d]" fill="currentColor">
      <path d="M6 .8l1.6 3.3 3.6.5-2.6 2.5.6 3.6L6 9l-3.2 1.7.6-3.6L.8 4.6l3.6-.5Z" />
    </svg>
  );
}

function Bell({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 11.5h8l-1-1.5V7a3 3 0 0 0-6 0v3Zm2.5 1.5a1.5 1.5 0 0 0 3 0" />
    </svg>
  );
}

function ProfileCard({ f, selected }: { f: Freelancer; selected?: boolean }) {
  return (
    <div className={`rounded-lg border p-2.5 ${selected ? "border-[var(--violet)]/70 bg-[#1f1933]" : "border-[#2c2442] bg-[#181428]"}`}>
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full text-[12px] font-semibold text-[#120f1c]" style={{ background: f.tone }}>
          {f.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12.5px] font-semibold">{f.name}</p>
          <p className="truncate text-[11px] text-[#a59cbd]">{f.specialty}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="flex items-center justify-end gap-1 text-[12px] font-semibold">
            <Star />
            {f.rating}
          </p>
          <p className="text-[10.5px] text-[#8f86a8]">{f.reviews} reviews</p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="flex gap-1">
          {f.tags.map((t) => (
            <span key={t} className="rounded bg-[#241e36] px-1.5 py-0.5 text-[10.5px] text-[#cfc8e4]">
              {t}
            </span>
          ))}
        </span>
        {/* Past work thumbnails */}
        <span className="flex gap-1">
          {[0.55, 0.35, 0.2].map((o) => (
            <span key={o} className="h-4 w-6 rounded-sm" style={{ background: f.tone, opacity: o }} />
          ))}
        </span>
      </div>
    </div>
  );
}

function AppBar() {
  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#241e36] px-3 py-2">
      <span className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-full bg-[var(--violet)] text-[#120f1c]">
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="8" cy="8" r="5.5" />
            <path d="M2.5 8h11M8 2.5c2 2 2 9 0 11M8 2.5c-2 2-2 9 0 11" />
          </svg>
        </span>
        <span className="text-[13px] font-semibold tracking-tight">SkillSphere</span>
      </span>
      <span className="hidden h-7 flex-1 items-center rounded-full bg-[#1c1730] px-3 text-[11.5px] text-[#8f86a8] @xl:flex @xl:max-w-52">
        Search freelancers
      </span>
      <span className="flex items-center gap-2">
        <span className="relative grid size-7 place-items-center rounded-full bg-[#1c1730] text-[#cfc8e4]">
          <Bell />
          <span className="absolute -top-0.5 -right-0.5 grid size-3.5 place-items-center rounded-full bg-[var(--violet)] text-[8.5px] font-bold text-[#120f1c]">2</span>
        </span>
        <span className="grid size-7 place-items-center rounded-full bg-[#ece8f7] text-[10px] font-semibold text-[#120f1c]">YO</span>
      </span>
    </div>
  );
}

/** Phones: one profile + a compact project-request action. */
function Compact() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 p-2.5 @xl:hidden">
      <ProfileCard f={freelancers[0]} selected />
      <div className="rounded-lg border border-[#2c2442] bg-[#181428] p-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="min-w-0 truncate text-[12px]">
            <span className="text-[#a59cbd]">Request · </span>Portfolio website redesign
          </p>
          <span className="shrink-0 text-[11px] text-[#a59cbd]">2 weeks</span>
        </div>
        <span className="mt-2 block rounded-md bg-[var(--violet)] py-1.5 text-center text-[12px] font-semibold text-[#120f1c]">Send request</span>
      </div>
    </div>
  );
}

/** Wide frames: discovery list + request panel + notification. */
function Full() {
  return (
    <div className="hidden min-h-0 flex-1 grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-2.5 p-2.5 @xl:grid">
      <section className="space-y-2">
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          {["All", "Design", "Development", "Writing"].map((c) => (
            <span
              key={c}
              className={`rounded-full px-2.5 py-1 ${c === "Design" ? "bg-[var(--violet)] font-semibold text-[#120f1c]" : "border border-[#2c2442] text-[#a59cbd]"}`}
            >
              {c}
            </span>
          ))}
        </div>
        {freelancers.map((f, i) => (
          <ProfileCard key={f.name} f={f} selected={i === 0} />
        ))}
      </section>

      <section className="flex flex-col gap-2">
        <div className="rounded-lg border border-[#2c2442] bg-[#181428] p-3">
          <p className="text-[12.5px] font-semibold">Project request</p>
          <div className="mt-2 flex items-center gap-2 rounded-md bg-[#1f1933] p-1.5">
            <span className="grid size-6 place-items-center rounded-full bg-[#c4b5fd] text-[9.5px] font-semibold text-[#120f1c]">AI</span>
            <span className="text-[11.5px]">
              <span className="text-[#a59cbd]">To</span> Ananya Iyer
            </span>
          </div>
          {[
            ["Project", "Portfolio website redesign"],
            ["Timeline", "2 weeks"],
          ].map(([label, value]) => (
            <div key={label} className="mt-1.5">
              <p className="text-[9.5px] font-semibold tracking-wide text-[#8f86a8] uppercase">{label}</p>
              <p className="mt-0.5 truncate rounded-md border border-[#2c2442] bg-[#120f1c] px-2.5 py-1.5 text-[11.5px]">{value}</p>
            </div>
          ))}
          <span className="mt-2.5 block rounded-md bg-[var(--violet)] py-2 text-center text-[12px] font-semibold text-[#120f1c]">Send request</span>
        </div>
        {/* Real-time notification */}
        <div className="flex items-center gap-2 rounded-lg border border-[var(--violet)]/40 bg-[#1f1933] p-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--violet)]/20 text-[var(--violet)]">
            <Bell />
          </span>
          <p className="truncate text-[11.5px]">
            <b className="font-semibold">Rohan Mehta</b> <span className="text-[#a59cbd]">accepted your request</span>
          </p>
        </div>
      </section>
    </div>
  );
}

export function MarketplacePreview() {
  return (
    <div
      aria-hidden="true"
      className="@container flex h-full flex-col overflow-hidden rounded-xl border border-[#2c2442] bg-[#120f1c] font-sans text-[12px] leading-snug text-[#ece8f7] [--violet:#a78bfa]"
    >
      <AppBar />
      <Compact />
      <Full />
    </div>
  );
}
