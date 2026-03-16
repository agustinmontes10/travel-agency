export const dynamic = "force-dynamic";

import { Hero } from "@/features/landing/components/Hero";
import { PublicPackagesSection } from "@/features/packages/components/PublicPackagesSection";
import { ServicesSection } from "@/features/landing/components/ServicesSection";
import { ContactSection } from "@/features/landing/components/ContactSection";
import { CtaVideosSection } from "@/features/landing/components/CtaSection";
import Image from "next/image";

interface LandingPageProps {
  searchParams?: Promise<{
    startDateFrom?: string;
    title?: string;
  }>;
}

export default async function LandingPage({ searchParams }: LandingPageProps) {
  const params = await searchParams;
  const startDateFrom = params?.startDateFrom;
  const title = params?.title;

  return (
    <main id="home" className="flex flex-1 flex-col gap-16 md:gap-20 lg:gap-24">
      <Hero />
      <PublicPackagesSection startDateFrom={startDateFrom} title={title} />
      <ServicesSection />
      <CtaVideosSection />
      <ContactSection />
    </main>
  );
}

