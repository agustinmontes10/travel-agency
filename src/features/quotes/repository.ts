import { db } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";

export type QuoteWriteData = Omit<Prisma.QuoteUncheckedCreateInput, "id" | "createdAt" | "updatedAt">;

export async function create(data: QuoteWriteData) {
  return db.quote.create({ data });
}

export async function update(id: string, data: QuoteWriteData) {
  return db.quote.update({ where: { id }, data });
}

export async function findById(id: string) {
  return db.quote.findUnique({ where: { id } });
}

export async function findAll() {
  return db.quote.findMany({ orderBy: { createdAt: "desc" } });
}

export async function remove(id: string) {
  return db.quote.delete({ where: { id } });
}
