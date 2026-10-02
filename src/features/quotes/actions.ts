"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { QuoteInputSchema, fieldErrors } from "./schemas";
import { createQuote, updateQuote, deleteQuote, duplicateQuote } from "./service";

export type SaveQuoteResult = {
  ok: false;
  message: string;
  /** Clave = ruta del campo, ej. "flights.0.price" */
  fieldErrors: Record<string, string>;
};

/** Recibe el borrador del editor (objeto anidado, no FormData), valida con Zod y persiste. */
export async function saveQuoteAction(id: string | null, raw: unknown): Promise<SaveQuoteResult> {
  const parsed = QuoteInputSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Revisá los campos marcados antes de guardar.",
      fieldErrors: fieldErrors(parsed.error),
    };
  }

  if (id) await updateQuote(id, parsed.data);
  else await createQuote(parsed.data);

  revalidatePath("/admin/cotizador");
  redirect("/admin/cotizador");
}

export async function deleteQuoteAction(id: string) {
  await deleteQuote(id);
  revalidatePath("/admin/cotizador");
}

/** Duplica el presupuesto y abre la copia en edición. */
export async function duplicateQuoteAction(id: string) {
  const copy = await duplicateQuote(id);
  if (!copy) return;

  revalidatePath("/admin/cotizador");
  redirect(`/admin/cotizador/${copy.id}/edit`);
}
