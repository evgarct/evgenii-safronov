# Evgenii Safronov

Personal portfolio, resume, blog, and MCP-powered publishing system.

## Stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4 and shadcn/ui
- Supabase Postgres, Auth, and Storage
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

The public site uses demonstration content when Supabase is not configured.
Authentication, admin mutations, and MCP writes require real Supabase
credentials.

## Supabase setup

1. Create a Supabase project.
2. Apply `supabase/migrations/20260607180000_initial_content_system.sql`.
3. Enable GitHub under Authentication > Providers.
4. Add the GitHub OAuth callback shown by Supabase to the GitHub OAuth app.
5. Add `http://localhost:3000/auth/callback` and the production callback URL to
   the Supabase redirect allow list.
6. Copy the project URL, publishable key, and secret key to `.env.local`.

The migration restricts draft content and all mutations to
`isafronovms@gmail.com`. Change both the migration policies and `OWNER_EMAIL`
before applying it if a different owner account should be used.

## MCP

The production endpoint is:

```text
https://your-domain.example/mcp
```

It requires a valid Supabase access token belonging to `OWNER_EMAIL`.
Available tools:

- `create_content`
- `get_content`
- `list_content`
- `update_content`
- `publish_content`
- `unpublish_content`
- `archive_content`
- `upload_asset`

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
