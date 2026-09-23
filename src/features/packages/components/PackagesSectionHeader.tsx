"use client";

import { motion } from "motion/react";
import { DrawnRule, EASE_OUT } from "@/components/ui";
import { PackagesFilter } from "./PackagesFilter";

interface PackagesSectionHeaderProps {
  title?: string;
  month?: string;
  type?: string;
}

export function PackagesSectionHeader({ title, month, type }: PackagesSectionHeaderProps) {
  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] flex h-[72vh] min-h-[600px] w-screen max-w-none items-center justify-center overflow-hidden">
      <video
        src="/Paquetes.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/55 via-navy-deep/30 to-navy-deep/65" />
      {/* Fundido superior: el video se disuelve desde el fondo crema de arriba, simétrico al fundido inferior */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/70 to-transparent md:h-40 lg:h-48" />
      {/* Fundido inferior: el video se disuelve hacia el fondo crema donde arrancan las cards */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent md:h-40 lg:h-48" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-5xl space-y-6 px-4 text-center text-white"
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      >
        <div className="space-y-4">
          <p className="flex items-center justify-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-sand">
            <DrawnRule className="w-8 bg-sand/60" origin="right" delay={0.3} />
            Paquetes destacados
            <DrawnRule className="w-8 bg-sand/60" origin="left" delay={0.3} />
          </p>
          <h2 className="font-display text-3xl tracking-tight text-balance sm:text-4xl">
            Una selección de experiencias <em className="italic text-sand">listas para reservar</em>.
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            Buscá tu próximo destino por nombre, mes de salida o tipo de viaje.
          </p>
        </div>

        <PackagesFilter title={title} month={month} type={type} />
      </motion.div>
    </div>
  );
}
