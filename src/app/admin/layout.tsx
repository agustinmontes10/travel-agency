import type { ReactNode } from "react";
import { logoutAction } from "./login/actions";
import { Button } from "@/components/ui";
import { AdminNav } from "./AdminNav";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border-subtle bg-surface px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-sm font-semibold">MT Turismo</span>
              <span className="ml-2 hidden text-xs text-muted-foreground sm:inline">Panel de administración</span>
            </div>
            <AdminNav />
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="ghost" size="sm">
              Cerrar sesión
            </Button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {children}
      </main>
    </div>
  );
}
