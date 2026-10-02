export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { listPackages } from "@/features/packages/service";
import { deletePackageAction } from "@/features/packages/actions";
import { Table, TBody, Td, Th, THead, Tr, tableActionClass, tableDangerClass } from "@/components/ui";

const MONTH_NAMES = ["", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function formatMonths(months: number[]) {
  return [...months].sort((a, b) => a - b).map((m) => MONTH_NAMES[m]).join(", ");
}

function formatPrice(price: number | null, currency: string | null) {
  if (price == null || !currency) return "—";
  return `${currency} ${price.toLocaleString("es-AR")}`;
}

export default async function AdminPackagesPage() {
  const packages = await listPackages();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Paquetes</h1>
          <p className="text-sm text-muted-foreground">{packages.length} paquete{packages.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/packages/new"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-accent px-4 text-sm font-medium tracking-tight text-accent-foreground shadow-soft transition-colors hover:bg-accent/90"
        >
          Nuevo paquete
        </Link>
      </div>

      {packages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-subtle bg-surface p-12 text-center">
          <p className="text-sm text-muted-foreground">Todavía no hay paquetes. Creá el primero.</p>
        </div>
      ) : (
        <Table>
          <THead>
            <tr>
              <Th>Imagen</Th>
              <Th>Título</Th>
              <Th>Tipo</Th>
              <Th>Meses</Th>
              <Th>Precio</Th>
              <Th>Estado</Th>
              <Th align="right">Acciones</Th>
            </tr>
          </THead>
          <TBody>
            {packages.map((pkg) => (
              <Tr key={pkg.id}>
                <Td>
                  <div className="relative h-14 w-24 overflow-hidden rounded-xl ring-1 ring-border-subtle">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                </Td>
                <Td className="font-medium">{pkg.title}</Td>
                <Td>
                  <span className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                    pkg.type === "NACIONAL"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-blue-50 text-blue-700"
                  }`}>
                    {pkg.type === "NACIONAL" ? "Nacional" : "Internacional"}
                  </span>
                </Td>
                <Td className="text-muted">{formatMonths(pkg.months)}</Td>
                <Td className="whitespace-nowrap tabular-nums text-muted">{formatPrice(pkg.price, pkg.currency)}</Td>
                <Td>
                  <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                    pkg.available
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${pkg.available ? "bg-emerald-500" : "bg-gray-400"}`} />
                    {pkg.available ? "Disponible" : "Pausado"}
                  </span>
                </Td>
                <Td align="right" className="whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/packages/${pkg.id}/edit`} className={tableActionClass}>
                      Editar
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deletePackageAction(pkg.id);
                      }}
                    >
                      <button type="submit" className={tableDangerClass}>
                        Eliminar
                      </button>
                    </form>
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      )}
    </div>
  );
}
