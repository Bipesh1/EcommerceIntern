import Editform from '@/components/Editform'
import { dbconfig } from '@/db/initSupabase'
import { categories } from '@/db/schema'
import { eq } from 'drizzle-orm'
import React from 'react'

export default async function Edit({params}:{
    params:{
        id: number
    }
}) {
    const {id}= await params
    const {db}= await dbconfig()
    const [categoryData]= await db.select().from(categories).where(eq(categories.id,id))
    
    return (
    <Editform category={categoryData}/>
  )
}
