import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;
const WHATSAPP_DEFAULT_MESSAGE =
  process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ??
  "Hola, quiero recibir asesoramiento para mi próximo viaje.";

function buildWhatsAppUrl() {
  if (!WHATSAPP_PHONE) return "#";

  const encodedMessage = encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
}

export function Hero() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section className="overflow-hidden min-h-screen flex items-center justify-center">
      <Image
        src="/Hero1.png"
        alt="Destinos icónicos alrededor del mundo"
        // fill
        width={1000}
        height={1000}
        priority
        sizes="100vw"
        className="object-cover absolute w-[96%] h-[92%] inset-0 left-[2%] right-[2%] top-auto rounded-2xl"
      />
      <div className="relative z-10 px-4 sm:px-8 lg:px-16 space-y-6 text-white text-center items-center flex flex-col">

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
    </section>
  );
}

