import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "@/app/components/Input";

const meta = {
	title: "Components/Input",
	component: Input,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["md", "lg"],
		},
		type: {
			control: "select",
			options: ["text", "email", "password", "number", "textarea"],
		},
		disabled: {
			control: "boolean",
		},
		fullWidth: {
			control: "boolean",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-[400px]">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: "default",
		label: "Label",
		placeholder: "Placeholder text",
	},
};

export const WithHelperText: Story = {
	args: {
		name: "helper",
		label: "Email address",
		placeholder: "you@example.com",
		type: "email",
		helperText: "We'll never share your email with anyone.",
	},
};

export const WithError: Story = {
	args: {
		name: "error",
		label: "Username",
		placeholder: "Enter username",
		error: "This username is already taken.",
	},
};

export const SizeMd: Story = {
	args: {
		name: "size-md",
		label: "Medium (default)",
		placeholder: "Size md — 44px height",
		size: "md",
	},
};

export const SizeLg: Story = {
	args: {
		name: "size-lg",
		label: "Large",
		placeholder: "Size lg — 52px height",
		size: "lg",
	},
};

export const AllSizes: Story = {
	args: { name: "sizes" },
	render: () => (
		<div className="flex flex-col gap-4 w-[400px]">
			<Input name="md" label="Medium" placeholder="Size md" size="md" />
			<Input name="lg" label="Large" placeholder="Size lg" size="lg" />
		</div>
	),
};

export const Password: Story = {
	args: {
		name: "password",
		label: "Password",
		type: "password",
		placeholder: "Enter your password",
	},
};

export const Textarea: Story = {
	args: {
		name: "message",
		label: "Message",
		type: "textarea",
		placeholder: "Write your message here…",
		helperText: "Max 500 characters.",
	},
};

export const Disabled: Story = {
	args: {
		name: "disabled",
		label: "Disabled field",
		placeholder: "Not editable",
		disabled: true,
	},
};

export const DisabledWithValue: Story = {
	args: {
		name: "disabled-value",
		label: "Read-only value",
		defaultValue: "john@example.com",
		disabled: true,
	},
};

export const AllStates: Story = {
	args: { name: "all" },
	render: () => (
		<div className="flex flex-col gap-4 w-[400px]">
			<Input name="default" label="Default" placeholder="Placeholder" />
			<Input name="error" label="With error" placeholder="Placeholder" error="Something went wrong." />
			<Input name="helper" label="With helper" placeholder="Placeholder" helperText="Helpful context goes here." />
			<Input name="disabled" label="Disabled" placeholder="Not editable" disabled />
			<Input name="password" label="Password" type="password" placeholder="••••••••" />
			<Input name="textarea" label="Textarea" type="textarea" placeholder="Write something…" />
		</div>
	),
};
