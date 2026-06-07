import { revalidatePath, updateTag } from "next/cache";
import type { ContentItem } from "@/lib/content-types";

export function revalidateContent(item: ContentItem) {
  updateTag("content");
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/projects");
  revalidatePath("/feed.xml");
  revalidatePath(`/${item.kind === "article" ? "blog" : "projects"}/${item.slug}`);
}
