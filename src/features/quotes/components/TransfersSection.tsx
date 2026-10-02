"use client";

import { transferOptionCost } from "../calculations";
import { newLeg, newTransferOption, type LegDraft, type TransferOptionDraft } from "../draft";
import { AddButton, AltCard, CarIcon, Field, MoneyInput, SectionCard, SubBlock, TextInput } from "./ui";

interface TransfersSectionProps {
  transfers: TransferOptionDraft[];
  selectedId: string | null;
  errors: Record<string, string>;
  onChange: (transfers: TransferOptionDraft[]) => void;
  onSelect: (id: string | null) => void;
}

export function TransfersSection({ transfers, selectedId, errors, onChange, onSelect }: TransfersSectionProps) {
  const patchOption = (id: string, fn: (legs: LegDraft[]) => LegDraft[]) =>
    onChange(transfers.map((t) => (t.id === id ? { ...t, legs: fn(t.legs) } : t)));

  const patchLeg = (optionId: string, legId: string, values: Partial<LegDraft>) =>
    patchOption(optionId, (legs) => legs.map((l) => (l.id === legId ? { ...l, ...values } : l)));

  return (
    <SectionCard
      step={3}
      icon={<CarIcon />}
      title="Traslados"
      subtitle="Opcional. Cada alternativa puede tener varios tramos (ej.: aeropuerto → hotel y hotel → aeropuerto)."
      error={errors.selectedTransferId}
    >
      {transfers.length === 0 && (
        <p className="rounded-xl bg-surface-muted/60 px-4 py-3 text-sm text-muted-foreground">
          Esta cotización no incluye traslados.
        </p>
      )}

      {transfers.map((option, i) => (
        <AltCard
          key={option.id}
          index={i}
          selected={option.id === selectedId}
          subtotal={transferOptionCost(option)}
          // Tocar la alternativa ya elegida la quita de la cotización (traslados es opcional).
          onSelect={() => onSelect(option.id === selectedId ? null : option.id)}
          onRemove={() => onChange(transfers.filter((t) => t.id !== option.id))}
        >
          <div className="flex flex-col gap-3">
            {option.legs.map((leg, j) => {
              const err = (field: string) => errors[`transfers.${i}.legs.${j}.${field}`];
              return (
                <SubBlock
                  key={leg.id}
                  label={`Traslado ${j + 1}`}
                  onRemove={option.legs.length > 1 ? () => patchOption(option.id, (l) => l.filter((x) => x.id !== leg.id)) : undefined}
                >
                  <div className="grid gap-4 sm:grid-cols-[1fr_1fr_9rem]">
                    <Field label="Lugar 1" error={err("from")}>
                      <TextInput invalid={!!err("from")} value={leg.from} onChange={(e) => patchLeg(option.id, leg.id, { from: e.target.value })} placeholder="Aeropuerto" />
                    </Field>
                    <Field label="Lugar 2" error={err("to")}>
                      <TextInput invalid={!!err("to")} value={leg.to} onChange={(e) => patchLeg(option.id, leg.id, { to: e.target.value })} placeholder="Hotel" />
                    </Field>
                    <Field label="Precio" error={err("price")}>
                      <MoneyInput invalid={!!err("price")} value={leg.price} onChange={(e) => patchLeg(option.id, leg.id, { price: e.target.value })} />
                    </Field>
                  </div>
                </SubBlock>
              );
            })}
            <AddButton tone="soft" onClick={() => patchOption(option.id, (l) => [...l, newLeg()])}>
              Agregar otro traslado
            </AddButton>
          </div>
        </AltCard>
      ))}

      <AddButton
        onClick={() => {
          const created = newTransferOption();
          onChange([...transfers, created]);
          onSelect(created.id);
        }}
      >
        {transfers.length === 0 ? "Agregar traslados" : "Agregar otra alternativa de traslado"}
      </AddButton>
    </SectionCard>
  );
}
