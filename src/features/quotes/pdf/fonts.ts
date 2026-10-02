import path from "node:path";
import { Font } from "@react-pdf/renderer";

const fontFile = (weight: 400 | 600 | 700) =>
  path.join(process.cwd(), "node_modules", "@fontsource", "inter", "files", `inter-latin-${weight}-normal.woff`);

/**
 * Inter embebida en el PDF (react-pdf solo trae las fuentes base de PDF). Se lee de @fontsource/inter;
 * next.config.ts incluye estos archivos en el bundle de la ruta del PDF.
 * El subset "latin" cubre las tildes y la ñ del español.
 */
Font.register({
  family: "Inter",
  fonts: [
    { src: fontFile(400), fontWeight: 400 },
    { src: fontFile(600), fontWeight: 600 },
    { src: fontFile(700), fontWeight: 700 },
  ],
});
