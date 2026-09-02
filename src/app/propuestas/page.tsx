import type { Metadata } from "next";

import Footer from "~/components/Footer";
import Header from "~/components/Header";
import ProposalExplorer from "~/components/ProposalExplorer";
import { getAllProposals } from "~/lib/propuestas";

export const metadata: Metadata = {
  title: {
    absolute: "24 propuestas para Pueblo Libre | Micky Ruiz",
  },
  description:
    "Conoce las 24 propuestas de Micky Ruiz para construir un Pueblo Libre para todos.",
  alternates: {
    canonical: "/propuestas",
  },
  openGraph: {
    title: "24 propuestas para Pueblo Libre | Micky Ruiz",
    description:
      "Conoce las 24 propuestas de Micky Ruiz para construir un Pueblo Libre para todos.",
    url: "/propuestas",
    type: "website",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "24 propuestas para Pueblo Libre | Micky Ruiz",
    description:
      "Conoce las 24 propuestas de Micky Ruiz para construir un Pueblo Libre para todos.",
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
