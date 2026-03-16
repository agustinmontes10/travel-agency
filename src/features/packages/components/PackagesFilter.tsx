"use client";

import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";
import { Button } from "@/components/ui";

interface PackagesFilterProps {
  title?: string;
  month?: string;
  type?: string;
}

const MONTHS = [
  { value: "1", label: "Enero" },
  { value: "2", label: "Febrero" },
  { value: "3", label: "Marzo" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Mayo" },
  { value: "6", label: "Junio" },
  { value: "7", label: "Julio" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
];

const SearchIcon = () => (
  <svg className="h-4 w-4 text-muted-foreground shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export function PackagesFilter({ title, month, type }: PackagesFilterProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const titleRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const hasActiveFilters = !!(title?.trim() || month || type);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    const t = titleRef.current?.value.trim();
    const m = monthRef.current?.value;
    const ty = typeRef.current?.value;
    if (t) params.set("title", t);
    if (m) params.set("month", m);
    if (ty) params.set("type", ty);
    const query = params.toString();
    startTransition(() => {
      router.push(`/${query ? `?${query}` : ""}#packages`, { scroll: false });
    });
  }

  function handleClear() {
    startTransition(() => {
      router.push("/#packages", { scroll: false });
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl">
      <div className="flex flex-col gap-2 rounded-2xl border border-border-subtle bg-surface p-2 shadow-soft sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-border-subtle sm:rounded-full sm:p-1.5">

        {/* Campo: título */}
        <div className="flex flex-1 items-center gap-2 px-3 py-1.5 sm:px-4">
          <SearchIcon />
          <div className="flex flex-1 flex-col">
            <label htmlFor="title" className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Destino
            </label>
            <input
              ref={titleRef}
              id="title"
              name="title"
              type="text"
              defaultValue={title}
              placeholder="Ej: París, Caribe…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        {/* Campo: mes */}
        <div className="flex flex-1 items-center gap-2 px-3 py-1.5 sm:px-4">
          <div className="flex flex-1 flex-col">
            <label htmlFor="month" className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Mes de salida
            </label>
            <select
              ref={monthRef}
              id="month"
              name="month"
              defaultValue={month ?? ""}
              className="w-full bg-transparent text-sm outline-none text-foreground"
            >
              <option value="">Todos los meses</option>
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Campo: tipo */}
        <div className="flex flex-1 items-center gap-2 px-3 py-1.5 sm:px-4">
          <div className="flex flex-1 flex-col">
            <label htmlFor="type" className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Tipo
            </label>
            <select
              ref={typeRef}
              id="type"
              name="type"
              defaultValue={type ?? ""}
              className="w-full bg-transparent text-sm outline-none text-foreground"
            >
              <option value="">Nacional e Internacional</option>
              <option value="NACIONAL">Nacional</option>
              <option value="INTERNACIONAL">Internacional</option>
            </select>
          </div>
        </div>

        {/* Botón */}
        <div className="flex items-center gap-2 px-1.5 sm:pl-3">
          <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto sm:px-6 flex items-center gap-2" disabled={isPending}>
            {isPending && (
              <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
              </svg>
            )}
            {isPending ? "Buscando…" : "Buscar"}
          </Button>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClear}
              className="whitespace-nowrap text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
