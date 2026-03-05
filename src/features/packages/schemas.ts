import { z } from 'zod';

export const CreatePackageSchema = z.object({
  title: z.string().min(3),
  image: z.string().url(),
  startDate: z.coerce.date(),
});

export type CreatePackageInput = z.infer<typeof CreatePackageSchema>;