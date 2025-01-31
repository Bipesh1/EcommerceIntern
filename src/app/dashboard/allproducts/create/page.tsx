import { dbconfig } from "@/db/dbconfig";
import { categories } from "@/db/schema";
import CreateProductForm from "@/components/Createproductform";
import { Suspense } from "react";

export const runtime = "nodejs";

export default async function CreateProductPage() {
    const {db}= await dbconfig()
  const allCategories = await db.select().from(categories);

  return (
    <Suspense fallback={<>Loading...</>}>
      <CreateProductForm categories={allCategories} />
    </Suspense>
  );
}
