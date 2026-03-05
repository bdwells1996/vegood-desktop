import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { z } from "zod";
import { Form } from "@/app/components/Form";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components";

// ---------------------------------------------------------------------------
// Mock server actions
// ---------------------------------------------------------------------------

type FormState = { errors: Record<string, string[] | undefined> };

async function successAction(_prev: FormState, _data: FormData): Promise<FormState> {
	await new Promise((r) => setTimeout(r, 400));
	return { errors: {} };
}

async function serverErrorAction(_prev: FormState, _data: FormData): Promise<FormState> {
	await new Promise((r) => setTimeout(r, 400));
	return {
		errors: {
			email: ["An account with this email already exists."],
		},
	};
}

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const signUpSchema = z.object({
	firstName: z.string().min(1, "First name is required."),
	lastName: z.string().min(1, "Last name is required."),
	email: z.string().min(1, "Email is required.").email("Enter a valid email address."),
	password: z.string().min(8, "Password must be at least 8 characters."),
});

const contactSchema = z.object({
	name: z.string().min(1, "Name is required."),
	email: z.string().min(1, "Email is required.").email("Enter a valid email address."),
	message: z.string().min(10, "Message must be at least 10 characters."),
});

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
	title: "Components/Form",
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const SignUp: Story = {
	render: () => (
		<div className="w-[480px]">
			<Form schema={signUpSchema} action={successAction} className="flex flex-col gap-4">
				<div className="flex gap-4">
					<Input name="firstName" label="First name" placeholder="Jane" fullWidth />
					<Input name="lastName" label="Last name" placeholder="Smith" fullWidth />
				</div>
				<Input name="email" label="Email address" type="email" placeholder="jane@example.com" fullWidth />
				<Input name="password" label="Password" type="password" placeholder="Min. 8 characters" fullWidth />
				<Button type="submit" variant="primary" className="mt-2">
					Create account
				</Button>
			</Form>
		</div>
	),
};

export const SignUpWithValidationErrors: Story = {
	name: "Sign Up — Validation errors (submit empty)",
	render: () => (
		<div className="w-[480px]">
			<p className="text-caption text-content-tertiary mb-4">Submit the empty form to trigger client-side Zod errors.</p>
			<Form schema={signUpSchema} action={successAction} className="flex flex-col gap-4">
				<div className="flex gap-4">
					<Input name="firstName" label="First name" placeholder="Jane" fullWidth />
					<Input name="lastName" label="Last name" placeholder="Smith" fullWidth />
				</div>
				<Input name="email" label="Email address" type="email" placeholder="jane@example.com" fullWidth />
				<Input name="password" label="Password" type="password" placeholder="Min. 8 characters" fullWidth />
				<Button type="submit" variant="primary" className="mt-2">
					Create account
				</Button>
			</Form>
		</div>
	),
};

export const SignUpWithServerError: Story = {
	name: "Sign Up — Server error (email taken)",
	render: () => (
		<div className="w-[480px]">
			<p className="text-caption text-content-tertiary mb-4">Fill in all fields and submit to trigger a server-side error on the email field.</p>
			<Form schema={signUpSchema} action={serverErrorAction} className="flex flex-col gap-4">
				<div className="flex gap-4">
					<Input name="firstName" label="First name" placeholder="Jane" fullWidth />
					<Input name="lastName" label="Last name" placeholder="Smith" fullWidth />
				</div>
				<Input name="email" label="Email address" type="email" placeholder="jane@example.com" fullWidth />
				<Input name="password" label="Password" type="password" placeholder="Min. 8 characters" fullWidth />
				<Button type="submit" variant="primary" className="mt-2">
					Create account
				</Button>
			</Form>
		</div>
	),
};

export const ContactForm: Story = {
	render: () => (
		<div className="w-[480px]">
			<Form schema={contactSchema} action={successAction} className="flex flex-col gap-4">
				<Input name="name" label="Your name" placeholder="Jane Smith" fullWidth />
				<Input name="email" label="Email address" type="email" placeholder="jane@example.com" fullWidth />
				<Input
					name="message"
					label="Message"
					type="textarea"
					placeholder="Tell us how we can help…"
					helperText="At least 10 characters."
					fullWidth
				/>
				<Button type="submit" variant="primary" className="mt-2">
					Send message
				</Button>
			</Form>
		</div>
	),
};

export const HalfWidthInputs: Story = {
	name: "Form — Half-width inputs (inForm default)",
	render: () => (
		<div className="w-[600px]">
			<p className="text-caption text-content-tertiary mb-4">
				Inputs inside a Form default to <code>md:w-1/2</code> without <code>fullWidth</code>.
			</p>
			<Form schema={signUpSchema} action={successAction} className="flex flex-wrap gap-4">
				<Input name="firstName" label="First name" placeholder="Jane" />
				<Input name="lastName" label="Last name" placeholder="Smith" />
				<Input name="email" label="Email address" type="email" placeholder="jane@example.com" />
				<Input name="password" label="Password" type="password" placeholder="Min. 8 characters" />
				<div className="w-full">
					<Button type="submit" variant="primary">Create account</Button>
				</div>
			</Form>
		</div>
	),
};
