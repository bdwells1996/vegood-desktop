'use server'

import { signIn, signOut, auth } from "@/lib/auth"
import { and, eq, ne } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { users } from "@/db/schema"
import { hashPassword } from "@/lib/password"
import type { LoginInput, SignupInput, ProfileInput } from "@/schemas/auth"

export type ActionResult = {
  success: boolean
  fieldError?: { field: string; message: string }
  error?: string
}

export async function loginAction(data: LoginInput): Promise<ActionResult> {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/my-account",
    })
  } catch (error) {
    if (error instanceof Error && (error as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")) {
      throw error
    }
    return {
      success: false,
      fieldError: { field: "email", message: "Invalid email or password" },
    }
  }
  return { success: true }
}

export async function signupAction(data: SignupInput): Promise<ActionResult> {
  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, data.email))
    .limit(1)

  if (existingUser) {
    return {
      success: false,
      fieldError: { field: "email", message: "An account with this email already exists" },
    }
  }

  const passwordHash = await hashPassword(data.password)

  await db.insert(users).values({
    id: crypto.randomUUID(),
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    passwordHash,
  })

  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/my-account",
    })
  } catch (error) {
    if (error instanceof Error && (error as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")) {
      throw error
    }
    return {
      success: false,
      error: "Account created but sign-in failed. Please log in.",
    }
  }

  return { success: true }
}

export async function updateProfileAction(data: ProfileInput): Promise<ActionResult> {
  const session = await auth()

  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" }
  }

  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(and(eq(users.email, data.email), ne(users.id, session.user.id)))
    .limit(1)

  if (existingUser) {
    return {
      success: false,
      fieldError: { field: "email", message: "An account with this email already exists" },
    }
  }

  await db
    .update(users)
    .set({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      updatedAt: new Date(),
    })
    .where(eq(users.id, session.user.id))

  revalidatePath("/my-account")
  return { success: true }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" })
}
