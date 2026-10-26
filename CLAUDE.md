# Mufeez Shaikh — Portfolio

@AGENTS.md

## Project brief

- Personal software engineering portfolio for **Mufeez Shaikh**. No portrait/photo.
- Style: cinematic, classy dark theme — precise typography, generous spacing, warm white text, restrained cobalt-blue accents.
- Planned: a custom interactive system diagram (backend/cloud-engineering inspired, hand-built SVG), elegant scroll transitions, distinctive project showcases.
- Make considered, custom design choices — never a generic portfolio template.

### Content sources (all content lives in `src/content/site.ts`, typed)

1. **Mufeez's confirmed details — always win.** Contact links, email `mufeezswe.28@gmail.com`, experience dates, the five-project lineup.
2. **Reference resume:** `~/Documents/Resume/Mufeez_Shaikh_Visa.pdf` — education, skills, project details. Use only this file; don't search for or pick other resume variants. Never publish it, link it, or add a download button.

Contact: GitHub https://github.com/MufeeZ18 · LinkedIn https://www.linkedin.com/in/mufeez-shaikh/ · Instagram https://www.instagram.com/mufeez.18/ (discreet only).

Experience — show **company, role, dates only** (these dates override the resume):

| Company | Role | Dates |
| --- | --- | --- |
| Accenture | Advanced Associate Software Engineer – Java Full Stack | July 2026–Present |
| Quadruple Software Systems LLP | Software Engineer | March 2025–July 2026 |
| Lamrin Solutions Pvt Ltd | Web Developer Intern | January 2024–April 2024 |
| Quadruple Software Systems LLP | Python Developer Intern | July 2021–September 2021 |

Skills: resume groups + AWS (confirmed). Must include AWS, Docker, Kubernetes. Rendered as individual labels per group; Cloud & Infrastructure is the wide, highlighted tile.

Hero copy: badge "Currently at Accenture"; intro "I build full-stack applications with Java, Spring Boot and React."

Projects (section title "Featured Projects"; artwork captioned "Concept illustration" by default, "UI concept" for the Ecosphere and Airbnb Clone HTML previews, per-slide captions ("Photo · Unsplash" / "UI concept" / "Concept illustration") for the three slideshow cards; no explanatory paragraph):
1. **Ecosphere** — "Social media application"; tech React.js, Node.js, Express.js, MongoDB, JWT. Functionality comes only from the resume's "Social Engagement Platform" entry (posts, likes, comments, connections, JWT-authenticated access). Description text supplied by Mufeez.
2. **Airbnb Clone** — described from the resume's "Property Booking & Reservation Platform".
3. **Inventory Management System** — label "Full Stack Application". Description, highlights and tech list were supplied directly by Mufeez (purchase recording, vendor/material lookup, vendor + date-range reports; Spring Boot + React). It is **not** the resume's "Retail Inventory & Recommendation Platform" — an earlier version wrongly reused that content (JDBC, stock updates, recommendations); never reintroduce it. Never call it a capstone anywhere on the site.
4. **SkillSphere** and 5. **ElectroRoute EV** — descriptions originally drawn from https://shubhamraut.me/. Mufeez asked (2026-10-26) to remove the "Reference project · by Shubham Raut" badges; the `reference` field still exists in the `Project` type but is unset.

`repositoryUrl` / `demoUrl` are optional; buttons render only when set. Never use `#` or guessed URLs.

### Content rules

- **Never invent** achievements, awards, certifications, metrics, testimonials, availability, or URLs. If content is missing, leave a clearly marked gap and ask.
- Resume metrics (percentages, counts) are deliberately not shown.

## Stack & technical decisions

- **Next.js 16.4.3** (App Router, `src/` dir, `@/*` alias). Read `node_modules/next/dist/docs/` before using unfamiliar APIs — this version differs from older training data.
  - Scaffold enabled `cacheComponents` and `partialPrefetching` in `next.config.ts`. Avoid uncached request-time values (e.g. `new Date()`) in server components without `"use cache"`/Suspense.
- **React 19.3**, **TypeScript** with `strict: true`.
- **Tailwind CSS v4** (CSS-first config; no `tailwind.config`). Custom CSS lives in `globals.css` where it's clearer than utilities (atmosphere, primitives).
- **Motion for React** — package `motion` (v14), import from `motion/react`. Client components only.
- Signature graphic: custom inline SVG + Motion (no chart/diagram libraries).
- Contact form (future): Route Handler at `src/app/api/contact/route.ts` on the Node.js runtime.
- Deploy: Git/GitHub → Vercel.

### Design system

