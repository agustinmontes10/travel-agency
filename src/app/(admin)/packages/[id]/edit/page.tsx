import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPackageById } from "@/features/packages/service";
import { updatePackageAction } from "@/features/packages/actions";
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";

interface EditPackagePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPackagePage({ params }: EditPackagePageProps) {
  const { id } = await params;
  const pkg = await getPackageById(id);

  if (!pkg) notFound();

  const startDateValue = pkg.startDate.toISOString().split("T")[0];

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
              <label htmlFor="startDate" className="text-sm font-medium">
                Fecha de inicio <span className="text-red-500">*</span>
              </label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={startDateValue}
                required
              />
            </div>

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
