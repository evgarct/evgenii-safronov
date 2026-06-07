import { describe, expect, it } from "vitest";
import { contentInputSchema } from "@/lib/content-types";

const validInput = {
  kind: "article" as const,
  slug: "clear-product-systems",
  title: "Clear product systems",
  summary: "A sufficiently descriptive summary for a published article.",
  body_markdown: "# Clear product systems",
};

describe("contentInputSchema", () => {
  it("accepts a valid Markdown content item", () => {
    expect(contentInputSchema.parse(validInput)).toMatchObject(validInput);
  });

  it("rejects slugs that are not kebab-case", () => {
    expect(() =>
      contentInputSchema.parse({ ...validInput, slug: "Not Valid" }),
    ).toThrow();
  });

  it("rejects unsafe non-image asset metadata through the MCP schema boundary", () => {
    expect(contentInputSchema.safeParse({ ...validInput, summary: "short" }).success).toBe(false);
  });
});
