# Component Patterns

## File Structure (confirmed)

```
app/components/
  <ComponentName>/
    <ComponentName>.tsx   ← named export + default export
    index.ts              ← re-exports everything from the tsx file
```

## Discriminated Union Props (Badge pattern)

Use a discriminated union on `variant` to enforce variant-specific required props at the TypeScript level.
The `label?: never` on the grey variant prevents accidental passing of label text.

```ts
type BadgeProps = GreenBadgeProps | GreyBadgeProps
```

This is cleaner than optional props + runtime guards for small variant sets.

## Next.js Image in Cards

Use `<Image fill>` with a `relative` + fixed-height parent container.
Always supply `sizes` matching the fixed width to avoid oversized image downloads.

```tsx
<div className="relative h-[200px] w-full overflow-hidden">
  <Image src={src} alt={alt} fill className="object-cover" sizes="283px" />
</div>
```

## SVG Star Rating

Implemented as inline SVG with `<clipPath>` to support partial fill (e.g. 4.6 stars).
Each star gets a unique `id` based on its index to avoid SVG `clipPath` id collisions.

## Absolute-pixel Sizing for Figma-sourced Components

When a component is directly Figma-sourced with precise dimensions (e.g. RecipeCard 282.664×419px),
use the exact values as arbitrary Tailwind classes (`w-[282.664px]`, `h-[419px]`).
Document this in the summary as a deliberate choice — not a gap.

## Inline CSS Var References

In Tailwind v4 `@theme`, CSS vars are available as utility classes automatically.
For one-off values not covered by a utility, use `var(--token-name)` inside bracket notation:
`bg-[var(--color-background)]`, `rounded-[var(--radius-xl)]`, `shadow-[var(--shadow-card-md)]`.
