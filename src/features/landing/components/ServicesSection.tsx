import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";

const PersonalizedIcon = () => (
  <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
  </svg>
);

const HumanIcon = () => (
  <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const SupportIcon = () => (
  <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12h-8v-2h8v2zm0-3h-8V9h8v2zm0-3h-8V6h8v2z" />
  </svg>
);

const services = [
  {
    title: "Atención personalizada",
    icon: <PersonalizedIcon />,
    description:
      "Te asesoramos en cada etapa del viaje para encontrar la mejor opción según tus gustos, presupuesto y fechas.",
  },
  {
    title: "Asesoramiento humano",
    icon: <HumanIcon />,
    description:
      "Te ayudamos a elegir destinos, rutas y experiencias aprovechando nuestro conocimiento del mercado y las mejores opciones disponibles.",
  },
  {
    title: "Acompañamiento durante tu viaje",
    icon: <SupportIcon />,
    description:
      "Estamos disponibles antes, durante y después de tu viaje para resolver dudas, cambios o cualquier imprevisto.",
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
          <Card key={service.title} className="h-full bg-surface/90 shadow-md border-0">
            <CardHeader className="gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-soft">
                {service.icon}
              </div>
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

