"use client";

import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { formatUSD, type Totals } from "../calculations";
import { Field } from "./ui";

export interface SummaryLine {
  label: string;
  detail?: string;
  /** null = rubro no incluido */
  amount: number | null;
}

interface SummaryPanelProps {
  clientName: string;
  destination: string;
  lines: SummaryLine[];
  totals: Totals;
  passengers: number;
  commissionPct: string;
  commissionError?: string;
  message?: string;
  saving: boolean;
  isEditing: boolean;
  /** Ruta de descarga del PDF; null mientras el presupuesto no está guardado. */
  pdfHref: string | null;
  /** Hay cambios sin guardar respecto de lo que se cargó. */
  dirty: boolean;
  onCommissionChange: (value: string) => void;
  onSave: () => void;
}

const COMMISSION_PRESETS = [5, 8, 10, 12, 15];

export function SummaryPanel({
  clientName,
  destination,
  lines,
  totals,
  passengers,
  commissionPct,
  commissionError,
  message,
  saving,
  isEditing,
  pdfHref,
  dirty,
  onCommissionChange,
  onSave,
}: SummaryPanelProps) {
  return (
    <aside className="rounded-3xl border border-border-subtle bg-surface p-6 shadow-[0_1px_2px_rgba(19,36,59,0.05),0_32px_64px_-28px_rgba(19,36,59,0.4)]">
      {/* Cabecera tipo ticket */}
      <div className="-m-6 mb-5 rounded-t-3xl bg-navy-deep p-6 text-accent-foreground">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sand">Resumen de cotización</p>
        <p className="mt-2 truncate font-display text-2xl leading-tight tracking-wide">
          {clientName.trim() || "Sin cliente"}
        </p>
        <p className="mt-0.5 truncate text-sm text-accent-foreground/70">
          {destination.trim() || "Destino sin definir"} · {passengers} pasajero{passengers !== 1 ? "s" : ""}
        </p>
      </div>

      <ul className="flex flex-col gap-3 text-sm">
        {lines.map((line) => (
          <li key={line.label} className="flex items-baseline justify-between gap-3">
            <div className="min-w-0">
              <p className="font-medium">{line.label}</p>
              {line.detail && <p className="truncate text-xs text-muted-foreground">{line.detail}</p>}
            </div>
            <span
              className={cn(
                "shrink-0 tabular-nums",
                line.amount === null ? "text-xs text-muted-foreground" : "font-medium",
              )}
            >
              {line.amount === null ? "No incluido" : formatUSD(line.amount)}
            </span>
          </li>
        ))}
      </ul>

      <Perforation />

      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-muted">Precio neto</span>
        <span className="text-lg font-semibold tabular-nums">{formatUSD(totals.net)}</span>
      </div>

      <div className="mt-4">
        <Field label="Porcentaje de comisión" error={commissionError}>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={100}
              step="0.5"
              value={commissionPct}
              aria-invalid={commissionError ? true : undefined}
              onChange={(e) => onCommissionChange(e.target.value)}
              className={cn(
                "h-11 w-full rounded-xl border bg-white pl-3.5 pr-10 text-sm tabular-nums shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                commissionError ? "border-red-400" : "border-border-subtle",
              )}
            />
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
              %
            </span>
          </div>
        </Field>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {COMMISSION_PRESETS.map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => onCommissionChange(String(pct))}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                Number(commissionPct) === pct
                  ? "bg-accent text-accent-foreground"
                  : "bg-accent-soft text-accent hover:bg-accent/15",
              )}
            >
              {pct}%
            </button>
          ))}
        </div>
        <p className="mt-3 flex justify-between text-xs text-muted-foreground">
          <span>Comisión</span>
          <span className="tabular-nums">+ {formatUSD(totals.commission)}</span>
        </p>
      </div>

      <Perforation />

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Precio total</p>
        <p className="mt-1 break-words font-display text-4xl leading-none tracking-wide text-foreground tabular-nums">
          {formatUSD(totals.total)}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          <strong className="font-semibold text-foreground tabular-nums">{formatUSD(totals.perPerson)}</strong> por pasajero
        </p>
      </div>

      {message && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
          {message}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-2">
        <Button size="lg" fullWidth onClick={onSave} disabled={saving}>
          {saving ? "Guardando…" : isEditing ? "Guardar cambios" : "Guardar presupuesto"}
        </Button>
        {pdfHref ? (
          <a
            href={pdfHref}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-border-subtle bg-surface px-5 text-base font-medium tracking-tight text-foreground transition-all duration-200 hover:border-accent/30 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Descargar PDF
          </a>
        ) : (
          <Button size="lg" variant="secondary" fullWidth disabled title="Guardá el presupuesto para poder descargar el PDF">
            Descargar PDF
          </Button>
        )}
        <p className="text-center text-xs text-muted-foreground">
          {!pdfHref
            ? "Guardá el presupuesto para habilitar el PDF."
            : dirty
              ? "Hay cambios sin guardar: el PDF usa la última versión guardada."
              : "El PDF no incluye el neto ni la comisión."}
        </p>
      </div>
    </aside>
  );
}

/** Línea punteada con muescas laterales, como el troquel de un ticket. */
function Perforation() {
  return (
    <div className="relative -mx-6 my-5" aria-hidden>
      <div className="mx-6 border-t-2 border-dashed border-border-subtle" />
      <span className="absolute left-0 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
      <span className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 translate-x-1/2 rounded-full bg-background" />
    </div>
  );
}
