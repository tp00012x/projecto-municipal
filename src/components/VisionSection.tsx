import { ArrowRightIcon } from "~/components/Icons";
import MotionReveal from "./MotionReveal";
import type { Proposal } from "~/types/proposal";

/** Featured proposal numbers shown as the seven vision themes / Propuestas destacadas como los siete ejes */
const featuredNumbers = [6, 10, 11, 14, 16, 21, 22];

/** Vision card color tones / Tonos de color de las tarjetas de visión */
const tones = ["purple", "yellow", "white", "ink"] as const;

export default function VisionSection({
  proposals,
}: {
  proposals: Proposal[];
}) {
  const featured = featuredNumbers
    .map((number) => proposals.find((proposal) => proposal.numero === number))
    .filter((proposal): proposal is Proposal => Boolean(proposal));

  return (
    <section className="section vision-section" id="vision">
      <div className="shell">
        <MotionReveal className="section-heading">
          <p className="eyebrow">Visión de desarrollo distrital</p>
          <h2>
            Siete temas.
            <span> Un solo distrito.</span>
          </h2>
          <p>
            Siete propuestas vinculadas a innovación municipal y desarrollo
            económico en Pueblo Libre. Una lectura transversal para comprender
            cómo se conectan bienestar, economía, ambiente e instituciones.
          </p>
        </MotionReveal>

        <div className="vision-grid vision-grid-seven">
          {featured.map((proposal, index) => (
            <MotionReveal
              className={`vision-card tone-${tones[index % tones.length]}`}
              delay={index * 55}
              key={proposal.id}
            >
              <span>{String(proposal.numero).padStart(2, "0")}</span>
              <div>
                <p className="vision-card-category">{proposal.categoria}</p>
                <h3>{proposal.titulo}</h3>
                <p>{proposal.objetivo}</p>
                <a className="vision-card-link" href="#propuestas">
                  Abrir en el explorador <ArrowRightIcon />
                </a>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
