/**
 * Trazados SVG (viewBox 24×24, estilo línea) compartidos entre la UI (DOM) y el PDF (react-pdf).
 * Los puntos se dibujan como segmentos de largo ~0 con `strokeLinecap="round"`.
 */
export const ICON_PATHS = {
  plane: [
    "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
  ],
  bed: [
    "M2 18v-9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9",
    "M2 14h20M2 21v-3M22 21v-3",
    "M6 10h4a1 1 0 0 1 1 1v3H5v-3a1 1 0 0 1 1-1z",
  ],
  car: [
    "M5 17h14M3 13l2-6a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 7l2 6v4a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1h-11v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z",
    "M7.5 14h.01",
    "M16.5 14h.01",
  ],
  shield: ["M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z", "m9 12 2 2 4-4"],
} as const;

export type IconName = keyof typeof ICON_PATHS;
