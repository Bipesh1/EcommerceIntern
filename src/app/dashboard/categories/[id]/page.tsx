import { dbconfig } from "@/db/dbconfig";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Productcard from "@/components/Productcard";
export const runtime = "nodejs";

export default async function CategoryProducts({params}: {params: Promise<{ id: string }>}
){

const {id}= await params
const categoryId= Number(id)
const {db}= await dbconfig()
const productsList= await db.select().from(products).where(eq(products.categoryId, categoryId))
console.log(productsList)

return(
<div className="max-w-8xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Products
      </h1>
       {/* Add New Product Button */}
       <div className="flex justify-end mb-4">
        <Link href="/dashboard/allproducts/create">
          <Button className="bg-gray-900 hover:bg-gray-800 text-white">
            + Add New Product
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsList.map((product) => (
          <Productcard key={product.id} product={product}/>
        ))}
      </div>
    </div>
);
}