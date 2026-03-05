import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@/components/ui";

export default function Home() {
  return (
    <main className="flex flex-1 items-center py-12">
      <div className="grid w-full gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
        <section className="space-y-6">
          <p className="inline-flex rounded-full bg-accent-soft px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Travel agency · Design system
          </p>
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              A clean 2026 UI layer for your travel experiences.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              This project now ships with a minimal, reusable design system&mdash;buttons,
              inputs, cards and a shared page shell&mdash;ready to power the public
              landing and the admin dashboard.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg">Ver paquetes</Button>
            <Button variant="ghost" size="lg">
              Ingresar al panel admin
            </Button>
          </div>
        </section>

        <section>
          <Card>
            <CardHeader align="left">
              <CardTitle>Buscar tu próximo viaje</CardTitle>
              <CardDescription>
                Un ejemplo simple usando los componentes base del sistema de diseño.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="destination"
                  className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Destino
                </label>
                <Input id="destination" placeholder="Ej. Caribe, Europa, Patagonia" />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="start-date"
                  className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Fecha desde
                </label>
                <Input id="start-date" type="date" />
              </div>
              <div className="pt-2">
                <Button type="button" fullWidth>
                  Explorar paquetes
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
