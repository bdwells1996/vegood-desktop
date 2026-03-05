# Authentication and Route Protection

## Overview

Implement user authentication using NextAuth.js, protecting private routes while allowing limited public access. Users can sign up, log in, and have their accounts persisted in the Neon PostgreSQL database. Unauthenticated users can access a splash page, the login and signup pages, and a limited version of the browse page. Authenticated users can access protected routes such as `/my-account`.

---

## Goals

- Integrate NextAuth.js as the authentication provider, configured for Vercel deployment
- Create a users table in the Neon database to store accounts securely (hashed passwords, UUID)
- Protect private routes using Next.js middleware so unauthenticated users are redirected
- Allow unauthenticated access to the splash page (`/`), `/login`, `/signup`, and a limited `/browse`
- Provide a `useAuth` hook to check the user's authenticated status in client components
- Scaffold a dummy `/my-account` page to verify route protection is working
- Build login and signup pages using the existing `<Form>` and `<Input>` component set, ensuring Zod validation is used. 

---

## Routes

### Public routes (no authentication required)

| Route | Description |
|---|---|
| `/` | Splash page with links to login and signup, keep basic for now, will embellish as a marketing page later |
| `/login` | Login form |
| `/signup` | Signup form |
| `/browse` | Browse page — accessible to all but features are limited for unauthenticated users |

### Protected routes (authentication required)

| Route | Description |
|---|---|
| `/my-account` | Dummy account page, redirects to `/login` if unauthenticated, next.js config should be set up to redirect if possible to reduce repetition on every protected route. |

---

## Database

### `users` table

A new `users` table is added to the Neon PostgreSQL database via Drizzle ORM.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Primary key, generated server-side (not derived from email) |
| `firstName` | `varchar(100)` | Required |
| `lastName` | `varchar(100)` | Required |
| `email` | `varchar(255)` | Unique, required |
| `passwordHash` | `text` | bcrypt hashed password, never stored in plaintext |
| `createdAt` | `timestamp` | Defaults to `now()` |
| `updatedAt` | `timestamp` | Updated on row change |

Password hashing must use `bcrypt` (or `bcryptjs`) with a salt round of at least 10.

---

## Authentication

### NextAuth.js setup

- Use the **Credentials provider** to support email/password login
- Configure NextAuth with a JWT session strategy (stateless, suitable for Vercel/Edge)
- The `authorize` callback queries the `users` table by email, then compares the submitted password against the stored hash using `bcrypt.compare`
- On success, return a minimal user object `{ id, email, firstName, lastName }`
- Store the user `id` and name fields in the JWT token and session

### Environment variables required

```
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXTAUTH_SECRET=<generated secret>
DATABASE_URL=<existing Neon connection string>
```

---

## Middleware

A Next.js `middleware.ts` file at the project root handles route protection:

- Reads the NextAuth session token from the request cookies
- Redirects unauthenticated requests for protected routes to `/login`
- Allows all public routes through without a session check
- The matcher config should include protected route patterns only

---

## `useAuth` Hook

A client-side hook (`useAuth`) wraps NextAuth's `useSession` to expose a simpler API:

| Return value | Type | Description |
|---|---|---|
| `user` | `{ id, email, firstName, lastName } \| null` | Authenticated user or null |
| `isAuthenticated` | `boolean` | True when a valid session exists |
| `isLoading` | `boolean` | True while the session status is resolving |

---

## Pages

### Splash page (`/`)

- Marketing/landing page with call-to-action buttons linking to `/login` and `/signup`
- No authentication required

### Login page (`/login`)

- Uses the existing `<Form>` and `<Input>` components
- Fields: Email, Password
- On success, redirect to `/my-account`
- On failure, display an inline error message

### Signup page (`/signup`)

- Uses the existing `<Form>` and `<Input>` components
- Fields: First Name, Last Name, Email, Password, Confirm Password
- Validates that Password and Confirm Password match before submitting
- On success, automatically sign in the user and redirect to `/my-account`
- On failure (e.g. email already taken), display an inline error message

### Browse page (`/browse`)

- Accessible to all users
- When the user is unauthenticated, a subset of features is shown and a prompt encourages them to log in or sign up
- The `useAuth` hook is used to conditionally render limited vs full content

### My Account page (`/my-account`) — protected

- A minimal placeholder page confirming the authenticated user's name and email
- Exists solely to verify that route protection is working correctly
- Displays a sign-out button

---

## Signup Server Action

A server action handles account creation:

1. Validate the incoming form data with a Zod schema (firstName, lastName, email, password, confirmPassword)
2. Check that `password === confirmPassword`
3. Check that no existing user has the same email
4. Generate a UUID for the new user's `id`
5. Hash the password with bcrypt
6. Insert the new user row into the `users` table
7. Return a success or error state to the form

---

## File Structure

```
app/
  (public)/
    page.tsx                  ← Splash page
    login/
      page.tsx                ← Login page
    signup/
      page.tsx                ← Signup page
    browse/
      page.tsx                ← Browse page (limited for unauthenticated users)
  (protected)/
    my-account/
      page.tsx                ← Dummy account page
  actions/
    auth.ts                   ← signup and login server actions
  hooks/
    useAuth.ts                ← useAuth client hook
lib/
  auth.ts                     ← NextAuth configuration (providers, callbacks, session)
  password.ts                 ← bcrypt helpers (hashPassword, comparePassword)
middleware.ts                 ← Route protection middleware
db/
  schema.ts                   ← Updated to include users table
```

---

## Acceptance Criteria

- [ ] Unauthenticated users can visit `/`, `/login`, `/signup`, and `/browse`
- [ ] Unauthenticated users visiting `/my-account` are redirected to `/login`
- [ ] A user can complete the signup form and have their account saved in Neon
- [ ] Passwords are never stored in plaintext; bcrypt hashing is verified in the database
- [ ] A user can log in with their email and password and receive a session
- [ ] `useAuth` correctly returns `isAuthenticated: true` for a logged-in user
- [ ] The `/my-account` page renders the authenticated user's name and email
- [ ] Signing out clears the session and redirects to `/`
- [ ] Browse page renders a limited view for unauthenticated users and full content for authenticated users

---

## Open Questions

1. **Social providers:** Should Google or GitHub OAuth be added in a future iteration, or is Credentials-only sufficient for now?
2. **Email verification:** Is email verification on signup required, or can unverified accounts log in immediately?
3. **Password reset:** Out of scope for now — should a "forgot password" flow be planned alongside this?
4. **Browse page gating:** Which specific features should be hidden for unauthenticated users on `/browse`? Needs product decision.
5. **Session expiry:** What should the JWT expiry duration be? Default NextAuth is 30 days — confirm this is acceptable.
