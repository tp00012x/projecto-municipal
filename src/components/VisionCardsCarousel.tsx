"use client";

import Image from "next/image";
import { type CSSProperties } from "react";

import { ArrowRightIcon } from "~/components/Icons";
import { getCategoryVisual } from "~/components/proposals/CategoryVisual";
import {
  visionPriorityCards,
  visionPriorityOrder,
} from "~/data/site";
import type { Proposal } from "~/types/proposal";

type VisionCardItem = {
  proposal: Proposal;
  card: (typeof visionPriorityCards)[number];
};

function buildVisionCards(proposals: Proposal[]): VisionCardItem[] {
  return visionPriorityOrder
    .map((numero) => {
      const proposal = proposals.find((item) => item.numero === numero);
      const card = visionPriorityCards[numero];
      if (!proposal || !card) return null;
      return { proposal, card };
    })
    .filter((item): item is VisionCardItem => Boolean(item));
}

export default function VisionCardsCarousel({
  proposals,
}: {
  proposals: Proposal[];
}) {
  const items = buildVisionCards(proposals);

  if (!items.length) return null;

  return (
    <div className="vision-carousel-wrapper">
      <div
        aria-label="Siete temas de desarrollo distrital"
        className="vision-carousel-container"
        role="region"
      >
        {items.map(({ proposal, card }, index) => {
          const { Icon } = getCategoryVisual(proposal.categoria);

          return (
            <article
              className="vision-carousel-slide"
              key={proposal.id}
              aria-label={`${index + 1} de ${items.length}: ${proposal.categoria}`}
              style={{ "--slide-index": index } as CSSProperties}
            >
              <a
                aria-label={`${proposal.categoria}. ${card.summary}. Ver más.`}
                className={`vision-card vision-card-theme-${card.theme}`}
                href={`#${proposal.id}`}
              >
                <div className="vision-card-media">
                  <Image
                    alt={card.alt}
                    className="vision-card-photo"
                    fill
                    loading={index < 3 ? "eager" : "lazy"}
                    sizes="(max-width: 767px) 78vw, (max-width: 1199px) 42vw, 200px"
                    src={card.src}
                    style={{
                      objectFit: "cover",
                      objectPosition: card.objectPosition,
                    }}
                  />
                  <span aria-hidden="true" className="vision-card-number">
                    {String(proposal.numero).padStart(2, "0")}
                  </span>
                </div>

                <div className="vision-card-body">
                  <span
                    aria-hidden="true"
                    className={`vision-card-icon vision-card-icon-${card.iconTone}`}
                  >
                    <Icon />
                  </span>
                  <h3 className="vision-card-title">{proposal.categoria}</h3>
                  <p className="vision-card-summary">{card.summary}</p>
                  <span
                    className={`vision-card-link vision-card-link-${card.linkTone}`}
                  >
                    Ver más
                    <ArrowRightIcon />
                  </span>
                </div>
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
