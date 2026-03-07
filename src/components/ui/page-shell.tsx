import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className="min-h-screen">
      <div
        className={cn(
          "mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 sm:px-6 lg:px-8",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

