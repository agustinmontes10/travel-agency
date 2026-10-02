import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;

const nextConfig: NextConfig = {
  // El PDF de cotizaciones lee la logo y la fuente Inter con fs; hay que incluirlas en el bundle de la función.
  outputFileTracingIncludes: {
    "/admin/cotizador/[id]/pdf": [
      "./public/Logo.png",
      "./node_modules/@fontsource/inter/files/inter-latin-{400,600,700}-normal.woff",
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    // Calidades permitidas: 20 para los fondos desenfocados, 75 default
    qualities: [20, 75],
    remotePatterns: [
      ...(supabaseHostname
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseHostname,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
