import * as repo from "./repository";
import type { CreatePackageInput } from "./schemas";

export async function createPackage(data: CreatePackageInput) {
  return repo.create(data);
}

export interface ListPackagesParams {
  startDateFrom?: Date;
}

export interface PublicPackage {
  id: string;
  title: string;
  image: string;
  startDate: Date;
  createdAt: Date;
}

export async function listPackages(
  params?: ListPackagesParams,
): Promise<PublicPackage[]> {
  const result = await repo.findAll(params);

  return result as PublicPackage[];
}