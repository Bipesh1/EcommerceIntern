import { dbconfig } from "@/db/initSupabase";
import { categories } from "@/db/schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Categorycard from "@/components/Categorycard";

export const runtime = "nodejs";

export default async function CreateCategoryPage() {
  const { db } = await dbconfig();
  const categorieslist = await db.select().from(categories);

  return (
    <div className="max-w-8xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Categories
      </h1>
      
      {/* Add New Category Button */}
      <div className="flex justify-end mb-4">
        <Link href="/dashboard/categories/create">
          <Button className="bg-gray-900 hover:bg-gray-800 text-white">
            + Add New Category
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categorieslist.map((category) => (
          <Categorycard key={category.id} category={category}/>
        ))}
      </div>
    </div>
  );
}
