import Image from "next/image";
import Link from "next/link";

import MotionReveal from "~/components/MotionReveal";

/**
 * Candidate Introduction Section / Sección de Presentación del Candidato
 * 
 * Purpose / Propósito:
 * - Introduce Micky Ruiz to voters who may not know him yet
 * - Presentar a Micky Ruiz a votantes que quizás aún no lo conocen
 * 
 * Layout / Diseño:
 * - Two-column layout on desktop (image + content)
 * - Diseño de dos columnas en escritorio (imagen + contenido)
 * - Single column on mobile (stacked)
 * - Una columna en móvil (apilado)
 */
export default function CandidateIntro() {
  return (
    <section className="section candidate-intro-section" id="presentacion">
      <div className="shell">
        <div className="candidate-intro-grid">
          {/* Image column / Columna de imagen */}
          <MotionReveal className="candidate-intro-image-wrapper">
            <div className="candidate-intro-image">
              <Image
                alt="Micky Ruiz - Candidato a la Alcaldía de Pueblo Libre"
                fill
                sizes="(max-width: 899px) 100vw, 45vw"
                src="/team/micky-presentacion.png"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          </MotionReveal>

          {/* Content column / Columna de contenido */}
          <MotionReveal className="candidate-intro-content" delay={150}>
            {/* Candidate name / Nombre del candidato */}
            <h2 className="candidate-intro-name">MICKY RUIZ</h2>
            
            {/* Subtitle with roles / Subtítulo con roles */}
            <p className="candidate-intro-roles">
              Docente <span className="separator">•</span> 
              Ex Delegado Vecinal <span className="separator">•</span> 
              Candidato a la Alcaldía por el partido Morado
            </p>

            {/* Introduction paragraphs / Párrafos de presentación */}
            <div className="candidate-intro-text">
              <p className="candidate-intro-lead">
                Vecino, si aún no me conocías, me presento. Soy Miguel Ruiz, o como
                todos me conocen en mi barrio: <strong>Micky Ruiz</strong>. Durante
                años he trabajado junto a mis vecinos, escuchando sus necesidades y
                gestionando mejoras para nuestro distrito. Hoy asumo con orgullo y
                compromiso mi candidatura a la Alcaldía de Pueblo Libre con la{" "}
                <strong>M del partido Morado</strong>{" "}
                <span className="candidate-intro-heart" aria-hidden="true">
                  💜
                </span>
              </p>

              <p>
                Vivo en el sector 1, y es allí donde he liderado varias iniciativas,
                he trabajado como delegado vecinal, defendiendo proyectos importantes
                y denunciando irregularidades cuando otros callaban.
              </p>

              {/* Commitment highlight / Destacado de compromiso */}
              <blockquote className="candidate-intro-commitment">
                <span className="candidate-intro-commitment-label">
                  Hoy, mi compromiso es claro:
                </span>
                Gestionar teniendo al vecino en el centro de cada decisión.
              </blockquote>

              <p className="candidate-intro-closing">
                Te pido tu apoyo y con tu voto, construiremos un…
              </p>
              <p className="candidate-intro-slogan">PUEBLO LIBRE para todos!</p>
            </div>

            {/* Call to action button / Botón de llamado a la acción */}
            <div className="candidate-intro-actions">
              <Link className="button button-purple" href="/propuestas">
                Conoce nuestras propuestas
              </Link>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
