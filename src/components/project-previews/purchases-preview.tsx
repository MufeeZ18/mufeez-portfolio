/*
 * Inventory Management System — designed UI preview (not a screenshot).
 * Mirrors the confirmed features: vendor and material lookup (vendor is
 * independent; the material category determines types and units), validated
 * purchase entry with confirmation, and reports filtered by vendor and date.
 * Vendors, materials, quantities and amounts are fictional.
 *
 * Two layouts, chosen by container width: a compact summary for small frames
 * (phones) and the full form + report for wide frames. Both fill the fixed
 * carousel frame without overflowing it.
 */

/** Single-line form field: label left, value right. */
function Field({ label, value, select, suffix, className = "" }: { label: string; value: string; select?: boolean; suffix?: string; className?: string }) {
  return (
    <div className={`flex h-8 min-w-0 items-center gap-2 rounded-md border border-[#3a3428] bg-[#15130f] px-2.5 ${className}`}>
      <span className="shrink-0 text-[9.5px] font-semibold tracking-wide text-[#a39b8b] uppercase">{label}</span>
      <span className="min-w-0 flex-1 truncate text-right text-[12px]">{value}</span>
      {suffix && <span className="shrink-0 text-[11px] text-[#a39b8b]">{suffix}</span>}
      {select && <Chevron />}
    </div>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" className="size-3 shrink-0 text-[#a39b8b]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}

function Check({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" />
      <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" />
    </svg>
  );
}

const rows = [
  { date: "04 Mar", material: "Copper wire", qty: "250 m", amount: "₹18,750" },
  { date: "11 Mar", material: "PVC conduit", qty: "120 m", amount: "₹6,240" },
  { date: "19 Mar", material: "MCB 32A", qty: "40 pcs", amount: "₹11,600" },
];

function AppBar() {
  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#2e2a20] px-3 py-2">
      <span className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-md bg-[var(--amber)] text-[10px] font-bold text-[#1b1812]">IM</span>
        <span className="text-[13px] font-semibold tracking-tight whitespace-nowrap">Inventory Manager</span>
      </span>
      <span className="flex gap-1 text-[11px]">
        <span className="rounded-full bg-[var(--amber)]/15 px-2.5 py-1 font-medium text-[var(--amber)]">Purchases</span>
        <span className="hidden rounded-full px-2.5 py-1 text-[#a39b8b] @xl:inline">Reports</span>
      </span>
    </div>
  );
}

/** Phones: purchase summary + two report rows. */
function Compact() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-2 @xl:hidden">
      <section className="rounded-lg border border-[#2e2a20] bg-[#211d16] px-2.5 py-2">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[12.5px] font-semibold">Kaveri Hardware Co.</p>
          <span className="shrink-0 rounded-full border border-[var(--amber)]/50 px-2 py-0.5 text-[10.5px] text-[var(--amber)]">Electrical</span>
        </div>
        <p className="mt-1 text-[12px] text-[#cfc6b6]">
          Copper wire · 250 m · <b className="font-semibold text-[#f1ebe0]">₹18,750</b>
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="flex-1 rounded-md bg-[var(--amber)] py-1 text-center text-[12px] font-semibold text-[#1b1812]">Record purchase</span>
          <span className="flex items-center gap-1 text-[11px] text-[#9fd8a8]">
            <Check className="size-3" /> Saved
          </span>
        </div>
      </section>
      <section className="min-h-0 flex-1 rounded-lg border border-[#2e2a20] bg-[#211d16] px-2.5 py-1.5">
        <div className="flex items-center justify-between gap-2 text-[11px]">
          <p className="text-[12px] font-semibold">Report</p>
          <span className="flex items-center gap-1 text-[var(--amber)]">
            <CalendarIcon /> 01–31 Mar
          </span>
        </div>
        <ul className="mt-0.5 text-[11.5px]">
          {rows.slice(0, 2).map((r) => (
            <li key={r.date} className="flex items-center justify-between gap-2 border-t border-[#2e2a20] py-1 first:border-t-0">
              <span className="w-12 shrink-0 text-[#a39b8b]">{r.date}</span>
              <span className="min-w-0 flex-1 truncate">{r.material}</span>
              <span className="shrink-0 font-medium tabular-nums">{r.amount}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/** Wide frames: full purchase form + vendor/date report. */
function Full() {
  return (
    <div className="hidden min-h-0 flex-1 grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-2.5 p-2.5 @xl:grid">
      <section className="rounded-lg border border-[#2e2a20] bg-[#211d16] p-3">
        <p className="text-[12.5px] font-semibold">New purchase</p>
        <div className="mt-2 space-y-1.5">
          <Field label="Vendor" value="Kaveri Hardware Co." select />
          <Field label="Category" value="Electrical" select />
          {/* Category → type & unit dependency */}
          <div className="grid grid-cols-[1.35fr_1fr] gap-1.5 border-l-2 border-[var(--amber)]/60 pl-1.5">
            <Field label="Type" value="Copper wire" select />
            <Field label="Unit" value="metres" select />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <Field label="Qty" value="250" suffix="m" />
            <Field label="Amount" value="₹18,750" />
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="flex-1 rounded-md bg-[var(--amber)] py-2 text-center text-[12px] font-semibold text-[#1b1812]">Record purchase</span>
          <span className="flex items-center gap-1 text-[11px] text-[#9fd8a8]">
            <Check /> Recorded
          </span>
        </div>
      </section>

      <section className="rounded-lg border border-[#2e2a20] bg-[#211d16] p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[12.5px] font-semibold">Purchase report</p>
          <p className="text-[11px] text-[#a39b8b]">{rows.length} purchases</p>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
          <span className="flex items-center gap-1 rounded-full border border-[#3a3428] px-2.5 py-1">
            <span className="text-[#a39b8b]">Vendor</span> Kaveri Hardware Co.
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-[var(--amber)]/60 px-2.5 py-1 text-[var(--amber)]">
            <CalendarIcon /> 01 Mar – 31 Mar
          </span>
        </div>
        <table className="mt-2 w-full table-fixed text-left text-[11.5px]">
          <thead className="text-[9.5px] tracking-wide text-[#a39b8b] uppercase">
            <tr className="border-b border-[#3a3428]">
              <th className="w-[22%] py-1.5 font-semibold">Date</th>
              <th className="py-1.5 font-semibold">Material</th>
              <th className="w-[20%] py-1.5 font-semibold">Qty</th>
              <th className="w-[24%] py-1.5 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.date} className="border-b border-[#2e2a20]">
                <td className="py-1.5 text-[#a39b8b]">{r.date}</td>
                <td className="truncate py-1.5">{r.material}</td>
                <td className="py-1.5 text-[#cfc6b6]">{r.qty}</td>
                <td className="py-1.5 text-right font-medium tabular-nums">{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-1.5 flex items-center justify-between text-[11.5px]">
          <span className="text-[#a39b8b]">Total</span>
          <span className="font-semibold text-[var(--amber)] tabular-nums">₹36,590</span>
        </div>
      </section>
    </div>
  );
}

export function PurchasesPreview() {
  return (
    <div
      aria-hidden="true"
      className="@container flex h-full flex-col overflow-hidden rounded-xl border border-[#3a3428] bg-[#1b1812] font-sans text-[12px] leading-snug text-[#f1ebe0] [--amber:#f5b84b]"
    >
      <AppBar />
      <Compact />
      <Full />
    </div>
  );
}
