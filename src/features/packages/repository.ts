import { db } from "@/lib/db";
import type { CreatePackageInput, UpdatePackageInput } from "./schemas";

export async function create(data: CreatePackageInput) {
  return db.package.create({ data });
}

export interface FindAllParams {
  startDateFrom?: Date;
}

export async function findAll(params: FindAllParams = {}) {
  const { startDateFrom } = params;

  return db.package.findMany({
    where: startDateFrom
      ? {
          startDate: {
            gte: startDateFrom,
          },
        }
      : undefined,
    orderBy: {
      startDate: "asc",
    },
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