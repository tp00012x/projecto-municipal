"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getWhatsAppUrl, siteConfig } from "~/data/site";
import BrandMark from "./BrandMark";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./Icons";

const links = [
  { href: "/#presentacion", label: "Sobre Micky" },
  { href: "/#equipo", label: "Nuestro equipo" },
  { href: "/propuestas", label: "Propuestas", matchPath: "/propuestas" },
] as const;

const socialLinks = [
  {
    href: "https://www.tiktok.com/@miguelstefanoruiz",
    label: "TikTok de Micky Ruiz",
    icon: "/social/tiktok.png",
  },
  {
    href: "https://www.facebook.com/profile.php?id=61592779255660",
    label: "Facebook de Micky Ruiz",
    icon: "/social/facebook.png",
  },
  {
    href: "https://www.instagram.com/mickyruiz_oficial",
    label: "Instagram de Micky Ruiz",
    icon: "/social/instagram.png",
  },
];

function isPropuestasActive(pathname: string) {
  return pathname === "/propuestas" || pathname.startsWith("/propuestas/");
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Ir al inicio — Micky Ruiz">
        <BrandMark />
      </Link>

      <nav className="desktop-nav" aria-label="Navegación principal">
        {links.map((link) => {
          const isActive =
            "matchPath" in link && link.matchPath
              ? isPropuestasActive(pathname)
              : false;

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={isActive ? "is-active" : undefined}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="header-social">
        <div className="header-social-copy">
          <strong>Conecta con Micky</strong>
          <em>Escríbele o síguelo</em>
        </div>
        <div className="header-social-icons" role="list">
          <a
            aria-label={`WhatsApp de ${siteConfig.candidate}: ${siteConfig.phoneDisplay}`}
            className="header-social-link header-social-link-whatsapp"
            href={getWhatsAppUrl()}
            rel="noopener noreferrer"
            role="listitem"
            target="_blank"
          >
            <WhatsAppIcon />
          </a>
          {socialLinks.map((social) => (
            <a
              aria-label={social.label}
              className="header-social-link"
              href={social.href}
              key={social.href}
              rel="noopener noreferrer"
              role="listitem"
              target="_blank"
            >
              <img alt="" aria-hidden="true" height={32} src={social.icon} width={32} />
            </a>
          ))}
        </div>
      </div>

      <button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="menu-button"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        className={`mobile-nav ${open ? "is-open" : ""}`}
        id="mobile-navigation"
      >
        {links.map((link, index) => {
          const isActive =
            "matchPath" in link && link.matchPath
              ? isPropuestasActive(pathname)
              : false;

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={isActive ? "is-active" : undefined}
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
            >
              <span>0{index + 1}</span>
              {link.label}
            </Link>
          );
        })}
        <a
          className="mobile-nav-whatsapp"
          href={getWhatsAppUrl()}
          onClick={() => setOpen(false)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <WhatsAppIcon />
          Escribir por WhatsApp
        </a>
      </div>
    </header>
  );
}
