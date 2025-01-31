"use server";
import { dbconfig } from "@/db/dbconfig";

export async function uploadImageToSupabase(image: File) {
  const { supabase } = await dbconfig();
  // Upload the image to Supabase Storage
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`categories/${image.name}`, image);

  if (error) {
    throw new Error(`Error uploading image: ${error.message}`);
  }

  // Get the public URL of the image
  const imageUrl = supabase.storage.from("images").getPublicUrl(data.path).data.publicUrl;
  return imageUrl;
}