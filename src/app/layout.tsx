import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#35105D",
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const metadataBase = host ? new URL(`${protocol}://${host}`) : undefined;

  return {
    metadataBase,
    title: {
      default: "Plan Municipal Pueblo Libre 2027–2030 | 23 propuestas",
      template: "%s | Pueblo Libre 2027–2030",
    },
    description:
      "Explora de forma clara y accesible las 23 propuestas atribuidas al Plan de Gobierno Municipal 2027–2030 asociado a la candidatura de Micky Ruiz.",
    keywords: [
      "Pueblo Libre",
      "Plan de Gobierno",
      "Micky Ruiz",
      "propuestas municipales",
      "participación ciudadana",
      "gobierno local",
    ],
    authors: [{ name: "Plataforma informativa Pueblo Libre 2027–2030" }],
    creator: "Plataforma informativa Pueblo Libre 2027–2030",
    icons: [{ rel: "icon", url: "/favicon.svg" }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: "Plan Municipal Pueblo Libre 2027–2030",
      description:
        "Una plataforma informativa para revisar, comparar y comentar 23 propuestas municipales.",
      type: "website",
      locale: "es_PE",
      siteName: "Pueblo Libre 2027–2030",
      images: [
        {
          url: "/og.png",
          width: 1738,
          height: 909,
          alt: "Pueblo Libre 2027–2030: 23 propuestas explicadas con claridad",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Plan Municipal Pueblo Libre 2027–2030",
      description: "Revisa, compara y comenta 23 propuestas municipales.",
      images: ["/og.png"],
    },
    alternates: {
      canonical: "/",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pueblo Libre 2027–2030",
    inLanguage: "es-PE",
    description:
      "Plataforma informativa sobre 23 propuestas del Plan de Gobierno Municipal 2027–2030.",
    about: {
      "@type": "GovernmentService",
      name: "Propuestas municipales para Pueblo Libre 2027–2030",
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Pueblo Libre, Lima, Perú",
      },
    },
  };

  return (
    <html lang="es">
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
