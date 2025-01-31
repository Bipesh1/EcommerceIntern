"use server";
import { dbconfig } from "@/db/dbconfig";
import { products } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
    const {db}= await dbconfig()
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("image_url") as string;
  const initialStock = parseInt(formData.get("initial_stock") as string);
  const availableStock = parseInt(formData.get("available_stock") as string);
  const categoryId = parseInt(formData.get("category_id") as string);
  await db.insert(products).values({
    name,
    description,
    imageUrl,
    initialStock,
    availableStock,
    categoryId,
  });
  revalidatePath('/dashboard/allproducts')
}