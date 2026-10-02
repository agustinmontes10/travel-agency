"use client";

import { formatUSD, hotelOptionCost, nightsBetween } from "../calculations";
import { newHotelOption, newStay, type HotelOptionDraft, type StayDraft } from "../draft";
import { AddButton, AltCard, BedIcon, Field, MoneyInput, SectionCard, SubBlock, TextInput } from "./ui";

interface HotelsSectionProps {
  hotels: HotelOptionDraft[];
  selectedId: string;
  passengers: string;
  errors: Record<string, string>;
  onChange: (hotels: HotelOptionDraft[]) => void;
  onSelect: (id: string) => void;
}

export function HotelsSection({ hotels, selectedId, passengers, errors, onChange, onSelect }: HotelsSectionProps) {
  const patchOption = (id: string, fn: (stays: StayDraft[]) => StayDraft[]) =>
    onChange(hotels.map((h) => (h.id === id ? { ...h, stays: fn(h.stays) } : h)));

  const patchStay = (optionId: string, stayId: string, values: Partial<StayDraft>) =>
    patchOption(optionId, (stays) => stays.map((s) => (s.id === stayId ? { ...s, ...values } : s)));

  return (
    <SectionCard
      step={2}
      icon={<BedIcon />}
      title="Hoteles"
      subtitle="Cada alternativa puede incluir varios hoteles (por ejemplo, 2 ciudades en un mismo viaje)."
      error={errors.hotels ?? errors.selectedHotelId}
    >
      {hotels.map((option, i) => {
        const nights = option.stays.reduce((sum, s) => sum + nightsBetween(s.checkIn, s.checkOut), 0);
        return (
          <AltCard
            key={option.id}
            index={i}
            selected={option.id === selectedId}
            subtotal={hotelOptionCost(option)}
            onSelect={() => onSelect(option.id)}
            onRemove={hotels.length > 1 ? () => onChange(hotels.filter((h) => h.id !== option.id)) : undefined}
          >
            <div className="flex flex-col gap-3">
              {option.stays.map((stay, j) => {
                const err = (field: string) => errors[`hotels.${i}.stays.${j}.${field}`];
                const stayNights = nightsBetween(stay.checkIn, stay.checkOut);
                return (
                  <SubBlock
                    key={stay.id}
                    label={`Hotel ${j + 1}`}
                    onRemove={option.stays.length > 1 ? () => patchOption(option.id, (s) => s.filter((x) => x.id !== stay.id)) : undefined}
                  >
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Field label="Nombre del hotel, ciudad" error={err("name")} className="sm:col-span-2">
                        <TextInput invalid={!!err("name")} value={stay.name} onChange={(e) => patchStay(option.id, stay.id, { name: e.target.value })} placeholder="Hotel Plaza, Madrid" />
                      </Field>
                      <Field label="Precio" error={err("price")}>
                        <MoneyInput invalid={!!err("price")} value={stay.price} onChange={(e) => patchStay(option.id, stay.id, { price: e.target.value })} />
                      </Field>
                      <Field label="Fecha de entrada" error={err("checkIn")}>
                        <TextInput type="date" invalid={!!err("checkIn")} value={stay.checkIn} onChange={(e) => patchStay(option.id, stay.id, { checkIn: e.target.value })} />
                      </Field>
                      <Field label="Fecha de salida" error={err("checkOut")} hint={stayNights > 0 ? `${stayNights} noche${stayNights !== 1 ? "s" : ""}` : undefined}>
                        <TextInput type="date" invalid={!!err("checkOut")} min={stay.checkIn || undefined} value={stay.checkOut} onChange={(e) => patchStay(option.id, stay.id, { checkOut: e.target.value })} />
                      </Field>
                    </div>
                  </SubBlock>
                );
              })}
              {errors[`hotels.${i}.stays`] && <p className="text-xs text-red-600">{errors[`hotels.${i}.stays`]}</p>}

              <div className="flex flex-wrap items-center justify-between gap-2">
                <AddButton tone="soft" onClick={() => patchOption(option.id, (s) => [...s, newStay()])}>
                  Agregar otro hotel
                </AddButton>
                {nights > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {option.stays.length} hotel{option.stays.length !== 1 ? "es" : ""} · {nights} noches
                    {Number(passengers) > 0 && hotelOptionCost(option) > 0 && (
                      <> · {formatUSD(hotelOptionCost(option) / Number(passengers))} por pasajero</>
                    )}
                  </span>
                )}
              </div>
            </div>
          </AltCard>
        );
      })}

      <AddButton
        onClick={() => {
          const created = newHotelOption();
          onChange([...hotels, created]);
          onSelect(created.id);
        }}
      >
        Agregar otra alternativa de hotel
      </AddButton>
    </SectionCard>
  );
}
