import { readFile } from "node:fs/promises";
import path from "node:path";
import { renderToBuffer } from "@react-pdf/renderer";
import { getQuoteById } from "../service";
import "./fonts";
import { QuotePdf } from "./QuotePdf";

/** De más holgado a más compacto; se usa el primero con el que el PDF entra en una sola página. */
const DENSITIES = [1, 0.9, 0.8, 0.7, 0.62];

/** Cuenta las páginas del PDF (cada una es un objeto "/Type /Page"; "/Type /Pages" es el índice). */
function countPages(pdf: Buffer) {
  return (pdf.toString("latin1").match(/\/Type\s*\/Page(?![s\w])/g) ?? []).length;
}

/**
 * Genera el PDF de un presupuesto guardado. Devuelve null si no existe.
 * Si con el diseño normal ocupa más de una página, lo reintenta cada vez más compacto
 * hasta que entre en una. Si ni así entra, se queda con el diseño normal (varias páginas
 * pero cómodas de leer) en lugar de la versión apretada.
 */
export async function renderQuotePdf(id: string) {
  const quote = await getQuoteById(id);
  if (!quote) return null;

  const logo = await readFile(path.join(process.cwd(), "public", "Logo.png"));

  let normal: Buffer | undefined;
  let fitted: Buffer | undefined;
  for (const density of DENSITIES) {
    const buffer = await renderToBuffer(<QuotePdf quote={quote} logo={logo} density={density} />);
    normal ??= buffer;
    if (countPages(buffer) <= 1) {
      fitted = buffer;
      break;
    }
  }

  return { buffer: (fitted ?? normal) as Buffer, clientName: quote.clientName };
}
