# Design Tokens — Detailed Notes

Source: `app/globals.css` @theme block.

## Confirmed Token → Figma Value Mappings (RecipeCard/Badge session)

| Token | CSS Var | Value | Figma match |
|---|---|---|---|
| `bg-primary-100` | `--color-primary-100` | #DCFCE7 | Green badge bg — exact match |
| `border-primary-200` | `--color-primary-200` | #BBF7D0 | Green badge border — exact match |
| `text-primary-700` | `--color-primary-700` | #15803D | Green badge text — exact match |
| `bg-neutral-50` | `--color-neutral-50` | #F8FAFC | Grey badge bg — exact match |
| `border-neutral-200` | `--color-neutral-200` | #E2E8F0 | Grey badge border — exact match |
| `--color-content-primary` | `--color-content-primary` | #0F172A | Title text — near-miss (Figma: #0a0a0a) |
| `--color-content-secondary` | `--color-content-secondary` | #475569 | Description text — GAP (Figma: #717182) |
| `--color-content-tertiary` | `--color-content-tertiary` | #94A3B8 | Rating text — GAP (Figma: #717182) |
| `--radius-xl` | `--radius-xl` | 16px | Card border radius — exact match |
| `--shadow-card-md` | `--shadow-card-md` | 0 4px 6px... | Card shadow — closest available |
| `--color-border` | `--color-border` | #E2E8F0 | Card border — exact match |

## Gaps / Missing Tokens to Flag

1. **#717182 (muted text)** — Used in Figma for description text and rating label.
   No token exists between `content-secondary` (#475569) and `content-tertiary` (#94A3B8).
   Recommended token: `--color-content-muted: #717182` (maps to a mid-slate value).

2. **#0a0a0a (near-black title)** — Figma uses #0a0a0a; closest token is `content-primary` (#0F172A).
   In practice the difference is negligible at screen resolution, but worth aligning.
   Recommended token: `--color-content-ink: #0a0a0a` if Figma intends a true near-black.

3. **Time chip overlay colors** — `rgba(255,255,255,0.9)` bg, `rgba(255,255,255,0.5)` border.
   No token for semi-transparent white surfaces. Suggest `--color-surface-overlay: rgba(255,255,255,0.9)`.

4. **Overline tracking** — Figma "ALLERGENS" label uses letter-spacing 1.0645px (~0.097em at 11px).
   The `--text-overline--letter-spacing` token is 0.08em (≈ 0.88px at 11px) — close but not exact.
