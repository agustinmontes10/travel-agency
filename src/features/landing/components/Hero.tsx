import Image from "next/image";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { Navbar } from "./Navbar";

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
        src="/HeroCalidad.png"
        alt="Destinos icónicos alrededor del mundo"
        fill
        // width={1000}
        // height={1000}
        priority
        sizes="100vw"
        // className="object-cover absolute w-[96%] h-[92%] inset-0 left-[2%] right-[2%] top-auto rounded-4xl object-bottom"
        className="object-cover object-bottom"
      />
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 space-y-10 text-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center">
         
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.2rem] lg:leading-[1.05]">
              El mundo te espera.
              <br />
              Nosotros te llevamos.
            </h1>
            <p className="text-sm leading-relaxed sm:text-base">
              Somos tu agencia de viajes de confianza. Te ayudamos a planificar
              cada detalle, desde la primera consulta hasta el regreso a casa,
              para que solo tengas que disfrutar.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="#packages">
              <Button size="lg" className="px-6">
                Ver paquetes disponibles
              </Button>
            </Link>
           
          </div>
        </div>
      </div>
    </section>
  );
}

