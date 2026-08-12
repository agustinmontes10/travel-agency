"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Button, EASE_OUT } from "@/components/ui";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { track } from "@vercel/analytics";

import "swiper/css";
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

  // La etiqueta persigue al cursor con física de resorte
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 260, damping: 28, mass: 0.6 });
  const springY = useSpring(cursorY, { stiffness: 260, damping: 28, mass: 0.6 });

  return (
    <section className="w-full py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center px-4 sm:px-8 lg:px-16">
        <motion.div
          className="max-w-3xl space-y-4"
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <h2 className="font-display text-3xl tracking-tight text-balance sm:text-4xl md:text-5xl">
            Cada destino tiene una historia.
            <br />
            <em className="italic text-accent">¿Cuál será la tuya?</em>
          </h2>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            Del Caribe a Europa, de la Patagonia a Machu Picchu. Explorá los
            destinos más increíbles y armá tu próximo viaje con nosotros.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.18 }}
        >
          <Link href={buildWhatsAppUrl()} target="_blank" onClick={() => track("whatsapp_click", { source: "cta_section" })}>
            <Button
              size="lg"
              className="mt-2 rounded-full px-8 text-sm font-semibold"
            >
              Consultar mi viaje
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Carrusel a ancho completo */}
      <motion.div
        className="mt-10 w-screen max-w-none -mx-[50vw] relative left-1/2 right-1/2"
        onMouseMove={(e) => {
          cursorX.set(e.clientX + 16);
          cursorY.set(e.clientY + 16);
        }}
        onMouseLeave={() => setHoverLabel(null)}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
      >
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop
          slidesPerView={1.6}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3.2, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="px-6 sm:px-10 lg:px-20"
        >
          {CTA_IMAGES.map((image, index) => {
            const offsetClass = index % 2 === 0 ? "translate-y-4" : "-translate-y-4";

            return (
              <SwiperSlide key={image.src}>
                <div
                  className={`group relative my-12 h-48 sm:h-72 md:h-76 w-full overflow-hidden rounded-2xl bg-navy-deep/60 ring-1 ring-navy-deep/10 shadow-[0_20px_50px_-24px_rgba(19,36,59,0.5)] transition-transform duration-500 ${offsetClass} cursor-pointer`}
                  onMouseEnter={() => setHoverLabel(image.label)}
                  onMouseLeave={() => setHoverLabel(null)}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.label}
                    fill
                    sizes="(max-width: 640px) 65vw, (max-width: 1024px) 45vw, (max-width: 1280px) 32vw, 25vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    priority={index === 0}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2 py-1 text-xs font-medium text-white sm:hidden">
                    {image.label}
                  </span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

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
      </motion.div>
    </section>
  );
}
