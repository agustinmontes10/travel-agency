"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Navbar } from "./Navbar";
import { HeroContent } from "./HeroContent";

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;
const WHATSAPP_DEFAULT_MESSAGE =
  process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ??
  "Hola, quiero recibir asesoramiento para mi próximo viaje.";

function buildWhatsAppUrl() {
  if (!WHATSAPP_PHONE) return "#";

  const encodedMessage = encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
}

export function Hero() {
  const whatsappUrl = buildWhatsAppUrl();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: la imagen baja más lento que el scroll y el contenido se desvanece
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentY = useTransform(scrollYProgress, [0, 0.8], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative left-1/2 right-1/2 -mx-[50vw] w-screen max-w-none overflow-hidden min-h-screen flex flex-col items-center justify-center"
    >
      <Navbar whatsappUrl={whatsappUrl} />

      {/* Imagen con margen extra arriba para permitir el desplazamiento parallax */}
      <motion.div className="absolute inset-x-0 -top-40 bottom-0" style={{ y: imageY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/HeroCalidad.webp"
            alt="Destinos icónicos alrededor del mundo"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%] md:object-bottom"
          />
        </motion.div>
      </motion.div>

      {/* Overlays: degradado vertical + scrim radial detrás del texto + fundido inferior al crema */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/55 via-navy-deep/20 to-navy-deep/45" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_52%_at_50%_52%,rgba(19,36,59,0.42),transparent_72%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />

      <motion.div
        className="relative z-10 w-full px-4 sm:px-8 lg:px-16 text-white"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <HeroContent whatsappUrl={whatsappUrl} />
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        style={{ opacity: cueOpacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white/70">
            Descubrí
          </span>
          <span className="relative h-12 w-px overflow-hidden bg-white/25">
            <span
              className="absolute inset-x-0 top-0 h-full bg-white/90"
              style={{ animation: "hero-scroll 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite" }}
            />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
