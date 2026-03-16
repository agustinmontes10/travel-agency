"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreatePackageSchema, UpdatePackageSchema } from "./schemas";
import { createPackage, updatePackage, deletePackage, getPackageById } from "./service";
import { uploadPackageImage, deletePackageImage } from "@/lib/storage";

export async function createPackageAction(formData: FormData) {
  const file = formData.get("image") as File | null;

  if (!file || file.size === 0) {
    throw new Error("La imagen es obligatoria.");
  }

  const imageUrl = await uploadPackageImage(file);

  const parsed = CreatePackageSchema.parse({
    title: formData.get("title"),
    image: imageUrl,
    months: formData.getAll("months"),
    type: formData.get("type"),
  });

  await createPackage(parsed);

  revalidatePath("/");
  revalidatePath("/admin/packages");
  redirect("/admin/packages");
}

export async function updatePackageAction(id: string, formData: FormData) {
  const file = formData.get("image") as File | null;

  let imageUrl: string | undefined;
  if (file && file.size > 0) {
    const existing = await getPackageById(id);
    if (existing?.image) {
      await deletePackageImage(existing.image).catch(() => {});
    }
    imageUrl = await uploadPackageImage(file);
  }

  const monthsRaw = formData.getAll("months");

  const raw: Record<string, unknown> = {
    title: formData.get("title") || undefined,
    type: formData.get("type") || undefined,
    ...(monthsRaw.length > 0 && { months: monthsRaw }),
  };
  if (imageUrl) raw.image = imageUrl;

  const parsed = UpdatePackageSchema.parse(raw);
  await updatePackage(id, parsed);

  revalidatePath("/");
  revalidatePath("/admin/packages");
  redirect("/admin/packages");
}

export async function deletePackageAction(id: string) {
  const existing = await getPackageById(id);
  if (existing?.image) {
    await deletePackageImage(existing.image).catch(() => {});
  }
  await deletePackage(id);

  revalidatePath("/");
  revalidatePath("/admin/packages");
}
