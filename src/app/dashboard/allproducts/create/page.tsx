// app/dashboard/products/create/page.tsx
import { dbconfig } from "@/db/initSupabase";
import { categories } from "@/db/schema";
import CreateProductForm from "@/components/Createproductform";

export default async function CreateProductPage() {
    const {db}= await dbconfig()
  const allCategories = await db.select().from(categories);

  return <CreateProductForm categories={allCategories} />;
}