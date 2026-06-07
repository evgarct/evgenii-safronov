import { listPublished } from "@/lib/content";

function escapeXml(value: string) {
  return value.replace(
    /[<>&'"]/g,
    (char) =>
      ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[
        char
      ]!,
  );
}

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const articles = await listPublished("article");
  const items = articles
    .map(
      (article) => `<item>
  <title>${escapeXml(article.title)}</title>
  <link>${base}/blog/${article.slug}</link>
  <guid>${base}/blog/${article.slug}</guid>
  <description>${escapeXml(article.summary)}</description>
  <pubDate>${new Date(article.published_at ?? article.created_at).toUTCString()}</pubDate>
</item>`,
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>Evgenii Safronov — Field notes</title>
<link>${base}/blog</link>
<description>Notes on product engineering, systems, and AI tooling.</description>
${items}
</channel></rss>`,
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
}
