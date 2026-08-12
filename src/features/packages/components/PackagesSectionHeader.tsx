"use client";

import { motion } from "motion/react";
import { DrawnRule, EASE_OUT } from "@/components/ui";

export function PackagesSectionHeader() {
  return (
    <motion.div
      className="space-y-4 text-center"
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
    >
      <p className="flex items-center justify-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-gold">
        <DrawnRule className="w-8 bg-gold/50" origin="right" delay={0.3} />
        Paquetes destacados
        <DrawnRule className="w-8 bg-gold/50" origin="left" delay={0.3} />
      </p>
      <h2 className="font-display text-3xl tracking-tight text-balance sm:text-4xl">
        Una selección de experiencias <em className="italic text-accent">listas para reservar</em>.
      </h2>
      <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        Buscá tu próximo destino por nombre, mes de salida o tipo de viaje.
      </p>
    </motion.div>
  );
}
