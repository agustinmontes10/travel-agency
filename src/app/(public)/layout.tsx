import type { ReactNode } from "react";
import { PageShell } from "@/components/ui";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <PageShell className="max-w-6xl">
      {children}
    </PageShell>
  );
}

