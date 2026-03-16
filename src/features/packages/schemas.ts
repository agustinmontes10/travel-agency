import { z } from 'zod';

export const PackageTypeSchema = z.enum(['NACIONAL', 'INTERNACIONAL']);
export type PackageType = z.infer<typeof PackageTypeSchema>;

const monthsSchema = z.array(z.coerce.number().int().min(1).max(12)).min(1, 'Seleccioná al menos un mes');

export const CreatePackageSchema = z.object({
  title: z.string().min(3),
  image: z.string().url(),
  months: monthsSchema,
  type: PackageTypeSchema,
});

export type CreatePackageInput = z.infer<typeof CreatePackageSchema>;

export const UpdatePackageSchema = z.object({
  title: z.string().min(3).optional(),
  image: z.string().url().optional(),
  months: monthsSchema.optional(),
  type: PackageTypeSchema.optional(),
});

export type UpdatePackageInput = z.infer<typeof UpdatePackageSchema>;
