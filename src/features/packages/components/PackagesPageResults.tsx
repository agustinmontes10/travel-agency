import Link from "next/link";
import { listPackagesPaginated, type ListPackagesParams } from "@/features/packages/service";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { PackageCard } from "./PackageCard";
import { cn } from "@/lib/cn";

interface PackagesPageResultsProps {
  filters: ListPackagesParams;
  hasActiveFilters: boolean;
  page: number;
  searchParamsString: string;
}

function buildPageUrl(searchParamsString: string, page: number) {
  const params = new URLSearchParams(searchParamsString);
  params.set("page", String(page));
  return `/paquetes?${params.toString()}`;
}

function getPageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

export async function PackagesPageResults({
  filters,
  hasActiveFilters,
  page,
  searchParamsString,
}: PackagesPageResultsProps) {
  const { packages, total, totalPages } = await listPackagesPaginated(filters, page, 8);

  if (packages.length === 0) {
    return (
      <Card className="mt-2 border-dashed bg-surface/90">
        <CardHeader>
          <CardTitle className="text-base">
            {hasActiveFilters
              ? "No hay paquetes que coincidan con tu búsqueda."
              : "Aún no hay paquetes cargados."}
          </CardTitle>
          <CardDescription>
            {hasActiveFilters
              ? "Probá con otro destino, mes o tipo de viaje."
              : "Cuando crees tus primeros paquetes desde el panel de administración, van a aparecer automáticamente en esta sección."}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  const pageRange = getPageRange(page, totalPages);

  return (
    <div className="space-y-10">
      <p className="text-sm text-muted-foreground">
        {total} {total === 1 ? "paquete encontrado" : "paquetes encontrados"}
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 pt-4">
          <div className="flex items-center gap-1.5">
            {/* Prev */}
            <Link
              href={buildPageUrl(searchParamsString, page - 1)}
              aria-disabled={!hasPrev}
              aria-label="Página anterior"
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                hasPrev
                  ? "border-border-subtle bg-surface text-foreground hover:bg-surface-muted hover:border-accent/30"
                  : "pointer-events-none border-border-subtle bg-surface opacity-30 text-foreground"
              )}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </Link>

            {/* Page numbers */}
            {pageRange.map((item, i) =>
              item === "…" ? (
                <span key={`ellipsis-${i}`} className="inline-flex h-9 w-9 items-center justify-center text-sm text-muted-foreground select-none">
                  …
                </span>
              ) : (
                <Link
                  key={item}
                  href={buildPageUrl(searchParamsString, item)}
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                    item === page
                      ? "border-accent bg-accent text-accent-foreground shadow-sm"
                      : "border-border-subtle bg-surface text-foreground hover:bg-surface-muted hover:border-accent/30"
                  )}
                >
                  {item}
                </Link>
              )
            )}

            {/* Next */}
            <Link
              href={buildPageUrl(searchParamsString, page + 1)}
              aria-disabled={!hasNext}
              aria-label="Página siguiente"
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                hasNext
                  ? "border-border-subtle bg-surface text-foreground hover:bg-surface-muted hover:border-accent/30"
                  : "pointer-events-none border-border-subtle bg-surface opacity-30 text-foreground"
              )}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            Página {page} de {totalPages}
          </p>
        </div>
      )}
    </div>
  );
}
