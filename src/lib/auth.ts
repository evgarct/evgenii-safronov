import { redirect } from "next/navigation";
import { ownerEmail, supabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getOwner() {
  if (!supabaseConfigured) return null;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.email?.toLowerCase() === ownerEmail.toLowerCase() ? user : null;
}

export async function requireOwner() {
  const user = await getOwner();
  if (!user) redirect("/admin/login");
  return user;
}
