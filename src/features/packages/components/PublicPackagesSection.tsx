import { listPackages, type ListPackagesParams } from "@/features/packages/service";
import { Card, CardHeader, CardTitle, CardDescription, Input, Button } from "@/components/ui";
import { PackagesMobileSwiper } from "./PackagesMobileSwiper";
import { PackagesSwiper } from "./PackagesSwiper";

interface PublicPackagesSectionProps {
  startDateFrom?: string;
  title?: string;
}

function parseFilters(startDateFrom?: string, title?: string): ListPackagesParams {
  const params: ListPackagesParams = {};

  if (title?.trim()) params.title = title.trim();

  if (startDateFrom) {
    const parsed = new Date(startDateFrom);
    if (!Number.isNaN(parsed.getTime())) params.startDateFrom = parsed;
  }

  return params;
}

const SearchIcon = () => (
  <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export async function PublicPackagesSection({ startDateFrom, title }: PublicPackagesSectionProps) {
  const filters = parseFilters(startDateFrom, title);
  const packages = await listPackages(filters);
  const hasActiveFilters = !!(title?.trim() || startDateFrom);

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
          Buscá tu próximo destino por nombre o filtrá por fecha de salida.
        </p>
      </div>

      {/* Filtro */}
      <form method="get" className="mx-auto w-full max-w-2xl">
        <div className="flex flex-col gap-2 rounded-2xl border border-border-subtle bg-surface p-2 shadow-soft sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-border-subtle sm:rounded-full sm:p-1.5">

          {/* Campo: título */}
          <div className="flex flex-1 items-center gap-2 px-3 py-1.5 sm:px-4">
            <SearchIcon />
            <div className="flex flex-1 flex-col">
              <label htmlFor="title" className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Destino
              </label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={title}
                placeholder="Ej: París, Caribe…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          {/* Campo: fecha */}
          <div className="flex flex-1 items-center gap-2 px-3 py-1.5 sm:px-4">
            <CalendarIcon />
            <div className="flex flex-1 flex-col">
              <label htmlFor="startDateFrom" className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Fecha desde
              </label>
              <Input
                id="startDateFrom"
                name="startDateFrom"
                type="date"
                defaultValue={startDateFrom}
                className="h-auto border-0 bg-transparent p-0 text-sm shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          {/* Botón */}
          <div className="flex items-center gap-2 px-1.5 sm:pl-3">
            <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto sm:px-6">
              Buscar
            </Button>
            {hasActiveFilters && (
              <a
                href="#packages"
                className="whitespace-nowrap text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Limpiar
              </a>
            )}
          </div>
        </div>
      </form>

      {/* Resultados */}
      {packages.length === 0 ? (
        <Card className="mt-2 border-dashed bg-surface/90">
          <CardHeader>
            <CardTitle className="text-base">
              {hasActiveFilters
                ? "No hay paquetes que coincidan con tu búsqueda."
                : "Aún no hay paquetes cargados."}
            </CardTitle>
            <CardDescription>
              {hasActiveFilters
                ? "Probá con otro destino o sin filtro de fecha."
                : "Cuando crees tus primeros paquetes desde el panel de administración, van a aparecer automáticamente en esta sección."}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <>
          <PackagesSwiper packages={packages} />
          <PackagesMobileSwiper packages={packages} />
        </>
      )}
    </section>
  );
}
