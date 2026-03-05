'use client'

import { Form } from "@/components/Form"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { loginAction } from "@/actions/auth"
import { loginSchema } from "@/schemas/auth"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="mb-2 text-3xl font-bold">Welcome back</h1>
        <p className="mb-8 text-content-tertiary">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary-500 hover:underline">
            Sign up
          </Link>
        </p>

        <Form action={loginAction} schema={loginSchema} className="flex flex-col gap-4">
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            fullWidth
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Your password"
            fullWidth
          />
          <Button type="submit" size="lg" className="w-full mt-2">
            Log in
          </Button>
        </Form>
      </div>
    </div>
  )
}
