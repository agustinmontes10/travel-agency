"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";

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

    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
