import { NextRequest, NextResponse } from "next/server";
import { listPackages } from "@/features/packages/service";
import type { PackageType } from "@/features/packages/schemas";

// API pública de solo lectura sobre el catálogo de paquetes.
// Pensada para el agente de WhatsApp (n8n) — devuelve exactamente lo mismo
// que ya es visible en /paquetes, nunca paquetes con available:false.
export const dynamic = "force-dynamic";

function parseMonth(value: string | null): number | undefined {
  if (!value) return undefined;
  const m = parseInt(value, 10);
  if (isNaN(m) || m < 1 || m > 12) return undefined;
  return m;
}

function parseType(value: string | null): PackageType | undefined {
  return value === "NACIONAL" || value === "INTERNACIONAL" ? value : undefined;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.trim() || undefined;
  const month = parseMonth(searchParams.get("month"));
  const type = parseType(searchParams.get("type"));
  const limitParam = searchParams.get("limit");
  const limit = limitParam
    ? Math.min(Math.max(parseInt(limitParam, 10) || 20, 1), 50)
    : 20;

  const packages = await listPackages({ title, month, type, available: true });

  return NextResponse.json({
    count: packages.length,
    packages: packages.slice(0, limit).map((pkg) => ({
      id: pkg.id,
      title: pkg.title,
      image: pkg.image,
      type: pkg.type,
      months: pkg.months,
      price: pkg.price,
      currency: pkg.currency,
    })),
  });
}
