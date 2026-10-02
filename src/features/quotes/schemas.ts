import { z } from 'zod';

const money = z.coerce
  .number({ error: 'Ingresá un valor' })
  .positive('Ingresá un valor mayor a 0');
const isoDate = z.iso.date('Ingresá una fecha');
const required = (label: string) => z.string().trim().min(1, `${label} es obligatorio`);
const optionalText = z.string().trim().default('');

export const FlightSchema = z
  .object({
    id: z.string().min(1),
    origin: optionalText,
    destination: optionalText,
    airline: optionalText,
    departDate: isoDate,
    returnDate: isoDate,
    price: money,
  })
  .refine((f) => f.returnDate >= f.departDate, {
    path: ['returnDate'],
    message: 'La vuelta no puede ser anterior a la ida',
  });

export const HotelStaySchema = z
  .object({
    id: z.string().min(1),
    name: required('El hotel'),
    checkIn: isoDate,
    checkOut: isoDate,
    price: money,
  })
  .refine((s) => s.checkOut > s.checkIn, {
    path: ['checkOut'],
    message: 'La salida debe ser posterior a la entrada',
  });

export const HotelOptionSchema = z.object({
  id: z.string().min(1),
  stays: z.array(HotelStaySchema).min(1, 'Agregá al menos un hotel'),
});

export const TransferLegSchema = z.object({
  id: z.string().min(1),
  from: required('El origen'),
  to: required('El destino'),
  price: money,
});

export const TransferOptionSchema = z.object({
  id: z.string().min(1),
  legs: z.array(TransferLegSchema).min(1, 'Agregá al menos un traslado'),
});

export const QuoteInputSchema = z
  .object({
    clientName: required('El nombre del cliente'),
    destination: optionalText,
    passengers: z.coerce.number({ error: 'Ingresá la cantidad' }).int().min(1, 'Mínimo 1 pasajero').max(99),
    validUntil: z.union([isoDate, z.literal('')]).default(''),
    notes: optionalText,

    flights: z.array(FlightSchema).min(1, 'Agregá al menos una alternativa de vuelo'),
    hotels: z.array(HotelOptionSchema).min(1, 'Agregá al menos una alternativa de hotel'),
    transfers: z.array(TransferOptionSchema).default([]),

    assistanceType: optionalText,
    assistancePrice: z.coerce.number().min(0).catch(0),

    selectedFlightId: z.string(),
    selectedHotelId: z.string(),
    selectedTransferId: z.string().nullable(),

    commissionPct: z.coerce
      .number({ error: 'Ingresá un porcentaje' })
      .min(0, 'No puede ser negativo')
      .max(100, 'Máximo 100 %'),
  })
  .superRefine((q, ctx) => {
    if (!q.flights.some((f) => f.id === q.selectedFlightId)) {
      ctx.addIssue({ code: 'custom', path: ['selectedFlightId'], message: 'Elegí una alternativa de vuelo' });
    }
    if (!q.hotels.some((h) => h.id === q.selectedHotelId)) {
      ctx.addIssue({ code: 'custom', path: ['selectedHotelId'], message: 'Elegí una alternativa de hotel' });
    }
    if (q.selectedTransferId && !q.transfers.some((t) => t.id === q.selectedTransferId)) {
      ctx.addIssue({ code: 'custom', path: ['selectedTransferId'], message: 'Alternativa de traslado inválida' });
    }
    if (q.assistancePrice > 0 && !q.assistanceType) {
      ctx.addIssue({ code: 'custom', path: ['assistanceType'], message: 'Indicá el tipo de asistencia' });
    }
  });

export type FlightInput = z.output<typeof FlightSchema>;
export type HotelStayInput = z.output<typeof HotelStaySchema>;
export type HotelOptionInput = z.output<typeof HotelOptionSchema>;
export type TransferLegInput = z.output<typeof TransferLegSchema>;
export type TransferOptionInput = z.output<typeof TransferOptionSchema>;
export type QuoteInput = z.output<typeof QuoteInputSchema>;

/** Aplana los issues de Zod a { "flights.0.price": "mensaje" } (primer error por campo). */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.');
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
