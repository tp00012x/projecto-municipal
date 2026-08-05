import Image from "next/image";

import { brandAssets, siteConfig } from "~/data/site";

type BrandMarkProps = {
  /** Header uses light text; footer matches the same structure / Misma estructura en pie */
  variant?: "header" | "footer";
  /** Hide the slogan line on very compact layouts / Ocultar eslogan en espacios reducidos */
  showSlogan?: boolean;
};

/**
 * Compact campaign identity: Partido Morado logo (header) or banner crop + candidate name + slogan.
 * En el encabezado se usa el logotipo oficial del Partido Morado con object-fit: contain.
 */
export default function BrandMark({
  variant = "header",
  showSlogan = true,
}: BrandMarkProps) {
  const { banner, partidoMorado } = brandAssets;
  const isHeader = variant === "header";

  return (
    <>
      <span
        className={`brand-mark-image${variant === "footer" ? " brand-mark-image-footer" : ""}${isHeader ? " brand-mark-image-partido" : ""}`}
      >
        <Image
          alt={isHeader ? partidoMorado.alt : ""}
          aria-hidden={isHeader ? undefined : true}
          className="brand-mark-photo"
          fill
          sizes={isHeader ? "52px" : "43px"}
          src={isHeader ? partidoMorado.src : banner.src}
          style={{
            objectFit: isHeader ? "contain" : "cover",
            objectPosition: isHeader ? "center" : "0% center",
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
