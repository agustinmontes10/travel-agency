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
    <section className="relative overflow-hidden rounded-[2.5rem] border border-border-subtle bg-surface shadow-soft">
      <div className="absolute inset-0">
        <Image
          src="/HeroExample.png"
          alt="Paisaje de montaña al amanecer"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 px-6 pb-10 pt-6 sm:px-10 sm:pb-14 sm:pt-8 lg:px-14 lg:pt-10 lg:pb-16">
        <header className="mb-12 flex items-center justify-between gap-6 text-sm text-slate-100">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold tracking-[0.22em] uppercase">
              Travel Studio
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-xs font-medium tracking-[0.22em] uppercase sm:flex">
            <Link href="#home" className="text-slate-100/80 hover:text-white">
              Home
            </Link>
            <Link href="#packages" className="text-slate-100/70 hover:text-white">
              Paquetes
            </Link>
            <Link href="#services" className="text-slate-100/70 hover:text-white">
              Servicios
            </Link>
            <Link href="#contact" className="text-slate-100/70 hover:text-white">
              Contacto
            </Link>
          </nav>

          <div className="hidden sm:block">
            <Link href={whatsappUrl} aria-label="Agendar por WhatsApp">
              <Button
                size="md"
                variant="secondary"
                className="rounded-full border border-white/30 bg-white/10 px-5 text-xs font-semibold tracking-[0.22em] uppercase text-white backdrop-blur-md hover:bg-white/20"
              >
                Consultar ahora
              </Button>
            </Link>
          </div>
        </header>

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-end">
          <div className="space-y-6 text-white">
            <p className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-slate-100/80 backdrop-blur">
              Donde se encuentran el diseño y los viajes
            </p>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.2rem] lg:leading-[1.05]">
                Diseñamos experiencias de viaje
                <br />
                con una capa visual de 2026.
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-100/80 sm:text-base">
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

          <div className="space-y-4 rounded-3xl bg-black/35 p-5 text-slate-100 backdrop-blur-md sm:p-6 lg:p-7">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-200/80">
              Por qué esta landing
            </p>
            <div className="grid gap-5 text-sm sm:grid-cols-2">
              <div className="space-y-1.5">
                <p className="font-semibold text-slate-50">
                  Enfocada en tus paquetes
                </p>
                <p className="text-xs leading-relaxed text-slate-100/80">
                  Cards limpias, fechas claras y CTAs visibles para que tus
                  paquetes luzcan como en una web de 2026.
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="font-semibold text-slate-50">
                  Lista para escalar
                </p>
                <p className="text-xs leading-relaxed text-slate-100/80">
                  Arquitectura por features (landing, paquetes, admin, auth)
                  preparada para crecer sin perder orden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

