import { EcospherePreview } from "@/components/project-previews/ecosphere-preview";
import { EvCover } from "@/components/project-previews/ev-cover";
import { EvMap } from "@/components/project-previews/ev-map";
import { MarketplacePreview } from "@/components/project-previews/marketplace-preview";
import { PhotoCover } from "@/components/project-previews/photo-cover";
import { ProjectCarousel } from "@/components/project-previews/project-carousel";
import { PurchasesPreview } from "@/components/project-previews/purchases-preview";
import { StaysPreview } from "@/components/project-previews/stays-preview";
import type { ProjectVisual as VisualKind } from "@/content/site";

/*
 * Project artwork. Designed HTML previews and licensed photos live in
 * src/components/project-previews/; none are presented as real screenshots.
 */

const PHOTO = "Photo · Unsplash";

/** Carousel visuals render their own per-slide caption and controls. */
export const CAROUSEL_VISUALS: ReadonlySet<VisualKind> = new Set(["purchases", "marketplace", "ev-photo"]);

export function ProjectVisual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "social":
      return <EcospherePreview />;
    case "booking":
      return <StaysPreview />;
    case "purchases":
      return (
        <ProjectCarousel
          slides={[
            { label: PHOTO, content: <PhotoCover src="/images/projects/inventory-warehouse.jpg" focus="50% 55%" /> },
            { label: "UI concept", content: <PurchasesPreview /> },
          ]}
        />
      );
    case "marketplace":
      return (
        <ProjectCarousel
          slides={[
            { label: PHOTO, content: <PhotoCover src="/images/projects/skillsphere-collab.jpg" focus="40% 35%" /> },
            { label: "UI concept", content: <MarketplacePreview /> },
          ]}
        />
      );
    case "ev-photo":
      return (
        <ProjectCarousel
          slides={[
            { label: PHOTO, content: <EvCover /> },
            {
              label: "Concept illustration",
              content: (
                <div className="h-full overflow-hidden rounded-xl border border-line-strong">
                  <EvMap />
                </div>
              ),
            },
          ]}
        />
      );
  }
}
