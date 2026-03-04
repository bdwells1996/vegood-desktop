# Storybook Setup & Usage

This project uses **Storybook** to develop, test, and document UI components in isolation.

## Quick Start

### Running Storybook
```bash
npm run storybook
```
This launches Storybook on **http://localhost:6006**

### Building for Production
```bash
npm run build-storybook
```
Generates a static Storybook build in the `storybook-static/` directory.

---

## Project Structure

Stories are organized separately from components for better maintainability:

```
project-root/
├── app/components/          ← Actual React components
│   ├── Button.tsx
│   └── index.ts
│
└── stories/                 ← Storybook stories (separated)
    ├── components/
    │   └── Button.stories.tsx
    ├── Configure.mdx
    ├── Header.stories.ts
    └── Page.stories.ts
```

---

## Creating Stories for New Components

When creating a new component, follow this pattern:

### 1. Create the Component
Place the component in `app/components/YourComponent.tsx`

### 2. Create a Story File
Create a corresponding file in `stories/components/YourComponent.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from '@storybook/test'
import { YourComponent } from '@/app/components'

const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof YourComponent>

export default meta
type Story = StoryObj<typeof meta>

// Create stories for different states/variants
export const Default: Story = {
  args: {
    // your args
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
```

### 3. Use Lucide Icons (if applicable)
Import icons from `lucide-react` and pass them as story args:

```tsx
import { Check, X } from 'lucide-react'

export const WithIcon: Story = {
  args: {
    iconLeft: Check,
  },
}
```

---

## Button Component Stories

The Button component has comprehensive stories covering:

- **Variants**: Primary, Secondary, Ghost, Destructive
- **States**: Default, Disabled, Loading
- **Icons**: With Lucide React icons
- **Types**: Button, Submit, Reset
- **Combinations**: All variants together in various states

View them in Storybook by navigating to: **Components → Button**

---

## Styling in Stories

Storybook automatically includes Tailwind CSS via the global styles imported in `.storybook/preview.ts`. Stories will render with the same design tokens and styling as the app.

---

## Testing with Vitest

Storybook integrates with Vitest for component testing. Run tests with:

```bash
npx vitest
```

Stories automatically become tests that can be run in the IDE or CLI.

---

## Addons Configured

- **@storybook/addon-docs** - Auto-generated documentation from component props
- **@storybook/addon-a11y** - Accessibility testing
- **@storybook/addon-vitest** - Component testing integration
- **@chromatic-com/storybook** - Visual regression testing (optional)

---

## Configuration Files

- **`.storybook/main.ts`** - Storybook configuration, story locations, addons
- **`.storybook/preview.ts`** - Global settings, theme, decorators
- **`vitest.config.ts`** - Testing configuration
- **`.storybook/vitest.setup.ts`** - Vitest setup for Storybook

---

## Tips

1. **Center Components**: Use `layout: 'centered'` in story parameters for better presentation
2. **Mock Functions**: Use `fn()` from `@storybook/test` to track clicks and interactions
3. **Responsive**: Test components at different viewport sizes using Storybook's viewport addon
4. **Documentation**: Add MDX files in `stories/` for extra documentation pages
5. **Dark Mode**: Test dark mode variants by creating separate stories
