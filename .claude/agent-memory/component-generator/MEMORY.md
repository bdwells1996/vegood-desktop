# Component Generator — Persistent Memory

See topic files for detail. Key files: `design-tokens.md`, `patterns.md`.

## Quick Reference

- Design tokens: `app/globals.css` — Tailwind v4 `@theme` block
- Components live in: `app/components/<ComponentName>/<ComponentName>.tsx` + `index.ts`
- Font: Inter (`--font-sans: var(--font-inter), system-ui, -apple-system, sans-serif`)
- No `'use client'` unless the component needs event handlers, useState, useEffect, or browser APIs
- Named export + default export in every component file

## Token Naming Conventions

- Colors: `--color-{category}-{scale}` (e.g. `--color-primary-700`, `--color-neutral-50`)
- Spacing: `--spacing-{size}` (xs/sm/md/base/lg/xl/2xl/3xl/4xl/5xl)
- Radius: `--radius-{size}` (sm=6px, md=8px, lg=12px, input=14px, xl=16px, 2xl=20px)
- Shadows: `--shadow-card`, `--shadow-card-md`, `--shadow-card-lg`, `--shadow-button`
- Text sizes: `--text-{scale}` (overline/caption/body/body-lg/h3/h2/h1/display)
- Content (text) colors: `--color-content-primary` (#0F172A), `--color-content-secondary` (#475569), `--color-content-tertiary` (#94A3B8)
- Border: `--color-border` (#E2E8F0), `--color-border-strong` (#CBD5E1)
- Background: `--color-background` (#FFF), `--color-background-secondary` (#F8FAFC)

## Token Gaps Found

- Card text colour in Figma is `#0a0a0a` — closest token is `--color-content-primary` (#0F172A). Flagged as near-miss.
- Description text in Figma is `#717182` — closest token is `--color-content-secondary` (#475569). Flagged as gap (see design-tokens.md).
- Time chip and grey badge use `rgba(255,255,255,0.9)` / `rgba(255,255,255,0.5)` — no token; used inline.
