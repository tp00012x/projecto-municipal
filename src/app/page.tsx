import type { Metadata } from "next";

import CampaignSite from "~/app/CampaignSite";
import proposals from "~/data/propuestas.json";
import { siteSeo } from "~/data/site";
import { getSiteUrl } from "~/lib/site-url";
import type { Proposal } from "~/types/proposal";

const homeTitle = "Micky Ruiz | Candidato a la Alcaldía de Pueblo Libre";
const homeDescription =
  "Conoce a Micky Ruiz, candidato a alcalde de Pueblo Libre. Descubre sus 24 propuestas, equipo y plan para transformar el distrito.";

export const metadata: Metadata = {
  title: {
    absolute: homeTitle,
  },
  description: homeDescription,
  alternates: {
    canonical: `${getSiteUrl()}/`,
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    type: "website",
    locale: "es_PE",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: siteSeo.ogAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: ["/og.jpg"],
  },
};

export default function Home() {
  return <CampaignSite proposals={proposals as Proposal[]} />;
}
