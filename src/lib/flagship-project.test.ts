import { describe, expect, it } from "vitest";
import type { ContentItem } from "@/lib/content-types";
import {
  flagshipProject,
  flagshipProjectSlug,
  mergeFlagshipProject,
} from "@/lib/flagship-project";

function project(overrides: Partial<ContentItem> = {}): ContentItem {
  return {
    ...flagshipProject,
    id: "a63caeed-d910-48ca-a5c4-9f5fc9e98c7c",
    slug: "another-project",
    title: "Another project",
    published_at: "2026-05-01T09:00:00.000Z",
    ...overrides,
  };
}

describe("mergeFlagshipProject", () => {
  it("adds the flagship project and sorts published projects by date", () => {
    const result = mergeFlagshipProject([project()]);

    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe(flagshipProjectSlug);
    expect(result[1].slug).toBe("another-project");
  });

  it("deduplicates a Supabase row with the flagship slug", () => {
    const result = mergeFlagshipProject([
      project({
        slug: flagshipProjectSlug,
        title: "Database copy",
        published_at: "2026-06-09T09:00:00.000Z",
      }),
    ]);

    expect(result).toEqual([flagshipProject]);
  });

  it("does not remove an article that happens to use the same slug", () => {
    const article = project({
      kind: "article",
      slug: flagshipProjectSlug,
      title: "Related article",
    });

    expect(mergeFlagshipProject([article])).toContain(article);
  });
});
