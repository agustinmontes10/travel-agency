import Image from "next/image";
import { Navbar } from "./Navbar";
import { HeroContent } from "./HeroContent";

interface HeroProps {
  startDateFrom?: string;
}

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;
const WHATSAPP_DEFAULT_MESSAGE =
  process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ??
  "Hola, quiero recibir asesoramiento para mi próximo viaje.";

function buildWhatsAppUrl() {
  if (!WHATSAPP_PHONE) return "#";

  const encodedMessage = encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
}

export function Hero({ startDateFrom }: HeroProps) {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section className="overflow-hidden min-h-screen flex flex-col items-center justify-center">

      <Navbar whatsappUrl={whatsappUrl} />

      <Image
        src="/HeroCalidad.webp"
        alt="Destinos icónicos alrededor del mundo"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[60%] md:object-bottom"
      />

      {/* Overlay radial: oscuro en el centro, transparente en los bordes */}
      <div className="absolute inset-0 bg-black/5" />

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 text-white">
        <HeroContent />
      </div>
    </section>
  );
}

