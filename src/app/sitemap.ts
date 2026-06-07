import type { MetadataRoute } from "next";
import { listPublished } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const content = await listPublished();
  const staticRoutes = ["", "/about", "/projects", "/blog"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
  return [
    ...staticRoutes,
    ...content.map((item) => ({
      url: `${base}/${item.kind === "article" ? "blog" : "projects"}/${item.slug}`,
      lastModified: new Date(item.updated_at),
    })),
  ];
}
