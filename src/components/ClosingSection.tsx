import CampaignBanner from "~/components/CampaignBanner";
import MotionReveal from "./MotionReveal";
import { ArrowRightIcon } from "./Icons";

export default function ClosingSection() {
  return (
    <section className="closing-section">
      <div className="closing-orb closing-orb-one" />
      <div className="closing-orb closing-orb-two" />
      <MotionReveal className="shell closing-content">
        <CampaignBanner className="closing-brand-banner" />
        <p className="eyebrow light">Declaración atribuida a la candidatura</p>
        <blockquote>
          “No llegamos a aprender cómo trabajar por Pueblo Libre. Llevamos años
          haciéndolo como vecinos, docentes y dirigentes vecinales.”
        </blockquote>
        <p>Conoce las propuestas para el desarrollo de Pueblo Libre 2027–2030.</p>
        <a className="button button-yellow" href="#propuestas">
          Volver a las propuestas <ArrowRightIcon />
        </a>
      </MotionReveal>
    </section>
  );
}

