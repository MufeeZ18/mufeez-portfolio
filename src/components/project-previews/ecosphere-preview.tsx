/*
 * Ecosphere — designed UI preview of the social feed (not a screenshot).
 * Shows only documented functionality: posts, likes, comments, connections
 * and signed-in (authenticated) access. All people and posts are fictional.
 *
 * Built in HTML rather than SVG so text stays legible when the card narrows;
 * container queries switch between the compact (mobile) and full layouts.
 */

function Avatar({ initials, tone, size = "md" }: { initials: string; tone: string; size?: "sm" | "md" }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-semibold text-[#06120e] ${
        size === "sm" ? "size-7 text-[10px]" : "size-9 text-[12px]"
      }`}
      style={{ background: tone }}
    >
      {initials}
    </span>
  );
}

function HeartOutline() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M8 13.5s-5.5-3.2-5.5-7A3 3 0 0 1 8 4.6a3 3 0 0 1 5.5 1.9c0 3.8-5.5 7-5.5 7Z" strokeLinejoin="round" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2.5 4.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H7l-3 2.5v-2.5h0a2 2 0 0 1-1.5-2Z" strokeLinejoin="round" />
    </svg>
  );
}

/** Like button whose reaction replays on a loop (static "liked" under reduced motion). */
function LikeButton({ before, animated }: { before: number; animated?: boolean }) {
  if (!animated) {
    return (
      <span className="flex items-center gap-1.5">
        <HeartOutline />
        {before}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-[var(--eco)]">
      <span className="relative grid size-4 place-items-center">
        <span className="eco-heart-outline absolute inset-0 text-[#9fb3ab]">
          <HeartOutline />
        </span>
        <svg viewBox="0 0 16 16" className="eco-heart-fill absolute inset-0 size-4" fill="currentColor">
          <path d="M8 13.5s-5.5-3.2-5.5-7A3 3 0 0 1 8 4.6a3 3 0 0 1 5.5 1.9c0 3.8-5.5 7-5.5 7Z" />
        </svg>
      </span>
      <span className="inline-grid tabular-nums">
        <span className="eco-count-before col-start-1 row-start-1 text-[#9fb3ab]">{before}</span>
        <span className="eco-count-after col-start-1 row-start-1">{before + 1}</span>
      </span>
    </span>
  );
}

const posts = [
  {
    initials: "MR",
    name: "Maya Rao",
    handle: "@maya.builds",
    time: "2h",
    tone: "#4fd1a5",
    text: "Weekend project: a tiny weather widget in React. Feedback welcome!",
    likes: 24,
    comments: 6,
    reply: { initials: "AS", name: "Arjun S.", text: "Looks clean — ship it!", tone: "#f5c26b" },
  },
  {
    initials: "LK",
    name: "Lena Kim",
    handle: "@lena.k",
    time: "5h",
    tone: "#8fb8ff",
    text: "Joined the community meetup group today. Who else is going on Saturday?",
    likes: 12,
    comments: 3,
  },
];

const suggestions = [
  { initials: "DP", name: "Dev Patel", tone: "#f59e9e" },
  { initials: "SN", name: "Sara Nair", tone: "#c4a7ff" },
];

export function EcospherePreview() {
  return (
    <div
      aria-hidden="true"
      className="@container overflow-hidden rounded-xl border border-[#1f3a31] bg-[#0b1411] font-sans text-[13px] leading-snug text-[#e6efe9] shadow-[0_24px_60px_-28px_rgb(0_0_0/0.8)] [--eco:#4fd1a5]"
    >
      {/* App header */}
      <div className="flex items-center justify-between gap-3 border-b border-[#1a2f28] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-[var(--eco)] text-[#06120e]">
            <svg viewBox="0 0 16 16" className="size-4" fill="currentColor">
              <path d="M3 12.5C3 7 6.5 3.5 13 3c0 6.5-3.5 10-9 10Zm0 0 5-5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-[15px] font-semibold tracking-tight">Ecosphere</span>
        </div>
        <div className="hidden h-8 flex-1 items-center rounded-full bg-[#13221d] px-3 text-[12px] text-[#7f968d] @md:flex @md:max-w-56">
          Search people and posts
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1 rounded-full border border-[#24453a] px-2 py-0.5 text-[11px] text-[#9fb3ab] @sm:flex">
            <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
              <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
            </svg>
            Signed in
          </span>
          <Avatar initials="YO" tone="#e6efe9" size="sm" />
        </div>
      </div>

      <div className="grid gap-3 p-3 @xl:grid-cols-[1fr_12rem] @xl:p-4">
        {/* Feed */}
        <div className="space-y-3">
          {/* Compact connections strip (narrow layouts) */}
          <div className="flex items-center justify-between rounded-lg bg-[#101c18] px-3 py-2 @xl:hidden">
            <span className="flex -space-x-2">
              {["#4fd1a5", "#f5c26b", "#8fb8ff", "#f59e9e"].map((tone, i) => (
                <span key={tone} className="size-6 rounded-full border-2 border-[#101c18]" style={{ background: tone, zIndex: 4 - i }} />
              ))}
            </span>
            <span className="text-[12px] text-[#9fb3ab]">
              <b className="font-semibold text-[#e6efe9]">48</b> connections
            </span>
          </div>

          {/* Composer */}
          <div className="flex items-center gap-2.5 rounded-lg border border-[#1a2f28] bg-[#0f1a16] p-2.5">
            <Avatar initials="YO" tone="#e6efe9" size="sm" />
            <span className="flex-1 text-[12px] text-[#7f968d]">Share an update…</span>
            <span className="rounded-full bg-[var(--eco)] px-3 py-1 text-[12px] font-semibold text-[#06120e]">Post</span>
          </div>

          {posts.map((post, i) => (
            <article
              key={post.handle}
              className={`rounded-lg border border-[#1a2f28] bg-[#0f1a16] p-3 ${i > 0 ? "hidden @lg:block" : ""}`}
            >
              <header className="flex items-center gap-2.5">
                <Avatar initials={post.initials} tone={post.tone} />
                <div className="min-w-0">
                  <p className="truncate font-semibold">{post.name}</p>
                  <p className="text-[11px] text-[#7f968d]">
                    {post.handle} · {post.time}
                  </p>
                </div>
              </header>
              <p className="mt-2.5 text-[#cfdcd5]">{post.text}</p>
              <div className="mt-3 flex items-center gap-5 border-t border-[#1a2f28] pt-2.5 text-[12px] text-[#9fb3ab]">
                <LikeButton before={post.likes} animated={i === 0} />
                <span className="flex items-center gap-1.5">
                  <CommentIcon />
                  {post.comments}
                </span>
              </div>
              {post.reply && (
                <div className="mt-2.5 flex items-start gap-2 rounded-md bg-[#13221d] p-2">
                  <Avatar initials={post.reply.initials} tone={post.reply.tone} size="sm" />
                  <p className="text-[12px] text-[#cfdcd5]">
                    <b className="font-semibold text-[#e6efe9]">{post.reply.name}</b> {post.reply.text}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Profile + connections panel (wide layouts) */}
        <aside className="hidden space-y-3 @xl:block">
          <div className="rounded-lg border border-[#1a2f28] bg-[#0f1a16] p-3 text-center">
            <span className="mx-auto block w-fit">
              <Avatar initials="YO" tone="#e6efe9" />
            </span>
            <p className="mt-2 font-semibold">Your profile</p>
            <div className="mt-3 grid grid-cols-2 border-t border-[#1a2f28] pt-2.5 text-[11px] text-[#7f968d]">
              <span>
                <b className="block text-[14px] font-semibold text-[#e6efe9]">48</b>connections
              </span>
              <span>
                <b className="block text-[14px] font-semibold text-[#e6efe9]">16</b>posts
              </span>
            </div>
          </div>
          <div className="rounded-lg border border-[#1a2f28] bg-[#0f1a16] p-3">
            <p className="text-[11px] font-semibold tracking-wide text-[#7f968d] uppercase">People you may know</p>
            <ul className="mt-2.5 space-y-2.5">
              {suggestions.map((s) => (
                <li key={s.name} className="flex items-center gap-2">
                  <Avatar initials={s.initials} tone={s.tone} size="sm" />
                  <span className="min-w-0 flex-1 truncate text-[12px]">{s.name}</span>
                  <span className="rounded-full border border-[var(--eco)] px-2 py-0.5 text-[11px] text-[var(--eco)]">Connect</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
