"use server";

import { redirect } from "next/navigation";
import { revalidateContent } from "@/lib/cache";
import { requireOwner } from "@/lib/auth";
import { setContentStatus } from "@/lib/content";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/lib/content-types";

export async function changeStatus(formData: FormData) {
  await requireOwner();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as ContentStatus;
  if (!["draft", "published", "archived"].includes(status)) {
    throw new Error("Invalid content status");
  }
  const item = await setContentStatus(id, status, "admin");
  revalidateContent(item);
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
