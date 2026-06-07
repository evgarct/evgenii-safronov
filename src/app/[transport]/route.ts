import { timingSafeEqual } from "node:crypto";
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
    const expected = process.env.MCP_ACCESS_TOKEN;
    if (!token || !expected) {
      return undefined;
    }

    const actualBuffer = Buffer.from(token);
    const expectedBuffer = Buffer.from(expected);
    if (
      actualBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(actualBuffer, expectedBuffer)
    ) {
      return undefined;
    }

    return {
      token,
      clientId: "portfolio-owner",
      scopes: ["content:read", "content:write", "content:publish"],
      extra: {
        email: process.env.OWNER_EMAIL ?? "isafronovms@gmail.com",
      },
    };
  },
  {
    required: true,
    requiredScopes: ["content:write"],
  },
);

export { authenticatedHandler as GET, authenticatedHandler as POST };
