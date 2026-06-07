import { redirect } from "next/navigation";
import { auth } from "@/auth";

const ownerEmail = (
  process.env.OWNER_EMAIL ?? "isafronovms@gmail.com"
).toLowerCase();

export async function getOwner() {
  const session = await auth();
  return session?.user?.email?.toLowerCase() === ownerEmail
    ? session.user
    : null;
}

export async function requireOwner() {
  const user = await getOwner();
  if (!user) redirect("/admin/login");
  return user;
}
