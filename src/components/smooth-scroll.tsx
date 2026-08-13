"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Scroll suave con inercia (Lenis) + configuración global de Motion.
 * Se desactiva por completo si el usuario prefiere movimiento reducido.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.11,
      anchors: true,
    });
    window.__lenis = lenis;

    // Mantiene sincronizados los ScrollTriggers de GSAP con el scroll suavizado
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
