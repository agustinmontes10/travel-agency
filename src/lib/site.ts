/**
 * URL pública del sitio. Prioriza NEXT_PUBLIC_SITE_URL (dominio propio),
 * después el dominio de producción que expone Vercel, y localhost en dev.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteName = "MT Turismo";

export const siteDescription =
  "Paquetes nacionales e internacionales con asesoramiento personalizado. Adolfo Gonzales Chaves, Buenos Aires.";
