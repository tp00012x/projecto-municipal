import Image from "next/image";

import { brandAssets } from "~/data/site";

type CampaignBannerProps = {
  className?: string;
  priority?: boolean;
  /** Smaller variant for transition strips / Variante reducida para franjas */
  compact?: boolean;
};

/**
 * Full-width campaign banner from original artwork.
 * Mantiene la relación de aspecto nativa (850×139) sin estiramiento.
 */
export default function CampaignBanner({
  className = "",
  priority = false,
  compact = false,
}: CampaignBannerProps) {
  const { banner } = brandAssets;

  return (
    <figure
      className={`campaign-banner${compact ? " campaign-banner-compact" : ""}${className ? ` ${className}` : ""}`}
    >
      <Image
        alt={banner.alt}
        className="campaign-banner-image"
        height={banner.height}
        priority={priority}
        sizes={
          compact
            ? "(max-width: 699px) 92vw, 520px"
            : "(max-width: 699px) 100vw, min(850px, 92vw)"
        }
        src={banner.src}
        width={banner.width}
      />
    </figure>
  );
}
