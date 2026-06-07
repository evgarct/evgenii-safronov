import fs from "node:fs/promises";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

const migrationPath = process.argv[2];
if (!migrationPath) {
  throw new Error("Usage: node scripts/apply-neon-migration.mjs <migration.sql>");
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not configured");
}

neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

try {
  const migration = await fs.readFile(migrationPath, "utf8");
  await pool.query(migration);
} finally {
  await pool.end();
}
