import { Hero } from "@/features/landing/components/Hero";
import { PublicPackagesSection } from "@/features/packages/components/PublicPackagesSection";
import { ServicesSection } from "@/features/landing/components/ServicesSection";
import { ContactSection } from "@/features/landing/components/ContactSection";
import { CtaVideosSection } from "@/features/landing/components/CtaSection";

interface LandingPageProps {
  searchParams?: {
    startDateFrom?: string;
  };
}

export default async function LandingPage({ searchParams }: LandingPageProps) {
  const startDateFrom = searchParams?.startDateFrom;

  return (
    <main id="home" className="flex flex-1 flex-col gap-16 md:gap-20 lg:gap-24">
      <Hero />
      <PublicPackagesSection startDateFrom={startDateFrom} />
      <ServicesSection />
      <CtaVideosSection />
      <ContactSection />
    </main>
  );
}

