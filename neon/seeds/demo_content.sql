insert into content (
  id, kind, slug, title, summary, body_markdown, status, seo_title,
  seo_description, cover_image_url, featured, published_at, created_at, updated_at
)
values
(
  '7d536477-cbe4-4d13-a4a2-d6274cb55a11',
  'article',
  'software-that-explains-itself',
  'Software that explains itself',
  'Notes on building products whose structure, copy, and behavior reduce the need for documentation.',
  'Good software does more than expose functionality. It gives people enough context to form the right mental model.

## Start with the next decision

Every screen should make the next useful decision obvious. That does not mean reducing an interface to a single button. It means establishing hierarchy: what changed, what matters, and what can be done now.

## Treat states as product language

Loading, empty, error, and success states are not implementation debris. They are where a system explains its boundaries. A precise empty state can replace a page of onboarding copy.

## Build the explanation into the system

The strongest documentation is often a well-named action, a useful default, or a preview that makes consequences visible before they are committed.',
  'published',
  'Software that explains itself',
  'Product engineering notes on interfaces, mental models, and useful defaults.',
  null,
  true,
  '2026-05-24T09:00:00.000Z',
  '2026-06-07T12:00:00.000Z',
  '2026-06-07T12:00:00.000Z'
),
(
  '9e0ef3d1-33ef-454e-b789-7d4112a325c7',
  'project',
  'moniq',
  'Moniq',
  'An experimental product focused on calm monitoring, clear signals, and operational decisions.',
  'Moniq explores how monitoring tools can surface the few signals that deserve attention without turning every screen into a dashboard mosaic.',
  'published',
  'Moniq - selected work',
  'A monitoring product experiment by Evgenii Safronov.',
  null,
  true,
  '2026-04-10T09:00:00.000Z',
  '2026-06-07T12:00:00.000Z',
  '2026-06-07T12:00:00.000Z'
),
(
  '4096ed62-2f7a-4878-a585-dbe79c5ab2dd',
  'project',
  'srs-ninja',
  'SRS Ninja',
  'A focused learning system for turning repetition into durable knowledge.',
  'SRS Ninja is a practical study workflow shaped around spaced repetition, review discipline, and low-friction capture.',
  'published',
  'SRS Ninja - selected work',
  'A spaced repetition product by Evgenii Safronov.',
  null,
  false,
  '2026-03-18T09:00:00.000Z',
  '2026-06-07T12:00:00.000Z',
  '2026-06-07T12:00:00.000Z'
),
(
  '86abdd1f-0607-4a8a-aa15-26544c34b8d3',
  'article',
  'mcp-as-an-editorial-interface',
  'MCP as an editorial interface',
  'Why a small, explicit tool surface can be a better publishing interface for an AI-assisted personal site.',
  'A draft exploring typed editorial operations, revision history, and deliberate publishing gates.',
  'draft',
  null,
  null,
  null,
  false,
  null,
  '2026-06-07T12:00:00.000Z',
  '2026-06-07T12:00:00.000Z'
)
on conflict (id) do nothing;
