import { Hero } from "@/features/landing/components/Hero";
import { PublicPackagesSection } from "@/features/packages/components/PublicPackagesSection";
import { ServicesSection } from "@/features/landing/components/ServicesSection";
import { ContactSection } from "@/features/landing/components/ContactSection";
import { CtaVideosSection } from "@/features/landing/components/CtaSection";

interface LandingPageProps {
  searchParams?: Promise<{
    title?: string;
    month?: string;
    type?: string;
  }>;
}

export default async function LandingPage({ searchParams }: LandingPageProps) {
  const params = await searchParams;
  const title = params?.title;
  const month = params?.month;
  const type = params?.type;
  return (
    <main id="home" className="flex flex-1 flex-col gap-16 md:gap-20 lg:gap-24">
      <Hero />
      <PublicPackagesSection title={title} month={month} type={type} />
      <ServicesSection />
      <CtaVideosSection />
      <ContactSection />
    </main>
  );
}
