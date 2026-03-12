import type { ReactNode } from "react";
import { logoutAction } from "./login/actions";
import { Button } from "@/components/ui";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="border-b border-border-subtle bg-surface px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <span className="text-sm font-semibold">MT Turismo</span>
            <span className="ml-2 text-xs text-muted-foreground">Panel de administración</span>
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="ghost" size="sm">
              Cerrar sesión
            </Button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {children}
      </main>
    </div>
  );
}
