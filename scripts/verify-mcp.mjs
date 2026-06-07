import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

const endpoint = process.env.MCP_URL;
const token = process.env.MCP_ACCESS_TOKEN;
if (!endpoint || !token || !process.env.DATABASE_URL) {
  throw new Error("MCP_URL, MCP_ACCESS_TOKEN, and DATABASE_URL are required");
}

const transport = new StreamableHTTPClientTransport(new URL(endpoint), {
  requestInit: {
    headers: { Authorization: `Bearer ${token}` },
  },
});
const client = new Client({ name: "deployment-verifier", version: "1.0.0" });
neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

let id;
try {
  await client.connect(transport);
  const created = await client.callTool({
    name: "create_content",
    arguments: {
      kind: "article",
      slug: `mcp-verification-${Date.now()}`,
      title: "MCP verification draft",
      summary: "Temporary content used to verify the production MCP endpoint.",
      body_markdown: "Initial MCP verification body.",
      featured: false,
    },
  });
  id = JSON.parse(created.content[0].text).id;

  await client.callTool({
    name: "update_content",
    arguments: { id, title: "Updated MCP verification draft" },
  });

  const revision = await pool.query(
    `select source, snapshot ->> 'title' as previous_title
     from content_revisions where content_id = $1`,
    [id],
  );
  const row = revision.rows[0];
  if (
    row?.source !== "mcp" ||
    row.previous_title !== "MCP verification draft"
  ) {
    throw new Error("Production MCP revision verification failed");
  }

  console.log("Production MCP create/update and revision verified");
} finally {
  if (id) {
    await pool.query("delete from content where id = $1", [id]);
  }
  await pool.end();
  await client.close();
}
