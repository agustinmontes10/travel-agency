import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input } from "@/components/ui";
import { loginAction } from "./actions";

interface LoginPageProps {
  searchParams?: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const hasError = params?.error === "1";

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/Logo.png" alt="MT Turismo" width={2880} height={713} priority className="mb-5 h-12 w-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">Panel de administración</h1>
          <p className="mt-1 text-sm text-muted">MT Turismo Gonzales Chaves</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>Ingresá tus credenciales para acceder al panel.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={loginAction} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" name="email" type="email" placeholder="admin@tuagencia.com" required />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required />
              </div>

              {hasError && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  Credenciales incorrectas. Intentá de nuevo.
                </p>
              )}

              <Button type="submit" variant="primary" size="md" fullWidth>
                Ingresar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
