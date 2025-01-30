"use server";
import { dbconfig } from "@/db/initSupabase";

export async function uploadImageToSupabase(image: File) {
  const { supabase } = await dbconfig();
 console.log("From products")
  // Upload the image to Supabase Storage
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`categories/${image.name}`, image);

  if (error) {
    throw new Error(`Error uploading image: ${error.message}`);
  }

  // Get the public URL of the image
  const imageUrl = supabase.storage.from("images").getPublicUrl(data.path).data.publicUrl;
  console.log("From products1")
  return imageUrl;
}