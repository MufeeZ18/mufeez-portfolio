import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  titleId: string;
  intro?: ReactNode;
  className?: string;
};

export function SectionHeader({ index, eyebrow, title, titleId, intro, className }: SectionHeaderProps) {
  return (
    <Reveal className={className}>
      <p className="label-mono flex items-center gap-3 text-fg-subtle">
        <span className="text-cobalt">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
        {eyebrow}
      </p>
      <h2 id={titleId} className="mt-5 text-title text-fg">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-measure text-lead text-fg-muted">{intro}</p>}
    </Reveal>
  );
}
