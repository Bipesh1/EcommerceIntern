"use server"
import { dbconfig } from "@/db/dbconfig";
import { categories } from "@/db/schema";

export async function createCategory(formData:FormData) {
    const {db}= await dbconfig()
    const name = formData.get("name") as string;
  const image_url = formData.get("image_url") as string;

  await db.insert(categories).values({ name, imageUrl:image_url });

}