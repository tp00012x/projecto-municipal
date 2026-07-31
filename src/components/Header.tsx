"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "./Icons";

const links = [
  { href: "#vision", label: "Visión" },
  { href: "#equipo", label: "Nuestro equipo" },
  { href: "#propuestas", label: "Propuestas" },
  { href: "#participa", label: "Participa" },
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
      <a className="brand" href="#inicio" aria-label="Ir al inicio">
        <span className="brand-mark" aria-hidden="true">
          PL
        </span>
        <span>
          <strong>Pueblo Libre</strong>
          <small>Plan municipal 2027–2030</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Navegación principal">
        {links.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href="#propuestas">
        Explorar plan
      </a>

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

