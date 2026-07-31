export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <a className="brand footer-brand" href="#inicio">
            <span className="brand-mark" aria-hidden="true">
              PL
            </span>
            <span>
              <strong>Pueblo Libre 2027–2030</strong>
              <small>Plataforma informativa</small>
            </span>
          </a>
          <p>
            Las propuestas presentadas provienen del Plan de Gobierno Municipal
            2027–2030.
          </p>
        </div>
        <div>
          <strong>Explorar</strong>
          <a href="#vision">Visión de desarrollo</a>
          <a href="#propuestas">23 propuestas</a>
          <a href="#equipo">Nuestro equipo</a>
        </div>
        <div>
          <strong>Información</strong>
          <a href="#privacidad">Política de privacidad</a>
          <a href="#aviso-legal">Aviso legal</a>
          <a href="mailto:contacto@pueblolibre2030.pe">Correo de contacto</a>
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
        <span>© 2027 Plataforma informativa Pueblo Libre</span>
        <span>Diseñada para lectura accesible y participación ciudadana.</span>
      </div>
      <div className="legal-notes shell">
        <p id="privacidad">
          <strong>Privacidad:</strong> el correo es opcional. Los aportes se
          almacenan para moderación y análisis agregado; evita incluir datos
          sensibles.
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

