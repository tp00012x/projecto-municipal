import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { siteConfig, siteSeo } from "~/data/site";
import {
  getAdjacentProposals,
  getAllProposals,
  getProposalBySlug,
  getProposalPath,
  getProposalSlug,
} from "~/lib/propuestas";
import {
  dimensionCopy,
  getProposalSummary,
} from "~/lib/proposal-utils";
import { getSiteUrl } from "~/lib/site-url";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProposals().map((proposal) => ({
    slug: getProposalSlug(proposal),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const proposal = getProposalBySlug(slug);
  if (!proposal) {
    return { title: "Propuesta no encontrada" };
  }

  const description = getProposalSummary(proposal, 160);
  const path = getProposalPath(proposal);
  const title = `${proposal.titulo} | Propuesta ${proposal.numero}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${proposal.titulo} — ${siteConfig.candidate}`,
      description,
      url: path,
      type: "article",
      locale: "es_PE",
      siteName: siteSeo.siteName,
      images: [
        {
          url: proposal.image,
          alt: proposal.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${proposal.titulo} — ${siteConfig.candidate}`,
      description,
      images: [proposal.image],
    },
  };
}

export default async function ProposalPage({ params }: PageProps) {
  const { slug } = await params;
  const proposal = getProposalBySlug(slug);
  if (!proposal) notFound();

  const { prev, next, index, total } = getAdjacentProposals(proposal);
  const siteUrl = getSiteUrl();
  const path = getProposalPath(proposal);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: proposal.titulo,
    description: getProposalSummary(proposal, 200),
    inLanguage: "es-PE",
    author: {
      "@type": "Person",
      name: siteConfig.candidate,
      jobTitle: siteConfig.role,
    },
    mainEntityOfPage: `${siteUrl}${path}`,
    about: {
      "@type": "AdministrativeArea",
      name: `${siteConfig.district}, ${siteConfig.region}`,
    },
    articleSection: proposal.categoria,
  };

  return (
    <main className="proposal-page" id="contenido">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />

      <div className="shell proposal-page-shell">
        <nav className="proposal-page-nav" aria-label="Migas de pan">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#propuestas">Propuestas</Link>
          <span aria-hidden="true">/</span>
          <span>
            {String(proposal.numero).padStart(2, "0")}. {proposal.titulo}
          </span>
        </nav>

        <article className="proposal-page-article">
          <header className="proposal-page-header">
            <p className="eyebrow">
              Propuesta {String(proposal.numero).padStart(2, "0")} de {total}
              <span>•</span>
              {proposal.categoria}
              <span>•</span>
              {dimensionCopy[proposal.dimension]}
            </p>
            <h1>{proposal.titulo}</h1>
            <p className="proposal-page-lead">
              Parte del Plan Municipal 2027–2030 de {siteConfig.candidate},{" "}
              {siteConfig.role}.
            </p>
          </header>

          <div className="proposal-page-media">
            <Image
              alt={proposal.imageAlt}
              className="proposal-page-image"
              height={720}
              priority
              src={proposal.image}
              style={{ objectFit: "cover", objectPosition: proposal.imagePosition }}
              width={1200}
            />
          </div>

          <section className="proposal-page-block">
            <h2>Diagnóstico</h2>
            {proposal.diagnostico.map((item) => (
              <p key={item.slice(0, 48)}>{item}</p>
            ))}
          </section>

          <section className="proposal-page-block">
            <h2>Objetivo</h2>
            {proposal.objetivo.map((item) => (
              <p key={item.slice(0, 48)}>{item}</p>
            ))}
          </section>

          <section className="proposal-page-block">
            <h2>Acciones</h2>
            <ul>
              {proposal.acciones.map((item) => (
                <li key={item.slice(0, 48)}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="proposal-page-block">
            <h2>Metas</h2>
            <ul>
              {proposal.metas.map((item) => (
                <li key={item.slice(0, 48)}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="proposal-page-block">
            <h2>Presupuesto / viabilidad</h2>
            {proposal.presupuesto.map((item) => (
              <p key={item.slice(0, 48)}>{item}</p>
            ))}
          </section>

          <footer className="proposal-page-footer">
            <p>
              {index + 1} / {total}
            </p>
            <div className="proposal-page-actions">
              {prev ? (
                <Link
                  className="button button-outline"
                  href={getProposalPath(prev)}
                >
                  ← {String(prev.numero).padStart(2, "0")}. {prev.titulo}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  className="button button-outline"
                  href={getProposalPath(next)}
                >
                  {String(next.numero).padStart(2, "0")}. {next.titulo} →
                </Link>
              ) : null}
            </div>
            <div className="proposal-page-actions">
              <Link className="button button-yellow" href="/#propuestas">
                Ver las {siteConfig.proposalCount} propuestas
              </Link>
              <Link className="button button-glass" href="/#participa">
                Dejar un aporte
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
