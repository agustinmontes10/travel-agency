import type { ReactNode } from "react";
import { PageShell } from "@/components/ui";
import { PublicNavbar } from "@/features/landing/components/PublicNavbar";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <PublicNavbar />
      <PageShell className="max-w-6xl">
        {children}
      </PageShell>
    </>
  );
}

