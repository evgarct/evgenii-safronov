export const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

export const ownerEmail =
  process.env.OWNER_EMAIL ?? "isafronovms@gmail.com";
