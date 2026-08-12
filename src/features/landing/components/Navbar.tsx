"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { track } from "@vercel/analytics";

interface NavbarProps {
  whatsappUrl: string;
}

const NAV_LINKS = [
  { href: "#home", label: "Inicio" },
  { href: "#packages", label: "Paquetes" },
  { href: "#services", label: "Servicios" },
  { href: "#contact", label: "Contacto" },
];

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function Navbar({ whatsappUrl }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Navbar transparente sobre el hero */}
      <header className="mx-auto flex max-w-6xl w-full items-center justify-between pt-6 text-sm absolute z-10 top-0 inset-x-0 px-4 sm:px-6">
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

        {/* Desktop nav: contenedor de vidrio esmerilado con items tipo pill */}
        <div className="hidden items-center gap-3 sm:flex">
          <nav className="flex items-center gap-1 rounded-full border border-white/15 bg-navy-deep/25 p-1.5 shadow-lg shadow-black/10 backdrop-blur-md">
            {NAV_LINKS.map(({ href, label }) => (
              <button
                key={href}
                onClick={() => scrollToSection(href)}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-all duration-200 hover:bg-white/15 hover:text-white cursor-pointer"
              >
                {label}
              </button>
            ))}
          </nav>
          <Link href={whatsappUrl} target={'_blank'} aria-label="Agendar por WhatsApp" onClick={() => track("whatsapp_click", { source: "navbar_hero" })}>
            <span className="inline-flex h-[3.25rem] items-center rounded-full bg-background px-6 text-sm font-semibold tracking-tight text-navy-deep shadow-lg shadow-black/15 transition-all duration-200 hover:bg-sand hover:-translate-y-px cursor-pointer">
              Consultar ahora
            </span>
          </Link>
        </div>

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

      {/* Navbar sticky compacta: aparece al pasar el hero */}
      <AnimatePresence>
        {showSticky && !open && (
          <motion.header
            className="fixed inset-x-0 top-0 z-30 border-b border-border-subtle bg-background/85 backdrop-blur-md"
            initial={{ y: "-110%" }}
            animate={{ y: 0 }}
            exit={{ y: "-110%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
          >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
              <button onClick={() => scrollToSection("#home")} className="inline-flex items-center">
                <Image
                  src="/LogoOscuro.png"
                  alt="mt turismo Gonzales Chaves"
                  width={150}
                  height={40}
                  className="h-8 w-auto sm:h-9"
                />
              </button>

              <nav className="hidden items-center gap-2 sm:flex">
                {NAV_LINKS.map(({ href, label }) => (
                  <button
                    key={href}
                    onClick={() => scrollToSection(href)}
                    className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/70 transition-all duration-200 hover:bg-accent-soft hover:text-foreground cursor-pointer"
                  >
                    {label}
                  </button>
                ))}
                <Link href={whatsappUrl} target="_blank" aria-label="Agendar por WhatsApp" onClick={() => track("whatsapp_click", { source: "navbar_sticky" })}>
                  <span className="ml-1 inline-flex h-10 items-center rounded-full bg-accent px-5 text-sm font-semibold tracking-tight text-accent-foreground transition-all duration-200 hover:bg-navy-deep hover:-translate-y-px cursor-pointer">
                    Consultar
                  </span>
                </Link>
              </nav>

              <button
                className="sm:hidden text-foreground p-2 rounded-md focus:outline-none"
                aria-label="Abrir menú"
                onClick={() => setOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile menu — full screen, slides in from right, links en stagger */}
      <div
        className={`sm:hidden fixed justify-evenly items-center inset-0 z-40 bg-background flex flex-col px-8 pt-16 pb-12 gap-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          className="self-end p-2 text-foreground absolute top-5 right-5"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {NAV_LINKS.map(({ href, label }, i) => (
          <button
            key={href}
            onClick={() => { scrollToSection(href); setOpen(false); }}
            className={`font-display text-2xl italic text-foreground border-b border-border-subtle pb-4 transition-all duration-500 hover:text-gold hover:border-gold/40 ${
              open ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${160 + i * 70}ms` : "0ms" }}
          >
            {label}
          </button>
        ))}
        <Link
          href={whatsappUrl}
          target={'_blank'}
          onClick={() => {
            setOpen(false);
            track("whatsapp_click", { source: "mobile_menu" });
          }}
          className={`mt-4 w-full transition-all duration-500 ${
            open ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
          style={{ transitionDelay: open ? `${160 + NAV_LINKS.length * 70}ms` : "0ms" }}
        >
          <span className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold tracking-tight text-accent-foreground shadow-soft transition-colors hover:bg-navy-deep">
            Consultar ahora
          </span>
        </Link>
      </div>
    </>
  );
}