- Tokens: `src/styles/tokens.css`. Tokens inside `@theme` generate Tailwind utilities; Tailwind's default colors/fonts/type scale/easings are reset so only brand tokens exist.
  - Colors: `ink` / `surface` / `raised` / `overlay` (backgrounds), `fg` / `fg-muted` / `fg-subtle` (warm-white text), `cobalt` (primary accent, focus), `cyan` (sparing highlight: rotating focus text, signals), `cobalt-deep` + `cobalt-glow` / `cyan-glow` (fills/glows only), `line` / `line-strong` (hairlines). Per-project accents are set as `--accent` inline and used only inside that project's showcase.
  - Type: headings and body both use Geist Sans (`font-display` and `font-sans` both map to it); `font-mono` is Geist Mono. Bricolage Grotesque was tried and dropped — its tight pairs (`ff`, `ee`) and quirky `Q`/`y` collided at display sizes. Size hierarchy: `text-display` (hero name, −0.035em) → `text-title` (section titles, −0.028em) → `text-card` (project titles, −0.02em) → `text-heading`. Keep negative tracking modest; don't go tighter than these.
  - Spacing: `gutter`, `section`, `stack` (fluid) + Tailwind's 4px scale. Containers: `max-w-content`, `max-w-measure`.
  - Motion: `ease-out-expo|out-quart|in-out` utilities; `--duration-*` CSS vars. JS mirror in `src/lib/motion.ts`.
- Primitives (`globals.css`): `shell`, `label-mono`, `skip-link`, `text-gradient`, `.btn` / `.btn-primary` / `.btn-ghost`, `.icon-btn`, `.tag`, `.panel`, `.atmosphere`.
- Motion:
  - Hero entrance is **pure CSS** (`.enter` + `--i` stagger) so it never depends on JS.
  - Section reveals use `<Reveal>` (`src/components/motion/reveal.tsx`): server HTML is visible; only elements below the fold are hidden after hydration, then revealed once. React owns the `data-reveal` attribute (a DOM-mutating observer caused hydration mismatches with streamed segments).
  - Motion for React drives the nav active pill, mobile menu, scroll progress bar, focus-area rotator and diagram tilt.
  - The signature diagram's signals use SVG SMIL (`animateMotion`), with a Pause control; hidden and replaced by static markers under reduced motion.

### Page structure

`src/app/page.tsx` → `SiteNav` (floating pill nav, active section via IntersectionObserver, mobile menu, scroll progress) → sections in `src/components/sections/` (`hero`, `about`, `projects`, `experience`, `skills`, `contact`) → `SiteFooter`. Project artwork: `src/components/project-visuals.tsx` dispatches to designed HTML previews and photos in `src/components/project-previews/`. Ecosphere (social feed) and Airbnb Clone (booking UI) are single "UI concept" previews. Inventory Management System, SkillSphere and ElectroRoute EV use `ProjectCarousel`: an Unsplash photo slide first, then a "UI concept" (or, for EV, "Concept illustration") slide. It auto-advances every 4.5s, pauses on hover/focus, never auto-advances under reduced motion, and has dot buttons plus a per-slide caption. The frame has a fixed height (230px on phones, 340px from `sm`); slides are absolutely positioned and must fill it, so switching never shifts layout. Photo slides (`PhotoCover`) use `object-cover` with a per-photo `focus` (object-position). UI concepts render a compact layout below the `@xl` container width and the full layout above, both sized to fit the frame. HTML previews use container queries so text stays ≥ ~11px on phones and condense at narrow widths. All demo people, vendors, listings and prices are fictional, and previews show only documented functionality (no payments, wishlists).

### Images

- Photos live in `public/images/projects/`; sources, photographers and license are recorded in `public/images/projects/CREDITS.md` (Unsplash License). Add every new image there.
- Rendered with `next/image` (`fill` + `sizes`). Diagram: `src/components/system-diagram.tsx` (content in `diagramNodes`).

### Gotchas

- Tailwind's default palette is reset, so `white`/`black` utilities don't exist — use `[#fff]` / `[#000]` (or tokens).
- The dev server has twice served stale CSS after `globals.css` edits (and after running `next build` alongside it). If a CSS change doesn't appear, restart the dev server before debugging.

### Accessibility baseline (keep it)

- Semantic landmarks (`header`/`main`/`nav`/`footer`), one `h1`, skip link.
- Global `:focus-visible` cobalt ring; never remove outlines without a replacement.
- All text tokens ≥ 4.5:1 on `ink` (see header comment in `tokens.css`).
- Reduced motion: `MotionConfig reducedMotion="user"` + CSS media query zeroing durations. New animations must degrade gracefully.
- External links: `target="_blank" rel="noopener noreferrer"` with sr-only "(opens in a new tab)".

## Commands

```bash
npm run dev         # dev server → http://localhost:3000
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run build       # production build
npm run check       # lint + typecheck + build
```

## Progress

- [x] Stage 1 — Setup, design tokens, foundation page, a11y baseline
- [x] Stage 2 — Complete homepage: nav, hero + signature diagram, about/education, five project showcases, experience, skills, contact, footer
- [ ] Content gaps: Ecosphere overview; project repo/demo URLs; Mufeez's own work for SkillSphere/ElectroRoute EV (or replace them)
- [ ] Contact form (Route Handler, Node.js runtime)
- [ ] SEO/OG images, GitHub repo, Vercel deployment (not yet — no commits/deploys until asked)
