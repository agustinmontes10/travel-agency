import { listPackages, type ListPackagesParams } from "@/features/packages/service";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@/components/ui";
import Image from "next/image";

interface PublicPackagesSectionProps {
  startDateFrom?: string;
}

function parseFilters(startDateFrom?: string): ListPackagesParams {
  if (!startDateFrom) return {};

  const parsed = new Date(startDateFrom);
  if (Number.isNaN(parsed.getTime())) return {};

  return { startDateFrom: parsed };
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export async function PublicPackagesSection({ startDateFrom }: PublicPackagesSectionProps) {
  const filters = parseFilters(startDateFrom);
  const packages = await listPackages(filters);

  return (
    <section id="packages" className="space-y-8">
      <div className="space-y-3 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Paquetes destacados
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Una selección de experiencias listas para reservar.
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Mostrá tus próximos viajes con tarjetas visuales, fechas claras y un
          diseño limpio inspirado en las mejores webs de alojamiento de 2026.
        </p>
      </div>

      <form
        method="get"
        className="mx-auto flex w-full max-w-xl flex-col gap-3 rounded-full bg-surface p-2 shadow-soft sm:flex-row sm:items-center"
      >
        <div className="flex-1">
          <label
            htmlFor="startDateFrom"
            className="mb-1 block text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground"
          >
            Fecha desde
          </label>
          <Input
            id="startDateFrom"
            name="startDateFrom"
            type="date"
            defaultValue={startDateFrom}
            className="h-10 bg-surface-muted"
          />
        </div>
        <div className="flex items-end justify-end">
          <Button type="submit" size="md" className="px-6">
            Filtrar
          </Button>
        </div>
      </form>

      {packages.length === 0 ? (
        <Card className="mt-2 border-dashed bg-surface/90">
          <CardHeader>
            <CardTitle className="text-base">
              Aún no hay paquetes cargados para esta fecha.
            </CardTitle>
            <CardDescription>
              Cuando crees tus primeros paquetes desde el panel de administración,
              van a aparecer automáticamente en esta sección.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-6 pt-2 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className="group overflow-hidden rounded-3xl border border-border-subtle bg-surface shadow-soft"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-100">
                  <div className="space-y-0.5">
                    <p className="font-semibold leading-snug">{pkg.title}</p>
                    <p className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-200/80">
                      Salida {formatDate(pkg.startDate)}
                    </p>
                  </div>
                </div>
              </div>

              <CardContent className="gap-2 p-4">
                <CardDescription className="text-xs leading-relaxed">
                  Ideal para mostrar un resumen corto del destino, la duración o el
                  tipo de experiencia. Podés extender este modelo cuando agregues más
                  campos al paquete.
                </CardDescription>
              </CardContent>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

