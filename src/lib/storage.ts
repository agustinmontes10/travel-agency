import { createSupabaseServiceClient } from "./supabase-server";

const BUCKET = "packages";

export async function uploadPackageImage(file: File): Promise<string> {
  const supabase = createSupabaseServiceClient();

  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(filename, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) throw new Error(`Error al subir imagen: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}

export async function deletePackageImage(imageUrl: string): Promise<void> {
  const supabase = createSupabaseServiceClient();

  const url = new URL(imageUrl);
  const pathParts = url.pathname.split(`/object/public/${BUCKET}/`);
  if (pathParts.length < 2) return;

  const filename = pathParts[1];
  await supabase.storage.from(BUCKET).remove([filename]);
}
