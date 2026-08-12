"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { track } from "@vercel/analytics";
import { EASE_OUT } from "@/components/ui";
import { packageImagePlaceholder } from "@/lib/image-placeholder";
import type { PublicPackage } from "@/features/packages/service";
import { PackageModal } from "./PackageModal";

const MONTH_NAMES = ["", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function formatMonths(months: number[]) {
  return [...months].sort((a, b) => a - b).map((m) => MONTH_NAMES[m]).join(" · ");
}

function buildWhatsAppUrl(packageTitle: string) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;
  if (!phone) return "#";
  const message = `Hola! Me interesa el paquete "${packageTitle}" y quisiera recibir más información. ¿Podrían ayudarme?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

interface PackageCardProps {
  pkg: PublicPackage;
  /** Índice dentro de la grilla, para el stagger del reveal */
  index?: number;
}

export function PackageCard({ pkg, index = 0 }: PackageCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.article
        className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface cursor-pointer shadow-[0_1px_2px_rgba(19,36,59,0.05),0_16px_40px_-24px_rgba(19,36,59,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(19,36,59,0.06),0_24px_56px_-24px_rgba(19,36,59,0.4)]"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: (index % 3) * 0.1 }}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-surface-muted">
          {/* Fondo: el mismo flyer desenfocado rellena el letterbox cuando la proporción no coincide */}
          <Image
            src={pkg.image}
            alt=""
            aria-hidden
            fill
            sizes="200px"
            quality={20}
            className="scale-110 object-cover blur-xl brightness-90 saturate-75"
          />
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={packageImagePlaceholder}
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          {/* Sheen: brillo diagonal que barre la imagen al hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-3/4 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-[125%] group-hover:opacity-100"
          />
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm ${
              pkg.type === "NACIONAL"
                ? "bg-background/95 text-navy-deep"
                : "bg-navy-deep/85 text-sand"
            }`}>
              {pkg.type === "NACIONAL" ? "Nacional" : "Internacional"}
            </span>
          </div>
        </div>

        <div className="border-t border-border-subtle bg-surface px-4 py-4">
          <p className="font-display text-lg leading-snug tracking-tight text-foreground">{pkg.title}</p>
          {pkg.months.length > 0 && (
            <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold">{formatMonths(pkg.months)}</p>
          )}

          <Link
            href={buildWhatsAppUrl(pkg.title)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              track("whatsapp_click", { source: "package_card", package: pkg.title });
            }}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#1ebe5d] hover:-translate-y-px"
          >
            <WhatsAppIcon />
            Quiero info
          </Link>
        </div>
      </motion.article>
      <AnimatePresence>
        {open && <PackageModal pkg={pkg} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
