import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not configured");
}

neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const slug = `verification-${Date.now()}`;

try {
  const inserted = await pool.query(
    `insert into content (
      kind, slug, title, summary, body_markdown, status
    ) values (
      'article', $1, 'Verification draft',
      'Temporary content used to verify Neon persistence.',
      'Initial body', 'draft'
    ) returning id`,
    [slug],
  );
  const id = inserted.rows[0].id;

  const client = await pool.connect();
  try {
    await client.query("begin");
    await client.query(
      "select set_config('app.revision_source', 'mcp', true)",
    );
    await client.query(
      "update content set title = 'Updated verification draft' where id = $1",
      [id],
    );
    await client.query("commit");
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }

  const revision = await pool.query(
    `select source, snapshot ->> 'title' as previous_title
     from content_revisions where content_id = $1`,
    [id],
  );
  const row = revision.rows[0];
  if (row?.source !== "mcp" || row.previous_title !== "Verification draft") {
    throw new Error("Revision trigger verification failed");
  }

  await pool.query("delete from content where id = $1", [id]);
  console.log("Neon CRUD and revision trigger verified");
} finally {
  await pool.end();
}
