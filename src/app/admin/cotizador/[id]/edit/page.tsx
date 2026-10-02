export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuoteById } from "@/features/quotes/service";
import { quoteToDraft } from "@/features/quotes/draft";
import { QuoteEditor } from "@/features/quotes/components/QuoteEditor";

interface EditQuotePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditQuotePage({ params }: EditQuotePageProps) {
  const { id } = await params;
  const quote = await getQuoteById(id);

  if (!quote) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/cotizador" className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver al cotizador
        </Link>
        <h1 className="mt-2 text-xl font-semibold tracking-tight">Editar cotización</h1>
      </div>

      <QuoteEditor quoteId={quote.id} initial={quoteToDraft(quote)} />
    </div>
  );
}
