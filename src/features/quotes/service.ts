import * as repo from "./repository";
import { computeTotals } from "./calculations";
import type {
  QuoteInput,
  FlightInput,
  HotelOptionInput,
  TransferOptionInput,
} from "./schemas";

function toWriteData(input: QuoteInput): repo.QuoteWriteData {
  const totals = computeTotals({
    flight: input.flights.find((f) => f.id === input.selectedFlightId),
    hotel: input.hotels.find((h) => h.id === input.selectedHotelId),
    transfer: input.transfers.find((t) => t.id === input.selectedTransferId),
    assistancePrice: input.assistancePrice,
    commissionPct: input.commissionPct,
    passengers: input.passengers,
  });

  return {
    clientName: input.clientName,
    destination: input.destination,
    passengers: input.passengers,
    validUntil: input.validUntil ? new Date(`${input.validUntil}T00:00:00.000Z`) : null,
    notes: input.notes,
    flights: input.flights,
    hotels: input.hotels,
    transfers: input.transfers,
    assistanceType: input.assistanceType,
    assistancePrice: input.assistancePrice,
    selectedFlightId: input.selectedFlightId,
    selectedHotelId: input.selectedHotelId,
    selectedTransferId: input.selectedTransferId,
    commissionPct: input.commissionPct,
    // El total siempre se recalcula en el servidor, nunca se confía en el cliente.
    netTotal: totals.net,
    total: totals.total,
  };
}

export async function createQuote(input: QuoteInput) {
  return repo.create(toWriteData(input));
}

export async function updateQuote(id: string, input: QuoteInput) {
  return repo.update(id, toWriteData(input));
}

/** Copia un presupuesto tal cual (alternativas, selección y comisión); el nombre del cliente lleva "(copia)". */
export async function duplicateQuote(id: string) {
  const source = await getQuoteById(id);
  if (!source) return null;

  return repo.create({
    clientName: `${source.clientName} (copia)`,
    destination: source.destination,
    passengers: source.passengers,
    validUntil: source.validUntil,
    notes: source.notes,
    flights: source.flights,
    hotels: source.hotels,
    transfers: source.transfers,
    assistanceType: source.assistanceType,
    assistancePrice: source.assistancePrice,
    selectedFlightId: source.selectedFlightId,
    selectedHotelId: source.selectedHotelId,
    selectedTransferId: source.selectedTransferId,
    commissionPct: source.commissionPct,
    netTotal: source.netTotal,
    total: source.total,
  });
}

export async function deleteQuote(id: string) {
  return repo.remove(id);
}

export async function listQuotes() {
  return repo.findAll();
}

/** Quote con los JSON tipados (se escribieron validados con Zod). */
export async function getQuoteById(id: string) {
  const quote = await repo.findById(id);
  if (!quote) return null;
  return {
    ...quote,
    flights: quote.flights as unknown as FlightInput[],
    hotels: quote.hotels as unknown as HotelOptionInput[],
    transfers: quote.transfers as unknown as TransferOptionInput[],
  };
}

export type QuoteRecord = NonNullable<Awaited<ReturnType<typeof getQuoteById>>>;
