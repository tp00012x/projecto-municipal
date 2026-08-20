import VisionCardsCarousel from "./VisionCardsCarousel";
import MotionReveal from "~/components/MotionReveal";
import { visionSectionCopy } from "~/data/site";
import type { Proposal } from "~/types/proposal";

export default function VisionSection({
  proposals,
}: {
  proposals: Proposal[];
}) {
  return (
    <section className="section vision-section" id="vision">
      <div className="shell">
        <MotionReveal>
          <header className="vision-header">
            <div className="vision-header-main">
              <p className="eyebrow vision-eyebrow">
                <span aria-hidden="true" />
                {visionSectionCopy.eyebrow}
              </p>
              <h2 className="vision-title">{visionSectionCopy.title}</h2>
            </div>
            <p className="vision-description">{visionSectionCopy.description}</p>
          </header>
        </MotionReveal>

        <MotionReveal delay={120}>
          <VisionCardsCarousel proposals={proposals} />
        </MotionReveal>
      </div>
    </section>
  );
}
