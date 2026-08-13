"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Button, EASE_OUT, SplitHeading } from "@/components/ui";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { track } from "@vercel/analytics";

import { buildWhatsAppUrl } from "./ContactSection";

const CTA_IMAGES = [
  { src: "/imagesCTA/Caribe.webp", label: "Playa caribeña" },
  { src: "/imagesCTA/MachuPichu.webp", label: "Machu Picchu - Peru" },
  { src: "/imagesCTA/ParqueIguazu.webp", label: "Parque Iguazú - Argentina" },
  { src: "/imagesCTA/BigBen.webp", label: "Big Ben - Inglaterra" },
  { src: "/imagesCTA/EstatuaLibertad.webp", label: "Estatua de la Libertad - EEUU" },
  { src: "/imagesCTA/ParqueBanff.webp", label: "Parque Nacional Banff - Canada" },
  { src: "/imagesCTA/BoraBora.webp", label: "Bora Bora" },
  { src: "/imagesCTA/Glaciar.webp", label: "Glaciar Perito Moreno - Argentina" },
];

export function CtaVideosSection() {
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<(typeof CTA_IMAGES)[number] | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  // La etiqueta persigue al cursor con física de resorte
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 260, damping: 28, mass: 0.6 });
  const springY = useSpring(cursorY, { stiffness: 260, damping: 28, mass: 0.6 });

  // Sección "clavada" con CSS sticky: la sección crece en alto según el ancho
  // pendiente de la galería y, mientras el contenido queda fijo, el scroll
  // vertical desplaza la galería en horizontal (scrub). Se evita el pin de
  // ScrollTrigger porque su pin-spacer se rompe dentro del main flex.
  // Con prefers-reduced-motion la galería queda como fila scrolleable nativa.
  useGSAP(
    () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const galleryTrack = trackRef.current;
      if (!section || !viewport || !galleryTrack) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(viewport, { overflow: "hidden" });

        const distance = () => galleryTrack.scrollWidth - viewport.clientWidth;
        // Altura extra de la sección = recorrido horizontal a cubrir
        const setHeight = () =>
          gsap.set(section, { height: window.innerHeight + distance() });
        setHeight();

        gsap.to(galleryTrack, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
            onRefreshInit: setHeight,
            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, { scaleX: self.progress });
              }
            },
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative left-1/2 right-1/2 -mx-[50vw] w-screen max-w-none"
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-6 overflow-hidden py-10 text-center">
        <div className="max-w-3xl space-y-4 px-4 sm:px-8">
          <SplitHeading className="font-display text-3xl tracking-tight text-balance sm:text-4xl md:text-5xl">
            Cada destino tiene una historia.
            <br />
            <em className="italic text-accent">¿Cuál será la tuya?</em>
          </SplitHeading>
          <motion.p
            className="text-sm leading-relaxed text-muted sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 }}
          >
            Del Caribe a Europa, de la Patagonia a Machu Picchu. Explorá los
            destinos más increíbles y armá tu próximo viaje con nosotros.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.35 }}
        >
          <Link href={buildWhatsAppUrl()} target="_blank" onClick={() => track("whatsapp_click", { source: "cta_section" })}>
            <Button size="lg" className="rounded-full px-8 text-sm font-semibold">
              Consultar mi viaje
            </Button>
          </Link>
        </motion.div>

        {/* Galería horizontal: overflow-x-auto es el fallback accesible; con
            animación activa GSAP la cambia a hidden y el scroll la desplaza */}
        <div
          ref={viewportRef}
          className="mt-2 w-full overflow-x-auto overscroll-x-contain"
          onMouseMove={(e) => {
            cursorX.set(e.clientX + 16);
            cursorY.set(e.clientY + 16);
          }}
          onMouseLeave={() => setHoverLabel(null)}
        >
          <div
            ref={trackRef}
            className="flex w-max items-center gap-4 px-6 py-10 sm:gap-6 sm:px-10 lg:px-20"
          >
            {CTA_IMAGES.map((image, index) => {
              const offsetClass = index % 2 === 0 ? "translate-y-4" : "-translate-y-4";

              return (
                <div
                  key={image.src}
                  className={`group relative h-52 w-[68vw] shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-navy-deep/60 ring-1 ring-navy-deep/10 shadow-[0_20px_50px_-24px_rgba(19,36,59,0.5)] transition-transform duration-500 sm:h-72 sm:w-[42vw] md:h-80 lg:w-[30vw] xl:w-[24vw] ${offsetClass}`}
                  onMouseEnter={() => setHoverLabel(image.label)}
                  onMouseLeave={() => setHoverLabel(null)}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.label}
                    fill
                    sizes="(max-width: 640px) 68vw, (max-width: 1024px) 42vw, (max-width: 1280px) 30vw, 24vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2 py-1 text-xs font-medium text-white sm:hidden">
                    {image.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progreso del recorrido */}
        <span className="block h-px w-44 overflow-hidden bg-foreground/10 sm:w-56" aria-hidden>
          <span ref={progressRef} className="block h-full w-full origin-left scale-x-0 bg-gold" />
        </span>
      </div>

      {/* Etiqueta que persigue el cursor (solo desktop) */}
      <AnimatePresence>
        {hoverLabel && (
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-30 hidden sm:flex items-center gap-2 rounded-full bg-navy-deep/90 py-1.5 pl-3.5 pr-3 text-xs font-medium text-white shadow-lg backdrop-blur-sm"
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            {hoverLabel}
            <span aria-hidden className="text-sand">→</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de imagen ampliada */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              <button
                type="button"
                className="absolute right-4 top-4 z-50 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white"
                onClick={() => setSelectedImage(null)}
              >
                Cerrar
              </button>
              <div className="relative h-[60vh] w-full overflow-hidden rounded-3xl bg-black">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.label}
                  fill
                  sizes="100vw"
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="mt-3 text-center text-sm text-white/90">
                {selectedImage.label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
