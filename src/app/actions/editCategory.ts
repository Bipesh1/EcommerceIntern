"use server"
import { dbconfig } from "@/db/dbconfig";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function editCategory(formData:FormData,id:number) {
    const {db}= await dbconfig()
    const name = formData.get("name") as string;
  const image_url = formData.get("image_url") as string;

  await db.update(categories).set({ name, imageUrl:image_url }).where(eq(categories.id,id));
  revalidatePath("/dashboard/categories")
  revalidatePath("/dashboard/allproducts/create")

}