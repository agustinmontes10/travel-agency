import { z } from 'zod';

export const CreatePackageSchema = z.object({
  title: z.string().min(3),
  image: z.string().url(),
  startDate: z.coerce.date(),
});

export type CreatePackageInput = z.infer<typeof CreatePackageSchema>;

export const UpdatePackageSchema = z.object({
  title: z.string().min(3).optional(),
  image: z.string().url().optional(),
  startDate: z.coerce.date().optional(),
});

export type UpdatePackageInput = z.infer<typeof UpdatePackageSchema>;