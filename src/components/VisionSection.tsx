import MotionReveal from "./MotionReveal";

const themes = [
  {
    number: "01",
    title: "Innovación útil",
    text: "Tecnología aplicada a servicios municipales, empleo y seguridad.",
    tone: "purple",
  },
  {
    number: "02",
    title: "Ciudad que cuida",
    text: "Salud, inclusión, bienestar animal y atención a cada etapa de vida.",
    tone: "yellow",
  },
  {
    number: "03",
    title: "Desarrollo urbano",
    text: "Calles, parques, movilidad y espacios públicos pensados para convivir.",
    tone: "white",
  },
  {
    number: "04",
    title: "Gestión verificable",
    text: "Metas, costos declarados y mecanismos de transparencia ciudadana.",
    tone: "ink",
  },
];

export default function VisionSection() {
  return (
    <section className="section vision-section" id="vision">
      <div className="shell">
        <MotionReveal className="section-heading">
          <p className="eyebrow">Visión de desarrollo distrital</p>
          <h2>
            Siete temas.
            <span> Una sola ciudad.</span>
          </h2>
          <p>
            Una lectura transversal del plan para comprender cómo se conectan
            bienestar, economía, ambiente e instituciones.
          </p>
        </MotionReveal>

        <div className="vision-grid">
          {themes.map((theme, index) => (
            <MotionReveal
              className={`vision-card tone-${theme.tone}`}
              delay={index * 70}
              key={theme.number}
            >
              <span>{theme.number}</span>
              <div>
                <h3>{theme.title}</h3>
                <p>{theme.text}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

