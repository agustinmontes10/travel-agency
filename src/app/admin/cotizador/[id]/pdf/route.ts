import { renderQuotePdf } from "@/features/quotes/pdf/render";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/** Protegida por middleware.ts (matcher /admin/:path*). */
export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const pdf = await renderQuotePdf(id);

  if (!pdf) return new Response("Presupuesto no encontrado", { status: 404 });

  const slug = pdf.clientName
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  return new Response(new Uint8Array(pdf.buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="presupuesto-${slug || "cliente"}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
