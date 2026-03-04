# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**vegood-desktop** is a Next.js 16 application with TypeScript, using Drizzle ORM for database management (PostgreSQL via Neon), Tailwind CSS v4 for styling, and Next.js App Router for routing.

## Development Commands

- **`npm run dev`** - Start Next.js dev server (http://localhost:3000)
- **`npm run build`** - Build for production
- **`npm start`** - Start production server (requires `npm run build` first)
- **`npm run lint`** - Run ESLint checks
- **`npm run db:generate`** - Generate Drizzle migration files from schema changes
- **`npm run db:migrate`** - Apply pending migrations to the database
- **`npm run db:studio`** - Open Drizzle Studio (visual database explorer)

## Architecture

### Next.js App Router Structure
- **`app/`** - Application source code using Next.js 13+ App Router
  - `layout.tsx` - Root layout with global Geist fonts and CSS
  - `page.tsx` - Home page
  - `globals.css` - Global styles with Tailwind
  - Folders in `app/` become routes (e.g., `app/dashboard/page.tsx` → `/dashboard`)

### Database & ORM
- **Drizzle ORM** with PostgreSQL backend (Neon serverless)
- **`db/schema.ts`** - Define tables using Drizzle's schema syntax
- **`db/index.ts`** - Drizzle client initialization using Neon HTTP driver
- **`drizzle/`** - Auto-generated migration files (created by `db:generate`)
- **`drizzle.config.ts`** - Drizzle Kit configuration

### Configuration Files
- **`tsconfig.json`** - TypeScript config with `@/*` path alias for root imports
- **`next.config.ts`** - Next.js configuration (currently minimal)
- **`postcss.config.mjs`** - PostCSS/Tailwind setup
- **`eslint.config.mjs`** - ESLint configuration

## Environment Setup

Requires a `.env.local` (or `.env`) file with:
```
DATABASE_URL=postgresql://user:password@host/dbname
```

This URL is used by:
- Drizzle Kit during migrations and schema generation
- The Neon HTTP client in `db/index.ts` at runtime

## Key Dependencies
- **next** 16.1.6 - Framework
- **react** 19.2.3, **react-dom** 19.2.3 - UI library
- **drizzle-orm** 0.45.1 - ORM
- **@neondatabase/serverless** 1.0.2 - Neon HTTP driver
- **tailwindcss** 4, **@tailwindcss/postcss** 4 - CSS framework
- **typescript** 5 - Language
- **eslint** 9 - Linting

## Common Development Tasks

### Adding a Database Table
1. Define the table in `db/schema.ts` using Drizzle's `pgTable()` syntax
2. Run `npm run db:generate` to create a migration file
3. Review the generated migration in `drizzle/`
4. Run `npm run db:migrate` to apply to the database
5. Use `npm run db:studio` to verify in Drizzle Studio

### Creating a New Page/Route
1. Create a folder in `app/` (e.g., `app/products/`)
2. Add `page.tsx` with a React component
3. The route is automatically available (e.g., `/products`)

### Querying the Database
- Import the `db` client from `db/index.ts`
- Use Drizzle query methods (e.g., `db.select().from(table).where()`)
- Can be used in Server Components, API Routes, or Server Actions

## TypeScript & Code Style
- Strict TypeScript enabled (`strict: true`)
- Path alias `@/*` resolves to repo root
- ESLint enforces Next.js + TypeScript best practices
- Use Server Components by default; mark interactive components with `'use client'`
