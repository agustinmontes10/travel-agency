"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui";

interface NavbarProps {
  whatsappUrl: string;
}

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#packages", label: "Paquetes" },
  { href: "#services", label: "Servicios" },
  { href: "#contact", label: "Contacto" },
];

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Navbar({ whatsappUrl }: NavbarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="mx-auto flex max-w-6xl w-full items-center justify-between pt-6 text-sm absolute z-10 top-0 px-4 sm:px-6">
        <button onClick={() => scrollToSection("#home")} className="inline-flex items-center">
          <Image
            src="/LogoBlanco.png"
            alt="mt turismo Gonzales Chaves"
            width={180}
            height={48}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-md font-medium uppercase tracking-[0.22em] text-slate-100 sm:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => scrollToSection(href)}
              className="relative text-slate-300 transition-all duration-250 hover:text-amber-100 hover:-translate-y-px hover:[text-shadow:0_0_20px_rgba(253,186,116,0.45)] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:h-[1.5px] after:w-0 after:bg-gradient-to-r after:from-transparent after:via-amber-400 after:to-transparent after:transition-[width] after:duration-350 after:ease-out hover:after:w-[130%]"
            >
              {label}
            </button>
          ))}
          <Link href={whatsappUrl} target={'_blank'} aria-label="Agendar por WhatsApp">
            <Button
              size="md"
              variant="secondary"
              className="rounded-full px-5 text-xs font-semibold uppercase tracking-[0.22em] cursor-pointer"
            >
              Consultar ahora
            </Button>
          </Link>
        </nav>

        {/* Hamburger button (mobile only) */}
        <button
          className="sm:hidden text-white p-2 rounded-md focus:outline-none"
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Mobile menu — full screen, slides in from right */}
      <div
        className={`sm:hidden fixed justify-evenly items-center inset-0 z-40 bg-white flex flex-col px-8 pt-16 pb-12 gap-8 transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          className="self-end p-2 text-slate-800 absolute top-5 right-5"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {NAV_LINKS.map(({ href, label }) => (
          <button
            key={href}
            onClick={() => { scrollToSection(href); setOpen(false); }}
            className="text-xl font-semibold uppercase tracking-[0.18em] text-slate-700 border-b border-slate-100 pb-4 transition-all duration-200 hover:text-amber-600 hover:pl-2 hover:border-amber-300"
          >
            {label}
          </button>
        ))}
        <Link href={whatsappUrl} target={'_blank'} onClick={() => setOpen(false)} className="mt-4">
          <Button
            size="lg"
            className="w-full rounded-full font-semibold uppercase tracking-[0.18em]"
          >
            Consultar ahora
          </Button>
        </Link>
      </div>
    </>
  );
}
