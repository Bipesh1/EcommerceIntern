import Editform from '@/components/Editform'
import { dbconfig } from '@/db/initSupabase'
import { categories } from '@/db/schema'
import { eq } from 'drizzle-orm'
import React from 'react'

export default async function Edit({params}:{
    params:{
        id: string
    }
}) {
    const categoryId= Number(params.id)
    const {db}= await dbconfig()
    const [categoryData]= await db.select().from(categories).where(eq(categories.id,categoryId))
    
    return (
    <Editform category={categoryData}/>
  )
}
