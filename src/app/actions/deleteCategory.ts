// app/actions/deleteProduct.ts
"use server"
import { dbconfig } from "@/db/initSupabase";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createClient } from '@supabase/supabase-js';

export async function deleteCategory(id: number) {
  try {
    const { db,supabase } = await dbconfig();
    
    // First get the product to get the image URL
    const [category] = await db.select()
      .from(categories)
      .where(eq(categories.id, id))
      

    if (!category) {
      throw new Error('Product not found');
    }

    // Initialize Supabase client
    const urlParts = category.imageUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    console.log(filename)
    const bucketName = 'images'; 

    // Delete image from Supabase Storage
    const { error: storageError } = await supabase
      .storage
      .from(bucketName)
      .remove([`categories/${filename}`]);

    if (storageError) {
      console.error('Error deleting image:', storageError);
      throw storageError;
    }

    // Delete product from database
    await db.delete(categories)
      .where(eq(categories.id, id));

    revalidatePath("/dashboard/categories");
    return { success: true };

  } catch (error) {
    console.error('Delete product error:', error);
    throw error;
  }
}