import { Suspense } from "react";
import { PackagesFilter } from "./PackagesFilter";
import { PackagesResults } from "./PackagesResults";
import { PackagesSkeleton } from "./PackagesSkeleton";
import type { ListPackagesParams } from "@/features/packages/service";
import type { PackageType } from "@/features/packages/schemas";

interface PublicPackagesSectionProps {
  title?: string;
  month?: string;
  type?: string;
}

function parseFilters(title?: string, month?: string, type?: string): ListPackagesParams {
  const params: ListPackagesParams = {};
  if (title?.trim()) params.title = title.trim();
  if (month) {
    const m = parseInt(month, 10);
    if (!isNaN(m) && m >= 1 && m <= 12) params.month = m;
  }
  if (type === "NACIONAL" || type === "INTERNACIONAL") params.type = type as PackageType;
  return params;
}

export function PublicPackagesSection({ title, month, type }: PublicPackagesSectionProps) {
  const filters = parseFilters(title, month, type);
  const hasActiveFilters = !!(title?.trim() || month || type);
  const suspenseKey = `${title ?? ""}-${month ?? ""}-${type ?? ""}`;

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
          Buscá tu próximo destino por nombre, mes de salida o tipo de viaje.
        </p>
      </div>

      <PackagesFilter title={title} month={month} type={type} />

      <Suspense key={suspenseKey} fallback={<PackagesSkeleton />}>
        <PackagesResults filters={filters} hasActiveFilters={hasActiveFilters} />
      </Suspense>
    </section>
  );
}
