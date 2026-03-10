"use client";

import Image from "next/image";
import { EffectCards, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { PublicPackage } from "@/features/packages/service";

import "swiper/css";
import "swiper/css/effect-cards";
import "./PackagesSwiper.css";

interface PackagesSwiperProps {
  packages: PublicPackage[];
}

export function PackagesSwiper({ packages }: PackagesSwiperProps) {
  if (packages.length === 0) return null;

  return (
    <div className="hidden md:flex justify-center pt-2">
      <div className="w-full max-w-sm">
        <Swiper
          effect="cards"
          grabCursor
          modules={[EffectCards, Pagination]}
          pagination={{ clickable: true }}
          cardsEffect={{
            perSlideOffset: 32,
            perSlideRotate: 2,
          }}
          className="w-full packages-swiper-desktop"
        >
          {packages.map((pkg) => (
            <SwiperSlide key={pkg.id}>
              <article className="overflow-hidden rounded-3xl border border-border-subtle bg-surface shadow-soft">
                <div className="relative h-112 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="100vw"
                    className="object-fill"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-100">
                    <p className="font-semibold leading-snug">{pkg.title}</p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
