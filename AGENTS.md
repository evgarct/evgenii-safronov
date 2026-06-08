# Repository Instructions

- Keep public content reads compatible with the no-Neon demo fallback.
- Treat MCP and admin mutations as owner-only server operations.
- Every content update must preserve the previous row in `content_revisions`.
- Add Storybook stories for meaningful reusable UI and non-happy states.
- After editing design tokens, run `pnpm tokens:build`; never edit generated token CSS directly.
- After changing semantic color pairs, verify representative Storybook stories with the a11y panel in light, dark, and OLED themes.
- Run lint, typecheck, unit tests, Next.js build, and Storybook build before publishing changes.
