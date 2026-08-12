import type { ReactNode } from "react";
import { PageShell } from "@/components/ui";
import { SmoothScroll } from "@/components/smooth-scroll";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { siteUrl, siteName, siteDescription } from "@/lib/site";

interface PublicLayoutProps {
  children: ReactNode;
}

// Datos estructurados para SEO local (Google: "agencia de viajes Gonzales Chaves")
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteName,
  description: siteDescription,
  url: siteUrl,
  telephone: process.env.NEXT_PUBLIC_WHATSAPP_PHONE
    ? `+${process.env.NEXT_PUBLIC_WHATSAPP_PHONE}`
    : undefined,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sarmiento 235",
    addressLocality: "Adolfo Gonzales Chaves",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: ["https://www.instagram.com/mtturismochaves/"],
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageShell className="max-w-6xl">
        {children}
      </PageShell>
      <WhatsAppFloat />
    </SmoothScroll>
  );
}
