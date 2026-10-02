export const dynamic = "force-dynamic";

import Link from "next/link";
import { listQuotes } from "@/features/quotes/service";
import { deleteQuoteAction, duplicateQuoteAction } from "@/features/quotes/actions";
import { formatUSD } from "@/features/quotes/calculations";
import { Table, TBody, Td, Th, THead, Tr, tableActionClass, tableDangerClass } from "@/components/ui";

const dateFormat = new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

export default async function AdminQuotesPage() {
  const quotes = await listQuotes();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Cotizador</h1>
          <p className="text-sm text-muted-foreground">
            {quotes.length} presupuesto{quotes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/cotizador/new"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-accent px-4 text-sm font-medium tracking-tight text-accent-foreground shadow-soft transition-colors hover:bg-accent/90"
        >
          Nueva cotización
        </Link>
      </div>

      {quotes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-subtle bg-surface p-12 text-center">
          <p className="text-sm text-muted-foreground">Todavía no hay presupuestos. Armá el primero.</p>
        </div>
      ) : (
        <Table>
          <THead>
            <tr>
              <Th>Cliente</Th>
              <Th>Destino</Th>
              <Th align="right">Pasajeros</Th>
              <Th align="right">Neto</Th>
              <Th align="right">Comisión</Th>
              <Th align="right">Total</Th>
              <Th align="right">Acciones</Th>
            </tr>
          </THead>
          <TBody>
            {quotes.map((quote) => (
              <Tr key={quote.id}>
                <Td>
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold uppercase text-accent"
                    >
                      {quote.clientName.trim().charAt(0) || "?"}
                    </span>
                    <div>
                      <p className="font-medium">{quote.clientName}</p>
                      <p className="text-xs text-muted-foreground">{dateFormat.format(quote.createdAt)}</p>
                    </div>
                  </div>
                </Td>
                <Td className="text-muted">{quote.destination || "—"}</Td>
                <Td align="right" className="tabular-nums text-muted">{quote.passengers}</Td>
                <Td align="right" className="tabular-nums text-muted">{formatUSD(quote.netTotal)}</Td>
                <Td align="right" className="tabular-nums text-muted">{quote.commissionPct}%</Td>
                <Td align="right" className="whitespace-nowrap font-semibold tabular-nums text-accent">
                  {formatUSD(quote.total)}
                </Td>
                <Td align="right" className="whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/cotizador/${quote.id}/edit`} className={tableActionClass}>
                      Abrir
                    </Link>
                    {/* <a> y no <Link>: es una descarga, no una navegación del router */}
                    <a href={`/admin/cotizador/${quote.id}/pdf`} className={tableActionClass}>
                      PDF
                    </a>
                    <form
                      action={async () => {
                        "use server";
                        await duplicateQuoteAction(quote.id);
                      }}
                    >
                      <button type="submit" className={tableActionClass}>
                        Duplicar
                      </button>
                    </form>
                    <form
                      action={async () => {
                        "use server";
                        await deleteQuoteAction(quote.id);
                      }}
                    >
                      <button type="submit" className={tableDangerClass}>
                        Eliminar
                      </button>
                    </form>
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      )}
    </div>
  );
}
