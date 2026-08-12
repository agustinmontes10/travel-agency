"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Retardo en segundos antes de iniciar la animación */
  delay?: number;
  /** Desplazamiento vertical inicial en px */
  y?: number;
  /** Duración en segundos */
  duration?: number;
  /** Porción del elemento visible que dispara la animación (0–1) */
  amount?: number;
  /** Desactiva el desenfoque inicial (útil sobre imágenes) */
  noBlur?: boolean;
}

/**
 * Reveal editorial: fade + rise + desenfoque que se enfoca al entrar en viewport.
 * Anima una sola vez y respeta prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  duration = 0.8,
  amount = 0.2,
  noBlur = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y, filter: noBlur ? "blur(0px)" : "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Regla horizontal que se "dibuja" (scaleX 0 → 1) al entrar en viewport.
 */
export function DrawnRule({
  className,
  delay = 0,
  origin = "left",
}: {
  className?: string;
  delay?: number;
  origin?: "left" | "right" | "center";
}) {
  const originClass =
    origin === "left" ? "origin-left" : origin === "right" ? "origin-right" : "origin-center";

  return (
    <motion.span
      aria-hidden
      className={cn("block h-px", originClass, className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
    />
  );
}
