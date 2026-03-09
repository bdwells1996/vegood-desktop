"use client";

import Link from "next/link";
import { loginAction } from "@/actions/auth";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { loginSchema } from "@/schemas/auth";

export default function LoginPage() {
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

			<Form
				action={loginAction}
				schema={loginSchema}
				className="flex flex-col gap-4"
			>
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
	);
}
