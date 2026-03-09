"use client";

import Image from "next/image";
import { EffectCards, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { PublicPackage } from "@/features/packages/service";

import "swiper/css";
import "swiper/css/effect-cards";

interface PackagesMobileSwiperProps {
  packages: PublicPackage[];
}

export function PackagesMobileSwiper({ packages }: PackagesMobileSwiperProps) {
  if (packages.length === 0) return null;

  return (
    <div className="md:hidden pt-2">
      <Swiper
        effect="cards"
        grabCursor
        modules={[EffectCards, Pagination]}
        pagination={{ clickable: true }}
        className="max-w-xs"
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
  );
}

