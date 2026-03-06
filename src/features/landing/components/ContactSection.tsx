import Link from "next/link";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;
const WHATSAPP_DEFAULT_MESSAGE =
  process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ??
  "Hola, quiero hacer una consulta sobre los paquetes de la agencia.";

function buildWhatsAppUrl() {
  if (!WHATSAPP_PHONE) return "#";

  const encodedMessage = encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
}

export function ContactSection() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section id="contact">
      <Card className="border-dashed border-border-subtle/80 bg-surface/95">
        <CardHeader className="gap-2 md:flex md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Contacto
            </p>
            <CardTitle className="text-xl sm:text-2xl">
              ¿Listo para llevar tu agencia a una landing de 2026?
            </CardTitle>
            <CardDescription className="max-w-xl">
              Transformamos tu catálogo de viajes en una experiencia clara, visual y
              optimizada para captar leads por WhatsApp, sin perder el toque humano.
            </CardDescription>
          </div>
          <div className="mt-4 flex flex-col gap-3 md:mt-0 md:items-end">
            <Link href={whatsappUrl}>
              <Button size="lg" className="px-6">
                Escribir por WhatsApp
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground">
              También podés escribirnos a{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:hola@tuagencia.dev"
              >
                hola@tuagencia.dev
              </a>
            </p>
          </div>
        </CardHeader>
        <CardContent className="mt-3 grid gap-4 text-xs text-muted-foreground sm:grid-cols-3">
          <div>
            <p className="font-medium text-foreground">Horarios de atención</p>
            <p>Lunes a viernes de 10 a 18 hs (AR).</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Ubicación</p>
            <p>Atención 100% remota, para agencias de cualquier país.</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Próximos pasos</p>
            <p>
              Nos contás cómo trabajás hoy, te proponemos una estructura de sitios y
              definimos un primer MVP juntos.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

