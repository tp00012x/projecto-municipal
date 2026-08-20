import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CSSProperties } from "react";

import Footer from "~/components/Footer";
import Header from "~/components/Header";
import TransitionLink from "~/components/TransitionLink";
import ProposalFichaChrome, {
  ProposalShareBar,
} from "~/components/proposals/ProposalFichaChrome";
import ProposalParticipation from "~/components/proposals/ProposalParticipation";
import { getWhatsAppUrl, siteConfig, siteSeo } from "~/data/site";
import { getDisplayTitle } from "~/lib/display-title";
import {
  getAdjacentProposals,
  getAllProposals,
  getProposalBySlug,
  getProposalPath,
  getProposalSlug,
} from "~/lib/propuestas";
import { getProposalSummary } from "~/lib/proposal-utils";
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
  const title = `${getDisplayTitle(proposal.titulo)} | Propuesta ${proposal.numero}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${getDisplayTitle(proposal.titulo)} — ${siteConfig.candidate}`,
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
      title: `${getDisplayTitle(proposal.titulo)} — ${siteConfig.candidate}`,
      description,
      images: [proposal.image],
    },
  };
}

export default async function ProposalPage({ params }: PageProps) {
  const { slug } = await params;
  const proposal = getProposalBySlug(slug);
  if (!proposal) notFound();

  const { prev, next, total } = getAdjacentProposals(proposal);
  const siteUrl = getSiteUrl();
  const path = getProposalPath(proposal);
  const title = getDisplayTitle(proposal.titulo);
  const numberLabel = String(proposal.numero).padStart(2, "0");
  const transitionName = `proposal-image-${proposal.id}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
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
    <>
      <Header />
      <main className="proposal-page" id="contenido">
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />

        <ProposalFichaChrome
          nextPath={next ? getProposalPath(next) : null}
          prevPath={prev ? getProposalPath(prev) : null}
        />

        <div className="shell proposal-page-shell">
          <nav className="proposal-page-nav" aria-label="Migas de pan">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#propuestas">Propuestas</Link>
            <span aria-hidden="true">/</span>
            <span className="proposal-page-nav-current">
              {numberLabel}. {title}
            </span>
          </nav>

          <article className="proposal-page-article">
            <header className="proposal-page-header">
              <div className="proposal-page-meta">
                <span className="proposal-page-number">{numberLabel}</span>
                <p className="proposal-page-kicker">
                  Propuesta {numberLabel} de {total}
                  <span aria-hidden="true">·</span>
                  {proposal.categoria}
                </p>
              </div>

              <h1>{title}</h1>
              <p className="proposal-page-lead">
                Plan Municipal 2027–2030 · {siteConfig.candidate}
              </p>

              <ProposalShareBar path={path} title={title} />
            </header>

            <div className="proposal-page-media">
              <Image
                alt={proposal.imageAlt}
                className="proposal-page-image"
                height={720}
                priority
                src={proposal.image}
                style={
                  {
                    objectFit: "cover",
                    objectPosition: proposal.imagePosition,
                    viewTransitionName: transitionName,
                  } as CSSProperties
                }
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

            <ProposalParticipation proposal={proposal} />

            <footer className="proposal-page-footer">
              <p className="proposal-page-kbd-hint">
                Tip: usa ← → para pasar entre propuestas
              </p>
              <div className="proposal-page-actions proposal-page-pager">
                {prev ? (
                  <TransitionLink
                    className="button button-outline"
                    href={getProposalPath(prev)}
                  >
                    ← Anterior
                  </TransitionLink>
                ) : (
                  <span />
                )}
                {next ? (
                  <TransitionLink
                    className="button button-outline"
                    href={getProposalPath(next)}
                  >
                    Siguiente →
                  </TransitionLink>
                ) : null}
              </div>
              <div className="proposal-page-actions">
                <Link className="button button-yellow" href="/#propuestas">
                  Ver las {siteConfig.proposalCount} propuestas
                </Link>
                <a
                  className="button button-whatsapp"
                  href={getWhatsAppUrl(
                    `Hola Micky, vi la propuesta "${title}" en la web y quiero saber más.`,
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Escribir por WhatsApp
                </a>
              </div>
            </footer>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
