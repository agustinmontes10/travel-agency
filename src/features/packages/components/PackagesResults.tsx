import { listPackages, type ListPackagesParams } from "@/features/packages/service";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { PackagesMobileSwiper } from "./PackagesMobileSwiper";
import { PackagesSwiper } from "./PackagesSwiper";

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

  return (
    <>
      <PackagesSwiper packages={packages} />
      <PackagesMobileSwiper packages={packages} />
    </>
  );
}
