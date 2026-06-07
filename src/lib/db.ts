import { neon } from "@neondatabase/serverless";

export const databaseConfigured = Boolean(process.env.DATABASE_URL);

export function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
  }

  return neon(databaseUrl);
}
