# GEMINI.md

## Project Overview
`vegood-desktop` is a modern web application built with the latest technologies. It serves as a desktop-oriented experience (as implied by the name) utilizing the Next.js framework.

### Core Tech Stack
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Database ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database Provider:** [Neon](https://neon.tech/) (PostgreSQL)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- A PostgreSQL database (Neon recommended)
- Environment variables: `DATABASE_URL` must be set in a `.env` file for database operations.

### Installation
```bash
npm install
```

### Running the Project
- **Development Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Start Production Server:** `npm run start`

### Database Management
- **Generate Migrations:** `npm run db:generate`
- **Apply Migrations:** `npm run db:migrate`
- **Database Studio:** `npm run db:studio`

## Project Structure
- `app/`: Contains the Next.js App Router pages, layouts, and styles.
  - `layout.tsx`: Root layout with Geist font integration.
  - `page.tsx`: Main landing page.
  - `globals.css`: Global CSS including Tailwind directives.
- `db/`: Database configuration and schema.
  - `index.ts`: Drizzle client initialization using `@neondatabase/serverless`.
  - `schema.ts`: Database table definitions.
- `public/`: Static assets like images and SVGs.
- `drizzle.config.ts`: Configuration for Drizzle Kit.
- `next.config.ts`: Next.js configuration.
- `tsconfig.json`: TypeScript configuration.

## Development Conventions

### Coding Standards
- Follow standard Next.js and React patterns.
- Use TypeScript for all new files to ensure type safety.
- Prefer functional components and React Hooks.

### Database
- Define all schema changes in `db/schema.ts`.
- Use `npm run db:generate` and `npm run db:migrate` to manage schema changes.
- Access the database using the exported `db` instance from `db/index.ts`.

### Styling
- Use Tailwind CSS v4 utility classes for styling.
- Global styles and Tailwind directives are located in `app/globals.css`.

### Linting
- Run `npm run lint` to check for code quality issues. The project uses ESLint with `eslint-config-next`.
