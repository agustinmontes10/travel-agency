import type { QuoteRecord } from "./service";

/** Estado del editor: los números son strings porque vienen de inputs. */
export interface FlightDraft {
  id: string;
  origin: string;
  destination: string;
  airline: string;
  departDate: string;
  returnDate: string;
  price: string;
}
export interface StayDraft {
  id: string;
  name: string;
  checkIn: string;
  checkOut: string;
  price: string;
}
export interface HotelOptionDraft {
  id: string;
  stays: StayDraft[];
}
export interface LegDraft {
  id: string;
  from: string;
  to: string;
  price: string;
}
export interface TransferOptionDraft {
  id: string;
  legs: LegDraft[];
}
export interface QuoteDraft {
  clientName: string;
  destination: string;
  passengers: string;
  validUntil: string;
  notes: string;
  flights: FlightDraft[];
  hotels: HotelOptionDraft[];
  transfers: TransferOptionDraft[];
  assistanceType: string;
  assistancePrice: string;
  selectedFlightId: string;
  selectedHotelId: string;
  selectedTransferId: string | null;
  commissionPct: string;
}

export const uid = () => Math.random().toString(36).slice(2, 10);

export const newFlight = (): FlightDraft => ({
  id: uid(), origin: "", destination: "", airline: "", departDate: "", returnDate: "", price: "",
});
export const newStay = (): StayDraft => ({ id: uid(), name: "", checkIn: "", checkOut: "", price: "" });
export const newHotelOption = (): HotelOptionDraft => ({ id: uid(), stays: [newStay()] });
export const newLeg = (): LegDraft => ({ id: uid(), from: "", to: "", price: "" });
export const newTransferOption = (): TransferOptionDraft => ({ id: uid(), legs: [newLeg()] });

export function emptyDraft(): QuoteDraft {
  const flight = newFlight();
  const hotel = newHotelOption();
  return {
    clientName: "",
    destination: "",
    passengers: "2",
    validUntil: "",
    notes: "",
    flights: [flight],
    hotels: [hotel],
    transfers: [],
    assistanceType: "",
    assistancePrice: "",
    selectedFlightId: flight.id,
    selectedHotelId: hotel.id,
    selectedTransferId: null,
    commissionPct: "10",
  };
}

export function quoteToDraft(q: QuoteRecord): QuoteDraft {
  const s = (n: number) => String(n);
  return {
    clientName: q.clientName,
    destination: q.destination,
    passengers: s(q.passengers),
    validUntil: q.validUntil ? q.validUntil.toISOString().slice(0, 10) : "",
    notes: q.notes,
    flights: q.flights.map((f) => ({ ...f, price: s(f.price) })),
    hotels: q.hotels.map((h) => ({ ...h, stays: h.stays.map((st) => ({ ...st, price: s(st.price) })) })),
    transfers: q.transfers.map((t) => ({ ...t, legs: t.legs.map((l) => ({ ...l, price: s(l.price) })) })),
    assistanceType: q.assistanceType,
    assistancePrice: q.assistancePrice > 0 ? s(q.assistancePrice) : "",
    selectedFlightId: q.selectedFlightId,
    selectedHotelId: q.selectedHotelId,
    selectedTransferId: q.selectedTransferId,
    commissionPct: s(q.commissionPct),
  };
}
