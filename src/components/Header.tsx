"use client";

import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";
import { CloseIcon, MenuIcon } from "./Icons";

const links = [
  { href: "#presentacion", label: "Sobre Micky" },
  { href: "#equipo", label: "Nuestro equipo" },
  { href: "#propuestas", label: "Propuestas" },
];

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

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ir al inicio — Micky Ruiz">
        <BrandMark />
      </a>

      <nav className="desktop-nav" aria-label="Navegación principal">
        {links.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="header-social">
        <div className="header-social-copy">
          <strong>Conecta con Micky</strong>
          <em>Síguelo en sus redes</em>
        </div>
        <div className="header-social-icons" role="list">
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
        {links.map((link, index) => (
          <a
            href={link.href}
            key={link.href}
            onClick={() => setOpen(false)}
          >
            <span>0{index + 1}</span>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}

