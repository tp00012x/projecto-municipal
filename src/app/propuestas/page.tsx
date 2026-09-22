import type { Metadata } from "next";

import Footer from "~/components/Footer";
import Header from "~/components/Header";
import ProposalExplorer from "~/components/ProposalExplorer";
import { siteConfig } from "~/data/site";
import { getAllProposals } from "~/lib/propuestas";

const proposalsPageTitle = `${siteConfig.proposalCount} propuestas para Pueblo Libre | Micky Ruiz`;
const proposalsPageDescription = `Conoce las ${siteConfig.proposalCount} propuestas de Micky Ruiz para construir un Pueblo Libre para todos.`;

export const metadata: Metadata = {
  title: {
    absolute: proposalsPageTitle,
  },
  description: proposalsPageDescription,
  alternates: {
    canonical: "/propuestas",
  },
  openGraph: {
    title: proposalsPageTitle,
    description: proposalsPageDescription,
    url: "/propuestas",
    type: "website",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: proposalsPageTitle,
    description: proposalsPageDescription,
  },
};

export default function PropuestasPage() {
  const proposals = getAllProposals();

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <ProposalExplorer proposals={proposals} standalone />
      </main>
      <Footer />
    </>
  );
}
