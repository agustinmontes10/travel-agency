'use server';

import { revalidatePath } from 'next/cache';
import { CreatePackageSchema } from './schemas';
import { createPackage } from './service';

export async function createPackageAction(formData: FormData) {
  const parsed = CreatePackageSchema.parse({
    title: formData.get('title'),
    image: formData.get('image'),
    startDate: formData.get('startDate'),
  });

  await createPackage(parsed);

  revalidatePath('/packages');
}