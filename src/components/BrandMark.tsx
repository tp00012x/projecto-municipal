import Image from "next/image";

import { brandAssets, siteConfig } from "~/data/site";

type BrandMarkProps = {
  /** Header uses light text; footer matches the same structure / Misma estructura en pie */
  variant?: "header" | "footer";
  /** Hide the slogan line on very compact layouts / Ocultar eslogan en espacios reducidos */
  showSlogan?: boolean;
};

/**
 * Compact campaign identity: official Partido Morado logo + candidate name + slogan.
 * Misma marca en encabezado y pie de página, con object-fit: contain.
 */
export default function BrandMark({
  variant = "header",
  showSlogan = true,
}: BrandMarkProps) {
  const { partidoMorado } = brandAssets;
  const isFooter = variant === "footer";

  return (
    <>
      <span
        className={`brand-mark-image brand-mark-image-partido${isFooter ? " brand-mark-image-footer" : ""}`}
      >
        <Image
          alt={isFooter ? "" : partidoMorado.alt}
          aria-hidden={isFooter ? true : undefined}
          className="brand-mark-photo"
          fill
          sizes="52px"
          src={partidoMorado.src}
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </span>
      <span className="brand-text">
        <strong>{siteConfig.candidate}</strong>
        {showSlogan ? (
          <small className="brand-slogan">
            <span className="brand-slogan-serif">Pueblo Libre</span>{" "}
            <span className="brand-slogan-script">para todos!</span>
          </small>
        ) : null}
      </span>
    </>
  );
}
