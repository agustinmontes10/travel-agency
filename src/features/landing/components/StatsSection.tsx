"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { EASE_OUT } from "@/components/ui";

interface Stat {
  value: number;
  prefix?: string;
  label: string;
  detail: string;
}

const STATS: Stat[] = [
  {
    value: 6,
    label: "Años de experiencia",
    detail: "organizando viajes desde Gonzales Chaves",
  },
  {
    value: 100,
    prefix: "+",
    label: "Paquetes vendidos",
    detail: "a viajeros que confiaron en nosotros",
  },
  {
    value: 50,
    prefix: "+",
    label: "Destinos recorridos",
    detail: "en Argentina y el resto del mundo",
  },
];

/** Número que cuenta de 0 al valor final al entrar en viewport. */
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 2, ease: EASE_OUT });
    return () => controls.stop();
  }, [inView, reduceMotion, count, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function StatsSection() {
  return (
    <section aria-label="Nuestra trayectoria en números">
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className={`flex flex-col items-center gap-2 text-center ${
              i > 0 ? "sm:border-l sm:border-border-subtle" : ""
            }`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: i * 0.15 }}
          >
            <p className="font-display text-6xl tracking-tight text-foreground sm:text-7xl">
              {stat.prefix && <span className="text-gold">{stat.prefix}</span>}
              <Counter value={stat.value} />
            </p>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
              {stat.label}
            </p>
            <p className="max-w-[16rem] text-sm leading-relaxed text-muted">
              {stat.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
