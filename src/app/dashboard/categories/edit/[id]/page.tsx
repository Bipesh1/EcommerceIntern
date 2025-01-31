import Editform from '@/components/Editform'
import { dbconfig } from '@/db/dbconfig'
import { categories } from '@/db/schema'
import { eq } from 'drizzle-orm'
import React from 'react'



export default async function Edit({params}: {params: Promise<{ id: string }>}) {
    const {id}= await params 
    const categoryId= Number(id)
    const {db}= await dbconfig()
    const [categoryData]= await db.select().from(categories).where(eq(categories.id,categoryId))
    
    return (
    <Editform category={categoryData}/>
  )
}
