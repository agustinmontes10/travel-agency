"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { packageImagePlaceholder } from "@/lib/image-placeholder";
import type { PublicPackage } from "@/features/packages/service";

const MONTH_NAMES = ["", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function formatMonths(months: number[]) {
  return [...months].sort((a, b) => a - b).map((m) => MONTH_NAMES[m]).join(" · ");
}

interface PackageModalProps {
  pkg: PublicPackage;
  onClose: () => void;
}

export function PackageModal({ pkg, onClose }: PackageModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm m-0"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 transition-colors"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative h-[75vh] w-full">
          {/* Fondo: el mismo flyer desenfocado rellena el letterbox */}
          <Image
            src={pkg.image}
            alt=""
            aria-hidden
            fill
            sizes="200px"
            quality={20}
            className="scale-110 object-cover blur-2xl brightness-50"
          />
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            placeholder="blur"
            blurDataURL={packageImagePlaceholder}
            className="object-contain"
            priority
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/80 to-transparent" />

          {/* Type badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm ${
              pkg.type === "NACIONAL"
                ? "bg-background/95 text-navy-deep"
                : "bg-navy-deep/85 text-sand"
            }`}>
              {pkg.type === "NACIONAL" ? "Nacional" : "Internacional"}
            </span>
          </div>

          {/* Title + months */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <p className="font-display text-xl leading-snug tracking-tight">{pkg.title}</p>
            {pkg.months.length > 0 && (
              <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-sand">{formatMonths(pkg.months)}</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
