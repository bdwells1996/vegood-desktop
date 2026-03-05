# Form and Input Components

## Overview

A composable form system consisting of a `<Form>` wrapper component and a set of `<Input>` components that together enable accessible, validated forms with Zod schema integration. Inputs produce semantically correct HTML output for each input type and support all visible interaction states from the design system.

**Figma reference:** https://www.figma.com/design/g6BPsdV4WS1xKRC19PgMqk/Design-System?node-id=25-3887

---

## Goals

- Provide a reusable `<Form>` wrapper that accepts a server action and a Zod validation schema
- Provide an `<Input>` component covering common input types with semantic HTML output
- Ensure full keyboard and screen reader accessibility (WCAG AA)
- Integrate Zod validation errors so error messages surface inline below the relevant field
- Match the design system visual specification exactly

---

## Component Hierarchy

```
<Form action={...} schema={...}>
  <Input name="email" type="email" label="Email address" />
  <Input name="password" type="password" label="Password" />
  <Button type="submit">Submit</Button>
</Form>
```

---

## Components

### `<Form>`

A wrapper that wires up a server action and a Zod validation schema. It renders a native `<form>` element and provides field-level error messages to child inputs via React context.

**Props:**

| Prop | Type | Required | Description |
|---|---|---|---|
| `action` | `(formData: FormData) => Promise<void \| FormState>` | Yes | Server action to call on submit |
| `schema` | `ZodSchema` | Yes | Zod schema used to validate form data and derive field errors |
| `children` | `ReactNode` | Yes | Form fields and submit button |
| `className` | `string` | No | Optional additional classes on the `<form>` element |

**Behaviour:**

- On submit, validates form data against the Zod schema before (or after) calling the server action
- Collects field-level errors from `ZodError.flatten().fieldErrors` and makes them available to child inputs via context
- Passes errors back to named `<Input>` fields automatically — no manual wiring required
- Renders a `<form>` element with `noValidate` to suppress native browser validation in favour of Zod

---

### `<Input>`

A single input field that renders a label, the appropriate HTML input element, optional helper text, and an inline error message. The input type determines the semantic element used.

**Props:**

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `name` | `string` | Yes | — | Field name, used to match Zod errors from the parent `<Form>` |
| `label` | `string` | Yes | — | Visible label rendered in a `<label>` element |
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search' \| 'textarea'` | No | `'text'` | Controls the rendered element and keyboard type |
| `helperText` | `string` | No | — | Descriptive text shown below the input in the default state |
| `size` | `'md' \| 'lg'` | No | `'md'` | Controls height and font size |
| `disabled` | `boolean` | No | `false` | Disables the input |
| `fullWidth` | `boolean` | No | `false` | Forces 100% width even inside a `<Form>` wrapper |
| `className` | `string` | No | — | Additional classes on the outer wrapper |
| `...rest` | `InputHTMLAttributes` | No | — | All native input attributes are forwarded |

**Width behaviour:**

- Standalone (no `<Form>` wrapper): always `w-full`
- Inside `<Form>` wrapper: `w-full md:w-1/2` by default
- Inside `<Form>` wrapper with `fullWidth={true}`: `w-full` (overrides the 50% breakpoint)

**Semantic output by type:**

| `type` prop | Rendered element | Notes |
|---|---|---|
| `text`, `email`, `password`, `number`, `tel`, `url`, `search` | `<input type="...">` | Native input with correct `type` attribute |
| `textarea` | `<textarea>` | Rendered with consistent visual styling |

**Error display:**

- When an error exists for this field's `name` (from Zod via `<Form>` context, or via a directly passed `errorText` prop), the error message replaces the helper text below the input
- The input border switches to the error colour
- `aria-describedby` is set to the error/helper text element's id for screen reader association
- `aria-invalid="true"` is set on the input when an error is present

---

## Design Specification

### Layout

