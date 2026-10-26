import Image from "next/image";
import type { ReactNode } from "react";

/**
 * A licensed project photo that fills its carousel frame with object-cover
 * (sources in public/images/projects/CREDITS.md). `focus` sets the
 * object-position so the subject survives both the wide desktop frame and the
 * squarer phone frame. Optional overlay sits on top.
 */
export function PhotoCover({ src, focus = "center", overlay }: { src: string; focus?: string; overlay?: ReactNode }) {
  return (
    <div aria-hidden="true" className="@container relative h-full overflow-hidden rounded-xl border border-line-strong">
      <Image src={src} alt="" fill sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" style={{ objectPosition: focus }} />
      <div className="absolute inset-0 bg-linear-to-t from-[#06070a]/70 via-transparent to-transparent" />
      {overlay}
    </div>
  );
}
