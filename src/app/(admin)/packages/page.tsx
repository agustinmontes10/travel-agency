import Link from "next/link";
import Image from "next/image";
import { listPackages } from "@/features/packages/service";
import { deletePackageAction } from "@/features/packages/actions";
import { Button } from "@/components/ui";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
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
        <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-soft">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-muted text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground">Imagen</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Título</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Fecha de inicio</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-surface-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="relative h-12 w-20 overflow-hidden rounded-lg">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{pkg.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(pkg.startDate)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/packages/${pkg.id}/edit`}
                        className="inline-flex h-8 items-center justify-center gap-2 rounded-full border border-border-subtle bg-surface px-3 text-xs font-medium tracking-tight transition-colors hover:bg-surface-muted"
                      >
                        Editar
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deletePackageAction(pkg.id);
                        }}
                      >
                        <Button
                          type="submit"
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          Eliminar
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
