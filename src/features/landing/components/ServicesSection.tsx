import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";

const services = [
  {
    title: "Curaduría de destinos",
    caption: "Servicios",
    description:
      "Seleccionamos y destacamos tus mejores paquetes para que el cliente entienda rápido qué hacés y por qué sos distinto.",
  },
  {
    title: "Asesoramiento humano",
    caption: "Atención",
    description:
      "Integramos tu WhatsApp como canal principal de contacto, alineando la web con la forma real en la que vendés.",
  },
  {
    title: "Base escalable",
    caption: "Tecnología",
    description:
      "Next.js App Router, Prisma y Postgres listos para sumar login, panel admin, más features y nuevos destinos.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="space-y-8">
      <div className="space-y-3 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Servicios para tu agencia
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Todo lo que necesitás para mostrar y vender tus viajes.
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Una landing enfocada en tus paquetes públicos hoy, y un panel de
          administración listo para sumar gestión interna mañana.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="h-full bg-surface/90">
            <CardHeader className="gap-1.5">
              <span className="inline-flex w-fit rounded-full bg-accent-soft px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {service.caption}
              </span>
              <CardTitle className="text-base sm:text-lg">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

