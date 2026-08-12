import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl, siteName, siteDescription } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Agencia de viajes`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName,
    title: `${siteName} — Agencia de viajes`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Agencia de viajes`,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${fraunces.variable} ${hankenGrotesk.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
