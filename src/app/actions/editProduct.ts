"use server"
import { dbconfig } from "@/db/dbconfig";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function editProduct(formData:FormData,id:number) {
    const {db}= await dbconfig()
    console.log(formData)
    const name = formData.get("name") as string;
      const description = formData.get("description") as string;
      const imageUrl = formData.get("image_url") as string;
      const initialStock = parseInt(formData.get("initial_stock") as string);
      const availableStock = parseInt(formData.get("available_stock") as string);

      
      await db.update(products).set({
        name,
        description,
        imageUrl,
        initialStock,
        availableStock,
      }).where(eq(products.id,id));
    revalidatePath('/dashboard/allproducts')

}