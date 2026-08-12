/**
 * Placeholder blur para next/image con imágenes remotas (Supabase Storage),
 * donde no hay import estático que genere blurDataURL automáticamente.
 * Es un SVG shimmer con los colores de la marca, embebido como data URL.
 */
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f1ebe0" offset="20%" />
      <stop stop-color="#e6ddcc" offset="50%" />
      <stop stop-color="#f1ebe0" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f1ebe0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
</svg>`;

function toBase64(str: string) {
  return typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
}

export const packageImagePlaceholder = `data:image/svg+xml;base64,${toBase64(shimmer(700, 933))}`;
