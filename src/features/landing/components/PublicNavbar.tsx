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

export function PublicNavbar() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <nav className=" bg-white mx-auto flex h-16 items-center justify-between w-[96%] sm:h-20">
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

      <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.22em] text-slate-600 sm:flex">
        <Link href="#home" className="hover:text-slate-900">
          Home
        </Link>
        <Link href="#packages" className="hover:text-slate-900">
          Paquetes
        </Link>
        <Link href="#services" className="hover:text-slate-900">
          Servicios
        </Link>
        <Link href="#contact" className="hover:text-slate-900">
          Contacto
        </Link>

        <div className="hidden sm:block">
          <Link href={whatsappUrl} aria-label="Agendar por WhatsApp">
            <Button
              size="md"
              variant="secondary"
              className="rounded-full px-5 text-xs font-semibold uppercase tracking-[0.22em]"
            >
              Consultar ahora
            </Button>
          </Link>
        </div>

      </nav>

    </nav>
  );
}

