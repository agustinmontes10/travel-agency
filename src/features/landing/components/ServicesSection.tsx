import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";

const CompassIcon = () => (
  <svg className="w-10 h-10 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.9" stroke="none" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-10 h-10 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="9" y1="10" x2="15" y2="10" />
    <line x1="9" y1="14" x2="13" y2="14" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-10 h-10 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const services = [
  {
    title: "Paquetes a medida",
    icon: <CompassIcon />,
    description:
      "Armamos tu viaje según tus gustos, fechas y presupuesto. Nacionales e internacionales, para grupos, parejas o familias.",
  },
  {
    title: "Asesoramiento sin costo",
    icon: <ChatIcon />,
    description:
      "Consultanos por WhatsApp o en persona. Te orientamos sobre destinos, temporadas, documentación y todo lo que necesitás saber antes de viajar.",
  },
  {
    title: "Respaldo en todo momento",
    icon: <ShieldIcon />,
    description:
      "Estamos disponibles antes, durante y después de tu viaje para resolver cualquier cambio, duda o imprevisto que surja en el camino.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="space-y-8">
      <div className="space-y-3 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Por qué elegirnos
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Viajás tranquilo porque estás en buenas manos.
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Años de experiencia organizando viajes nos enseñaron que los detalles
          marcan la diferencia. Por eso nos ocupamos de todo, para que vos solo
          te ocupes de disfrutar.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="h-full bg-surface/90 shadow-soft border-0">
            <CardHeader className="gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-soft">
                {service.icon}
              </div>
              <CardTitle className="text-base sm:text-lg">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">{service.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