- Outer wrapper: `flex flex-col gap-[6px]`
- Input row: `flex items-center` — horizontal row containing the input and optional trailing icon
- Label sits above the input row; helper/error text sits below

### Sizing

| Size | Height | Horizontal padding | Font size |
|---|---|---|---|
| `md` (default) | ~44px (flex-driven) | `px-[15px]` | 14px |
| `lg` | ~52px (flex-driven) | `px-[17px]` | 15px |

### Typography

| Element | Weight | Size | Line-height |
|---|---|---|---|
| Label | Medium (500) | 14px (`md`) / 15px (`lg`) | 21px / 22.5px |
| Input text / placeholder | Regular (400) | 14px / 15px | normal |
| Helper / error text | Regular (400) | 12px | 18px |

### Colours by state

| State | Border | Background | Notes |
|---|---|---|---|
| Default | `border-neutral-200` | `bg-white` | Placeholder in `text-neutral-400` |
| Focused | `border-neutral-200` + focus ring | `bg-white` | `focus-visible:ring-2 focus-visible:ring-primary-500` |
| Filled | `border-neutral-200` | `bg-white` | Input text in `text-neutral-950` |
| Error | `border-red-500` | `bg-white` | Error text in `text-red-500` below |
| Disabled | `border-neutral-200` | `bg-neutral-50` | Input at 60% opacity, label at 50% opacity |

border-red colours should match the --color-error value in our tailwind global css file. 

### Border and radius

- Border: 1px solid
- Border radius: `rounded-[14px]` (14px — matches Button component, not a named token)
- No shadow on the input

### Trailing icon (password type)

- Eye / eye-off icon, 20×20px, `text-neutral-400`
- Rendered as a `<button>` inside the input row, toggling password visibility
- Uses the existing `Icon` component

### Helper and error text

- Helper text: `text-neutral-400`, 12px, shown when no error is present
- Error text: `text-red-500`, 12px, shown when an error is present (replaces helper text)

---

## Accessibility

- Every `<input>` or `<textarea>` is associated with its `<label>` via `htmlFor` / `id`
- `aria-describedby` links the input to its helper or error text element
- `aria-invalid="true"` is set on the input when an error is present
- Password toggle button has a descriptive `aria-label` ("Show password" / "Hide password")
- Focus ring is always visible on keyboard focus (`focus-visible` variant only — not on mouse click)
- Disabled state uses the native `disabled` attribute, not `pointer-events-none` alone

---

## Validation & Zod Integration

- `<Form>` accepts a `schema` prop (a `ZodSchema`)
- On submission, form data is parsed with `schema.safeParse()`
- If parsing fails, `ZodError.flatten().fieldErrors` is used to extract per-field error arrays
- The first error message for each field is surfaced to the corresponding `<Input>` via context
- Inputs without a matching Zod field error show their `helperText` (if provided) unchanged
- This pattern is compatible with Next.js Server Actions: the server action can also return a `FormState` object with errors, which the `<Form>` merges with client-side Zod errors

---

## File Structure

```
app/
  components/
    Form/
      Form.tsx          ← <Form> wrapper with Zod context
      FormContext.ts    ← React context for passing errors to children
      index.ts          ← re-exports
    Input/
      Input.tsx         ← <Input> component
      index.ts          ← re-export
```

---

## Open Questions

1. **Focus ring colour:** Figma does not show a focused state. Should the focus ring use `primary-500` (green) or a border-colour change? Confirm with designer.
2. **Error + helper text together:** Does error text always replace helper text, or can both be shown simultaneously?
3. **Controlled vs uncontrolled:** Should the password visibility toggle be managed inside the component, or should state always be lifted to the consumer?
4. **`borderRadius/input` token:** The 14px radius is not in the current token scale. Worth registering as a named token to avoid magic numbers in both `Button` and `Input`.
5. **`textarea` sizing:** Should `<textarea>` have a minimum height or a `rows` prop? Define default behaviour.
