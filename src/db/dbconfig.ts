import { db } from "@/db/db";
import { supabase } from "@/db/supabase";

export async function dbconfig() {
  return { db, supabase };
}