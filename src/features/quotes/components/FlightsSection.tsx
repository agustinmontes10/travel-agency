"use client";

import { FLIGHT_PRICE_MULTIPLIER, flightCost, formatUSD, toAmount } from "../calculations";
import { newFlight, type FlightDraft } from "../draft";
import { AddButton, AltCard, Field, MoneyInput, PlaneIcon, SectionCard, TextInput } from "./ui";

interface FlightsSectionProps {
  flights: FlightDraft[];
  selectedId: string;
  errors: Record<string, string>;
  onChange: (flights: FlightDraft[]) => void;
  onSelect: (id: string) => void;
}

export function FlightsSection({ flights, selectedId, errors, onChange, onSelect }: FlightsSectionProps) {
  const patch = (id: string, values: Partial<FlightDraft>) =>
    onChange(flights.map((f) => (f.id === id ? { ...f, ...values } : f)));

  return (
    <SectionCard
      step={1}
      icon={<PlaneIcon />}
      title="Vuelos"
      subtitle={`Al valor ingresado se le aplica un recargo fijo de ×${FLIGHT_PRICE_MULTIPLIER.toLocaleString("es-AR")}.`}
      error={errors.flights ?? errors.selectedFlightId}
    >
      {flights.map((flight, i) => {
        const err = (field: string) => errors[`flights.${i}.${field}`];
        return (
          <AltCard
            key={flight.id}
            index={i}
            selected={flight.id === selectedId}
            subtotal={flightCost(flight)}
            onSelect={() => onSelect(flight.id)}
            onRemove={flights.length > 1 ? () => onChange(flights.filter((f) => f.id !== flight.id)) : undefined}
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Origen">
                <TextInput value={flight.origin} onChange={(e) => patch(flight.id, { origin: e.target.value })} placeholder="Buenos Aires (EZE)" />
              </Field>
              <Field label="Destino">
                <TextInput value={flight.destination} onChange={(e) => patch(flight.id, { destination: e.target.value })} placeholder="Madrid (MAD)" />
              </Field>
              <Field label="Aerolínea">
                <TextInput value={flight.airline} onChange={(e) => patch(flight.id, { airline: e.target.value })} placeholder="Iberia" />
              </Field>
              <Field label="Fecha de vuelo ida" error={err("departDate")}>
                <TextInput type="date" invalid={!!err("departDate")} value={flight.departDate} onChange={(e) => patch(flight.id, { departDate: e.target.value })} />
              </Field>
              <Field label="Fecha de vuelo vuelta" error={err("returnDate")}>
                <TextInput type="date" invalid={!!err("returnDate")} min={flight.departDate || undefined} value={flight.returnDate} onChange={(e) => patch(flight.id, { returnDate: e.target.value })} />
              </Field>
              <Field
                label="Valor del vuelo"
                error={err("price")}
                hint={
                  toAmount(flight.price) > 0 ? (
                    <>
                      Con recargo: <strong className="font-semibold text-foreground">{formatUSD(flightCost(flight))}</strong>
                    </>
                  ) : undefined
                }
              >
                <MoneyInput invalid={!!err("price")} value={flight.price} onChange={(e) => patch(flight.id, { price: e.target.value })} />
              </Field>
            </div>
          </AltCard>
        );
      })}

      <AddButton
        onClick={() => {
          const created = newFlight();
          onChange([...flights, created]);
          onSelect(created.id);
        }}
      >
        Agregar otra alternativa de vuelo
      </AddButton>
    </SectionCard>
  );
}
