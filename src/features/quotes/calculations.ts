/** Recargo fijo aplicado al valor de los vuelos. */
export const FLIGHT_PRICE_MULTIPLIER = 1.012;

type Money = number | string | null | undefined;

export function toAmount(value: Money): number {
  const n = typeof value === 'number' ? value : parseFloat(value ?? '');
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export const flightCost = (flight: { price: Money }) =>
  round2(toAmount(flight.price) * FLIGHT_PRICE_MULTIPLIER);

export const hotelOptionCost = (option: { stays: { price: Money }[] }) =>
  round2(option.stays.reduce((sum, s) => sum + toAmount(s.price), 0));

export const transferOptionCost = (option: { legs: { price: Money }[] }) =>
  round2(option.legs.reduce((sum, l) => sum + toAmount(l.price), 0));

export interface TotalsInput {
  flight?: { price: Money } | null;
  hotel?: { stays: { price: Money }[] } | null;
  transfer?: { legs: { price: Money }[] } | null;
  assistancePrice: Money;
  commissionPct: Money;
  passengers: Money;
}

export interface Totals {
  flights: number;
  hotels: number;
  transfers: number;
  assistance: number;
  net: number;
  commission: number;
  total: number;
  perPerson: number;
}

/** total = neto × (1 + comisión %) */
export function computeTotals(input: TotalsInput): Totals {
  const flights = input.flight ? flightCost(input.flight) : 0;
  const hotels = input.hotel ? hotelOptionCost(input.hotel) : 0;
  const transfers = input.transfer ? transferOptionCost(input.transfer) : 0;
  const assistance = round2(toAmount(input.assistancePrice));
  const net = round2(flights + hotels + transfers + assistance);
  const pct = Math.min(100, toAmount(input.commissionPct));
  const commission = round2(net * (pct / 100));
  const total = round2(net + commission);
  const passengers = Math.max(1, Math.floor(toAmount(input.passengers)));
  return { flights, hotels, transfers, assistance, net, commission, total, perPerson: round2(total / passengers) };
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const diff = (Date.parse(checkOut) - Date.parse(checkIn)) / 86_400_000;
  return Number.isFinite(diff) && diff > 0 ? Math.round(diff) : 0;
}

export const formatUSD = (n: number) =>
  `US$ ${new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)}`;

/** Redondea al múltiplo de 5 más cercano (1771,12 → 1770; 1773,8 → 1775). */
export const roundToFive = (n: number) => Math.round(n / 5) * 5;

/** Monto entero, sin centavos (para precios ya redondeados). */
export const formatUSDWhole = (n: number) =>
  `US$ ${new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(n)}`;
