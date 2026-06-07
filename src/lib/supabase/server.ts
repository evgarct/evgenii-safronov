import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Components cannot write cookies. proxy.ts refreshes sessions.
          }
        },
      },
    },
  );
}

export function createSupabaseAdminClient() {
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !secret) {
    throw new Error("Supabase server credentials are not configured");
  }

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
