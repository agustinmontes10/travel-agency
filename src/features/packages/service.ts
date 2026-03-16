import * as repo from "./repository";
import type { CreatePackageInput, UpdatePackageInput } from "./schemas";
import type { PackageType } from "./schemas";

export interface ListPackagesParams {
  month?: number;
  type?: PackageType;
  title?: string;
}

export interface PublicPackage {
  id: string;
  title: string;
  image: string;
  months: number[];
  type: PackageType;
  createdAt: Date;
}

export async function createPackage(data: CreatePackageInput) {
  return repo.create(data);
}

export async function getPackageById(id: string) {
  return repo.findById(id);
}

export async function updatePackage(id: string, data: UpdatePackageInput) {
  return repo.update(id, data);
}

export async function deletePackage(id: string) {
  return repo.remove(id);
}

export async function listPackages(
  params?: ListPackagesParams,
): Promise<PublicPackage[]> {
  const result = await repo.findAll(params);
  return result as PublicPackage[];
}
