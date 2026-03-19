import Link from "next/link";
import { Suspense } from "react";
import { PackagesFilter } from "@/features/packages/components/PackagesFilter";
import { PackagesPageResults } from "@/features/packages/components/PackagesPageResults";
import { PackagesSkeleton } from "@/features/packages/components/PackagesSkeleton";
import type { ListPackagesParams } from "@/features/packages/service";
import type { PackageType } from "@/features/packages/schemas";

interface PaquetesPageProps {
  searchParams?: Promise<{
    title?: string;
    month?: string;
    type?: string;
    page?: string;
  }>;
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

export default async function PaquetesPage({ searchParams }: PaquetesPageProps) {
  const params = await searchParams;
  const title = params?.title;
  const month = params?.month;
  const type = params?.type;
  const page = Math.max(1, parseInt(params?.page ?? "1", 10) || 1);

  const filters = parseFilters(title, month, type);
  const hasActiveFilters = !!(title?.trim() || month || type);

  const filterParams = new URLSearchParams();
  if (title?.trim()) filterParams.set("title", title.trim());
  if (month) filterParams.set("month", month);
  if (type) filterParams.set("type", type);
  const searchParamsString = filterParams.toString();

  const suspenseKey = `${title ?? ""}-${month ?? ""}-${type ?? ""}-${page}`;

  return (
    <main className="flex flex-1 flex-col gap-10 py-8 pb-20">
      {/* Back button */}
      <Link
        href="/#packages"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Volver al inicio
      </Link>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Todos los paquetes</h1>
        <p className="text-muted-foreground">
          Explorá nuestro catálogo completo de destinos y encontrá tu próximo viaje.
        </p>
      </div>

      <PackagesFilter title={title} month={month} type={type} basePath="/paquetes" />

      <Suspense key={suspenseKey} fallback={<PackagesSkeleton count={8} />}>
        <PackagesPageResults
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          page={page}
          searchParamsString={searchParamsString}
        />
      </Suspense>
    </main>
  );
}
