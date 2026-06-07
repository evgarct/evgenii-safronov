import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

export function Markdown({ children }: { children: string }) {
  const html = sanitizeHtml(marked.parse(children, { async: false }), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2", "img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height", "loading"],
      a: ["href", "name", "target", "rel"],
      code: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
      }),
      img: sanitizeHtml.simpleTransform("img", {
        loading: "lazy",
      }),
    },
  });

  return (
    <div
      className="prose-editorial"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
