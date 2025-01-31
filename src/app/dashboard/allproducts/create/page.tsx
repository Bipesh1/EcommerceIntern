import { dbconfig } from "@/db/initSupabase";
import { categories } from "@/db/schema";
import CreateProductForm from "@/components/Createproductform";
import { Suspense } from "react";

export default async function CreateProductPage() {
    const {db}= await dbconfig()
  const allCategories = await db.select().from(categories);

  return (
    <Suspense fallback={<>Loading...</>}>
      <CreateProductForm categories={allCategories} />
    </Suspense>
  );
}