import "~/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { Caveat, Inter } from "next/font/google";
import { type Metadata, type Viewport } from "next";

import { siteConfig, siteSeo } from "~/data/site";
import { buildSeoGraph } from "~/lib/seo-schema";
import { getSiteUrl } from "~/lib/site-url";
import { TRPCReactProvider } from "~/trpc/react";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sloganScript = Caveat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-slogan-script",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#35105D",
};

export function generateMetadata(): Metadata {
  const metadataBase = new URL(getSiteUrl());

  return {
    metadataBase,
    title: {
      default: siteSeo.title,
      template: siteSeo.titleTemplate,
    },
    description: siteSeo.description,
    keywords: [...siteSeo.keywords],
    authors: [{ name: siteConfig.candidate }],
    creator: siteConfig.candidate,
    publisher: siteSeo.siteName,
    icons: {
      shortcut: [{ url: "/favicon.ico?v=5" }],
      icon: [
        { url: "/favicon.ico?v=5", sizes: "any" },
        {
          url: "/favicon-32x32.png?v=5",
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: "/favicon-16x16.png?v=5",
          sizes: "16x16",
          type: "image/png",
        },
      ],
      apple: {
        url: "/apple-touch-icon.png?v=5",
        sizes: "180x180",
        type: "image/png",
      },
    },
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
      title: siteSeo.title,
      description: siteSeo.description,
      type: "website",
      locale: "es_PE",
      siteName: siteSeo.siteName,
      url: "/",
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
      title: siteSeo.title,
      description: siteSeo.description,
      images: ["/og.jpg"],
    },
    alternates: {
      canonical: "/",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = buildSeoGraph();

  return (
    <html lang="es" className={`${bodyFont.variable} ${sloganScript.variable}`}>
      <body className={bodyFont.className}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Analytics />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
