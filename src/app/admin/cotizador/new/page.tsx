import Link from "next/link";
import { QuoteEditor } from "@/features/quotes/components/QuoteEditor";
import { emptyDraft } from "@/features/quotes/draft";

export default function NewQuotePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/cotizador" className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver al cotizador
        </Link>
        <h1 className="mt-2 text-xl font-semibold tracking-tight">Nueva cotización</h1>
      </div>

      <QuoteEditor quoteId={null} initial={emptyDraft()} />
    </div>
  );
}
