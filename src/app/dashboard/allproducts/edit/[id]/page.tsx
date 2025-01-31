import EditProductForm from '@/components/Editproductform'
import { dbconfig } from '@/db/dbconfig'
import { products} from '@/db/schema'
import { eq } from 'drizzle-orm'
import React from 'react'


export default async function EditProduct({params}: {params: Promise<{ id: string }>}) {
   
    const { id } = await params;
    const productId= Number(id)
    const {db}= await dbconfig()
    const [productData]= await db.select().from(products).where(eq(products.id,productId))
    return (
    <EditProductForm product={productData}/>
  )
}
