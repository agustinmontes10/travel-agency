import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Contenedor redondeado con scroll horizontal; el encabezado azul respeta las esquinas. */
export function Table({ className, children, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-soft">
      <div className="overflow-x-auto">
        <table className={cn("w-full border-collapse text-sm", className)} {...props}>
          {children}
        </table>
      </div>
    </div>
  );
}

export function THead({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("bg-accent text-background", className)} {...props} />;
}

export function TBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("divide-y divide-border-subtle", className)} {...props} />;
}

export function Tr({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("transition-colors hover:bg-accent-soft", className)} {...props} />;
}

type Align = "left" | "right";
const alignClass: Record<Align, string> = { left: "text-left", right: "text-right" };

export function Th({
  align = "left",
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & { align?: Align }) {
  return (
    <th
      className={cn(
        "whitespace-nowrap px-5 py-3.5 text-xs font-semibold uppercase tracking-wider",
        alignClass[align],
        className,
      )}
      {...props}
    />
  );
}

export function Td({
  align = "left",
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & { align?: Align }) {
  return <td className={cn("px-5 py-4 align-middle", alignClass[align], className)} {...props} />;
}

/** Acción secundaria dentro de una fila (sirve para <a>, <Link> y <button>). */
export const tableActionClass =
  "inline-flex h-8 items-center justify-center rounded-full border border-border-subtle bg-surface px-3.5 text-xs font-medium tracking-tight text-foreground transition-colors hover:border-accent/30 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

/** Acción destructiva dentro de una fila. */
export const tableDangerClass =
  "inline-flex h-8 items-center justify-center rounded-full px-3.5 text-xs font-medium tracking-tight text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400";
