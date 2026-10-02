"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { logoutAction } from "./login/actions";

const icon = (children: ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 shrink-0"
    aria-hidden
  >
    {children}
  </svg>
);

const BriefcaseIcon = () =>
  icon(
    <>
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </>,
  );
const CalculatorIcon = () =>
  icon(
    <>
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M8 6h8M16 14v4M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
    </>,
  );
const ExternalIcon = () =>
  icon(
    <>
      <path d="M15 3h6v6M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </>,
  );
const LogoutIcon = () =>
  icon(
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </>,
  );

const LINKS = [
  { href: "/admin/packages", label: "Paquetes", Icon: BriefcaseIcon },
  { href: "/admin/cotizador", label: "Cotizador", Icon: CalculatorIcon },
];

const ghostAction =
  "inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function AdminHeader() {
  const pathname = usePathname();

  // El login no lleva navegación: todavía no hay sesión.
  if (pathname === "/admin/login") return null;

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 py-3">
        <Link href="/admin/packages" className="flex items-center gap-3" aria-label="MT Turismo, ir al panel">
          <Image
            src="/Logo.png"
            alt="MT Turismo"
            width={2880}
            height={713}
            priority
            className="h-9 w-auto"
          />
          <span className="hidden h-6 w-px bg-border-subtle sm:block" aria-hidden />
          <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground sm:block">
            Panel de administración
          </span>
        </Link>

        <nav
          aria-label="Secciones del panel"
          className="order-last flex w-full items-center justify-center gap-1 rounded-full border border-border-subtle bg-surface/80 p-1 shadow-sm md:order-none md:w-auto"
        >
          {LINKS.map(({ href, label, Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 md:flex-none",
                  active
                    ? "bg-accent text-accent-foreground shadow-md shadow-accent/25"
                    : "text-muted hover:bg-accent-soft hover:text-foreground",
                )}
              >
                <Icon />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Link href="/" target="_blank" rel="noopener noreferrer" className={ghostAction}>
            <ExternalIcon />
            <span className="hidden sm:inline">Ver web</span>
          </Link>
          <form action={logoutAction}>
            <button type="submit" className={ghostAction}>
              <LogoutIcon />
              <span className="hidden sm:inline">Cerrar sesión</span>
              <span className="sm:hidden sr-only">Cerrar sesión</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
