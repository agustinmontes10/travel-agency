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

function buildWhere(params: FindAllParams) {
  const { month, type, title } = params;
  return {
    ...(month && { months: { has: month } }),
    ...(type && { type }),
    ...(title && { title: { contains: title, mode: "insensitive" as const } }),
  };
}

export async function findAll(params: FindAllParams = {}) {
  return db.package.findMany({
    where: buildWhere(params),
    orderBy: { createdAt: "desc" },
  });
}

export async function findPaginated(params: FindAllParams = {}, skip: number, take: number) {
  return db.package.findMany({
    where: buildWhere(params),
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });
}

export async function count(params: FindAllParams = {}) {
  return db.package.count({ where: buildWhere(params) });
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
