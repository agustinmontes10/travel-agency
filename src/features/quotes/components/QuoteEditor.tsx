"use client";

import { useMemo, useState, useTransition } from "react";
import { computeTotals } from "../calculations";
import { saveQuoteAction } from "../actions";
import { QuoteInputSchema, fieldErrors } from "../schemas";
import type { QuoteDraft } from "../draft";
import { FlightsSection } from "./FlightsSection";
import { HotelsSection } from "./HotelsSection";
import { TransfersSection } from "./TransfersSection";
import { AssistanceSection } from "./AssistanceSection";
import { SummaryPanel, type SummaryLine } from "./SummaryPanel";
import { Field, TextInput } from "./ui";

interface QuoteEditorProps {
  /** null = cotización nueva */
  quoteId: string | null;
  initial: QuoteDraft;
}

export function QuoteEditor({ quoteId, initial }: QuoteEditorProps) {
  const [draft, setDraft] = useState<QuoteDraft>(initial);
  const [showErrors, setShowErrors] = useState(false);
  const [serverMessage, setServerMessage] = useState<string>();
  const [saving, startSaving] = useTransition();
  const [initialJson] = useState(() => JSON.stringify(initial));
  const dirty = JSON.stringify(draft) !== initialJson;

  const update = (fn: (d: QuoteDraft) => Partial<QuoteDraft>) => setDraft((d) => ({ ...d, ...fn(d) }));

  // Misma validación que el servidor; una vez intentado guardar, se actualiza en vivo.
  const errors = useMemo(() => {
    if (!showErrors) return {};
    const result = QuoteInputSchema.safeParse(draft);
    return result.success ? {} : fieldErrors(result.error);
  }, [draft, showErrors]);

  const flight = draft.flights.find((f) => f.id === draft.selectedFlightId);
  const hotel = draft.hotels.find((h) => h.id === draft.selectedHotelId);
  const transfer = draft.transfers.find((t) => t.id === draft.selectedTransferId);

  const totals = useMemo(
    () =>
      computeTotals({
        flight,
        hotel,
        transfer,
        assistancePrice: draft.assistancePrice,
        commissionPct: draft.commissionPct,
        passengers: draft.passengers,
      }),
    [flight, hotel, transfer, draft.assistancePrice, draft.commissionPct, draft.passengers],
  );

  const lines: SummaryLine[] = [
    {
      label: "Vuelo",
      detail: flight ? `Alternativa ${draft.flights.indexOf(flight) + 1}` : undefined,
      amount: flight ? totals.flights : null,
    },
    {
      label: "Hoteles",
      detail: hotel
        ? `Alternativa ${draft.hotels.indexOf(hotel) + 1} · ${hotel.stays.length} hotel${hotel.stays.length !== 1 ? "es" : ""}`
        : undefined,
      amount: hotel ? totals.hotels : null,
    },
    {
      label: "Traslados",
      detail: transfer
        ? `Alternativa ${draft.transfers.indexOf(transfer) + 1} · ${transfer.legs.length} tramo${transfer.legs.length !== 1 ? "s" : ""}`
        : undefined,
      amount: transfer ? totals.transfers : null,
    },
    {
      label: "Asistencia",
      detail: draft.assistanceType.trim() || undefined,
      amount: totals.assistance > 0 ? totals.assistance : null,
    },
  ];

  const handleSave = () => {
    setServerMessage(undefined);
    setShowErrors(true);

    const local = QuoteInputSchema.safeParse(draft);
    if (!local.success) {
      setServerMessage("Revisá los campos marcados antes de guardar.");
      requestAnimationFrame(() =>
        document.querySelector('[aria-invalid="true"]')?.scrollIntoView({ behavior: "smooth", block: "center" }),
      );
      return;
    }

    startSaving(async () => {
      try {
        // En éxito el servidor redirige al listado y esta promesa no vuelve.
        const result = await saveQuoteAction(quoteId, draft);
        if (result && !result.ok) setServerMessage(result.message);
      } catch {
        setServerMessage("No se pudo guardar. Intentá de nuevo.");
      }
    });
  };

  const passengers = Math.max(1, Math.floor(Number(draft.passengers)) || 1);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="flex min-w-0 flex-col gap-6">
        <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-[0_1px_2px_rgba(19,36,59,0.04),0_24px_48px_-32px_rgba(19,36,59,0.28)] sm:p-7">
          <h2 className="font-display text-xl tracking-wide">Datos del presupuesto</h2>
          <p className="mb-5 mt-0.5 text-sm text-muted-foreground">Quién viaja, a dónde y cuántos son.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Cliente" error={errors.clientName}>
              <TextInput
                invalid={!!errors.clientName}
                value={draft.clientName}
                onChange={(e) => update(() => ({ clientName: e.target.value }))}
                placeholder="Nombre y apellido"
              />
            </Field>
            <Field label="Destino">
              <TextInput
                value={draft.destination}
                onChange={(e) => update(() => ({ destination: e.target.value }))}
                placeholder="Madrid y Barcelona"
              />
            </Field>
            <Field label="Cantidad de pasajeros" error={errors.passengers} hint="Se usa para calcular el valor por persona.">
              <TextInput
                type="number"
                min={1}
                max={99}
                invalid={!!errors.passengers}
                value={draft.passengers}
                onChange={(e) => update(() => ({ passengers: e.target.value }))}
              />
            </Field>
            <Field label="Válido hasta" error={errors.validUntil}>
              <TextInput
                type="date"
                value={draft.validUntil}
                onChange={(e) => update(() => ({ validUntil: e.target.value }))}
              />
            </Field>
            <Field label="Notas" className="sm:col-span-2">
              <textarea
                rows={3}
                value={draft.notes}
                onChange={(e) => update(() => ({ notes: e.target.value }))}
                placeholder="Condiciones, observaciones para el cliente…"
                className="rounded-xl border border-border-subtle bg-white px-3.5 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              />
            </Field>
          </div>
        </section>

        <FlightsSection
          flights={draft.flights}
          selectedId={draft.selectedFlightId}
          errors={errors}
          onChange={(flights) =>
            update((d) => ({
              flights,
              selectedFlightId: flights.some((f) => f.id === d.selectedFlightId) ? d.selectedFlightId : (flights[0]?.id ?? ""),
            }))
          }
          onSelect={(id) => update(() => ({ selectedFlightId: id }))}
        />

        <HotelsSection
          hotels={draft.hotels}
          selectedId={draft.selectedHotelId}
          passengers={draft.passengers}
          errors={errors}
          onChange={(hotels) =>
            update((d) => ({
              hotels,
              selectedHotelId: hotels.some((h) => h.id === d.selectedHotelId) ? d.selectedHotelId : (hotels[0]?.id ?? ""),
            }))
          }
          onSelect={(id) => update(() => ({ selectedHotelId: id }))}
        />

        <TransfersSection
          transfers={draft.transfers}
          selectedId={draft.selectedTransferId}
          errors={errors}
          onChange={(transfers) =>
            update((d) => ({
              transfers,
              selectedTransferId: transfers.some((t) => t.id === d.selectedTransferId) ? d.selectedTransferId : null,
            }))
          }
          onSelect={(id) => update(() => ({ selectedTransferId: id }))}
        />

        <AssistanceSection
          type={draft.assistanceType}
          price={draft.assistancePrice}
          errors={errors}
          onChange={(values) => update(() => values)}
        />
      </div>

      <div className="lg:sticky lg:top-6">
        <SummaryPanel
          clientName={draft.clientName}
          destination={draft.destination}
          lines={lines}
          totals={totals}
          passengers={passengers}
          commissionPct={draft.commissionPct}
          commissionError={errors.commissionPct}
          message={serverMessage}
          saving={saving}
          isEditing={quoteId !== null}
          pdfHref={quoteId ? `/admin/cotizador/${quoteId}/pdf` : null}
          dirty={dirty}
          onCommissionChange={(value) => update(() => ({ commissionPct: value }))}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
