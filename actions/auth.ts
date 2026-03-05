'use server'

import { signIn, signOut } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"
import { hashPassword } from "@/lib/password"

type FormState = {
  errors: Record<string, string[] | undefined>
}

export async function loginAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/my-account",
    })
  } catch (error) {
    if (error instanceof Error && (error as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")) {
      throw error
    }
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    }
  }
  return { errors: {} }
}

export async function signupAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string

  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existingUser) {
    return {
      errors: {
        email: ["An account with this email already exists"],
      },
    }
  }

  const passwordHash = await hashPassword(formData.get("password") as string)

  await db.insert(users).values({
    id: crypto.randomUUID(),
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email,
    passwordHash,
  })

  try {
    await signIn("credentials", {
      email,
      password: formData.get("password"),
      redirectTo: "/my-account",
    })
  } catch (error) {
    if (error instanceof Error && (error as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")) {
      throw error
    }
    return {
      errors: {
        email: ["Account created but sign-in failed. Please log in."],
      },
    }
  }

  return { errors: {} }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" })
}
