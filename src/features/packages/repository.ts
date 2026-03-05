import { db } from '@/lib/db';
import { CreatePackageInput } from './schemas';

export async function create(data: CreatePackageInput) {
  return db.package.create({ data });
}

export async function findAll() {
  return db.package.findMany();
}