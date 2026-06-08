# Design System Rules

## Principles

- Content first.
- Accessibility first.
- Mobile first.
- Semantic tokens only in application and simple component code.
- Prefer composition over adding variants.
- Prefer patterns over custom page layouts.

## Tokens

- Author tokens in `tokens/*.json` using `$value`, `$type`, and `$description`.
- Primitive tokens contain raw design decisions and must not be consumed by components.
- Semantic tokens express product meaning: `surface`, `text`, `border`, `action`, `status`, and `navigation`.
- Use CSS variables such as `var(--surface-default)` in CSS and mapped semantic Tailwind utilities in JSX.
- Run `pnpm tokens:build` after token edits.
- Do not add TypeScript token-name exports.

## Themes And Density

- Themes use `data-theme="light|dark|oled"` on the document root.
- OLED default surfaces must remain true black.
- Density uses `data-density="comfortable|compact"`.
- Density changes control dimensions and control spacing, not color or typography.

## Components And Patterns

- Add component tokens only when a complex component owns a coordinated visual contract that semantic tokens cannot express clearly.
- Dialog and Tooltip are the initial component-token examples.
- Keep primitive components small, typed, composable, and compatible with Radix behavior.
- Build recurring page structures in `src/components/patterns`.
- Add Storybook stories for reusable UI, meaningful states, themes, and density behavior.

## Accessibility

- Preserve semantic HTML and keyboard behavior.
- Every interactive element needs a visible focus state sourced from `border.focus`.
- Dialogs require an accessible title.
- Tooltip content supplements, but never replaces, an accessible name.
