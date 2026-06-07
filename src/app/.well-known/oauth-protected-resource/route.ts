import {
  metadataCorsOptionsRequestHandler,
  protectedResourceHandler,
} from "mcp-handler";

const authServer = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://example.supabase.co";
const handler = protectedResourceHandler({ authServerUrls: [authServer] });
const options = metadataCorsOptionsRequestHandler();

export { handler as GET, options as OPTIONS };
