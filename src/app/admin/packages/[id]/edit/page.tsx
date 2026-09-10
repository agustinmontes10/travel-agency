import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPackageById } from "@/features/packages/service";
import { updatePackageAction } from "@/features/packages/actions";
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";

const MONTHS = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

interface EditPackagePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPackagePage({ params }: EditPackagePageProps) {
  const { id } = await params;
  const pkg = await getPackageById(id);

  if (!pkg) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    await updatePackageAction(id, formData);
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/packages" className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver a paquetes
        </Link>
        <h1 className="mt-2 text-xl font-semibold tracking-tight">Editar paquete</h1>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Datos del paquete</CardTitle>
          <CardDescription>Modificá los campos que quieras actualizar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleUpdate} encType="multipart/form-data" className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="title" className="text-sm font-medium">
                Título <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                defaultValue={pkg.title}
                required
                minLength={3}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Imagen actual</label>
              <div className="relative h-32 w-48 overflow-hidden rounded-xl border border-border-subtle">
                <Image src={pkg.image} alt={pkg.title} fill sizes="192px" className="object-cover" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="image" className="text-sm font-medium">
                Nueva imagen <span className="text-xs font-normal text-muted-foreground">(opcional)</span>
              </label>
              <Input id="image" name="image" type="file" accept="image/*" className="cursor-pointer" />
              <p className="text-xs text-muted-foreground">Dejá vacío para mantener la imagen actual.</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-sm font-medium">Tipo <span className="text-red-500">*</span></p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="type" value="NACIONAL" defaultChecked={pkg.type === "NACIONAL"} required className="accent-accent" />
                  <span className="text-sm">Nacional</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="type" value="INTERNACIONAL" defaultChecked={pkg.type === "INTERNACIONAL"} className="accent-accent" />
                  <span className="text-sm">Internacional</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Meses de salida <span className="text-red-500">*</span></p>
              <div className="grid grid-cols-3 gap-2">
                {MONTHS.map((m) => (
                  <label key={m.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="months"
                      value={m.value}
                      defaultChecked={pkg.months.includes(m.value)}
                      className="accent-accent"
                    />
                    <span className="text-sm">{m.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-1.5">
                <label htmlFor="price" className="text-sm font-medium">
                  Precio (por persona) <span className="text-xs font-normal text-muted-foreground">(opcional)</span>
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min={1}
                  step={1}
                  defaultValue={pkg.price ?? ""}
                  placeholder="850"
                />
              </div>

              <div className="flex w-32 flex-col gap-1.5">
                <label htmlFor="currency" className="text-sm font-medium">
                  Moneda
                </label>
                <select
                  id="currency"
                  name="currency"
                  defaultValue={pkg.currency ?? ""}
                  className="h-10 rounded-lg border border-border-subtle bg-surface px-3 text-sm"
                >
                  <option value="">Sin definir</option>
                  <option value="USD">USD</option>
                  <option value="ARS">ARS</option>
                </select>
              </div>
            </div>
            <p className="-mt-3 text-xs text-muted-foreground">
              Dejá vacío si el precio ya está en la imagen del paquete.
            </p>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="available" defaultChecked={pkg.available} className="accent-accent" />
              <span className="text-sm font-medium">Disponible (visible en la web)</span>
            </label>

            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" size="md">
                Guardar cambios
              </Button>
              <Link
                href="/admin/packages"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border-subtle bg-surface px-4 text-sm font-medium tracking-tight transition-colors hover:bg-surface-muted"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
