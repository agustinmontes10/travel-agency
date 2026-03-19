import Link from "next/link";
import { listPackages, type ListPackagesParams } from "@/features/packages/service";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { PackageCard } from "./PackageCard";
import { cn } from "@/lib/cn";

const PREVIEW_COUNT_DESKTOP = 6;
const PREVIEW_COUNT_MOBILE = 4;

interface PackagesResultsProps {
  filters: ListPackagesParams;
  hasActiveFilters: boolean;
}

export async function PackagesResults({ filters, hasActiveFilters }: PackagesResultsProps) {
  const packages = await listPackages(filters);

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

  const displayed = packages.slice(0, PREVIEW_COUNT_DESKTOP);
  const hasMore = packages.length > PREVIEW_COUNT_DESKTOP;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((pkg, i) => (
          <div key={pkg.id} className={i >= PREVIEW_COUNT_MOBILE ? "hidden sm:block" : undefined}>
            <PackageCard pkg={pkg} />
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center pt-2">
          <Link
            href="/paquetes"
            className={cn(
              "group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-tight transition-all duration-200",
              "bg-accent text-accent-foreground shadow-soft hover:bg-accent/90 hover:shadow-lg hover:-translate-y-px",
              "h-12 px-8 text-sm"
            )}
          >
            Ver todos los paquetes
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
