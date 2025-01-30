"use server"
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js'
import { createClient } from '@supabase/supabase-js'

export async function dbconfig(){
    const supabaseUrl = process.env.SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const client = postgres(process.env.DATABASE_URL!);
    const db = drizzle({client})
    return {db,supabase}
}