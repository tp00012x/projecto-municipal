import MotionReveal from "./MotionReveal";

export default function IdentitySection() {
  return (
    <section className="identity-section" id="contexto">
      <div className="shell identity-grid">
        <MotionReveal className="identity-copy">
          <p className="eyebrow">Contexto institucional</p>
          <h2>
            Micky Ruiz
            <span>Candidatura a la Alcaldía de Pueblo Libre</span>
          </h2>
          <p>
            Esta plataforma organiza de manera accesible el contenido atribuido
            al Plan de Gobierno Municipal 2027–2030 asociado a la candidatura de
            Micky Ruiz, afiliada al Partido Morado.
          </p>
        </MotionReveal>

        <MotionReveal className="identity-card" delay={120}>
          <span className="identity-label">Eslogan de campaña</span>
          <p>
            Pueblo Libre
            <strong> para todos</strong>
          </p>
          <small>
            Presentado aquí como elemento identificador de la candidatura.
          </small>
        </MotionReveal>
      </div>
    </section>
  );
}

