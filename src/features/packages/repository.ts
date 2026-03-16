import { db } from "@/lib/db";
import type { CreatePackageInput, UpdatePackageInput } from "./schemas";

export async function create(data: CreatePackageInput) {
  return db.package.create({ data });
}

export interface FindAllParams {
  month?: number;
  type?: 'NACIONAL' | 'INTERNACIONAL';
  title?: string;
}

export async function findAll(params: FindAllParams = {}) {
  const { month, type, title } = params;

  return db.package.findMany({
    where: {
      ...(month && { months: { has: month } }),
      ...(type && { type }),
      ...(title && { title: { contains: title, mode: "insensitive" } }),
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function findById(id: string) {
  return db.package.findUnique({ where: { id } });
}

export async function update(id: string, data: UpdatePackageInput) {
  return db.package.update({ where: { id }, data });
}

export async function remove(id: string) {
  return db.package.delete({ where: { id } });
}
