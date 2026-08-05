import BrandMark from "~/components/BrandMark";

/**
 * Visual separator between major content blocks.
 * Versión discreta del eslogan: tipografía CSS, sin repetir el banner completo del hero.
 */
export default function BrandTransition() {
  return (
    <section
      aria-label="Identidad de campaña"
      className="brand-transition"
    >
      <div className="shell brand-transition-inner">
        <div className="brand-transition-identity">
          <a className="brand brand-transition-brand" href="#inicio">
            <BrandMark showSlogan={false} />
          </a>
          <p className="brand-transition-slogan" aria-label="Pueblo Libre para todos!">
            <span className="brand-slogan-serif">Pueblo Libre</span>{" "}
            <span className="brand-slogan-script">para todos!</span>
          </p>
        </div>
        <p className="brand-transition-copy">
          Nuestro compromiso es claro: construir un distrito más seguro, con
          oportunidades para todos y espacios que nos unan.
        </p>
      </div>
    </section>
  );
}
