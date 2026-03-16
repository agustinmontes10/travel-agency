import Link from "next/link";
import { createPackageAction } from "@/features/packages/actions";
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

export default function NewPackagePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/packages" className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver a paquetes
        </Link>
        <h1 className="mt-2 text-xl font-semibold tracking-tight">Nuevo paquete</h1>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Datos del paquete</CardTitle>
          <CardDescription>Completá los campos para crear un nuevo paquete de viaje.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createPackageAction} encType="multipart/form-data" className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="title" className="text-sm font-medium">
                Título <span className="text-red-500">*</span>
              </label>
              <Input id="title" name="title" type="text" placeholder="París y ciudades europeas" required minLength={3} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="image" className="text-sm font-medium">
                Imagen <span className="text-red-500">*</span>
              </label>
              <Input id="image" name="image" type="file" accept="image/*" required className="cursor-pointer" />
              <p className="text-xs text-muted-foreground">JPG, PNG o WebP. Recomendado: 800×600px.</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-sm font-medium">Tipo <span className="text-red-500">*</span></p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="type" value="NACIONAL" required className="accent-accent" />
                  <span className="text-sm">Nacional</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="type" value="INTERNACIONAL" className="accent-accent" />
                  <span className="text-sm">Internacional</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Meses de salida <span className="text-red-500">*</span></p>
              <div className="grid grid-cols-3 gap-2">
                {MONTHS.map((m) => (
                  <label key={m.value} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="months" value={m.value} className="accent-accent" />
                    <span className="text-sm">{m.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" size="md">
                Crear paquete
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
