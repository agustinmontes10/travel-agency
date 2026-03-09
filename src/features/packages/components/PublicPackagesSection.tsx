import { listPackages, type ListPackagesParams } from "@/features/packages/service";
import { Card, CardHeader, CardTitle, CardDescription, Input, Button } from "@/components/ui";
import Image from "next/image";
import { PackagesMobileSwiper } from "./PackagesMobileSwiper";

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
        <>
          <div className="hidden gap-6 pt-2 md:grid md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <article
                key={pkg.id}
                className="group overflow-hidden rounded-3xl border border-border-subtle bg-surface shadow-soft"
              >
                <div className="relative h-112 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 100vw"
                    className="object-fill transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center justify-between p-4 text-xs">
                  <div className="space-y-0.5">
                    <p className="text-lg font-semibold leading-snug">{pkg.title}</p>
                    <p className="text-sm uppercase text-muted-foreground">
                      Salida {formatDate(pkg.startDate)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <PackagesMobileSwiper packages={packages} />
        </>
      )}
    </section>
  );
}

