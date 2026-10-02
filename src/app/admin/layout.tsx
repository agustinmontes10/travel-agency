import Image from "next/image";
import type { ReactNode } from "react";
import { AdminHeader } from "./AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="relative isolate min-h-screen">
      {/* Foto de fondo fija, con un velo ghostwhite encima para que el contenido se lea bien. */}
      <div aria-hidden className="fixed inset-0 -z-10">
        <Image src="/fondoAdmin.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/85 to-background/92" />
      </div>

      <AdminHeader />

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
