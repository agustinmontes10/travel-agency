"use client";

import Image from "next/image";
import { useState } from "react";
import { EffectCards, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { PublicPackage } from "@/features/packages/service";
import { PackageModal } from "./PackageModal";

import "swiper/css";
import "swiper/css/effect-cards";
import "./PackagesSwiper.css";

const MONTH_NAMES = ["", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function formatMonths(months: number[]) {
  return [...months].sort((a, b) => a - b).map((m) => MONTH_NAMES[m]).join(" · ");
}

interface PackagesSwiperProps {
  packages: PublicPackage[];
}

export function PackagesSwiper({ packages }: PackagesSwiperProps) {
  const [selected, setSelected] = useState<PublicPackage | null>(null);

  if (packages.length === 0) return null;

  return (
    <>
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
              <article
                className="overflow-hidden rounded-3xl border border-border-subtle shadow-soft cursor-pointer"
                onClick={() => setSelected(pkg)}
              >
                <div className="relative h-144 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 1024px) 384px, 420px"
                    className="object-fill"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      pkg.type === "NACIONAL"
                        ? "bg-emerald-50/90 text-emerald-700"
                        : "bg-blue-50/90 text-blue-700"
                    }`}>
                      {pkg.type === "NACIONAL" ? "Nacional" : "Internacional"}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-100">
                    <p className="font-semibold leading-snug">{pkg.title}</p>
                    {pkg.months.length > 0 && (
                      <p className="mt-1 text-slate-300">{formatMonths(pkg.months)}</p>
                    )}
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    {selected && <PackageModal pkg={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
