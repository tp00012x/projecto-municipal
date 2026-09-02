import Link from "next/link";

import BrandMark from "~/components/BrandMark";
import { getWhatsAppUrl, siteConfig } from "~/data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <BrandMark variant="footer" />
          </Link>
          <p>
            Las propuestas presentadas provienen del Plan de Gobierno Municipal
            2027–2030.
          </p>
        </div>
        <div>
          <strong>Explorar</strong>
          <a href="#vision">Visión de desarrollo</a>
          <Link href="/propuestas">24 propuestas</Link>
          <a href="#equipo">Nuestro equipo</a>
        </div>
        <div>
          <strong>Contacto</strong>
          <a href={getWhatsAppUrl()} rel="noopener noreferrer" target="_blank">
            WhatsApp {siteConfig.phoneDisplay}
          </a>
          <a href={`mailto:${siteConfig.email}`}>Correo de contacto</a>
          <a href="#privacidad">Política de privacidad</a>
          <a href="#aviso-legal">Aviso legal</a>
        </div>
        <div>
          <strong>Transparencia</strong>
          <p>
            Sitio informativo. No recomienda una opción electoral ni verifica de
            forma independiente la viabilidad declarada en el plan.
          </p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2027 Micky Ruiz — Plataforma informativa</span>
        <span>Diseñada para lectura accesible y participación ciudadana.</span>
      </div>
      <div className="legal-notes shell">
        <p id="privacidad">
          <strong>Privacidad:</strong> el correo es opcional. Los aportes se
          almacenan para moderación y análisis agregado; evita incluir datos
          sensibles. Los mensajes por WhatsApp se gestionan fuera de este sitio.
        </p>
        <p id="aviso-legal">
          <strong>Aviso legal:</strong> nombres, afiliación, eslogan y
          declaraciones se presentan con finalidad de identificación y
          atribución documental.
        </p>
      </div>
    </footer>
  );
}
