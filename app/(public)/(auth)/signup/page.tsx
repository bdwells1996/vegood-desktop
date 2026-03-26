"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupAction } from "@/actions/auth"
import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { Input } from "@/components/Input"
import { signupSchema, type SignupInput } from "@/schemas/auth"

export default function SignupPage() {
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: SignupInput) {
    const result = await signupAction(data)
    if (result?.fieldError) {
      form.setError(result.fieldError.field as keyof SignupInput, {
        message: result.fieldError.message,
      })
    }
  }

  return (
    <div className="w-full md:max-w-[480px]">
      <h1 className="mb-2 text-3xl font-medium">Create an account</h1>
      <p className="mb-8 text-content-secondary">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary-500 hover:text-primary-600 transition-colors"
        >
          Log in
        </Link>
      </p>

      <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
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
        <Button type="submit" size="lg" className="w-full mt-2" disabled={form.formState.isSubmitting}>
          Create account
        </Button>
      </Form>
    </div>
  )
}
