import { PhotoCover } from "@/components/project-previews/photo-cover";

/*
 * ElectroRoute EV cover — licensed photo with a small station-search overlay
 * reflecting the documented geo-location search. Station data is fictional.
 */
export function EvCover() {
  return (
    <PhotoCover
      src="/images/projects/ev-charging.jpg"
      focus="62% 55%"
      overlay={
        <div className="absolute bottom-3 left-3 w-56 rounded-lg border border-[#fff]/15 bg-[#06131a]/75 p-2 font-sans text-[12px] text-[#fff] backdrop-blur-md @md:w-64 @md:p-3">
          <div className="flex items-center gap-2 rounded-full bg-[#fff]/10 px-3 py-1.5 text-[#fff]/80">
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="7" cy="7" r="4.5" />
              <path d="m10.5 10.5 3 3" />
            </svg>
            Stations near me
          </div>
          <p className="mt-2 flex items-center gap-2">
            <span className="grid size-5 place-items-center rounded-full bg-[#7ee0ff] text-[#06131a]">
              <svg viewBox="0 0 16 16" className="size-3" fill="currentColor">
                <path d="M9 1.5 3.5 9h4L7 14.5 12.5 7h-4Z" />
              </svg>
            </span>
            <span>
              <b className="font-semibold">4 stations</b> <span className="text-[#fff]/70">within 5 km</span>
            </span>
          </p>
        </div>
      }
    />
  );
}
