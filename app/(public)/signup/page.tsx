'use client'

import { Form } from "@/components/Form"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { signupAction } from "@/actions/auth"
import { signupSchema } from "@/schemas/auth"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[500px]">
        <h1 className="mb-2 text-3xl font-bold">Create an account</h1>
        <p className="mb-8 text-content-tertiary">
          Already have an account?{" "}
          <Link href="/login" className="text-primary-500 hover:underline">
            Log in
          </Link>
        </p>

        <Form action={signupAction} schema={signupSchema} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Input name="firstName" label="First name" placeholder="Jane" fullWidth />
            <Input name="lastName" label="Last name" placeholder="Smith" fullWidth />
          </div>
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
            placeholder="At least 8 characters"
            fullWidth
          />
          <Input
            name="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="Repeat your password"
            fullWidth
          />
          <Button type="submit" size="lg" className="w-full mt-2">
            Create account
          </Button>
        </Form>
      </div>
    </div>
  )
}
