# Global Button Components

## Overview

Create a reusable, globally-available button component system based on the VeGood Design System. This component will serve as the foundation for interactive elements across the application and is designed to support future growth into a comprehensive component library.

**Design Reference:** https://www.figma.com/design/g6BPsdV4WS1xKRC19PgMqk/Design-System?node-id=15-548&m=dev

## Objectives

1. Implement a flexible `Button` component that supports multiple variants and states
2. Create a global components directory (`app/components`) with an index file for easy imports across the app
3. Support optional icon integration using Lucide React icons
4. Implement loading state that displays a spinner and replaces any provided icon
5. Establish a pattern for the growing component library that will include icon buttons and category chips

## Design Specifications

### Typography
- Font: Inter Medium (weight 500)
- Size: 15px
- Line height: 22.5px
- Letter spacing: -0.534px
- Text alignment: centered

### Sizing & Shape
- Padding: 24px horizontal / 12px vertical (`px-6 py-3`)
- Border radius: 14px (custom value, between Tailwind's `rounded-lg` and `rounded-xl`)
- Icon size: 16×16px
- Icon-to-text gap: 8px
- Icon alignment: left of text label

### Shadow
- Shadow token: `shadow-button` = `0 1px 2px rgba(0,0,0,0.05)`
- Applied to: Primary variant only

### Color Variants

#### Primary
- Default: Background `#22C55E`, Text white
- Hover: Background `#16A34A`, Text white
- Active: Background `#15803D`, Text white
- Disabled: Background `#E2E8F0` at 50% opacity, Text `#94A3B8`

#### Secondary
- Default: Background `#F0FDF4`, Text `#15803D`, Border `#BBF7D0`
- Hover: Background `#DCFCE7`, Text `#15803D`, Border `#BBF7D0`
- Active: Background `#BBF7D0`, Text `#15803D`, Border `#86EFAC`
- Disabled: Background `#F8FAFC` at 50% opacity, Text `#94A3B8`, Border `#E2E8F0`

#### Ghost
- Default: Transparent background, Text `#22C55E`
- Hover: Background `#F0FDF4`, Text `#16A34A`
- Active: Background `#DCFCE7`, Text `#15803D`
- Disabled: Transparent background at 50% opacity, Text `#94A3B8`

#### Destructive
- Default: Background `#EF4444`, Text white
- Hover: Background `#DC2626`, Text white
- Active: Background `#B91C1C`, Text white
- Disabled: Background `#FCA5A5` at 50% opacity, Text white

### Disabled State
- Applied via 50% opacity on the entire button
- Should include `pointer-events-none` to prevent interaction
- Cursor: `not-allowed`

### Icon Props
- Optional `iconLeft` prop to accept Lucide React icons (16×16px)
- Icons positioned to the left of the button text
- Gap between icon and text: 8px

### Loading State
- Optional `loading` prop to enable loading spinner
- When enabled, displays a spinner in place of the optional icon
- Button remains disabled during loading to prevent multiple submissions

## Component Structure

The button component will be created in a new global components directory:
- **Location:** `app/components/Button.tsx`
- **Index export:** `app/components/index.ts` for convenient imports across the app
- **Icon library:** Lucide React (already available)

The structure allows for easy expansion to additional components (icon buttons, category chips) in the future.

## Success Criteria

- [ ] Button component accepts `variant` prop with options: `primary`, `secondary`, `ghost`, `destructive`
- [ ] Component supports optional `iconLeft` prop for Lucide React icons
- [ ] Component supports optional `loading` prop that displays a spinner and disables interaction
- [ ] All four color variants render correctly with proper states (default, hover, active, disabled)
- [ ] Button styling matches Figma design precisely (colors, spacing, typography, border-radius)
- [ ] Component is exported from `app/components/index.ts` for global use
- [ ] Disabled state prevents interaction and shows appropriate visual feedback
- [ ] Component is fully typed with TypeScript
