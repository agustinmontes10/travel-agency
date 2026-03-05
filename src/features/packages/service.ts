import * as repo from './repository';
import { CreatePackageInput } from './schemas';

export async function createPackage(data: CreatePackageInput) {
  // lógica de negocio futura
  return repo.create(data);
}

export async function listPackages() {
  return repo.findAll();
}