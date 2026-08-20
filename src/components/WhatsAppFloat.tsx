import { getWhatsAppUrl, siteConfig } from "~/data/site";
import { WhatsAppIcon } from "~/components/Icons";

/**
 * Persistent WhatsApp entry — highest-intent contact for mobile visitors.
 * Always available without scrolling back to the social strip.
 */
export default function WhatsAppFloat() {
  return (
    <a
      aria-label={`Escribir a ${siteConfig.candidate} por WhatsApp (${siteConfig.phoneDisplay})`}
      className="whatsapp-float"
      href={getWhatsAppUrl()}
      rel="noopener noreferrer"
      target="_blank"
    >
      <WhatsAppIcon className="whatsapp-float-icon" />
      <span className="whatsapp-float-label">WhatsApp</span>
    </a>
  );
}
