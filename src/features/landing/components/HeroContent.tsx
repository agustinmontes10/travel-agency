"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui";

export function HeroContent() {
  return (
    <div className="mx-auto flex flex-col items-center space-y-6 text-center">
      <motion.h1
        className="text-4xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem] lg:leading-[1.05]"
        style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        El mundo te espera, nosotros te llevamos.
      </motion.h1>

      <motion.div
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
      >
        <Link href="#packages">
          <Button size="lg" className="px-6">
            Ver paquetes disponibles
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
