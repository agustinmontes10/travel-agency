"use client";

import { motion } from "motion/react";
import { DrawnRule, EASE_OUT } from "@/components/ui";

const CompassIcon = () => (
  <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.9" stroke="none" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="9" y1="10" x2="15" y2="10" />
    <line x1="9" y1="14" x2="13" y2="14" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const services = [
  {
    title: "Paquetes a medida",
    icon: <CompassIcon />,
    description:
      "Armamos tu viaje según tus gustos, fechas y presupuesto. Nacionales e internacionales, para grupos, parejas o familias.",
  },
  {
    title: "Asesoramiento sin costo",
    icon: <ChatIcon />,
    description:
      "Consultanos por WhatsApp o en persona. Te orientamos sobre destinos, temporadas, documentación y todo lo que necesitás saber antes de viajar.",
  },
  {
    title: "Respaldo en todo momento",
    icon: <ShieldIcon />,
    description:
      "Estamos disponibles antes, durante y después de tu viaje para resolver cualquier cambio, duda o imprevisto que surja en el camino.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function ServicesSection() {
  return (
    <section id="services" className="space-y-12">
      <motion.div
        className="space-y-4 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      >
        <p className="flex items-center justify-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-gold">
          <DrawnRule className="w-8 bg-gold/50" origin="right" delay={0.3} />
          Por qué elegirnos
          <DrawnRule className="w-8 bg-gold/50" origin="left" delay={0.3} />
        </p>
        <h2 className="font-display text-3xl tracking-tight text-balance sm:text-4xl">
          Viajás tranquilo porque estás <em className="italic text-accent">en buenas manos</em>.
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Años de experiencia organizando viajes nos enseñaron que los detalles
          marcan la diferencia. Por eso nos ocupamos de todo, para que vos solo
          te ocupes de disfrutar.
        </p>
      </motion.div>

      <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            className="group pt-6 relative"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: i * 0.15 }}
          >
            {/* Regla superior que se dibuja al entrar y se ilumina al hover */}
            <span className="absolute top-0 left-0 right-0">
              <DrawnRule
                className="w-full bg-foreground/15 transition-colors duration-300 group-hover:bg-gold/60"
                delay={0.2 + i * 0.15}
              />
            </span>
            <div className="flex items-center justify-between">
              <span className="font-display text-lg italic text-gold">
                0{i + 1}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft transition-all duration-300 group-hover:bg-gold-soft group-hover:scale-110">
                {service.icon}
              </span>
            </div>
            <h3 className="mt-5 font-display text-xl tracking-tight text-foreground sm:text-2xl transition-transform duration-300 group-hover:translate-x-1">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
