"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

export interface SplitHeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** Retardo en segundos antes del stagger de palabras */
  delay?: number;
}

/**
 * Titular con reveal palabra por palabra (GSAP SplitText) al entrar en viewport.
 * `autoSplit` re-divide el texto cuando cargan las fuentes o cambia el ancho,
 * y con prefers-reduced-motion el texto se muestra estático.
 */
export function SplitHeading({ children, className, as: Tag = "h2", delay = 0 }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(el, {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              y: "0.7em",
              opacity: 0,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.05,
              delay,
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
                once: true,
              },
            }),
        });
        return () => split.revert();
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
