"use client";

import { motion } from "motion/react";

export function PackagesSectionHeader() {
  return (
    <motion.div
      className="space-y-3 text-center"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
        Paquetes destacados
      </p>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Una selección de experiencias listas para reservar.
      </h2>
      <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Buscá tu próximo destino por nombre, mes de salida o tipo de viaje.
      </p>
    </motion.div>
  );
}
