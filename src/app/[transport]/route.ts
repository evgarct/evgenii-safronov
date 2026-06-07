import { createClient } from "@supabase/supabase-js";
import {
  createMcpHandler,
  withMcpAuth,
} from "mcp-handler";
import { z } from "zod";
import { revalidateContent } from "@/lib/cache";
import {
  createContent,
  getContentById,
  listAllContent,
  setContentStatus,
  updateContent,
} from "@/lib/content";
import {
  contentInputSchema,
  contentStatuses,
  contentUpdateSchema,
} from "@/lib/content-types";
import { ownerEmail } from "@/lib/supabase/config";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

function text(value: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
  };
}

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "create_content",
      {
        title: "Create content draft",
        description: "Create an article, project, or page as a draft.",
        inputSchema: contentInputSchema.shape,
      },
      async (input) => text(await createContent(contentInputSchema.parse(input))),
    );

    server.registerTool(
      "get_content",
      {
        title: "Get content",
        description: "Get one content item by UUID, including drafts.",
        inputSchema: { id: z.string().uuid() },
      },
      async ({ id }) => text(await getContentById(id)),
    );

    server.registerTool(
      "list_content",
      {
        title: "List content",
        description: "List content, optionally filtered by editorial status.",
        inputSchema: { status: z.enum(contentStatuses).optional() },
      },
      async ({ status }) => text(await listAllContent(status)),
    );

    server.registerTool(
      "update_content",
      {
        title: "Update content",
        description: "Update fields and preserve the previous version as a revision.",
        inputSchema: contentUpdateSchema.shape,
      },
      async (input) => {
        const parsed = contentUpdateSchema.parse(input);
        const { id, ...patch } = parsed;
        return text(await updateContent(id, patch, "mcp"));
      },
    );

    for (const [name, status, description] of [
      ["publish_content", "published", "Publish content immediately."],
      ["unpublish_content", "draft", "Return published content to draft."],
      ["archive_content", "archived", "Archive content."],
    ] as const) {
      server.registerTool(
        name,
        {
          title: name.replaceAll("_", " "),
          description,
          inputSchema: { id: z.string().uuid() },
        },
        async ({ id }) => {
          const item = await setContentStatus(id, status, "mcp");
          revalidateContent(item);
          return text(item);
        },
      );
    }

    server.registerTool(
      "upload_asset",
      {
        title: "Upload editorial asset",
        description: "Upload a base64-encoded image to the public content-assets bucket.",
        inputSchema: {
          filename: z.string().min(1).max(180),
          mime_type: z.string().regex(/^image\//),
          base64_data: z.string().min(1),
        },
      },
      async ({ filename, mime_type, base64_data }) => {
        const supabase = createSupabaseAdminClient();
        const path = `${new Date().getUTCFullYear()}/${crypto.randomUUID()}-${filename}`;
        const body = Buffer.from(base64_data, "base64");
        const { error } = await supabase.storage
          .from("content-assets")
          .upload(path, body, { contentType: mime_type, upsert: false });
        if (error) throw error;
        const { data } = supabase.storage.from("content-assets").getPublicUrl(path);
        return text({ path, url: data.publicUrl });
      },
    );
  },
  {
    serverInfo: { name: "evgenii-safronov-editor", version: "1.0.0" },
  },
  {
    basePath: "/",
    disableSse: true,
    maxDuration: 60,
  },
);

const authenticatedHandler = withMcpAuth(
  handler,
  async (_request, token) => {
    if (
      !token ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ) {
      return undefined;
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (error || user?.email?.toLowerCase() !== ownerEmail.toLowerCase()) {
      return undefined;
    }

    return {
      token,
      clientId: user.id,
      scopes: ["content:read", "content:write", "content:publish"],
      extra: { email: user.email },
    };
  },
  {
    required: true,
    requiredScopes: ["content:write"],
  },
);

export { authenticatedHandler as GET, authenticatedHandler as POST };
