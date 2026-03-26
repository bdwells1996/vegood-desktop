"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginAction } from "@/actions/auth"
import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { Input } from "@/components/Input"
import { loginSchema, type LoginInput } from "@/schemas/auth"

export default function LoginPage() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(data: LoginInput) {
    const result = await loginAction(data)
    if (result?.fieldError) {
      form.setError(result.fieldError.field as keyof LoginInput, {
        message: result.fieldError.message,
      })
    }
  }

  return (
    <div className="w-full md:max-w-[480px]">
      <h1 className="mb-2 text-3xl font-medium">Welcome back</h1>
      <p className="mb-8 text-content-secondary">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-primary-500 hover:text-primary-600 transition-colors"
        >
          Sign up
        </Link>
      </p>

      <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-4">
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
        <Button type="submit" size="lg" className="w-full mt-2" disabled={form.formState.isSubmitting}>
          Log in
        </Button>
      </Form>
    </div>
  )
}
