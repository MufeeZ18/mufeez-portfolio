import Image from "next/image";

/*
 * Airbnb Clone — designed UI preview of the booking flow (not a screenshot).
 * Shows only documented functionality: listings, availability by date and
 * reservations behind sign-in. No payments, totals, ratings or wishlists.
 * Listing names, places and prices are fictional; photos are Unsplash-licensed
 * and stored locally (sources: public/images/projects/CREDITS.md).
 */

const listings = [
  { name: "Pinewood Log Cabin", place: "Manali, India", price: "₹5,200", photo: "/images/projects/stay-cabin.jpg", alt: "Log cabin among pine trees" },
  { name: "Palm Court Villa", place: "Goa, India", price: "₹8,400", photo: "/images/projects/stay-pool-villa.jpg", alt: "White villa beside a swimming pool", selected: true },
  { name: "Linden Street Loft", place: "Pune, India", price: "₹3,600", photo: "/images/projects/stay-city-loft.jpg", alt: "Bright bedroom with a large window" },
];

const selected = listings.find((l) => l.selected) ?? listings[0];
const RANGE = [12, 13, 14, 15];
/** Blank cells before day 1, chosen so the selected range sits on one calendar row. */
const MONTH_OFFSET = 3;

function SearchField({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`min-w-0 px-3 py-1.5 ${className}`}>
      <p className="text-[10px] font-semibold tracking-wide text-[#6b625c] uppercase">{label}</p>
      <p className="truncate text-[12px] font-medium text-[#1f1b18]">{value}</p>
    </div>
  );
}

export function StaysPreview() {
  return (
    <div
      aria-hidden="true"
      className="@container overflow-hidden rounded-xl border border-[#000]/10 bg-[#fbf8f6] font-sans text-[13px] leading-snug text-[#1f1b18] shadow-[0_24px_60px_-28px_rgb(0_0_0/0.9)] [--stay:#e5484d]"
    >
      {/* Header + search */}
      <div className="border-b border-[#000]/[0.07] px-3 pt-3 pb-3 @lg:px-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[14px] font-bold tracking-tight text-[var(--stay)]">
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
              <path d="M2.5 7.5 8 3l5.5 4.5V13a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5Z" />
              <path d="M6.5 13.5v-3.5h3v3.5" />
            </svg>
            Airbnb Clone
          </span>
          <span className="grid size-7 place-items-center rounded-full bg-[#1f1b18] text-[10px] font-semibold text-[#fff]">YO</span>
        </div>
        <div className="mt-3 flex items-center rounded-full border border-[#000]/10 bg-[#fff] p-1 shadow-[0_2px_10px_-4px_rgb(0_0_0/0.15)]">
          <SearchField label="Where" value="Goa, India" className="flex-[1.3]" />
          <span className="h-7 w-px bg-[#000]/10" />
          <SearchField label="Dates" value="12 – 15 Mar" className="flex-1" />
          <span className="hidden h-7 w-px bg-[#000]/10 @md:block" />
          <SearchField label="Guests" value="2 guests" className="hidden flex-1 @md:block" />
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--stay)] text-[#fff]">
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="7" cy="7" r="4.5" />
              <path d="m10.5 10.5 3 3" />
            </svg>
          </span>
        </div>
      </div>

      <div className="grid gap-3 p-3 @lg:p-4">
        {/* Listings */}
        <div>
          <p className="text-[12px] text-[#6b625c]">
            <b className="font-semibold text-[#1f1b18]">3 stays</b> available for your dates
          </p>
          <ul className="mt-2.5 grid grid-cols-2 gap-2.5 @lg:grid-cols-3">
            {listings.map((l, i) => (
              <li
                key={l.name}
                className={`${i === 2 ? "hidden @lg:block" : ""} ${l.selected ? "stay-selected" : ""} rounded-lg p-1`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#e9e2dc]">
                  <Image src={l.photo} alt={l.alt} fill sizes="(min-width: 1024px) 200px, 45vw" className="object-cover" />
                </div>
                <p className="mt-2 truncate text-[12.5px] font-semibold">{l.name}</p>
                <p className="truncate text-[11.5px] text-[#6b625c]">{l.place}</p>
                <p className="mt-1 text-[12px]">
                  <b className="font-semibold">{l.price}</b> <span className="text-[#6b625c]">night</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Booking panel for the selected stay */}
        <aside className="grid gap-3 rounded-lg border border-[#000]/10 bg-[#fff] p-3 shadow-[0_6px_24px_-12px_rgb(0_0_0/0.25)] @lg:grid-cols-[1fr_13rem] @lg:gap-4">
          <div className="flex flex-col">
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate text-[12.5px] font-semibold">{selected.name}</p>
              <p className="shrink-0 text-[12px]">
                <b className="font-semibold">{selected.price}</b> <span className="text-[#6b625c]">night</span>
              </p>
            </div>
            <div className="mt-2.5 grid grid-cols-3 overflow-hidden rounded-md border border-[#000]/15 text-[11px]">
              {[
                ["Check-in", "12 Mar"],
                ["Check-out", "15 Mar"],
                ["Guests", "2 guests"],
              ].map(([label, value], i) => (
                <div key={label} className={`px-2 py-1.5 ${i < 2 ? "border-r border-[#000]/15" : ""}`}>
                  <p className="text-[9.5px] font-semibold text-[#6b625c] uppercase">{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
            <span className="mt-3 block rounded-md bg-[var(--stay)] py-2 text-center text-[12.5px] font-semibold text-[#fff] @lg:mt-auto">
              Reserve
            </span>
          </div>

          {/* Availability calendar with the selected range */}
          <div className="hidden @lg:block">
            <p className="text-[11px] font-semibold">March</p>
            <div className="mt-1 grid grid-cols-7 text-center text-[10.5px]">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={`${d}${i}`} className="pb-0.5 text-[#9a918a]">
                  {d}
                </span>
              ))}
              {Array.from({ length: MONTH_OFFSET }, (_, i) => (
                <span key={`blank-${i}`} />
              ))}
              {Array.from({ length: 28 - MONTH_OFFSET }, (_, i) => i + 1).map((day) => {
                const inRange = RANGE.includes(day);
                const edge = day === RANGE[0] || day === RANGE.at(-1);
                return (
                  <span key={day} className="relative grid h-[22px] place-items-center">
                    {inRange && (
                      <span
                        className={`stay-range absolute inset-y-px ${edge ? "inset-x-0.5 rounded-full bg-[var(--stay)]" : "inset-x-0 bg-[var(--stay)]/15"}`}
                        style={{ animationDelay: `${700 + (day - RANGE[0]) * 110}ms` }}
                      />
                    )}
                    <span className={`relative ${edge ? "font-semibold text-[#fff]" : inRange ? "text-[var(--stay)]" : "text-[#3d3632]"}`}>
                      {day}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
