import Image from "next/image";
import Link from "next/link";
import { Button, Input } from "@/components/ui";

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

      <header className="mx-auto flex max-w-6xl items-center justify-between pt-6 text-sm absolute z-1 top-0">
        <Link href="#home" className="inline-flex items-center">
          <Image
            src="/Logo2.png"
            alt="mt turismo Gonzales Chaves"
            width={180}
            height={48}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.22em] text-slate-100 sm:flex">
          <Link href="#home" className="hover:text-white">
            Home
          </Link>
          <Link href="#packages" className="hover:text-white">
            Paquetes
          </Link>
          <Link href="#services" className="hover:text-white">
            Servicios
          </Link>
          <Link href="#contact" className="hover:text-white">
            Contacto
          </Link>
          <Link href={whatsappUrl} aria-label="Agendar por WhatsApp">
            <Button
              size="md"
              variant="secondary"
              className="rounded-full px-5 text-xs font-semibold uppercase tracking-[0.22em]"
            >
              Consultar ahora
            </Button>
          </Link>
        </nav>
      </header>

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
          <p className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-slate-100/80 backdrop-blur">
            Donde se encuentran el diseño y los viajes
          </p>
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.2rem] lg:leading-[1.05]">
              Diseñamos experiencias de viaje
              <br />
              con una capa visual de 2026.
            </h1>
            <p className="text-sm leading-relaxed text-slate-100/80 sm:text-base">
              Presentá tus destinos, paquetes y servicios con una landing moderna,
              optimizada para móviles y pensada para convertir visitantes en
              consultas reales por WhatsApp.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="#packages">
              <Button size="lg" className="px-6">
                Ver paquetes disponibles
              </Button>
            </Link>
            <Link href={whatsappUrl}>
              <Button
                variant="ghost"
                size="lg"
                className="bg-white/10 px-6 text-white hover:bg-white/20"
              >
                Consultar por WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

