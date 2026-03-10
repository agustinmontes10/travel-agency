"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Button } from "@/components/ui";

import "swiper/css";

const CTA_IMAGES = [
  { src: "/imagesCTA/Caribe.jpg", label: "Playa caribeña" },
  { src: "/imagesCTA/MachuPichu.jpg", label: "Machu Picchu - Peru" },
  { src: "/imagesCTA/ParqueIguazu.jpg", label: "Parque Iguazú - Argentina" },
  { src: "/imagesCTA/BigBen.jpg", label: "Big Ben - Inglaterra" },
  { src: "/imagesCTA/EstatuaLibertad.jpg", label: "Estatua de la Libertad - EEUU" },
  { src: "/imagesCTA/ParqueBanff.jpg", label: "Parque Nacional Banff - Canada" },
  { src: "/imagesCTA/BoraBora.jpg", label: "Bora Bora" },
  { src: "/imagesCTA/Glaciar.jpg", label: "Glaciar Perito Moreno - Argentina" },
];

export function CtaVideosSection() {
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState<(typeof CTA_IMAGES)[number] | null>(null);

  return (
    <section className="w-full py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center px-4 sm:px-8 lg:px-16">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Empieza a explorar y convierte tu viaje
            <br />
            en una experiencia inolvidable.
          </h2>
          <p className="text-sm text-slate-200/80 sm:text-base">
            Mostrá tus destinos estrella con videos inmersivos. Mientras tus
            visitantes leen el contenido, los videos se reproducen uno tras otro,
            sin saturar la pantalla.
          </p>
        </div>

        <Link href="#contact">
          <Button
            size="lg"
            className="mt-2 rounded-full px-8 text-sm font-semibold"
          >
            Reservar tu lugar
          </Button>
        </Link>
      </div>

      {/* Carrusel a ancho completo */}
      <div
        className="mt-10 w-screen max-w-none -mx-[50vw] relative left-1/2 right-1/2"
        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setHoverLabel(null)}
      >
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop
          slidesPerView={1.2}
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
                  className={`relative my-12 h-64 sm:h-72 md:h-80 w-full overflow-hidden rounded-3xl bg-slate-900/60 shadow-lg shadow-slate-950/60 transition-transform duration-500 ${offsetClass} cursor-pointer`}
                  onMouseEnter={() => setHoverLabel(image.label)}
                  onMouseLeave={() => setHoverLabel(null)}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="h-full w-full object-cover"
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

        {/* Label flotante solo en desktop */}
        {hoverLabel && (
          <div
            className="pointer-events-none fixed z-30 hidden sm:block rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white shadow-lg"
            style={{ left: cursorPos.x + 12, top: cursorPos.y + 12 }}
          >
            {hoverLabel}
          </div>
        )}

        {/* Modal de imagen ampliada */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 px-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-h-[90vh] max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
}