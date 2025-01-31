import EditProductForm from '@/components/Editproductform'
import { dbconfig } from '@/db/initSupabase'
import { products} from '@/db/schema'
import { eq } from 'drizzle-orm'
import React from 'react'

export default async function EditProduct({params}:{
    params:{
        id: string
    }
}) {
   
    const productId= Number(params.id)
    const {db}= await dbconfig()
    const [productData]= await db.select().from(products).where(eq(products.id,productId))
    return (
    <EditProductForm product={productData}/>
  )
}
