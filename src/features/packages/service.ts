import * as repo from "./repository";
import type { CreatePackageInput } from "./schemas";

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

const MOCK_PACKAGES: PublicPackage[] = [
  {
    id: "mock-1",
    title: "París y ciudades europeas",
    image: "/Hero1.png",
    startDate: new Date("2026-06-15"),
    createdAt: new Date("2026-03-01"),
  },
  {
    id: "mock-2",
    title: "New York urbano y compras",
    image: "/Hero1.png",
    startDate: new Date("2026-07-10"),
    createdAt: new Date("2026-03-01"),
  },
  {
    id: "mock-3",
    title: "Playas del Caribe all inclusive",
    image: "/Hero1.png",
    startDate: new Date("2026-08-05"),
    createdAt: new Date("2026-03-01"),
  },
];

export async function createPackage(data: CreatePackageInput) {
  return repo.create(data);
}

export async function listPackages(
  params?: ListPackagesParams,
): Promise<PublicPackage[]> {

  //const result = await repo.findAll(params);
  const { startDateFrom } = params || {};

  let result = [...MOCK_PACKAGES];

  if (startDateFrom) {
    result = result.filter((pkg) => pkg.startDate >= startDateFrom);
  }

  result.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  //return result as PublicPackage[];
  return result;
}