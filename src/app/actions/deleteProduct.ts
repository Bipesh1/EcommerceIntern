// app/actions/deleteProduct.ts
"use server"
import { dbconfig } from "@/db/initSupabase";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


export async function deleteProduct(id: number) {
  try {
    const { db,supabase } = await dbconfig();
    
    // First get the product to get the image URL
    const product = await db.select()
      .from(products)
      .where(eq(products.id, id))
      .then(res => res[0]);

    if (!product) {
      throw new Error('Product not found');
    }

    // Initialize Supabase client
    const urlParts = product.imageUrl.split('/');
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
    await db.delete(products)
      .where(eq(products.id, id));

    revalidatePath("/dashboard/allproducts");
    return { success: true };

  } catch (error) {
    console.error('Delete product error:', error);
    throw error;
  }
}