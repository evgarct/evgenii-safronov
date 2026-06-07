# Evgenii Safronov

Personal portfolio, resume, blog, and MCP-powered publishing system.

## Stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4 and shadcn/ui
- Neon Postgres and Auth.js
- MCP over Streamable HTTP with `mcp-handler`
- Storybook 10 with `@storybook/nextjs-vite`
- Vitest and Playwright
- Vercel deployment

## Local development

```bash
corepack pnpm install
copy .env.example .env.local
corepack pnpm dev
```

The public site uses demonstration content when Neon is not configured.
Authentication requires GitHub OAuth credentials. Admin and MCP mutations
require Neon and owner credentials.

## Neon setup

1. Create a Neon project with `npx neonctl@latest projects create`.
2. Apply `neon/migrations/20260607190000_initial_content_system.sql`.
3. Optionally run `pnpm db:seed` to import the demonstration content.
4. Copy the pooled connection string to `DATABASE_URL`.
5. Create a GitHub OAuth App with callback
   `https://safronov.dev/api/auth/callback/github` for production. Add
   `http://localhost:3000/api/auth/callback/github` to a separate development
   OAuth App when local sign-in is needed.
6. Set `AUTH_SECRET`, `AUTH_GITHUB_ID`, and `AUTH_GITHUB_SECRET`.
7. Generate a high-entropy `MCP_ACCESS_TOKEN`.

The application restricts admin access to `isafronovms@gmail.com`. Change
`OWNER_EMAIL` if a different owner account should be used.

## MCP

The production endpoint is:

```text
https://safronov.dev/mcp
```

It requires `Authorization: Bearer <MCP_ACCESS_TOKEN>`.
Available tools:

- `create_content`
- `get_content`
- `list_content`
- `update_content`
- `publish_content`
- `unpublish_content`
- `archive_content`
The protected-resource metadata endpoint is
`/.well-known/oauth-protected-resource`.

## Verification

```bash
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
corepack pnpm build-storybook
```
