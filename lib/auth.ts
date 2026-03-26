import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"
import { comparePassword } from "@/lib/password"

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string))
          .limit(1)

        if (!user) {
          return null
        }

        const isValid = await comparePassword(
          credentials.password as string,
          user.passwordHash
        )

        if (!isValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.firstName = user.firstName
        token.lastName = user.lastName
      }
      if (trigger === "update" && session?.user) {
        token.firstName = session.user.firstName
        token.lastName = session.user.lastName
        token.email = session.user.email
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.firstName = token.firstName as string
      session.user.lastName = token.lastName as string
      return session
    },
  },
})
