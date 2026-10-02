import { readFile } from "node:fs/promises";
import path from "node:path";
import { renderToBuffer } from "@react-pdf/renderer";
import { getQuoteById } from "../service";
import "./fonts";
import { QuotePdf } from "./QuotePdf";

/** Genera el PDF de un presupuesto guardado. Devuelve null si no existe. */
export async function renderQuotePdf(id: string) {
  const quote = await getQuoteById(id);
  if (!quote) return null;

  const logo = await readFile(path.join(process.cwd(), "public", "Logo.png"));
  const buffer = await renderToBuffer(<QuotePdf quote={quote} logo={logo} />);

  return { buffer, clientName: quote.clientName };
}
