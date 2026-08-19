import { ArrowRightIcon, SparkIcon } from "~/components/Icons";
import MotionReveal from "~/components/MotionReveal";
import { joinProposalText } from "~/lib/proposal-utils";
import type { Proposal } from "~/types/proposal";

const featuredNumbers = [6, 10, 11, 14, 16, 21, 22];

export default function FeaturedProposals({
  proposals,
}: {
  proposals: Proposal[];
}) {
  const featured = featuredNumbers
    .map((number) => proposals.find((proposal) => proposal.numero === number))
    .filter((proposal): proposal is Proposal => Boolean(proposal));

  return (
    <section className="section featured-section" id="destacadas">
      <div className="shell">
        <MotionReveal className="featured-heading">
          <div>
            <p className="eyebrow light">Lecturas destacadas</p>
            <h2>
              Tecnología, oportunidades
              <span> y gestión abierta.</span>
            </h2>
          </div>
          <p>
            Siete propuestas vinculadas a innovación municipal y desarrollo
            económico. La selección es temática, no una recomendación electoral.
          </p>
        </MotionReveal>

        <div className="featured-grid">
          {featured.map((proposal, index) => (
            <MotionReveal
              className={`featured-card featured-card-${index + 1}`}
              delay={index * 55}
              key={proposal.id}
            >
              <div className="featured-card-top">
                <span>
                  <SparkIcon />
                  {proposal.categoria}
                </span>
                <strong>{String(proposal.numero).padStart(2, "0")}</strong>
              </div>
              <h3>{proposal.titulo}</h3>
              <p>{joinProposalText(proposal.objetivo)}</p>
              <a href="#propuestas">
                Abrir en el explorador <ArrowRightIcon />
              </a>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

