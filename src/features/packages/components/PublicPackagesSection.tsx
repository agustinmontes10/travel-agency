import { Suspense } from "react";
import { PackagesSectionHeader } from "./PackagesSectionHeader";
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
  const params: ListPackagesParams = { available: true };
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
    <section id="packages" className="-mt-16 space-y-8 md:-mt-20 lg:-mt-24">
      <PackagesSectionHeader title={title} month={month} type={type} />

      <Suspense key={suspenseKey} fallback={<PackagesSkeleton count={6} mobileCount={4} />}>
        <PackagesResults filters={filters} hasActiveFilters={hasActiveFilters} />
      </Suspense>
    </section>
  );
}
