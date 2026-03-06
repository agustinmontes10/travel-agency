import { db } from "@/lib/db";
import type { CreatePackageInput } from "./schemas";

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